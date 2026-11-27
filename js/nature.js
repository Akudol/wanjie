/* ============ 万界乱斗 · 自然化 ============
   草地地面 / 大尺度色块 / 蜿蜒石径 / 成簇植被 / 渐变天空与像素云 / 小地图地表色（魔法学院与武道擂台） */
const flatM=std(0xffffff,{roughness:.95});
Object.assign(DK,{
  slab:new Kind([{g:new THREE.CylinderGeometry(1,1,1,7),m:flatM,tint:0xc8bca8,main:1,l:L(0,.03,0,0,0,0,.62,.1,.5),rs:1}],2000),
  bush:new Kind([{g:GEO.sphLo,m:leafM,tint:0x3a8a3a,main:1,l:L(0,.42,0,0,0,0,.85,.62,.8),sh:1},{g:GEO.sphLo,m:leafM,tint:0x3a8a3a,main:1,l:L(.6,.3,.25,0,0,0,.55,.45,.55),sh:1},{g:GEO.sphLo,m:leafM,tint:0x3a8a3a,main:1,l:L(-.55,.3,-.2,0,0,0,.6,.45,.55),sh:1}],140),
  tuft:new Kind([{g:GEO.cone,m:leafM,tint:0x4a9a3a,main:1,l:L(0,.22,0,0,0,.12,.07,.45,.07)},{g:GEO.cone,m:leafM,tint:0x4a9a3a,main:1,l:L(.12,.18,.05,.2,0,-.35,.06,.36,.06)},{g:GEO.cone,m:leafM,tint:0x4a9a3a,main:1,l:L(-.1,.17,-.06,-.25,0,.4,.06,.34,.06)}],700),
  flower:new Kind([[0,0],[.25,.12],[-.2,.18],[.1,-.22],[-.18,-.15]].map(([x,z])=>({g:GEO.sphLo,m:flatM,tint:0xffffff,main:1,l:L(x,.12,z,0,0,0,.08,.06,.08)})),260),
});
Object.assign(DCOL,{bush:.6});
// 128px 草地贴图：大块明暗 + 草叶笔触 + 零星花点
wrapHook('groundCanvas',o=>G=>{if(G.style!=='meadow')return o(G);return cv(128,128,(g,W)=>{
  const L0=G.light[0],L1=G.light[1],T=TAU/W,p1=rand(0,9),p2=rand(0,9);
  for(let y=0;y<W;y++)for(let x=0;x<W;x++){const n=.5+.25*Math.sin(x*T*2+p1)*Math.cos(y*T*3+p2)+.25*Math.sin((x+y)*T*5+p2);
    const l=L0+(L1-L0)*n+rand(-1.5,1.5),h=G.hue[0]+(G.hue[1]-G.hue[0])*(1-n)+rand(-3,3);g.fillStyle=`hsl(${h},${G.sat}%,${l}%)`;g.fillRect(x,y,1,1)}
  const px=(x,y,c)=>{g.fillStyle=c;g.fillRect(((x%W)+W)%W,((y%W)+W)%W,1,1)};
  for(let i=0;i<1100;i++){const x=Math.random()*W|0,y=Math.random()*W|0,d=Math.random()<.5,c=`hsl(${rand(G.hue[0],G.hue[1])},${G.sat+8}%,${d?L0-7:L1+6}%)`;px(x,y,c);px(x,y-1,c);if(Math.random()<.4)px(x+(Math.random()<.5?1:-1),y-2,c)}
  for(let i=0;i<14;i++){const x=Math.random()*W|0,y=Math.random()*W|0;px(x,y,'#8a8c84');px(x+1,y,'#a8aaa0')}
  for(let i=0;i<26;i++){const x=Math.random()*W|0,y=Math.random()*W|0,c=pick(G.flowers);px(x,y,c);if(Math.random()<.5)px(x+1,y+1,c)}})});
// 地面顶点色：低频大色块，打破贴图重复感
wrapHook('buildGround',o=>st=>{o(st);const tx=groundMat.map,rp=GSIZE/(tx.image.width/8);tx.repeat.set(rp,rp);
  const pos=groundGeo.attributes.position;let col=groundGeo.attributes.color;if(!col){col=new THREE.BufferAttribute(new Float32Array(pos.count*3),3);groundGeo.setAttribute('color',col)}
  const v=st.nature?st.nature.vary:0,s=WORLD.seed;
  for(let i=0;i<pos.count;i++){const x=pos.getX(i),z=pos.getZ(i),n=(Math.sin(x*.043+s)*Math.cos(z*.051-s*1.3)+.6*Math.sin((x-z)*.09+s*2.1)+.3*Math.cos((x+z*.7)*.17+s))/1.9;
    const k=1+n*v;col.setXYZ(i,k*(1+n*v*.25),k,k*(1-n*v*.4))}
  col.needsUpdate=true;if(!groundMat.vertexColors){groundMat.vertexColors=true;groundMat.needsUpdate=true}});
// 小径、成簇植被、草丛与花
wrapHook('placeDecor',o=>st=>{const N=st.nature;DTINT.rock=[0x6a6c74,0x787a82,0x5e6068];if(N&&N.tints)Object.assign(DTINT,N.tints,{slab:N.pathTint});o(st);WORLD.paths=[];if(!N)return;
  const path=WORLD.paths,near=(x,z,r)=>path.some(p=>(p[0]-x)**2+(p[1]-z)**2<r*r),nearPoi=(x,z,r)=>POIS.some(p=>Math.hypot(p.x-x,p.z-z)<r);
  const add=(k,x,z,r=rand(0,TAU),s=rand(.85,1.2))=>{decor.push({k,x,z,r,s,tilt:0});if(DCOL[k])addCol(x,z,DCOL[k]*s)};
  const seg=(ax,az,bx,bz)=>{const L=Math.hypot(bx-ax,bz-az);if(L<8)return;const cx=(ax+bx)/2+rand(-.3,.3)*L,cz=(az+bz)/2+rand(-.3,.3)*L,n=Math.ceil(L/1.15);let lastG=-99,lastH=-99;
    for(let i=1;i<n;i++){const t=i/n,u=1-t,x=u*u*ax+2*u*t*cx+t*t*bx,z=u*u*az+2*u*t*cz+t*t*bz,dx=2*u*(cx-ax)+2*t*(bx-cx),dz=2*u*(cz-az)+2*t*(bz-cz),a=Math.atan2(dx,dz),px=Math.cos(a),pz=-Math.sin(a);
      if(nearPoi(x,z,5.5)||Math.hypot(x,z)<3.5)continue;const w=i%2?.5:-.5;add('slab',x+px*w+rand(-.15,.15),z+pz*w+rand(-.15,.15),rand(0,TAU),rand(.75,1.1));if(Math.random()<.5)add('slab',x-px*w*1.1,z-pz*w*1.1,rand(0,TAU),rand(.6,.9));path.push([x,z]);
      if(N.hedges&&i-lastH>7&&Math.random()<.3&&!nearPoi(x,z,9)&&Math.hypot(x,z)>14){lastH=i;for(const sd of[-1,1])decor.push({k:'hedge',x:x+px*2.3*sd,z:z+pz*2.3*sd,r:a-Math.PI/2,s:rand(.7,.9),tilt:0})}
      if(N.gates&&i-lastG>14&&Math.random()<.3&&!nearPoi(x,z,9)&&Math.hypot(x,z)>14){lastG=i;decor.push({k:'pagoda',x,z,r:a-Math.PI/2,s:.9,tilt:0})}}};
  // 最小生成树连接出生点与所有据点：像真实踩出来的小路，不会全部汇聚到一点
  const P0=[[0,0],...POIS.map(p=>[p.x,p.z])],inT=[0];const rest=P0.map((_,i)=>i).slice(1);
  while(rest.length){let bi=0,bj=0,bd=1e9;for(const i of inT)for(let j=0;j<rest.length;j++){const q=P0[rest[j]],d=Math.hypot(q[0]-P0[i][0],q[1]-P0[i][1]);if(d<bd){bd=d;bi=i;bj=j}}
    const k=rest.splice(bj,1)[0];inT.push(k);seg(P0[bi][0],P0[bi][1],P0[k][0],P0[k][1])}
  for(const[k,nc,per,spr]of N.clusters)for(let c=0;c<nc;c++){let cx=0,cz=0;for(let t=0;t<20;t++){[cx,cz]=freeSpot(9,9);if(!near(cx,cz,4))break}
    for(let j=0;j<per;j++){const a=rand(0,TAU),r=spr*Math.sqrt(Math.random()),x=cx+Math.sin(a)*r,z=cz+Math.cos(a)*r;if(near(x,z,1.8)||nearPoi(x,z,5.5)||Math.hypot(x,z)<5)continue;
      add(k,x,z,rand(0,TAU),k==='treeR'?rand(.8,1.45):rand(.7,1.2));if(k==='treeR'&&Math.random()<.6){const a2=rand(0,TAU);decor.push({k:'tuft',x:x+Math.sin(a2)*1.2,z:z+Math.cos(a2)*1.2,r:rand(0,TAU),s:rand(.9,1.4),tilt:0})}}}
  const B=WORLD.H-4;for(let i=0;i<N.tufts;i++){const x=rand(-B,B),z=rand(-B,B);if(near(x,z,.9)||nearPoi(x,z,4))continue;decor.push({k:'tuft',x,z,r:rand(0,TAU),s:rand(.8,1.5),tilt:0})}
  for(let i=0;i<N.flowers;i++){const x=rand(-B,B),z=rand(-B,B);if(near(x,z,1)||nearPoi(x,z,4))continue;const c=Math.random()<.6?2:1;for(let j=0;j<c;j++)decor.push({k:'flower',x:x+rand(-.8,.8),z:z+rand(-.8,.8),r:rand(0,TAU),s:rand(.8,1.4),tilt:0})}
  for(const k in DK)DK[k].begin();
  for(const d of decor){DK[d.k].add(d.x,hAt(d.x,d.z),d.z,d.r,d.s,0,0,DTINT[d.k]?new THREE.Color(pick(DTINT[d.k])):d.k==='glass'?new THREE.Color(pick([0x8a60ff,0xff4060,0x40a0ff,0xffb040])):null,d.tilt)}
  for(const k in DK)DK[k].end()});
// 渐变天空穹顶 + 像素云（仅白天世界）
const skyDome=(()=>{const m=new THREE.ShaderMaterial({uniforms:{top:{value:new THREE.Color()},bot:{value:new THREE.Color()}},side:THREE.BackSide,depthWrite:false,fog:false,
    vertexShader:'varying float vy;void main(){vy=normalize(position).y;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader:'uniform vec3 top,bot;varying float vy;void main(){float t=clamp(vy*1.7,0.,1.);t=floor(t*9.)/9.;gl_FragColor=vec4(mix(bot,top,t),1.);}'});
  const d=new THREE.Mesh(new THREE.SphereGeometry(200,24,12),m);d.renderOrder=-10;d.frustumCulled=false;d.visible=false;scene.add(d);
  const ctex=new THREE.CanvasTexture(cv(64,24,g=>{const blob=(x,y,r,c)=>{g.fillStyle=c;for(let j=-r;j<=r;j++)for(let i=-r;i<=r;i++)if(i*i+j*j<=r*r)g.fillRect(x+i,y+j,1,1)};
    for(const[x,y,r]of[[14,15,7],[26,11,9],[40,13,8],[51,16,6]])blob(x,y+1,r,'#d4e2f4');for(const[x,y,r]of[[14,14,7],[26,10,9],[40,12,8],[51,15,6]])blob(x,y,r,'#ffffff');g.clearRect(0,21,64,3)}));
  ctex.magFilter=ctex.minFilter=THREE.NearestFilter;const grp=new THREE.Group();grp.visible=false;scene.add(grp);
  for(let i=0;i<14;i++){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:ctex,fog:false,transparent:true,depthWrite:false,opacity:rand(.75,.95)}));const a=rand(0,TAU),r=rand(120,175),k=rand(.8,1.6);
    s.position.set(Math.sin(a)*r,rand(38,72),Math.cos(a)*r);s.scale.set(52*k,19*k,1);s.renderOrder=-9;grp.add(s)}
  d.onBeforeRender=(r,sc,cam)=>{d.position.copy(cam.position);d.updateMatrixWorld();grp.position.set(cam.position.x,0,cam.position.z);grp.rotation.y+=.00008;grp.updateMatrixWorld()};
  d.clouds=grp;return d})();
wrapHook('buildStage',o=>idx=>{o(idx);const st=STAGES[idx],day=!st.moonVis;skyDome.visible=skyDome.clouds.visible=day;ashMat.opacity=day?.35:.8;
  if(day){skyDome.material.uniforms.top.value.set(st.skyTop||st.sky);skyDome.material.uniforms.bot.value.set(st.fog)}});
// 小地图底图：真实地表色 + 小径 + 树丛
wrapHook('drawMapBg',o=>st=>{o(st);if(!st.nature)return;const g=mapBg.getContext('2d'),H=WORLD.H,S=400/(2*H);
  g.fillStyle=st.ground.bg;g.fillRect(0,0,400,400);
  for(let i=0;i<40;i++)for(let j=0;j<40;j++){const x=-H+(i+.5)*(2*H/40),z=-H+(j+.5)*(2*H/40),h=hAtRaw(x,z);g.fillStyle=h>0?`rgba(255,255,220,${clamp(h*.05,0,.18)})`:`rgba(0,30,0,${clamp(-h*.06,0,.22)})`;g.fillRect(i*10,j*10,10,10)}
  g.fillStyle='rgba(235,220,190,.75)';for(const[x,z]of WORLD.paths||[])g.fillRect((x+H)*S-2,(z+H)*S-2,4,4);
  for(const d of decor){const c={treeR:'#1e5a24',bush:'#2a6a2a',rock:'#8a8c94',tower:'#e8dcc4',fountain:'#7ad8ff',pagoda:'#d8342a',arena:'#f0ece2',hedge:'#2a6a2a'}[d.k];if(!c)continue;const r=d.k==='arena'?13:d.k==='treeR'?3:2.5;g.fillStyle=c;g.fillRect((d.x+H)*S-r,(d.z+H)*S-r,r*2,r*2)}
  g.strokeStyle='rgba(255,255,255,.5)';g.lineWidth=3;g.strokeRect(1.5,1.5,397,397)});

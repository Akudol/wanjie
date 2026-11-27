/* ============ 万界乱斗 · 无限地图 ============
   世界被切成 40×40 的地块：玩家周围 7×7 块常驻渲染，走近未知区域时即时生成新地块（装饰、小路、植被、随机据点），
   生成过的地块会被记住，回头还是原来的样子。地面网格跟随玩家整格平移，小地图底图随玩家重新绘制。 */
const CH=40,CR=3,GS2=440,GSEG2=176,GSNAP=16;
const groundGeo2=new THREE.PlaneGeometry(GS2,GS2,GSEG2,GSEG2);groundGeo2.rotateX(-Math.PI/2);
groundGeo2.setAttribute('color',new THREE.BufferAttribute(new Float32Array(groundGeo2.attributes.position.count*3).fill(1),3));
ground.geometry=groundGeo2;ground.frustumCulled=false;groundMat.vertexColors=true;groundMat.needsUpdate=true;
const INF={chunks:new Map(),ci:null,cj:null,gx:0,gz:0,st:null,newPois:[]};
const ckey=(i,j)=>i+','+j;
// 实例池扩容：渲染范围约为原来整张地图的 3.4 倍
function growKind(K,max){if(K.max>=max)return;for(const P of K.parts){const o=P.m,m=new THREE.InstancedMesh(o.geometry,o.material,max);m.frustumCulled=false;m.castShadow=o.castShadow;m.receiveShadow=o.receiveShadow;
    if(P.tint)for(let i=0;i<max;i++)m.setColorAt(i,P.tint);m.count=0;scene.remove(o);scene.add(m);P.m=m}K.max=max}
for(const k in DK)growKind(DK[k],Math.ceil(DK[k].max*3.6));
/* ---------- 地面 ---------- */
function groundColor(i,x,z,v,s,col){const n=(Math.sin(x*.043+s)*Math.cos(z*.051-s*1.3)+.6*Math.sin((x-z)*.09+s*2.1)+.3*Math.cos((x+z*.7)*.17+s))/1.9,k=1+n*v;col.setXYZ(i,k*(1+n*v*.25),k,k*(1-n*v*.4))}
function regroundAt(cx,cz){const pos=groundGeo2.attributes.position,col=groundGeo2.attributes.color,st=INF.st,v=st&&st.nature?st.nature.vary:0,s=WORLD.seed;
  ground.position.set(cx,0,cz);INF.gx=cx;INF.gz=cz;
  for(let i=0;i<pos.count;i++){const x=pos.getX(i)+cx,z=pos.getZ(i)+cz;pos.setY(i,hAt(x,z));groundColor(i,x,z,v,s,col)}
  pos.needsUpdate=true;col.needsUpdate=true;groundGeo2.computeVertexNormals()}
// 新据点只需要把周围一小片地面压平
function regroundPatch(list){if(!list.length)return;const pos=groundGeo2.attributes.position,gx=INF.gx,gz=INF.gz;let ch=false;
  for(let i=0;i<pos.count;i++){const x=pos.getX(i)+gx,z=pos.getZ(i)+gz;for(const p of list)if(Math.abs(x-p.x)<6.5&&Math.abs(z-p.z)<6.5){pos.setY(i,hAt(x,z));ch=true;break}}
  if(ch){pos.needsUpdate=true;groundGeo2.computeVertexNormals()}}
window.buildGround=function(st){INF.st=st;const cv0=groundCanvas(st.ground),tex=new THREE.CanvasTexture(cv0);tex.wrapS=tex.wrapT=THREE.RepeatWrapping;const rp=GS2/(cv0.width/8);tex.repeat.set(rp,rp);
  tex.encoding=THREE.sRGBEncoding;tex.magFilter=THREE.NearestFilter;tex.minFilter=THREE.NearestMipmapLinearFilter;tex.anisotropy=renderer.capabilities.getMaxAnisotropy();
  if(groundMat.map)groundMat.map.dispose();groundMat.map=tex;groundMat.needsUpdate=true;regroundAt(0,0)};
/* ---------- 地块生成 ---------- */
function h3(i,j,k){const v=Math.sin(i*127.1+j*311.7+k*74.7+WORLD.seed*13.3)*43758.5453;return v-Math.floor(v)}
function genChunk(i,j){const st=INF.st,N=st.nature,x0=i*CH,z0=j*CH,items=[],path=[],A=CH*CH/(152*152);INF.chunks.set(ckey(i,j),{items,path});
  const nearPoi=(x,z,r)=>POIS.some(p=>Math.abs(p.x-x)<r&&Math.abs(p.z-z)<r&&Math.hypot(p.x-x,p.z-z)<r),near=(x,z,r)=>path.some(p=>(p[0]-x)**2+(p[1]-z)**2<r*r);
  const add=(k,x,z,r=rand(0,TAU),s=rand(.85,1.2),tilt=0)=>{items.push({k,x,z,r,s,tilt});if(DCOL[k])addCol(x,z,DCOL[k]*s)};
  const cnt=n=>Math.floor(n)+(Math.random()<n%1?1:0),rp=(m=2)=>[x0+rand(m,CH-m),z0+rand(m,CH-m)];
  // 随机据点：越走越远，宝藏越多
  for(const[t,pr]of[['chest',.3],['charge',.1],['blood',.05],['curse',.05],['nest',.03]])if(Math.random()<pr)for(let k=0;k<10;k++){const x=x0+rand(8,CH-8),z=z0+rand(8,CH-8);if(nearPoi(x,z,16))continue;const p=addPoi(t,x,z);buildPoiMesh(p);INF.newPois.push(p);break}
  // 小路：地块中心连向四条边上的共享出口，相邻地块自然接上
  if(N){const cx=x0+CH*(.35+.3*h3(i,j,1)),cz=z0+CH*(.35+.3*h3(i,j,2)),ends=[];
    if(h3(i,j,3)<.6)ends.push([x0+CH,z0+CH*(.25+.5*h3(i,j,4))]);if(h3(i-1,j,3)<.6)ends.push([x0,z0+CH*(.25+.5*h3(i-1,j,4))]);
    if(h3(i,j,5)<.6)ends.push([x0+CH*(.25+.5*h3(i,j,6)),z0+CH]);if(h3(i,j-1,5)<.6)ends.push([x0+CH*(.25+.5*h3(i,j-1,6)),z0]);
    if(ends.length>=2)for(const[bx,bz]of ends){const L=Math.hypot(bx-cx,bz-cz),qx=(cx+bx)/2+rand(-.25,.25)*L,qz=(cz+bz)/2+rand(-.25,.25)*L,n=Math.max(2,Math.ceil(L/1.15));let lastH=-9,lastG=-9;
      for(let s=0;s<=n;s++){const t=s/n,u=1-t,x=u*u*cx+2*u*t*qx+t*t*bx,z=u*u*cz+2*u*t*qz+t*t*bz,dx=2*u*(qx-cx)+2*t*(bx-qx),dz=2*u*(qz-cz)+2*t*(bz-qz),a=Math.atan2(dx,dz),px=Math.cos(a),pz=-Math.sin(a);
        if(nearPoi(x,z,5.5))continue;const w=s%2?.5:-.5;items.push({k:'slab',x:x+px*w+rand(-.15,.15),z:z+pz*w+rand(-.15,.15),r:rand(0,TAU),s:rand(.75,1.1),tilt:0});
        if(Math.random()<.5)items.push({k:'slab',x:x-px*w*1.1,z:z-pz*w*1.1,r:rand(0,TAU),s:rand(.6,.9),tilt:0});path.push([x,z]);
        if(N.hedges&&s-lastH>7&&Math.random()<.3&&!nearPoi(x,z,9)){lastH=s;for(const sd of[-1,1])items.push({k:'hedge',x:x+px*2.3*sd,z:z+pz*2.3*sd,r:a-Math.PI/2,s:rand(.7,.9),tilt:0})}
        if(N.gates&&s-lastG>14&&Math.random()<.25&&!nearPoi(x,z,9)){lastG=s;items.push({k:'pagoda',x,z,r:a-Math.PI/2,s:.9,tilt:0})}}}}
  // 常规装饰
  for(const k in st.decor){const m=cnt(st.decor[k]*A);for(let n=0;n<m;n++){const[x,z]=rp();if(nearPoi(x,z,5)||near(x,z,2.5))continue;add(k,x,z)}}
  if(N){for(const[k,nc,per,spr]of N.clusters){const m=cnt(nc*A*1.15);for(let c=0;c<m;c++){const[cx,cz]=rp(6);
        for(let q=0;q<per;q++){const a=rand(0,TAU),r=spr*Math.sqrt(Math.random()),x=cx+Math.sin(a)*r,z=cz+Math.cos(a)*r;if(near(x,z,1.8)||nearPoi(x,z,5.5))continue;
          add(k,x,z,rand(0,TAU),k==='treeR'?rand(.8,1.45):rand(.7,1.2));if(k==='treeR'&&Math.random()<.6){const a2=rand(0,TAU);items.push({k:'tuft',x:x+Math.sin(a2)*1.2,z:z+Math.cos(a2)*1.2,r:rand(0,TAU),s:rand(.9,1.4),tilt:0})}}}}
    for(let n=cnt(N.tufts*A);n>0;n--){const[x,z]=rp(0);if(near(x,z,.9)||nearPoi(x,z,4))continue;items.push({k:'tuft',x,z,r:rand(0,TAU),s:rand(.8,1.5),tilt:0})}
    for(let n=cnt(N.flowers*A);n>0;n--){const[x,z]=rp(1);if(near(x,z,1)||nearPoi(x,z,4))continue;for(let q=Math.random()<.6?2:1;q>0;q--)items.push({k:'flower',x:x+rand(-.8,.8),z:z+rand(-.8,.8),r:rand(0,TAU),s:rand(.8,1.4),tilt:0})}}}
function rebuildDecor(){for(const k in DK)DK[k].begin();
  for(let i=INF.ci-CR;i<=INF.ci+CR;i++)for(let j=INF.cj-CR;j<=INF.cj+CR;j++){const c=INF.chunks.get(ckey(i,j));if(!c)continue;
    for(const d of c.items){if(d.y==null)d.y=hAt(d.x,d.z)+(d.k==='pool'?.02:0);if(d.c===undefined)d.c=DTINT[d.k]?new THREE.Color(pick(DTINT[d.k])):d.k==='glass'?new THREE.Color(pick([0x8a60ff,0xff4060,0x40a0ff,0xffb040])):null;
      DK[d.k].add(d.x,d.y,d.z,d.r,d.s,0,0,d.c,d.tilt)}}
  for(const k in DK)DK[k].end()}
function streamTick(px,pz){if(!INF.st)return;const ci=Math.floor(px/CH),cj=Math.floor(pz/CH);
  if(ci!==INF.ci||cj!==INF.cj){INF.ci=ci;INF.cj=cj;for(let i=ci-CR;i<=ci+CR;i++)for(let j=cj-CR;j<=cj+CR;j++)if(!INF.chunks.has(ckey(i,j)))genChunk(i,j);rebuildDecor()}
  if(Math.abs(px-INF.gx)>40||Math.abs(pz-INF.gz)>40){INF.newPois.length=0;regroundAt(Math.round(px/GSNAP)*GSNAP,Math.round(pz/GSNAP)*GSNAP)}
  else if(INF.newPois.length){regroundPatch(INF.newPois);INF.newPois.length=0}
  if(Math.abs(px-MAPC.x)>30||Math.abs(pz-MAPC.z)>30){MAPC.x=Math.round(px/10)*10;MAPC.z=Math.round(pz/10)*10;drawMapBg(INF.st)}}
/* ---------- 整层构建：把初始区域的装饰装进地块，撤掉围墙 ---------- */
wrapHook('buildStage',o=>idx=>{INF.chunks.clear();INF.ci=INF.cj=null;INF.newPois.length=0;MAPC.x=MAPC.z=0;o(idx);
  for(let i=-2;i<=1;i++)for(let j=-2;j<=1;j++)INF.chunks.set(ckey(i,j),{items:[],path:[]});
  for(const d of decor){const c=INF.chunks.get(ckey(Math.floor(d.x/CH),Math.floor(d.z/CH)));if(c)c.items.push(d)}
  for(const p of WORLD.paths||[]){const c=INF.chunks.get(ckey(Math.floor(p[0]/CH),Math.floor(p[1]/CH)));if(c)c.path.push(p)}
  wallKind.begin();wallKind.end();streamTick(0,0);drawMapBg(INF.st)});
wrapHook('animAmbient',o=>(dt,rt,cx,cz)=>{o(dt,rt,cx,cz);if(G.state!=='menu')streamTick(cx,cz)});
/* ---------- 小地图底图：以 MAPC 为中心的 160×160 区域 ---------- */
window.drawMapBg=function(st){if(!st)return;const g=mapBg.getContext('2d'),H=WORLD.H,S=400/(2*H),ox=MAPC.x,oz=MAPC.z,day=!!st.nature;
  g.fillStyle=day?st.ground.bg:'#1c1e34';g.fillRect(0,0,400,400);
  for(let i=0;i<40;i++)for(let j=0;j<40;j++){const x=ox-H+(i+.5)*(2*H/40),z=oz-H+(j+.5)*(2*H/40),h=hAtRaw(x,z);
    g.fillStyle=h>0?`rgba(255,255,230,${clamp(h*.05,0,.16)})`:`rgba(0,${day?30:0},${day?0:30},${clamp(-h*.06,0,.22)})`;g.fillRect(i*10,j*10,10,10)}
  const tx=x=>(x-ox+H)*S,tz=z=>(z-oz+H)*S,ci=Math.floor(ox/CH),cj=Math.floor(oz/CH),r=Math.ceil(H/CH)+1;
  const COL={treeR:'#1e5a24',bush:'#2a6a2a',rock:'#8a8c94',tower:'#e8dcc4',fountain:'#7ad8ff',pagoda:'#d8342a',arena:'#f0ece2',hedge:'#2a6a2a',building:'#5a6488',car:'#c8c8d8',neon:'#ff3a8a',barrier:'#ff9a30'};
  for(let i=ci-r;i<=ci+r;i++)for(let j=cj-r;j<=cj+r;j++){const c=INF.chunks.get(ckey(i,j));if(!c)continue;
    g.fillStyle='rgba(235,220,190,.75)';for(const[x,z]of c.path)g.fillRect(tx(x)-2,tz(z)-2,4,4);
    for(const d of c.items){const cl=COL[d.k];if(!cl)continue;const s=d.k==='arena'?13:d.k==='building'?11:d.k==='treeR'?3:2.5;g.fillStyle=cl;g.fillRect(tx(d.x)-s,tz(d.z)-s,s*2,s*2)}}
  g.strokeStyle='rgba(255,255,255,.35)';g.lineWidth=3;g.strokeRect(1.5,1.5,397,397)};
/* 首领到点强制登场时，如果擂台太远，把擂台搬到玩家附近（无限地图里不必折返） */
wrapHook('summonBoss',o=>forced=>{const alt=POIS.find(p=>p.type==='boss'&&!p.used);
  if(alt&&!RUN.bossSummoned&&Math.hypot(alt.x-P.x,alt.z-P.z)>60){const a=rand(0,TAU);alt.x=P.x+Math.sin(a)*14;alt.z=P.z+Math.cos(a)*14;alt.y=hAtRaw(alt.x,alt.z);
    if(alt.g)alt.g.position.set(alt.x,alt.y,alt.z);regroundPatch([alt]);toast('首领擂台降临','擂台撕开空间，出现在你身边','altar')}
  o(forced)});

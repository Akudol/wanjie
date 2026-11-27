/* ============ 万界乱斗 · 像素光效精灵 ============
   把投射物原来的"白色光球"换成按元素绘制的像素动画光效：
   火焰（跳动的火苗）· 冰霜（旋转冰晶）· 雷电（噼啪电球）· 暗影（旋涡）· 鲜血（血月牙）· 物理（金色星芒）
   每个投射物带两段残影拖尾；敌方弹幕是品红色旋涡；命中时爆出一朵对应元素的冲击花。 */
const FXA=(()=>{const S=32,N=6,c=document.createElement('canvas');c.width=c.height=S*N;const g=c.getContext('2d');
  const R=(seed=>()=>(seed=(seed*16807)%2147483647)/2147483647)(97);
  const px=(x,y,col)=>{g.fillStyle=col;g.fillRect(x|0,y|0,1,1)};
  const disc=(ox,oy,cx,cy,r,col,fn)=>{for(let y=-r;y<=r;y++)for(let x=-r;x<=r;x++){const d=Math.hypot(x,y);if(d<=r&&(!fn||fn(x,y,d)))px(ox+cx+x,oy+cy+y,col)}};
  for(let f=0;f<N;f++){const ox=f*S;
    // 0 火焰：上尖下圆的火苗，逐帧跳动
    {const oy=0,w=Math.sin(f/N*TAU)*1.5;for(let y=0;y<26;y++){const t=y/26,hw=Math.sin(t*Math.PI)*(t<.6?t/.6:1)*9;for(let x=-hw;x<=hw;x++){const k=Math.abs(x)/hw,cy=30-y,lx=16+x+w*t*t;
        px(ox+lx,oy+cy,k>.8?'#c8281a':k>.55||t>.75?'#ff6a1a':k>.3||t>.55?'#ffb030':'#fff2a0')}}
      for(let i=0;i<4;i++)px(ox+10+R()*12,oy+2+R()*8,R()<.5?'#ffb030':'#ff6a1a')}
    // 1 冰霜：六角冰晶，旋转
    {const oy=S,a0=f/N*Math.PI/3;for(let k=0;k<6;k++){const a=a0+k*Math.PI/3;for(let r=0;r<13;r++){const x=16+Math.cos(a)*r,y=16+Math.sin(a)*r;px(ox+x,oy+y,r<4?'#ffffff':'#9ae8ff');
        if(r===7||r===10)for(const s of[-1,1]){const b=a+s*.9;for(let q=1;q<4;q++)px(ox+x+Math.cos(b)*q,oy+y+Math.sin(b)*q,'#5ac8ff')}}}disc(ox,oy,16,16,2,'#ffffff')}
    // 2 雷电：电球 + 随机电弧
    {const oy=S*2;disc(ox,oy,16,16,6,'#7a6aff');disc(ox,oy,16,16,4,'#c8c0ff');disc(ox,oy,16,16,2,'#ffffff');
      for(let k=0;k<4;k++){let x=16,y=16,a=R()*TAU;for(let s=0;s<10;s++){a+=(R()-.5)*1.3;x+=Math.cos(a)*1.4;y+=Math.sin(a)*1.4;px(ox+x,oy+y,s<5?'#ffffff':'#a8a0ff')}}}
    // 3 暗影：旋涡
    {const oy=S*3;disc(ox,oy,16,16,5,'#3a0a5a');for(let k=0;k<3;k++)for(let s=0;s<40;s++){const a=s*.18+k*TAU/3+f/N*TAU,r=3+s*.25;px(ox+16+Math.cos(a)*r,oy+16+Math.sin(a)*r,s<14?'#e0b0ff':s<28?'#b060ff':'#6a20c0')}disc(ox,oy,16,16,2,'#f0d8ff')}
    // 4 鲜血：旋转的血月牙
    {const oy=S*4,a0=f/N*TAU;disc(ox,oy,16,16,11,'#ff2040',(x,y,d)=>{const xx=x*Math.cos(a0)+y*Math.sin(a0),yy=-x*Math.sin(a0)+y*Math.cos(a0);return Math.hypot(xx-4,yy)>8.5});
      disc(ox,oy,16,16,11,'#ff8a9a',(x,y,d)=>{const xx=x*Math.cos(a0)+y*Math.sin(a0),yy=-x*Math.sin(a0)+y*Math.cos(a0);return d>9.5&&Math.hypot(xx-4,yy)>8.5})}
    // 5 物理：金色四角星芒
    {const oy=S*5,a0=f/N*Math.PI/2;for(let k=0;k<4;k++){const a=a0+k*Math.PI/2;for(let r=0;r<14;r++){const w=Math.max(0,2.5-r*.2);for(let q=-w;q<=w;q++)px(ox+16+Math.cos(a)*r-Math.sin(a)*q,oy+16+Math.sin(a)*r+Math.cos(a)*q,r<5?'#ffffff':'#ffe070')}}
      for(let k=0;k<4;k++){const a=a0+Math.PI/4+k*Math.PI/2;for(let r=0;r<7;r++)px(ox+16+Math.cos(a)*r,oy+16+Math.sin(a)*r,'#fff6c8')}}}
  const t=new THREE.CanvasTexture(c);t.magFilter=t.minFilter=THREE.NearestFilter;t.generateMipmaps=false;return t})();
const FXROW={fire:0,frost:1,volt:2,dark:3,blood:4,phys:5};
const FXS=(()=>{const MAX=1400,geo=new THREE.PlaneGeometry(1,1),cell=new Float32Array(MAX);geo.setAttribute('aCell',new THREE.InstancedBufferAttribute(cell,1));
  const mat=new THREE.MeshBasicMaterial({map:FXA,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,color:0xffffff});
  mat.onBeforeCompile=sh=>{sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nattribute float aCell;').replace('#include <uv_vertex>','#include <uv_vertex>\n#ifdef USE_UV\nvUv=(vUv+vec2(mod(aCell,6.),5.-floor(aCell/6.)))/6.;\n#endif')};
  mat.customProgramCacheKey=()=>'fxs6';
  const m=new THREE.InstancedMesh(geo,mat,MAX);m.frustumCulled=false;m.renderOrder=5;const w=new THREE.Color(1,1,1);for(let i=0;i<MAX;i++)m.setColorAt(i,w);m.count=0;scene.add(m);
  const _m=new THREE.Matrix4(),_p=new THREE.Vector3(),_s=new THREE.Vector3(),_c=new THREE.Color();let n=0;
  return{begin(){n=0},add(x,y,z,s,row,frame,col,k=1){if(n>=MAX)return;_p.set(x,y,z);_s.set(s,s,s);_m.compose(_p,camera.quaternion,_s);m.setMatrixAt(n,_m);
      _c.set(col||0xffffff).multiplyScalar(k);m.setColorAt(n,_c);cell[n]=row*6+((frame%6)+6)%6;n++},
    end(){m.count=n;m.instanceMatrix.needsUpdate=true;if(m.instanceColor)m.instanceColor.needsUpdate=true;geo.attributes.aCell.needsUpdate=true}}})();
// 按武器 / 元素决定光效
const KIND_EL={dagger:'phys',orb:'blood',sonic:'blood',wisp:'dark',raven:'dark',skull:'blood',shard:'frost',orbB:'volt',tbullet:'fire',crescent:'phys',ball:'phys'};
const KIND_SZ={ball:1.5,orbB:1.25,skull:1.4,tbullet:.85,dagger:.75,crescent:1.3,orb:1.1,wisp:1,raven:.9,sonic:.8,shard:.7};
const impacts=[];
// 把原来的白色光晕 / 光球藏起来，由像素光效代替
(function(){const hideAll=['orb','sonic','wisp','ebolt','orbB'],hideGlow=['dagger','raven','skull','tbullet','crescent','scythe','shard'];
  for(const k of hideAll)if(K[k])for(const P of K[k].parts)P.m.visible=false;
  for(const k of hideGlow)if(K[k])for(const P of K[k].parts)if(P.m.material&&P.m.material.blending===THREE.AdditiveBlending&&k!=='crescent'&&k!=='shard')P.m.visible=false})();
wrapHook('relicOnHit',o=>(e,op,d)=>{o(e,op,d);if(op.dot||impacts.length>60||Math.random()>.45)return;const el=op.el||'phys';impacts.push({x:e.x+rand(-.3,.3),y:e.y+1.1*(e.s||1),z:e.z+rand(-.3,.3),row:FXROW[el]??5,t:0,s:d>60?2:1.3})});
function fxSpritesRender(){if(!P||!RUN||G.state==='menu'){FXS.begin();FXS.end();return}const rt=G.rt;FXS.begin();
  for(let i=0;i<proj.length;i++){const p=proj[i],el=p.el||KIND_EL[p.k]||'phys',row=FXROW[el]??5,s=(KIND_SZ[p.k]||.95)*(p.sz||1),y=p.y!=null?p.y:1,fr=Math.floor(rt*14+i*1.7);
    const col=typeof colOf==='function'?colOf(p.src,el):0xffffff;
    FXS.add(p.x,y,p.z,s*1.05,row,fr,0xffffff,.85);FXS.add(p.x,y,p.z,s*1.6,row,fr+3,col,.32);
    const vx=p.vx||0,vz=p.vz||0;for(let j=1;j<=2;j++)FXS.add(p.x-vx*.035*j,y,p.z-vz*.035*j,s*(1-j*.25),row,fr+j,col,.4-j*.12)}
  for(let i=0;i<ebolts.length;i++){const b=ebolts[i];if(b.life<=0)continue;const y=hAt(b.x,b.z)+1.1,fr=Math.floor(rt*12+i);FXS.add(b.x,y,b.z,1,3,fr,0xff6ac8,.9);FXS.add(b.x,y,b.z,1.5,4,fr+2,0xff2a6a,.4)}
  for(const h of impacts){const k=h.t/.28;FXS.add(h.x,h.y,h.z,h.s*(1+k*1.2),h.row,Math.floor(k*6),0xffffff,1-k)}
  FXS.end()}
wrapHook('homageRender',o=>()=>{o();fxSpritesRender()});
wrapHook('relicUpdate',o=>dt=>{o(dt);for(const h of impacts)h.t+=dt;for(let i=impacts.length-1;i>=0;i--)if(impacts[i].t>=.28)impacts.splice(i,1)});
// 众生之力球：不再是白色光球，而是旋转的蓝色能量核 + 环绕电光 + 金色星芒
if(typeof bombMesh!=='undefined'){bombMesh.children.forEach(c=>c.visible=false);
  wrapHook('homageRender',o=>()=>{o();if(!bombMesh.visible||G.state==='menu')return;const p=bombMesh.position,s=Math.max(.6,bombMesh.scale.x),rt=G.rt,fr=Math.floor(rt*12);
    FXS.add(p.x,p.y,p.z,s*3.2,2,fr,0x6ac8ff,1);FXS.add(p.x,p.y,p.z,s*4.6,2,fr+3,0x2a6aff,.6);FXS.add(p.x,p.y,p.z,s*2,5,fr,0xffffff,.9);
    for(let i=0;i<6;i++){const a=rt*2.4+i/6*TAU,r=s*1.9;FXS.add(p.x+Math.cos(a)*r,p.y+Math.sin(a*1.3)*s*.6,p.z+Math.sin(a)*r,s*.9,i%2?2:5,fr+i,i%2?0x9ae8ff:0xffe070,.9)}
    FXS.end()})}

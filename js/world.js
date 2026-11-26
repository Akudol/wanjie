/* ============ 万界乱斗 · 地图系统 ============ */
const WORLD={H:80,amp:1.4,seed:0,stage:0};
function hAt(x,z){const a=WORLD.amp,s=WORLD.seed;
  let h=a*(Math.sin(x*.065+s)*Math.cos(z*.058-s*.7)+Math.sin((x*.8+z)*.11+s*2)*.45+Math.cos((x-z*.6)*.04+s)*.6);
  const e=Math.max(Math.abs(x),Math.abs(z))-(WORLD.H-8);if(e>0)h+=e*e*.12;
  // POI 平台
  for(const p of POIS){const d2=(x-p.x)**2+(z-p.z)**2;if(d2<36){const k=1-d2/36;h=h*(1-k)+p.y*k}}
  return h}

/* ---------- 地面 ---------- */
const GSIZE=220,GSEG=160;
const groundGeo=new THREE.PlaneGeometry(GSIZE,GSIZE,GSEG,GSEG);groundGeo.rotateX(-Math.PI/2);
const groundMat=std(0xffffff,{roughness:.95});
const ground=new THREE.Mesh(groundGeo,groundMat);ground.receiveShadow=true;scene.add(ground);
function buildGround(st){
  const tex=new THREE.CanvasTexture(groundCanvas(st.ground));tex.wrapS=tex.wrapT=THREE.RepeatWrapping;tex.repeat.set(GSIZE/8,GSIZE/8);
  tex.encoding=THREE.sRGBEncoding;tex.magFilter=THREE.NearestFilter;tex.minFilter=THREE.NearestMipmapLinearFilter;tex.anisotropy=renderer.capabilities.getMaxAnisotropy();
  if(groundMat.map)groundMat.map.dispose();groundMat.map=tex;groundMat.needsUpdate=true;
  const pos=groundGeo.attributes.position;for(let i=0;i<pos.count;i++)pos.setY(i,hAt(pos.getX(i),pos.getZ(i)));
  pos.needsUpdate=true;groundGeo.computeVertexNormals();
}

/* ---------- 装饰件（所有层共用的实例池） ---------- */
const stoneM=std(0x5a5560,{roughness:.95}),stoneD=std(0x3d3842,{roughness:.95}),woodM=std(0x2a1d1a),waxM=std(0xe8dcc0,{roughness:.6}),
  flameM=bas(0xffb050),ironM=std(0x2a2830,{metalness:.6,roughness:.5}),boneM=std(0xd8ccb0,{roughness:.7}),bloodM=std(0x5a0008,{roughness:.15,metalness:.3,emissive:0x200002}),
  spikeM=std(0x2a1416,{roughness:.8}),marbleM=std(0x8a8698,{roughness:.6});
const DK={
  tomb:new Kind([{g:GEO.box,m:stoneM,l:L(0,.6,0,0,0,0,.9,1.2,.25),sh:1,rs:1},{g:GEO.cyl,m:stoneM,l:L(0,1.2,0,Math.PI/2,0,0,.45,.25,.45),sh:1},{g:GEO.box,m:stoneD,l:L(0,.08,.35,0,0,0,1.1,.16,.9),rs:1}],90),
  cross:new Kind([{g:GEO.box,m:stoneD,l:L(0,1,0,0,0,0,.22,2,.22),sh:1},{g:GEO.box,m:stoneD,l:L(0,1.45,0,0,0,0,1,.2,.2),sh:1},{g:GEO.box,m:stoneM,l:L(0,.1,0,0,0,0,.7,.2,.7),rs:1}],40),
  tree:new Kind([{g:GEO.cyl,m:woodM,l:L(0,1.8,0,0,0,.05,.22,3.6,.22),sh:1},{g:GEO.cyl,m:woodM,l:L(.6,3.1,0,0,0,-.9,.09,1.8,.09),sh:1},{g:GEO.cyl,m:woodM,l:L(-.5,2.6,.2,.3,0,.8,.08,1.5,.08),sh:1},{g:GEO.cyl,m:woodM,l:L(.1,3.6,-.4,-.7,0,.1,.07,1.4,.07),sh:1},{g:GEO.cyl,m:woodM,l:L(-.9,3.2,.3,0,0,1.2,.05,1,.05),sh:1}],30),
  pillar:new Kind([{g:GEO.cyl,m:stoneM,l:L(0,2.2,0,0,0,0,.55,4.4,.55),sh:1,rs:1},{g:GEO.box,m:stoneD,l:L(0,.2,0,0,0,0,1.5,.4,1.5),sh:1,rs:1},{g:GEO.box,m:stoneD,l:L(0,4.5,0,0,0,0,1.4,.35,1.4),sh:1},{g:GEO.box,m:stoneM,l:L(.5,.15,1.1,.2,.5,.3,.6,.3,.5),sh:1}],50),
  arch:new Kind([{g:GEO.box,m:stoneM,l:L(-1.8,2,0,0,0,0,.7,4,.7),sh:1,rs:1},{g:GEO.box,m:stoneM,l:L(1.8,2,0,0,0,0,.7,4,.7),sh:1,rs:1},{g:GEO.box,m:stoneD,l:L(0,4.3,0,0,0,0,4.6,.6,.8),sh:1},{g:GEO.cone,m:stoneD,l:L(0,5.2,0,0,0,0,.6,1.2,.6),sh:1}],12),
  candle:new Kind([{g:GEO.cyl,m:waxM,l:L(0,.3,0,0,0,0,.08,.6,.08)},{g:GEO.cyl,m:waxM,l:L(.18,.2,.1,0,0,0,.07,.4,.07)},{g:GEO.cyl,m:waxM,l:L(-.12,.25,.16,0,0,0,.06,.5,.06)},{g:GEO.cone,m:flameM,l:L(0,.68,0,0,0,0,.05,.16,.05)},{g:GEO.cone,m:flameM,l:L(.18,.47,.1,0,0,0,.045,.14,.045)},{g:GEO.cone,m:flameM,l:L(-.12,.57,.16,0,0,0,.04,.13,.04)}],60),
  fence:new Kind([{g:GEO.box,m:ironM,l:L(0,.9,0,0,0,0,4,.08,.08),sh:1},{g:GEO.box,m:ironM,l:L(0,.3,0,0,0,0,4,.08,.08)},...[-1.8,-1.2,-.6,0,.6,1.2,1.8].map(x=>({g:GEO.cone,m:ironM,l:L(x,.75,0,0,0,0,.05,1.5,.05),sh:1}))],24),
  pew:new Kind([{g:GEO.box,m:woodM,l:L(0,.45,0,0,0,0,3.2,.12,.7),sh:1,rs:1},{g:GEO.box,m:woodM,l:L(0,.8,-.32,0,0,0,3.2,.8,.1),sh:1},{g:GEO.box,m:woodM,l:L(-1.55,.4,0,0,0,0,.1,.8,.75)},{g:GEO.box,m:woodM,l:L(1.55,.4,0,0,0,0,.1,.8,.75)}],44),
  statue:new Kind([{g:GEO.box,m:stoneD,l:L(0,.5,0,0,0,0,1.4,1,1.4),sh:1,rs:1},{g:GEO.cone,m:marbleM,l:L(0,1.9,0,0,0,0,.6,1.9,.6),sh:1},{g:GEO.sph,m:marbleM,l:L(0,3,0,0,0,0,.26),sh:1},{g:GEO.box,m:marbleM,l:L(.5,2.5,-.2,0,.4,-.5,.12,1.3,.6),sh:1},{g:GEO.box,m:marbleM,l:L(-.5,2.5,-.2,0,-.4,.5,.12,1.3,.6),sh:1}],12),
  glass:new Kind([{g:GEO.plane,m:new THREE.MeshBasicMaterial({map:beamTex,color:0xffffff,transparent:true,opacity:.35,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}),tint:0x8a60ff,main:1,l:L(0,6,0,0,0,.35,3,13,1)},
    {g:GEO.plane,m:new THREE.MeshBasicMaterial({map:glowTex,color:0xffffff,transparent:true,opacity:.35,blending:THREE.AdditiveBlending,depthWrite:false}),tint:0x8a60ff,main:1,l:L(-2,.05,0,-Math.PI/2,0,0,4.5,3,1)}],16),
  spike:new Kind([{g:GEO.cone,m:spikeM,l:L(0,1.2,0,.1,0,.08,.45,2.4,.45),sh:1},{g:GEO.cone,m:spikeM,l:L(.5,.7,.3,-.3,0,-.4,.25,1.4,.25),sh:1},{g:GEO.cone,m:boneM,l:L(-.4,.6,-.2,.4,0,.3,.15,1.2,.15),sh:1}],60),
  cage:new Kind([{g:GEO.cyl,m:ironM,l:L(0,.05,0,0,0,0,.9,.1,.9),rs:1},{g:GEO.cone,m:ironM,l:L(0,2.6,0,0,0,0,1,.6,1),sh:1},...[0,1,2,3,4,5,6,7].map(i=>({g:GEO.cyl,m:ironM,l:L(Math.sin(i/8*TAU)*.85,1.15,Math.cos(i/8*TAU)*.85,0,0,0,.04,2.3,.04),sh:1})),{g:GEO.sph,m:boneM,l:L(.2,.25,0,0,0,0,.2),sh:1}],16),
  pool:new Kind([{g:new THREE.CircleGeometry(1,24),m:bloodM,l:L(0,.04,0,-Math.PI/2,0,0,3,3,1),rs:1},{g:GEO.plane,m:new THREE.MeshBasicMaterial({map:glowTex,color:0xff1030,transparent:true,opacity:.18,blending:THREE.AdditiveBlending,depthWrite:false}),l:L(0,.08,0,-Math.PI/2,0,0,7,7,1)}],16),
  bones:new Kind([{g:GEO.sph,m:boneM,l:L(0,.18,0,0,0,0,.2,.18,.22),sh:1},{g:GEO.cyl,m:boneM,l:L(.4,.06,.1,0,0,Math.PI/2,.04,.7,.04)},{g:GEO.cyl,m:boneM,l:L(-.2,.06,.35,Math.PI/2,.6,0,.035,.6,.035)}],50),
};
const wallKind=new Kind([{g:GEO.box,m:W_,tint:0x3a3540,main:1,l:L(0,3,0,0,0,0,6.2,6,2.2),sh:1,rs:1},{g:GEO.box,m:W_,tint:0x2a2630,main:1,l:L(-2,6.5,0,0,0,0,1.4,1,2.4),sh:1},{g:GEO.box,m:W_,tint:0x2a2630,main:1,l:L(2,6.5,0,0,0,0,1.4,1,2.4),sh:1}],140);
const DCOL={tomb:.6,cross:.35,tree:.4,pillar:.85,statue:.85,spike:.6,cage:.95,pew:0,arch:0};
let decor=[],colGrid=new Map();
const ck=(x,z)=>(Math.floor(x/4)+500)*2000+(Math.floor(z/4)+500);
function addCol(x,z,r){const k=ck(x,z);let a=colGrid.get(k);if(!a){a=[];colGrid.set(k,a)}a.push([x,z,r])}
function collide(o,r){const x0=Math.floor((o.x-3)/4),x1=Math.floor((o.x+3)/4),z0=Math.floor((o.z-3)/4),z1=Math.floor((o.z+3)/4);
  for(let i=x0;i<=x1;i++)for(let j=z0;j<=z1;j++){const a=colGrid.get((i+500)*2000+(j+500));if(!a)continue;
    for(const c of a){const dx=o.x-c[0],dz=o.z-c[1],d=Math.hypot(dx,dz),m=c[2]+r;if(d<m&&d>1e-4){o.x=c[0]+dx/d*m;o.z=c[1]+dz/d*m}}}
  const B=WORLD.H-2;o.x=clamp(o.x,-B,B);o.z=clamp(o.z,-B,B)}
function freeSpot(minPoi=7,minC=7){for(let k=0;k<40;k++){const B=WORLD.H-6,x=rand(-B,B),z=rand(-B,B);
  if(Math.hypot(x,z)<minC)continue;if(POIS.some(p=>Math.hypot(p.x-x,p.z-z)<minPoi))continue;return[x,z]}return[rand(-60,60),rand(-60,60)]}
function placeDecor(st){
  decor=[];
  const add=(k,x,z,r=rand(0,TAU),s=rand(.85,1.25),tilt=0)=>{decor.push({k,x,z,r,s,tilt});
    if(k==='arch'){const c=Math.cos(r),sn=Math.sin(r);addCol(x+c*1.8*s,z-sn*1.8*s,.55);addCol(x-c*1.8*s,z+sn*1.8*s,.55)}
    else if(k==='pew'){const c=Math.cos(r),sn=Math.sin(r);for(const o of[-1.1,0,1.1])addCol(x+c*o*s,z-sn*o*s,.45)}
    else if(DCOL[k])addCol(x,z,DCOL[k]*s)};
  if(st.id==='cathedral'){ // 柱廊与长椅
    for(const cx of[-14,14,-44,44])for(let z=-68;z<=68;z+=11){const [ox,oz]=[cx+rand(-.3,.3),z];if(POIS.some(p=>Math.hypot(p.x-ox,p.z-oz)<6))continue;add('pillar',ox,oz,0,1.1)}
    for(let bx of[-29,29])for(let z=-60;z<=60;z+=4.2){if(Math.random()<.25)continue;for(const dx of[-5,0,5]){const x=bx+dx;if(POIS.some(p=>Math.hypot(p.x-x,p.z-z)<6))continue;add('pew',x,z,rand(-.08,.08)+(Math.random()<.1?rand(-.6,.6):0),1)}}
  }
  for(const k in st.decor){let n=st.decor[k];if(st.id==='cathedral'&&(k==='pillar'||k==='pew'))n=Math.floor(n*.25);
    for(let i=0;i<n;i++){const[x,z]=freeSpot(5,5);
      if(k==='tomb'||k==='cross')add(k,x,z,rand(-.3,.3)+(Math.random()<.5?0:Math.PI),rand(.85,1.2),rand(-.12,.12));
      else if(k==='candle')add(k,x,z,rand(0,TAU),rand(.8,1.4));
      else add(k,x,z)}}
  for(const k in DK)DK[k].begin();
  for(const d of decor){let y=hAt(d.x,d.z);if(d.k==='pool')y+=.02;DK[d.k].add(d.x,y,d.z,d.r,d.s,0,0,(typeof DTINT!=='undefined'&&DTINT[d.k]?new THREE.Color(pick(DTINT[d.k])):d.k==='glass'?new THREE.Color(pick([0x8a60ff,0xff4060,0x40a0ff,0xffb040])):null),d.tilt)}
  for(const k in DK)DK[k].end();
  // 外墙
  wallKind.begin();const H=WORLD.H+1.5,wt=new THREE.Color(st.wall);
  for(let s=-H;s<=H;s+=6){const sc=rand(.9,1.3);
    wallKind.add(s,hAt(s,-H)-1,-H,0,sc,0,0,wt);wallKind.add(s,hAt(s,H)-1,H,0,sc,0,0,wt);
    wallKind.add(-H,hAt(-H,s)-1,s,Math.PI/2,sc,0,0,wt);wallKind.add(H,hAt(H,s)-1,s,Math.PI/2,sc,0,0,wt)}
  wallKind.end();
}

/* ---------- 兴趣点（宝箱 / 神龛 / 祭坛 / 首领 / 传送门） ---------- */
let POIS=[];
const poiRoot=new THREE.Group();scene.add(poiRoot);
const goldM=std(0xc9a35a,{metalness:.8,roughness:.3});
function beam(col,h=34,r=.9){const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,12,1,true),new THREE.MeshBasicMaterial({map:beamTex,color:col,transparent:true,opacity:.5,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));m.position.y=h/2;return m}
function glowSprite(col,s){const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTex,color:col,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));sp.scale.set(s,s,1);return sp}
function mk(g,m,x,y,z,sx,sy=sx,sz=sx,rx=0,ry=0,rz=0){const o=new THREE.Mesh(g,m);o.position.set(x,y,z);o.scale.set(sx,sy,sz);o.rotation.set(rx,ry,rz);o.castShadow=true;o.receiveShadow=true;return o}
function groundRing(col,r){const m=new THREE.Mesh(GEO.plane,new THREE.MeshBasicMaterial({map:ringTex,color:col,transparent:true,opacity:.8,blending:THREE.AdditiveBlending,depthWrite:false}));m.rotation.x=-Math.PI/2;m.position.y=.08;m.scale.set(r*2,r*2,1);return m}
function buildPoiMesh(p){
  const g=new THREE.Group(),c=new THREE.Color(POI_INFO[p.type].c);p.parts={};
  if(p.type==='chest'){g.add(mk(GEO.box,std(0x3a2016),0,.35,0,1,.7,.7));const lid=mk(GEO.box,goldM,0,.74,0,1.06,.12,.76);g.add(lid);g.add(mk(GEO.box,goldM,0,.4,.36,.16,.22,.04));
    const gl=glowSprite(0xffc060,2.2);gl.position.y=.8;g.add(gl);p.parts.lid=lid;p.parts.glow=gl;p.parts.beam=beam(0xffc060,14,.5);g.add(p.parts.beam)}
  else if(p.type==='charge'){g.add(mk(GEO.cyl,stoneD,0,.25,0,1.1,.5,1.1));g.add(mk(GEO.cyl,stoneM,0,.8,0,.5,.7,.5));
    const cr=mk(GEO.oct,addM(0x8fe3ff,.9),0,2.1,0,.45,.75,.45);g.add(cr);p.parts.crystal=cr;p.parts.ring=groundRing(0x8fe3ff,3);g.add(p.parts.ring);p.parts.beam=beam(0x8fe3ff);g.add(p.parts.beam)}
  else if(p.type==='blood'){g.add(mk(GEO.box,stoneD,0,.5,0,2.2,1,1.4));g.add(mk(GEO.cyl,ironM,0,1.15,0,.55,.3,.55));g.add(mk(GEO.cyl,bloodM,0,1.32,0,.48,.04,.48));
    for(const s of[-1,1])g.add(mk(GEO.cyl,waxM,s*.9,1.3,.3,.08,.6,.08));const gl=glowSprite(0xff2040,3);gl.position.y=1.5;g.add(gl);p.parts.beam=beam(0xff3050);g.add(p.parts.beam)}
  else if(p.type==='curse'){g.add(mk(GEO.box,stoneD,0,.3,0,2,.6,2));const ob=mk(GEO.box,std(0x16101c,{roughness:.4,metalness:.3,emissive:0x2a0a40}),0,3,0,.9,5,.9);g.add(ob);g.add(mk(GEO.cone,std(0x16101c),0,5.9,0,.65,.9,.65,0,Math.PI/4));
    const gl=glowSprite(0xc77dff,3.5);gl.position.y=3.5;g.add(gl);p.parts.beam=beam(0xc77dff);g.add(p.parts.beam)}
  else if(p.type==='nest'){for(let i=0;i<9;i++){const a=i/9*TAU;g.add(mk(GEO.cyl,boneM,Math.sin(a)*1.1,.25,Math.cos(a)*1.1,.07,.9,.07,Math.cos(a)*.5,0,-Math.sin(a)*.5))}
    const egg=mk(GEO.sph,std(0x2a3a30,{emissive:0x0a4020,roughness:.4}),0,.65,0,.45,.6,.45);g.add(egg);p.parts.egg=egg;const gl=glowSprite(0x7dffb0,2.5);gl.position.y=.8;g.add(gl);p.parts.beam=beam(0x7dffb0);g.add(p.parts.beam)}
  else if(p.type==='boss'){g.add(mk(GEO.cyl,stoneD,0,.2,0,3.4,.4,3.4));g.add(mk(GEO.cyl,stoneM,0,.5,0,2.6,.3,2.6));
    for(let i=0;i<4;i++){const a=i/4*TAU+Math.PI/4;g.add(mk(GEO.box,stoneD,Math.sin(a)*2.9,1.6,Math.cos(a)*2.9,.5,3,.5));g.add(mk(GEO.sph,boneM,Math.sin(a)*2.9,3.3,Math.cos(a)*2.9,.3))}
    const cr=mk(GEO.oct,addM(0xff2040,.9),0,2.4,0,.6,1.1,.6);g.add(cr);p.parts.crystal=cr;g.add(groundRing(0xff2040,3.2));p.parts.beam=beam(0xff2040,40,1.3);g.add(p.parts.beam)}
  else if(p.type==='portal'){const t=mk(new THREE.TorusGeometry(2.2,.25,8,32),std(0x2a1a2a,{emissive:0x400010}),0,2.8,0,1);g.add(t);
    const d=mk(new THREE.CircleGeometry(2,32),new THREE.MeshBasicMaterial({map:glowTex,color:0xff3a60,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}),0,2.8,0,1);g.add(d);p.parts.disc=d;p.parts.beam=beam(0xff6a7a,40,1.6);g.add(p.parts.beam)}
  g.position.set(p.x,p.y,p.z);g.rotation.y=p.rot||0;poiRoot.add(g);p.g=g;
}
function addPoi(type,x,z){const p={type,x,z,y:0,used:false,prog:0,rot:rand(0,TAU)};p.y=0;POIS.push(p);p.y=hAtRaw(x,z);addCol(x,z,type==='boss'?0:type==='portal'?0:.9);return p}
function hAtRaw(x,z){const s=POIS;POIS=[];const h=hAt(x,z);POIS=s;return h}
function placePois(){
  POIS=[];
  const spot=(minD,minC)=>{for(let k=0;k<200;k++){const B=WORLD.H-10,x=rand(-B,B),z=rand(-B,B);if(Math.hypot(x,z)<minC)continue;if(POIS.some(p=>Math.hypot(p.x-x,p.z-z)<minD))continue;return[x,z]}return[rand(-50,50),rand(-50,50)]};
  {let[x,z]=spot(20,50);addPoi('boss',x,z)}
  for(let i=0;i<10;i++){const[x,z]=spot(14,10);addPoi('chest',x,z)}
  for(let i=0;i<4;i++){const[x,z]=spot(16,14);addPoi('charge',x,z)}
  for(let i=0;i<2;i++){const[x,z]=spot(16,16);addPoi('blood',x,z)}
  for(let i=0;i<2;i++){const[x,z]=spot(16,20);addPoi('curse',x,z)}
  {const[x,z]=spot(16,16);addPoi('nest',x,z)}
}
function clearPois(){for(const p of POIS)if(p.g){poiRoot.remove(p.g);p.g.traverse(o=>{if(o.material&&o.material!==goldM&&!Object.values({stoneM,stoneD,waxM,ironM,boneM,bloodM}).includes(o.material))o.material.dispose()})}POIS=[]}
function poiSetUsed(p){p.used=true;if(p.parts.beam)p.parts.beam.visible=false;if(p.parts.glow)p.parts.glow.visible=false;if(p.parts.ring)p.parts.ring.visible=false;
  if(p.type==='chest'){p.parts.lid.rotation.x=-1.1;p.parts.lid.position.set(0,.95,-.3)}if(p.parts.crystal)p.parts.crystal.visible=false;if(p.parts.egg)p.parts.egg.scale.set(.45,.25,.45)}
function animPois(t){for(const p of POIS){if(!p.g)continue;
  if(p.parts.crystal&&!p.used){p.parts.crystal.rotation.y=t*1.2;p.parts.crystal.position.y=2.2+Math.sin(t*2)*.15}
  if(p.parts.beam&&p.parts.beam.visible)p.parts.beam.material.opacity=.35+Math.sin(t*2+p.x)*.1;
  if(p.parts.disc){p.parts.disc.rotation.z=t*2;p.parts.disc.material.opacity=.7+Math.sin(t*4)*.2;p.g.rotation.y=t*.3}
  if(p.parts.ring&&p.type==='charge')p.parts.ring.rotation.z=t*.5}}

/* ---------- 雾与余烬 ---------- */
const mists=[];const mistM=new THREE.MeshBasicMaterial({map:mistTex,color:0x8a76b0,transparent:true,opacity:.16,depthWrite:false,blending:THREE.AdditiveBlending});
for(let i=0;i<40;i++){const m=new THREE.Mesh(GEO.plane,mistM);m.rotation.x=-Math.PI/2;const s=rand(10,22);m.scale.set(s,s,1);m.position.set(rand(-80,80),rand(.4,1.4),rand(-80,80));m.userData.v=rand(.2,.6);scene.add(m);mists.push(m)}
const ASH=520,ashGeo=new THREE.BufferGeometry(),ashPos=new Float32Array(ASH*3);
for(let i=0;i<ASH;i++){ashPos[i*3]=rand(-30,30);ashPos[i*3+1]=rand(0,14);ashPos[i*3+2]=rand(-30,30)}
ashGeo.setAttribute('position',new THREE.BufferAttribute(ashPos,3));
const ashMat=new THREE.PointsMaterial({size:.22,map:glowTex,color:0xff6a3a,transparent:true,opacity:.8,blending:THREE.AdditiveBlending,depthWrite:false});
const ash=new THREE.Points(ashGeo,ashMat);ash.frustumCulled=false;scene.add(ash);
function animAmbient(dt,rt,cx,cz){
  for(const m of mists){m.position.x+=m.userData.v*dt;if(m.position.x>WORLD.H+10)m.position.x=-WORLD.H-10}
  for(let i=0;i<ASH;i++){const j=i*3;ashPos[j+1]-=dt*(.5+(i%7)*.08);ashPos[j]+=Math.sin(rt*.6+i)*dt*.4+dt*.3;if(ashPos[j+1]<0)ashPos[j+1]+=14;
    ashPos[j]=cx+((ashPos[j]-cx+30)%60+60)%60-30;ashPos[j+2]=cz+((ashPos[j+2]-cz+30)%60+60)%60-30}
  ashGeo.attributes.position.needsUpdate=true}

/* ---------- 小地图背景 ---------- */
const mapBg=document.createElement('canvas');mapBg.width=mapBg.height=400;
function drawMapBg(st){const g=mapBg.getContext('2d'),S=400/(2*WORLD.H),H=WORLD.H;
  g.fillStyle='#0d0910';g.fillRect(0,0,400,400);
  for(let i=0;i<40;i++)for(let j=0;j<40;j++){const x=-H+(i+.5)*(2*H/40),z=-H+(j+.5)*(2*H/40),h=hAtRaw(x,z);g.fillStyle=`rgba(${st.id==='abyss'?'120,40,50':st.id==='cathedral'?'70,80,130':'90,70,120'},${clamp(.12+h*.06,.04,.4)})`;g.fillRect(i*10,j*10,10,10)}
  g.fillStyle='rgba(200,190,210,.35)';for(const d of decor){if(d.k==='candle'||d.k==='glass'||d.k==='bones')continue;g.fillRect((d.x+H)*S-1.5,(d.z+H)*S-1.5,3,3)}
  g.strokeStyle='rgba(201,163,90,.6)';g.lineWidth=3;g.strokeRect(1.5,1.5,397,397)}

/* ---------- 构建整层 ---------- */
function buildStage(idx){
  const st=STAGES[idx];WORLD.stage=idx;WORLD.amp=st.amp;WORLD.seed=rand(0,100);
  scene.background.set(st.fog);scene.fog.color.set(st.fog);scene.fog.density=st.fogD;
  hemi.color.set(st.hemi[0]);hemi.groundColor.set(st.hemi[1]);hemi.intensity=st.hemi[2];moon.color.set(st.moon);moon.intensity=st.moonI;
  mistM.color.set(st.id==='abyss'?0xa04050:st.id==='cathedral'?0x6a7ab0:0x8a76b0);ashMat.color.set(st.id==='cathedral'?0xd0c0ff:0xff6a3a);
  clearPois();colGrid.clear();placePois();buildGround(st);placeDecor(st);for(const p of POIS)buildPoiMesh(p);drawMapBg(st);
}

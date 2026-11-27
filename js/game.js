/* ============ 万界乱斗 · 战斗与实体 ============ */

/* ---------- 猎人模型 ---------- */
const player=new THREE.Group();scene.add(player);
const coatM=std(0x231824,{roughness:.9}),leatherM=std(0x3a2a2a),skinM=std(0xd8c8b4,{roughness:.7}),accM=std(0x8a0f1c),hatM=std(0x18121a);
const body=new THREE.Group();player.add(body);
function pm(g,m,x,y,z,sx,sy,sz,rx=0,rz=0){const o=new THREE.Mesh(g,m);o.position.set(x,y,z);o.scale.set(sx,sy,sz);o.rotation.set(rx,0,rz);o.castShadow=true;body.add(o);return o}
[[GEO.cone,coatM,0,.8,0,.62,1.6,.62],[GEO.cyl,leatherM,0,1.4,0,.3,.55,.26],[GEO.cyl,accM,0,1.66,0,.27,.12,.27],[GEO.sph,skinM,0,1.86,0,.2,.22,.2],
 [GEO.cyl,hatM,0,2.04,0,.62,.04,.62],[GEO.cyl,hatM,0,2.25,0,.24,.42,.24],[GEO.cyl,accM,0,2.1,0,.25,.06,.25],
 [GEO.cyl,leatherM,.33,1.25,.05,.08,.6,.08,0,.3],[GEO.cyl,leatherM,-.33,1.25,.05,.08,.6,.08,0,-.3]].forEach(a=>pm(...a));
pm(GEO.sph,bas(0xffd27a),.07,1.88,.17,.035,.035,.035);pm(GEO.sph,bas(0xffd27a),-.07,1.88,.17,.035,.035,.035);
pm(GEO.box,bas(0xffa040),.48,.92,.22,.16,.22,.16);
const lanternGlow=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTex,color:0xff8a30,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));lanternGlow.scale.set(1.6,1.6,1);lanternGlow.position.set(.48,.92,.22);body.add(lanternGlow);
pm(GEO.box,std(0xc8c8d8,{metalness:.9,roughness:.25}),-.42,1.0,.25,.05,1.1,.1,.5,0);
const pShadow=new THREE.Mesh(GEO.plane,new THREE.MeshBasicMaterial({map:glowTex,color:0x000000,transparent:true,opacity:.55,depthWrite:false}));pShadow.rotation.x=-Math.PI/2;scene.add(pShadow);
function dressHunter(id){const H=HUNTERS[id];coatM.color.set(H.coat);accM.color.set(H.acc)}

/* ---------- 敌人模型 ---------- */
const EK={
  ghoul:new Kind([
    {g:GEO.cyl,m:W_,tint:0x6f7868,main:1,l:L(0,.6,0,.35,0,0,.34,1.1,.3),sh:1},
    {g:GEO.sph,m:W_,tint:0x8a907e,main:1,l:L(0,1.12,.32,0,0,0,.27,.3,.27),sh:1},
    {g:GEO.box,m:W_,tint:0x5a6255,sh:1,a:(t,o)=>setL(o,.36,.82,.4,-1.2+Math.sin(t*6)*.35,0,0,.1,.75,.1)},
    {g:GEO.box,m:W_,tint:0x5a6255,sh:1,a:(t,o)=>setL(o,-.36,.82,.4,-1.2-Math.sin(t*6)*.35,0,0,.1,.75,.1)},
    {g:GEO.sphLo,m:eyeR,l:L(.1,1.16,.56,0,0,0,.05)},{g:GEO.sphLo,m:eyeR,l:L(-.1,1.16,.56,0,0,0,.05)}],440),
  bat:new Kind([
    {g:GEO.sph,m:W_,tint:0x2e2232,main:1,l:L(0,0,0,0,0,0,.24,.22,.3),sh:1},
    {g:GEO.box,m:W_,tint:0x3a2030,main:1,sh:1,a:(t,o)=>setL(o,.48,0,0,0,0,Math.sin(t*16)*.7,.8,.04,.42)},
    {g:GEO.box,m:W_,tint:0x3a2030,main:1,sh:1,a:(t,o)=>setL(o,-.48,0,0,0,0,-Math.sin(t*16)*.7,.8,.04,.42)},
    {g:GEO.cone,m:W_,tint:0x2e2232,l:L(.1,.22,.05,0,0,0,.06,.16,.06)},{g:GEO.cone,m:W_,tint:0x2e2232,l:L(-.1,.22,.05,0,0,0,.06,.16,.06)},
    {g:GEO.sphLo,m:eyeR,l:L(.08,.05,.26,0,0,0,.04)},{g:GEO.sphLo,m:eyeR,l:L(-.08,.05,.26,0,0,0,.04)}],300),
  knight:new Kind([
    {g:GEO.box,m:W_,tint:0xcfc4a8,l:L(0,.45,0,0,0,0,.5,.9,.3),sh:1},
    {g:GEO.box,m:W_,tint:0x3a3c46,main:1,l:L(0,1.25,0,0,0,0,.85,.8,.48),sh:1},
    {g:GEO.box,m:W_,tint:0x4a4c56,main:1,l:L(0,1.62,0,0,0,0,1.1,.22,.55),sh:1},
    {g:GEO.sph,m:W_,tint:0xd8cdb2,l:L(0,1.95,0,0,0,0,.28,.3,.28),sh:1},
    {g:GEO.cone,m:W_,tint:0x6a1020,l:L(0,2.35,-.05,0,0,0,.1,.4,.25),sh:1},
    {g:GEO.box,m:W_,tint:0x2e3038,main:1,l:L(-.58,1.15,.22,0,0,0,.1,.95,.75),sh:1},
    {g:GEO.box,m:std(0xbfc3d0,{metalness:.8,roughness:.3}),sh:1,a:(t,o)=>setL(o,.58,1.3,.35,-.5+Math.sin(t*3)*.4,0,0,.08,1.4,.1)},
    {g:GEO.sphLo,m:eyeR,l:L(.09,1.97,.25,0,0,0,.05)},{g:GEO.sphLo,m:eyeR,l:L(-.09,1.97,.25,0,0,0,.05)}],200),
  wraith:new Kind([
    {g:GEO.cone,m:std(0xffffff,{transparent:true,opacity:.62,emissive:0x2a1650,depthWrite:false}),tint:0x9a8ac8,main:1,l:L(0,1.1,0,Math.PI,0,0,.62,1.8,.62)},
    {g:GEO.sph,m:std(0xffffff,{transparent:true,opacity:.7,emissive:0x2a1650,depthWrite:false}),tint:0xb0a4dc,main:1,l:L(0,2.05,0,0,0,0,.36,.4,.36)},
    {g:GEO.sph,m:bas(0x05000a),l:L(0,2.0,.12,0,0,0,.26,.3,.26)},
    {g:GEO.cone,m:std(0xffffff,{transparent:true,opacity:.55,emissive:0x2a1650,depthWrite:false}),tint:0x9a8ac8,main:1,a:(t,o)=>setL(o,.55,1.55,.25,-1.1,0,-.5+Math.sin(t*4)*.3,.12,.8,.12)},
    {g:GEO.cone,m:std(0xffffff,{transparent:true,opacity:.55,emissive:0x2a1650,depthWrite:false}),tint:0x9a8ac8,main:1,a:(t,o)=>setL(o,-.55,1.55,.25,-1.1,0,.5-Math.sin(t*4)*.3,.12,.8,.12)},
    {g:GEO.sphLo,m:eyeG,l:L(.1,2.05,.33,0,0,0,.05)},{g:GEO.sphLo,m:eyeG,l:L(-.1,2.05,.33,0,0,0,.05)}],200),
  lord:new Kind([
    {g:GEO.cone,m:W_,tint:0x4a0812,main:1,l:L(0,1.5,0,0,0,0,1.35,3,1.35),sh:1},
    {g:GEO.box,m:W_,tint:0x1a1418,l:L(0,2.9,0,0,0,0,1.5,1.1,.8),sh:1},
    {g:GEO.box,m:W_,tint:0x2a1a20,l:L(.95,3.25,0,0,0,.25,.7,.35,.9),sh:1},{g:GEO.box,m:W_,tint:0x2a1a20,l:L(-.95,3.25,0,0,0,-.25,.7,.35,.9),sh:1},
    {g:GEO.sph,m:W_,tint:0xe0d0c0,l:L(0,3.8,0,0,0,0,.5,.58,.5),sh:1},
    {g:GEO.cone,m:W_,tint:0x16100f,l:L(.36,4.4,0,0,0,-.45,.13,.95,.13),sh:1},{g:GEO.cone,m:W_,tint:0x16100f,l:L(-.36,4.4,0,0,0,.45,.13,.95,.13),sh:1},
    {g:GEO.torus,m:bas(0xff2030),a:(t,o)=>setL(o,0,4,-.45,0,0,t*.7,1,1,1)},
    {g:GEO.box,m:std(0x9a1020,{metalness:.6,roughness:.3,emissive:0x400008}),sh:1,a:(t,o)=>setL(o,1.25,2.6,.6,-.6+Math.sin(t*2)*.5,0,0,.12,3.2,.2)},
    {g:GEO.sphLo,m:eyeR,l:L(.17,3.85,.44,0,0,0,.08)},{g:GEO.sphLo,m:eyeR,l:L(-.17,3.85,.44,0,0,0,.08)}],3),
};
const ST_TINT={frozen:new THREE.Color(0x9fe8ff),burn:new THREE.Color(0xff8a40),curse:new THREE.Color(0xb070ff),shock:new THREE.Color(0xd0c8ff),elite:new THREE.Color(0xc9a35a)};

/* ---------- 投射物与特效 ---------- */
const K={
  dagger:new Kind([{g:GEO.box,m:std(0xe8ecff,{metalness:.9,roughness:.2,emissive:0x303850}),l:L(0,0,.25,0,0,0,.07,.03,.6)},{g:GEO.box,m:goldM,l:L(0,0,-.08,0,0,0,.32,.06,.06)},{g:GEO.sph,m:addM(0xbfd0ff,.35),l:L(0,0,.1,0,0,0,.25,.12,.6)}],200),
  scythe:new Kind([{g:new THREE.TorusGeometry(.75,.07,5,18,Math.PI*1.1),m:std(0xd8d8e8,{metalness:.9,roughness:.2,emissive:0x302040}),l:L(0,0,0,Math.PI/2,0,0)},{g:GEO.cyl,m:woodM,l:L(.75,0,.35,Math.PI/2,0,0,.05,.9,.05)},{g:GEO.sph,m:addM(0xa070ff,.25),l:L(0,0,0,0,0,0,1,.15,1)}],40),
  orb:new Kind([{g:GEO.sph,m:bas(0xff3050),l:L(0,0,0,0,0,0,.28)},{g:GEO.sph,m:addM(0xff2040,.35),l:L(0,0,0,0,0,0,.55)}],14),
  sonic:new Kind([{g:GEO.sph,m:bas(0xff8090),l:L(0,0,0,0,0,0,.14,.14,.3)},{g:GEO.sph,m:addM(0xff3050,.4),l:L(0,0,0,0,0,0,.35)}],60),
  wisp:new Kind([{g:GEO.sph,m:bas(0xe0b0ff),l:L(0,0,0,0,0,0,.16)},{g:GEO.sph,m:addM(0xa050ff,.45),l:L(0,0,0,0,0,0,.45)}],80),
  raven:new Kind([{g:GEO.cone,m:bas(0x101018),l:L(0,0,0,Math.PI/2,0,0,.15,.6,.15)},{g:GEO.box,m:bas(0x181828),a:(t,o)=>setL(o,0,0,0,0,0,Math.sin(t*20)*.5,1.1,.03,.3)},{g:GEO.sph,m:addM(0x7050ff,.3),l:L(0,0,0,0,0,0,.5)}],120),
  skull:new Kind([{g:GEO.sph,m:bas(0xffd8d0),l:L(0,0,0,0,0,0,.32,.3,.36)},{g:GEO.sphLo,m:bas(0x200000),l:L(.11,.04,.28,0,0,0,.08)},{g:GEO.sphLo,m:bas(0x200000),l:L(-.11,.04,.28,0,0,0,.08)},{g:GEO.sph,m:addM(0xff1030,.5),l:L(0,0,0,0,0,0,.8)}],20),
  shard:new Kind([{g:GEO.oct,m:addM(0xd8f0ff,.9),l:L(0,0,0,0,0,0,.12,.12,.3)}],80),
  ebolt:new Kind([{g:GEO.sph,m:bas(0xff5060),l:L(0,0,0,0,0,0,.22)},{g:GEO.sph,m:addM(0xff1030,.4),l:L(0,0,0,0,0,0,.5)}],200),
  gem:new Kind([{g:GEO.oct,m:bas(0xffffff),tint:0x6fb7ff,main:1,l:L(0,0,0,0,0,0,.2,.32,.2)}],700),
  coin:new Kind([{g:GEO.cyl,m:goldM,l:L(0,0,0,Math.PI/2,0,0,.22,.05,.22)}],200),
  part:new Kind([{g:GEO.box,m:bas(0xffffff),tint:0xffffff,main:1,l:L(0,0,0,0,0,0,.14)}],800),
  heal:new Kind([{g:GEO.cyl,m:goldM,l:L(0,.2,0,0,0,0,.08,.3,.08)},{g:GEO.cone,m:goldM,l:L(0,.55,0,Math.PI,0,0,.24,.35,.24)},{g:GEO.sph,m:bas(0xff2040),l:L(0,.62,0,0,0,0,.18,.05,.18)},{g:GEO.sph,m:addM(0xff3040,.3),l:L(0,.5,0,0,0,0,.6)}],20),
  bag:new Kind([{g:GEO.box,m:std(0x3a2016),l:L(0,.35,0,0,0,0,.8,.6,.6),sh:1},{g:GEO.box,m:goldM,l:L(0,.68,0,0,0,0,.86,.1,.66)},{g:GEO.sph,m:addM(0xffc060,.3),l:L(0,.5,0,0,0,0,1.3)}],20),
  magnet:new Kind([{g:GEO.torus,m:bas(0x7dc8ff),l:L(0,.6,0,0,0,0,.35,.35,.35)},{g:GEO.sph,m:addM(0x5aa0ff,.35),l:L(0,.6,0,0,0,0,.7)}],6),
};
/* 贴合地形的地面圈：每帧把顶点高度设为地表高度 */
function makeDrape(mat,seg=22){const g=new THREE.PlaneGeometry(1,1,seg,seg);g.rotateX(-Math.PI/2);const m=new THREE.Mesh(g,mat);m.frustumCulled=false;m.userData.base=g.attributes.position.array.slice();scene.add(m);return m}
function drape(m,cx,cz,size,rot=0,lift=.1){const a=m.geometry.attributes.position.array,b=m.userData.base,c=Math.cos(rot),s=Math.sin(rot);
  for(let i=0;i<a.length;i+=3){const x=b[i]*size,z=b[i+2]*size,wx=cx+x*c-z*s,wz=cz+x*s+z*c;a[i]=wx;a[i+2]=wz;a[i+1]=hAt(wx,wz)+lift}m.geometry.attributes.position.needsUpdate=true}
const auraMesh=makeDrape(new THREE.MeshBasicMaterial({map:ringTex,color:0xffb060,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,opacity:.75}));auraMesh.visible=false;let auraR=2.6;
const ultRing=new THREE.Mesh(GEO.plane,new THREE.MeshBasicMaterial({map:softRingTex,color:0xffe0a0,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,depthTest:false,opacity:0}));ultRing.rotation.x=-Math.PI/2;scene.add(ultRing);
function pool(n,make){const a=[];for(let i=0;i<n;i++){const m=make();m.visible=false;scene.add(m);a.push({m,life:0})}return a}
const bolts=pool(10,()=>new THREE.Mesh(new THREE.CylinderGeometry(.18,.06,30,6),addM(0xd8ccff,.9)));
const ringsFx=pool(12,()=>{const m=new THREE.Mesh(GEO.plane,new THREE.MeshBasicMaterial({map:softRingTex,color:0x8fe3ff,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,depthTest:false}));m.rotation.x=-Math.PI/2;return m});
const teles=pool(14,()=>{const m=makeDrape(new THREE.MeshBasicMaterial({map:ringTex,color:0xff2030,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}),16);scene.remove(m);return m});
const chains=pool(16,()=>new THREE.Mesh(GEO.box,addM(0xc8b8ff,.9)));

/* ---------- 眷属模型 ---------- */
const FAM_COL={bat:[0x3a2030,0x7a1020,0x2a0010],hound:[0xcfc4a8,0x6a2010,0x1a1010],wisp:[0x6ad0ff,0xa060ff,0x60ffd0]};
function famModel(id,stg){const g=new THREE.Group(),c=FAM_COL[id][stg],s=1+stg*.35;
  const m=std(c,{roughness:.6,emissive:id==='wisp'?c:0x000000,emissiveIntensity:.6}),eye=bas(stg===2?0xffe060:0xff3040);
  const add=(geo,mat,x,y,z,sx,sy,sz,rx=0,ry=0,rz=0)=>{const o=new THREE.Mesh(geo,mat);o.position.set(x,y,z);o.scale.set(sx,sy,sz);o.rotation.set(rx,ry,rz);o.castShadow=true;g.add(o);return o};
  if(id==='bat'){add(GEO.sph,m,0,0,0,.22,.2,.26);g.userData.w1=add(GEO.box,m,.42,0,0,.7,.03,.36);g.userData.w2=add(GEO.box,m,-.42,0,0,.7,.03,.36);add(GEO.sphLo,eye,.07,.04,.22,.035,.035,.035);add(GEO.sphLo,eye,-.07,.04,.22,.035,.035,.035);
    if(stg>=1){add(GEO.cone,m,.1,.25,0,.05,.2,.05);add(GEO.cone,m,-.1,.25,0,.05,.2,.05)}if(stg===2)add(GEO.torus,bas(0xffd060),0,.4,0,.18,.18,.18,Math.PI/2)}
  else if(id==='hound'){add(GEO.box,m,0,.45,0,.4,.38,.9);add(GEO.box,m,0,.7,.55,.3,.3,.4);add(GEO.box,m,0,.62,.8,.18,.15,.25);
    for(const[x,z]of[[.15,.3],[-.15,.3],[.15,-.3],[-.15,-.3]])add(GEO.cyl,m,x,.18,z,.06,.36,.06);add(GEO.cone,m,0,.6,-.55,.05,.5,.05,-1.2);
    add(GEO.sphLo,eye,.08,.76,.74,.04,.04,.04);add(GEO.sphLo,eye,-.08,.76,.74,.04,.04,.04);
    if(stg===2){for(const x of[-.3,.3]){add(GEO.box,m,x,.72,.45,.24,.24,.32);add(GEO.sphLo,eye,x,.78,.62,.04,.04,.04)}}
    if(stg>=1){const f=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTex,color:0xff6020,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));f.scale.set(1.6,1.6,1);f.position.set(0,.6,0);g.add(f)}}
  else{add(GEO.sph,bas(c),0,0,0,.22,.3,.22);const f=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTex,color:c,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));f.scale.set(1.4+stg*.5,1.8+stg*.5,1);g.add(f);
    add(GEO.sphLo,bas(0x000000),.07,.05,.18,.04,.05,.04);add(GEO.sphLo,bas(0x000000),-.07,.05,.18,.04,.05,.04)}
  g.scale.setScalar(s);scene.add(g);return g}

/* ---------- 运行时状态 ---------- */
const G={state:'menu',shake:0,flash:0,timeStop:0,rt:0};
let P,S,RUN,enemies=[],proj=[],gems=[],coins=[],parts=[],ebolts=[],picks=[],frostRings=[],teleList=[],fams=[],boss=null;
function newRun(hunter,diffIdx){
  const H=HUNTERS[hunter];
  P={hunter,x:0,z:0,y:0,vy:0,jumps:0,face:0,hp:H.hp,lvl:1,xp:0,next:need(1),inv:0,dash:0,dashT:0,dashHit:new Set(),dvx:0,dvz:0,
    weapons:[],rel:{},b:{dmg:0,cdr:0,area:0,spd:0,hp:0,crit:0,luck:0,mag:0,xp:0,armor:0,regen:0,gold:0},ult:0,feast:0,feastT:0,crown:0,curseLv:0,bellN:0,stopT:30,bob:0,moving:false,rerolls:3,banish:2,phoenixUsed:false,
    box:Array(BOX_N).fill(null),rit:new Set(),ritCells:new Set(),links:[],thirst:0,ouroMul:1,ouroT:0,stillT:0,vigilT:0,vigilUsed:false,echoQ:[],bmT:0,judgeCd:30,judge:null,trail:[],bellStore:0,killWin:[],feastStacks:0,cupStore:0,peak:null};
  RUN={diff:diffIdx,stage:0,t:0,stageT:0,kills:0,gold:0,goldTotal:0,dealt:{},shatter:0,react:0,chestsOpened:0,bossSummoned:false,bossDead:false,nextElite:40,nextSwarm:55,spawnAcc:0,obelisk:0,pendingLv:0,queue:[],ach:[],best:{}};
  gems=[];coins=[];picks=[];addWeapon(H.w);stats();P.hp=S.maxHp;fams.forEach(f=>scene.remove(f.g));fams=[];dressHunter(hunter);if(typeof setHero==='function')setHero(hunter);
}
function need(l){return Math.floor(3+l*2.5+l*l*.3)}
function stats(){const b=P.b,r=P.rel,H=HUNTERS[P.hunter];
  S={dmg:(1+b.dmg)*(r.pact?1.6:1),cd:Math.max(.35,1-b.cdr),area:1+b.area,spd:5.4*(1+b.spd),
    maxHp:Math.round((H.hp+b.hp)*(r.pact?.6:1)),regen:b.regen,armor:H.armor+b.armor,
    crit:.05+b.crit+(P.hunter==='raven'?.1:0),luck:b.luck,mag:3.6*(1+b.mag+.25*(r.candle||0)),xp:1+b.xp,
    gold:(1+b.gold)*DIFFS[RUN.diff].gold,dashCd:2.6*(P.hunter==='raven'?.6:1),jumps:P.hunter==='raven'?2:1};
  if(P.box)relicStats();
  if(P.hp>S.maxHp)P.hp=S.maxHp}
const dynMul=()=>(1+P.crown*.0004)*(P.rel.saint&&P.hp>=S.maxHp-.01?1+.35*P.rel.saint:1);
function addWeapon(id){const W=WEAPONS[id],w={id,lvl:1,evo:false,t:0,ups:{}};Object.assign(w,JSON.parse(JSON.stringify(W.base)));P.weapons.push(w);discover('w',id);return w}
function bossT(){return STAGE_T*[1,.8,.67][Math.min(2,RUN.ri||0)]}
const WMAX=()=>6+((SAVE.meta&&SAVE.meta.up&&SAVE.meta.up.slot)||0);
const getW=id=>P.weapons.find(w=>w.id===id);

/* ---------- 空间网格 ---------- */
const CELL=2.5,grid=new Map();
const gk=(ix,iz)=>(ix+30000)*60000+(iz+30000);
function buildGrid(){for(const a of grid.values())a.length=0;for(const e of enemies){if(e.dead)continue;const k=gk(Math.floor(e.x/CELL),Math.floor(e.z/CELL));let a=grid.get(k);if(!a){a=[];grid.set(k,a)}a.push(e)}if(grid.size>5000)grid.clear()}
function query(x,z,r,fn){r+=2.4;const x0=Math.floor((x-r)/CELL),x1=Math.floor((x+r)/CELL),z0=Math.floor((z-r)/CELL),z1=Math.floor((z+r)/CELL);
  for(let i=x0;i<=x1;i++)for(let j=z0;j<=z1;j++){const a=grid.get(gk(i,j));if(a)for(let n=0;n<a.length;n++){const e=a[n];if(!e.dead&&!e.ally&&fn(e)===false)return}}}
function inRange(x,z,R){const out=[];query(x,z,R,e=>{if((e.x-x)**2+(e.z-z)**2<(R+e.r)**2)out.push(e)});return out}
function nearest(x,z,maxD,skip){let best=null,bd=maxD*maxD;for(const e of enemies){if(e.dead||e.ally||e===skip)continue;const d=(e.x-x)**2+(e.z-z)**2;if(d<bd){bd=d;best=e}}return best}

/* ---------- 敌人生成 ---------- */
function spawnRadius(){return Math.max(26,15*camera.aspect+9)+(innerHeight>innerWidth?10:0)}
function spawnPoint(R){const B=WORLD.lim(4);for(let k=0;k<8;k++){const a=Math.random()*TAU,x=P.x+Math.sin(a)*R,z=P.z+Math.cos(a)*R;if(Math.abs(x)<B&&Math.abs(z)<B)return[x,z]}
  const a=Math.random()*TAU;return[clamp(P.x+Math.sin(a)*R,-B,B),clamp(P.z+Math.cos(a)*R,-B,B)]}
function hpScale(){const T=RUN.stageT,st=STAGES[RUN.stage];return(1+T/110+(T/300)**2)*(RUN.route&&RUN.route.length===1?[1,1.35,1.7,2.1][RUN.stage]:st.mul)*DIFFS[RUN.diff].hp*(1+P.curseLv)}
function spawnEnemy(type,x,z,o={}){
  if(x==null)[x,z]=spawnPoint(spawnRadius()+rand(0,5));
  const D=o.boss?BOSSES[type]:ENEMIES[type],el=!!o.elite,bs=!!o.boss;
  const s=bs?D.sc:(D.sc||1)*(el?1.6:rand(.92,1.1));
  const hp=bs?D.hp*DIFFS[RUN.diff].hp*(1+P.curseLv):D.hp*hpScale()*(el?10:1);
  const e={type,D,kind:D.kind,x,z,y:0,hp,max:hp,spd:D.spd*(el?.9:1)*rand(.9,1.1),dmg:D.dmg*(1+RUN.stageT/400)*(1+(RUN.ri||0)*.35)*DIFFS[RUN.diff].dmg*(1+P.curseLv*.5)*(el?1.5:1),
    r:(D.r||.6)*(bs?1:s/(D.sc||1)*(D.sc||1)),xp:(D.xp||20)*(el?10:1),s,elite:el,boss:bs,kx:0,kz:0,flash:0,t:Math.random()*10,rot:0,hc:{},ph:Math.random()*TAU,
    st:{burn:0,bleed:0,bleedT:0,frost:0,frozen:0,slow:0,curse:0,shock:0},dotT:.5,tint:D.tint?new THREE.Color(D.tint):null,tag:o.tag,a1:3,a2:6,a3:5,mode:0,mt:0};
  if(bs){e.r=D.r;boss=e;e.name=D.n;discover('e',type)}else discover('e',type);
  enemies.push(e);return e}
function pickType(){const T=RUN.stageT,ro=STAGES[RUN.stage].roster.filter(r=>T>=r[1]);let s=0;for(const r of ro)s+=r[2]+(r[1]>0?T/90:0);let x=Math.random()*s;for(const r of ro){x-=r[2]+(r[1]>0?T/90:0);if(x<=0)return r[0]}return ro[0][0]}
function director(dt){
  const T=RUN.stageT,dif=DIFFS[RUN.diff],rate=Math.min(.7+T/16+(T/200)**2+(RUN.ri||0)*.8,30)*dif.spawn*(1+P.curseLv)*(RUN.bossDead?1.4:1);
  const cap=Math.min(360,10+T*.7+(RUN.ri||0)*40);RUN.spawnAcc+=rate*dt;
  while(RUN.spawnAcc>=1){RUN.spawnAcc--;if(enemies.length<cap)spawnEnemy(pickType())}
  if(T>=RUN.nextElite){RUN.nextElite+=45;spawnEnemy(pickType(),null,null,{elite:true})}
  if(T>=RUN.nextSwarm){RUN.nextSwarm+=50;const n=Math.min(18+T/12,40),ty=pickType(),R=spawnRadius()-2;
    for(let i=0;i<n;i++){const a=i/n*TAU,B=WORLD.lim(3);spawnEnemy(ty,clamp(P.x+Math.sin(a)*R,-B,B),clamp(P.z+Math.cos(a)*R,-B,B))}banner('敌群包围','它们从四面八方冲过来了')}
  if(!RUN.bossSummoned&&T>=bossT())summonBoss(true);
}
function summonBoss(forced){if(RUN.bossSummoned)return;RUN.bossSummoned=true;const alt=POIS.find(p=>p.type==='boss');if(alt)poiSetUsed(alt);
  const st=STAGES[RUN.stage],b=spawnEnemy(st.boss,alt?alt.x:null,alt?alt.z+3:null,{boss:true});
  AU.sfx('boss');banner(b.name+' 降临',forced?'时间到了——首领自己登场了':'你在擂台上召唤了它');G.shake=.8}

/* ---------- 伤害与元素反应 ---------- */
function addFrost(e,n){e.st.frost+=n;e.st.slow=2.5;if(e.st.frost>=3){e.st.frost=0;if(e.boss)e.st.slow=3;else{e.st.frozen=1.4*(P.rel.doctrine?.5:1)*(P.rit.has('frost')?2:1)}}}
function track(src,v){RUN.dealt[src]=(RUN.dealt[src]||0)+v;(RUN.dmgWin||(RUN.dmgWin=[])).push([RUN.t,v]);if(RUN.dmgWin.length>4000)RUN.dmgWin.splice(0,1000)}
function hit(e,base,o={}){
  if(e.dead)return null;let dmg=base*S.dmg*dynMul();
  if(P.rel.lens&&(e.elite||e.boss)&&!o.dot){if(RUN.t>(e.st.weakT||0))e.st.weak=0;e.st.weak=Math.min(30,(e.st.weak||0)+P.rel.lens);e.st.weakT=RUN.t+3;dmg*=1+.03*e.st.weak}
  dmg*=relicDmgMul(e,o);
  const crit=!o.dot&&(o.fc||Math.random()<S.crit);if(crit)dmg*=2;
  if(e.st.curse>0)dmg*=P.rit.has('dark')?1.5:1.25;if(e.st.shock>0)dmg*=1.12;
  let react=null;const el=o.el,keep=!!P.rel.eternal;
  const rc=n=>{if(!keep)return true;e.rc=e.rc||{};if((e.rc[n]||0)>RUN.t)return false;e.rc[n]=RUN.t+2;return true};
  if(!o.dot&&el){
    const frz=e.st.frozen>0||(P.rel.doctrine&&e.st.slow>0&&!e.boss);
    if(el==='volt'&&frz&&rc('碎冰')){react='碎冰';if(!keep){e.st.frozen=0;e.st.frost=0}RUN.shatter++;AU.sfx('shatter');burst(e.x,e.y+1,e.z,0xbff0ff,14,7);
      const d2=dmg*.8;inRange(e.x,e.z,2.8).forEach(o2=>{if(o2!==e){hit(o2,d2/S.dmg,{src:'react',np:1,kb:4,fx:o2.x-e.x,fz:o2.z-e.z});if(P.rel.refreeze)addFrost(o2,1)}});
      if(P.rel.refreeze)e.st.frost=2}
    else if(el==='fire'&&(e.st.frozen>0||e.st.frost>0)&&rc('融蚀')){react='融蚀';dmg*=2;if(!keep){e.st.frozen=0;e.st.frost=0}}
    else if(el==='fire'&&e.st.bleed>=3&&rc('沸血')){react='沸血';const d2=e.st.bleed*7;if(!keep)e.st.bleed=0;burst(e.x,e.y+1,e.z,0xff2040,14,6);
      inRange(e.x,e.z,2.6).forEach(o2=>{if(o2!==e)hit(o2,d2,{src:'react',np:1})})}
    else if(el==='volt'&&e.st.curse>0&&!o.chain&&rc('黑雷')){react='黑雷';chain(e,3,dmg*.6/S.dmg,'react')}
    else if(el==='frost'&&e.st.burn>0&&rc('蒸腾')){react='蒸腾';dmg*=1.6;if(!keep)e.st.burn=0}
  }
  if(e.st.frozen>0&&!react)dmg*=1.3;
  if(G.timeStop>0&&P.rel.zawarudo&&!o.dot){e.stored=(e.stored||0)+dmg;e.flash=.08;showDmg(e.x,e.y+1.8*e.s,e.z,dmg,crit,null);return{killed:false,crit}}
  e.hp-=dmg;track(o.src||'other',dmg);if(!o.dot)e.flash=.08;
  if(!e.boss&&!o.dot&&o.kb){const fl=Math.hypot(o.fx||0,o.fz||0)||1,k=o.kb/(e.elite?3:1);e.kx+=(o.fx||0)/fl*k;e.kz+=(o.fz||0)/fl*k}
  if(!o.dot&&el){
    if(el==='blood'){e.st.bleed=Math.min(10,e.st.bleed+1);e.st.bleedT=4}
    else if(el==='fire')e.st.burn=3;
    else if(el==='frost')addFrost(e,o.stack||1);
    else if(el==='dark')e.st.curse=5;
    else if(el==='volt')e.st.shock=2;
  }
  relicOnHit(e,o,dmg);
  if(!o.np&&!o.dot){const r=P.rel;
    if(r.codex&&Math.random()<.1*r.codex)e.st.curse=5;
    if(r.bell&&++P.bellN>=Math.max(4,12-2*(r.bell-1))){P.bellN=0;chain(e,5,30,'relic')}}
  if(react){RUN.react++;showReact(e,react)}
  showDmg(e.x,e.y+(e.D.y||0)*0+1.8*e.s*(e.boss?1.4:1),e.z,dmg,crit,o.dot?(o.dot==='burn'?'burn':'bleed'):null);
  if(!o.dot)AU.sfx('hit');
  let killed=false;if(e.hp<=0){kill(e,o);killed=true}
  return{killed,crit}}
function chain(from,n,dmg,src){let cur=from;const seen=new Set([from]);
  for(let i=0;i<n;i++){let best=null,bd=64;query(cur.x,cur.z,8,e=>{if(seen.has(e))return;const d=(e.x-cur.x)**2+(e.z-cur.z)**2;if(d<bd){bd=d;best=e}});
    if(!best)break;seen.add(best);drawChain(cur,best);hit(best,dmg,{el:'volt',src,np:1,chain:1});cur=best}}
function drawChain(a,b){const c=chains.find(c=>c.life<=0)||chains[0];c.life=.15;const dx=b.x-a.x,dz=b.z-a.z,d=Math.hypot(dx,dz);
  c.m.visible=true;c.m.position.set((a.x+b.x)/2,a.y+1.2,(a.z+b.z)/2);c.m.scale.set(.08,.08,d);c.m.rotation.set(0,Math.atan2(dx,dz),0)}
function healP(v,show){if(P.hp<=0)return;const b=P.hp;if(b+v>S.maxHp)relicOverheal(b+v-S.maxHp);P.hp=Math.min(S.maxHp,P.hp+v);if(show&&P.hp>b)showDmg(P.x,P.y+2.4,P.z,P.hp-b,false,'heal')}
function kill(e,o){
  e.dead=true;RUN.kills++;RUN.combo=(RUN.comboT>RUN.t?RUN.combo:0)+1;RUN.comboT=RUN.t+2.5;if(RUN.combo>(RUN.bestCombo||0))RUN.bestCombo=RUN.combo;AU.sfx('kill');ultGain(e.boss?40:e.elite?6:.55);relicOnKill(e,o||{},-e.hp);
  if(P.hunter==='heir'&&Math.random()<.04)healP(2);
  P.crown+=P.rel.crown?P.rel.crown:0;
  const y=e.y+.8*e.s;burst(e.x,y,e.z,e.D.col,e.boss?60:e.elite?24:7,e.boss?9:5);burst(e.x,y,e.z,0x8a0010,e.boss?30:3,4);
  if(P.rel.seed&&Math.random()<.2*P.rel.seed){const d=e.max*.25;burst(e.x,y,e.z,0x80ff60,12,6);inRange(e.x,e.z,3).forEach(o2=>{if(o2!==e)hit(o2,d/S.dmg,{src:'relic',np:1})})}
  if(e.st.curse>0){let n=0;query(e.x,e.z,5,o2=>{if(o2!==e&&n<3&&o2.st.curse<=0){o2.st.curse=5;n++}})}
  const aw=getW('aura');if(aw&&aw.evo&&e.st.burn>0){burst(e.x,y,e.z,0xff8030,10,6);inRange(e.x,e.z,2.4).forEach(o2=>{if(o2!==e)hit(o2,20,{src:'aura',np:1,el:'fire'})})}
  dropGem(e.x,e.z,e.xp);
  if(Math.random()<.1||e.elite)coins.push({x:e.x+rand(-.4,.4),z:e.z+rand(-.4,.4),v:Math.ceil((e.elite?15:rand(1,2.2))*S.gold),t:Math.random()*6,pull:false,sp:0});
  if(e.elite){picks.push({k:'bag',x:e.x,z:e.z,t:0});if(e.tag==='obelisk'){RUN.obelisk--;if(RUN.obelisk<=0)banner('诅咒平息','方尖碑的守卫已被击败')}}
  else if(Math.random()<.008)picks.push({k:'heal',x:e.x,z:e.z,t:0});
  else if(Math.random()<.0025)picks.push({k:'magnet',x:e.x,z:e.z,t:0});
  for(const f of fams)famGain(f,1);
  if(e.boss)bossDown(e);
}
function bossDown(e){boss=null;bossLight.intensity=0;RUN.bossDead=true;G.shake=1;
  for(let i=0;i<14;i++)dropGem(e.x+rand(-3,3),e.z+rand(-3,3),25);for(let i=0;i<8;i++)coins.push({x:e.x+rand(-3,3),z:e.z+rand(-3,3),v:Math.ceil(8*S.gold),t:0,pull:false,sp:0});
  picks.push({k:'bag',x:e.x,z:e.z,t:0});
  const alt=POIS.find(p=>p.type==='boss'),px=alt?alt.x:e.x,pz=alt?alt.z:e.z,pt=addPoi('portal',px,pz);buildPoiMesh(pt);
  if(isLastStage()){banner('霸王倒下','次元之门已开启——走进去，完成万界之旅')}else banner('首领已被击败','次元之门已在首领擂台开启')}
function dropGem(x,z,v){if(gems.length>650){gems[(Math.random()*gems.length)|0].v+=v;return}gems.push({x:x+rand(-.3,.3),z:z+rand(-.3,.3),v,pull:false,sp:0,t:Math.random()*6})}
function burst(x,y,z,col,n,sp){for(let i=0;i<n;i++){if(parts.length>750)parts.shift();const a=Math.random()*TAU,u=rand(.3,1);parts.push({x,y,z,vx:Math.sin(a)*sp*u,vy:rand(2,6),vz:Math.cos(a)*sp*u,life:rand(.4,.9),max:.9,c:new THREE.Color(col).offsetHSL(0,0,rand(-.1,.1))})}}

/* ---------- 武器 ---------- */
const orbs=[],orbitScythes=[];
function weaponTick(w,dt){
  const W=WEAPONS[w.id];w.t-=dt;const dmg=w.dmg,area=w.area*S.area;
  if(w.id==='dagger'&&w.t<=0){w.t=w.cd*S.cd*cdDyn();const tg=nearest(P.x,P.z,24),a=tg?Math.atan2(tg.x-P.x,tg.z-P.z):P.face;
    if(P.rel.beam){for(let i=0;i<w.count;i++)fireBeam(a+(i-(w.count-1)/2)*.22,dmg*1.3,16*area,.7*area);if(w.evo)for(let i=0;i<8;i++)fireBeam(a+i/8*TAU+.2,dmg*.9,10*area,.6);AU.sfx('bolt')}
    else{for(let i=0;i<w.count;i++){const aa=a+(i-(w.count-1)/2)*.15;shoot('dagger',aa,w.speed,{dmg,pierce:w.pierce,life:1.1,el:'phys',src:'dagger',evo:w.evo})}
    if(w.evo)for(let i=0;i<8;i++)shoot('dagger',a+i/8*TAU+.2,w.speed,{dmg:dmg*.7,pierce:w.pierce,life:.8,el:'phys',src:'dagger',evo:true});AU.sfx('throw')}}
  else if(w.id==='scythe'&&w.t<=0){w.t=w.cd*S.cd*cdDyn();const tg=nearest(P.x,P.z,18),base=tg?Math.atan2(tg.x-P.x,tg.z-P.z):P.face;
    for(let i=0;i<w.count;i++){const a=base+i*TAU/w.count;proj.push({k:'scythe',x:P.x,z:P.z,y:P.y+1,dx:Math.sin(a),dz:Math.cos(a),v:17,life:3.2,dmg,hits:new Map(),spin:0,sz:area,el:'dark',src:'scythe'})}AU.sfx('scythe')}
  else if(w.id==='bolt'&&w.t<=0){w.t=w.cd*S.cd*cdDyn();const near=inRange(P.x,P.z,18);
    for(let i=0;i<w.count&&near.length;i++){const e=near.splice((Math.random()*near.length)|0,1)[0];strike(e.x,e.z,dmg,1.9*area,w.evo)}}
  else if(w.id==='aura'){const R=2.6*area*(w.evo?1.8:1);auraR=R;
    if(w.t<=0){w.t=w.cd*S.cd*cdDyn();query(P.x,P.z,R,e=>{const d=Math.hypot(e.x-P.x,e.z-P.z);if(d<R+e.r*.5)hit(e,dmg,{el:'fire',src:'aura',kb:1.5,fx:e.x-P.x,fz:e.z-P.z})})}}
  else if(w.id==='frost'&&w.t<=0){w.t=w.cd*S.cd*cdDyn();const n=w.evo?3:1;for(let i=0;i<n;i++)frostRings.push({x:P.x,z:P.z,r:0,max:6*area,delay:i*.35,hit:new Set(),dmg,stack:w.evo?3:w.stack});AU.sfx('frost')}
}
function shoot(k,a,sp,o){if(P.rel.feather&&P.ravenT>RUN.t&&WSRC.has(o.src)){sp*=1.6;o.pierce=(o.pierce||1)+2*P.rel.feather}proj.push(Object.assign({k,x:P.x+Math.sin(a)*.5,z:P.z+Math.cos(a)*.5,y:P.y+1,vx:Math.sin(a)*sp,vz:Math.cos(a)*sp,rot:a,hits:new Set(),pierce:1,life:1},o))}
function strike(x,z,dmg,R,evo){const b=bolts.find(b=>b.life<=0)||bolts[0];b.life=.22;b.m.visible=true;b.m.position.set(x,15+hAt(x,z),z);
  flashLight.position.set(x,4,z);flashLight.intensity=6;
  let first=null;inRange(x,z,R).forEach(e=>{if(!first)first=e;hit(e,dmg,{el:'volt',src:'bolt',kb:4,fx:e.x-x,fz:e.z-z})});
  if(evo&&first)chain(first,4,dmg*.6,'bolt');
  burst(x,hAt(x,z)+.3,z,0xc8b8ff,10,6);AU.sfx('bolt');G.shake=Math.max(G.shake,.15)}
function orbitTick(){orbs.length=0;const w=getW('orbit');if(!w)return;const n=w.count,R=2.7*w.area*S.area*(w.evo?1.3:1),sp=w.speed;
  for(let i=0;i<n;i++){const a=RUN.t*sp+i*TAU/n;orbs.push([P.x+Math.sin(a)*R,P.z+Math.cos(a)*R])}
  const hr=w.evo?.8:.45;
  for(const[x,z]of orbs)query(x,z,hr,e=>{const d=Math.hypot(e.x-x,e.z-z);if(d<e.r+hr&&(e.hc.o||0)<RUN.t){e.hc.o=RUN.t+w.cd;hit(e,w.dmg,{el:'blood',src:'orbit',kb:4,fx:e.x-P.x,fz:e.z-P.z});if(w.evo)healP(.35)}})
  orbitScythes.length=0;const sw=getW('scythe');if(sw&&sw.evo){for(let i=0;i<3;i++){const a=-RUN.t*4+i*TAU/3,R2=3.4*S.area;orbitScythes.push([P.x+Math.sin(a)*R2,P.z+Math.cos(a)*R2])}
    for(const[x,z]of orbitScythes)query(x,z,1,e=>{const d=Math.hypot(e.x-x,e.z-z);if(d<e.r+1&&(e.hc.s||0)<RUN.t){e.hc.s=RUN.t+.4;hit(e,sw.dmg*.6,{el:'dark',src:'scythe',kb:3,fx:e.x-P.x,fz:e.z-P.z})}})}}

/* ---------- 眷属 ---------- */
function addFam(id){const f={id,stage:0,xp:0,x:P.x+1,z:P.z+1,y:1,cd:1,t:0,target:null,g:famModel(id,0)};fams.push(f);discover('f',id+'0');return f}
function famGain(f,v){f.xp+=v;if(f.stage<2&&f.xp>=FAM_EVO[f.stage]){f.stage++;scene.remove(f.g);f.g=famModel(f.id,f.stage);discover('f',f.id+f.stage);
  burst(f.x,f.y+1,f.z,FAM_COL[f.id][f.stage],30,6);AU.sfx('evo');banner(FAMS[f.id].n[f.stage-1]+' 进化为 '+FAMS[f.id].n[f.stage],'眷属的力量觉醒了');if(f.stage===2)unlockAch('fam')}}
function famTick(f,i,dt){f.t+=dt;f.cd-=dt;const side=i?-1:1,stg=f.stage;
  if(f.id==='hound'){const tg=f.target&&!f.target.dead&&Math.hypot(f.target.x-P.x,f.target.z-P.z)<12?f.target:(f.target=nearest(f.x,f.z,9));
    let tx,tz;if(tg){tx=tg.x;tz=tg.z}else{tx=P.x+Math.sin(P.face+2.3*side)*1.8;tz=P.z+Math.cos(P.face+2.3*side)*1.8}
    const dx=tx-f.x,dz=tz-f.z,d=Math.hypot(dx,dz);if(d>.9){const sp=Math.min(d*4,tg?10:9);f.x+=dx/d*sp*dt;f.z+=dz/d*sp*dt;f.rot=Math.atan2(dx,dz)}
    f.y=hAt(f.x,f.z);if(tg&&d<1.6&&f.cd<=0){f.cd=.85-stg*.1;const dm=[16,30,52][stg];burst(tg.x,tg.y+.6,tg.z,0xffffff,4,3);
      inRange(tg.x,tg.z,1.6+stg*.3).forEach(e=>hit(e,dm,{el:stg?'fire':'phys',src:'fam',np:!P.rel.servant,kb:3,fx:e.x-f.x,fz:e.z-f.z}))}}
  else{const a=RUN.t*1.4+i*Math.PI,tx=P.x+Math.sin(a)*1.6,tz=P.z+Math.cos(a)*1.6;f.x+=(tx-f.x)*Math.min(1,dt*5);f.z+=(tz-f.z)*Math.min(1,dt*5);
    f.y=P.y+2.1+Math.sin(f.t*3)*.15;const tg=nearest(f.x,f.z,16);if(tg)f.rot=Math.atan2(tg.x-f.x,tg.z-f.z);
    if(tg&&f.cd<=0){if(f.id==='bat'){f.cd=[1.1,.9,.7][stg];const a2=Math.atan2(tg.x-f.x,tg.z-f.z);
        proj.push({k:'sonic',x:f.x,z:f.z,y:f.y,vx:Math.sin(a2)*18,vz:Math.cos(a2)*18,rot:a2,life:1,dmg:[12,22,38][stg],pierce:1+stg,hits:new Set(),el:'blood',src:'fam',leech:stg>0})}
      else{f.cd=[1.6,1.3,1][stg];for(let k=0;k<stg+1;k++){const a2=rand(0,TAU);proj.push({k:'wisp',x:f.x,z:f.z,y:f.y,vx:Math.sin(a2)*6,vz:Math.cos(a2)*6,rot:a2,life:3,dmg:[12,22,34][stg],pierce:1,hits:new Set(),el:stg===2&&k%2?'frost':'dark',src:'fam',home:tg})}}}}
  f.g.position.set(f.x,f.y,f.z);f.g.rotation.y=f.rot||0;
  if(f.g.userData.w1){f.g.userData.w1.rotation.z=Math.sin(f.t*16)*.6;f.g.userData.w2.rotation.z=-Math.sin(f.t*16)*.6}}

/* ---------- 大招 ---------- */
let ultFx=0;
function castUlt(){if(P.ult<100||G.state!=='play')return;P.ult-=100;AU.sfx('ult');G.shake=.6;ultFx=1;
  if(P.rel.echo)for(let i=0;i<P.rel.echo;i++)P.echoQ.push({t:1.5+i*.6,x:P.x,y:P.y,z:P.z});
  heroShot('Spellcast_Shoot',.7);if(P.rel.grail)healP(S.maxHp*.3,true);
  if(P.hunter==='warden'){ultRing.material.color.set(0xffe0a0);G.flash=.6;inRange(P.x,P.z,14).forEach(e=>{hit(e,160,{el:'fire',src:'ult',kb:8,fx:e.x-P.x,fz:e.z-P.z});e.st.burn=5})}
  else if(P.hunter==='heir'){ultRing.material.color.set(0xff2040);P.feast=6;P.feastT=0}
  else{ultRing.material.color.set(0x8070ff);for(let i=0;i<36;i++){const a=i/36*TAU;shoot('raven',a,13,{dmg:45,pierce:99,life:1.8,el:'dark',src:'ult',curve:1.4})}}
  banner(HUNTERS[P.hunter].ult.n,'')}

/* ---------- 首领行为 ---------- */
function bossAI(e,dt){e.a1-=dt;e.a2-=dt;e.a3-=dt;bossLight.position.set(e.x,e.y+5,e.z);bossLight.intensity=3;
  const dx=P.x-e.x,dz=P.z-e.z,d=Math.hypot(dx,dz)||1;
  if(e.type==='colossus'){
    if(e.mode===1){e.mt-=dt;e.flash=Math.sin(e.mt*40)>0?.05:0;if(e.mt<=0){e.mode=2;e.mt=.9;e.cdx=dx/d;e.cdz=dz/d;AU.sfx('dash')}return true}
    if(e.mode===2){e.mt-=dt;e.x+=e.cdx*17*dt;e.z+=e.cdz*17*dt;if(Math.random()<.5)burst(e.x,e.y+.3,e.z,0x6a6070,2,3);if(e.mt<=0)e.mode=0;return true}
    if(e.a1<=0){e.a1=5;e.mode=1;e.mt=.8}
    if(e.a2<=0){e.a2=9;for(let i=0;i<6;i++){const a=i/6*TAU;spawnEnemy('ghoul',e.x+Math.sin(a)*3,e.z+Math.cos(a)*3)}}
    if(e.a3<=0){e.a3=7;for(let i=0;i<4;i++)tele(P.x+rand(-5,5),P.z+rand(-5,5),2.4,1.2,18)}}
  else if(e.type==='bishop'){
    if(e.a1<=0){e.a1=.18;e.ang=(e.ang||0)+.33;for(let k=0;k<3;k++){const a=e.ang+k*TAU/3;ebolts.push({x:e.x,z:e.z,vx:Math.sin(a)*6.5,vz:Math.cos(a)*6.5,life:5})}
      e.burstN=(e.burstN||0)+1;if(e.burstN>=20){e.burstN=0;e.a1=2.6}}
    if(e.a2<=0){e.a2=8;burst(e.x,e.y+2,e.z,0xc070ff,24,6);const a=Math.random()*TAU;e.x=clamp(P.x+Math.sin(a)*9,-WORLD.lim(4),WORLD.lim(4));e.z=clamp(P.z+Math.cos(a)*9,-WORLD.lim(4),WORLD.lim(4));burst(e.x,e.y+2,e.z,0xc070ff,24,6)}
    if(e.a3<=0){e.a3=10;for(let i=0;i<6;i++){const a=i/6*TAU;spawnEnemy('wraith',e.x+Math.sin(a)*3,e.z+Math.cos(a)*3)}}}
  else{
    if(e.a1<=0){e.a1=2.6;const n=18,off=Math.random();for(let i=0;i<n;i++){const a=(i+off)/n*TAU;ebolts.push({x:e.x,z:e.z,vx:Math.sin(a)*7,vz:Math.cos(a)*7,life:5})}}
    if(e.a2<=0){e.a2=6;for(let i=0;i<6;i++)tele(P.x+(i?rand(-6,6):0),P.z+(i?rand(-6,6):0),2.4,1.2,24)}
    if(e.a3<=0){e.a3=8;for(let i=0;i<8;i++){const a=i/8*TAU;spawnEnemy(i%2?'bloodghoul':'hellknight',e.x+Math.sin(a)*3,e.z+Math.cos(a)*3)}}}
  return false}
function tele(x,z,r,t,dmg){const B=WORLD.lim(2);teleList.push({x:clamp(x,-B,B),z:clamp(z,-B,B),r,t,max:t,dmg})}

/* ---------- 玩家受伤 ---------- */
function hurtPlayer(d){if(P.inv>0||P.dashT>0||G.state!=='play')return;
  d=Math.max(1,d-S.armor);d=relicOnHurt(d);if(d<=0){P.inv=.5;return}P.hp-=d;if(P.hp>0)heroShot('Hit_A',.3);P.inv=.5;if(SAVE.settings.shake)G.shake=Math.max(G.shake,.35);AU.sfx('hurt');hurtFlash();
  if(P.rel.thorns){P.thornStore=(P.thornStore||0)+d*3*P.rel.thorns;showReact({x:P.x,y:P.y,z:P.z,s:1},'荆棘 '+Math.round(P.thornStore))}
  if(P.hp<=0){if(P.rel.phoenix&&!P.phoenixUsed){P.phoenixUsed=true;removeRelicId('phoenix');P.hp=S.maxHp*.5;P.inv=2;G.flash=.8;burst(P.x,P.y+1,P.z,0xffa040,50,8);banner('涅槃','不死鸟之羽燃尽，你重获新生');renderRelics();return}
    if(typeof homageCheatDeath==='function'&&homageCheatDeath())return;P.hp=0;endRun(false)}}

/* ---------- 主更新 ---------- */
const keys={};let stick={on:false,x:0,y:0};
/* 视角：tp = 第三人称自由视角，top = 俯视 */
const CAM={mode:SAVE.settings.cam||"tp",yaw:0,pitch:.42,dist:8.5,locked:false};
function camYaw(){return CAM.mode==="tp"?CAM.yaw:Math.PI}
function camInput(mx,mz){const y=camYaw(),s=Math.sin(y),c=Math.cos(y);return[s*(-mz)-c*mx,c*(-mz)+s*mx]}
function update(dt){
  RUN.t+=dt;RUN.stageT+=dt;
  // 移动
  let mx=(keys.d||keys.arrowright?1:0)-(keys.a||keys.arrowleft?1:0),mz=(keys.s||keys.arrowdown?1:0)-(keys.w||keys.arrowup?1:0);
  if(stick.on){mx=stick.x;mz=stick.y}[mx,mz]=camInput(mx,mz);
  const ml=Math.hypot(mx,mz);P.moving=ml>.15;
  if(P.dashT>0){P.dashT-=dt;P.x+=P.dvx*dt;P.z+=P.dvz*dt;if(Math.random()<.6)burst(P.x,P.y+1,P.z,HUNTERS[P.hunter].acc,1,1);
    query(P.x,P.z,1.2,e=>{if(!P.dashHit.has(e)&&Math.hypot(e.x-P.x,e.z-P.z)<e.r+1){P.dashHit.add(e);relicDashPass(e)}})}
  else if(P.moving){const k=Math.min(1,ml)/ml;P.x+=mx*k*S.spd*dt;P.z+=mz*k*S.spd*dt;const ta=Math.atan2(mx,mz);let da=ta-P.face;da=Math.atan2(Math.sin(da),Math.cos(da));P.face+=da*Math.min(1,dt*14)}
  collide(P,.4);
  const gh=hAt(P.x,P.z);P.vy-=26*dt;P.y+=P.vy*dt;if(P.y>gh+.05)P.peak=Math.max(P.peak==null?P.y:P.peak,P.y);
  if(P.y<=gh){P.y=gh;P.vy=0;P.jumps=0;if(P.peak!=null){relicLand(P.peak-gh);P.peak=null}}
  P.inv-=dt;P.dash-=dt;healP(S.regen*dt);relicUpdate(dt);
  // 时间凝滞
  if(P.rel.stopwatch){P.stopT-=dt;if(P.stopT<=0){P.stopT=30;G.timeStop=3;G.flash=.3;banner('时间凝滞','')}}
  if(G.timeStop>0)G.timeStop-=dt;
  // 血宴
  if(P.feast>0){P.feast-=dt;P.feastT-=dt;if(P.feastT<=0){P.feastT=.35;let n=0;inRange(P.x,P.z,9).forEach(e=>{hit(e,16,{el:'blood',src:'ult',np:1});if(n++<4)healP(.5)});burst(P.x,P.y+1,P.z,0xff2040,6,6)}}
  director(dt);buildGrid();
  // 敌人
  const despawn=spawnRadius()+24,airborne=P.y-gh>.9,frozenAll=G.timeStop>0;
  for(const e of enemies){if(e.dead)continue;
    const st=e.st;st.burn-=dt;st.curse-=dt;st.shock-=dt;st.slow-=dt;if(st.bleedT>0){st.bleedT-=dt;if(st.bleedT<=0)st.bleed=0}
    e.dotT-=dt;if(e.dotT<=0){e.dotT=.5;if(st.burn>0&&!P.rel.c_ember)hit(e,4*(P.rit.has('fire')?2:1),{dot:'burn',src:'burn'});if(!e.dead&&st.bleed>0)hit(e,st.bleed*1.4*(P.hunter==='heir'?1.5:1)*(P.rit.has('blood')?2:1),{dot:'bleed',src:'bleed'})}
    if(e.dead)continue;
    e.flash-=dt;
    let dx=P.x-e.x,dz=P.z-e.z,d=Math.hypot(dx,dz)||1;
    if(st.frozen>0||frozenAll){st.frozen-=dt;e.y=hAt(e.x,e.z)+(e.D.y||0)*e.s;continue}
    if(d>despawn&&!e.boss&&!e.tag){const[x,z]=spawnPoint(spawnRadius());e.x=x;e.z=z;continue}
    if(e.ally){allyTick(e,dt);continue}
    const edt=dt*(G.slow>0?.25:1);
    let special=e.boss?bossAI(e,edt):false;
    if(!special){const sp=e.spd*(st.slow>0?.55:1);let vx=dx/d*sp,vz=dz/d*sp;
      if(e.D.fly){const w=Math.sin(RUN.t*3+e.ph)*1.8;vx+=-dz/d*w;vz+=dx/d*w}
      e.x+=(vx+e.kx)*edt;e.z+=(vz+e.kz)*edt}
    const kd=Math.exp(-7*dt);e.kx*=kd;e.kz*=kd;
    if(!e.D.ghost&&!e.D.fly&&!e.boss)collide(e,e.r*.6);else{const B=WORLD.lim(2);e.x=clamp(e.x,-B,B);e.z=clamp(e.z,-B,B)}
    e.y=hAt(e.x,e.z);e.t+=dt*e.spd*1.6;e.rot=Math.atan2(dx,dz);
    if(d<e.r+.45&&(!airborne||e.D.fly||e.boss))hurtPlayer(e.dmg);
  }
  // 分离
  for(const e of enemies){if(e.dead||e.D.ghost)continue;query(e.x,e.z,e.r,o=>{if(o===e||o.D.ghost||e.boss)return;const dx=e.x-o.x,dz=e.z-o.z,rr=e.r+o.r,d2=dx*dx+dz*dz;if(d2<rr*rr&&d2>1e-6){const d=Math.sqrt(d2),p=(rr-d)*.5/d*(o.boss?2:1);e.x+=dx*p;e.z+=dz*p}})}
  for(const w of P.weapons)weaponTick(w,dt);orbitTick();
  fams.forEach((f,i)=>famTick(f,i,dt));
  // 投射物
  for(const p of proj){p.life-=dt;
    if(p.k==='scythe'){p.v-=24*dt;p.spin+=dt*14;
      if(p.v>0){p.x+=p.dx*p.v*dt;p.z+=p.dz*p.v*dt}else{const dx=P.x-p.x,dz=P.z-p.z,d=Math.hypot(dx,dz)||1,sp=Math.min(-p.v,22);p.x+=dx/d*sp*dt;p.z+=dz/d*sp*dt;if(d<1)p.life=0}
      const R=.9*p.sz;query(p.x,p.z,R,e=>{const d=Math.hypot(e.x-p.x,e.z-p.z);if(d<e.r+R&&(p.hits.get(e)||0)<RUN.t){p.hits.set(e,RUN.t+.35);hit(e,p.dmg,{el:'dark',src:'scythe',kb:5,fx:e.x-p.x,fz:e.z-p.z})}});continue}
    if(p.life<=0&&P.rel.boomerang&&!p.ret&&p.k!=='skull'){p.ret=true;p.life=.9;p.vx*=-1;p.vz*=-1;p.rot+=Math.PI;p.hits.clear();p.fc=true;p.pierce=Math.max(p.pierce,1);p.home=null}
    if(p.home){if(p.home.dead)p.home=nearest(p.x,p.z,12);if(p.home){const dx=p.home.x-p.x,dz=p.home.z-p.z,d=Math.hypot(dx,dz)||1;p.vx+=dx/d*40*dt;p.vz+=dz/d*40*dt;const v=Math.hypot(p.vx,p.vz),m=11;if(v>m){p.vx*=m/v;p.vz*=m/v}p.rot=Math.atan2(p.vx,p.vz)}}
    if(p.curve){const a=Math.atan2(p.vx,p.vz)+p.curve*dt,v=Math.hypot(p.vx,p.vz);p.vx=Math.sin(a)*v;p.vz=Math.cos(a)*v;p.rot=a}
    p.x+=p.vx*dt;p.z+=p.vz*dt;
    query(p.x,p.z,.4,e=>{if(p.hits.has(e))return;const d=Math.hypot(e.x-p.x,e.z-p.z);if(d<e.r+.35){p.hits.add(e);
      const r=hit(e,p.dmg,{el:p.el,src:p.src,kb:p.k==='raven'?3:6,fx:p.vx,fz:p.vz,fc:p.fc});if(p.onHit&&r)p.onHit(p,e,r);if(p.leech&&Math.random()<.15)healP(1);
      if(r&&r.killed&&P.rel.mirror&&p.k!=='shard')for(const s of[-.5,.5])proj.push({k:'shard',x:p.x,z:p.z,y:p.y,vx:Math.sin(p.rot+s)*18,vz:Math.cos(p.rot+s)*18,rot:p.rot+s,life:.6,dmg:p.dmg*.5*P.rel.mirror,pierce:1,hits:new Set([e]),el:p.el,src:'relic'});
      if(r&&r.crit&&p.evo&&p.k==='dagger')for(const s of[-.6,.6])proj.push({k:'shard',x:p.x,z:p.z,y:p.y,vx:Math.sin(p.rot+s)*18,vz:Math.cos(p.rot+s)*18,rot:p.rot+s,life:.5,dmg:p.dmg*.5,pierce:2,hits:new Set([e]),el:'phys',src:'dagger'});
      if(--p.pierce<=0){p.life=0;return false}}})}
  proj=proj.filter(p=>p.life>0);
  // 冰环
  for(const f of frostRings){if(f.delay>0){f.delay-=dt;continue}f.r+=dt*f.max/.6;
    query(f.x,f.z,f.r+1,e=>{if(f.hit.has(e))return;const d=Math.hypot(e.x-f.x,e.z-f.z);if(Math.abs(d-f.r)<.9+e.r*.5){f.hit.add(e);hit(e,f.dmg,{el:'frost',src:'frost',stack:f.stack,kb:2,fx:e.x-f.x,fz:e.z-f.z})}});
    if(!f.fx){const fx=ringsFx.find(r=>r.life<=0);if(fx){f.fx=fx;fx.life=1;fx.m.visible=true}}
    if(f.fx){f.fx.m.position.set(f.x,hAt(f.x,f.z)+.15,f.z);f.fx.m.scale.set(f.r*2.1,f.r*2.1,1);f.fx.m.material.opacity=1-f.r/f.max}
    if(f.r>=f.max){f.done=true;if(f.fx){f.fx.life=0;f.fx.m.visible=false}}}
  frostRings=frostRings.filter(f=>!f.done);
  // 预警
  for(const t of teleList){t.t-=dt;if(t.t<=0){t.done=true;burst(t.x,hAt(t.x,t.z)+.2,t.z,0xff2030,16,6);if(Math.hypot(P.x-t.x,P.z-t.z)<t.r&&P.y-hAt(P.x,P.z)<1.2)hurtPlayer(t.dmg*DIFFS[RUN.diff].dmg)}}
  teleList=teleList.filter(t=>!t.done);
  // 敌方弹幕
  if(G.timeStop<=0)for(const b of ebolts){const bdt=dt*(G.slow>0?.25:1);b.life-=bdt;b.x+=b.vx*bdt;b.z+=b.vz*bdt;if(Math.hypot(b.x-P.x,b.z-P.z)<.6&&P.y-hAt(P.x,P.z)<1.4){hurtPlayer(13*DIFFS[RUN.diff].dmg*(1+RUN.stage*.3));b.life=0}}
  ebolts=ebolts.filter(b=>b.life>0);
  // 拾取
  for(const g of gems){const dx=P.x-g.x,dz=P.z-g.z,d=Math.hypot(dx,dz);if(d<S.mag)g.pull=true;
    if(g.pull){g.sp=Math.min(g.sp+45*dt,28);g.x+=dx/(d||1)*g.sp*dt;g.z+=dz/(d||1)*g.sp*dt;if(d<.6){g.dead=true;AU.sfx('gem');if(!relicGem(g))gainXp(g.v*S.xp)}}}
  gems=gems.filter(g=>!g.dead);
  for(const c of coins){const dx=P.x-c.x,dz=P.z-c.z,d=Math.hypot(dx,dz);if(d<S.mag*.8)c.pull=true;
    if(c.pull){c.sp=Math.min(c.sp+45*dt,28);c.x+=dx/(d||1)*c.sp*dt;c.z+=dz/(d||1)*c.sp*dt;if(d<.6){c.dead=true;AU.sfx('coin');if(!P.rel.gluttony){RUN.gold+=c.v;RUN.goldTotal+=c.v}if(RUN.goldTotal>=500)unlockAch('rich')}}}
  coins=coins.filter(c=>!c.dead);
  for(const k of picks){k.t+=dt;if(Math.hypot(P.x-k.x,P.z-k.z)<1.3){k.dead=true;
    if(k.k==='heal'){healP(30,true);AU.sfx('heal')}
    else if(k.k==='magnet'){for(const g of gems)g.pull=true;for(const c of coins)c.pull=true;AU.sfx('heal');toast('灵魂引磁石','所有结晶与金币飞向你')}
    else{burst(k.x,P.y+.8,k.z,0xffc060,20,5);RUN.queue.push({t:'chest',free:true})}}}
  picks=picks.filter(k=>!k.dead);
  enemies=enemies.filter(e=>!e.dead);
  poiTick(dt);
  if(RUN.queue.length&&G.state==='play')nextQueued();
}
function gainXp(v){P.xp+=v;while(P.xp>=P.next){P.xp-=P.next;P.lvl++;P.next=need(P.lvl);RUN.queue.push({t:'level'})}}

/* ---------- 兴趣点交互 ---------- */
let nearPoi=null;
function poiTick(dt){nearPoi=null;let bd=9;
  for(const p of POIS){if(p.used&&p.type!=='portal')continue;const d=(p.x-P.x)**2+(p.z-P.z)**2;
    if(p.type==='charge'){if(d<9){p.prog+=dt/4;if(p.prog>=1){p.prog=1;poiSetUsed(p);RUN.queue.push({t:'boon'});AU.sfx('chest')}}else p.prog=Math.max(0,p.prog-dt/8);if(d<9){nearPoi=p;bd=d}continue}
    if(d<bd&&d<(p.type==='boss'||p.type==='portal'?16:7)){bd=d;nearPoi=p}}}
function poiCost(p){return p.type==='chest'?(P.rel.gluttony?Math.ceil(P.hp*.2):chestPrice((12+RUN.chestsOpened*7)*(1+(RUN.ri||0)*.4))):0}
function isLastStage(){return !RUN.route||RUN.ri>=RUN.route.length-1}
function interact(){const p=nearPoi;if(!p||G.state!=='play')return;
  if(p.type==='chest'&&P.rel.gluttony){const c=poiCost(p);if(P.hp<=c+1){AU.sfx('deny');toast('鲜血不足','噬光圣杯要求献出当前生命的 20%');return}P.hp-=c;hurtFlash();RUN.chestsOpened++;poiSetUsed(p);RUN.queue.push({t:'chest'})}
  else if(p.type==='chest'){const c=poiCost(p);if(RUN.gold<c){AU.sfx('deny');toast('金币不足',`开启需要 ${c} 金币`);return}RUN.gold-=c;RUN.chestsOpened++;poiSetUsed(p);RUN.queue.push({t:'chest'})}
  else if(p.type==='blood'){const c=Math.ceil(S.maxHp*.25);if(P.hp<=c+1){AU.sfx('deny');toast('鲜血不足','献血台需要献出 25% 生命');return}P.hp-=c;hurtFlash();poiSetUsed(p);RUN.queue.push({t:'chest',minR:1})}
  else if(p.type==='curse'){poiSetUsed(p);P.curseLv+=.12;RUN.obelisk=4;for(let i=0;i<4;i++){const a=i/4*TAU;spawnEnemy(pickType(),p.x+Math.sin(a)*6,p.z+Math.cos(a)*6,{elite:true,tag:'obelisk'})}
    banner('诅咒降临','敌人永久变强 12%——击败 4 名守卫获得宝物');AU.sfx('boss')}
  else if(p.type==='nest'){poiSetUsed(p);RUN.queue.push({t:'nest'})}
  else if(p.type==='boss'){summonBoss(false)}
  else if(p.type==='portal'){stageClear()}
  nextQueued()}

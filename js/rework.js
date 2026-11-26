/* ============ 万界乱斗 · 基础遗物改造 ============
   去掉"纯加数值"的同质化效果，换成本作独有的机制。保留原 id，武器进化与腐化关系不变。 */
Object.assign(RELICS.whetstone,{n:'断头台之刃',d:'生命低于 15% 的普通敌人（精英 8%）被你命中时当场处决，掉落双倍结晶。'});
Object.assign(RELICS.feather,{n:'渡鸦信使',d:'冲刺后 2 秒内，武器投射物速度 ×1.6、穿透 +2。'});
Object.assign(RELICS.boneshield,{n:'白骨壁垒',d:'站定时每秒长出 1 层骨甲（最多 10 层），每层抵挡 1 点伤害；移动时每秒剥落 2 层。'});
Object.assign(RELICS.holywater,{n:'圣水瓶',d:'拾取结晶时 6% 几率洒下一洼圣水（6 秒）：你在其中每秒回复 3 生命，踏入的敌人被圣火灼烧。'});
Object.assign(RELICS.coinpurse,{n:'守墓人的契约',d:'每持有 50 金币，伤害 +4%（最多 +40%）。花掉金币，力量也随之流失。'});
Object.assign(RELICS.candle,{n:'引魂之烛',d:'拾取范围 +25%；被吸向你的结晶会穿过并灼伤沿途的敌人。'});
Object.assign(RELICS.fang,{n:'猩红獠牙',d:'击杀出血的敌人时，按其出血层数回复生命，并把剩余出血传给附近的敌人。'});
Object.assign(RELICS.ember,{n:'余烬之戒',d:'被灼烧的敌人死亡时留下一团余烬（3 秒），持续灼烧踏入的敌人。'});
Object.assign(RELICS.frostheart,{n:'霜之心',d:'击杀冻结的敌人时，它碎裂成 6 片冰刺向四周飞射。'});
Object.assign(RELICS.lens,{n:'猎魔透镜',d:'连续命中精英与首领会叠加弱点（每层受伤 +3%，最多 30 层），3 秒未命中则清空。'});
Object.assign(RELICS.thorns,{n:'荆棘圣衣',d:'受到的伤害以 300% 储存为荆棘；下次冲刺时，荆棘撕裂冲刺路径上的每一名敌人。'});

/* ---------- 地面效果：圣水与余烬 ---------- */
const RW={pools:[],embers:[]};
const poolMeshes=pool(10,()=>makeDrape(new THREE.MeshBasicMaterial({map:glowTex,color:0x8ad8ff,transparent:true,opacity:.7,blending:THREE.AdditiveBlending,depthWrite:false}),10));
function reworkOnHit(e,o){const r=P.rel;
  if(r.whetstone&&!e.boss&&!o.dot&&e.hp>0&&e.hp<e.max*(e.elite?.08:.15)*(1+.25*(r.whetstone-1))){e.xp*=2;track('relic',e.hp);e.hp=0;showReact(e,'处决');burst(e.x,e.y+1.2,e.z,0xffffff,10,6)}}
function reworkOnKill(e){const r=P.rel;
  if(r.fang&&e.st.bleed>0){healP(e.st.bleed*.5*r.fang,true);const n=nearest(e.x,e.z,5,e);if(n){n.st.bleed=Math.min(10,n.st.bleed+Math.ceil(e.st.bleed/2));n.st.bleedT=4;drawChain(e,n)}}
  if(r.ember&&e.st.burn>0&&RW.embers.length<30)RW.embers.push({x:e.x,z:e.z,t:3,k:0});
  if(r.frostheart&&e.st.frozen>0)for(let i=0;i<6;i++){const a=i/6*TAU+rand(0,.5);proj.push({k:'shard',x:e.x,z:e.z,y:e.y+1,vx:Math.sin(a)*16,vz:Math.cos(a)*16,rot:a,life:.6,dmg:14*r.frostheart,pierce:2,hits:new Set([e]),el:'frost',src:'relic'})}}
function reworkOnHurt(d){const r=P.rel;if(r.boneshield&&P.boneA>0){const b=Math.min(P.boneA,d);d-=b;P.boneA-=b;if(b>0)showReact({x:P.x,y:P.y,z:P.z,s:1},'骨甲 -'+Math.round(b))}return d}
function reworkDash(){if(P.rel.feather)P.ravenT=RUN.t+2.2;P.thornDash=P.thornStore||0;P.thornStore=0}
function reworkDashPass(e){if(P.thornDash>0){hit(e,P.thornDash/S.dmg,{src:'relic',np:1,kb:6,fx:e.x-P.x,fz:e.z-P.z});burst(e.x,e.y+1,e.z,0x8a3040,6,5)}}
function reworkGem(g){if(P.rel.holywater&&Math.random()<.06*P.rel.holywater&&RW.pools.length<6)RW.pools.push({x:P.x,z:P.z,t:6,k:0})}
function reworkDmg(e,o){let m=1;if(P.rel.coinpurse)m*=1+Math.min(.4,Math.floor(RUN.gold/50)*.04)*P.rel.coinpurse;return m}
function reworkUpdate(dt){const r=P.rel;
  // 白骨壁垒
  if(r.boneshield){const max=10*r.boneshield;P.boneA=P.boneA||0;if(P.stillT>.3)P.boneA=Math.min(max,P.boneA+dt*r.boneshield);else if(P.moving)P.boneA=Math.max(0,P.boneA-2*dt)}
  // 圣水
  for(const p of RW.pools){p.t-=dt;p.k-=dt;if(p.k<=0){p.k=.5;if((P.x-p.x)**2+(P.z-p.z)**2<3.4)healP(1.5,false);inRange(p.x,p.z,1.8).forEach(e=>hit(e,6,{el:'fire',src:'relic',np:1}))}}
  RW.pools=RW.pools.filter(p=>p.t>0);
  // 余烬
  for(const em of RW.embers){em.t-=dt;em.k-=dt;if(Math.random()<.3)burst(em.x,hAt(em.x,em.z)+.2,em.z,0xff7020,1,1);if(em.k<=0){em.k=.5;inRange(em.x,em.z,1.6).forEach(e=>hit(e,5,{el:'fire',src:'relic',np:1}))}}
  RW.embers=RW.embers.filter(e=>e.t>0);
  // 引魂之烛：飞行中的结晶灼伤敌人
  if(r.candle){let n=0;for(const gm of gems){if(!gm.pull||n>40)continue;n++;query(gm.x,gm.z,.6,e=>{if((e.x-gm.x)**2+(e.z-gm.z)**2<(e.r+.3)**2&&(e.hc.cd||0)<RUN.t){e.hc.cd=RUN.t+.4;hit(e,4*r.candle,{el:'fire',src:'relic',np:1})}})}}
  // 圣水视觉
  poolMeshes.forEach((m,i)=>{const p=RW.pools[i];if(p){m.m.visible=true;drape(m.m,p.x,p.z,4,G.rt*.3,.1);m.m.material.opacity=Math.min(1,p.t)*.7}else m.m.visible=false});
}
wrapHook('relicOnHit',o=>(e,op,d)=>{o(e,op,d);reworkOnHit(e,op)});
wrapHook('relicOnKill',o=>(e,op,ov)=>{o(e,op,ov);reworkOnKill(e)});
wrapHook('relicOnHurt',o=>d=>o(reworkOnHurt(d)));
wrapHook('relicDash',o=>()=>{o();reworkDash()});
wrapHook('relicDashPass',o=>e=>{o(e);reworkDashPass(e)});
wrapHook('relicGem',o=>g=>{reworkGem(g);return o(g)});
wrapHook('relicDmgMul',o=>(e,op)=>o(e,op)*reworkDmg(e,op));
wrapHook('relicUpdate',o=>dt=>{o(dt);reworkUpdate(dt)});
wrapHook('relicStageEnter',o=>()=>{o();RW.pools=[];RW.embers=[]});
// 增益栏：骨甲、荆棘、契约
if(typeof buffsHTML==='function'){}

/* ============ 万界乱斗 · 第四界「海贼港湾」与新首领 ============
   · 海贼港湾：阳光沙滩、椰林、木栈道、货箱木桶、搁浅的沉船
   · 每个世界有 2～3 名首领，每局随机登场。新首领是"暗影化"的乱斗者（用角色像素图染暗、放大），各有专属招式 */
const sandM=std(0xffffff),woodL=std(0x9a6a3a),sailM=std(0xf0e8d8,{side:THREE.DoubleSide}),hullM=std(0x6a4a2a);
Object.assign(DK,{
  palm:new Kind([{g:GEO.cyl,m:woodL,l:L(0,1,0,0,0,.12,.2,2.1,.2),sh:1},{g:GEO.cyl,m:woodL,l:L(.32,2.9,0,0,0,.28,.17,1.9,.17),sh:1},{g:GEO.cyl,m:woodL,l:L(.8,4.5,0,0,0,.45,.14,1.6,.14),sh:1},
    ...[0,1,2,3,4,5].map(i=>({g:GEO.box,m:leafM,tint:0x3aa84a,main:1,l:L(1.2+Math.sin(i/6*TAU)*1.1,5.15,Math.cos(i/6*TAU)*1.1,Math.cos(i/6*TAU)*.5,i/6*TAU,-Math.sin(i/6*TAU)*.5,2.4,.08,.7),sh:1})),
    {g:GEO.sphLo,m:woodL,l:L(1.1,5,0,0,0,0,.28,.28,.28)}],60),
  crate:new Kind([{g:GEO.box,m:sandM,tint:0xb08050,main:1,l:L(0,.5,0,0,0,0,1,1,1),sh:1,rs:1},{g:GEO.box,m:hullM,l:L(0,.5,0,0,0,0,1.04,.12,1.04)},{g:GEO.box,m:sandM,tint:0xa07040,main:1,l:L(.3,1.3,.1,0,.4,0,.6,.6,.6),sh:1}],60),
  barrel:new Kind([{g:GEO.cyl,m:sandM,tint:0x8a5a30,main:1,l:L(0,.55,0,0,0,0,.42,1.1,.42),sh:1,rs:1},{g:GEO.cyl,m:ironM,l:L(0,.25,0,0,0,0,.44,.06,.44)},{g:GEO.cyl,m:ironM,l:L(0,.85,0,0,0,0,.44,.06,.44)}],60),
  wreck:new Kind([{g:GEO.box,m:hullM,l:L(0,.9,0,0,0,.25,7,1.8,2.6),sh:1,rs:1},{g:GEO.cone,m:hullM,l:L(4.2,1.2,0,0,0,-Math.PI/2+.25,1.3,2.2,1.3),sh:1},{g:GEO.cyl,m:woodL,l:L(-.5,4,0,0,0,.35,.15,6,.15),sh:1},
    {g:GEO.plane,m:sailM,l:L(.4,4.6,.1,0,.2,.35,2.4,2.8,1)},{g:GEO.box,m:woodL,l:L(-.5,5.6,0,0,0,.35,.1,.1,3)}],12),
});
for(const k of["palm","crate","barrel","wreck"])growKind(DK[k],DK[k].max*3);
Object.assign(DCOL,{palm:.35,crate:.75,barrel:.5,wreck:2.6});
STAGES.push({id:'harbor',n:'海贼港湾',sub:'第四界',fog:0xb8e0f0,fogD:.0078,hemi:[0xfff0dc,0x6a9aa8,.7],moon:0xfff0d0,moonI:1.1,sky:0x8acff0,skyTop:0x2a86d8,moonVis:0,mist:0xffffff,ash:0xfff0c0,
  ground:{bg:'#d8c08a',hue:[36,46],sat:42,light:[54,63],flowers:['#ffffff','#ffb8c8','#f0d0a0'],style:'meadow'},amp:.9,wall:0xc8a870,
  decor:{wreck:4,crate:18,barrel:18},
  nature:{path:0x9a6a3a,pathTint:[0x9a6a3a,0x8a5a30,0xa87848,0x7a5028],hedges:0,gates:0,vary:.14,
    clusters:[['palm',12,5,5],['rock',6,4,2.5],['bush',5,3,2.5]],tufts:380,flowers:120,
    tints:{palm:[0x3aa84a,0x4ab85a,0x2a9a48],bush:[0x5a9a3a,0x6aaa48],flower:[0xffffff,0xffb8c8,0xf0d0a0],tuft:[0x8aa850,0x9ab860,0x7a9a48],crate:[0xb08050,0xa07040,0xc09060],barrel:[0x8a5a30,0x7a4a28]}},
  roster:[['ghoul',0,10],['bat',20,6],['wraith',50,4],['hellknight',90,4]],boss:'kraken',mul:5});
/* ---------- 新首领 ---------- */
const DARK=0x6a5a90;
function heroBoss(id,sprite,o){if(!SPR2[sprite])return;EK["px_hb_"+id]=new PixKind(SPR2[sprite],8,16,2.8,2,10);BOSSES[id]=Object.assign({kind:'px_hb_'+id,r:1.6,sc:2.5,tint:DARK},o)}
heroBoss('shadowmerc','cyber',{n:'暗影佣兵',hp:3000,spd:2.6,dmg:22,col:0x7af0ff,tint:0x7a6aa8});
heroBoss('sheriff','leon',{n:'枪火警长',hp:2800,spd:2.2,dmg:20,col:0xffd060,tint:0x8a7a60});
heroBoss('archmage','wizard',{n:'禁咒巫师',hp:5400,spd:2,dmg:24,col:0xffe070,tint:0x7a68b0});
heroBoss('chessking','king',{n:'黑白棋王',hp:5600,spd:1.8,dmg:24,col:0xe8e8f0,tint:0x5a5a68});
heroBoss('goldking','fighter',{n:'金焰魔王',hp:9200,spd:2.4,dmg:28,col:0xffd23a,tint:0xa08840});
heroBoss('ronin','vergil',{n:'冥河剑豪',hp:8800,spd:2.6,dmg:28,col:0x6a8aff,tint:0x5a6aa0});
heroBoss('captain','rubber',{n:'深海船长',hp:12000,spd:2.4,dmg:30,col:0x3ad8ff,tint:0x4a7a90});
heroBoss('stormpilot','pilot',{n:'风暴舰长',hp:11000,spd:2.2,dmg:30,col:0xb8a8ff,tint:0x6a6aa0});
BOSSES.kraken={n:'怒涛巨像',kind:BOSSES.colossus.kind,hp:13000,spd:2,dmg:32,r:2.4,sc:3.4,tint:0x4a9ab0,col:0x3ad8ff};
const BOSS_POOL={neon:['colossus','shadowmerc','sheriff'],academy:['bishop','archmage','chessking'],dojo:['lord','goldking','ronin'],harbor:['kraken','captain','stormpilot']};
for(const st of STAGES)if(BOSS_POOL[st.id])st.bosses=BOSS_POOL[st.id].filter(b=>BOSSES[b]);
wrapHook('loadStage',o=>i=>{const st=STAGES[i];if(st.bosses&&st.bosses.length)st.boss=pick(st.bosses);o(i)});
/* 专属招式：返回 true 表示本帧由招式接管移动 */
const bdmg=()=>DIFFS[RUN.diff].dmg*(1+(RUN.ri||0)*.35);
function aimBolts(e,n,spread,sp){const a0=Math.atan2(P.x-e.x,P.z-e.z);for(let i=0;i<n;i++){const a=a0+(i-(n-1)/2)*spread;ebolts.push({x:e.x,z:e.z,vx:Math.sin(a)*sp,vz:Math.cos(a)*sp,life:4})}}
const BAI={
  shadowmerc(e,dt,d,dx,dz){ // 三连突进斩
    if(e.mode===1){e.mt-=dt;if(e.mt<=0){e.mode=2;e.mt=.35;e.cdx=dx/d;e.cdz=dz/d;AU.sfx('dash')}return true}
    if(e.mode===2){e.mt-=dt;e.x+=e.cdx*26*dt;e.z+=e.cdz*26*dt;if(Math.random()<.6)spark(e.x,e.y+1.5,e.z,0x7af0ff,2,3,.3,2);if(e.mt<=0){e.dn=(e.dn||0)+1;if(e.dn<3){e.mode=1;e.mt=.28}else{e.mode=0;e.dn=0}}return true}
    if(e.a1<=0){e.a1=4.5;e.mode=1;e.mt=.6;const a=Math.atan2(dx,dz);for(let i=1;i<=6;i++)tele(e.x+Math.sin(a)*i*2.5,e.z+Math.cos(a)*i*2.5,1.4,.6,18*bdmg())}
    if(e.a2<=0){e.a2=10;for(let i=0;i<5;i++){const a=i/5*TAU;spawnEnemy('ghoul',e.x+Math.sin(a)*3,e.z+Math.cos(a)*3)}}return false},
  sheriff(e,dt,d){ // 扇形连射 + 地雷
    if(e.a1<=0){e.burst=(e.burst||0)+1;e.a1=e.burst%4?0.22:2.4;aimBolts(e,5,.16,11)}
    if(e.a2<=0){e.a2=7;for(let i=0;i<6;i++)tele(P.x+rand(-7,7),P.z+rand(-7,7),2,1.6,20*bdmg())}
    if(d<6){const k=-2.4*dt/d;e.x+=(P.x-e.x)*k;e.z+=(P.z-e.z)*k;return true}return false},
  archmage(e,dt){ // 法阵 + 旋转魔弹
    if(e.a1<=0){e.a1=.12;e.ang=(e.ang||0)+.42;for(let k=0;k<2;k++){const a=e.ang+k*Math.PI;ebolts.push({x:e.x,z:e.z,vx:Math.sin(a)*7,vz:Math.cos(a)*7,life:5})}}
    if(e.a2<=0){e.a2=6;const R=4.5;for(let i=0;i<7;i++){const a=i/7*TAU;tele(P.x+Math.sin(a)*R,P.z+Math.cos(a)*R,1.6,1.3,20*bdmg())}tele(P.x,P.z,2.2,1.8,26*bdmg())}
    if(e.a3<=0){e.a3=9;burst(e.x,e.y+2,e.z,0xffe070,24,6);const a=rand(0,TAU);e.x=P.x+Math.sin(a)*10;e.z=P.z+Math.cos(a)*10}return false},
  chessking(e,dt){ // 车（横竖）与象（斜线）的落点
    if(e.a1<=0){e.a1=5;const diag=(e.cn=(e.cn||0)+1)%2;for(let k=0;k<4;k++){const a=k*Math.PI/2+(diag?Math.PI/4:0);for(let i=-8;i<=8;i++)if(i)tele(P.x+Math.sin(a)*i*2.2,P.z+Math.cos(a)*i*2.2,1.2,1.1+Math.abs(i)*.03,22*bdmg())}}
    if(e.a2<=0){e.a2=9;for(let i=0;i<8;i++){const x=P.x+(i%4-1.5)*3,z=P.z+(i<4?-8:8);spawnEnemy('knight',x,z)}banner('兵卒列阵','')}return false},
  goldking(e,dt,d,dx,dz){ // 气功炮 + 瞬移连打
    if(e.a1<=0){e.a1=6;const a=Math.atan2(dx,dz);for(let i=1;i<=14;i++)tele(e.x+Math.sin(a)*i*2,e.z+Math.cos(a)*i*2,1.6,1.1,30*bdmg());pillarAt(e,0xffd23a)}
    if(e.a2<=0){e.a2=4;aimBolts(e,7,.22,9)}
    if(e.a3<=0){e.a3=8;const a=rand(0,TAU);burst(e.x,e.y+2,e.z,0xffd23a,20,6);e.x=P.x+Math.sin(a)*4;e.z=P.z+Math.cos(a)*4;tele(P.x,P.z,3,.7,26*bdmg())}return false},
  ronin(e,dt){ // 居合：瞬移到身后 + 十字斩
    if(e.a1<=0){e.a1=4;const a=P.face+Math.PI;burst(e.x,e.y+2,e.z,0x6a8aff,16,5);e.x=P.x+Math.sin(a)*5;e.z=P.z+Math.cos(a)*5;
      for(let k=0;k<4;k++){const b=k*Math.PI/2+Math.PI/4;for(let i=1;i<=4;i++)tele(P.x+Math.sin(b)*i*1.8,P.z+Math.cos(b)*i*1.8,1.3,.8,24*bdmg())}tele(P.x,P.z,1.6,.8,24*bdmg())}
    if(e.a2<=0){e.a2=7;const n=24;for(let i=0;i<n;i++){const a=i/n*TAU;ebolts.push({x:e.x,z:e.z,vx:Math.sin(a)*9,vz:Math.cos(a)*9,life:3})}}return false},
  captain(e,dt,d,dx,dz){ // 伸缩重拳 + 炮击
    if(e.mode===2){e.mt-=dt;e.x+=e.cdx*30*dt;e.z+=e.cdz*30*dt;if(e.mt<=0)e.mode=0;return true}
    if(e.a1<=0){e.a1=5;e.mode=2;e.mt=.4;e.cdx=dx/d;e.cdz=dz/d;const a=Math.atan2(dx,dz);for(let i=1;i<=6;i++)tele(e.x+Math.sin(a)*i*2,e.z+Math.cos(a)*i*2,1.5,.45,26*bdmg())}
    if(e.a2<=0){e.a2=3;for(let i=0;i<3;i++)tele(P.x+rand(-4,4),P.z+rand(-4,4),2.6,1.4,24*bdmg())}
    if(e.a3<=0){e.a3=10;for(let i=0;i<6;i++){const a=i/6*TAU;spawnEnemy('bloodghoul',e.x+Math.sin(a)*3,e.z+Math.cos(a)*3)}}return false},
  stormpilot(e,dt){ // 雷暴 + 追踪弹幕
    if(e.a1<=0){e.a1=.9;const x=P.x+rand(-6,6),z=P.z+rand(-6,6);tele(x,z,2.2,1,24*bdmg())}
    if(e.a2<=0){e.a2=5;aimBolts(e,9,.12,8)}
    if(e.a3<=0){e.a3=12;banner('风暴降临','');for(let i=0;i<16;i++){const a=i/16*TAU;tele(P.x+Math.sin(a)*8,P.z+Math.cos(a)*8,2,1.5,24*bdmg())}}return false},
};
function pillarAt(e,c){if(typeof pillar==='function')pillar(e.x,e.y,e.z,c,1.6,24,.8)}
wrapHook('bossAI',o=>(e,dt)=>{const f=BAI[e.type];if(!f)return o(e,dt);
  const t=dt; // 狂暴加速由 events.js 统一处理
e.a1-=t;e.a2-=t;e.a3-=t;bossLight.position.set(e.x,e.y+5,e.z);bossLight.intensity=3;
  const dx=P.x-e.x,dz=P.z-e.z,d=Math.hypot(dx,dz)||1;return f(e,t,d,dx,dz)});

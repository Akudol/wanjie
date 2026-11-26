/* ============ 永夜挽歌 · 新遗物与圣骸匣（邻接遗物格） ============ */
/* 圣骸匣：5×3 的遗物格。位置决定复制/重触发/吞噬目标；同一直线上三件同印记遗物构成「仪式」。 */
const BOX_W=5,BOX_H=3,BOX_N=BOX_W*BOX_H;
const TAGS={
  blood:{n:'血',c:'#ff4a62'},fire:{n:'火',c:'#ffa040'},frost:{n:'霜',c:'#8fe3ff'},volt:{n:'雷',c:'#b9a6ff'},
  dark:{n:'暗',c:'#c77dff'},bone:{n:'骨',c:'#e8dcc4'},gold:{n:'金',c:'#ffc860'},time:{n:'时',c:'#7dd8c8'},motion:{n:'动',c:'#9ab0ff'},
};
const RITUALS={
  blood:{n:'血之仪式',d:'出血伤害 ×2，吸血獠牙几率 ×2'},fire:{n:'火之仪式',d:'灼烧伤害 ×2'},frost:{n:'霜之仪式',d:'冻结时长 ×2'},
  volt:{n:'雷之仪式',d:'感电的亡者死亡时放出 3 跳闪电'},dark:{n:'暗之仪式',d:'诅咒增伤 25% → 50%'},bone:{n:'骨之仪式',d:'护甲 +3，生命上限 +20'},
  gold:{n:'金之仪式',d:'宝箱价格 -30%'},time:{n:'时之仪式',d:'大招充能 +50%'},motion:{n:'动之仪式',d:'冲刺冷却 -30%'},
};
// 旧遗物补上印记
Object.entries({whetstone:'bone',feather:'motion',boneshield:'bone',holywater:'blood',coinpurse:'gold',candle:'fire',fang:'blood',ember:'fire',frostheart:'frost',seed:'dark',spurs:'motion',lens:'volt',
  bell:'volt',codex:'dark',mirror:'frost',thorns:'bone',stopwatch:'time',pact:'dark',phoenix:'fire',crown:'blood',saint:'gold',grail:'time'}).forEach(([k,t])=>RELICS[k].tag=t);
Object.assign(ICONS,{
  veil:'<path d="M4 4h16v6c0 6-4 10-8 10S4 16 4 10z"/><path d="M8 11c1 1 2 1 3 0M13 11c1 1 2 1 3 0"/>',
  drown:'<path d="M12 3v9M8 8l4 4 4-4"/><path d="M3 16c3 2 6 2 9 0s6-2 9 0M3 20c3 2 6 2 9 0s6-2 9 0"/>',
  echo:'<circle cx="9" cy="12" r="4"/><circle cx="15" cy="12" r="4" stroke-dasharray="2 2"/>',
  beam:'<path d="M3 12h18"/><path d="M3 9h18M3 15h18" stroke-dasharray="1 3"/><circle cx="4" cy="12" r="2" fill="currentColor"/>',
  ring:'<path d="M20 12a8 8 0 1 1-3-6.2"/><path d="M17 2v4h4"/>',
  wax:'<path d="M8 9h8v12H8z"/><path d="M8 13c2 1 2 3 0 4M16 12c-2 1-2 2 0 3"/><path d="M12 2c2 2.5 2 4 0 6-2-2-2-3.5 0-6z"/>',
  snake:'<circle cx="12" cy="12" r="8"/><path d="M20 12l-3-2v4z" fill="currentColor"/>',
  scale:'<path d="M12 3v18M5 21h14M4 8h16"/><path d="M4 8l-2 6h4zM20 8l-2 6h4z"/>',
  stigma:'<path d="M12 3c-4 4-6 7-6 10a6 6 0 0 0 12 0c0-3-2-6-6-10z"/><path d="M12 10v6M9 13h6"/>',
  boot2:'<path d="M8 2h5v9l6 3.5V19H8z"/><path d="M5 22l3-3M12 22l1-3M19 22l-1-3"/>',
  still:'<circle cx="12" cy="6" r="3"/><path d="M12 9v8M8 21h8M7 13h10"/>',
  cloak:'<path d="M12 3l7 18H5z"/><path d="M12 3v18"/>',
});
const NEW_RELICS={
  // —— 传说：改写规则 ——
  gluttony:{r:3,tag:'gold',n:'噬光圣杯',icon:'chalice',d:'武器冷却 -25%。代价：再也得不到金币；宝箱改为消耗当前生命 20% 开启。'},
  veil:{r:3,tag:'dark',n:'盲祷面纱',icon:'veil',d:'全部伤害 +40%。代价：看不见首领血条与技能预警。'},
  blasphemy:{r:3,tag:'dark',n:'渎圣经卷',icon:'codex',d:'经验结晶不再给经验，拾取时化为追踪暗弹；此后每次开箱获得 3 件遗物。'},
  bloodDark:{r:3,tag:'blood',n:'血暗同源',icon:'blood',d:'血与暗互相视为对方：血系命中附带诅咒，暗系命中附带出血。'},
  reliquary:{r:3,tag:'bone',n:'骸骨圣匣',icon:'altar',d:'复制圣骸匣中紧邻其右的那件遗物。',pos:'right'},
  beam:{r:3,tag:'volt',n:'光束圣痕',icon:'beam',d:'银十字匕首化为贯穿一切的圣光光束，伤害 +30%。',need:'dagger'},
  eternal:{r:3,tag:'fire',n:'永燃之誓',icon:'ember',d:'元素反应不再消耗状态；同一亡者每 2 秒至多触发一次同种反应。'},
  // —— 史诗 ——
  drowned:{r:2,tag:'time',n:'溺亡者的手势',icon:'drown',d:'大招充能 ×2.5。代价：充满即自动释放，无法保留。'},
  overflow:{r:2,tag:'time',n:'余烬沙漏',icon:'hourglass',d:'大招充能可溢出到 200%，存下第二发连续释放。'},
  servant:{r:2,tag:'bone',n:'主仆易位',icon:'hound',d:'眷属的每次攻击都会触发你的遗物；眷属伤害 +40%。'},
  lefthand:{r:2,tag:'dark',n:'左手之罪',icon:'fang',d:'紧邻其左的那件遗物效果翻倍（触发两次）。',pos:'left'},
  echo:{r:2,tag:'time',n:'回声挽钟',icon:'echo',d:'释放大招 1.5 秒后，在原地留下残影以 50% 威力重放一次。'},
  ledger:{r:2,tag:'motion',n:'罪印账本',icon:'pact',d:'每次命中叠一层罪印；冲刺穿过 ≥8 层罪印的亡者时引爆，造成其已损失生命 20%（首领 5%）。'},
  stigmata:{r:2,tag:'gold',n:'圣痕账簿',icon:'stigma',d:'受伤先扣金币（1 金抵 1 血）；金币为 0 时受到双倍伤害。'},
  gcup:{r:2,tag:'blood',n:'饕餮之杯',icon:'chalice',d:'满血时溢出的治疗存为血之积液；满最大生命 10% 时射出猩红颅骨。'},
  waxbones:{r:2,tag:'fire',n:'蜡封圣骨',icon:'wax',d:'立刻获得 3 件随机普通遗物的蜡制版；每进入新的一层，最左侧的蜡制遗物熔化。'},
  thirst:{r:2,tag:'fire',n:'渴血残烛',icon:'candle',d:'全部伤害 +80%；每次冲刺永久 -1%，降到 0 时熄灭碎裂。'},
  ouroboros:{r:2,tag:'bone',n:'衔尾蛇之匣',icon:'snake',d:'每 20 秒抵挡一次伤害；每进入新的一层吞噬一件相邻遗物，伤害永久 ×1.25。'},
  withered:{r:2,tag:'dark',n:'枯萎圣餐',icon:'chalice',d:'腐化你的一件遗物，使其变为扭曲的强力版本（可预览）。',consume:1},
  judgement:{r:2,tag:'volt',n:'审判之钟',icon:'bell',d:'每 30 秒在脚下降下 8 米钟环 10 秒：环内所有单位（包括你）受伤 +60%。'},
  boomerang:{r:2,tag:'motion',n:'回旋圣环',icon:'ring',d:'投射物到达射程末端后折返，返程可再次命中且必定暴击。'},
  // —— 稀有 ——
  doctrine:{r:1,tag:'frost',n:'霜之教义',icon:'frost',d:'被减速的亡者视为冻结，可被雷击碎；冻结时长 -50%。'},
  midnight:{r:1,tag:'time',n:'午夜丧钟',icon:'bell',d:'击杀溢出的伤害收入钟内；每 100 次击杀，钟响，把积蓄平分给周围亡者。'},
  feastbeat:{r:1,tag:'blood',n:'狂宴节拍',icon:'blood',d:'1 秒内击杀 12 名亡者：本层武器冷却 -3%（最多 15 层）。'},
  vigil:{r:1,tag:'time',n:'静默守夜',icon:'still',d:'站定 2 秒后，下一轮所有武器立刻齐射且伤害 ×3，并击退周围亡者。'},
  nightcloak:{r:1,tag:'motion',n:'夜行斗篷',icon:'cloak',d:'移动中武器冷却 -20%；静止超过 1 秒冷却 +20%。'},
  starfall:{r:1,tag:'motion',n:'坠星之踵',icon:'boot2',d:'落地产生冲击波，伤害随下落高度提升；悬空时武器伤害 +25%。'},
  ashstep:{r:1,tag:'fire',n:'灰烬步伐',icon:'feather',d:'冲刺穿过的亡者被施加你最高级武器的元素，并留下 2 秒同元素尾迹。'},
  bmagnet:{r:1,tag:'blood',n:'血契磁石',icon:'magnet',d:'拾取范围 +30%；范围内的亡者每秒受到伤害（随拾取范围提升）。'},
  refreeze:{r:1,tag:'frost',n:'碎冰重凝',icon:'frostheart',d:'碎冰后亡者立刻可再冻结，并让周围亡者叠一层冰霜。'},
};
// 腐化版本（只能由枯萎圣餐产生）
const CORRUPT={
  fang:{n:'腐牙',d:'只在冲刺中吸血：冲刺时每次命中回复 3 生命。'},
  ember:{n:'冷烬',d:'灼烧不再造成伤害；被灼烧的亡者受到伤害 +30%。'},
  holywater:{n:'污血瓶',d:'不再回血；每次击杀回复 0.6 生命。'},
  whetstone:{n:'断刃',d:'再也无法暴击；全部伤害 +35%。'},
  feather:{n:'断羽',d:'移速 -12%；冲刺冷却 -60%。'},
  candle:{n:'黑烛',d:'拾取范围 -40%；经验获取 +45%。'},
  boneshield:{n:'骨棘',d:'失去护甲；受伤时向四周射出 10 根骨刺。'},
  coinpurse:{n:'贪婪之口',d:'金币获取 ×2；宝箱价格 +40%。'},
  frostheart:{n:'冰狱之心',d:'冻结中的亡者被击杀时，冻结其周围 3 米的亡者。'},
};
Object.assign(RELICS,NEW_RELICS);
for(const[k,c]of Object.entries(CORRUPT))RELICS['c_'+k]={r:RELICS[k].r,tag:RELICS[k].tag,n:c.n,icon:RELICS[k].icon,d:c.d,cor:1};
const RELIC_ADDS=Object.keys(NEW_RELICS);

/* ---------- 圣骸匣操作 ---------- */
const rx=i=>i%BOX_W,ry=i=>(i/BOX_W)|0;
function boxFree(){return P.box.indexOf(null)}
function addRelic(id,opt={}){const R=RELICS[id];discover('r',id);
  if(id==='waxbones'){const pool=Object.keys(RELICS).filter(k=>RELICS[k].r===0&&!RELICS[k].cor);for(let i=0;i<3;i++)placeRelic({id:pick(pool),wax:1});toast('蜡封圣骨','三件蜡制遗物已放入圣骸匣，每层熔化一件','wax');recompute();return}
  if(id==='withered'){RUN.queue.unshift({t:'corrupt'});return}
  if(id==='thirst')P.thirst+=.8;
  placeRelic({id,wax:opt.wax||0});recompute()}
function placeRelic(inst){const i=boxFree();if(i>=0){P.box[i]=inst;return true}RUN.pendingRelic=RUN.pendingRelic||[];RUN.pendingRelic.push(inst);RUN.queue.unshift({t:'place'});return false}
function removeSlot(i){P.box[i]=null;recompute()}
function swapSlots(a,b){const t=P.box[a];P.box[a]=P.box[b];P.box[b]=t;recompute()}
function removeRelicId(id,n=1){for(let i=0;i<BOX_N&&n>0;i++)if(P.box[i]&&P.box[i].id===id){P.box[i]=null;n--}recompute()}
/* 计算有效层数：基础 + 骸骨圣匣复制 + 左手之罪翻倍；检测仪式 */
function recompute(){
  const rel={},box=P.box,links=[];
  for(const it of box)if(it)rel[it.id]=(rel[it.id]||0)+1;
  for(let i=0;i<BOX_N;i++){const it=box[i];if(!it)continue;
    if(it.id==='reliquary'&&rx(i)<BOX_W-1){const t=box[i+1];if(t&&t.id!=='reliquary'&&t.id!=='lefthand'){rel[t.id]++;links.push([i,i+1])}}
    if(it.id==='lefthand'&&rx(i)>0){const t=box[i-1];if(t&&t.id!=='reliquary'&&t.id!=='lefthand'){rel[t.id]++;links.push([i,i-1])}}}
  const rit=new Set(),ritCells=new Set(),tagAt=i=>box[i]&&RELICS[box[i].id].tag;
  const lines=[];for(let y=0;y<BOX_H;y++)for(let x=0;x<=BOX_W-3;x++)lines.push([0,1,2].map(k=>y*BOX_W+x+k));
  for(let x=0;x<BOX_W;x++)lines.push([0,1,2].map(k=>k*BOX_W+x));
  for(const ln of lines){const t=tagAt(ln[0]);if(t&&ln.every(i=>tagAt(i)===t)){rit.add(t);ln.forEach(i=>ritCells.add(i))}}
  P.rel=rel;P.rit=rit;P.ritCells=ritCells;P.links=links;stats();if(typeof renderRelics==='function')renderRelics()}
function relicStats(){const r=P.rel,b=P.rit;
  if(r.gluttony)S.cd*=Math.pow(.75,r.gluttony);
  if(r.veil)S.dmg*=1+.4*r.veil;
  if(r.thirst)S.dmg*=1+Math.max(0,P.thirst);
  S.dmg*=P.ouroMul||1;
  if(r.c_whetstone){S.crit=0;S.dmg*=1+.35*r.c_whetstone}
  if(r.c_feather){S.spd*=Math.pow(.88,r.c_feather);S.dashCd*=Math.pow(.4,r.c_feather)}
  if(r.c_candle){S.mag*=.6;S.xp+=.45*r.c_candle}
  if(r.c_boneshield)S.armor=Math.max(0,S.armor-1.5*(r.boneshield||0))*0;
  if(r.c_coinpurse)S.gold*=2*r.c_coinpurse;
  if(r.c_holywater)S.regen=Math.max(0,S.regen-.4*(r.holywater||0));
  if(r.bmagnet)S.mag*=1+.3*r.bmagnet;
  if(b.has('bone')){S.armor+=3;S.maxHp+=20}
  if(b.has('motion'))S.dashCd*=.7;
  if(P.hp>S.maxHp)P.hp=S.maxHp}
function cdDyn(){let m=1;const r=P.rel;
  if(r.nightcloak){if(P.moving)m*=Math.pow(.8,r.nightcloak);else if(P.stillT>1)m*=1.2}
  if(P.feastStacks)m*=1-.03*P.feastStacks;return m}
function ultGain(v){const r=P.rel;let m=(r.grail?2:1)*(r.drowned?2.5:1)*(P.rit.has('time')?1.5:1);P.ult=Math.min(r.overflow?200:100,P.ult+v*m)}
function chestPrice(base){const r=P.rel;let c=base;if(r.c_coinpurse)c*=1.4;if(P.rit.has('gold'))c*=.7;return Math.round(c)}

/* ---------- 命中 / 击杀 / 受伤钩子 ---------- */
const WSRC=new Set(Object.keys(WEAPONS));
function relicDmgMul(e,o){let m=1;const r=P.rel;
  if(r.starfall&&WSRC.has(o.src)&&P.y-hAt(P.x,P.z)>.6)m*=1.25;
  if(P.vigilT>0&&WSRC.has(o.src))m*=3;
  if(r.c_ember&&e.st.burn>0)m*=1.3;
  if(r.servant&&o.src==='fam')m*=1+.4*r.servant;
  if(P.judge&&P.judge.t>0&&(e.x-P.judge.x)**2+(e.z-P.judge.z)**2<64)m*=1.6;
  return m}
function relicOnHit(e,o,dmg){const r=P.rel;
  if(!o.dot)e.st.sin=(e.st.sin||0)+1;
  if(r.c_fang&&P.dashT>0)healP(3*r.c_fang);
  if(r.bloodDark&&o.el==='blood')e.st.curse=5;
  if(r.bloodDark&&o.el==='dark'){e.st.bleed=Math.min(10,e.st.bleed+1);e.st.bleedT=4}}
function relicOnKill(e,o,over){const r=P.rel;
  if(r.c_holywater)healP(.6*r.c_holywater);
  if(r.midnight){P.bellStore+=Math.max(0,over);P.bellN++;if(P.bellN>=Math.ceil(100/r.midnight)){P.bellN=0;const t=inRange(P.x,P.z,26).filter(x=>x!==e);
      if(t.length){const each=P.bellStore/t.length;t.forEach(x=>hit(x,each/S.dmg,{src:'relic',np:1}));showReact({x:P.x,y:P.y,z:P.z,s:1},'午夜钟鸣')}P.bellStore=0;AU.sfx('bolt')}}
  if(r.feastbeat){const now=RUN.t;P.killWin.push(now);while(P.killWin.length&&now-P.killWin[0]>1)P.killWin.shift();
    if(P.killWin.length>=12&&(P.feastStacks||0)<15){P.feastStacks=(P.feastStacks||0)+1;P.killWin.length=0;toast('狂宴 ×'+P.feastStacks,'本层武器冷却 -'+P.feastStacks*3+'%','blood')}}
  if(r.c_frostheart&&e.st.frozen>0)inRange(e.x,e.z,3).forEach(x=>{if(x!==e)addFrost(x,3)});
  if(P.rit.has('volt')&&e.st.shock>0)chain(e,3,20,'relic')}
function relicOnHurt(d){const r=P.rel;
  if(r.ouroboros&&P.ouroT<=0){P.ouroT=20;burst(P.x,P.y+1,P.z,0xe8dcc4,20,6);showReact({x:P.x,y:P.y,z:P.z,s:1},'蛇骨护盾');return 0}
  if(P.judge&&P.judge.t>0&&(P.x-P.judge.x)**2+(P.z-P.judge.z)**2<64)d*=1.6;
  if(r.stigmata){if(RUN.gold>0){const pay=Math.min(RUN.gold,Math.ceil(d));RUN.gold-=pay;d-=pay;if(d<=0){showDmg(P.x,P.y+2.4,P.z,pay,false,'gold');return 0}}else d*=2}
  if(r.c_boneshield)for(let i=0;i<10*r.c_boneshield;i++){const a=i/10*TAU;shoot('shard',a,16,{dmg:15,pierce:3,life:.7,el:'phys',src:'relic'})}
  return d}
function relicOverheal(v){if(!P.rel.gcup||v<=0)return;P.cupStore+=v;if(P.cupStore>=S.maxHp*.1){const tg=nearest(P.x,P.z,18);const a=tg?Math.atan2(tg.x-P.x,tg.z-P.z):P.face;
  shoot('skull',a,12,{dmg:30+P.cupStore*2.5,pierce:3,life:2.2,el:'blood',src:'relic',home:tg});P.cupStore=0;AU.sfx('react')}}
function relicDashPass(e){const r=P.rel;
  if(r.spurs){hit(e,40*r.spurs,{src:'relic',np:1,kb:6,fx:e.x-P.x,fz:e.z-P.z});e.st.burn=3}
  if(r.ashstep){const el=topElem();if(el)hit(e,6,{el,src:'relic',np:1})}
  if(r.ledger&&(e.st.sin||0)>=8){const v=(e.max-Math.max(0,e.hp))*(e.boss?.05:.2)*r.ledger;e.st.sin=0;hit(e,v/S.dmg/dynMul(),{src:'relic',np:1});showReact(e,'罪印引爆');burst(e.x,e.y+1,e.z,0xc77dff,16,6)}}
function topElem(){let best=null;for(const w of P.weapons)if(!best||w.lvl>best.lvl)best=w;return best?WEAPONS[best.id].el:null}
function relicLand(fall){if(!P.rel.starfall||fall<.6)return;const R=2.4+fall*.5,d=(10+fall*16)*P.rel.starfall;
  inRange(P.x,P.z,R).forEach(e=>hit(e,d,{src:'relic',np:1,kb:6,fx:e.x-P.x,fz:e.z-P.z}));burst(P.x,P.y+.2,P.z,0x9ab0ff,18,8);fxRing(P.x,P.z,R,0x9ab0ff);G.shake=Math.max(G.shake,.2)}
function relicGem(g){if(!P.rel.blasphemy)return false;const tg=nearest(P.x,P.z,16);if(tg){const a=Math.atan2(tg.x-P.x,tg.z-P.z);shoot('wisp',a,9,{dmg:(8+P.lvl*2)*Math.min(4,g.v),pierce:1,life:2.5,el:'dark',src:'relic',home:tg})}return true}

/* ---------- 每帧更新 ---------- */
let judgeMesh=null,trailT=0;
function relicUpdate(dt){const r=P.rel;
  // 站定
  const still=!P.moving&&P.dashT<=0;P.stillT=still?P.stillT+dt:0;if(!still)P.vigilUsed=false;
  if(r.vigil&&P.stillT>=2&&!P.vigilUsed){P.vigilUsed=true;P.vigilT=.4;for(const w of P.weapons)w.t=0;inRange(P.x,P.z,5).forEach(e=>hit(e,20,{src:'relic',np:1,kb:12,fx:e.x-P.x,fz:e.z-P.z}));fxRing(P.x,P.z,5,0x7dd8c8);showReact({x:P.x,y:P.y,z:P.z,s:1},'守夜齐射')}
  if(P.vigilT>0)P.vigilT-=dt;
  P.ouroT-=dt;
  // 溺亡者：充满即放
  if(r.drowned&&P.ult>=100)castUlt();
  // 回声
  for(const q of P.echoQ){q.t-=dt;if(q.t<=0){q.done=true;echoUlt(q)}}P.echoQ=P.echoQ.filter(q=>!q.done);
  // 血契磁石
  if(r.bmagnet){P.bmT-=dt;if(P.bmT<=0){P.bmT=.5;const d=1.6*r.bmagnet*S.mag/3.6;inRange(P.x,P.z,S.mag).forEach(e=>hit(e,d,{src:'relic',np:1,dot:'bleed'}))}}
  // 审判之钟
  if(r.judgement){P.judgeCd-=dt;if(P.judgeCd<=0){P.judgeCd=30;P.judge={x:P.x,z:P.z,t:10};AU.sfx('boss');showReact({x:P.x,y:P.y,z:P.z,s:1},'审判钟环')}}
  if(P.judge){P.judge.t-=dt;if(P.judge.t<=0)P.judge=null}
  if(!judgeMesh){judgeMesh=makeDrape(new THREE.MeshBasicMaterial({map:ringTex,color:0xc8a0ff,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}),24);judgeMesh.userData.r=0}
  judgeMesh.visible=!!P.judge;if(P.judge){judgeMesh.userData.r+=dt*.4;drape(judgeMesh,P.judge.x,P.judge.z,16,judgeMesh.userData.r,.2);judgeMesh.material.opacity=Math.min(1,P.judge.t)*.8}
  // 灰烬尾迹
  if(r.ashstep&&P.dashT>0){trailT-=dt;if(trailT<=0){trailT=.05;P.trail.push({x:P.x,z:P.z,t:2,el:topElem()})}}
  for(const tr of P.trail){tr.t-=dt;tr.tick=(tr.tick||0)-dt;if(tr.tick<=0){tr.tick=.3;if(Math.random()<.5)burst(tr.x,hAt(tr.x,tr.z)+.2,tr.z,ELEM[tr.el]?parseInt(ELEM[tr.el].c.slice(1),16):0xffa040,1,1);
    query(tr.x,tr.z,1.2,e=>{if((e.x-tr.x)**2+(e.z-tr.z)**2<1.6&&(e.hc.tr||0)<RUN.t){e.hc.tr=RUN.t+.3;hit(e,5,{el:tr.el,src:'relic',np:1})}})}}
  P.trail=P.trail.filter(t=>t.t>0);
}
function echoUlt(q){showReact({x:q.x,y:q.y,z:q.z,s:1},'残影回响');AU.sfx('ult');
  if(P.hunter==='warden'){inRange(q.x,q.z,12).forEach(e=>{hit(e,80,{el:'fire',src:'ult',kb:6,fx:e.x-q.x,fz:e.z-q.z});e.st.burn=4});fxRing(q.x,q.z,12,0xffe0a0)}
  else if(P.hunter==='heir'){P.feast=Math.max(P.feast,0)+3}
  else for(let i=0;i<18;i++){const a=i/18*TAU;proj.push({k:'raven',x:q.x,z:q.z,y:q.y+1,vx:Math.sin(a)*13,vz:Math.cos(a)*13,rot:a,hits:new Set(),pierce:99,life:1.6,dmg:22,el:'dark',src:'ult',curve:1.4})}}
function relicStageEnter(){if(!P)return;P.feastStacks=0;
  // 蜡制熔化：最左侧（索引最小）
  const wi=P.box.findIndex(it=>it&&it.wax);if(wi>=0){const n=RELICS[P.box[wi].id].n;P.box[wi]=null;toast('蜡制遗物熔化',n+' 化为蜡油','wax')}
  // 衔尾蛇吞噬相邻
  for(let i=0;i<BOX_N;i++){const it=P.box[i];if(!it||it.id!=='ouroboros')continue;
    const nb=[i-1,i+1,i-BOX_W,i+BOX_W].filter(j=>j>=0&&j<BOX_N&&(Math.abs(rx(j)-rx(i))+Math.abs(ry(j)-ry(i))===1)&&P.box[j]&&P.box[j].id!=='ouroboros');
    if(nb.length){const j=pick(nb),n=RELICS[P.box[j].id].n;P.box[j]=null;P.ouroMul=(P.ouroMul||1)*1.25;toast('衔尾蛇吞噬了 '+n,'伤害永久 ×1.25','snake')}}
  recompute()}
function relicDash(){if(P.rel.thirst&&P.thirst>0){P.thirst-=.01;if(P.thirst<=0){P.thirst=0;removeRelicId('thirst',99);toast('渴血残烛熄灭','它在你最后一次冲刺中碎裂','candle')}else stats()}}

/* ---------- 抽取规则 ---------- */
function relicAllowed(id){const R=RELICS[id];if(R.cor)return false;
  if(R.need&&!getW(R.need))return false;
  if(id==='withered'&&!corruptCandidates().length)return false;
  if((id==='reliquary'||id==='lefthand')&&Object.keys(P.rel).length<2)return false;
  return true}
function corruptCandidates(){const s=new Set();for(const it of P.box)if(it&&CORRUPT[it.id])s.add(it.id);return[...s]}
function corruptChoice(){const c=corruptCandidates().sort(()=>Math.random()-.5).slice(0,3);
  return{title:'枯萎圣餐',hint:'选择一件遗物进行腐化——它会变成扭曲的版本',sound:'evo',
    cards:c.map(id=>({rar:RELICS[id].r,icon:RELICS[id].icon,name:RELICS[id].n+' → '+CORRUPT[id].n,tag:'腐化',desc:`<s class="old">${RELICS[id].d}</s><br>${CORRUPT[id].d}`,
      apply:()=>{const i=P.box.findIndex(it=>it&&it.id===id);if(i>=0)P.box[i]={id:'c_'+id,wax:P.box[i].wax};discover('r','c_'+id);recompute();G.flash=.3}}))}}
/* 蜡制视觉、光束、冲击环 */
const beams=pool(16,()=>new THREE.Mesh(GEO.box,addM(0xfff0c0,.9)));
function fireBeam(a,dmg,len,w){const x0=P.x,z0=P.z,dx=Math.sin(a),dz=Math.cos(a);
  const b=beams.find(b=>b.life<=0)||beams[0];b.life=.14;b.m.visible=true;b.m.position.set(x0+dx*len/2,P.y+1,z0+dz*len/2);b.m.scale.set(w*.6,.18,len);b.m.rotation.set(0,a,0);
  query(x0+dx*len/2,z0+dz*len/2,len/2+1,e=>{const px=e.x-x0,pz=e.z-z0,t=px*dx+pz*dz;if(t<0||t>len)return;const perp=Math.abs(px*dz-pz*dx);if(perp<w+e.r*.6)hit(e,dmg,{el:'phys',src:'dagger',kb:3,fx:dx,fz:dz})})}
const fxRings=pool(6,()=>{const m=new THREE.Mesh(GEO.plane,new THREE.MeshBasicMaterial({map:softRingTex,color:0xffffff,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,depthTest:false}));m.rotation.x=-Math.PI/2;return m});
function fxRing(x,z,R,col){const f=fxRings.find(f=>f.life<=0)||fxRings[0];f.life=.4;f.R=R;f.m.visible=true;f.m.material.color.set(col);f.m.position.set(x,hAt(x,z)+.2,z)}
function relicFx(dt){for(const b of beams)if(b.life>0){b.life-=dt;b.m.material.opacity=b.life/.14;if(b.life<=0)b.m.visible=false}
  for(const f of fxRings)if(f.life>0){f.life-=dt;const s=f.R*2*(1.2-f.life/.4*.2);f.m.scale.set(s,s,1);f.m.material.opacity=f.life/.4;if(f.life<=0)f.m.visible=false}}

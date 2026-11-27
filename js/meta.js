/* ============ 万界乱斗 · 局外成长 ============
   次元晶：每局结算获得。可解锁角色、购买永久加成。每日挑战：固定种子、固定角色与地图，本地排行。 */
SAVE.meta=Object.assign({shards:150,up:{},unlocked:[],daily:{}},SAVE.meta||{});
const START_HUNTERS=['warden','heir','raven','fighter','wizard','merc','cloud','rubber','standuser','bald'];
for(const h of START_HUNTERS)if(!SAVE.meta.unlocked.includes(h))SAVE.meta.unlocked.push(h);
// 已有战绩的角色视为已解锁（老存档不吃亏）
for(const h in SAVE.rec)if(!SAVE.meta.unlocked.includes(h))SAVE.meta.unlocked.push(h);
persist();
const HKEYS=Object.keys(HUNTERS);
const hunterCost=id=>40+(HKEYS.indexOf(id)%4)*20;
const isLocked=id=>!SAVE.meta.unlocked.includes(id);
const UPG={
  hp:{n:'体魄',icon:'heart',max:5,d:l=>`最大生命 +${l*10}`,cost:l=>30+l*25},
  dmg:{n:'锋芒',icon:'whetstone',max:5,d:l=>`伤害 +${l*5}%`,cost:l=>40+l*30},
  spd:{n:'疾行',icon:'boots',max:5,d:l=>`移速 +${l*3}%`,cost:l=>30+l*20},
  xp:{n:'悟性',icon:'tome',max:5,d:l=>`经验 +${l*6}%`,cost:l=>30+l*25},
  gold:{n:'招财',icon:'coin',max:5,d:l=>`金币 +${l*10}%`,cost:l=>25+l*20},
  reroll:{n:'重抽',icon:'clover',max:3,d:l=>`每局重抽 +${l}`,cost:l=>50+l*40},
  banish:{n:'放逐',icon:'skull',max:3,d:l=>`每局放逐 +${l}`,cost:l=>50+l*40},
  slot:{n:'武器槽',icon:'dagger',max:1,d:l=>`武器上限 +${l}（共 ${6+l} 把）`,cost:()=>320},
};
const upL=k=>SAVE.meta.up[k]||0;
wrapHook('newRun',o=>(h,d)=>{o(h,d);const b=P.b;b.hp+=upL('hp')*10;b.dmg+=upL('dmg')*.05;b.spd+=upL('spd')*.03;b.xp+=upL('xp')*.06;b.gold+=upL('gold')*.1;
  P.rerolls+=upL('reroll');P.banish+=upL('banish');stats();P.hp=S.maxHp});
/* ---------- 每日挑战 ---------- */
const todayKey=()=>{const d=new Date();return`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
const daySeed=k=>{let h=2166136261;for(const ch of k)h=Math.imul(h^ch.charCodeAt(0),16777619);return h>>>0};
function mulberry(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const RAND0=Math.random;let dailyOn=false;
function dailyCfg(){const k=todayKey(),s=daySeed(k);return{k,s,hunter:HKEYS[s%HKEYS.length],map:String((s>>>8)%3),diff:1}}
function startDaily(){const c=dailyCfg();selHunter=c.hunter;selMap=c.map;selDiff=c.diff;Math.random=mulberry(c.s);dailyOn=true;dressHunter(selHunter);setHero(selHunter);startRun();RUN.daily=c.k;
  banner('每日挑战 · '+c.k,`${HUNTERS[c.hunter].n} · ${STAGES[+c.map].n} · 所有人同一份随机`)}
function endDaily(){if(dailyOn){Math.random=RAND0;dailyOn=false}}
wrapHook('toMenu',o=>()=>{endDaily();o();renderMenuMeta()});
wrapHook('startRun',o=>()=>{if(!dailyOn&&isLocked(selHunter)){toast('角色未解锁','在出战准备页点击角色，用次元晶解锁','portal');return}o()});
/* ---------- 结算：次元晶与每日记录 ---------- */
wrapHook('endRun',o=>win=>{o(win);const ri=RUN.ri||0,g=Math.floor(RUN.kills/40)+ri*15+(win?60:0)+Math.floor(RUN.t/60)*2+(RUN.daily?20:0);
  SAVE.meta.shards+=g;let extra=`<br>获得 <b style="color:#3af0ff">${g} 次元晶</b>（共 ${SAVE.meta.shards}）`;
  if(RUN.daily){const sc=RUN.kills+ri*500+(win?2000:0),D=SAVE.meta.daily[RUN.daily]=SAVE.meta.daily[RUN.daily]||{best:0,runs:[]};D.runs.push({sc,kills:RUN.kills,t:Math.floor(RUN.t),win});D.runs.sort((a,b)=>b.sc-a.sc);D.runs=D.runs.slice(0,5);
    const nb=sc>D.best;D.best=Math.max(D.best,sc);extra+=`<br>每日挑战得分 <b style="color:#ffd23a">${sc}</b>${nb?' · 新纪录！':''} · 今日最佳 ${D.best}`;
    const ks=Object.keys(SAVE.meta.daily).sort();while(ks.length>14)delete SAVE.meta.daily[ks.shift()]}
  $('#newach').innerHTML+=extra;persist();endDaily()});
/* ---------- 角色解锁（出战准备页） ---------- */
wrapHook('renderSelect',o=>()=>{o();$$('#hunters .hunter').forEach(b=>{const id=b.dataset.h;if(!isLocked(id))return;const c=hunterCost(id);b.classList.add('locked');
  b.insertAdjacentHTML('beforeend',`<em class="lockt">未解锁 · ${c} 次元晶<small>${SAVE.meta.shards>=c?'点击两次解锁':'次元晶不足'}</small></em>`);
  b.onclick=()=>{AU.sfx('ui');if(SAVE.meta.shards<c){toast('次元晶不足',`还差 ${c-SAVE.meta.shards}，多打几局吧`,'portal');return}
    if(!b.dataset.c){b.dataset.c=1;b.querySelector('.lockt small').textContent='再点一次确认解锁';return}
    SAVE.meta.shards-=c;SAVE.meta.unlocked.push(id);persist();selHunter=id;toast('角色解锁 · '+HUNTERS[id].n,`剩余 ${SAVE.meta.shards} 次元晶`,'crown');dressHunter(id);setHero(id);renderSelect()}});
  const h=$('#select .ph h2');if(h)h.innerHTML=`出战准备 <span class="shardtag">${svg('portal')} ${SAVE.meta.shards}</span>`});
/* ---------- 商店 ---------- */
SCREENS.push('shop');
document.body.insertAdjacentHTML('beforeend',`<div id="shop" class="screen page" hidden><div class="pagebox wide"><header class="ph"><button class="back2" id="shopback">← 返回</button><h2>次元商店</h2><span id="shards" class="shardtag"></span></header>
  <p class="muted">次元晶在每局结算时获得：击杀、抵达的世界、存活时间、通关与每日挑战都会给。永久加成对所有角色生效。</p><div id="shopgrid" class="shopgrid"></div></div></div>`);
function renderShop(){$('#shards').innerHTML=`${svg('portal')} ${SAVE.meta.shards} 次元晶`;
  $('#shopgrid').innerHTML=Object.entries(UPG).map(([k,U])=>{const l=upL(k),mx=l>=U.max,c=U.cost(l);
    return`<button class="upg ${mx?'max':''}" data-k="${k}" ${mx||SAVE.meta.shards<c?'disabled':''}><span class="ic">${svg(U.icon)}</span><b>${U.n}</b><small>${l?U.d(l):'尚未购买'}</small>
      <i>${Array.from({length:U.max},(_,i)=>`<em class="${i<l?'on':''}"></em>`).join('')}</i><span class="pr">${mx?'已满级':`下一级：${U.d(l+1)} · ${c} 晶`}</span></button>`}).join('');
  $$('#shopgrid .upg').forEach(b=>b.onclick=()=>{const k=b.dataset.k,U=UPG[k],l=upL(k),c=U.cost(l);if(l>=U.max||SAVE.meta.shards<c)return;SAVE.meta.shards-=c;SAVE.meta.up[k]=l+1;persist();AU.sfx('chest');renderShop()})}
/* ---------- 主菜单 ---------- */
$('.mnav .mrow').insertAdjacentHTML('beforebegin','<div class="mrow"><button class="btn ghost" id="todaily">每日挑战</button><button class="btn ghost" id="toshop">次元商店</button></div>');
click('#toshop',()=>{renderShop();show('shop')});click('#shopback',()=>toMenu());click('#todaily',()=>startDaily());
function renderMenuMeta(){const c=dailyCfg(),D=SAVE.meta.daily[c.k];const el=$('#todaily');if(el)el.innerHTML=`每日挑战<small>${HUNTERS[c.hunter].n} · ${STAGES[+c.map].n}${D?' · 最佳 '+D.best:''}</small>`;
  const sb=$('#toshop');if(sb)sb.innerHTML=`次元商店<small>${SAVE.meta.shards} 晶</small>`}
renderMenuMeta();
(function(){const st=document.createElement('style');st.textContent=`
.hunter.locked{position:relative}.hunter.locked .portrait,.hunter.locked .hinfo{filter:grayscale(.85) brightness(.6)}
.hunter .lockt{position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);padding:6px 12px;background:#10153a;color:#ffd23a;font:700 13px "Noto Sans SC",sans-serif;font-style:normal;white-space:nowrap;box-shadow:0 0 0 2px #04050c,0 0 0 4px #ffd23a;text-align:center;z-index:2}
.hunter .lockt small{display:block;color:#c8d0f4;font-size:11px;font-weight:500}
.shardtag{display:inline-flex;align-items:center;gap:4px;margin-left:10px;color:#3af0ff;font:700 15px "Noto Sans SC",sans-serif;text-shadow:none}.shardtag svg,.shardtag .pi{width:16px;height:16px}
.mnav .btn small{display:block;font-size:11px;font-weight:500;opacity:.8;letter-spacing:0}
.shopgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;margin-top:12px}
.upg{display:grid;grid-template-columns:40px 1fr;grid-template-rows:auto auto auto auto;column-gap:10px;text-align:left;padding:12px;background:#141a3c;color:#f4f6ff;border:0;box-shadow:0 0 0 2px #04050c,0 0 0 4px #3a4aa8;cursor:pointer;font-family:"Noto Sans SC",sans-serif}
.upg:hover:not([disabled]){box-shadow:0 0 0 2px #04050c,0 0 0 4px #3af0ff}.upg[disabled]{opacity:.55;cursor:default}.upg.max{opacity:1;box-shadow:0 0 0 2px #04050c,0 0 0 4px #ffd23a}
.upg .ic{grid-row:1/3;width:40px;height:40px;display:grid;place-items:center;color:#3af0ff;background:#10153a}.upg .ic svg,.upg .ic .pi{width:24px;height:24px}
.upg b{font-size:16px}.upg small{color:#9aa4d8;font-size:12px}.upg i{grid-column:1/3;display:flex;gap:3px;margin:8px 0 4px}.upg i em{flex:1;height:6px;background:#22306a}.upg i em.on{background:#3af0ff;box-shadow:0 0 6px #3af0ff}
.upg .pr{grid-column:1/3;font-size:12px;color:#ffd23a}`;document.head.appendChild(st)})();

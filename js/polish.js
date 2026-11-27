/* ============ 万界乱斗 · 画质档位 / 成就扩充 / 新手引导 ============ */
/* ---------- 画质：低 / 中 / 高 ---------- */
const IS_TOUCH=matchMedia('(pointer:coarse)').matches;
if(!SAVE.settings.gfx){SAVE.settings.gfx=IS_TOUCH?'mid':'high';persist()}
let GFXL=2,PART_MUL=1;
function applyGfx(){const g=SAVE.settings.gfx;GFXL=g==='low'?0:g==='mid'?1:2;PART_MUL=[.4,.7,1][GFXL];CR=GFXL===0?2:3;
  GFX_SKIP=GFXL===2?()=>false:GFXL===1?(d=>(d.k==='tuft'||d.k==='flower')&&((d.x*7.3+d.z*3.1)|0)%2===0):(d=>d.k==='tuft'||d.k==='flower');
  if(typeof skyDome!=='undefined')skyDome.clouds.children.forEach((c,i)=>c.visible=GFXL>0||i%3===0);
  if(GFXL===0){SAVE.settings.shadows=false;SAVE.settings.hidpi=false;applyQuality()}
  INF.ci=null}
applyGfx();
wrapHook('spark',o=>(x,y,z,col,n=4,sp,life,up)=>{if(PART_MUL<1){n=n*PART_MUL;n=Math.floor(n)+(Math.random()<n%1?1:0);if(!n)return}o(x,y,z,col,n,sp,life,up)});
/* ---------- 设置页：画质与新手提示 ---------- */
wrapHook('renderSettings',o=>el=>{o(el);const s=SAVE.settings;
  el.insertAdjacentHTML('afterbegin',`<div class="row2 tog"><span>画质</span><div class="segs mini">${[['low','低'],['mid','中'],['high','高']].map(([v,n])=>`<button class="seg ${s.gfx===v?'on':''}" data-gfx="${v}">${n}</button>`).join('')}</div></div>
    <p class="muted gfxhint">低：缩短渲染距离、去掉草丛与花、减少粒子、关闭阴影。手机或卡顿时建议用低或中。</p>
    <div class="row2 tog"><span>新手提示</span><div class="segs mini"><button class="seg ${s.tips!==false?'on':''}" data-tips="1">开</button><button class="seg ${s.tips===false?'on':''}" data-tips="0">关</button><button class="seg" data-tips="reset">重新显示全部</button></div></div>`);
  el.querySelectorAll('[data-gfx]').forEach(b=>b.onclick=()=>{AU.sfx('ui');s.gfx=b.dataset.gfx;applyGfx();persist();renderSettings(el)});
  el.querySelectorAll('[data-tips]').forEach(b=>b.onclick=()=>{AU.sfx('ui');const v=b.dataset.tips;if(v==='reset'){SAVE.tips=[];s.tips=true;toast('新手提示','下一局会重新显示全部提示','tome')}else s.tips=v==='1';persist();renderSettings(el)})});
/* ---------- 成就：新增 12 个，每个成就奖励次元晶 ---------- */
Object.assign(ACH,{
  bond3:{n:'志同道合',d:'单局触发任意一个三阶羁绊',w:30},allrealm:{n:'万界归一',d:'单局集齐 4 个不同的界',w:50},fusion:{n:'跨界联动',d:'合成一把联动武器',w:40},
  inv3:{n:'入侵克星',d:'单局平息 3 次次元入侵',w:40},perfect10:{n:'毫厘之间',d:'单局完美闪避 10 次',w:40},combo300:{n:'连斩风暴',d:'连斩达到 300',w:40},
  far500:{n:'远行者',d:'离出生点 500 米以外',w:30},world4:{n:'扬帆起航',d:'抵达海贼港湾',w:60},nohit:{n:'无伤擂主',d:'首领登场后一滴血都没掉就击败它',w:80},
  daily:{n:'每日一战',d:'完成一次每日挑战',w:20},slam100:{n:'大地震颤',d:'单局用下砸击杀 100 名敌人',w:40},collector:{n:'收藏家',d:'解锁 15 名角色',w:50},
});
const ACH_W=id=>ACH[id].w||25;
for(const id in ACH){const A=ACH[id];if(!A.d.includes('奖励'))A.d+=` · 奖励 ${ACH_W(id)} 晶`}
wrapHook('unlockAch',o=>id=>{const had=SAVE.ach.includes(id);o(id);if(!had&&SAVE.ach.includes(id)&&SAVE.meta){SAVE.meta.shards+=ACH_W(id);persist();toast(`+${ACH_W(id)} 次元晶`,'成就奖励','portal')}});
let achT=0;
wrapHook('relicUpdate',o=>dt=>{o(dt);achT-=dt;if(achT>0)return;achT=1;const c=P.bondC||{};
  if(Object.values(c).some(n=>n>=3))unlockAch('bond3');if(Object.keys(c).length>=4)unlockAch('allrealm');if(P.weapons.some(w=>w.fuse))unlockAch('fusion');
  if((RUN.perfect||0)>=10)unlockAch('perfect10');if((RUN.bestCombo||0)>=300)unlockAch('combo300');if(Math.hypot(P.x,P.z)>=500)unlockAch('far500');
  if((RUN.slamKills||0)>=100)unlockAch('slam100');
  if(RUN.bossDead&&!RUN.nohitChecked){RUN.nohitChecked=true;if(RUN.bossSummoned&&!RUN.bossHurt)unlockAch('nohit')}});
wrapHook('endInvasion',o=>win=>{o(win);if(win){RUN.invWon=(RUN.invWon||0)+1;if(RUN.invWon>=3)unlockAch('inv3')}});
wrapHook('relicOnKill',o=>(e,op,ov)=>{o(e,op,ov);if(op&&op.src==='slam')RUN.slamKills=(RUN.slamKills||0)+1});
wrapHook('hurtPlayer',o=>d=>{const h=P.hp;o(d);if(P.hp<h&&RUN.bossSummoned&&!RUN.bossDead)RUN.bossHurt=true});
wrapHook('loadStage',o=>i=>{o(i);RUN.bossHurt=false;RUN.nohitChecked=false;if(STAGES[i].id==='harbor')unlockAch('world4')});
wrapHook('endRun',o=>win=>{const d=RUN.daily;o(win);if(d)unlockAch('daily')});
wrapHook('renderSelect',o=>()=>{o();if(SAVE.meta&&SAVE.meta.unlocked.length>=15&&RUN)unlockAch('collector')});
/* ---------- 新手引导：情境提示，每条只出现一次 ---------- */
SAVE.tips=SAVE.tips||[];
const TIPQ=[];let tipOn=null;
const TIPS={
  start:['怎么玩',IS_TOUCH?'左侧拖动移动；右下角按钮：跳、冲刺、大招、交互。武器会自动攻击，你只管走位、捡经验宝石。':'WASD 移动，鼠标转视角（点击画面锁定）。武器会自动攻击，你只管走位、捡经验宝石。空格跳跃，Shift 冲刺（无敌），Q 大招。'],
  level:['升级选卡','每次升级三选一：新武器、武器强化或典籍。卡片上标着武器属于哪个「界」——同界武器凑齐 2 把、3 把会触发羁绊。最多带 6 把武器。'],
  chest:['遗物与圣骸匣','遗物会放进 5×3 的圣骸匣。同一行或同一列连续三件同印记遗物会组成「仪式」。按 Esc 暂停后可以调整位置。'],
  air:['空中下砸','人在空中时再按冲刺，会向下砸地，落地打出一圈冲击波。'],
  inv:['次元入侵','别的世界的规则闯进来了！看屏幕上方的倒计时，撑过去就能拿到战利品。'],
  boss:['首领战','红圈是首领的攻击预警，快走开或者冲刺穿过去。冲刺时擦过攻击会触发「完美闪避」，时间变慢并充能大招。首领半血后会狂暴。'],
  fuse:['跨界联动','你有两把不同界的武器到了 5 级！下次开宝箱时，可以把它们合成一把联动武器。'],
  map:['地图指示','头顶的图标是附近的据点；屏幕边缘的箭头指向屏幕外最近的宝箱、神龛和首领擂台。按 Tab 打开全地图。'],
  over:['次元晶','每局结算都会得到次元晶。回到主菜单，在「次元商店」买永久加成，或在出战准备页解锁新角色。'],
};
function showTip(id){if(SAVE.settings.tips===false||SAVE.tips.includes(id)||TIPQ.includes(id)||tipOn===id)return;TIPQ.push(id);if(!tipOn)nextTip()}
function nextTip(){const id=TIPQ.shift();if(!id){tipOn=null;$('#tipbox').classList.remove('on');return}tipOn=id;SAVE.tips.push(id);persist();const[t,d]=TIPS[id],b=$('#tipbox');
  b.querySelector('b').textContent=t;b.querySelector('p').textContent=d;b.classList.add('on');clearTimeout(b._t);b._t=setTimeout(()=>{if(tipOn===id)nextTip()},11000)}
document.body.insertAdjacentHTML('beforeend','<div id="tipbox"><span class="tg">提示</span><b></b><p></p><button>知道了</button></div>');
$('#tipbox button').onclick=()=>{AU.sfx('ui');nextTip()};
wrapHook('startRun',o=>()=>{o();if(G.state==='play'){showTip('start');setTimeout(()=>showTip('map'),25000)}});
wrapHook('openChoice',o=>cfg=>{o(cfg);if(cfg.level)showTip('level');else if(cfg.reveal&&/宝箱|战利品|献血/.test(cfg.title))showTip('chest')});
wrapHook('startInvasion',o=>f=>{o(f);showTip('inv')});
wrapHook('summonBoss',o=>f=>{const was=RUN.bossSummoned;o(f);if(!was)showTip('boss')});
wrapHook('endRun',o=>w=>{o(w);showTip('over')});
wrapHook('relicUpdate',o=>dt=>{o(dt);if(P.y-hAt(P.x,P.z)>1.2)showTip('air');if(P.weapons.filter(w=>w.lvl>=5).length>=2)showTip('fuse')});
(function(){const st=document.createElement('style');st.textContent=`
#tipbox{position:fixed;left:50%;bottom:118px;transform:translate(-50%,20px);width:min(460px,88vw);padding:12px 14px 12px;background:#141a3c;color:#f4f6ff;box-shadow:0 0 0 2px #04050c,0 0 0 4px #3af0ff,6px 6px 0 4px #ff2e6e;
  opacity:0;pointer-events:none;transition:opacity .25s,transform .25s;z-index:30;font-family:"Noto Sans SC",sans-serif}
#tipbox.on{opacity:1;transform:translate(-50%,0);pointer-events:auto}
#tipbox .tg{display:inline-block;padding:1px 8px;margin-right:8px;background:#3af0ff;color:#10153a;font-weight:900;font-size:12px}
#tipbox b{font-size:16px}#tipbox p{margin:6px 0 8px;font-size:13px;line-height:1.6;color:#c8d0f4}
#tipbox button{float:right;padding:5px 14px;background:#ff2e6e;color:#fff;border:0;font:700 13px "Noto Sans SC",sans-serif;cursor:pointer;box-shadow:0 0 0 2px #04050c}
.gfxhint{margin:-4px 0 10px;font-size:12px}`;document.head.appendChild(st)})();

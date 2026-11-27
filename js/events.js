/* ============ 万界乱斗 · 战斗玩法扩展 ============
   次元入侵事件 / 完美闪避 / 空中下砸 / 首领新招式与狂暴 / 连斩里程碑冲击波 */
/* ---------- 次元入侵：每隔一段时间，别的世界的规则闯进当前地图 ---------- */
const INVASIONS={
  moon:{n:'月面重力',c:'#9ad8ff',d:'重力减弱，跳得更高更久；空中下砸范围翻倍'},
  rift:{n:'时间裂缝',c:'#c8a0ff',d:'每 6 秒时间停止 1.5 秒，但敌人移速 +25%'},
  arena:{n:'擂台乱入',c:'#ffd040',d:'四名强敌闯入！全部击败可提前结束并领奖'},
  neon:{n:'霓虹暴走',c:'#ff3a8a',d:'敌人刷新速度 ×1.8，经验 ×2'},
  storm:{n:'魔法潮汐',c:'#7ae8ff',d:'天雷不断落在你身边的敌人头上'},
  bmoon:{n:'血月',c:'#ff3050',d:'新出现的敌人生命 +50%，金币 ×2'},
};
const INV_T=45;
function invOn(id){return RUN&&RUN.inv&&RUN.inv.id===id}
function startInvasion(){const ids=Object.keys(INVASIONS).filter(k=>k!==RUN.lastInv),id=pick(ids),I=INVASIONS[id];RUN.lastInv=id;
  RUN.inv={id,t:INV_T,tick:0,elites:[]};banner('次元入侵 · '+I.n,I.d);AU.sfx('boss');G.flash=.35;document.body.dataset.inv=id;$('#invtint').style.setProperty('--c',I.c);
  if(id==='rift')for(const e of enemies)e.spd*=1.25;
  if(id==='arena'){const R=spawnRadius()-4;for(let i=0;i<4;i++){const a=i/4*TAU+rand(0,.5);RUN.inv.elites.push(spawnEnemy(pickType(),P.x+Math.sin(a)*R,P.z+Math.cos(a)*R,{elite:true,tag:'inv'}))}}
  stats()}
function endInvasion(win){const I=INVASIONS[RUN.inv.id];if(RUN.inv.id==='rift')for(const e of enemies)e.spd/=1.25;RUN.inv=null;delete document.body.dataset.inv;stats();
  if(win){banner('入侵平息',I.n+' · 获得战利品');RUN.queue.push({t:'chest',free:1});nextQueued()}else{const g=Math.round(40*(1+(RUN.ri||0)));RUN.gold+=g;RUN.goldTotal+=g;banner('入侵结束',`强敌撤退了 · 获得 ${g} 金币`)}}
wrapHook('relicUpdate',o=>dt=>{o(dt);if(!RUN)return;
  P.pdCd=(P.pdCd||0)-dt;
  // 调度
  if(RUN.nextInv==null)RUN.nextInv=95;
  if(!RUN.inv&&RUN.stageT>=RUN.nextInv&&!(boss&&!boss.dead)){RUN.nextInv=RUN.stageT+INV_T+rand(80,110);startInvasion()}
  const v=RUN.inv;if(!v)return;v.t-=dt;v.tick-=dt;
  if(v.id==='moon'&&P.vy<0)P.vy+=26*dt*.62;
  if(v.id==='rift'&&v.tick<=0){v.tick=6;G.timeStop=Math.max(G.timeStop,1.5);G.flash=.15}
  if(v.id==='storm'&&v.tick<=0){v.tick=.9;const t=nearest(P.x,P.z,14);if(t)strike(t.x,t.z,40*S.dmg,2.2,false)}
  if(v.id==='arena'&&v.elites.length&&v.elites.every(e=>e.dead)){endInvasion(true);return}
  if(v.t<=0)endInvasion(v.id!=='arena')});
wrapHook('director',o=>dt=>o(invOn('neon')?dt*1.8:dt));
wrapHook('spawnEnemy',o=>(t,x,z,op={})=>{const e=o(t,x,z,op);if(!op.boss){if(invOn('bmoon')){e.hp*=1.5;e.max*=1.5}if(invOn('rift'))e.spd*=1.25}return e});
wrapHook('relicStats',o=>()=>{o();if(invOn('neon'))S.xp*=2;if(invOn('bmoon'))S.gold*=2});
wrapHook('loadStage',o=>i=>{if(RUN.inv){RUN.inv=null;delete document.body.dataset.inv}RUN.nextInv=95;o(i)});
wrapHook('hudExtra',o=>dt=>{o(dt);const el=$('#invbar');if(!RUN||!RUN.inv||G.state==='menu'){el.style.display='none';return}const I=INVASIONS[RUN.inv.id];
  el.style.display='block';el.style.setProperty('--c',I.c);const txt=`次元入侵 · ${I.n} · ${Math.ceil(RUN.inv.t)}秒`;if(el.firstChild.textContent!==txt)el.firstChild.textContent=txt;el.lastChild.textContent=I.d;
  el.querySelector('i').style.width=(RUN.inv.t/INV_T*100)+'%'});
/* ---------- 完美闪避：冲刺无敌帧里擦过攻击 ---------- */
wrapHook('hurtPlayer',o=>d=>{if(G.state==='play'&&P.dashT>0&&P.pdCd<=0){P.pdCd=1.5;G.slow=Math.max(G.slow||0,1.2);ultGain(12);P.inv=Math.max(P.inv,.7);
    showReact({x:P.x,y:P.y,z:P.z,s:1},'完美闪避');fxRing(P.x,P.z,3,0xffffff);RUN.perfect=(RUN.perfect||0)+1}return o(d)});
/* ---------- 空中下砸：跳起后按冲刺 ---------- */
wrapHook('doDash',o=>()=>{if(G.state==='play'&&P&&!P.slam&&P.y-hAt(P.x,P.z)>1){P.slam=true;P.vy=-34;P.inv=Math.max(P.inv,.4);AU.sfx('dash');return}o()});
wrapHook('relicLand',o=>fall=>{o(fall);if(!P.slam)return;P.slam=false;const R=(4+Math.min(fall,8)*.35)*(invOn('moon')?2:1)*Math.sqrt(S.area),dm=(30+P.lvl*2.5)*S.dmg;
  fxRing(P.x,P.z,R,0xffd23a);fxRing(P.x,P.z,R*.6,0xffffff);burst(P.x,P.y+.3,P.z,0xffe0a0,26,9);G.shake=Math.max(G.shake,.45);AU.sfx('react');
  inRange(P.x,P.z,R).forEach(e=>hit(e,dm,{src:'slam',el:'phys',kb:10,fx:e.x-P.x,fz:e.z-P.z}))});
/* ---------- 首领：新招式（直线冲击 / 环形震荡 / 十字裂地）与半血狂暴 ---------- */
wrapHook('bossAI',o=>(e,dt)=>{if(!e.rage&&e.hp<e.max*.5){e.rage=true;banner(e.name+' · 狂暴','攻击更快、招式更多');G.shake=.6;burst(e.x,e.y+2,e.z,0xff3050,40,9);e.a4=1.5}
  const r=o(e,e.rage?dt*1.3:dt);e.a4=(e.a4==null?5:e.a4)-dt;
  if(e.a4<=0&&!r){e.a4=e.rage?4.5:7;const pat=(e.pat=(e.pat||0)+1)%3,dmg=22*DIFFS[RUN.diff].dmg*(1+(RUN.ri||0)*.35);
    if(pat===0){const a=Math.atan2(P.x-e.x,P.z-e.z);for(let i=1;i<=9;i++)tele(e.x+Math.sin(a)*i*2.3,e.z+Math.cos(a)*i*2.3,1.7,.9+i*.06,dmg)}
    else if(pat===1){for(const R of e.rage?[7,12]:[8])for(let i=0;i<16;i++){const a=i/16*TAU;tele(e.x+Math.sin(a)*R,e.z+Math.cos(a)*R,1.8,1.2,dmg)}}
    else{const a0=rand(0,TAU);for(let k=0;k<(e.rage?6:4);k++){const a=a0+k/(e.rage?6:4)*TAU;for(let i=1;i<=6;i++)tele(e.x+Math.sin(a)*i*2.2,e.z+Math.cos(a)*i*2.2,1.5,1+i*.08,dmg)}}}
  return r});
/* ---------- 连斩里程碑 ---------- */
const COMBO_MS=[50,100,200,300,500,800,1000,1500,2000];
wrapHook('relicOnKill',o=>(e,op,ov)=>{o(e,op,ov);const c=RUN.combo;if(!COMBO_MS.includes(c))return;
  const R=8+c/100;banner(c+' 连斩！','冲击波横扫全场');G.flash=.25;G.shake=Math.max(G.shake,.5);fxRing(P.x,P.z,R,0xffd23a);fxRing(P.x,P.z,R*.7,0xff2e6e);ultGain(10);AU.sfx('legend');
  later(.05,()=>inRange(P.x,P.z,R).forEach(t=>hit(t,(30+c*.2)*S.dmg,{src:'combo',el:'phys',kb:8,fx:t.x-P.x,fz:t.z-P.z,np:1})))});
/* ---------- HUD 元素 ---------- */
(function(){const bar=document.createElement('div');bar.id='invbar';bar.innerHTML='<b></b><span></span><p><i></i></p><small></small>';$('#center').appendChild(bar);
  bar.innerHTML='<b></b><p><i></i></p><small></small>';
  const tint=document.createElement('div');tint.id='invtint';document.body.insertBefore(tint,$('#hud'));
  const kh=$('#keyhints');if(kh)kh.insertAdjacentHTML('beforeend','<span><kbd>空中 Shift</kbd>下砸</span>');
  const st=document.createElement('style');st.textContent=`
#invbar{display:none;margin:8px auto 0;width:min(420px,80vw);text-align:center;--c:#fff}
#invbar b{display:block;font:400 20px "ZCOOL QingKe HuangYou","Noto Sans SC",sans-serif;color:var(--c);text-shadow:2px 2px 0 #10153a,0 0 12px var(--c);letter-spacing:.06em}
#invbar p{height:6px;background:#10153a;box-shadow:0 0 0 2px #04050c;margin:4px 0}#invbar p i{display:block;height:100%;background:var(--c);box-shadow:0 0 8px var(--c)}
#invbar small{font-size:12px;color:#e8ecff;text-shadow:1px 1px 0 #000}
#invtint{position:fixed;inset:0;pointer-events:none;opacity:0;transition:opacity .8s;background:radial-gradient(ellipse at center,transparent 55%,color-mix(in srgb,var(--c,#fff) 45%,transparent) 100%)}
body[data-inv] #invtint{opacity:1;animation:invp 2s ease-in-out infinite alternate}@keyframes invp{from{opacity:.55}to{opacity:1}}`;document.head.appendChild(st)})();

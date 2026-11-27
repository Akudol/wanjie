/* ============ 万界乱斗 · 界面与主循环 ============ */
const SCREENS=['menu','select','codex','records','settings','guide','choice','pause','clear','over','bigmap'];
let settingsBack='menu';
function show(id){if(id&&id!=='bigmap')releaseMouse();for(const s of SCREENS){const el=$('#'+s);if(el)el.hidden=s!==id}}
function showHud(on){$('#hud').hidden=!on;$('#php').hidden=!on;if(!on){$('#lowhp').style.opacity=0}if(!on)$('#prompt').hidden=true}
function click(sel,fn){$$(sel).forEach(b=>b.addEventListener('click',e=>{AU.init();AU.sfx('ui');fn(e)}))}

/* ---------- 飘字 / 横幅 / 提示 ---------- */
const dns=[];for(let i=0;i<70;i++){const el=document.createElement('div');el.className='dn';$('#dmg').appendChild(el);dns.push({el,life:0,x:0,y:0,z:0,max:.7})}
let dni=0;const _v=new THREE.Vector3();
function showDmg(x,y,z,v,crit,cls){if(!SAVE.settings.nums&&cls!=='heal')return;const o=dns[dni=(dni+1)%dns.length];o.x=x+rand(-.3,.3);o.y=y;o.z=z;o.life=o.max=cls==='burn'||cls==='bleed'?.5:.7;
  o.el.textContent=cls==='heal'?'+'+Math.round(v):Math.max(1,Math.round(v));o.el.className='dn'+(crit?' crit':'')+(cls?' '+cls:'')}
function showReact(e,txt){const o=dns[dni=(dni+1)%dns.length];o.x=e.x;o.y=e.y+2.6*e.s;o.z=e.z;o.life=o.max=1;o.el.textContent=txt+'!';o.el.className='dn react r-'+({'碎冰':'frost','融蚀':'fire','沸血':'blood','黑雷':'dark','蒸腾':'fire'}[txt]||'');AU.sfx('react')}
function updDmg(dt){const w=innerWidth,h=innerHeight;for(const o of dns){if(o.life<=0)continue;o.life-=dt;o.y+=dt*1.6;
  _v.set(o.x,o.y,o.z).project(camera);o.el.style.transform=`translate(${(_v.x*.5+.5)*w-12}px,${(-_v.y*.5+.5)*h}px)`;o.el.style.opacity=o.life<=0?0:Math.min(1,o.life/o.max*3)}}
let bannerT=0;function banner(t,s){const b=$('#banner');b.textContent=t;if(s){const sm=document.createElement('small');sm.textContent=s;b.appendChild(sm)}b.style.opacity=1;bannerT=2.8}
function toast(t,d,icon){const el=document.createElement('div');el.className='toast';el.innerHTML=`${icon?svg(icon):''}<div><b>${esc(t)}</b>${d?`<span>${esc(d)}</span>`:''}</div>`;$('#toasts').appendChild(el);setTimeout(()=>el.classList.add('out'),2600);setTimeout(()=>el.remove(),3200)}
function hurtFlash(){const h=$('#hurt');h.style.transition='none';h.style.opacity=1;requestAnimationFrame(()=>{h.style.transition='opacity .45s';h.style.opacity=0})}
function unlockAch(id){if(!RUN||RUN.ach.includes(id))return;RUN.ach.push(id);if(!SAVE.ach.includes(id)){SAVE.ach.push(id);persist();toast('成就解锁 · '+ACH[id].n,ACH[id].d,'crown')}}

/* ---------- 主菜单 ---------- */
let selHunter='warden',selDiff=1,selMap='all';
function renderSelect(){
  $('#hunters').innerHTML=Object.entries(HUNTERS).map(([id,H])=>{const W=WEAPONS[H.w],rec=SAVE.rec[id];
    return`<button class="hunter ${id===selHunter?'on':''}" data-h="${id}">
      <div class="portrait" style="--acc:#${H.acc.toString(16).padStart(6,'0')}">${(typeof heroPortrait==='function'&&heroPortrait(id))||svg(H.icon)}</div>
      <div class="hinfo"><b>${H.n}</b><small>${H.t}</small>
      <dl><dt>初始武器</dt><dd><span class="el" style="color:${ELEM[W.el].c}">${svg(W.icon)}</span>${W.n}</dd>
      <dt>天赋 · ${H.pn||''}</dt><dd>${H.p}</dd><dt>大招 · ${H.ult.n}</dt><dd>${H.ult.d}</dd></dl>
      <p class="rec">${rec?`最远抵达 ${STAGES[rec.stage].n} · 击杀 ${rec.kills}`:'尚未出战'}</p></div></button>`}).join('');
  $('#maps').innerHTML=[['all','三界连闯','依次穿越三个世界，最终决战','linear-gradient(90deg,#2a1a6a,#7aa8e8,#3a8a30)'],...STAGES.map((s,i)=>[String(i),s.n,['夜色霓虹中的丧尸都市','白昼里的魔法城堡庭院','阳光下的草地与擂台'][i]||s.sub,'#'+(s.sky||s.fog).toString(16).padStart(6,'0')])].map(([v,n,d,bg])=>`<button class="seg map ${selMap===v?'on':''}" data-m="${v}"><i style="background:${bg}"></i><b>${n}</b><small>${d}</small></button>`).join('');
  document.querySelectorAll('#maps .seg').forEach(b=>b.onclick=()=>{selMap=b.dataset.m;AU.sfx('ui');renderSelect()});
  $('#diffs').innerHTML=DIFFS.map((d,i)=>`<button class="seg ${i===selDiff?'on':''}" data-d="${i}"><b>${d.n}</b><small>${d.d}</small></button>`).join('');
  $$('#hunters .hunter').forEach(b=>b.onclick=()=>{selHunter=b.dataset.h;AU.sfx('ui');dressHunter(selHunter);setHero(selHunter);renderSelect()});
  $$('#diffs .seg').forEach(b=>b.onclick=()=>{selDiff=+b.dataset.d;AU.sfx('ui');renderSelect()});
}
let codexTab='w';
function renderCodex(){
  const C=SAVE.codex,tabs={w:'武器',r:'遗物',f:'眷属',e:'敌人'};
  $('#codextabs').innerHTML=Object.entries(tabs).map(([k,n])=>`<button class="tab ${k===codexTab?'on':''}" data-t="${k}">${n}</button>`).join('');
  $$('#codextabs .tab').forEach(b=>b.onclick=()=>{codexTab=b.dataset.t;AU.sfx('ui');renderCodex()});
  let items=[];
  if(codexTab==='w')items=Object.entries(WEAPONS).map(([id,W])=>({ok:C.w.includes(id),icon:W.icon,n:W.n,tag:ELEM[W.el].n,c:ELEM[W.el].c,d:W.d+`<br><em>进化：${W.n} 满 5 级 + ${RELICS[W.evo.relic].n} → ${W.evo.n}</em><br>${W.evo.d}`}));
  else if(codexTab==='r')items=Object.entries(RELICS).map(([id,R])=>({ok:C.r.includes(id),icon:R.icon,n:R.n,tag:RAR[R.r].n,c:RAR[R.r].c,d:R.d}));
  else if(codexTab==='f')items=Object.entries(FAMS).flatMap(([id,F])=>F.n.map((n,s)=>({ok:C.f.includes(id+s),icon:F.icon,n,tag:['幼体','成体','终极'][s],c:ELEM[F.el].c,d:s===0?F.d:s===1?`击杀 ${FAM_EVO[0]} 后进化。伤害大幅提升。`:`击杀 ${FAM_EVO[1]} 后进化。最终形态。`})));
  else items=[...Object.entries(ENEMIES).map(([id,E])=>({ok:C.e.includes(id),icon:'skull',n:E.n,tag:'敌人',c:'#bdb4a8',d:`生命 ${E.hp} · 速度 ${E.spd} · 伤害 ${E.dmg}`})),
    ...Object.entries(BOSSES).map(([id,B])=>({ok:C.e.includes(id),icon:'crown',n:B.n,tag:'首领',c:'#ff4a62',d:`生命 ${B.hp}。${{colossus:'冲锋践踏，召唤食尸鬼。',bishop:'螺旋弹幕，瞬移，召唤怨灵。',lord:'血环弹幕，血柱预警，召唤狱火骑士。'}[id]}`}))];
  const got=items.filter(i=>i.ok).length;
  $('#codexcount').textContent=`已发现 ${got} / ${items.length}`;
  $('#codexgrid').innerHTML=items.map(i=>`<div class="entry ${i.ok?'':'locked'}" style="--c:${i.c}"><div class="ic">${svg(i.icon)}</div><div><b>${i.ok?i.n:'？？？'}</b><small>${i.tag}</small><p>${i.ok?i.d:'尚未遭遇。'}</p></div></div>`).join('');
}
function renderRecords(){const t=SAVE.tot;
  $('#totals').innerHTML=[['出战次数',t.runs],['累计击杀',t.kills],['通关次数',t.clears],['累计金币',t.gold],['战斗时长',fmt(t.time)]].map(([n,v])=>`<div><b>${v}</b>${n}</div>`).join('');
  $('#hrec').innerHTML=Object.entries(HUNTERS).map(([id,H])=>{const r=SAVE.rec[id];return`<tr><td>${H.n}</td><td>${r?STAGES[r.stage].n:'—'}</td><td class="n">${r?r.kills:'—'}</td><td class="n">${r?fmt(r.time):'—'}</td><td class="n">${r?r.lvl:'—'}</td></tr>`}).join('');
  $('#achs').innerHTML=Object.entries(ACH).map(([id,A])=>`<div class="ach ${SAVE.ach.includes(id)?'on':''}">${svg(SAVE.ach.includes(id)?'crown':'skull')}<div><b>${A.n}</b><small>${A.d}</small></div></div>`).join('');
}
function renderSettings(el){const s=SAVE.settings;
  el.innerHTML=`<div class="row2 tog"><span>视角</span><div class="segs mini"><button class="seg ${s.cam==='tp'?'on':''}" data-cam="tp">第三人称</button><button class="seg ${s.cam!=='tp'?'on':''}" data-cam="top">俯视</button></div></div>
  <div class="row2 tog"><span>像素颗粒</span><div class="segs mini">${[[1,'关'],[2,'细'],[3,'中'],[4,'粗']].map(([v,n])=>`<button class="seg ${(s.pix||1)===v?'on':''}" data-pix="${v}">${n}</button>`).join('')}</div></div>
  ${[['vol','主音量'],['music','音乐'],['sfx','音效'],['sens','鼠标灵敏度']].map(([k,n])=>`<label class="row2"><span>${n}</span><input type="range" min="0" max="1" step="0.05" data-k="${k}" value="${s[k]}"><output>${Math.round(s[k]*100)}</output></label>`).join('')}
  ${[['invY','反转纵向视角'],['shake','屏幕震动'],['nums','伤害数字'],['shadows','实时阴影'],['hidpi','高清渲染'],['fps','显示帧率']].map(([k,n])=>`<label class="row2 tog"><span>${n}</span><input type="checkbox" data-k="${k}" ${s[k]?'checked':''}><i></i></label>`).join('')}
  <button class="btn ghost small" id="wipe">清除全部存档</button>`;
  el.querySelectorAll('input').forEach(i=>i.addEventListener('input',()=>{const k=i.dataset.k;s[k]=i.type==='checkbox'?i.checked:+i.value;if(i.type==='range')i.nextElementSibling.textContent=Math.round(s[k]*100);
    AU.apply();if(k==='shadows'||k==='hidpi')applyQuality();$('#fps').hidden=!s.fps;persist()}));
  el.querySelectorAll('[data-pix]').forEach(b=>b.onclick=()=>{AU.sfx('ui');s.pix=+b.dataset.pix;persist();renderSettings(el)});
  el.querySelectorAll('[data-cam]').forEach(b=>b.onclick=()=>{AU.sfx('ui');if(P&&G.state!=='menu')setCamMode(b.dataset.cam);else{CAM.mode=s.cam=b.dataset.cam;persist()}renderSettings(el)});
  el.querySelector('#wipe').onclick=()=>{const b=el.querySelector('#wipe');if(b.dataset.c){try{localStorage.removeItem(SAVE_KEY)}catch(e){}SAVE.codex={w:[],r:[],f:[],e:[]};SAVE.rec={};SAVE.ach=[];SAVE.tot={runs:0,kills:0,clears:0,gold:0,time:0};persist();b.textContent='已清除';b.disabled=true}else{b.dataset.c=1;b.textContent='再次点击确认清除'}}}
function renderGuide(){
  $('#reacts').innerHTML=[['霜寒 + 雷霆','碎冰','冰冻的敌人被雷击中时碎裂，对周围造成范围伤害','frost'],['冰霜 + 圣火','融蚀','对带冰霜的敌人造成双倍伤害','fire'],['鲜血 + 圣火','沸血','出血 3 层以上被点燃时，血液沸腾爆炸','blood'],['暗咒 + 雷霆','黑雷','诅咒的敌人被雷击时，闪电跳跃 3 次','dark'],['圣火 + 霜寒','蒸腾','灼烧中的敌人受冰霜时伤害 ×1.6','frost']]
    .map(r=>`<tr><td>${r[0]}</td><td><b class="r-${r[3]}">${r[1]}</b></td><td>${r[2]}</td></tr>`).join('');
  $('#elems').innerHTML=Object.entries({blood:'出血：每层每 0.5 秒持续伤害，最多 10 层',fire:'灼烧：3 秒持续伤害',frost:'冰霜：减速，叠满 3 层冻结（首领只减速）',dark:'诅咒：受到伤害 +25%，死亡时传染 3 名敌人',volt:'感电：受到伤害 +12%',phys:'物理：无附加状态，但可触发遗物'}).map(([k,d])=>`<li><b style="color:${ELEM[k].c}">${ELEM[k].n}</b>${d}</li>`).join('');
  $('#poilegend').innerHTML=Object.entries(POI_INFO).map(([k,p])=>`<li><span style="color:${p.c}">${svg(p.icon)}</span><b>${p.n}</b>${p.d}</li>`).join('');
}

/* ---------- 选择卡（升级 / 宝箱 / 神龛 / 眷属） ---------- */
let curChoice=null,banishMode=false;
function rollRar(minR=0){const l=S.luck,u=Math.random();const r=u<.02+l*.03?3:u<.12+l*.08?2:u<.4+l*.1?1:0;return Math.max(r,minR)}
function openChoice(cfg){G.state='choice';curChoice=cfg;banishMode=false;
  $('#ctitle').textContent=cfg.title;$('#chint').textContent=cfg.hint||'';
  const box=$('#cards');box.className='cards'+(cfg.cards.length===1?' one':'');
  box.innerHTML=cfg.cards.map((c,i)=>{const R=RAR[c.rar||0];
    return`<button class="card ${cfg.reveal?'reveal':''} rar-${R.id}" style="--rc:${R.c};animation-delay:${i*.06}s" data-i="${i}"><span class="k">${cfg.cards.length>1?i+1:''}</span>
      <div class="top"><div class="ic" style="${c.ec?`color:${c.ec}`:''}">${svg(c.icon)}</div><div><b>${esc(c.name)}</b><small class="rl">${c.tag||R.n}</small></div></div>
      <p>${c.desc}</p>${c.note?`<em class="note">${c.note}</em>`:''}</button>`}).join('');
  $('#cactions').innerHTML=cfg.level?`<button class="btn ghost small" id="reroll" ${P.rerolls?'':'disabled'}>重抽（${P.rerolls}）</button><button class="btn ghost small" id="banish" ${P.banish?'':'disabled'}>放逐（${P.banish}）</button><button class="btn ghost small" id="skip">跳过 +${8+RUN.stage*4} 金</button>`:'';
  if(cfg.level){$('#reroll').onclick=()=>{if(P.rerolls>0){P.rerolls--;AU.sfx('ui');openChoice(levelChoice())}};
    $('#banish').onclick=()=>{banishMode=!banishMode;$('#banish').classList.toggle('on',banishMode);$('#chint').textContent=banishMode?'点击一张卡牌，将其永久移出本局卡池':cfg.hint};
    $('#skip').onclick=()=>{RUN.gold+=8+(RUN.ri||0)*4;closeChoice()}}
  show('choice');if(cfg.sound)AU.sfx(cfg.sound);setTimeout(()=>{const f=$('#cards .card');f&&f.focus({preventScroll:true})},60)}
$('#cards').addEventListener('click',e=>{const c=e.target.closest('.card');if(!c||!curChoice)return;choose(+c.dataset.i)});
function choose(i){if(G.state!=='choice'||!curChoice)return;const c=curChoice.cards[i];if(!c)return;
  if(banishMode&&curChoice.level){P.banish--;RUN.banned=RUN.banned||new Set();RUN.banned.add(c.key);AU.sfx('deny');openChoice(levelChoice());return}
  c.apply();AU.sfx('ui');closeChoice()}
function closeChoice(){curChoice=null;show(null);G.state='play';renderSlots();nextQueued()}
function nextQueued(){if(G.state!=='play'||!RUN.queue.length)return;const q=RUN.queue.shift();
  if(q.t==='level')openChoice(levelChoice());
  else if(q.t==='chest'){if(P.rel.blasphemy&&!q.extra)RUN.queue.unshift({t:'chest',extra:1,minR:q.minR},{t:'chest',extra:1,minR:q.minR});openChoice(chestChoice(q))}
  else if(q.t==='boon')openChoice(boonChoice());
  else if(q.t==='nest')openChoice(nestChoice());
  else if(q.t==='corrupt'){const c=corruptChoice();if(c.cards.length)openChoice(c);else nextQueued()}
  else if(q.t==='place'){if(RUN.pendingRelic&&RUN.pendingRelic.length)openPlace();else nextQueued()}}
function levelChoice(){
  const pool=[],ban=RUN.banned||new Set();
  for(const w of P.weapons)if(w.lvl<8&&!ban.has('w:'+w.id))pool.push(['w:'+w.id,4]);
  if(P.weapons.length<WMAX())for(const id in WEAPONS)if(!getW(id)&&!ban.has('n:'+id))pool.push(['n:'+id,2.4]);
  for(const id in TOMES)if(!ban.has('t:'+id))pool.push(['t:'+id,1]);
  const keys=[];while(keys.length<3&&pool.length){let s=0;for(const a of pool)s+=a[1];let r=Math.random()*s,i=0;for(;i<pool.length-1;i++){r-=pool[i][1];if(r<=0)break}keys.push(pool.splice(i,1)[0][0])}
  const cards=keys.map(key=>{const[t,id]=key.split(':'),rar=rollRar(),m=RAR[rar].m;
    if(t==='w'){const w=getW(id),W=WEAPONS[id],stat=pick(W.ups),v=upAmount(stat,W.base,m);
      return{key,rar,icon:W.icon,ec:ELEM[W.el].c,name:W.n+(w.evo?' · 已进化':''),tag:`${RAR[rar].n} · 等级 ${w.lvl} → ${w.lvl+1}`,desc:upText(stat,v)+(w.lvl+1===5&&!w.evo?`<br><span class="hint2">达到 5 级后，持有「${RELICS[W.evo.relic].n}」可在宝箱中进化</span>`:''),
        apply:()=>{w.lvl++;if(stat==='cd')w.cd*=1-v;else w[stat]+=v}}}
    if(t==='n'){const W=WEAPONS[id];return{key,rar:0,icon:W.icon,ec:ELEM[W.el].c,name:W.n,tag:`新武器 · ${ELEM[W.el].n}`,desc:W.d,apply:()=>{const w=addWeapon(id);if(rar>0){w.dmg*=1+.15*rar}}}}
    const T=TOMES[id],v=T.v*m;return{key,rar,icon:T.icon,name:T.n,tag:`${RAR[rar].n} · 典籍`,desc:T.f(v),apply:()=>{P.b[T.s]+=v;const hb=P.b;stats();if(T.s==='hp')healP(v)}}});
  return{title:'等级提升！',hint:`等级 ${P.lvl} · 选择一项强化 · 按 1 / 2 / 3`,cards,level:true,sound:'level'}}
function chestChoice(q){
  for(const w of P.weapons){const W=WEAPONS[w.id];if(w.lvl>=5&&!w.evo&&P.rel[W.evo.relic])
    return{title:'圣器觉醒',hint:`${W.n} 与 ${RELICS[W.evo.relic].n} 产生共鸣`,reveal:true,sound:'evo',cards:[{rar:3,icon:W.icon,ec:ELEM[W.el].c,name:W.evo.n,tag:'武器进化',desc:W.evo.d,
      apply:()=>{w.evo=true;w.dmg*=1.5;unlockAch('evo');G.flash=.6}}]}}
  const rar=rollRar(q.minR||0),list=Object.keys(RELICS).filter(id=>RELICS[id].r===rar&&relicAllowed(id)),id=pick(list),R=RELICS[id],have=P.box.filter(it=>it&&it.id===id).length,T=TAGS[R.tag];
  return{title:q.free?'战利品':q.minR?'献血台':'宝箱开启',hint:boxFree()<0&&!R.consume&&id!=='waxbones'?'圣骸匣已满——收下后需要选择替换的格子':'点击收下 · 将放入圣骸匣',reveal:true,sound:rar===3?'legend':'chest',
    cards:[{rar,icon:R.icon,name:R.n,tag:`${RAR[rar].n} · <span style="color:${T.c}">${T.n}印</span>${have?' · 已持有 '+have:''}`,desc:R.d,note:R.curse?'诅咒遗物：伴随代价':R.pos?'位置遗物：在圣骸匣中的摆放决定效果':'',
      apply:()=>{addRelic(id);if(R.r>=2)G.flash=.3;
        const ev=P.weapons.find(w=>WEAPONS[w.id].evo.relic===id&&!w.evo);if(ev)toast('共鸣',`${WEAPONS[ev.id].n} 满 5 级后可在宝箱中进化`,ev.id)}}]}}
function boonChoice(){const ids=Object.keys(TOMES).sort(()=>Math.random()-.5).slice(0,3);
  return{title:'神龛祝福',hint:'神龛回应了你的祈祷 · 选择一项',sound:'chest',cards:ids.map(id=>{const T=TOMES[id],rar=rollRar(),v=T.v*RAR[rar].m*1.5;
    return{rar,icon:T.icon,name:T.n.replace('典籍','祝福'),tag:RAR[rar].n+' · 祝福',desc:T.f(v),apply:()=>{P.b[T.s]+=v;stats();if(T.s==='hp')healP(v)}}})}}
function nestChoice(){const cards=[];
  if(fams.length<2)for(const id in FAMS){if(fams.some(f=>f.id===id))continue;const F=FAMS[id];cards.push({rar:1,icon:F.icon,ec:ELEM[F.el].c,name:F.n[0],tag:'孵化眷属',desc:F.d+`<br><span class="hint2">→ ${F.n[1]} → ${F.n[2]}</span>`,apply:()=>{addFam(id);toast(F.n[0]+' 加入了战斗',F.d,F.icon)}})}
  if(fams.length)cards.push({rar:2,icon:'nest',name:'喂养眷属',tag:'滋养',desc:'所有眷属立刻获得 100 点成长。',apply:()=>fams.forEach(f=>famGain(f,100))});
  return{title:'眷属之巢',hint:fams.length<2?'选择一只眷属与你同行（最多 2 只）':'你的眷属已满',sound:'chest',cards}}

/* ---------- HUD ---------- */
function renderSlots(){if(!P)return;
  $('#slots').innerHTML=P.weapons.map(w=>{const W=WEAPONS[w.id];return`<span class="${w.evo?'evo':''}" style="color:${ELEM[W.el].c}" data-tip="${esc((w.evo?W.evo.n:W.n)+' · 等级 '+w.lvl+'|'+ELEM[W.el].n+'系。伤害 '+w.dmg.toFixed(1)+(w.count?' · 数量 '+w.count:'')+' · 范围 '+Math.round(w.area*100)+'%')}">${svg(W.icon)}<b>${w.lvl}</b></span>`}).join('')
    +Array(Math.max(0,WMAX()-P.weapons.length)).fill('<span class="empty"></span>').join('');
  renderRelics();renderFams()}
function renderRelics(){if(!P||!P.box)return;const any=P.box.some(Boolean);$('#relics').className=any?'mini':'';
  $('#relics').innerHTML=any?P.box.map((it,i)=>{if(!it)return'<span class="e"></span>';const R=RELICS[it.id];return`<span class="${P.ritCells.has(i)?'rit':''}${it.wax?' wax':''}${R.cor?' cor':''}" style="--rc:${RAR[R.r].c}" data-tip="${esc(R.n+(it.wax?'（蜡制）':'')+'|'+R.d)}">${svg(R.icon)}</span>`}).join(''):''}
/* ---------- 圣骸匣页面 ---------- */
let boxSel=null,placeMode=false;
function openPlace(){placeMode=true;boxSel=null;G.state='pause';pauseTab='box';show('pause');renderPause()}
function renderBox(el){const box=P.box,pend=placeMode&&RUN.pendingRelic&&RUN.pendingRelic[0];
  const linkSrc=new Set(P.links.map(l=>l[0])),linkDst=new Set(P.links.map(l=>l[1]));
  const cell=(it,i)=>{if(!it)return`<button class="cell empty ${boxSel===i?'sel':''}" data-i="${i}" aria-label="空格"></button>`;const R=RELICS[it.id],T=TAGS[R.tag];
    return`<button class="cell ${boxSel===i?'sel':''} ${P.ritCells.has(i)?'rit':''} ${linkDst.has(i)?'tgt':''} ${R.cor?'cor':''}" data-i="${i}" style="--rc:${RAR[R.r].c};--tc:${T.c}">${svg(R.icon)}<i class="tg">${T.n}</i>${it.wax?'<i class="wx">蜡</i>':''}${R.pos==='right'?'<i class="ar r">▶</i>':R.pos==='left'?'<i class="ar l">◀</i>':''}<span class="cn">${esc(R.n)}</span></button>`};
  const sel=boxSel!=null&&box[boxSel],SR=sel&&RELICS[sel.id];
  const rits=Object.entries(RITUALS).map(([k,R])=>`<li class="${P.rit.has(k)?'on':''}" style="--tc:${TAGS[k].c}"><b>${R.n}</b><span>${R.d}</span></li>`).join('');
  el.innerHTML=`${pend?`<div class="placebar"><div class="ic">${svg(RELICS[pend.id].icon)}</div><div><b>圣骸匣已满 · ${esc(RELICS[pend.id].n)}</b><small>${RELICS[pend.id].d}</small><p>点击一个格子，用它替换原有遗物；或放弃这件新遗物。</p></div><button class="btn ghost small" id="discardNew">放弃新遗物</button></div>`:''}
    <div class="boxwrap"><div><div class="boxgrid">${box.map(cell).join('')}</div>
      <p class="muted boxhint">点击两个格子交换位置。同一行或同一列<b>连续三件同印记</b>的遗物构成仪式；<b>骸骨圣匣</b>复制其右侧遗物，<b>左手之罪</b>强化其左侧遗物；<b>衔尾蛇</b>每层吞噬一件相邻遗物；<b>蜡制</b>遗物从最左上开始每层熔化一件。</p></div>
    <aside class="boxside">${SR?`<div class="selcard" style="--rc:${RAR[SR.r].c}"><div class="top"><span class="ic">${svg(SR.icon)}</span><div><b>${esc(SR.n)}</b><small>${RAR[SR.r].n} · <span style="color:${TAGS[SR.tag].c}">${TAGS[SR.tag].n}印</span>${sel.wax?' · 蜡制':''}${SR.cor?' · 腐化':''} · 有效层数 ${P.rel[sel.id]||0}</small></div></div><p>${SR.d}</p>${placeMode?'':'<button class="btn ghost small" id="destroyRel">摧毁这件遗物</button>'}</div>`:'<p class="muted">选择一件遗物查看详情。</p>'}
      <h3>仪式</h3><ul class="rits">${rits}</ul></aside></div>`;
  el.querySelectorAll('.cell').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;AU.sfx('ui');
    if(placeMode&&RUN.pendingRelic&&RUN.pendingRelic.length){P.box[i]=RUN.pendingRelic.shift();recompute();toast('已放入圣骸匣',RELICS[P.box[i].id].n,RELICS[P.box[i].id].icon);if(!RUN.pendingRelic.length)endPlace();else renderPause();return}
    if(boxSel===null){if(box[i])boxSel=i}else if(boxSel===i)boxSel=null;else{swapSlots(boxSel,i);boxSel=null}renderPause()});
  const dn=el.querySelector('#discardNew');if(dn)dn.onclick=()=>{RUN.pendingRelic.shift();if(!RUN.pendingRelic.length)endPlace();else renderPause()};
  const dr=el.querySelector('#destroyRel');if(dr)dr.onclick=()=>{if(!dr.dataset.c){dr.dataset.c=1;dr.textContent='再次点击确认摧毁';return}removeSlot(boxSel);boxSel=null;renderPause()}}
function endPlace(){placeMode=false;RUN.pendingRelic=[];G.state='play';show(null);renderSlots();nextQueued()}
function renderFams(){if(!P)return;$('#famsbar').innerHTML=fams.map(f=>{const F=FAMS[f.id],nx=FAM_EVO[f.stage];return`<span data-tip="${esc(F.n[f.stage]+'|'+(nx?'成长 '+f.xp+' / '+nx:'最终形态'))}">${svg(F.icon)}<i style="width:${nx?Math.min(100,f.xp/nx*100):100}%"></i></span>`}).join('')}
let hudT=0,fpsN=0,fpsT=0;
function updHud(dt){hudT-=dt;if(typeof hudExtra==='function')hudExtra(dt);
  $('#xp i').style.width=(P.xp/P.next*100).toFixed(1)+'%';$('#hpbar i').style.width=(P.hp/S.maxHp*100).toFixed(1)+'%';
  $('#hptxt').textContent=Math.ceil(P.hp)+' / '+S.maxHp;$('#gold').textContent=RUN.gold;$('#lvtag').textContent='LV '+P.lvl;$('#kc').textContent=RUN.kills;
  $('#timer').textContent=fmt(RUN.stageT);
  const bt=$('#bosstime');if(RUN.bossDead){bt.textContent='次元之门已开启';bt.className='bt open'}else if(RUN.bossSummoned){bt.textContent='首领已登场';bt.className='bt warn'}else{bt.textContent='首领将在 '+fmt(bossT()-RUN.stageT)+' 后苏醒';bt.className='bt'}
  const bb=$('#boss');if(boss&&!boss.dead&&!P.rel.veil){bb.style.display='block';$('#bname').textContent=boss.name;$('#boss p i').style.width=Math.max(0,boss.hp/boss.max*100)+'%'}else bb.style.display='none';
  const u=$('#ult');u.style.setProperty('--p',P.ult);u.classList.toggle('ready',P.ult>=100);$('#ultpct').textContent=P.ult>=100?'就绪':Math.floor(P.ult)+'%';
  const dc=$('#dashcd');dc.style.setProperty('--p',P.dash>0?(1-P.dash/S.dashCd)*100:100);
  _v.set(P.x,P.y+2.7,P.z).project(camera);const ph=$('#php');ph.style.left=((_v.x*.5+.5)*innerWidth)+'px';ph.style.top=((-_v.y*.5+.5)*innerHeight)+'px';ph.firstElementChild.style.width=(P.hp/S.maxHp*100)+'%';
  // 交互提示
  const pr=$('#prompt');
  if(nearPoi){const p=nearPoi,I=POI_INFO[p.type];let txt='';
    if(p.type==='charge')txt=`${I.n} · 充能 ${Math.round(p.prog*100)}%`;
    else if(p.type==='chest'){const c=poiCost(p);txt=`<kbd>E</kbd> 打开宝箱 · <span class="${RUN.gold>=c?'':'no'}">${c} 金</span>`}
    else if(p.type==='boss')txt=`<kbd>E</kbd> 召唤首领`;else if(p.type==='portal')txt=`<kbd>E</kbd> 进入${!isLastStage()?'下一层':'黎明'}`;
    else txt=`<kbd>E</kbd> ${I.n}`;
    if(pr.dataset.t!==txt){pr.innerHTML=txt+(p.type==='charge'?`<i style="width:${p.prog*100}%"></i>`:'')+`<small>${I.d}</small>`;pr.dataset.t=txt}
    _v.set(p.x,p.y+3.2,p.z).project(camera);pr.style.left=((_v.x*.5+.5)*innerWidth)+'px';pr.style.top=((-_v.y*.5+.5)*innerHeight)+'px';pr.hidden=false;pr.style.setProperty('--c',I.c)}
  else pr.hidden=true;
  $('#camhint').hidden=!(CAM.mode==='tp'&&!CAM.locked&&!document.body.classList.contains('touch'));
  if(hudT<=0){hudT=.5;renderFams()}
  if(SAVE.settings.fps){fpsN++;fpsT+=dt;if(fpsT>=.5){$('#fps').textContent=Math.round(fpsN/fpsT)+' FPS · '+enemies.length+' 敌人';fpsN=0;fpsT=0}}
}
/* ---------- 小地图 ---------- */
const mm=$('#minimap'),mmx=mm.getContext('2d');let mmT=0;
function drawPoiIcon(g,p,x,y,s){const I=POI_INFO[p.type];g.fillStyle=p.used?'rgba(120,110,120,.6)':I.c;g.beginPath();
  if(p.type==='chest')g.rect(x-s,y-s*.7,s*2,s*1.4);else if(p.type==='boss'||p.type==='portal'){g.moveTo(x,y-s*1.4);g.lineTo(x+s*1.2,y);g.lineTo(x,y+s*1.4);g.lineTo(x-s*1.2,y)}else g.arc(x,y,s,0,TAU);g.fill()}
function drawMinimap(){const W=mm.width,R=42,S2=W/(2*R),H=WORLD.H,bs=400/(2*H);
  mmx.fillStyle='#08060a';mmx.fillRect(0,0,W,W);
  const th=camYaw()-Math.PI,ct=Math.cos(th),st=Math.sin(th);
  mmx.save();mmx.translate(W/2,W/2);mmx.rotate(th);mmx.translate(-W/2,-W/2);
  mmx.drawImage(mapBg,(P.x-MAPC.x-R+H)*bs,(P.z-MAPC.z-R+H)*bs,2*R*bs,2*R*bs,0,0,W,W);mmx.restore();
  const tr=(x,z)=>{const dx=(x-P.x)*S2,dz=(z-P.z)*S2;return[W/2+dx*ct-dz*st,W/2+dx*st+dz*ct]};
  mmx.fillStyle='rgba(255,60,70,.85)';let n=0;for(const e of enemies){if(n++>250)break;const[x,y]=tr(e.x,e.z);if(x<0||y<0||x>W||y>W)continue;mmx.fillRect(x-1,y-1,e.elite?4:2,e.elite?4:2)}
  for(const p of POIS){let[x,y]=tr(p.x,p.z);const out=x<4||y<4||x>W-4||y>W-4;x=clamp(x,5,W-5);y=clamp(y,5,W-5);if(out&&p.used)continue;mmx.globalAlpha=out?.7:1;drawPoiIcon(mmx,p,x,y,out?3:4.5);mmx.globalAlpha=1}
  if(boss){const[x,y]=tr(boss.x,boss.z);mmx.fillStyle='#ff2030';mmx.beginPath();mmx.arc(clamp(x,6,W-6),clamp(y,6,W-6),6,0,TAU);mmx.fill()}
  for(const k of picks){const[x,y]=tr(k.x,k.z);mmx.fillStyle='#ffc060';mmx.fillRect(x-2,y-2,4,4)}
  if(CAM.mode==='tp'){mmx.fillStyle='rgba(255,240,200,.08)';mmx.beginPath();mmx.moveTo(W/2,W/2);mmx.arc(W/2,W/2,W,-Math.PI/2-.5,-Math.PI/2+.5);mmx.fill()}
  mmx.save();mmx.translate(W/2,W/2);mmx.rotate(-P.face+Math.PI+th);mmx.fillStyle='#fff2d8';mmx.beginPath();mmx.moveTo(0,-7);mmx.lineTo(5,5);mmx.lineTo(0,2);mmx.lineTo(-5,5);mmx.fill();mmx.restore()}
function drawBigMap(cv2,leg){const g=cv2.getContext('2d'),W=cv2.width,H=WORLD.H,s=W/(2*H);g.drawImage(mapBg,0,0,W,W);
  for(const p of POIS)drawPoiIcon(g,p,(p.x-MAPC.x+H)*s,(p.z-MAPC.z+H)*s,7);
  if(boss){g.fillStyle='#ff2030';g.beginPath();g.arc((boss.x-MAPC.x+H)*s,(boss.z-MAPC.z+H)*s,10,0,TAU);g.fill()}
  g.save();g.translate((P.x-MAPC.x+H)*s,(P.z-MAPC.z+H)*s);g.rotate(-P.face+Math.PI);g.fillStyle='#fff2d8';g.strokeStyle='#000';g.lineWidth=2;g.beginPath();g.moveTo(0,-11);g.lineTo(8,8);g.lineTo(0,3);g.lineTo(-8,8);g.closePath();g.stroke();g.fill();g.restore();
  const cnt={};for(const p of POIS){if(p.used&&p.type!=='portal')continue;cnt[p.type]=(cnt[p.type]||0)+1}
  (leg||$('#maplegend')).innerHTML=Object.entries(POI_INFO).map(([k,I])=>`<li><span style="color:${I.c}">${svg(I.icon)}</span><b>${I.n}</b><em>${cnt[k]||0}</em></li>`).join('')}
let mapOpen=false;function toggleMap(on){mapOpen=on===undefined?!mapOpen:on;$('#bigmap').hidden=!mapOpen;if(mapOpen){$('#mapstage').textContent=STAGES[RUN.stage].n;drawBigMap($('#bigcv'))}}

/* ---------- 暂停 ---------- */
let pauseTab='box';
function pause(on){if(on&&window.__nopause)return;
  if(on&&G.state==='play'){G.state='pause';toggleMap(false);boxSel=null;show('pause');renderPause();$('#resume').focus()}
  else if(!on&&G.state==='pause'){if(placeMode){endPlace();return}G.state='play';show(null)}}
function renderPause(){
  $$('#ptabs .tab').forEach(b=>{b.classList.toggle('on',b.dataset.t===pauseTab);b.disabled=placeMode&&b.dataset.t!=='box'});
  $('#pauseh').textContent=placeMode?'放置遗物':'暂停';$('#quit').hidden=placeMode;$('#resume').textContent=placeMode?'放弃并继续':'继续战斗';
  const el=$('#pbody');
  if(pauseTab==='box')renderBox(el);
  else if(pauseTab==='build'){const st=[['伤害',Math.round(S.dmg*dynMul()*100)+'%'],['冷却',Math.round(S.cd*100)+'%'],['范围',Math.round(S.area*100)+'%'],['移速',S.spd.toFixed(1)],['生命',Math.ceil(P.hp)+' / '+S.maxHp],['回复',S.regen.toFixed(1)+'/秒'],['护甲',S.armor.toFixed(1)],['暴击',Math.round(S.crit*100)+'%'],['幸运',Math.round(S.luck*100)+'%'],['拾取',S.mag.toFixed(1)+' 米'],['经验',Math.round(S.xp*100)+'%'],['诅咒',Math.round(P.curseLv*100)+'%']];
    el.innerHTML=`<div class="bgrid"><section><h3>武器</h3>${P.weapons.map(w=>{const W=WEAPONS[w.id];return`<div class="bw"><span style="color:${ELEM[W.el].c}">${svg(W.icon)}</span><div><b>${w.evo?W.evo.n:W.n}<small> 等级 ${w.lvl} · ${ELEM[W.el].n}</small></b><p>伤害 ${w.dmg.toFixed(1)}${w.count?' · 数量 '+w.count:''}${w.pierce?' · 穿透 '+w.pierce:''} · 冷却 ${w.cd.toFixed(2)}s · 范围 ${Math.round(w.area*100)}%<br>本局输出 ${Math.round(RUN.dealt[w.id]||0)}</p>${!w.evo?`<p class="hint2">进化：满 5 级 + ${RELICS[W.evo.relic].n}${P.rel[W.evo.relic]?' ✓':''}</p>`:''}</div></div>`}).join('')}
      <h3>眷属</h3>${fams.length?fams.map(f=>`<div class="bw"><span>${svg(FAMS[f.id].icon)}</span><div><b>${FAMS[f.id].n[f.stage]}</b><p>${FAMS[f.id].d} · 成长 ${f.xp}${FAM_EVO[f.stage]?' / '+FAM_EVO[f.stage]:''}</p></div></div>`).join(''):'<p class="muted">在眷属之巢孵化伙伴。</p>'}</section>
      <section><h3>属性</h3><dl class="stats2">${st.map(([a,b])=>`<dt>${a}</dt><dd>${b}</dd>`).join('')}</dl>
      <h3>生效中的遗物</h3>${Object.keys(P.rel).length?`<div class="rgrid">${Object.entries(P.rel).map(([id,n])=>{const R=RELICS[id];return`<div class="rel" style="--rc:${RAR[R.r].c}">${svg(R.icon)}<div><b>${R.n}${n>1?' ×'+n:''}</b><small>${R.d}</small></div></div>`}).join('')}</div>`:'<p class="muted">打开宝箱获得遗物。</p>'}
      ${P.rit.size?`<h3>仪式</h3><div class="rgrid">${[...P.rit].map(k=>`<div class="rel" style="--rc:${TAGS[k].c}"><div><b>${RITUALS[k].n}</b><small>${RITUALS[k].d}</small></div></div>`).join('')}</div>`:''}</section></div>`}
  else if(pauseTab==='map'){el.innerHTML=`<div class="mapwrap"><canvas id="pmap" width="420" height="420"></canvas><ul class="legend" id="pleg"></ul></div>`;drawBigMap($("#pmap"),$("#pleg"))}
  else renderSettings(el)}

/* ---------- 流程 ---------- */
function startRun(){AU.init();newRun(selHunter,selDiff);CAM.yaw=0;CAM.ty=null;$('#vbtn').textContent=CAM.mode==='tp'?'俯':'背';
  RUN.route=selMap==='all'?[0,1,2]:[+selMap];RUN.ri=0;loadStage(RUN.route[0]);show(null);showHud(true);G.state='play';renderSlots();
  const s0=STAGES[RUN.route[0]];banner(s0.n,(RUN.route.length>1?s0.sub:'单界挑战')+' · 找到首领擂台，或撑到首领登场');discover('e','ghoul')}
function loadStage(i){if((RUN.ri||0)>0)relicStageEnter();RUN.stage=i;RUN.stageT=0;RUN.bossSummoned=false;RUN.bossDead=false;RUN.nextElite=40;RUN.nextSwarm=55;RUN.spawnAcc=0;RUN.stageKills=RUN.kills;RUN.stageGold=RUN.goldTotal;
  const leftover=gems.reduce((s,g)=>s+g.v,0);enemies=[];proj=[];gems=[];coins=[];parts=[];ebolts=[];picks=[];frostRings=[];teleList=[];boss=null;
  buildStage(i);P.x=0;P.z=0;P.y=hAt(0,0);P.vy=0;fams.forEach(f=>{f.x=1;f.z=1});camera.position.set(camOff.x,camOff.y+P.y,camOff.z);if(leftover)gainXp(leftover*S.xp);
  if(i===1)unlockAch('stage2')}
function stageClear(){G.state='clear';toggleMap(false);const st=STAGES[RUN.stage],last=isLastStage();
  if(last){endRun(true);return}
  $('#cltitle').textContent=st.n+'  · 已攻破';$('#clsub').textContent='次元之门在你身后关闭。下一界：'+STAGES[RUN.route[RUN.ri+1]].n;
  $('#clstats').innerHTML=[['用时',fmt(RUN.stageT)],['本层击杀',RUN.kills-RUN.stageKills],['本层金币',RUN.goldTotal-RUN.stageGold],['等级',P.lvl]].map(([a,b])=>`<div><b>${b}</b>${a}</div>`).join('');
  show('clear');AU.sfx('legend')}
function endRun(win){G.state='over';showHud(false);toggleMap(false);
  const o=$('#over');o.className='screen'+(win?' win':'');show('over');
  $('#otitle').textContent=win?'万界制霸':'战斗失败';
  $('#osub').textContent=win?'万界的裂缝被你一一封印。你，就是最强的乱斗者。':`你倒在了${STAGES[RUN.stage].n}。再来一局，下次一定赢！`;
  $('#ostats').innerHTML=[['总用时',fmt(RUN.t)],['击杀',RUN.kills],['等级',P.lvl],['抵达',STAGES[RUN.stage].n],['金币',RUN.goldTotal],['元素反应',RUN.react]].map(([a,b])=>`<div><b>${b}</b>${a}</div>`).join('');
  const names=Object.assign({},...Object.keys(WEAPONS).map(k=>({[k]:WEAPONS[k].n})),{burn:'灼烧',bleed:'出血',react:'元素反应',relic:'遗物',fam:'眷属',ult:'大招',other:'其他',bond:'羁绊',slam:'下砸',combo:'连斩冲击'});
  const rows=Object.entries(RUN.dealt).sort((a,b)=>b[1]-a[1]),max=rows.length?rows[0][1]:1;
  $('#dmgtable').innerHTML=rows.slice(0,9).map(([k,v])=>`<div class="drow"><span>${names[k]||k}</span><i><em style="width:${(v/max*100).toFixed(1)}%"></em></i><b>${Math.round(v).toLocaleString()}</b></div>`).join('');
  if(win){G.flash=1;for(const e of enemies)e.dead=true;unlockAch('dawn');if(RUN.diff===2)unlockAch('bloodmoon');SAVE.tot.clears++}else AU.sfx('over');
  unlockAch('first');if(RUN.kills>=500)unlockAch('k500');if(RUN.kills>=2000)unlockAch('k2000');if(RUN.shatter>=50)unlockAch('shatter');
  $('#newach').innerHTML=RUN.ach.length?'本局成就：'+RUN.ach.map(a=>`<b>${ACH[a].n}</b>`).join(' · '):'';
  const t=SAVE.tot;t.runs++;t.kills+=RUN.kills;t.gold+=RUN.goldTotal;t.time+=Math.floor(RUN.t);
  const r=SAVE.rec[P.hunter];if(!r||RUN.stage>r.stage||(RUN.stage===r.stage&&RUN.kills>r.kills))SAVE.rec[P.hunter]={stage:RUN.stage,kills:RUN.kills,time:Math.floor(RUN.t),lvl:P.lvl};
  persist()}
function toMenu(){show('menu');showHud(false);G.state='menu';$('#lastrun').textContent=SAVE.tot.runs?`已出战 ${SAVE.tot.runs} 次 · 累计击杀 ${SAVE.tot.kills}`:''}

/* ---------- 按钮绑定 ---------- */
click('#go',()=>{renderSelect();show('select')});
click('#tocodex',()=>{renderCodex();show('codex')});
click('#torec',()=>{renderRecords();show('records')});
click('#toset',()=>{settingsBack='menu';renderSettings($('#setbody'));show('settings')});
click('#toguide',()=>{renderGuide();show('guide')});
click('.back',()=>{if(settingsBack==='pause'&&!$('#settings').hidden){settingsBack='menu';show('pause');return}toMenu()});
click('#hunt',()=>startRun());
click('#resume',()=>pause(false));
click('#quit',()=>{endRun(false)});
click('#next',()=>{RUN.ri++;loadStage(RUN.route[RUN.ri]);show(null);G.state='play';banner(STAGES[RUN.stage].n,STAGES[RUN.stage].sub+' · 敌人更强了')});
click('#again',()=>{startRun()});click('#home',()=>toMenu());
click('#pbtn',()=>pause(true));click('#vbtn',()=>setCamMode(CAM.mode==='tp'?'top':'tp'));click('#mapbtn',()=>toggleMap());click('#mapclose',()=>toggleMap(false));
$$('#ptabs .tab').forEach(b=>b.onclick=()=>{pauseTab=b.dataset.t;AU.sfx('ui');renderPause()});
// 移动端按钮
const touchBtn=(sel,fn)=>{const b=$(sel);b.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();AU.init();fn()})};
touchBtn('#bjump',doJump);touchBtn('#bdash',()=>doDash());touchBtn('#bult',castUlt);touchBtn('#buse',interact);
// 提示框
const tip=$('#tip');
document.addEventListener('pointerover',e=>{const t=e.target.closest('[data-tip]');if(!t){tip.hidden=true;return}const[a,b]=t.dataset.tip.split('|');tip.innerHTML=`<b>${esc(a)}</b>${b?`<span>${esc(b)}</span>`:''}`;tip.hidden=false;const r=t.getBoundingClientRect();tip.style.left=Math.min(innerWidth-250,r.left)+'px';tip.style.top=(r.bottom+8)+'px'});

/* ---------- 输入 ---------- */
function doJump(){if(G.state!=='play')return;const gh=hAt(P.x,P.z);if(P.y-gh<.05)P.jumps=0;if(P.jumps<S.jumps){P.jumps++;P.vy=9.5;AU.sfx('jump');burst(P.x,P.y+.1,P.z,0x8a7a90,5,3)}}
function doDash(){if(G.state!=='play'||P.dash>0)return;let mx=(keys.d||keys.arrowright?1:0)-(keys.a||keys.arrowleft?1:0),mz=(keys.s||keys.arrowdown?1:0)-(keys.w||keys.arrowup?1:0);
  if(stick.on){mx=stick.x;mz=stick.y}[mx,mz]=camInput(mx,mz);let a=Math.hypot(mx,mz)>.1?Math.atan2(mx,mz):P.face;P.face=a;P.dash=S.dashCd;P.dashT=.2;P.dashHit.clear();P.dvx=Math.sin(a)*S.spd*3.4;P.dvz=Math.cos(a)*S.spd*3.4;AU.sfx('dash');relicDash()}
addEventListener('keydown',e=>{const k=e.key.toLowerCase();keys[k]=true;
  if(k==='escape'||k==='p'){if(mapOpen)toggleMap(false);else if(G.state==='play')pause(true);else if(G.state==='pause')pause(false)}
  if(G.state==='play'){if(k===' ')doJump();if(k==='shift')doDash();if(k==='q')castUlt();if(k==='e')interact();if(k==='tab'||k==='m'){toggleMap()}if(k==='v')setCamMode(CAM.mode==='tp'?'top':'tp')}
  if(G.state==='choice'){if(['1','2','3'].includes(k))choose(+k-1);if(k==='r'&&curChoice&&curChoice.level&&P.rerolls>0){P.rerolls--;openChoice(levelChoice())}if((k==='enter'||k===' ')&&curChoice&&curChoice.cards.length===1){e.preventDefault();choose(0)}}
  if(['arrowup','arrowdown','arrowleft','arrowright',' ','tab'].includes(k))e.preventDefault()});
addEventListener('keyup',e=>{keys[e.key.toLowerCase()]=false});
addEventListener('blur',()=>{for(const k in keys)keys[k]=false;pause(true)});
document.addEventListener('visibilitychange',()=>{if(document.hidden)pause(true)});
const stEl=$('#stick');let stickId=null,sox=0,soy=0;
/* ---------- 视角控制：鼠标锁定 / 拖拽 / 滚轮 / 触屏右半屏 ---------- */
let camDrag=null,quietUnlock=false;
function lookBy(dx,dy){const s=.0016+.0068*SAVE.settings.sens;CAM.yaw-=dx*s;CAM.pitch=clamp(CAM.pitch+dy*s*(SAVE.settings.invY?-1:1),-.15,1.25)}
function releaseMouse(){if(document.pointerLockElement){quietUnlock=true;document.exitPointerLock()}}
function setCamMode(m){CAM.mode=m;SAVE.settings.cam=m;persist();if(P&&m==='tp')CAM.yaw=P.face;CAM.ty=null;if(m!=='tp')releaseMouse();$('#vbtn').textContent=m==='tp'?'俯':'背';toast(m==='tp'?'第三人称视角':'俯视视角',m==='tp'?'鼠标转动视角 · 滚轮缩放 · V 切换':'V 切换回第三人称','eye')}
canvas.addEventListener('mousedown',e=>{if(G.state!=='play'||CAM.mode!=='tp')return;
  if(!document.pointerLockElement&&canvas.requestPointerLock){try{const r=canvas.requestPointerLock();if(r&&r.catch)r.catch(()=>{})}catch(err){}}
  camDrag={x:e.clientX,y:e.clientY}});
addEventListener('mouseup',()=>{camDrag=null});
addEventListener('mousemove',e=>{if(G.state!=='play'||CAM.mode!=='tp')return;
  if(document.pointerLockElement===canvas)lookBy(e.movementX,e.movementY);else if(camDrag&&e.buttons){lookBy(e.clientX-camDrag.x,e.clientY-camDrag.y);camDrag.x=e.clientX;camDrag.y=e.clientY}});
document.addEventListener('pointerlockchange',()=>{CAM.locked=document.pointerLockElement===canvas;if(!CAM.locked&&!quietUnlock&&G.state==='play')pause(true);quietUnlock=false});
canvas.addEventListener('wheel',e=>{if(CAM.mode!=='tp'||G.state!=='play')return;e.preventDefault();CAM.dist=clamp(CAM.dist+e.deltaY*.006,3.5,14)},{passive:false});
let lookId=null,lx=0,ly=0;
canvas.addEventListener('pointerdown',e=>{if(G.state!=='play'||e.pointerType==='mouse'||CAM.mode!=='tp'||e.clientX<innerWidth*.5)return;lookId=e.pointerId;lx=e.clientX;ly=e.clientY;canvas.setPointerCapture(e.pointerId);e.stopImmediatePropagation()});
canvas.addEventListener('pointermove',e=>{if(e.pointerId!==lookId)return;lookBy((e.clientX-lx)*1.4,(e.clientY-ly)*1.4);lx=e.clientX;ly=e.clientY});
const endLook=e=>{if(e.pointerId===lookId)lookId=null};canvas.addEventListener('pointerup',endLook);canvas.addEventListener('pointercancel',endLook);
const moonSpr=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(cv(256,256,g=>{const gr=g.createRadialGradient(118,112,10,128,128,128);gr.addColorStop(0,'#ff8070');gr.addColorStop(.42,'#b3122e');gr.addColorStop(.5,'rgba(120,0,20,.9)');gr.addColorStop(.62,'rgba(160,10,30,.35)');gr.addColorStop(1,'rgba(120,0,20,0)');g.fillStyle=gr;g.fillRect(0,0,256,256);
  g.fillStyle='rgba(0,0,0,.25)';for(const[x,y,r]of[[150,140,14],[100,160,10],[140,95,8]]){g.beginPath();g.arc(x,y,r,0,TAU);g.fill()}})),fog:false,transparent:true,depthWrite:false}));
moonSpr.scale.set(70,70,1);scene.add(moonSpr);
canvas.addEventListener('pointerdown',e=>{if(G.state!=='play'||e.pointerType==='mouse')return;if(CAM.mode==='tp'&&e.clientX>=innerWidth*.5)return;stick.on=true;stickId=e.pointerId;sox=e.clientX;soy=e.clientY;stick.x=stick.y=0;stEl.style.display='block';stEl.style.left=sox+'px';stEl.style.top=soy+'px';stEl.firstElementChild.style.transform='';canvas.setPointerCapture(e.pointerId)});
canvas.addEventListener('pointermove',e=>{if(!stick.on||e.pointerId!==stickId)return;let dx=e.clientX-sox,dy=e.clientY-soy;const d=Math.hypot(dx,dy),m=50;if(d>m){dx*=m/d;dy*=m/d}stick.x=dx/m;stick.y=dy/m;stEl.firstElementChild.style.transform=`translate(${dx}px,${dy}px)`});
const endStick=e=>{if(e.pointerId===stickId){stick.on=false;stick.x=stick.y=0;stEl.style.display='none'}};
canvas.addEventListener('pointerup',endStick);canvas.addEventListener('pointercancel',endStick);
if(matchMedia('(pointer:coarse)').matches)document.body.classList.add('touch');

/* ---------- 渲染同步 ---------- */
const tmpC=new THREE.Color();
function sync(dt,rt){
  const inGame=G.state!=='menu'&&P;
  if(inGame){
    player.position.set(P.x,P.y,P.z);player.rotation.y=P.face;player.visible=true;
    P.bob+=dt*(P.moving?11:2.5);const air=P.y-hAt(P.x,P.z)>.05;body.position.y=air?0:P.moving?Math.abs(Math.sin(P.bob))*.12:Math.sin(P.bob)*.03;body.rotation.x=P.dashT>0?.5:P.moving?.12:0;
    if(G.state==='play')player.visible=!(P.inv>0&&Math.floor(P.inv*20)%2===0);
    const gh=hAt(P.x,P.z);pShadow.position.set(P.x,gh+.05,P.z);const ss=1.4/(1+(P.y-gh)*.3);pShadow.scale.set(ss,ss,1);
    lantern.position.set(P.x+Math.sin(P.face+.9)*.5,P.y+1.6,P.z+Math.cos(P.face+.9)*.5);
    moon.position.set(P.x-12,P.y+30,P.z-8);moon.target.position.set(P.x,P.y,P.z);
    if(CAM.mode==='tp'){
      CAM.ty=CAM.ty==null?P.y:CAM.ty+(P.y-CAM.ty)*(1-Math.exp(-dt*10));
      const fx=Math.sin(CAM.yaw),fz=Math.cos(CAM.yaw),cp=Math.cos(CAM.pitch),sp=Math.sin(CAM.pitch),Tx=P.x,Ty=CAM.ty+1.6,Tz=P.z;
      let d=CAM.dist,cx,cy,cz;
      for(let i=0;i<8;i++){cx=Tx-fx*d*cp;cy=Ty+d*sp;cz=Tz-fz*d*cp;if(cy>=hAt(cx,cz)+.5||d<2)break;d*=.82}
      const B=WORLD.lim(.6);cx=clamp(cx,-B,B);cz=clamp(cz,-B,B);cy=Math.max(cy,hAt(cx,cz)+.5);
      camera.position.set(cx,cy,cz);
      if(G.shake>0&&SAVE.settings.shake){G.shake-=dt;const s=G.shake*.5;camera.position.x+=rand(-s,s);camera.position.y+=rand(-s,s)}else G.shake=Math.max(0,G.shake-dt);
      camera.lookAt(Tx+fx*2.2,Ty+.1,Tz+fz*2.2);
    }else{
    const tx=P.x+camOff.x,ty=P.y*.6+camOff.y,tz=P.z+camOff.z,k=1-Math.exp(-dt*6);
    camera.position.x+=(tx-camera.position.x)*k;camera.position.y+=(ty-camera.position.y)*k;camera.position.z+=(tz-camera.position.z)*k;
    if(G.shake>0&&SAVE.settings.shake){G.shake-=dt;const s=G.shake*.9;camera.position.x+=rand(-s,s);camera.position.z+=rand(-s,s)}else G.shake=Math.max(0,G.shake-dt);
    camera.lookAt(camera.position.x-camOff.x,camera.position.y-camOff.y+.8,camera.position.z-camOff.z);}
    moonSpr.position.set(camera.position.x-60,camera.position.y+55,camera.position.z-140);
  }else{const a=rt*.06;player.position.set(0,hAt(0,0),0);player.visible=true;player.rotation.y=a*2;camera.position.set(Math.sin(a)*14,hAt(0,0)+7.5,Math.cos(a)*14);camera.lookAt(0,hAt(0,0)+1.5,0);moonSpr.position.set(-60,55,-140);
    lantern.position.set(.5,hAt(0,0)+1.6,.5);moon.position.set(-12,30,-8);moon.target.position.set(0,0,0);pShadow.position.set(0,hAt(0,0)+.05,0)}
  lantern.intensity=2.2+Math.sin(rt*13)*.15+Math.sin(rt*7.3)*.12;updateHero(dt);
  // 敌人
  for(const k in EK)EK[k].begin();
  for(const e of enemies){let y=e.y+(e.D.y||0)*(e.boss?1:1);if(e.D.fly)y+=Math.sin(e.t*3)*.2;else if(e.D.ghost)y+=Math.sin(e.t*1.5)*.15;else y+=Math.abs(Math.sin(e.t*3))*.06;
    const st=e.st;let tint=e.tint;if(st.frozen>0||G.timeStop>0)tint=ST_TINT.frozen;else if(st.burn>0&&Math.sin(rt*20)>0)tint=ST_TINT.burn;else if(st.curse>0)tint=ST_TINT.curse;else if(e.elite)tint=ST_TINT.elite;
    EK[e.kind].add(e.x,y,e.z,e.rot,e.s,st.frozen>0?0:e.t,e.flash,tint)}
  for(const k in EK)EK[k].end();
  // 投射物
  for(const k of['dagger','scythe','sonic','wisp','raven','shard','skull','crescent','tbullet','orbB','ball'])K[k].begin();
  for(const p of proj){if(p.k==='scythe')K.scythe.add(p.x,p.y,p.z,p.spin,p.sz);else K[p.k].add(p.x,p.y,p.z,p.rot,1,rt)}
  for(const[x,z]of orbitScythes)K.scythe.add(x,P.y+1,z,rt*14,S.area);
  for(const k of['dagger','scythe','sonic','wisp','raven','shard','skull','crescent','tbullet','orbB','ball'])K[k].end();
  K.orb.begin();const ow=P&&getW('orbit');for(const[x,z]of orbs)K.orb.add(x,P.y+1+Math.sin(rt*4+x)*.1,z,0,(ow&&ow.evo?1.6:1)*S.area);K.orb.end();
  K.ebolt.begin();for(const b of ebolts)K.ebolt.add(b.x,hAt(b.x,b.z)+1.2,b.z,0,1);K.ebolt.end();
  K.gem.begin();for(const g of gems){g.t+=dt;tmpC.set(g.v>=20?0xff3050:g.v>=5?0xc070ff:0x6fb7ff);K.gem.add(g.x,hAt(g.x,g.z)+.45+Math.sin(g.t*3)*.08,g.z,g.t*2,g.v>=20?1.5:g.v>=5?1.2:1,0,0,tmpC)}K.gem.end();
  K.coin.begin();for(const c of coins){c.t+=dt;K.coin.add(c.x,hAt(c.x,c.z)+.4+Math.sin(c.t*3)*.08,c.z,c.t*4,1)}K.coin.end();
  K.part.begin();for(const p of parts){p.life-=dt;p.vy-=14*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;const gh=hAt(p.x,p.z)+.05;if(p.y<gh){p.y=gh;p.vx*=.8;p.vz*=.8}p.z+=p.vz*dt;K.part.add(p.x,p.y,p.z,p.life*8,Math.max(0,p.life/p.max)*1.2+.2,0,0,p.c)}K.part.end();
  parts=parts.filter(p=>p.life>0);
  K.heal.begin();K.bag.begin();K.magnet.begin();for(const k of picks){const y=hAt(k.x,k.z);(K[k.k]).add(k.x,y+(k.k==='bag'?0:.2+Math.sin(k.t*3)*.1),k.z,k.t*1.5,1)}K.heal.end();K.bag.end();K.magnet.end();
  // 光环 / 特效
  const aw=P&&getW('aura');auraMesh.visible=!!aw&&inGame;if(aw){drape(auraMesh,P.x,P.z,auraR*2,rt*.6,.12);auraMesh.material.opacity=.55+Math.sin(rt*6)*.15;auraMesh.material.color.set(aw.evo?0xff5020:0xffb060)}
  if(ultFx>0){ultFx-=dt*.9;const r=(1-ultFx)*30;ultRing.position.set(P.x,P.y+.2,P.z);ultRing.scale.set(r,r,1);ultRing.material.opacity=Math.max(0,ultFx)}else ultRing.material.opacity=P&&P.feast>0?.4+Math.sin(rt*10)*.2:0;
  if(P&&P.feast>0){ultRing.position.set(P.x,P.y+.2,P.z);ultRing.scale.set(18,18,1)}
  for(const b of bolts)if(b.life>0){b.life-=dt;b.m.material.opacity=Math.max(0,b.life/.22);b.m.scale.x=b.m.scale.z=1+Math.random()*.6;if(b.life<=0)b.m.visible=false}
  for(const c of chains)if(c.life>0){c.life-=dt;c.m.material.opacity=c.life/.15;if(c.life<=0)c.m.visible=false}
  teles.forEach((t,i)=>{const d=P&&P.rel&&P.rel.veil?null:teleList[i];if(d){t.m.visible=true;const s=d.r*2*(1.2-.2*(d.t/d.max));drape(t.m,d.x,d.z,s,rt,.15);t.m.material.opacity=.4+.6*(1-d.t/d.max)}else t.m.visible=false});
  flashLight.intensity=Math.max(0,flashLight.intensity-dt*30);if(!boss)bossLight.intensity=0;
  if(P)relicFx(dt);animPois(rt);animAmbient(dt,rt,inGame?P.x:0,inGame?P.z:0);
  if(G.flash>0){G.flash-=dt*.8;$('#flash').style.opacity=Math.max(0,G.flash)}
  if(bannerT>0){bannerT-=dt;if(bannerT<=0)$('#banner').style.opacity=0}
  if(inGame&&G.state!=='over'){updHud(dt);mmT-=dt;if(mmT<=0){mmT=.08;drawMinimap()}if(mapOpen&&Math.random()<.2)drawBigMap($('#bigcv'))}
  updDmg(dt);
}
let last=performance.now();
function loop(now){requestAnimationFrame(loop);const dt=Math.min((now-last)/1000,.05);last=now;G.rt=now/1000;
  if(G.state==='play')update(dt);sync(G.state==='play'||G.state==='menu'||G.state==='over'?dt:0,G.rt);renderFrame()}

/* ---------- 启动 ---------- */
applyQuality();$('#fps').hidden=!SAVE.settings.fps;buildStage(0);dressHunter('warden');toMenu();loadModels();
window.__G={G,get P(){return P},get RUN(){return RUN},get enemies(){return enemies},get POIS(){return POIS},keys,startRun,choose,interact,
  get cur(){return curChoice},step(n,dt=1/60){for(let i=0;i<n;i++){if(G.state==='play')update(dt);sync(dt,performance.now()/1000)}renderFrame()},
  set hunter(h){selHunter=h},set diff(d){selDiff=d}};
requestAnimationFrame(loop);

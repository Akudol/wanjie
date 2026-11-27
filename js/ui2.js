/* ============ 万界乱斗 · 新版界面（圆角卡片风） ============
   角色卡（圆形头像 + 等级徽章 + 血条）· 顶部关卡条与计时胶囊 · 圆形小地图与方位 · 底部武器栏（带名称）
   · 升级卡片（稀有度色带 + 新/强化标签 + 按键角标）· 操作胶囊按钮 · 设置页分组 */
(function buildHud(){
  const hb=$('#hpbox');hb.insertAdjacentHTML('afterbegin',`<div id="pcard"><div class="pav"><div class="pimg"></div><span class="plv">Lv <b>1</b></span></div>
    <div class="pinfo"><div class="pname"><b></b><span class="pel"></span></div><div class="pbar"></div><div class="pxp"><i></i></div></div></div>`);
  const pb=$('#pcard .pbar');pb.appendChild($('#hpbar'));pb.appendChild($('.hprow'));
  $('#center').insertAdjacentHTML('afterbegin',`<div id="stagebar"><div class="sl"><b class="sname"></b><span class="sidx"></span><span class="sdiff"></span></div><div class="sr"><b class="stot"></b><small>本局用时</small></div></div>`);
  $('#timer').insertAdjacentHTML('afterend',`<div id="cpills"><span class="cg">${svg('coin')}<b>0</b></span><span class="ck">${svg('skull')}<b>0</b></span></div>`);
  $('#timer').insertAdjacentHTML('afterbegin','<i class="tic"></i>');
  $('#right').insertAdjacentHTML('afterbegin','<div id="compass"><span>北</span><span>东</span><span>南</span><span>西</span></div>');
  $('#abil').insertAdjacentHTML('afterbegin','');
})();
let lastHero=null;
function hudRefresh(){if(!P||!RUN)return;
  if(lastHero!==P.hunter){lastHero=P.hunter;const H=HUNTERS[P.hunter],W=WEAPONS[H.w];$('#pcard .pimg').innerHTML=(typeof heroPortrait==='function'&&heroPortrait(P.hunter))||svg(H.icon);
    $('#pcard .pname b').textContent=H.n;const el=ELEM[W.el];$('#pcard .pel').textContent=el.n;$('#pcard .pel').style.background=el.c;$('#pcard').style.setProperty('--acc','#'+(H.acc||0xff8a3a).toString(16).padStart(6,'0'))}
  $('#pcard .plv b').textContent=P.lvl;$('#pcard .pxp i').style.width=(P.xp/P.next*100).toFixed(1)+'%';
  const st=STAGES[RUN.stage];$('#stagebar .sname').textContent=st.n;$('#stagebar .sidx').textContent=`世界 ${(RUN.ri||0)+1}/${(RUN.route||[0]).length}`;
  const D=DIFFS[RUN.diff];$('#stagebar .sdiff').textContent=D.n;$('#stagebar .sdiff').dataset.d=RUN.diff;$('#stagebar .stot').textContent=fmt(RUN.t);
  $('#cpills .cg b').textContent=RUN.gold;$('#cpills .ck b').textContent=RUN.kills;
  // 方位：小地图随镜头旋转，北东南西跟着转
  const th=camYaw()-Math.PI,s=Math.sin(th),c=Math.cos(th),R=$('#minimap').getBoundingClientRect(),rr=$('#right').getBoundingClientRect(),r=R.width/2+2,cx=R.left-rr.left+R.width/2,cy=R.top-rr.top+R.height/2;
  [[0,-1],[1,0],[0,1],[-1,0]].forEach(([dx,dz],i)=>{const x=-(dx*c-dz*s),y=-(dx*s+dz*c),el=$('#compass').children[i];el.style.transform=`translate(${(cx+x*r)|0}px,${(cy+y*r)|0}px)`})}
wrapHook('hudExtra',o=>dt=>{o(dt);hudRefresh()});
wrapHook('startRun',o=>()=>{lastHero=null;o()});
// 武器栏：每格显示武器名
wrapHook('renderSlots',o=>()=>{o();if(!P)return;const sp=$$('#slots span:not(.empty)');P.weapons.forEach((w,i)=>{const el=sp[i];if(!el)return;el.insertAdjacentHTML('afterbegin',`<em class="wn">${esc(w.fname||WEAPONS[w.id].n)}</em>`)})});
/* ---------- 升级 / 宝箱卡片 ---------- */
const KIND_TAG=k=>!k?['遗物','r']:k[0]==='n'?['新','n']:k[0]==='w'?['强化','w']:k[0]==='t'?['典籍','t']:['遗物','r'];
wrapHook('openChoice',o=>cfg=>{o(cfg);const box=$('#cards');
  box.innerHTML=cfg.cards.map((c,i)=>{const R=RAR[c.rar||0],[kt,kc]=c.name==='喂养眷属'||cfg.title==='眷属之巢'?['眷属','f']:cfg.title==='神龛祝福'?['祝福','t']:c.tag&&c.tag.includes('联动')?['联动','x']:c.tag&&c.tag.includes('进化')?['进化','x']:KIND_TAG(c.key);
    return`<button class="card c2 ${cfg.reveal?'reveal':''} rar-${R.id}" style="--rc:${R.c};animation-delay:${i*.07}s" data-i="${i}">
      <div class="band"><span class="chip2 rr">${R.n}</span><span class="chip2 kt k-${kc}">${kt}</span><div class="bic" style="${c.ec?`--ec:${c.ec}`:''}">${svg(c.icon)}</div></div>
      <div class="cbody"><b>${esc(c.name)}</b><small>${c.tag||R.n}</small><div class="cdesc">${c.desc}</div>${c.note?`<em class="note">${c.note}</em>`:''}</div>
      ${cfg.cards.length>1?`<span class="kb">${i+1}</span>`:''}</button>`}).join('');
  if(cfg.level){$('#ctitle').innerHTML=`<span class="ribbon">等级 ${P.lvl}！</span>`;
    const ca=$('#cactions');ca.querySelector('#reroll').innerHTML=`<i>⟳</i>重抽 (${P.rerolls}) <kbd>R</kbd>`;ca.querySelector('#skip').innerHTML=`<i>»</i>跳过 +${8+(RUN.ri||0)*4} 金 <kbd>X</kbd>`;
    ca.querySelector('#banish').innerHTML=`<i>✕</i>放逐 (${P.banish}) <kbd>Z</kbd>`;
    ca.insertAdjacentHTML('afterend','');let own=$('#cown');if(!own){own=document.createElement('div');own.id='cown';ca.after(own)}
    own.innerHTML=P.weapons.map(w=>`<span style="--c:${ELEM[WEAPONS[w.id].el].c}">${esc(w.fname||WEAPONS[w.id].n)} Lv.${w.lvl}</span>`).join('')}
  else{$('#ctitle').innerHTML=`<span class="ribbon alt">${esc(cfg.title)}</span>`;const own=$('#cown');if(own)own.innerHTML=''}});
addEventListener('keydown',e=>{if(G.state!=='choice'||!curChoice||!curChoice.level)return;const k=e.key.toLowerCase();if(k==='x'){const b=$('#skip');b&&b.click()}else if(k==='z'){const b=$('#banish');b&&!b.disabled&&b.click()}});
/* ---------- 设置页分组 ---------- */
const SET_GROUPS=[['画面',['画质','像素颗粒','实时阴影','高清渲染','显示帧率']],['声音',['主音量','音乐','音效']],['操作',['视角','鼠标灵敏度','反转纵向视角']],['游戏',['屏幕震动','伤害数字','新手提示']]];
wrapHook('renderSettings',o=>el=>{o(el);const rows=[...el.children],used=new Set(),secs=[];
  for(const[title,labels]of SET_GROUPS){const sec=document.createElement('section');sec.className='setsec';sec.innerHTML=`<h4>${title}</h4>`;
    for(const lb of labels){const r=rows.find(x=>!used.has(x)&&x.querySelector&&x.querySelector('span')&&x.querySelector('span').textContent.trim()===lb);if(r){used.add(r);sec.appendChild(r);if(lb==='画质'){const h=rows.find(x=>x.classList&&x.classList.contains('gfxhint'));if(h){used.add(h);sec.appendChild(h)}}}}
    secs.push(sec)}
  const rest=document.createElement('section');rest.className='setsec';rest.innerHTML='<h4>存档</h4>';for(const r of rows)if(!used.has(r))rest.appendChild(r);secs.push(rest);
  el.innerHTML='';el.classList.add('setgrid');secs.forEach(s=>{if(s.children.length>1)el.appendChild(s)})});
lantern.decay=2;lantern.distance=34; // 柔和衰减，避免脚下出现硬边光圈

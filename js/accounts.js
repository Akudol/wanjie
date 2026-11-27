/* ============ 万界乱斗 · 本地账号 ============
   同一个浏览器里可以有多个账号，每个账号一份独立存档（wanjie-save-<账号名>）。
   密码加盐哈希后保存，不存明文。存档码可以把进度带到别的设备。
   管理员：输入激活码认领（代码里只有激活码的哈希）。管理员全解锁、专属称号「万界之主」、可打开管理面板。 */
const ACC_KEY='wanjie-accounts',ADMIN_HASH='3901be226feb3c19e27274497e961ac879e5e1fd6086f73e84424f93e67ae623';
const ACC=(()=>{let a=null;try{a=JSON.parse(localStorage.getItem(ACC_KEY)||'null')}catch(e){}return a&&a.users?a:{users:{}}})();
const accSave=()=>{try{localStorage.setItem(ACC_KEY,JSON.stringify(ACC))}catch(e){}};
const ME=ACC_CUR&&ACC.users[ACC_CUR]?ACC.users[ACC_CUR]:null;
const IS_ADMIN=!!(ME&&ME.role==='admin');
if(ACC_CUR&&!ME){try{localStorage.removeItem('wanjie-cur')}catch(e){}} // 账号被删：下次回到游客
// ---- 哈希（优先 WebCrypto，非安全环境退回到纯 JS 实现） ----
async function sha256(txt){if(window.crypto&&crypto.subtle){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(txt));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}
  let h1=0x811c9dc5,h2=0x1000193;for(let r=0;r<2000;r++)for(let i=0;i<txt.length;i++){h1=Math.imul(h1^txt.charCodeAt(i),16777619);h2=Math.imul(h2^(h1>>>7),2654435761)}return'fb'+(h1>>>0).toString(16)+(h2>>>0).toString(16)}
const pwHash=(name,pw,salt)=>sha256(`wanjie:${salt}:${name}:${pw}`);
const newSalt=()=>Array.from(crypto.getRandomValues?crypto.getRandomValues(new Uint8Array(12)):Array.from({length:12},()=>Math.random()*256|0),b=>b.toString(16).padStart(2,'0')).join('');
function switchTo(name){try{name?localStorage.setItem('wanjie-cur',name):localStorage.removeItem('wanjie-cur')}catch(e){}location.reload()}
async function register(name,pw,carry){name=name.trim();if(!/^[一-龥A-Za-z0-9_\-]{2,12}$/.test(name))return'账号名 2～12 个字，可用中文、字母、数字、下划线';
  if(ACC.users[name])return'这个账号名已经有人用了';if(pw.length<4)return'密码至少 4 位';
  const salt=newSalt();ACC.users[name]={salt,hash:await pwHash(name,pw,salt),role:'player',created:Date.now(),last:Date.now()};accSave();
  if(carry){try{const g=localStorage.getItem('nocturne-save-v2');if(g)localStorage.setItem('wanjie-save-'+name,g)}catch(e){}}
  switchTo(name)}
async function login(name,pw){const u=ACC.users[name];if(!u)return'没有这个账号';if(await pwHash(name,pw,u.salt)!==u.hash)return'密码不对';u.last=Date.now();accSave();switchTo(name)}
async function claimAdmin(code){if(!ME)return'请先登录账号';if(await sha256('wanjie-admin:'+code.trim().toUpperCase())!==ADMIN_HASH)return'激活码不对';ME.role='admin';accSave();location.reload()}
function readSaveOf(name){try{return JSON.parse(localStorage.getItem('wanjie-save-'+name)||'null')}catch(e){return null}}
// ---- 存档码 ----
const b64e=s=>btoa(unescape(encodeURIComponent(s))),b64d=s=>decodeURIComponent(escape(atob(s)));
function exportCode(){const j=JSON.stringify(SAVE);let c=0;for(const ch of j)c=(c*31+ch.charCodeAt(0))>>>0;return'WJ1.'+b64e(j)+'.'+c.toString(36)}
function importCode(code){try{const[v,body,ck]=code.trim().split('.');if(v!=='WJ1')return'存档码格式不对';const j=b64d(body);let c=0;for(const ch of j)c=(c*31+ch.charCodeAt(0))>>>0;if(c.toString(36)!==ck)return'存档码不完整或被改动过';
  const s=JSON.parse(j);if(!s||!s.tot)return'存档码内容不对';localStorage.setItem(SAVE_KEY,JSON.stringify(s));location.reload()}catch(e){return'存档码解析失败'}}
/* ---------- 管理员：全部解锁 ---------- */
if(IS_ADMIN){SAVE.meta.unlocked=Object.keys(HUNTERS);for(const k in UPG)SAVE.meta.up[k]=UPG[k].max;SAVE.meta.shards=Math.max(SAVE.meta.shards,999999);
  for(const k of['w','r','f','e'])SAVE.codex[k]=[...new Set([...(SAVE.codex[k]||[]),...Object.keys(k==='w'?WEAPONS:k==='r'?RELICS:k==='f'?FAMS:Object.assign({},ENEMIES,BOSSES))])];
  for(const a in ACH)if(!SAVE.ach.includes(a))SAVE.ach.push(a);persist()}
const TITLE=IS_ADMIN?'万界之主':ME?'乱斗者':'游客';
const nameHTML=(n,admin)=>admin?`<span class="gname">${esc(n)}</span><em class="atitle">万界之主</em>`:esc(n);
/* ---------- 主菜单账号徽章 ---------- */
$('#menu').insertAdjacentHTML('beforeend',`<button id="accbadge" class="${IS_ADMIN?'admin':''}"><span class="av">${esc((ACC_CUR||'客')[0])}</span><span class="nm">${ME?nameHTML(ACC_CUR,IS_ADMIN):'游客 · 点击登录'}</span></button>`);
click('#accbadge',()=>{renderAccount();show('account')});
/* ---------- 账号页 ---------- */
SCREENS.push('account');
document.body.insertAdjacentHTML('beforeend',`<div id="account" class="screen page" hidden><div class="pagebox wide"><header class="ph"><button class="back2" id="accback">← 返回</button><h2>账号</h2></header><div id="accbody"></div></div></div>`);
click('#accback',()=>toMenu());
let accTab='login';
function renderAccount(){const users=Object.keys(ACC.users),el=$('#accbody');
  const board=users.map(n=>{const u=ACC.users[n],s=n===ACC_CUR?SAVE:readSaveOf(n)||{},t=s.tot||{},best=Object.values(s.rec||{}).reduce((m,r)=>Math.max(m,r.kills||0),0);return{n,admin:u.role==='admin',runs:t.runs||0,kills:t.kills||0,clears:t.clears||0,best}})
    .sort((a,b)=>(b.admin-a.admin)||(b.clears-a.clears)||(b.kills-a.kills));
  const me=ME?`<section class="acard me ${IS_ADMIN?'admin':''}"><div class="av big">${esc(ACC_CUR[0])}</div><div><h3>${nameHTML(ACC_CUR,IS_ADMIN)}</h3>
      <p class="muted">${IS_ADMIN?'管理员 · 全部角色、加成、图鉴、成就已解锁 · 游戏中按 F9 或点「管」打开管理面板':'普通账号 · 进度自动保存在这个浏览器里'}</p>
      <p>出战 ${SAVE.tot.runs} 次 · 累计击杀 ${SAVE.tot.kills} · 通关 ${SAVE.tot.clears} 次 · 次元晶 ${IS_ADMIN?'∞':SAVE.meta.shards}</p>
      <div class="row"><button class="btn ghost small" id="logout">退出登录</button><button class="btn ghost small" id="delacc">删除这个账号</button></div></div></section>`
    :`<section class="acard"><div class="av big">客</div><div><h3>游客</h3><p class="muted">现在是游客模式，进度存在这个浏览器的游客存档里。注册账号后可以把游客进度一起带走。</p></div></section>`;
  const forms=`<div class="tabs inline"><button class="tab ${accTab==='login'?'on':''}" data-t="login">登录</button><button class="tab ${accTab==='reg'?'on':''}" data-t="reg">注册新账号</button>${ME&&!IS_ADMIN?'<button class="tab '+(accTab==='admin'?'on':'')+'" data-t="admin">激活管理员</button>':''}</div>
    <form id="accform" class="aform" autocomplete="off">
      ${accTab==='admin'?`<label>管理员激活码<input id="f_code" placeholder="XXXX-XXXX-XXXX-XXXX" autocomplete="off"></label>`
        :`<label>账号名<input id="f_name" maxlength="12" ${accTab==='login'&&users.length?'list="acclist"':''} autocomplete="username"></label><datalist id="acclist">${users.map(n=>`<option value="${esc(n)}">`).join('')}</datalist>
        <label>密码<input id="f_pw" type="password" autocomplete="${accTab==='reg'?'new-password':'current-password'}"></label>
        ${accTab==='reg'?`<label>再输一次密码<input id="f_pw2" type="password" autocomplete="new-password"></label><label class="chk"><input id="f_carry" type="checkbox" ${ME?'':'checked'}> 把当前游客进度带进新账号</label>`:''}`}
      <p id="accerr" class="err"></p><button class="btn" type="submit">${accTab==='login'?'登录':accTab==='reg'?'注册并登录':'激活'}</button></form>`;
  const io=`<section class="io"><h3 class="sec">存档码</h3><p class="muted">把当前${ME?'账号':'游客'}的进度变成一串码，到别的设备上登录后导入，就能接着玩。导入会覆盖当前进度。</p>
    <div class="row"><button class="btn ghost small" id="expcode">生成存档码</button><button class="btn ghost small" id="impcode">导入存档码</button></div><textarea id="codebox" rows="3" placeholder="存档码会显示在这里；导入时把码粘贴到这里"></textarea><p id="ioerr" class="err"></p></section>`;
  const lb=`<section><h3 class="sec">本机排行</h3>${board.length?`<table class="tbl"><thead><tr><th>#</th><th>账号</th><th class="n">通关</th><th class="n">累计击杀</th><th class="n">单局最多</th><th></th></tr></thead><tbody>${board.map((b,i)=>`<tr class="${b.admin?'adm':''}"><td>${i+1}</td><td>${nameHTML(b.n,b.admin)}</td><td class="n">${b.clears}</td><td class="n">${b.kills}</td><td class="n">${b.best}</td><td>${b.n===ACC_CUR?'<em class="cur">当前</em>':`<button class="btn ghost small sw" data-n="${esc(b.n)}">切换</button>`}</td></tr>`).join('')}</tbody></table>`:'<p class="muted">还没有账号。</p>'}</section>`;
  el.innerHTML=`<div class="accgrid"><div>${me}${forms}</div><div>${lb}${io}</div></div>`;
  el.querySelectorAll('.tabs .tab').forEach(b=>b.onclick=()=>{accTab=b.dataset.t;renderAccount()});
  el.querySelectorAll('.sw').forEach(b=>b.onclick=()=>{accTab='login';renderAccount();$('#f_name').value=b.dataset.n;$('#f_pw').focus()});
  const err=m=>{$('#accerr').textContent=m||''};
  $('#accform').onsubmit=async e=>{e.preventDefault();err('');let r;
    if(accTab==='admin')r=await claimAdmin($('#f_code').value);
    else if(accTab==='reg'){if($('#f_pw').value!==$('#f_pw2').value)return err('两次密码不一样');r=await register($('#f_name').value,$('#f_pw').value,$('#f_carry').checked)}
    else r=await login($('#f_name').value.trim(),$('#f_pw').value);if(r)err(r)};
  const lo=$('#logout');if(lo)lo.onclick=()=>switchTo('');
  const del=$('#delacc');if(del)del.onclick=()=>{if(!del.dataset.c){del.dataset.c=1;del.textContent='再点一次：永久删除账号和进度';return}
    delete ACC.users[ACC_CUR];accSave();try{localStorage.removeItem('wanjie-save-'+ACC_CUR)}catch(e){}switchTo('')};
  $('#expcode').onclick=()=>{$('#codebox').value=exportCode();$('#codebox').select();$('#ioerr').textContent='已生成，复制保存好'};
  $('#impcode').onclick=()=>{const b=$('#impcode');if(!$('#codebox').value.trim())return $('#ioerr').textContent='先把存档码粘贴到框里';if(!b.dataset.c){b.dataset.c=1;b.textContent='再点一次确认覆盖';return}const r=importCode($('#codebox').value);if(r)$('#ioerr').textContent=r}}
/* ---------- 出战准备页 / HUD 显示称号 ---------- */
wrapHook('renderSelect',o=>()=>{o();const h=$('#select .ph h2');if(h&&IS_ADMIN)h.innerHTML=`出战准备 <span class="shardtag">${svg('portal')} ∞</span><em class="atitle">万界之主</em>`});
if(IS_ADMIN){const r=renderMenuMeta;window.renderMenuMeta=()=>{r();const sb=$('#toshop');if(sb)sb.innerHTML='次元商店<small>∞ 晶 · 全满级</small>'};renderMenuMeta()}
/* ---------- 管理面板 ---------- */
const ADM={god:false,open:false};
if(IS_ADMIN){
  $('#sysbtns').insertAdjacentHTML('afterbegin','<button id="admbtn" aria-label="管理面板">管</button>');
  document.body.insertAdjacentHTML('beforeend',`<div id="admpanel" hidden><div class="pagebox"><header class="ph"><h2>管理面板 <em class="atitle">万界之主</em></h2><button class="back2" id="admclose">关闭 · F9</button></header><div id="admbody"></div></div></div>`);
  const openAdm=on=>{if(on===ADM.open)return;if(on&&G.state!=='play')return;ADM.open=on;$('#admpanel').hidden=!on;if(on){if(typeof releaseMouse==='function')releaseMouse();G.state='admin';renderAdm()}else{G.state='play';renderSlots();renderRelics()}};
  click('#admbtn',()=>openAdm(true));click('#admclose',()=>openAdm(false));
  addEventListener('keydown',e=>{if(e.key==='F9'){e.preventDefault();openAdm(!ADM.open)}else if(e.key==='Escape'&&ADM.open){e.stopImmediatePropagation();openAdm(false)}},true);
  wrapHook('hurtPlayer',o=>d=>{if(ADM.god)return;return o(d)});
  function renderAdm(){const wopt=Object.entries(WEAPONS).map(([k,W])=>`<option value="${k}">${W.n}${getW(k)?'（已有）':''}</option>`).join(''),
      ropt=Object.entries(RELICS).map(([k,R])=>`<option value="${k}">${R.n}</option>`).join(''),iopt=Object.entries(INVASIONS).map(([k,I])=>`<option value="${k}">${I.n}</option>`).join('');
    $('#admbody').innerHTML=`<div class="admgrid">
      <section><h3 class="sec">角色</h3><div class="row wrap"><button class="btn ghost small ${ADM.god?'on':''}" data-a="god">无敌：${ADM.god?'开':'关'}</button><button class="btn ghost small" data-a="heal">回满血</button><button class="btn ghost small" data-a="lv">升 5 级</button><button class="btn ghost small" data-a="ult">大招充满</button><button class="btn ghost small" data-a="gold">金币 +1000</button></div></section>
      <section><h3 class="sec">武器（无视上限）</h3><div class="row wrap"><select id="admw">${wopt}</select><button class="btn ghost small" data-a="addw">获得</button><button class="btn ghost small" data-a="maxw">全部满级并进化</button></div></section>
      <section><h3 class="sec">遗物</h3><div class="row wrap"><select id="admr">${ropt}</select><button class="btn ghost small" data-a="addr">获得</button><button class="btn ghost small" data-a="chest">开一个宝箱</button></div></section>
      <section><h3 class="sec">关卡</h3><div class="row wrap"><button class="btn ghost small" data-a="boss">召唤首领</button><button class="btn ghost small" data-a="kill">首领与全场秒杀</button><button class="btn ghost small" data-a="next">直接通过本界</button><select id="admi">${iopt}</select><button class="btn ghost small" data-a="inv">触发入侵</button></div></section></div>`;
    $$('#admbody [data-a]').forEach(b=>b.onclick=()=>{AU.sfx('ui');const a=b.dataset.a;
      if(a==='god')ADM.god=!ADM.god;else if(a==='heal')P.hp=S.maxHp;else if(a==='lv'){for(let i=0;i<5;i++)gainXp(P.next-P.xp+.01)}else if(a==='ult')P.ult=100;
      else if(a==='gold'){RUN.gold+=1000;RUN.goldTotal+=1000}
      else if(a==='addw'){const id=$('#admw').value;if(!getW(id))addWeapon(id)}else if(a==='maxw'){for(const w of P.weapons){w.lvl=8;w.evo=true;if(w.fuse){w.fuse.lvl=8;w.fuse.evo=true}}stats()}
      else if(a==='addr')addRelic($('#admr').value);else if(a==='chest'){RUN.queue.push({t:'chest',free:1})}
      else if(a==='boss')summonBoss(false);else if(a==='kill'){for(const e of enemies)if(!e.dead&&!e.ally)hit(e,1e9,{src:'other'})}
      else if(a==='next'){openAdm(false);stageClear();return}
      else if(a==='inv'){if(RUN.inv)endInvasion(false);RUN.lastInv=null;startInvasion($('#admi').value)}
      toast('管理面板',b.textContent.split('：')[0],'crown');renderAdm()})}}
(function(){const st=document.createElement('style');st.textContent=`
#accbadge{position:absolute;right:18px;top:16px;display:flex;align-items:center;gap:10px;padding:6px 14px 6px 6px;background:#141a3c;color:#f4f6ff;border:0;box-shadow:0 0 0 2px #04050c,0 0 0 4px #3a4aa8;cursor:pointer;font:700 14px "Noto Sans SC",sans-serif;z-index:3}
#accbadge:hover{box-shadow:0 0 0 2px #04050c,0 0 0 4px #3af0ff}#accbadge.admin{box-shadow:0 0 0 2px #04050c,0 0 0 4px #ffd23a,0 0 18px rgba(255,210,58,.5)}
.av{width:30px;height:30px;display:grid;place-items:center;background:linear-gradient(135deg,#ff2e6e,#3af0ff);color:#fff;font:900 15px "Noto Sans SC",sans-serif;text-shadow:1px 1px 0 #10153a}
#accbadge.admin .av,.acard.admin .av{background:conic-gradient(#ffd23a,#ff2e6e,#9a5aff,#3af0ff,#ffd23a)}
.av.big{width:64px;height:64px;font-size:30px;flex:none}
.gname{font-weight:900;background:linear-gradient(90deg,#ffd23a,#fff6c0,#ff9a3a,#ffd23a);background-size:300% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:gflow 3s linear infinite;filter:drop-shadow(0 0 6px rgba(255,210,58,.6))}
@keyframes gflow{to{background-position:300% 0}}
.atitle{display:inline-block;margin-left:8px;padding:1px 8px;font:700 12px "Noto Sans SC",sans-serif;font-style:normal;color:#10153a;background:linear-gradient(90deg,#ffd23a,#ffb030);box-shadow:0 0 0 2px #04050c,0 0 10px rgba(255,210,58,.6);letter-spacing:.1em;vertical-align:middle;text-shadow:none}
.accgrid{display:grid;grid-template-columns:1fr 1fr;gap:22px}@media(max-width:820px){.accgrid{grid-template-columns:1fr}}
.acard{display:flex;gap:16px;align-items:flex-start;padding:14px;background:#141a3c;box-shadow:0 0 0 2px #04050c,0 0 0 4px #3a4aa8;margin-bottom:16px}.acard.admin{box-shadow:0 0 0 2px #04050c,0 0 0 4px #ffd23a,0 0 24px rgba(255,210,58,.35)}
.acard h3{margin:0 0 6px;font-size:20px}.acard p{margin:4px 0}.acard .row{margin-top:10px;gap:8px}
.aform{display:flex;flex-direction:column;gap:10px;margin-top:12px}.aform label{display:flex;flex-direction:column;gap:4px;font-size:13px;color:#9aa4d8}
.aform input:not([type=checkbox]),#codebox,#admpanel select{padding:9px 10px;background:#0e1230;color:#fff;border:0;box-shadow:0 0 0 2px #3a4aa8;font:500 15px "Noto Sans SC",sans-serif;outline:none}
.aform input:focus,#codebox:focus{box-shadow:0 0 0 2px #3af0ff}.aform label.chk{flex-direction:row;align-items:center;gap:8px;color:#c8d0f4}
.err{color:#ff6a8a;min-height:1em;margin:2px 0;font-size:13px}#codebox{width:100%;box-sizing:border-box;margin-top:8px;font-size:12px;resize:vertical}
.tbl tr.adm td{background:rgba(255,210,58,.08)}.tbl .cur{color:#3af0ff;font-style:normal;font-size:12px}
#admbtn{color:#ffd23a!important}
#admpanel{position:fixed;inset:0;z-index:40;display:grid;place-items:center;background:rgba(6,8,24,.72)}#admpanel[hidden]{display:none}
#admpanel .pagebox{max-width:760px;width:92vw}.admgrid{display:grid;gap:14px}.admgrid .row.wrap{flex-wrap:wrap;gap:8px;align-items:center}.admgrid .btn.on{box-shadow:0 0 0 2px #04050c,0 0 0 4px #ffd23a;color:#ffd23a}`;document.head.appendChild(st)})();

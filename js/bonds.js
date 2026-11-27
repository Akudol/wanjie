/* ============ 万界乱斗 · 跨界羁绊与联动武器 ============
   每把武器属于一个"界"。同界武器凑齐 2 / 3 把触发羁绊；集齐 4 个不同的界触发「万界」。
   两把不同界、都达到 5 级的武器，可在宝箱中「跨界联动」：合成一把同时打出两种攻击的联动武器，并空出一个武器槽。 */
const REALMS={
  night:{n:'永夜',s:'夜',c:'#b080ff',ws:['dagger','orbit','bolt','aura','frost','scythe'],d2:'范围 +15%',d3:'击杀回复 0.6 生命'},
  blade:{n:'剑界',s:'剑',c:'#e8f0ff',ws:['dragonslayer','falconrapier','oathsword','prosblade','bigblade','waterblade'],d2:'暴击率 +10%',d3:'每第 6 次命中，在目标处斩出剑气'},
  hunt:{n:'猎魔',s:'魔',c:'#ff3a3a',ws:['rebellion','yamato','handgun','gunkata','katanas'],d2:'冷却 -10%',d3:'连斩 30 以上时伤害 +30%'},
  fist:{n:'格斗',s:'斗',c:'#ffd040',ws:['kiblast','plainpunch','stretch','gauntlet','standrush','striker'],d2:'伤害 +12%',d3:'每第 12 次命中，迸发冲击波'},
  esp:{n:'异能',s:'异',c:'#8a6aff',ws:['bluered','nullify','chess','pactring','kagune','spellbolt'],d2:'经验 +20%',d3:'每 15 秒时间停止 1.2 秒'},
  mech:{n:'机械',s:'械',c:'#5ae8ff',ws:['armblade','hfblade','positron','twinblades','chainsaw','gelbanana','chemistry'],d2:'移速 +10%',d3:'冷却 -15%；每 8 秒放出一圈电弧弹'},
  school:{n:'学园',s:'学',c:'#ffe070',ws:['truthgun','objection','maskblade','kunai','striker'],d2:'幸运 +20% · 金币 +30%',d3:'击杀精英必掉宝箱'},
};
const W2R={};for(const[r,R]of Object.entries(REALMS))for(const w of R.ws)if(!W2R[w])W2R[w]=r;
for(const id in WEAPONS)if(!W2R[id])W2R[id]='night';
const NOFUSE=new Set(['orbit','aura']);
function realmCount(){const c={};if(!P)return c;for(const w of P.weapons){c[W2R[w.id]]=(c[W2R[w.id]]||0)+1;if(w.fuse)c[W2R[w.fuse.id]]=(c[W2R[w.fuse.id]]||0)+1}return c}
function bondLv(r){const n=(P&&P.bondC||{})[r]||0;return n>=3?3:n>=2?2:0}
function allRealms(){return Object.keys(P&&P.bondC||{}).length>=4}
// 数值类羁绊并入属性计算
wrapHook('relicStats',o=>()=>{o();if(!P)return;P.bondC=realmCount();
  if(bondLv('night')>=2)S.area*=1.15;if(bondLv('blade')>=2)S.crit+=.1;if(bondLv('hunt')>=2)S.cd*=.9;if(bondLv('mech')>=2)S.spd*=1.1;if(bondLv('mech')>=3)S.cd*=.85;
  if(bondLv('esp')>=2)S.xp*=1.2;if(bondLv('school')>=2){S.luck+=.2;S.gold*=1.3}});
wrapHook('relicDmgMul',o=>(e,op)=>{let m=o(e,op);if(!P||!P.bondC)return m;if(bondLv('fist')>=2)m*=1.12;if(allRealms())m*=1.2;if(bondLv('hunt')>=3&&RUN.combo>=30&&RUN.comboT>RUN.t)m*=1.3;return m});
// 新武器加入 / 联动后重算并提示
wrapHook('addWeapon',o=>id=>{const before=P.bondC?{...P.bondC}:{};const w=o(id);stats();bondToast(before);return w});
function bondToast(before){const now=P.bondC||{};for(const r in now){const a=before[r]||0,b=now[r];if(a<2&&b>=2||a<3&&b>=3){const R=REALMS[r];toast(`羁绊 · ${R.n} ${b>=3?'Ⅲ':'Ⅱ'}`,b>=3?R.d3:R.d2,'crown')}}
  if(Object.keys(before).length<4&&Object.keys(now).length>=4)toast('羁绊 · 万界','集齐 4 个不同的界：全伤害 +20%','portal')}
// 触发类羁绊
wrapHook('relicOnHit',o=>(e,op,d)=>{o(e,op,d);if(!P.bondC||op.dot||!WSRC.has(op.src))return;P.bondHits=(P.bondHits||0)+1;
  if(bondLv('blade')>=3&&P.bondHits%6===0&&!e.dead){const a=Math.atan2(e.x-P.x,e.z-P.z);arcFx(e.x,e.y+1,e.z,a,2.2,2.4,0xe8f0ff);inRange(e.x,e.z,2.4).forEach(t=>hit(t,d*.6,{src:'bond',el:'phys',np:1}))}
  if(bondLv('fist')>=3&&P.bondHits%12===0){fxRing(e.x,e.z,3.5,0xffd040);inRange(e.x,e.z,3.5).forEach(t=>hit(t,18*S.dmg,{src:'bond',el:'phys',kb:6,fx:t.x-e.x,fz:t.z-e.z,np:1}))}});
wrapHook('relicOnKill',o=>(e,op,ov)=>{o(e,op,ov);if(!P.bondC)return;if(bondLv('night')>=3)healP(.6);if(bondLv('school')>=3&&e.elite&&!e.boss){RUN.queue.push({t:'chest',free:1});nextQueued()}});
wrapHook('relicUpdate',o=>dt=>{o(dt);if(!P.bondC)return;
  if(bondLv('esp')>=3){P.espT=(P.espT==null?15:P.espT)-dt;if(P.espT<=0){P.espT=15;G.timeStop=Math.max(G.timeStop,1.2);G.flash=.2;showReact({x:P.x,y:P.y,z:P.z,s:1},'异能·时停')}}
  if(bondLv('mech')>=3){P.mechT=(P.mechT==null?8:P.mechT)-dt;if(P.mechT<=0){P.mechT=8;for(let i=0;i<10;i++)shoot('dagger',i/10*TAU,15,{dmg:16*S.dmg,pierce:3,life:1.1,el:'volt',src:'bond'})}}});
/* ---------- 联动武器 ---------- */
wrapHook('weaponTick',o=>(w,dt)=>{o(w,dt);if(w.fuse)o(w.fuse,dt)});
function fuseName(a,b){return REALMS[W2R[a.id]].s+REALMS[W2R[b.id]].s+'合击'}
wrapHook('chestChoice',o=>q=>{const base=o(q);if(base.title==='圣器觉醒')return base;
  const ws=P.weapons.filter(w=>w.lvl>=5&&!w.fuse);let pair=null;
  for(const a of ws){for(const b of ws){if(a===b||W2R[a.id]===W2R[b.id]||NOFUSE.has(b.id))continue;pair=[a,b];break}if(pair)break}
  if(!pair)return base;const[a,b]=pair,A=WEAPONS[a.id],B=WEAPONS[b.id],nm=fuseName(a,b);
  base.title='跨界联动';base.hint=`${A.n} × ${B.n} · 可以联动，也可以照常收下遗物`;
  base.cards.unshift({rar:3,icon:A.icon,ec:REALMS[W2R[b.id]].c,name:nm,tag:`联动武器 · ${REALMS[W2R[a.id]].n} × ${REALMS[W2R[b.id]].n}`,
    desc:`「${A.n}」与「${B.n}」合为一体：同时打出两种攻击，两者伤害 +30%，并空出一个武器槽。`,
    apply:()=>{a.fuse=b;a.fname=nm;a.dmg*=1.3;b.dmg*=1.3;P.weapons.splice(P.weapons.indexOf(b),1);G.flash=.6;AU.sfx('evo');banner(nm,'跨界联动完成');stats();renderSlots();unlockAch('evo')}});
  return base});
wrapHook('renderSlots',o=>()=>{o();if(!P)return;const sp=$$('#slots span:not(.empty)');P.weapons.forEach((w,i)=>{const el=sp[i];if(!el||!w.fuse)return;el.classList.add('fuse');
  el.dataset.tip=`${w.fname} · 联动|${WEAPONS[w.id].n} × ${WEAPONS[w.fuse.id].n}，等级 ${w.lvl} / ${w.fuse.lvl}`;el.insertAdjacentHTML('beforeend',`<em class="fz">${svg(WEAPONS[w.fuse.id].icon)}</em>`)})});
// 升级卡片标注武器所属的界与羁绊进度
wrapHook('levelChoice',o=>()=>{const c=o();for(const cd of c.cards){if(!cd.key||!/^[nw]:/.test(cd.key))continue;const id=cd.key.slice(2),r=W2R[id],R=REALMS[r],n=(P.bondC||{})[r]||0;
  cd.tag+=` · <span style="color:${R.c}">${R.n}界</span>`;if(cd.key[0]==='n')cd.desc+=`<br><span class="hint2" style="color:${R.c}">${R.n}羁绊 ${n} → ${n+1}：${n+1>=3?R.d3:n+1>=2?R.d2:'再拿 1 把同界武器激活'}</span>`}return c});
// 状态栏显示羁绊
wrapHook('buffsHTML',o=>()=>{let h=o();if(!P||!P.bondC)return h;const b=[];for(const[r,n]of Object.entries(P.bondC)){if(n<2)continue;const R=REALMS[r];b.push(chip('crown',R.n+(n>=3?'Ⅲ':'Ⅱ'),R.c,`${R.n}羁绊|${R.d2}${n>=3?'；'+R.d3:'（再 1 把：'+R.d3+'）'}`))}
  if(allRealms())b.push(chip('portal','万界','#ffffff','万界羁绊|集齐 4 个不同的界：全伤害 +20%'));return b.join('')+h});
(function(){const st=document.createElement('style');st.textContent=`#slots span.fuse{box-shadow:0 0 0 2px #ff2e6e,0 0 10px #3af0ff}#slots span .fz{position:absolute;left:-4px;top:-6px;width:14px;height:14px;display:block;color:#fff;filter:drop-shadow(0 0 2px #000)}#slots span .fz svg,#slots span .fz .pi{width:14px;height:14px}`;document.head.appendChild(st)})();

/* ============ 永夜挽歌 · 扩展 HUD ============
   目标追踪、增益状态、武器冷却、连斩、秒伤、精英血条、首领 / 深渊之门方位指示、低血量警示 */
const ebars=[];{const box=$('#ebars');for(let i=0;i<12;i++){const d=document.createElement('div');d.className='eb';d.innerHTML='<i></i>';box.appendChild(d);ebars.push(d)}}
let hudSlow=0,lastCombo=0;
function chip(icon,txt,col,tip,pct){return`<span class="chip" style="--c:${col}" data-tip="${esc(tip)}">${svg(icon)}<b>${txt}</b>${pct!=null?`<i style="width:${Math.max(0,Math.min(100,pct))}%"></i>`:''}</span>`}
function buffsHTML(){const r=P.rel,o=[];
  if(P.feast>0)o.push(chip('blood',P.feast.toFixed(1)+'s','#ff4a62','血宴|持续抽取周围亡者的血',P.feast/6*100));
  if(G.timeStop>0)o.push(chip('hourglass','凝滞','#7dd8c8','时间凝滞|亡者全部静止'));
  if(r.stopwatch&&G.timeStop<=0)o.push(chip('hourglass',Math.ceil(P.stopT)+'s','#7dd8c8','凝滞怀表|下次时间凝滞倒计时',(1-P.stopT/30)*100));
  if(P.feastStacks)o.push(chip('blood','×'+P.feastStacks,'#ff4a62','狂宴节拍|本层武器冷却 -'+P.feastStacks*3+'%'));
  if(r.vigil)o.push(chip('still',P.vigilUsed?'已用':P.stillT>=2?'就绪':Math.round(P.stillT/2*100)+'%','#7dd8c8','静默守夜|站定 2 秒后齐射 ×3',Math.min(100,P.stillT/2*100)));
  if(r.judgement)o.push(chip('bell',P.judge?P.judge.t.toFixed(0)+'s':Math.ceil(P.judgeCd)+'s','#c8a0ff',P.judge?'审判钟环生效中|环内所有单位受伤 +60%':'审判之钟|下次钟环倒计时',P.judge?P.judge.t/10*100:(1-P.judgeCd/30)*100));
  if(r.ouroboros)o.push(chip('snake',P.ouroT<=0?'护盾':Math.ceil(P.ouroT)+'s','#e8dcc4','衔尾蛇之匣|蛇骨护盾抵挡一次伤害',P.ouroT<=0?100:(1-P.ouroT/20)*100));
  if(r.thirst)o.push(chip('candle','+'+Math.round(P.thirst*100)+'%','#ffa040','渴血残烛|每次冲刺 -1%',P.thirst/.8*100));
  if(r.gcup)o.push(chip('chalice',Math.round(P.cupStore/(S.maxHp*.1)*100)+'%','#ff4a62','饕餮之杯|积液满后射出猩红颅骨',P.cupStore/(S.maxHp*.1)*100));
  if(r.midnight)o.push(chip('bell',P.bellN+'/'+Math.ceil(100/r.midnight),'#c8a0ff','午夜丧钟|满后钟声平分积蓄伤害',P.bellN/Math.ceil(100/r.midnight)*100));
  if(r.stigmata)o.push(chip('coin',RUN.gold>0?'金盾':'×2','#ffc860','圣痕账簿|金币替你承伤；没钱时受伤翻倍'));
  if(r.phoenix)o.push(chip('phoenix','×'+r.phoenix,'#ffa040','不死鸟之羽|死亡时复活一次'));
  if(r.boneshield)o.push(chip('boneshield',Math.floor(P.boneA||0),'#e8dcc4','白骨壁垒|骨甲层数',(P.boneA||0)/(10*r.boneshield)*100));
  if(r.thorns&&P.thornStore>0)o.push(chip('thorns',Math.round(P.thornStore),'#c05060','荆棘圣衣|下次冲刺释放'));
  if(r.coinpurse)o.push(chip('coinpurse','+'+Math.min(40,Math.floor(RUN.gold/50)*4)+'%','#ffc860','守墓人的契约|持有金币带来的伤害加成'));
  if(P.hm){const H=P.hm;if(r.sayan)o.push(chip('spiky',H.ssj>0?Math.ceil(H.ssj)+'s':Math.floor(H.rage)+'%','#ffd040',H.ssj>0?'金焰觉醒|'+['','一','二','三'][H.tier]+'阶':'怒发金焰|怒气',H.ssj>0?H.ssj/15*100:H.rage));if(r.command)o.push(chip('seal','×'+H.seals,'#ff3050','三道令咒|释放大招时消耗'));if(r.deathnote&&H.dn)o.push(chip('note',Math.ceil(H.dn.t)+'s','#c77dff','死神手记|'+H.dn.e.D.n,H.dn.t/40*100));if(r.zawarudo)o.push(chip('watch',H.zwOn?'停止':Math.ceil(H.zwT)+'s','#b8b8c8','灰色世界怀表',(1-H.zwT/25)*100));if(r.divergence)o.push(chip('meter',H.leapUsed?'已跳':'待命','#7dd8c8','世界线变动率计|本层可跳回一次'));if(r.sandevistan)o.push(chip('chip',H.sandCd>0?Math.ceil(H.sandCd)+'s':'就绪','#5affc0','义体·时滞加速',H.sandCd>0?(1-H.sandCd/12)*100:100));if(H.house)o.push(chip('hat',H.house.n.slice(0,1),H.house.c,H.house.n+'|'+H.house.d));if(r.spiritbomb&&(H.sb.on||H.sb.fly))o.push(chip('sphere',Math.round(H.sb.c/4*100)+'%','#8ad8ff','众生之力球|移动即掷出',H.sb.c/4*100))}
  if(P.curseLv>0)o.push(chip('obelisk','+'+Math.round(P.curseLv*100)+'%','#c77dff','诅咒|亡者永久变强'));
  if(P.rit&&P.rit.size)for(const k of P.rit)o.push(chip('altar',TAGS[k].n,TAGS[k].c,RITUALS[k].n+'|'+RITUALS[k].d));
  return o.join('')}
function objsHTML(){const cnt=t=>{const a=POIS.filter(p=>p.type===t);return[a.filter(p=>p.used).length,a.length]};
  const line=(type,txt,done,extra='')=>{const I=POI_INFO[type];return`<li class="${done?'done':''}" style="--c:${I.c}">${svg(I.icon)}<span>${txt}</span>${extra}</li>`};
  let bl;if(RUN.bossDead)bl=line('portal','进入深渊之门',false,'<em>!</em>');else if(RUN.bossSummoned&&boss)bl=line('boss','击败 '+esc(boss.name),false,`<em>${Math.ceil(boss.hp/boss.max*100)}%</em>`);else if(RUN.bossSummoned)bl=line('boss','首领苏醒中',false);else bl=line('boss','唤醒首领',false,`<em>${fmt(STAGE_T-RUN.stageT)}</em>`);
  const [c1,c2]=cnt('chest'),[s1,s2]=cnt('charge'),[b1,b2]=cnt('blood'),[o1,o2]=cnt('curse'),[n1,n2]=cnt('nest');
  return`<h4>${esc(STAGES[RUN.stage].n)} · 目标</h4><ul>${bl}${line('chest','宝箱',c1===c2,`<em>${c1}/${c2}</em>`)}${line('charge','充能神龛',s1===s2,`<em>${s1}/${s2}</em>`)}${line('blood','血之祭坛',b1===b2,`<em>${b1}/${b2}</em>`)}${line('curse',RUN.obelisk>0?'方尖碑守卫':'诅咒方尖碑',o1===o2&&RUN.obelisk<=0,`<em>${RUN.obelisk>0?RUN.obelisk+' 存活':o1+'/'+o2}</em>`)}${line('nest','眷属之巢',n1===n2,`<em>${n1}/${n2}</em>`)}</ul>`}
const _hv=new THREE.Vector3();
function toScreen(x,y,z){_hv.set(x,y,z).project(camera);return{x:(_hv.x*.5+.5)*innerWidth,y:(-_hv.y*.5+.5)*innerHeight,front:_hv.z<1}}
function hudExtra(dt){if(!P||!RUN)return;hudSlow-=dt;
  // 经验文字
  $('#xptxt').textContent=`LV ${P.lvl}  ·  ${Math.floor(P.xp)} / ${P.next}`;
  // 武器冷却
  const sp=$$('#slots span:not(.empty)');P.weapons.forEach((w,i)=>{const el=sp[i];if(!el)return;let c=el.querySelector('.cd');if(!c){c=document.createElement('i');c.className='cd';el.appendChild(c)}
    const total=w.cd*S.cd*cdDyn(),f=(w.id==='orbit')?0:Math.max(0,Math.min(1,w.t/total));c.style.setProperty('--p',(f*100).toFixed(0))});
  // 连斩
  const cb=$('#combo');if(RUN.combo>=5&&RUN.comboT>RUN.t){cb.style.opacity=1;cb.firstElementChild.textContent=RUN.combo;cb.className=RUN.combo>=200?'t4':RUN.combo>=100?'t3':RUN.combo>=40?'t2':'t1';
    if(RUN.combo!==lastCombo){cb.firstElementChild.style.transform='scale(1.35)';requestAnimationFrame(()=>cb.firstElementChild.style.transform='')}
    cb.lastElementChild.style.width=((RUN.comboT-RUN.t)/2.5*100)+'%'}else cb.style.opacity=0;lastCombo=RUN.combo;
  // 低血量
  const hr=P.hp/S.maxHp;$('#lowhp').style.opacity=hr<.3&&G.state==='play'?(.45+Math.sin(G.rt*6)*.25)*(1-hr/.3)+.2:0;
  // 精英 / 首领头顶血条
  const list=enemies.filter(e=>(e.elite||e.boss)&&!e.dead).sort((a,b)=>((a.x-P.x)**2+(a.z-P.z)**2)-((b.x-P.x)**2+(b.z-P.z)**2));
  for(let i=0;i<ebars.length;i++){const d=ebars[i],e=list[i];if(!e){d.style.display='none';continue}
    const h=(e.boss?4.6:2.4)*(e.s||1)*(e.boss?.85:1),s=toScreen(e.x,e.y+h,e.z);if(!s.front||s.x<-50||s.x>innerWidth+50||s.y<-20||s.y>innerHeight){d.style.display='none';continue}
    d.style.display='block';d.className='eb'+(e.boss?' boss':'');d.style.transform=`translate(${s.x}px,${s.y}px)`;d.firstElementChild.style.width=Math.max(0,e.hp/e.max*100)+'%'}
  // 方位指示：首领或深渊之门
  const arr=$('#edgearrow');let tg=null,lab='';const portal=POIS.find(p=>p.type==='portal');
  if(boss&&!boss.dead){tg=boss;lab=boss.name}else if(portal){tg={x:portal.x,y:portal.y+2,z:portal.z};lab='深渊之门'}
  if(tg&&G.state==='play'){const s=toScreen(tg.x,(tg.y||0)+2,tg.z),W=innerWidth,H=innerHeight,m=60,on=s.front&&s.x>m&&s.x<W-m&&s.y>m&&s.y<H-m;
    if(on)arr.style.opacity=0;else{let dx=s.x-W/2,dy=s.y-H/2;if(!s.front){dx=-dx;dy=-dy}const a=Math.atan2(dy,dx),rx=W/2-m,ry=H/2-m,k=1/Math.max(Math.abs(Math.cos(a))/rx,Math.abs(Math.sin(a))/ry);
      arr.style.opacity=1;arr.style.transform=`translate(${W/2+Math.cos(a)*k}px,${H/2+Math.sin(a)*k}px)`;arr.firstElementChild.style.transform=`rotate(${a}rad)`;
      arr.lastElementChild.textContent=`${lab} · ${Math.round(Math.hypot(tg.x-P.x,tg.z-P.z))}米`;arr.classList.toggle('portal',!boss)}}else arr.style.opacity=0;
  if(hudSlow>0)return;hudSlow=.25;
  // 秒伤
  const now=RUN.t,win=RUN.dmgWin||[];while(win.length&&now-win[0][0]>5)win.shift();let sum=0;for(const w of win)sum+=w[1];$('#dps').innerHTML=`<span>秒伤</span><b>${Math.round(sum/5).toLocaleString()}</b><span>连斩最高</span><b>${RUN.bestCombo||0}</b>`;
  $('#buffs').innerHTML=buffsHTML();$('#objs').innerHTML=objsHTML()}

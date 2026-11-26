/* ============ 万界乱斗 · 致敬猎人 ============
   用"原型特征组合"营造熟悉感：不复刻任何具体角色的服装、配色组合或标志。 */
function baseHero(g,f,view,c){const b=WALK.bob[f],sw=WALK.sw[f],back=view==='back';
  heroLegs(g,f,{legs:c.legs,boots:c.boots},12,36+b);
  const top=g.part(c.top),topD=g.part(c.topD||c.top),sl=g.part(c.sleeve||c.top),hand=g.part(c.hand||c.skin),skin=g.part(c.skin),hair=g.part(c.hair);
  const hem=c.long?42:35;g.poly(top,[[10,19+b],[22,19+b],[c.long?26:23,hem+b],[c.long?6:9,hem+b]]);
  if(c.open&&!back)g.rect(topD,15,21+b,2,hem-21);if(back&&c.long)g.rect(topD,15,23+b,2,hem-23);
  if(!c.noArms){g.rect(sl,7,20+b-sw,3,11);g.rect(sl,22,20+b+sw,3,11);g.rect(hand,7,31+b-sw,3,2);g.rect(hand,22,31+b+sw,3,2)}
  g.ell(back?hair:skin,16,13+b,5,5.5);return{b,sw,back,top,topD,sl,hand,skin,hair}}
const eyes=(g,b,col,y=13)=>{const e=g.part(col,{flat:1,noOutline:1});g.px(e,14,y+b);g.px(e,18,y+b)};
function drawFighter(g,f,view){const o=baseHero(g,f,view,{top:'#9a2020',topD:'#6a1010',legs:'#8a1c1c',boots:'#1e2236',skin:'#e8c4a0',hair:'#141018'}),{b,sw,back}=o;
  const belt=g.part('#141018'),under=g.part('#1a1a24'),band=g.part('#3a3a54');
  if(!back)g.poly(under,[[14,19+b],[18,19+b],[16,24+b]]);g.rect(belt,10,29+b,12,2);if(!back){g.rect(belt,12,31+b,2,4);g.rect(belt,18,31+b,2,3)}
  g.rect(band,7,29+b-sw,3,2);g.rect(band,22,29+b+sw,3,2);
  g.poly(o.hair,[[10,13+b],[6,6+b],[11,8+b],[10,1+b],[14,6+b],[16,-1+b],[18,6+b],[22,1+b],[21,8+b],[26,6+b],[22,13+b],[21,10+b],[11,10+b]]);
  if(!back){eyes(g,b,'#141018',14);const br=g.part('#141018',{flat:1});g.px(br,13,12+b);g.px(br,19,12+b)}}
function drawStudent(g,f,view){const o=baseHero(g,f,view,{top:'#24263c',topD:'#16182a',legs:'#3c3c48',boots:'#141014',skin:'#ecd2bc',hair:'#16141c',open:1}),{b,sw,back}=o;
  const shirt=g.part('#eae6e0'),tie=g.part('#b01c2c'),mask=g.part('#f8f4ec'),btn=g.part('#c9a35a',{flat:1});
  if(!back){g.poly(shirt,[[14,19+b],[18,19+b],[17,25+b],[15,25+b]]);g.rect(tie,15,21+b,2,5);g.px(btn,12,26+b);g.px(btn,20,26+b);
    g.ell(mask,24,33+b+sw,3,2.4);const slit=g.part('#140a10',{flat:1,noOutline:1});g.px(slit,23,33+b+sw);g.px(slit,25,33+b+sw)}
  g.poly(o.hair,[[11,13+b],[10,8+b],[13,6+b],[19,6+b],[22,9+b],[21,13+b],[20,10+b],[14,10+b],[12,15+b]]);
  if(!back)eyes(g,b,'#3a5aa0',14)}
function drawStandUser(g,f,view){const o=baseHero(g,f,view,{top:'#3a2458',topD:'#24143a',legs:'#24142e',boots:'#120a14',skin:'#e4c8b0',hair:'#18121e',long:1,open:1}),{b,sw,back}=o;
  const gold=g.part('#e8c048',{flat:1}),shirt=g.part('#e8586a');
  if(!back){g.rect(shirt,14,20+b,4,8);for(let i=0;i<4;i++)g.px(gold,12,22+b+i*3);g.line(gold,18,28+b,23,33+b,1);g.px(gold,16,19+b)}
  g.poly(o.hair,[[11,12+b],[10,7+b],[13,3+b],[18,1+b],[23,3+b],[22,8+b],[21,12+b],[20,9+b],[12,9+b]]);
  if(!back){eyes(g,b,'#1a8a6a',14);g.rect(o.sl,22,13+b,3,8);g.rect(o.hand,22,11+b,3,2)}}
function drawCyber(g,f,view){const o=baseHero(g,f,view,{top:'#2a1638',topD:'#18101e',legs:'#14141c',boots:'#0c0c12',skin:'#d4b098',hair:'#1a1a22',sleeve:'#ff2a8a'}),{b,sw,back}=o;
  const neon=g.part('#2affe8',{flat:1}),metal=g.part('#a8b4c4'),pink=g.part('#ff2a8a',{flat:1}),eye=g.part('#2affe8',{flat:1,noOutline:1});
  g.line(neon,10,20+b,10,34+b,1);g.line(neon,22,20+b,22,34+b,1);
  g.rect(metal,22,20+b+sw,3,11);g.rect(neon,23,22+b+sw,1,8);g.line(metal,24,31+b+sw,27,38+b+sw,1.4);
  g.poly(o.hair,[[11,13+b],[11,7+b],[16,5+b],[21,7+b],[21,10+b],[16,9+b]]);g.rect(pink,17,5+b,3,4);
  if(!back){const e=g.part('#141018',{flat:1});g.px(e,14,13+b);g.px(eye,18,13+b);g.px(eye,19,13+b);g.px(neon,20,14+b)}}
function drawWizard(g,f,view){const o=baseHero(g,f,view,{top:'#16121c',topD:'#0c0a10',legs:'#1c1820',boots:'#0c0a0e',skin:'#ecd0b8',hair:'#140e10',long:1}),{b,sw,back}=o;
  const s1=g.part('#a01c24'),s2=g.part('#d8a838'),wand=g.part('#5a3a22'),tip=g.part('#e8f4ff',{flat:1,noOutline:1}),rim=g.part('#c8a050',{flat:1,noOutline:1});
  for(let x=11;x<22;x++)g.px((x>>1)%2?s1:s2,x,19+b);for(let y=20;y<28;y++)g.px((y>>1)%2?s1:s2,back?11:19,y+b);
  if(!back){g.line(wand,24,32+b+sw,28,25+b+sw,1);g.px(tip,28,24+b+sw)}
  g.poly(o.hair,[[10,14+b],[10,8+b],[13,6+b],[16,7+b],[19,5+b],[22,8+b],[22,14+b],[20,10+b],[16,11+b],[12,10+b]]);
  if(!back){for(const cx of[14,18]){g.px(rim,cx-1,13+b);g.px(rim,cx+1,13+b);g.px(rim,cx,12+b);g.px(rim,cx,14+b)}eyes(g,b,'#3a8a4a',13);g.px(rim,16,13+b)}}
function drawMerc(g,f,view){const o=baseHero(g,f,view,{top:'#8a1622',topD:'#5a0c16',legs:'#7a1420',boots:'#1a1a1e',skin:'#8a1622',hair:'#8a1622',hand:'#2a2a2e'}),{b,sw,back}=o;
  const strap=g.part('#4a4a52'),pouch=g.part('#3a3a40'),hilt=g.part('#2a2a30'),wrap=g.part('#c8c0b0'),lens=g.part('#f4f4f4',{flat:1,noOutline:1});
  g.line(hilt,10,16+b,6,2+b,1.4);g.line(hilt,22,16+b,26,2+b,1.4);g.line(wrap,8,9+b,7,5+b,1);g.line(wrap,24,9+b,25,5+b,1);
  g.line(strap,10,20+b,21,30+b,1.4);g.line(strap,22,20+b,11,30+b,1.4);g.rect(strap,10,30+b,12,2);g.rect(pouch,11,31+b,2,3);g.rect(pouch,19,31+b,2,3);
  if(!back){g.poly(lens,[[12,12+b],[15,12+b],[14,14+b]]);g.poly(lens,[[17,12+b],[20,12+b],[18,14+b]])}else g.line(o.topD,16,8+b,16,18+b,1)}
function drawDebater(g,f,view){const o=baseHero(g,f,view,{top:'#4a4e5c',topD:'#30323c',legs:'#24242c',boots:'#141014',skin:'#ecd4c0',hair:'#8a5a3a',open:1}),{b,sw,back}=o;
  const hood=g.part('#22345a'),bullet=g.part('#ffd860',{flat:1}),glow=g.part('#fff0b0',{flat:1,noOutline:1});
  if(!back){g.poly(hood,[[13,19+b],[19,19+b],[18,33+b],[14,33+b]]);g.rect(bullet,23,30+b+sw,2,3);g.px(glow,23,29+b+sw)}else g.poly(hood,[[11,18+b],[21,18+b],[20,23+b],[12,23+b]]);
  g.poly(o.hair,[[10,14+b],[10,8+b],[13,6+b],[19,6+b],[22,8+b],[22,14+b],[20,10+b],[12,10+b]]);g.line(o.hair,16,6+b,18,0+b,1);g.px(o.hair,19,0+b);
  if(!back)eyes(g,b,'#5a8a4a',14)}
function drawScientist(g,f,view){const o=baseHero(g,f,view,{top:'#eceae4',topD:'#bcbab4',legs:'#2a2a32',boots:'#1a1418',skin:'#e4c8b0',hair:'#1a1416',long:1,open:1}),{b,sw,back}=o;
  const shirt=g.part('#1c1c24'),phone=g.part('#3a3a44'),scr=g.part('#8af4ff',{flat:1,noOutline:1}),stub=g.part('#9a8070',{flat:1,noOutline:1});
  if(!back){g.rect(shirt,14,19+b,4,16);g.rect(o.sl,22,14+b,3,7);g.rect(o.hand,22,12+b,3,2);g.rect(phone,21,11+b,2,4);g.px(scr,21,12+b);g.px(stub,15,17+b);g.px(stub,17,17+b)}
  g.poly(o.hair,[[10,14+b],[9,7+b],[12,8+b],[12,4+b],[15,6+b],[17,3+b],[19,6+b],[22,5+b],[21,9+b],[23,11+b],[22,14+b],[20,10+b],[12,10+b]]);
  if(!back)eyes(g,b,'#2a2028',14)}

const NEW_HUNTERS={
  fighter:{n:'金焰武斗家',t:'愤怒点燃金色的武者',icon:'spiky',w:'aura',coat:0x9a2020,acc:0xffd040,hp:120,armor:1,relics:['sayan','spiritbomb'],
    p:'自带「怒发金焰」「众生之力球」；怒气积攒速度 ×2。',ult:{n:'双掌光束',d:'双掌合蓄，向前方放出贯穿一切的巨大光束。'},draw:drawFighter},
  student:{n:'面具学生',t:'内心藏着另一个人格',icon:'hmask',w:'frost',coat:0x24263c,acc:0xb01c2c,hp:100,armor:0,relics:['persona','persona'],
    p:'自带两层「人格面具」（技能冷却减半）。',ult:{n:'全员围殴',d:'召集伙伴一拥而上，烟尘中痛殴周围所有敌人并使其眩晕。'},draw:drawStudent},
  standuser:{n:'替身使者',t:'摆着华丽姿势的灵体主人',icon:'fist',w:'orbit',coat:0x3a2458,acc:0xe8c048,hp:110,armor:0,relics:['stand','stand'],
    p:'自带两层「灵魂替身」（连打更频繁）。',ult:{n:'连打风暴',d:'替身冲进敌人群，逐一对周围每名敌人打出连拳。'},draw:drawStandUser},
  cyber:{n:'霓虹义体佣兵',t:'改造到骨头里的街头传说',icon:'chip',w:'scythe',coat:0x2a1638,acc:0xff2a8a,hp:95,armor:0,relics:['sandevistan','quickhack'],
    p:'自带「义体·时滞加速」「骇入义眼」；冲刺冷却 -30%。',ult:{n:'系统崩溃',d:'对视野内所有敌人发动骇入：短路、眩晕、感电。'},draw:drawCyber},
  wizard:{n:'学院巫师',t:'戴着圆框眼镜的魔杖使',icon:'stag',w:'bolt',coat:0x16121c,acc:0xd8a838,hp:95,armor:0,relics:['patronus','sortinghat'],
    p:'自带「银色守护兽」「分院之帽」；经验获取 +15%。',ult:{n:'守护兽群',d:'六头银色雄鹿向四面八方冲锋。'},draw:drawWizard},
  merc:{n:'嘴炮佣兵',t:'话太多的不死雇佣兵',icon:'katana',w:'dagger',coat:0x8a1622,acc:0xf4f4f4,hp:140,armor:0,relics:['deadpool'],
    p:'自带「嘴炮佣兵的面罩」；生命上限 +40。',ult:{n:'打破第四面墙',d:'直接抄起屏幕上的界面，砸向视野内所有敌人。'},draw:drawMerc},
  debater:{n:'学级辩手',t:'头顶一根呆毛的辩论者',icon:'bullet',w:'dagger',coat:0x4a4e5c,acc:0xffd860,hp:95,armor:0,relics:['truthbullet','truthbullet'],
    p:'自带两层「真相言弹」（发射频率翻倍）。',ult:{n:'学级裁判',d:'当场开庭：视野内的精英与首领被驳倒，普通敌人直接崩溃。'},draw:drawDebater},
  scientist:{n:'疯狂科学家',t:'自称来自未来的研究员',icon:'meter',w:'frost',coat:0xeceae4,acc:0x8af4ff,hp:100,armor:0,relics:['divergence','stopwatch'],
    p:'自带「世界线变动率计」「凝滞怀表」。',ult:{n:'时间跳跃',d:'跳回过去：生命回到 5 秒前的最高值，武器与冲刺冷却全部重置，时间停止 2 秒。'},draw:drawScientist},
};
const HERO_PORTRAIT={};
(function(){for(const[id,H]of Object.entries(NEW_HUNTERS)){HUNTERS[id]=H;const cv=PXG.sheet(32,48,8,(g,f)=>H.draw(g,f%4,f>=4?'back':'front'));SPR2[id]={w:32,h:48,canvas:cv};
    HERO_PX[id]=new PixKind(SPR2[id],4,4,2.4,10,8)}
  for(const id in HUNTERS){const s=SPR2[id];if(!s)continue;const c=document.createElement('canvas');c.width=32;c.height=48;c.getContext('2d').drawImage(s.canvas,0,0,32,48,0,0,32,48);HERO_PORTRAIT[id]=c.toDataURL()}})();
function heroPortrait(id){return HERO_PORTRAIT[id]?`<img class="pxport" src="${HERO_PORTRAIT[id]}" alt="">`:''}

/* ---------- 开局：自带遗物与天赋 ---------- */
wrapHook('newRun',o=>(h,d)=>{o(h,d);HU.beam=null;HU.rush=null;HU.stags=[];const H=HUNTERS[h];if(H.relics)for(const id of H.relics)addRelic(id);if(h==='merc'){P.b.hp+=40;stats();P.hp=S.maxHp}if(h==='wizard'){P.b.xp+=.15;stats()}});
wrapHook('relicStats',o=>()=>{o();if(P.hunter==='cyber')S.dashCd*=.7});
wrapHook('homageOnKill',o=>(e,op)=>{o(e,op);if(P.hunter==='fighter'&&P.hm&&P.hm.ssj<=0)P.hm.rage=Math.min(100,P.hm.rage+1.1)});

/* ---------- 专属大招 ---------- */
const HU={beam:null,rush:null,stags:[]};
const STAGS_PX=new PixKind({w:48,h:40,canvas:PXG.sheet(48,40,4,(g,f)=>drawStag(g,f))},4,0,2,8,10);
function hunterUlt(){const id=P.hunter,H=HUNTERS[id];P.ult-=100;AU.sfx('ult');G.shake=.6;ultFx=1;ultRing.material.color.set(H.acc);
  if(P.rel.echo)for(let i=0;i<P.rel.echo;i++)P.echoQ.push({t:1.5+i*.6,x:P.x,y:P.y,z:P.z});if(P.rel.grail)healP(S.maxHp*.3,true);banner(H.ult.n,'');
  if(id==='fighter'){const t=nearest(P.x,P.z,30);HU.beam={a:t?Math.atan2(t.x-P.x,t.z-P.z):P.face,t:1.4,k:0}}
  else if(id==='student'){G.flash=.3;HU.allout=.5}
  else if(id==='standuser'){HU.rush={list:inRange(P.x,P.z,9).sort((a,b)=>b.max-a.max).slice(0,30),k:0}}
  else if(id==='cyber'){inRange(P.x,P.z,22).forEach((e,i)=>{if(i<16)drawChain({x:P.x,y:P.y,z:P.z},e);hit(e,70,{el:'volt',src:'ult',np:1});if(!e.boss)e.st.frozen=Math.max(e.st.frozen,2.2);if(i%4===0)showReact(e,pick(['短路','系统崩溃','过载']))});G.flash=.25}
  else if(id==='wizard'){for(let i=0;i<6;i++){const a=i/6*TAU+rand(0,.4);HU.stags.push({x:P.x,z:P.z,a,t:0,hit:new Set()})}}
  else if(id==='merc'){$('#hud').classList.add('wobble');setTimeout(()=>$('#hud').classList.remove('wobble'),900);toast('第四面墙',pick(QUIPS),'katana');
    inRange(P.x,P.z,25).forEach(e=>{const v=e.boss?e.max*.06:e.hp*.3+40;hit(e,v/S.dmg/dynMul(),{src:'ult',np:1,kb:8,fx:e.x-P.x,fz:e.z-P.z})});G.shake=1}
  else if(id==='debater'){banner('论破！','学级裁判，开庭');inRange(P.x,P.z,22).forEach(e=>{if(e.elite||e.boss){const v=e.boss?e.max*.06:e.hp*.25;e.hp-=v;track('ult',v);showReact(e,'论破！')}hit(e,e.elite||e.boss?40:140,{src:'ult',np:1,kb:6,fx:e.x-P.x,fz:e.z-P.z})});G.flash=.3}
  else if(id==='scientist'){const h=P.hm;let best=P.hp;if(h&&h.hist.length)for(const s of h.hist.slice(-10))best=Math.max(best,s.hp);P.hp=Math.max(best,P.hp);for(const w of P.weapons)w.t=0;P.dash=0;G.timeStop=Math.max(G.timeStop,2);G.flash=.5;showReact({x:P.x,y:P.y+2,z:P.z,s:1},'时间跳跃')}
  if(typeof homageUlt==='function')homageUlt()}
wrapHook('castUlt',o=>()=>{if(!P||P.ult<100||G.state!=='play')return;if(NEW_HUNTERS[P.hunter])hunterUlt();else o()});
function hunterUpdate(dt){
  if(HU.allout!=null){HU.allout-=dt;if(HU.allout<=0){HU.allout=null;const t=inRange(P.x,P.z,10);t.forEach(e=>{hit(e,160,{src:'ult',np:1,kb:6,fx:e.x-P.x,fz:e.z-P.z});if(!e.boss)e.st.frozen=Math.max(e.st.frozen,1.5);burst(e.x,e.y+1,e.z,0xe8e0d0,6,7)});fxRing(P.x,P.z,10,0xffffff);showReact({x:P.x,y:P.y+2,z:P.z,s:1},'全员围殴！');G.shake=.8}}
  if(HU.beam){const B=HU.beam;B.t-=dt;B.k-=dt;if(B.k<=0){B.k=.16;const len=30,w=2.4,dx=Math.sin(B.a),dz=Math.cos(B.a);const bm=beams.find(b=>b.life<=0)||beams[0];bm.life=.18;bm.m.visible=true;bm.m.material.color.set(0x9ae8ff);
      bm.m.position.set(P.x+dx*len/2,P.y+1.2,P.z+dz*len/2);bm.m.scale.set(w*1.4,.6,len);bm.m.rotation.set(0,B.a,0);
      query(P.x+dx*len/2,P.z+dz*len/2,len/2+2,e=>{const px=e.x-P.x,pz=e.z-P.z,t=px*dx+pz*dz;if(t<0||t>len)return;if(Math.abs(px*dz-pz*dx)<w+e.r*.6)hit(e,55,{src:'ult',np:1,kb:5,fx:dx,fz:dz})});G.shake=Math.max(G.shake,.25)}
    if(B.t<=0)HU.beam=null}
  if(HU.rush){const R=HU.rush;R.k-=dt;if(R.k<=0){R.k=.07;const e=R.list.shift();if(!e)HU.rush=null;else if(!e.dead){hit(e,45,{src:'ult',np:1,kb:3,fx:e.x-P.x,fz:e.z-P.z});burst(e.x,e.y+1.2,e.z,0xb090ff,4,5);if(P.hm)P.hm.bar={t:e,n:2,k:0};if(R.list.length%5===0)showReact(e,'连打！')}}}
  for(const s of HU.stags){s.t+=dt;s.x+=Math.sin(s.a)*15*dt;s.z+=Math.cos(s.a)*15*dt;query(s.x,s.z,1.8,e=>{if(s.hit.has(e))return;if((e.x-s.x)**2+(e.z-s.z)**2<4){s.hit.add(e);hit(e,80,{el:'frost',src:'ult',np:1,kb:8,fx:Math.sin(s.a),fz:Math.cos(s.a)})}})}
  HU.stags=HU.stags.filter(s=>s.t<1.3)}
wrapHook('relicUpdate',o=>dt=>{o(dt);hunterUpdate(dt)});
wrapHook('homageRender',o=>()=>{o();STAGS_PX.begin();if(P)for(const s of HU.stags)STAGS_PX.add(s.x,hAt(s.x,s.z)+.2,s.z,0,1,G.rt+s.a,0,null,null,Math.sin(s.a-camYaw())<0,false);STAGS_PX.end()});

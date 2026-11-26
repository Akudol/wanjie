/* ============ 万界乱斗 · 第二批致敬猎人 ============
   只取原型特征组合，不复刻具体角色的服装、配色组合与标志。 */
function drawLawyer(g,f,view){const o=baseHero(g,f,view,{top:'#2a48a0',topD:'#1a2e70',legs:'#22367a',boots:'#141018',skin:'#ecd2bc',hair:'#16121a',open:1,noArms:1}),{b,sw,back}=o;
  const shirt=g.part('#eeeae4'),tie=g.part('#c01c2c'),badge=g.part('#e8c048',{flat:1});
  g.rect(o.sl,7,20+b-sw,3,11);g.rect(o.hand,7,31+b-sw,3,2);
  if(!back){g.poly(shirt,[[14,19+b],[18,19+b],[17,26+b],[15,26+b]]);g.rect(tie,15,21+b,2,6);g.px(badge,11,23+b);g.rect(o.sl,22,20+b,9,3);g.rect(o.hand,31,20+b,1,2);g.rect(o.hand,29,19+b,2,1)}else g.rect(o.sl,22,20+b+sw,3,11);
  g.poly(o.hair,[[10,13+b],[10,8+b],[13,5+b],[18,5+b],[24,3+b],[22,7+b],[27,7+b],[22,10+b],[22,13+b],[20,9+b],[12,9+b]]);if(!back)eyes(g,b,'#2a2028',14)}
function drawLeon(g,f,view){const o=baseHero(g,f,view,{top:'#5a3a24',topD:'#3a2414',legs:'#2e3440',boots:'#18141a',skin:'#ecd0b4',hair:'#b8904a'}),{b,sw,back}=o;
  const vest=g.part('#2a2e2a'),strap=g.part('#18181a'),gun=g.part('#2a2a30'),fur=g.part('#c8b090');
  g.rect(fur,11,18+b,10,2);if(!back){g.poly(vest,[[12,21+b],[20,21+b],[20,31+b],[12,31+b]]);g.line(strap,12,22+b,20,30+b,1);g.rect(gun,23,31+b+sw,4,2);g.rect(gun,26,33+b+sw,1,2)}else g.rect(strap,11,23+b,10,1);
  g.poly(o.hair,[[11,12+b],[11,8+b],[14,6+b],[20,6+b],[22,9+b],[21,12+b],[18,10+b],[17,15+b],[15,10+b]]);if(!back){const e=g.part('#3a5a8a',{flat:1,noOutline:1});g.px(e,14,14+b)}}
function drawDante(g,f,view){const o=baseHero(g,f,view,{top:'#b41c24',topD:'#14101a',legs:'#2a1a1a',boots:'#120c0e',skin:'#ecd2c0',hair:'#ececf2',long:1,open:1}),{b,sw,back}=o;
  const blade=g.part('#d0d4e0'),hilt=g.part('#3a2a2a'),gun1=g.part('#d8d8e0'),gun2=g.part('#1c1c22');
  g.line(blade,7,40+b,24,4+b,2);g.rect(hilt,22,2+b,4,4);
  if(!back){g.rect(gun1,4,31+b-sw,4,2);g.rect(gun2,24,31+b+sw,4,2)}
  g.poly(o.hair,[[10,14+b],[9,8+b],[12,4+b],[16,5+b],[20,3+b],[23,7+b],[22,14+b],[20,9+b],[17,12+b],[14,9+b],[12,12+b]]);if(!back)eyes(g,b,'#5a7ab8',14)}
function drawVergil(g,f,view){const o=baseHero(g,f,view,{top:'#24306e',topD:'#141a44',legs:'#1c1e2e',boots:'#0e0c12',skin:'#ecd2c0',hair:'#e8ecf4',long:1,open:1}),{b,sw,back}=o;
  const trim=g.part('#c8a050',{flat:1}),sheath=g.part('#1a2250'),hilt=g.part('#e8e8f0');
  g.line(trim,10,20+b,6,41+b,1);g.line(trim,22,20+b,26,41+b,1);g.line(sheath,6,30+b,2,44+b,1.6);g.line(hilt,6,30+b,8,27+b,1.4);
  g.poly(o.hair,[[10,12+b],[11,7+b],[14,5+b],[20,5+b],[22,8+b],[22,12+b],[20,8+b],[12,8+b]]);if(!back)eyes(g,b,'#5a7ab8',13)}
function drawStriker(g,f,view){const o=baseHero(g,f,view,{top:'#14161e',topD:'#0c0e14',legs:'#14161e',boots:'#e8e8ec',skin:'#ecd2bc',hair:'#2a2640'}),{b,sw,back}=o;
  const neon=g.part('#2a8aff',{flat:1}),ball=g.part('#f4f4f4'),pent=g.part('#1a1a1a',{flat:1,noOutline:1});
  g.line(neon,11,20+b,9,35+b,1);g.line(neon,21,20+b,23,35+b,1);g.rect(neon,12,27+b,8,1);
  if(!back){g.ell(ball,22+sw*2,44,3,3);g.px(pent,22+sw*2,44);g.px(pent,21+sw*2,43)}
  g.poly(o.hair,[[10,13+b],[10,7+b],[13,5+b],[19,5+b],[22,7+b],[22,13+b],[20,10+b],[17,12+b],[15,9+b],[12,11+b]]);if(!back)eyes(g,b,'#2a8aff',14)}
function drawDazai(g,f,view){const o=baseHero(g,f,view,{top:'#c8b88a',topD:'#a8986c',legs:'#2a2a30',boots:'#1a1416',skin:'#ecd2bc',hair:'#5a3a28',long:1,open:1}),{b,sw,back}=o;
  const band=g.part('#f2f0ea'),vest=g.part('#2a2a30');
  if(!back)g.rect(vest,14,20+b,4,15);g.rect(band,13,17+b,6,2);g.rect(band,7,29+b-sw,3,2);g.rect(band,22,29+b+sw,3,2);
  g.poly(o.hair,[[10,14+b],[9,8+b],[12,5+b],[16,6+b],[20,5+b],[23,8+b],[22,14+b],[20,10+b],[17,12+b],[14,10+b],[12,13+b]]);if(!back)eyes(g,b,'#6a3a2a',14)}
function drawTitan(g,f,view){const b=WALK.bob[f],sw=WALK.sw[f],back=view==='back';heroLegs(g,f,{legs:'#2a3672',boots:'#c8a038'},11,36+b,7);
  const suit=g.part('#2a3a7a'),gold=g.part('#d8a838'),skin=g.part('#8a6aa8'),chin=g.part('#6a4a88'),glove=g.part('#e0b040');
  g.poly(suit,[[7,17+b],[25,17+b],[24,37+b],[8,37+b]]);g.poly(gold,[[6,16+b],[12,16+b],[11,22+b],[5,21+b]]);g.poly(gold,[[26,16+b],[20,16+b],[21,22+b],[27,21+b]]);g.rect(gold,8,30+b,16,2);
  g.rect(skin,3,20+b-sw,4,11);g.rect(skin,25,20+b+sw,4,10);g.ell(glove,27,32+b+sw,3,3);
  if(!back){for(const[c,x]of[['#ff3040',26],['#40a0ff',28],['#ffe040',27],['#40e080',25]]){const gp=g.part(c,{flat:1,noOutline:1});g.px(gp,x,31+b+sw)}}
  g.ell(skin,16,11+b,6,6.5);if(!back){g.line(chin,13,15+b,14,17+b,1);g.line(chin,19,15+b,18,17+b,1);eyes(g,b,'#20d8ff',11)}g.rect(gold,10,3+b,12,4);g.poly(gold,[[10,7+b],[22,7+b],[22,10+b],[10,10+b]])}
function drawNinja(g,f,view){const o=baseHero(g,f,view,{top:'#d4d8e2',topD:'#8a8e9a',legs:'#c8ccd6',boots:'#3a3e48',skin:'#d4d8e2',hair:'#eceef4',sleeve:'#2a2e38'}),{b,sw,back}=o;
  const black=g.part('#1a1c22'),visor=g.part('#ff2030',{flat:1,noOutline:1}),blade=g.part('#e8eef8'),edge=g.part('#ff4050',{flat:1});
  g.rect(black,13,22+b,6,10);g.line(black,10,36+b,10,44,1);g.line(black,21,36+b,21,44,1);
  g.line(blade,24,32+b+sw,30,14+b+sw,1.4);g.line(edge,25,31+b+sw,30,16+b+sw,1);
  g.poly(o.hair,back?[[10,8+b],[22,8+b],[22,14+b],[18,30+b],[14,30+b],[10,14+b]]:[[10,9+b],[22,9+b],[22,11+b],[10,11+b]]);
  if(!back){g.rect(black,11,12+b,10,3);g.rect(visor,12,13+b,8,1)}}
function drawChemist(g,f,view){const o=baseHero(g,f,view,{top:'#e0c030',topD:'#b89a20',legs:'#e0c030',boots:'#2a2a2a',skin:'#e0c030',hair:'#e0c030',sleeve:'#d8b828',hand:'#2a3a2a'}),{b,sw,back}=o;
  const mask=g.part('#2a2a2e'),glass=g.part('#8ad8ff',{flat:1,noOutline:1}),flask=g.part('#40c8ff',{flat:1}),zip=g.part('#8a7a20',{flat:1});
  if(!back){g.rect(zip,16,20+b,1,15);g.ell(mask,16,15+b,3,2);g.rect(glass,13,11+b,6,2);g.rect(flask,23,30+b+sw,3,4);g.px(glass,24,29+b+sw)}
  g.ell(o.hair,16,10+b,6,4)}
function drawSwordsman(g,f,view){const o=baseHero(g,f,view,{top:'#2a2a30',topD:'#18181c',legs:'#24242a',boots:'#121214',skin:'#d8b8a0',hair:'#14121a',sleeve:'#3a3a40'}),{b,sw,back}=o;
  const slab=g.part('#6a6c74'),hilt=g.part('#3a2a1e'),metal=g.part('#8a8e98'),brand=g.part('#d01c2c',{flat:1,noOutline:1}),cape=g.part('#1c1416');
  if(back)g.poly(cape,[[9,18+b],[23,18+b],[25,40+b],[7,40+b]]);
  g.poly(slab,[[3,42],[7,44],[28,6+b],[24,3+b]]);g.line(hilt,27,5+b,30,1+b,1.6);
  g.rect(metal,7,20+b-sw,3,11);g.rect(metal,7,31+b-sw,3,2);
  g.poly(o.hair,[[10,13+b],[10,7+b],[12,4+b],[15,7+b],[17,3+b],[19,7+b],[22,5+b],[22,13+b],[20,9+b],[12,9+b]]);if(!back){eyes(g,b,'#2a2028',14);g.px(brand,18,18+b)}}
function drawFalcon(g,f,view){const o=baseHero(g,f,view,{top:'#e8ecf4',topD:'#b8c0d0',legs:'#d8dce6',boots:'#8a94a8',skin:'#f0e4dc',hair:'#f4f4fa',long:1}),{b,sw,back}=o;
  const blue=g.part('#3a5aa8'),cape=g.part('#f4f6fa'),blade=g.part('#e8f0ff');
  g.rect(blue,12,25+b,8,1);g.rect(blue,15,20+b,2,5);if(back)g.poly(cape,[[8,18+b],[24,18+b],[28,44],[4,44]]);
  if(!back)g.line(blade,24,32+b+sw,24,14+b+sw,1);
  g.poly(o.hair,[[9,20+b],[9,9+b],[12,5+b],[20,5+b],[23,9+b],[23,20+b],[21,13+b],[20,9+b],[12,9+b],[11,13+b]]);if(!back)eyes(g,b,'#6a8ab8',14)}

const H2={
  lawyer:{n:'逆转律师',t:'指着对方大喊的辩护人',icon:'finger',w:'objection',coat:0x2a48a0,acc:0xe8c048,hp:100,armor:0,relics:['lens'],pn:'逆转',p:'生命低于 30% 时伤害 ×1.6。',ult:{n:'证据确凿',d:'眩晕视野内全部敌人，并把敌方弹幕反弹回去。'},draw:drawLawyer},
  leon:{n:'生还警探',t:'在丧尸城活下来的新人',icon:'gun',w:'handgun',coat:0x5a3a24,acc:0xb8904a,hp:110,armor:1,relics:[],pn:'求生',p:'暴击率 +15%。',ult:{n:'回旋踢',d:'一记回旋踢踹飞周围所有敌人，短暂无敌。'},draw:drawLeon},
  dante:{n:'红衣魔狩',t:'穿红风衣的恶魔猎人',icon:'twin',w:'rebellion',coat:0xb41c24,acc:0xececf2,hp:120,armor:0,relics:[],pn:'风格',p:'连斩越高评价越高（D→SSS），每级伤害 +6%。',ult:{n:'魔人化',d:'10 秒内化身魔人：伤害 ×1.6、移速 +20%、每秒回复 3% 生命。'},draw:drawDante},
  vergil:{n:'蓝衣剑魔',t:'追求力量的孤高剑客',icon:'cuts',w:'yamato',coat:0x24306e,acc:0xe8ecf4,hp:105,armor:0,relics:['stopwatch'],pn:'瞬步',p:'冲刺冷却 -40%，冲刺穿过的敌人被斩伤。',ult:{n:'绝次元',d:'收刀一瞬，周围空间被数十道次元斩撕裂。'},draw:drawVergil},
  striker:{n:'利己前锋',t:'只为进球而生的前锋',icon:'ball2',w:'striker',coat:0x14161e,acc:0x2a8aff,hp:100,armor:0,relics:['feather'],pn:'利己',p:'连斩每 5 次伤害 +1%（最多 +30%）。',ult:{n:'直接射门',d:'全力一脚，巨球贯穿前方一切。'},draw:drawStriker},
  dazai:{n:'绷带侦探',t:'缠满绷带、总想着解脱的侦探',icon:'note',w:'nullify',coat:0xc8b88a,acc:0xf2f0ea,hp:95,armor:0,relics:['codex'],pn:'失格',p:'受到的伤害有 35% 几率被无效化。',ult:{n:'人间失格',d:'6 秒内一切攻击对你无效，首领技能停摆，精英失去强化。'},draw:drawDazai},
  titan:{n:'紫晶暴君',t:'戴着六晶手套的泰坦',icon:'gaunt',w:'gauntlet',coat:0x8a6aa8,acc:0xd8a838,hp:200,armor:2,relics:['crown'],pn:'泰坦',p:'生命 200、护甲 2，但移速 -10%。',ult:{n:'响指',d:'打个响指，场上一半的普通敌人化为尘埃，首领损失 15% 生命。'},draw:drawTitan},
  ninja:{n:'改造忍者',t:'全身义体的高频刀剑士',icon:'rapier',w:'hfblade',coat:0xd4d8e2,acc:0xff2030,hp:110,armor:1,relics:['fang'],pn:'电解',p:'每次击杀回复 1 生命。',ult:{n:'刀锋模式',d:'时间放慢，对周围敌人精准连斩 30 刀，每刀回复生命。'},draw:drawNinja},
  chemist:{n:'化学教师',t:'穿防护服的化学天才',icon:'flask',w:'chemistry',coat:0xe0c030,acc:0x40c8ff,hp:100,armor:0,relics:['seed'],pn:'化学',p:'元素反应伤害 +40%，金币 +30%。',ult:{n:'雷汞爆破',d:'扔出一块"结晶"，片刻后引发大爆炸。'},draw:drawChemist},
  guts:{n:'黑剑士',t:'背着铁块的复仇者',icon:'bigsword',w:'dragonslayer',coat:0x2a2a30,acc:0xd01c2c,hp:150,armor:1,relics:['pact'],pn:'烙印',p:'生命越低伤害越高（最多 +60%）。',ult:{n:'狂战铠甲',d:'10 秒内不会死亡、伤害 ×1.8、移速 +25%；结束时失去 20% 生命。'},draw:drawSwordsman},
  falcon:{n:'白鹰团长',t:'银发的白色骑士',icon:'rapier',w:'falconrapier',coat:0xe8ecf4,acc:0x3a5aa8,hp:105,armor:1,relics:['capture'],pn:'鹰团',p:'眷属与盟友伤害 +40%。',ult:{n:'蚀之刻',d:'天空被蚀，周围 8 名敌人成为你的部下（20 秒）。'},draw:drawFalcon},
};
(function(){for(const[id,H]of Object.entries(H2)){HUNTERS[id]=H;NEW_HUNTERS[id]=H;const cv=PXG.sheet(32,48,8,(g,f)=>H.draw(g,f%4,f>=4?'back':'front'));SPR2[id]={w:32,h:48,canvas:cv};
  HERO_PX[id]=new PixKind(SPR2[id],4,4,id==='titan'?2.8:2.4,10,8);const c=document.createElement('canvas');c.width=32;c.height=48;c.getContext('2d').drawImage(cv,0,0,32,48,0,0,32,48);HERO_PORTRAIT[id]=c.toDataURL()}})();

/* ---------- 天赋 ---------- */
const HU2={dt:0,nul:0,zerk:0};
const RANKS=['D','C','B','A','S','SS','SSS'];
const styleRank=()=>Math.min(6,Math.floor((RUN.comboT>RUN.t?RUN.combo:0)/15));
wrapHook('relicStats',o=>()=>{o();const h=P.hunter;
  if(h==='leon')S.crit+=.15;if(h==='vergil')S.dashCd*=.6;if(h==='titan')S.spd*=.9;if(h==='chemist')S.gold*=1.3;
  if(h==='dante'&&HU2.dt>0){S.spd*=1.2}if(h==='guts'&&HU2.zerk>0)S.spd*=1.25});
wrapHook('relicDmgMul',o=>(e,op)=>{let m=o(e,op);const h=P.hunter;
  if(h==='lawyer'&&P.hp<S.maxHp*.3)m*=1.6;if(h==='dante'){m*=1+.06*styleRank();if(HU2.dt>0)m*=1.6}
  if(h==='striker')m*=1+Math.min(.3,Math.floor((RUN.comboT>RUN.t?RUN.combo:0)/5)*.01);if(h==='chemist'&&op.src==='react')m*=1.4;
  if(h==='guts'){m*=1+.6*(1-P.hp/S.maxHp);if(HU2.zerk>0)m*=1.8}if(h==='falcon'&&op.src==='fam')m*=1.4;return m});
wrapHook('relicOnKill',o=>(e,op,ov)=>{o(e,op,ov);if(P.hunter==='ninja')healP(1)});
wrapHook('relicDashPass',o=>e=>{o(e);if(P.hunter==='vergil')hit(e,30,{el:'dark',src:'relic',np:1})});
wrapHook('relicOnHurt',o=>d=>{if(HU2.nul>0)return 0;if(P.hunter==='dazai'&&Math.random()<.35){showReact({x:P.x,y:P.y,z:P.z,s:1},'无效');return 0}
  d=o(d);if(HU2.zerk>0&&P.hp-d<1)d=Math.max(0,P.hp-1);return d});
/* ---------- 大招 ---------- */
const zerkSpr=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTex,color:0xff2020,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));zerkSpr.visible=false;scene.add(zerkSpr);
function ult2(id){
  if(id==='lawyer'){banner('证据确凿！','');inRange(P.x,P.z,22).forEach(e=>{hit(e,120,{src:'ult',np:1});if(!e.boss)e.st.frozen=Math.max(e.st.frozen,3);else e.st.slow=3});
    const t=boss&&!boss.dead?boss:nearest(P.x,P.z,30);for(const bb of ebolts){const a=t?Math.atan2(t.x-bb.x,t.z-bb.z):rand(0,TAU);proj.push({k:'shard',x:bb.x,z:bb.z,y:hAt(bb.x,bb.z)+1.2,vx:Math.sin(a)*20,vz:Math.cos(a)*20,rot:a,life:2,dmg:40,pierce:2,hits:new Set(),el:'phys',src:'ult'})}ebolts=[];G.flash=.3}
  else if(id==='leon'){P.inv=1.2;inRange(P.x,P.z,4.5).forEach(e=>hit(e,180,{src:'ult',np:1,kb:18,fx:e.x-P.x,fz:e.z-P.z}));arcFx(P.x,P.y+1,P.z,P.face,4.5,TAU,0xffe0a0);G.shake=.7}
  else if(id==='dante'){HU2.dt=10;stats();G.flash=.4;fxRing(P.x,P.z,6,0xff2030)}
  else if(id==='vergil'){later(.8,()=>{const t=inRange(P.x,P.z,18);for(let i=0;i<40&&t.length;i++){const e=t[(Math.random()*t.length)|0];WX.cuts.push({x:e.x+rand(-1,1),z:e.z+rand(-1,1),R:1.6,t:.05+i*.02,max:.3,dmg:70,src:'ult'})}G.flash=.5;G.shake=.8})}
  else if(id==='striker'){const a=aim(30);shoot('ball',a,30,{dmg:300,pierce:99,life:1.6,el:'phys',src:'ult'});G.shake=.5}
  else if(id==='dazai'){HU2.nul=6;P.inv=6;for(const e of enemies){if(e.elite&&!e.nulled){e.nulled=true;e.elite=false}if(e.boss){e.a1+=6;e.a2+=6;e.a3+=6}}ebolts=[];teleList=[];showReact({x:P.x,y:P.y+2,z:P.z,s:1},'人间失格')}
  else if(id==='titan'){banner('响指','');const list=enemies.filter(e=>!e.dead&&!e.boss&&!e.ally);list.sort(()=>Math.random()-.5);
    list.slice(0,Math.floor(list.length/2)).forEach((e,i)=>later(i*.01,()=>{if(e.dead)return;burst(e.x,e.y+1,e.z,0x8a7a6a,8,3);track('ult',e.hp);e.hp=0;kill(e,{})}));if(boss&&!boss.dead){const v=boss.max*.15;boss.hp-=v;track('ult',v)}G.flash=.6}
  else if(id==='ninja'){G.slow=Math.max(G.slow||0,4);const t=inRange(P.x,P.z,10);for(let i=0;i<30&&t.length;i++)later(i*.07,()=>{const e=t[i%t.length];if(e.dead)return;const a=Math.atan2(e.x-P.x,e.z-P.z);lineHit(P.x,P.z,a,Math.hypot(e.x-P.x,e.z-P.z)+2,.4,50,'volt','ult',0xff4050);healP(1)})}
  else if(id==='chemist'){const t=densest(20)||{x:P.x+Math.sin(P.face)*6,z:P.z+Math.cos(P.face)*6};lob(t.x,t.z,.9,(x,z)=>{inRange(x,z,8).forEach(e=>hit(e,260,{el:'fire',src:'ult',np:1,kb:16,fx:e.x-x,fz:e.z-z}));fxRing(x,z,8,0x40c8ff);burst(x,hAt(x,z)+1,z,0xbfe8ff,70,14);G.flash=.6;G.shake=1;AU.sfx('bolt')})}
  else if(id==='guts'){HU2.zerk=10;stats();G.flash=.3;banner('狂战铠甲','痛觉已被铠甲吞噬')}
  else if(id==='falcon'){G.flash=.5;banner('蚀之刻','');const list=enemies.filter(e=>!e.dead&&!e.boss&&!e.ally).sort((a,b)=>((a.x-P.x)**2+(a.z-P.z)**2)-((b.x-P.x)**2+(b.z-P.z)**2)).slice(0,8);
    list.forEach(e=>{e.ally=true;e.allyT=20;e.elite=false;e.tint=new THREE.Color(1,.9,.95);burst(e.x,e.y+1,e.z,0xffffff,10,5)})}}
wrapHook('castUlt',o=>()=>{if(!P||P.ult<100||G.state!=='play'||!H2[P.hunter]){o();return}const H=H2[P.hunter];
  P.ult-=100;AU.sfx('ult');G.shake=Math.max(G.shake,.5);ultFx=1;ultRing.material.color.set(H.acc);if(P.rel.grail)healP(S.maxHp*.3,true);banner(H.ult.n,'');ult2(P.hunter);if(typeof homageUlt==='function')homageUlt()});
wrapHook('relicUpdate',o=>dt=>{o(dt);
  if(HU2.dt>0){HU2.dt-=dt;healP(S.maxHp*.03*dt);if(HU2.dt<=0)stats()}
  if(HU2.nul>0){HU2.nul-=dt;ebolts=[]}
  if(HU2.zerk>0){HU2.zerk-=dt;if(HU2.zerk<=0){P.hp=Math.max(1,P.hp-S.maxHp*.2);stats()}}
  const on=HU2.dt>0||HU2.zerk>0;zerkSpr.visible=on;if(on){const s=3+Math.sin(G.rt*16)*.2;zerkSpr.scale.set(s,s*1.3,1);zerkSpr.position.set(P.x,P.y+1.3,P.z);zerkSpr.material.color.set(HU2.zerk>0?0x400010:0xff2030)}});
wrapHook('newRun',o=>(h,d)=>{HU2.dt=0;HU2.nul=0;HU2.zerk=0;o(h,d)});
/* 红衣魔狩：连斩标签显示风格评价 */
wrapHook('relicUpdate',o=>dt=>{o(dt);if(P.hunter==='dante'){const sp=document.querySelector('#combo span');if(sp)sp.textContent='风格 '+RANKS[styleRank()]}});
wrapHook('newRun',o=>(h,d)=>{o(h,d);const sp=document.querySelector('#combo span');if(sp)sp.textContent='连斩'});

/* ---------- 名字精简：武器、进化、天赋、大招 2～4 字 ---------- */
const SHORT={dagger:['银匕首','千刃'],orbit:['血念珠','血蚀'],bolt:['天雷','审判雷'],aura:['焰冠','炼狱冠'],scythe:['亡镰','死神镰'],frost:['霜钟','永冬钟'],
  kiblast:['气功弹','金气炮'],maskblade:['面具刃','千面刃'],standrush:['替身拳','无尽连打'],armblade:['臂刃','超载刃'],spellbolt:['魔杖','守护咒'],katanas:['双刀','旋风斩'],
  truthgun:['言弹枪','全论破'],gelbanana:['香蕉炮','凝胶域'],objection:['异议指','决定证据'],handgun:['手枪','马格南'],rebellion:['枪与剑','魔剑乱舞'],yamato:['次元斩','绝次元'],
  striker:['射门','无旋球'],nullify:['无效化','人间失格'],gauntlet:['碎星拳','六晶鸣'],hfblade:['高频刀','斩夺刃'],chemistry:['蓝晶','高纯晶'],dragonslayer:['屠龙剑','狂战剑'],falconrapier:['隼剑','鹰之梦']};
for(const[k,[n,e]]of Object.entries(SHORT))if(WEAPONS[k]){WEAPONS[k].n=n;WEAPONS[k].evo.n=e}
const PN={warden:'圣灯',heir:'血统',raven:'影步',fighter:'怒涌',student:'双面',standuser:'灵契',cyber:'义体',wizard:'博学',merc:'再生',debater:'辩才',scientist:'未来'};
for(const[k,v]of Object.entries(PN))if(HUNTERS[k])HUNTERS[k].pn=v;
Object.assign(HUNTERS.fighter,{n:'金焰武者'});Object.assign(HUNTERS.cyber,{n:'义体佣兵'});Object.assign(HUNTERS.scientist,{n:'疯博士'});
HUNTERS.merc.ult.n='破第四墙';

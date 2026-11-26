/* ============ 万界乱斗 · 第三批致敬角色（15 位） ============
   只取原型特征组合：不复刻具体角色的完整服装配色、徽记或标志。 */
const C3=(g,f,view,c)=>baseHero(g,f,view,c);
function dCloud(g,f,v){const o=C3(g,f,v,{top:'#2a3456',topD:'#1a2038',legs:'#1e2236',boots:'#3a2a1e',skin:'#ecd2bc',hair:'#f0d870',sleeve:'#2a3456'}),{b,sw,back}=o;
  const blade=g.part('#b8bcc8'),edge=g.part('#e8ecf4'),pad=g.part('#8a8e9a'),belt=g.part('#5a3a22');g.ell(pad,8,19+b,3,2.2);g.rect(belt,10,28+b,12,2);
  g.poly(blade,[[24,33+b+sw],[28,33+b+sw],[29,4+b],[25,6+b]]);g.line(edge,28,30+b+sw,28,6+b,1);
  g.poly(o.hair,[[10,13+b],[6,9+b],[10,8+b],[8,2+b],[13,6+b],[15,-1+b],[18,5+b],[22,0+b],[21,7+b],[26,6+b],[22,10+b],[22,13+b],[20,9+b],[12,9+b]]);if(!back)eyes(g,b,'#6ad8ff',14)}
function dKing(g,f,v){const o=C3(g,f,v,{top:'#241c34',topD:'#140e1e',legs:'#1a1424',boots:'#0e0a12',skin:'#ecd8cc',hair:'#16121e',long:1,open:1}),{b,sw,back}=o;
  const col=g.part('#6a2a9a'),gold=g.part('#e0b848',{flat:1}),eye=g.part('#ff2a48',{flat:1,noOutline:1});
  g.poly(col,[[8,9+b],[11,10+b],[12,19+b],[8,19+b]]);g.poly(col,[[24,9+b],[21,10+b],[20,19+b],[24,19+b]]);g.rect(gold,15,21+b,2,1);g.rect(gold,15,24+b,2,1);
  g.poly(o.hair,[[10,14+b],[10,8+b],[13,6+b],[19,6+b],[22,8+b],[22,14+b],[20,10+b],[16,12+b],[12,10+b]]);if(!back){const e=g.part('#6a3a9a',{flat:1,noOutline:1});g.px(e,14,14+b);g.px(eye,18,14+b);g.px(eye,19,13+b)}}
function dDemonKid(g,f,v){const o=C3(g,f,v,{top:'#1c1a2a',topD:'#3a2a10',legs:'#1c1a2a',boots:'#121018',skin:'#f0dcc8',hair:'#5ac8c8',long:1,open:1}),{b,sw,back}=o;
  const ring=g.part('#ff4ab0',{flat:1,noOutline:1}),gold=g.part('#e8c048',{flat:1});g.line(gold,10,19+b,8,41+b,1);g.line(gold,22,19+b,24,41+b,1);if(!back)g.px(ring,24,32+b+sw);
  g.poly(o.hair,[[10,14+b],[10,8+b],[14,5+b],[19,6+b],[22,9+b],[22,14+b],[20,10+b],[14,10+b]]);g.line(o.hair,16,5+b,15,1+b,1);if(!back)eyes(g,b,'#3a8a9a',14)}
function dValkyrie(g,f,v){const o=C3(g,f,v,{top:'#8a1c20',topD:'#5a0c14',legs:'#3a2420',boots:'#d0a040',skin:'#f0dcd0',hair:'#c83a2a',long:1,sleeve:'#c8a040',hand:'#d8b050'}),{b,sw,back}=o;
  const helm=g.part('#d8b050'),wing=g.part('#f0e0b0'),blade=g.part('#e8ecf4');
  g.poly(o.hair,[[9,13+b],[9,30+b],[12,36+b],[12,14+b]]);g.poly(o.hair,[[23,13+b],[23,30+b],[20,36+b],[20,14+b]]);
  g.ell(helm,16,10+b,5.5,4);g.poly(wing,[[11,9+b],[5,3+b],[8,9+b]]);g.poly(wing,[[21,9+b],[27,3+b],[24,9+b]]);
  if(!back){g.line(blade,25,32+b+sw,30,12+b+sw,1.2);const e=g.part('#2a1a14',{flat:1});g.px(e,14,14+b);g.px(e,18,14+b)}}
function dGhoulKid(g,f,v){const o=C3(g,f,v,{top:'#22222a',topD:'#141418',legs:'#1e1e26',boots:'#0e0e12',skin:'#ece4dc',hair:'#f0f0f4'}),{b,sw,back}=o;
  const kag=g.part('#c81c2a'),kagD=g.part('#7a0c18'),mask=g.part('#18181e'),eyeK=g.part('#140608',{flat:1,noOutline:1}),iris=g.part('#ff2030',{flat:1,noOutline:1});
  const t=f%2;g.line(kag,12,24+b,3,14+b+t,2);g.line(kag,12,26+b,2,24+b-t,2);g.line(kag,20,24+b,29,14+b-t,2);g.line(kag,20,26+b,30,24+b+t,2);g.px(kagD,3,14+b+t);g.px(kagD,29,14+b-t);
  g.poly(o.hair,[[10,14+b],[10,8+b],[13,6+b],[19,6+b],[22,8+b],[22,14+b],[20,10+b],[12,10+b]]);
  if(!back){g.rect(mask,16,12+b,5,6);g.px(eyeK,14,14+b);g.px(iris,14,14+b);const e=g.part('#2a2028',{flat:1});g.px(e,18,13+b)}}
function dWaterSword(g,f,v){const o=C3(g,f,v,{top:'#1e5a78',topD:'#123a50',legs:'#1a1a24',boots:'#e8e2d4',skin:'#ecd2bc',hair:'#4a1a1a',sleeve:'#1e5a78'}),{b,sw,back}=o;
  const wave=g.part('#8ae0ff',{flat:1}),uni=g.part('#141824'),blade=g.part('#1a1e2a'),edge=g.part('#8ae0ff',{flat:1});
  g.rect(uni,14,19+b,4,16);for(let y=22;y<34;y+=4){g.px(wave,11,y+b);g.px(wave,12,y+b+1);g.px(wave,20,y+b);g.px(wave,21,y+b+1)}
  if(!back){g.line(blade,24,32+b+sw,30,18+b+sw,1.4);g.line(edge,25,31+b+sw,30,19+b+sw,1)}
  g.poly(o.hair,[[10,14+b],[10,8+b],[13,5+b],[19,5+b],[22,8+b],[22,14+b],[20,10+b],[17,12+b],[14,10+b],[12,12+b]]);if(!back){eyes(g,b,'#8a2a2a',14);const sc=g.part('#b84040',{flat:1});g.px(sc,12,11+b)}}
function dBlindfold(g,f,v){const o=C3(g,f,v,{top:'#141626',topD:'#0c0e18',legs:'#141626',boots:'#0c0c12',skin:'#f0e2d8',hair:'#f4f6fc',long:1}),{b,sw,back}=o;
  const band=g.part('#0e0e14',{flat:1}),coll=g.part('#141626'),glow=g.part('#7ad8ff',{flat:1,noOutline:1});g.rect(coll,11,16+b,10,4);
  g.poly(o.hair,[[9,12+b],[8,4+b],[12,6+b],[13,0+b],[16,5+b],[19,0+b],[20,6+b],[24,4+b],[23,12+b],[16,9+b]]);if(!back){g.rect(band,10,12+b,12,3)}else g.rect(band,10,12+b,12,2);
  if(!back){g.px(glow,7,30+b-sw);g.px(glow,25,30+b+sw)}}
function dCopyNinja(g,f,v){const o=C3(g,f,v,{top:'#3a4250',topD:'#262c36',legs:'#262c3a',boots:'#1a1e28',skin:'#ecd8c4',hair:'#d8dce4',sleeve:'#262c3a'}),{b,sw,back}=o;
  const vest=g.part('#4a5a4a'),plate=g.part('#b8bcc8'),cloth=g.part('#2a3040'),mask=g.part('#262c3a'),eyeR=g.part('#ff2030',{flat:1,noOutline:1}),volt=g.part('#9ad8ff',{flat:1});
  g.poly(vest,[[11,20+b],[21,20+b],[21,32+b],[11,32+b]]);
  g.poly(o.hair,[[10,12+b],[10,6+b],[14,2+b],[22,-1+b],[20,4+b],[25,3+b],[22,8+b],[22,12+b]]);g.rect(cloth,10,9+b,12,2);g.poly(plate,[[12,9+b],[17,9+b],[18,11+b],[11,11+b]]);
  if(!back){g.rect(mask,11,15+b,10,4);const e=g.part('#2a2028',{flat:1});g.px(e,18,13+b);g.px(eyeR,14,13+b);g.px(volt,24,31+b+sw);g.px(volt,25,30+b+sw);g.px(volt,26,32+b+sw)}}
function dRubber(g,f,v){const o=C3(g,f,v,{top:'#c8302a',topD:'#e8c8a8',legs:'#2a4a88',boots:'#d8a868',skin:'#e8c8a8',hair:'#14101a',open:1}),{b,sw,back}=o;
  const hat=g.part('#e8c870'),band=g.part('#c8302a'),sash=g.part('#e8c870');g.rect(sash,10,29+b,12,2);
  g.poly(o.hair,[[10,13+b],[10,8+b],[22,8+b],[22,13+b]]);g.ell(hat,16,8+b,10,2.2);g.ell(hat,16,6+b,5,3);g.rect(band,11,6+b,10,2);
  if(!back){eyes(g,b,'#14101a',13);const sc=g.part('#a03030',{flat:1,noOutline:1});g.px(sc,14,15+b)}}
function dBald(g,f,v){const o=C3(g,f,v,{top:'#f0b828',topD:'#c89010',legs:'#f0b828',boots:'#d83a2a',skin:'#f0dcc4',hair:'#f0dcc4',hand:'#d83a2a'}),{b,sw,back}=o;
  const cape=g.part('#f4f4f4'),belt=g.part('#141418');if(back)g.poly(cape,[[8,18+b],[24,18+b],[27,42],[5,42]]);else{g.rect(cape,9,18+b,2,10);g.rect(cape,21,18+b,2,10)}g.rect(belt,10,29+b,12,2);
  g.ell(o.skin,16,12+b,5,5.5);if(!back){const e=g.part('#14101a',{flat:1,noOutline:1});g.rect(e,13,13+b,2,1);g.rect(e,17,13+b,2,1)}}
function dOathKing(g,f,v){const o=C3(g,f,v,{top:'#2a4aa8',topD:'#1a3078',legs:'#2a4aa8',boots:'#a8b0c0',skin:'#f4e4d8',hair:'#f0d070',long:1,sleeve:'#a8b0c0'}),{b,sw,back}=o;
  const armor=g.part('#c8d0dc'),gold=g.part('#e8c048',{flat:1}),blade=g.part('#fff4c0',{flat:1});g.poly(armor,[[10,19+b],[22,19+b],[21,27+b],[11,27+b]]);g.rect(gold,15,22+b,2,3);
  if(!back)g.line(blade,24,32+b+sw,24,12+b+sw,1.4);
  g.poly(o.hair,[[10,14+b],[10,8+b],[13,6+b],[19,6+b],[22,8+b],[22,14+b],[20,10+b],[12,10+b]]);g.ell(o.hair,16,5+b,2.5,2);g.line(o.hair,16,6+b,17,2+b,1);if(!back)eyes(g,b,'#2a6a4a',14)}
function dSaw(g,f,v){const o=C3(g,f,v,{top:'#e8e8ec',topD:'#c8c8d0',legs:'#2a2a30',boots:'#141418',skin:'#ecd0b8',hair:'#e8c050'}),{b,sw,back}=o;
  const tie=g.part('#1a1a22'),saw=g.part('#9aa0ac'),teeth=g.part('#e8ecf4',{flat:1}),cord=g.part('#e0e0e0',{flat:1});g.rect(tie,15,20+b,2,8);
  if(!back){g.rect(saw,24,26+b+sw,3,10);for(let y=26;y<36;y+=2)g.px(teeth,27,y+b+sw);g.line(cord,16,26+b,13,30+b,1)}
  g.poly(o.hair,[[10,14+b],[9,7+b],[12,5+b],[15,7+b],[17,4+b],[20,6+b],[23,8+b],[22,14+b],[20,10+b],[12,10+b]]);if(!back){const e=g.part('#2a2028',{flat:1});g.px(e,14,14+b);g.px(e,18,14+b);const t=g.part('#ffffff',{flat:1,noOutline:1});g.rect(t,15,16+b,3,1)}}
function dScout(g,f,v){const o=C3(g,f,v,{top:'#8a5a32',topD:'#5a3a1e',legs:'#e8e2d4',boots:'#3a2a1e',skin:'#ecd2bc',hair:'#3a2a20',sleeve:'#8a5a32'}),{b,sw,back}=o;
  const strap=g.part('#2a1e16'),gear=g.part('#8a8e98'),blade=g.part('#e8ecf4'),cape=g.part('#2a5a3a');
  if(back)g.poly(cape,[[9,18+b],[23,18+b],[24,36+b],[8,36+b]]);g.line(strap,12,20+b,12,35+b,1);g.line(strap,20,20+b,20,35+b,1);g.rect(strap,10,28+b,12,1);
  g.rect(gear,7,32+b,3,4);g.rect(gear,22,32+b,3,4);if(!back){g.line(blade,4,33+b-sw,2,24+b-sw,1);g.line(blade,28,33+b+sw,30,24+b+sw,1)}
  g.poly(o.hair,[[10,13+b],[10,8+b],[13,6+b],[19,6+b],[22,8+b],[22,13+b],[20,10+b],[12,10+b]]);if(!back)eyes(g,b,'#3a7a5a',14)}
function dPilot(g,f,v){const o=C3(g,f,v,{top:'#eceef4',topD:'#3a5aa8',legs:'#eceef4',boots:'#3a5aa8',skin:'#ecd8c4',hair:'#4a3020',sleeve:'#eceef4'}),{b,sw,back}=o;
  const blue=g.part('#3a5aa8'),clip=g.part('#e8e8f0',{flat:1}),black=g.part('#1a1a22');g.rect(blue,11,22+b,10,3);g.rect(black,14,19+b,4,3);g.rect(blue,15,28+b,2,7);
  g.poly(o.hair,[[10,14+b],[10,8+b],[13,6+b],[19,6+b],[22,8+b],[22,14+b],[20,10+b],[12,10+b]]);g.rect(clip,10,10+b,2,2);g.rect(clip,20,10+b,2,2);if(!back)eyes(g,b,'#3a3a5a',14)}
function dSuit(g,f,v){const o=C3(g,f,v,{top:'#16161c',topD:'#0c0c10',legs:'#16161c',boots:'#0a0a0c',skin:'#e4c8b0',hair:'#1a1416',open:1}),{b,sw,back}=o;
  const shirt=g.part('#ececf0'),gun=g.part('#2a2a30');if(!back){g.poly(shirt,[[14,19+b],[18,19+b],[17,26+b],[15,26+b]]);g.rect(gun,23,31+b+sw,4,2);g.rect(gun,25,33+b+sw,1,2)}
  g.poly(o.hair,[[10,16+b],[9,7+b],[13,5+b],[19,5+b],[23,7+b],[22,16+b],[21,10+b],[11,10+b]]);if(!back){eyes(g,b,'#2a2028',13);const bd=g.part('#2a2020',{flat:1});g.rect(bd,13,16+b,7,2)}}

/* ---------- 武器 ---------- */
const W3={
  bigblade:{n:'破坏剑',el:'phys',icon:'bigsword',d:'抡起巨剑横斩前方；每第三次连斩三刀。',base:{dmg:32,cd:1.5,area:1},ups:['dmg','area','cd'],evo:{relic:'phoenix',n:'终极剑',d:'每一刀都是三连斩。'},
    tick(w){if(w.t>0)return;const t=nearest(P.x,P.z,5);if(!t)return;w.t=w.cd*S.cd*cdDyn();w.n=(w.n||0)+1;const a=Math.atan2(t.x-P.x,t.z-P.z),R=3.4*w.area*S.area,k=w.evo||w.n%3===0?3:1;for(let i=0;i<k;i++)later(i*.12,()=>arcHit(a+(i-1)*.4,R,2.6,w.dmg,'phys','bigblade',8,0x9ad8ff))}},
  chess:{n:'王之棋',el:'dark',icon:'ball',d:'在身边放下棋兵，棋兵会自动射击（6 秒）。',base:{dmg:10,cd:3.5,count:2,area:1},ups:['dmg','count','cd'],evo:{relic:'command',n:'王之军',d:'棋兵数量翻倍、持续更久。'},
    tick(w){if(w.t>0)return;w.t=w.cd*S.cd*cdDyn();const n=w.count*(w.evo?2:1);for(let i=0;i<n;i++){const a=i/n*TAU;H3.pawns.push({x:P.x+Math.sin(a)*2.2,z:P.z+Math.cos(a)*2.2,t:w.evo?9:6,cd:.2,dmg:w.dmg})}}},
  pactring:{n:'契约戒',el:'dark',icon:'wisp',d:'戒指里飞出小恶魔，追踪敌人。',base:{dmg:12,cd:1.1,count:2,area:1},ups:['dmg','count','cd'],evo:{relic:'capture',n:'大恶魔契',d:'小恶魔命中时有几率魅惑敌人。'},
    tick(w){if(w.t>0)return;w.t=w.cd*S.cd*cdDyn();for(let i=0;i<w.count;i++){const a=rand(0,TAU),t=nearest(P.x,P.z,16);proj.push({k:'wisp',x:P.x,z:P.z,y:P.y+1.4,vx:Math.sin(a)*7,vz:Math.cos(a)*7,rot:a,life:2.6,dmg:w.dmg,pierce:1,hits:new Set(),el:'dark',src:'pactring',home:t,
      onHit:w.evo?(p,e)=>{if(!e.boss&&!e.elite&&Math.random()<.08){e.ally=true;e.allyT=10;e.tint=new THREE.Color(1,.6,.9)}}:null})}}},
  prosblade:{n:'义手刀',el:'blood',icon:'rapier',d:'三段疾风乱舞，环身斩击并吸血。',base:{dmg:7,cd:2,count:3,area:1},ups:['dmg','count','cd'],evo:{relic:'seed',n:'飞鸟刃',d:'乱舞翻倍，并留下猩红腐败。'},
    tick(w){if(w.t>0)return;if(!nearest(P.x,P.z,4))return;w.t=w.cd*S.cd*cdDyn();const n=w.count*(w.evo?2:1);for(let i=0;i<n;i++)later(i*.12,()=>{arcHit(rand(0,TAU),2.8*w.area*S.area,TAU,w.dmg,'blood','prosblade',2,0xff5050);healP(.4);if(w.evo&&i===n-1)WX.clouds.push({x:P.x,z:P.z,R:2.5,t:2,k:.5,dmg:5,el:'blood',src:'prosblade',col:0xff4060})})}},
  kagune:{n:'赫子',el:'blood',icon:'blood',d:'背后的赫子同时刺向多名近处的敌人并吸血。',base:{dmg:14,cd:1,count:3,area:1},ups:['dmg','count','cd'],evo:{relic:'fang',n:'赫者',d:'赫子数量翻倍。'},
    tick(w){if(w.t>0)return;const t=inRange(P.x,P.z,6*w.area*S.area).slice(0,w.count*(w.evo?2:1)*(H3.kak>0?2:1));if(!t.length)return;w.t=w.cd*S.cd*cdDyn();
      for(const e of t){lineHit(P.x,P.z,Math.atan2(e.x-P.x,e.z-P.z),Math.hypot(e.x-P.x,e.z-P.z)+.5,.35,w.dmg*(H3.kak>0?1.5:1),'blood','kagune',0xff2030);healP(.3)}}},
  waterblade:{n:'水之刃',el:'frost',icon:'wave',d:'流水般的斩击，并放出水流剑气。',base:{dmg:20,cd:1,area:1},ups:['dmg','area','cd'],evo:{relic:'frostheart',n:'日之刃',d:'剑气化为火焰，伤害提升。'},
    tick(w){if(w.t>0)return;w.t=w.cd*S.cd*cdDyn();const a=aim(10);arcHit(a,2.6*w.area*S.area,2,w.dmg,w.evo?'fire':'frost','waterblade',4,w.evo?0xff8030:0x8ae0ff);shoot('crescent',a,18,{dmg:w.dmg*.8,pierce:4,life:.8,el:w.evo?'fire':'frost',src:'waterblade'})}},
  bluered:{n:'苍与赫',el:'volt',icon:'kiorb',d:'交替放出吸引敌人的"苍"与击飞敌人的"赫"。',base:{dmg:18,cd:1.6,area:1},ups:['dmg','area','cd'],evo:{relic:'stopwatch',n:'茈',d:'苍赫合一，贯穿前方一切。'},
    tick(w){if(w.t>0)return;const t=densest(14);if(!t)return;w.t=w.cd*S.cd*cdDyn();w.n=(w.n||0)+1;const R=3*w.area*S.area;
      if(w.evo&&w.n%3===0){lineHit(P.x,P.z,Math.atan2(t.x-P.x,t.z-P.z),26,2,w.dmg*4,'volt','bluered',0xc070ff);return}
      if(w.n%2){inRange(t.x,t.z,R+2).forEach(e=>{e.kx+=(t.x-e.x)*2.5;e.kz+=(t.z-e.z)*2.5;hit(e,w.dmg,{el:'volt',src:'bluered',np:1})});fxRing(t.x,t.z,R,0x3a8aff)}
      else{inRange(t.x,t.z,R).forEach(e=>hit(e,w.dmg*1.3,{el:'fire',src:'bluered',kb:14,fx:e.x-t.x,fz:e.z-t.z}));fxRing(t.x,t.z,R,0xff3040)}}},
  kunai:{n:'苦无',el:'phys',icon:'dagger',d:'投掷苦无；每第四次发动雷切突刺。',base:{dmg:11,cd:.7,count:2,area:1,speed:24},ups:['dmg','count','cd'],evo:{relic:'bell',n:'雷切',d:'每第二次就发动雷切。'},
    tick(w){if(w.t>0)return;w.t=w.cd*S.cd*cdDyn();w.n=(w.n||0)+1;const a=aim(20);for(let i=0;i<w.count;i++)shoot('dagger',a+(i-(w.count-1)/2)*.18,w.speed,{dmg:w.dmg,pierce:1,life:.9,el:'phys',src:'kunai'});
      if(w.n%(w.evo?2:4)===0){const t=nearest(P.x,P.z,8);if(t){lineHit(P.x,P.z,Math.atan2(t.x-P.x,t.z-P.z),Math.hypot(t.x-P.x,t.z-P.z)+1.5,.7,w.dmg*5,'volt','kunai',0x9ad8ff);showReact(t,'雷切')}}}},
  stretch:{n:'伸缩拳',el:'phys',icon:'fist',d:'拳头伸长到远处；偶尔打出连续快拳。',base:{dmg:16,cd:.9,area:1},ups:['dmg','area','cd'],evo:{relic:'boneshield',n:'加特林',d:'每次都打出连续快拳。'},
    tick(w){if(w.t>0)return;const t=nearest(P.x,P.z,10);if(!t)return;w.t=w.cd*S.cd*cdDyn();w.n=(w.n||0)+1;const a=Math.atan2(t.x-P.x,t.z-P.z),k=w.evo||w.n%4===0?8:1;
      for(let i=0;i<k;i++)later(i*.05,()=>lineHit(P.x,P.z,a+rand(-.15,.15),9*w.area*S.area,.6,w.dmg*(k>1?.6:1),'phys','stretch',0xe8c8a8))}},
  plainpunch:{n:'普通拳',el:'phys',icon:'fist',d:'对近处的敌人一拳；每第四拳是"连续普通拳"。',base:{dmg:60,cd:1.2,area:1},ups:['dmg','area','cd'],evo:{relic:'whetstone',n:'认真拳',d:'每一拳都会击飞前方一整列敌人。'},
    tick(w){if(w.t>0)return;const t=nearest(P.x,P.z,3.2*w.area*S.area);if(!t)return;w.t=w.cd*S.cd*cdDyn();w.n=(w.n||0)+1;const a=Math.atan2(t.x-P.x,t.z-P.z);
      if(w.evo)lineHit(P.x,P.z,a,14,1.4,w.dmg,'phys','plainpunch',0xfff0a0);else if(w.n%4===0)for(let i=0;i<10;i++)later(i*.04,()=>arcHit(a,3,1.6,w.dmg*.3,'phys','plainpunch',2,0xfff0a0));else hit(t,w.dmg,{src:'plainpunch',kb:18,fx:t.x-P.x,fz:t.z-P.z})}},
  oathsword:{n:'风之剑',el:'phys',icon:'rapier',d:'斩击并放出风压剑气。',base:{dmg:18,cd:1,area:1},ups:['dmg','area','cd'],evo:{relic:'saint',n:'王之剑',d:'剑气化为金色光刃。'},
    tick(w){if(w.t>0)return;w.t=w.cd*S.cd*cdDyn();const a=aim(10);arcHit(a,2.8*w.area*S.area,2,w.dmg,'phys','oathsword',6,0xfff0c0);shoot('crescent',a,20,{dmg:w.dmg*(w.evo?1.5:.8),pierce:w.evo?8:3,life:.9,el:'phys',src:'oathsword'})}},
  chainsaw:{n:'电锯',el:'blood',icon:'whetstone',d:'前方电锯持续切割。',base:{dmg:6,cd:.15,area:1},ups:['dmg','area'],evo:{relic:'pact',n:'锯人',d:'电锯环绕全身。'},
    tick(w){if(w.t>0)return;w.t=.15;const on=H3.saw>0;const arc=(w.evo||on)?TAU:1.6,R=2.2*w.area*S.area*(on?1.3:1);if(!nearest(P.x,P.z,R+1))return;query(P.x,P.z,R,e=>{const dx=e.x-P.x,dz=e.z-P.z,d=Math.hypot(dx,dz);if(d>R+e.r*.5)return;let da=Math.atan2(dx,dz)-P.face;da=Math.atan2(Math.sin(da),Math.cos(da));if(Math.abs(da)<=arc/2||d<1)hit(e,w.dmg*(on?2:1),{el:'blood',src:'chainsaw',kb:.6,fx:dx,fz:dz})});
      if(Math.random()<.4)burst(P.x+Math.sin(P.face)*1.4,P.y+1,P.z+Math.cos(P.face)*1.4,0xff3040,2,4)}},
  twinblades:{n:'双刃',el:'phys',icon:'katana',d:'双刃回旋斩；冲刺时刀刃更锋利。',base:{dmg:16,cd:.9,area:1},ups:['dmg','area','cd'],evo:{relic:'feather',n:'雷枪',d:'额外发射爆炸雷枪。'},
    tick(w){if(w.t>0)return;if(!nearest(P.x,P.z,4))return;w.t=w.cd*S.cd*cdDyn();arcHit(P.face,2.6*w.area*S.area,TAU,w.dmg*(P.dashT>0?2:1),'phys','twinblades',4,0xe8f0ff);
      if(w.evo){const a=aim(18);shoot('dagger',a,30,{dmg:w.dmg*2,pierce:1,life:.8,el:'fire',src:'twinblades',onHit:explodeHit,boom:2.4})}}},
  positron:{n:'阳电子炮',el:'volt',icon:'beam',d:'蓄力后射出一道贯穿战场的阳电子光束。',base:{dmg:60,cd:2.6,area:1},ups:['dmg','area','cd'],evo:{relic:'lens',n:'歼灭炮',d:'光束变粗并连射两次。'},
    tick(w){if(w.t>0)return;const t=nearest(P.x,P.z,30);if(!t)return;w.t=w.cd*S.cd*cdDyn();const a=Math.atan2(t.x-P.x,t.z-P.z),k=w.evo?2:1;for(let i=0;i<k;i++)later(.3+i*.25,()=>lineHit(P.x,P.z,a,34,(w.evo?1.6:1)*w.area*S.area,w.dmg,'volt','positron',0xff8a40))}},
  gunkata:{n:'枪斗术',el:'phys',icon:'gun',d:'近距离连续点射；每次击杀立刻装填。',base:{dmg:14,cd:.55,count:2,area:1,speed:34},ups:['dmg','count','cd'],evo:{relic:'whetstone',n:'神枪斗',d:'每一发都必定暴击。'},
    tick(w){if(w.t>0)return;const t=nearest(P.x,P.z,11);if(!t)return;w.t=w.cd*S.cd*cdDyn();const a=Math.atan2(t.x-P.x,t.z-P.z);for(let i=0;i<w.count;i++)later(i*.06,()=>shoot('dagger',a+rand(-.04,.04),w.speed,{dmg:w.dmg,pierce:1,life:.5,el:'phys',src:'gunkata',fc:!!w.evo,onHit:(p,e,r)=>{if(r.killed)w.t=0}}))}},
};
for(const[k,v]of Object.entries(W3))WEAPONS[k]=v;
const H3={pawns:[],kak:0,saw:0,giant:0,berserk:0,dmn:0,fullc:0,lastHurt:0,limit:0,limitHits:0,atf:0,gunT:0};
const pawnKind=new Kind([{g:GEO.cyl,m:std(0xe8e8f0),l:L(0,.35,0,0,0,0,.35,.7,.35),sh:1},{g:GEO.sph,m:std(0xe8e8f0),l:L(0,.9,0,0,0,0,.25),sh:1},{g:GEO.cyl,m:std(0x2a2a34),l:L(0,.05,0,0,0,0,.45,.1,.45)}],16);
EXTRA_PROJ.push();

const HDEF={
  cloud:{n:'刺猬佣兵',t:'背着巨剑的前精英战士',icon:'bigsword',w:'bigblade',coat:0x2a3456,acc:0xf0d870,hp:120,armor:1,relics:[],pn:'极限',p:'受到的伤害积攒极限值，满后接下来 3 次攻击伤害 ×4。',ult:{n:'超究连斩',d:'瞬身连斩周围敌人 15 次，最后一记重斩。'},draw:dCloud},
  king:{n:'命令之王',t:'以一只眼命令世界的王',icon:'eye',w:'chess',coat:0x241c34,acc:0xff2a48,hp:90,armor:0,relics:['command'],pn:'王权',p:'伙伴、盟友与棋兵伤害 +30%。',ult:{n:'绝对命令',d:'视野内的普通敌人全部倒戈 8 秒，首领被定身。'},draw:dKing},
  demonkid:{n:'魔校人类',t:'在恶魔学校求生的人类少年',icon:'wisp',w:'pactring',coat:0x1c1a2a,acc:0x5ac8c8,hp:100,armor:0,relics:['capture'],pn:'讨喜',p:'命中普通敌人时有 1.5% 几率令其倒戈 10 秒。',ult:{n:'人气爆发',d:'全体伙伴回满，并魅惑周围 10 名敌人。'},draw:dDemonKid},
  valkyrie:{n:'女武神',t:'义手持刀的不败女武神',icon:'rapier',w:'prosblade',coat:0x8a1c20,acc:0xc83a2a,hp:110,armor:1,relics:['seed'],pn:'腐败',p:'所有攻击额外叠加出血。',ult:{n:'猩红绽放',d:'绽放猩红之花，爆炸并留下大片腐败。'},draw:dValkyrie},
  ghoulkid:{n:'半赫少年',t:'半人半食的白发少年',icon:'blood',w:'kagune',coat:0x22222a,acc:0xc81c2a,hp:110,armor:0,relics:['fang'],pn:'喰种',p:'每次击杀回复 1.5% 生命。',ult:{n:'赫者化',d:'12 秒内赫子数量与伤害大增，护甲 +5。'},draw:dGhoulKid},
  watersword:{n:'水之剑士',t:'额头带伤的温柔剑士',icon:'wave',w:'waterblade',coat:0x1e5a78,acc:0x8ae0ff,hp:105,armor:0,relics:['frostheart'],pn:'全集中',p:'越久没受伤伤害越高（最多 +30%）。',ult:{n:'流流舞',d:'如流水般穿梭于 10 名敌人之间斩击。'},draw:dWaterSword},
  blindfold:{n:'蒙眼最强',t:'蒙着眼的最强术师',icon:'kiorb',w:'bluered',coat:0x141626,acc:0x7ad8ff,hp:110,armor:0,relics:['stopwatch'],pn:'无下限',p:'受到的伤害减半，贴近的敌人被大幅减速。',ult:{n:'领域展开',d:'5 秒内周围敌人全部定身，每秒受到大量伤害。'},draw:dBlindfold},
  copyninja:{n:'写轮上忍',t:'遮住一只眼的复制忍者',icon:'dagger',w:'kunai',coat:0x3a4250,acc:0xff2030,hp:100,armor:0,relics:['bell'],pn:'写轮',p:'暴击 +10%，对精英与首领伤害 +25%。',ult:{n:'雷切·贯',d:'雷光贯穿一条直线上的所有敌人并连锁。'},draw:dCopyNinja},
  rubber:{n:'橡胶船长',t:'戴草帽的伸缩船长',icon:'fist',w:'stretch',coat:0xc8302a,acc:0xe8c870,hp:130,armor:3,relics:['boneshield'],pn:'橡胶',p:'护甲 +3，雷电伤害对你无效。',ult:{n:'巨人化',d:'拳头巨大化，砸向周围一大片地面。'},draw:dRubber},
  bald:{n:'一拳秃头',t:'因为兴趣而当英雄的人',icon:'fist',w:'plainpunch',coat:0xf0b828,acc:0xd83a2a,hp:120,armor:1,relics:['whetstone'],pn:'训练',p:'每升一级伤害永久 +2%。',ult:{n:'认真一拳',d:'认真打出一拳：前方所有普通敌人消失，首领损失 30% 生命。'},draw:dBald},
  oathking:{n:'誓约之王',t:'手持圣剑的少女骑士王',icon:'rapier',w:'oathsword',coat:0x2a4aa8,acc:0xf0d070,hp:115,armor:1,relics:['saint'],pn:'骑士王',p:'每秒回复 1 生命，护甲 +1。',ult:{n:'誓约之光',d:'高举圣剑，放出贯穿天地的金色光柱。'},draw:dOathKing},
  sawboy:{n:'电锯少年',t:'胸口有拉绳的打工少年',icon:'whetstone',w:'chainsaw',coat:0xe8e8ec,acc:0xe8c050,hp:110,armor:0,relics:['pact'],pn:'血之欲',p:'生命越低伤害越高（最多 +50%），击杀回复 1 生命。',ult:{n:'拉绳',d:'拉动胸前的绳子，12 秒内化身电锯恶魔。'},draw:dSaw},
  scout:{n:'机动兵',t:'挂着钩索装置的调查兵',icon:'katana',w:'twinblades',coat:0x8a5a32,acc:0x2a5a3a,hp:100,armor:0,relics:['feather'],pn:'立体机动',p:'冲刺冷却 -50%，冲刺穿过的敌人被斩。',ult:{n:'回旋斩',d:'绕着周围高速回旋，斩击圈内所有敌人。'},draw:dScout},
  pilot:{n:'驾驶员',t:'不得不上战场的少年驾驶员',icon:'beam',w:'positron',coat:0xeceef4,acc:0x3a5aa8,hp:100,armor:0,relics:['lens'],pn:'绝对领域',p:'每 8 秒展开一次六边形护盾，抵挡伤害并击退敌人。',ult:{n:'暴走',d:'12 秒内暴走：伤害 ×2、移速 +25%，攻击吸血。'},draw:dPilot},
  suit:{n:'黑西装',t:'传说中的退休杀手',icon:'gun',w:'gunkata',coat:0x16161c,acc:0xececf0,hp:100,armor:1,relics:['whetstone'],pn:'专业',p:'每次击杀，下一发子弹必定暴击。',ult:{n:'枪斗风暴',d:'4 秒内自动爆头身边 20 名敌人。'},draw:dSuit},
};
(function(){for(const[id,H]of Object.entries(HDEF)){HUNTERS[id]=H;H2[id]=H;const cv=PXG.sheet(32,48,8,(g,f)=>H.draw(g,f%4,f>=4?'back':'front'));SPR2[id]={w:32,h:48,canvas:cv};
  HERO_PX[id]=new PixKind(SPR2[id],4,4,2.4,10,8);const c=document.createElement('canvas');c.width=32;c.height=48;c.getContext('2d').drawImage(cv,0,0,32,48,0,0,32,48);HERO_PORTRAIT[id]=c.toDataURL()}})();

/* ---------- 天赋 ---------- */
wrapHook('relicStats',o=>()=>{o();const h=P.hunter;if(h==='copyninja')S.crit+=.1;if(h==='oathking')S.regen+=1;if(h==='scout')S.dashCd*=.5;if(h==='pilot'&&H3.berserk>0)S.spd*=1.25;if(h==='ghoulkid'&&H3.kak>0)S.armor+=5});
wrapHook('relicDmgMul',o=>(e,op)=>{let m=o(e,op);const h=P.hunter;
  if(h==='cloud'&&H3.limitHits>0&&WSRC.has(op.src)){m*=4;H3.limitHits-=.34}
  if(h==='king'&&(op.src==='fam'||op.src==='pawn'))m*=1.3;if(h==='watersword')m*=1+Math.min(.3,(RUN.t-H3.lastHurt)*.01);
  if(h==='copyninja'&&(e.elite||e.boss))m*=1.25;if(h==='bald')m*=1+.02*P.lvl;if(h==='sawboy')m*=1+.5*(1-P.hp/S.maxHp);if(h==='pilot'&&H3.berserk>0)m*=2;
  if(h==='suit'&&H3.gunT>0&&op.src==='gunkata'){H3.gunT=0;op.fc=true}return m});
wrapHook('relicOnHit',o=>(e,op,d)=>{o(e,op,d);const h=P.hunter;if(op.dot)return;
  if(h==='valkyrie'){e.st.bleed=Math.min(10,e.st.bleed+1);e.st.bleedT=4}
  if(h==='demonkid'&&!e.boss&&!e.elite&&!e.ally&&Math.random()<.015){e.ally=true;e.allyT=10;e.tint=new THREE.Color(1,.6,.9);showReact(e,'被你吸引了')}
  if(h==='pilot'&&H3.berserk>0)healP(.3)});
wrapHook('relicOnKill',o=>(e,op,ov)=>{o(e,op,ov);const h=P.hunter;if(h==='ghoulkid')healP(S.maxHp*.015);if(h==='sawboy')healP(1);if(h==='suit')H3.gunT=1});
wrapHook('relicDashPass',o=>e=>{o(e);if(P.hunter==='scout')hit(e,40,{src:'twinblades',np:1,kb:5,fx:e.x-P.x,fz:e.z-P.z})});
wrapHook('relicOnHurt',o=>d=>{const h=P.hunter;
  if(h==='pilot'&&H3.atf<=0){H3.atf=8;fxRing(P.x,P.z,4,0xff8a40);inRange(P.x,P.z,4).forEach(e=>hit(e,20,{src:'relic',np:1,kb:14,fx:e.x-P.x,fz:e.z-P.z}));showReact({x:P.x,y:P.y,z:P.z,s:1},'绝对领域');return 0}
  if(h==='blindfold')d*=.5;d=o(d);if(d>0){H3.lastHurt=RUN.t;if(h==='cloud'){H3.limit+=d;if(H3.limit>=S.maxHp*.4){H3.limit=0;H3.limitHits=3;showReact({x:P.x,y:P.y,z:P.z,s:1},'极限突破')}}}return d});
/* ---------- 大招 ---------- */
function ult3(id){
  if(id==='cloud'){const t=inRange(P.x,P.z,12);for(let i=0;i<15&&t.length;i++)later(i*.08,()=>{const e=t[i%t.length];if(e.dead)return;arcHit(Math.atan2(e.x-P.x,e.z-P.z),Math.hypot(e.x-P.x,e.z-P.z)+2,.5,70,'phys','ult',4,0x9ad8ff)});later(1.3,()=>{arcHit(P.face,6,TAU,220,'phys','ult',16,0xffffff);G.shake=.8})}
  else if(id==='king'){banner('绝对命令','“去死吧”——不，“互相残杀吧”');inRange(P.x,P.z,22).forEach(e=>{if(e.boss){e.st.slow=3;e.a1+=2;e.a2+=2}else{e.ally=true;e.allyT=8;e.tint=new THREE.Color(1,.4,.5)}});G.flash=.3}
  else if(id==='demonkid'){for(const f of fams)f.xp+=30;healP(S.maxHp*.3,true);enemies.filter(e=>!e.dead&&!e.boss&&!e.ally).sort((a,b)=>((a.x-P.x)**2+(a.z-P.z)**2)-((b.x-P.x)**2+(b.z-P.z)**2)).slice(0,10).forEach(e=>{e.ally=true;e.allyT=12;e.tint=new THREE.Color(1,.6,.9);burst(e.x,e.y+1,e.z,0xff8ad0,8,4)})}
  else if(id==='valkyrie'){later(.6,()=>{inRange(P.x,P.z,8).forEach(e=>{hit(e,200,{el:'blood',src:'ult',np:1,kb:10,fx:e.x-P.x,fz:e.z-P.z});e.st.bleed=10;e.st.bleedT=6});WX.clouds.push({x:P.x,z:P.z,R:7,t:5,k:0,dmg:12,el:'blood',src:'ult',col:0xff3050});burst(P.x,P.y+1,P.z,0xff3050,80,12);G.flash=.5;G.shake=.9})}
  else if(id==='ghoulkid'){H3.kak=12;stats()}
  else if(id==='watersword'){const t=inRange(P.x,P.z,14).slice(0,10);t.forEach((e,i)=>later(i*.1,()=>{if(e.dead)return;const a=Math.atan2(e.x-P.x,e.z-P.z);lineHit(P.x,P.z,a,Math.hypot(e.x-P.x,e.z-P.z)+1,.8,90,'frost','ult',0x8ae0ff);P.x=e.x-Math.sin(a)*.8;P.z=e.z-Math.cos(a)*.8;collide(P,.4)}));P.inv=1.5}
  else if(id==='blindfold'){H3.dmn=5;banner('领域展开','无边无际的虚空');G.flash=.6}
  else if(id==='copyninja'){const t=nearest(P.x,P.z,20);const a=t?Math.atan2(t.x-P.x,t.z-P.z):P.face;lineHit(P.x,P.z,a,18,1.4,180,'volt','ult',0x9ad8ff);P.x+=Math.sin(a)*8;P.z+=Math.cos(a)*8;collide(P,.4);P.inv=.8;if(t)chain(t,6,80,'ult')}
  else if(id==='rubber'){later(.5,()=>{inRange(P.x,P.z,7).forEach(e=>hit(e,250,{src:'ult',np:1,kb:18,fx:e.x-P.x,fz:e.z-P.z}));fxRing(P.x,P.z,7,0xe8c8a8);burst(P.x,P.y+.5,P.z,0xe8c8a8,60,12);G.shake=1})}
  else if(id==='bald'){const a=aim(30);banner('认真一拳','');for(const e of enemies){if(e.dead||e.ally)continue;const dx=e.x-P.x,dz=e.z-P.z;let da=Math.atan2(dx,dz)-a;da=Math.atan2(Math.sin(da),Math.cos(da));if(Math.abs(da)>.8)continue;
      if(e.boss){const v=e.max*.3;e.hp-=v;track('ult',v)}else{track('ult',e.hp);e.hp=0;kill(e,{})}}G.flash=.8;G.shake=1.2}
  else if(id==='oathking'){const a=aim(40);for(let i=0;i<6;i++)later(.4+i*.15,()=>lineHit(P.x,P.z,a,40,4,120,'fire','ult',0xffe080));G.flash=.5}
  else if(id==='sawboy'){H3.saw=12;banner('拉绳','');burst(P.x,P.y+1.5,P.z,0xff3040,40,8)}
  else if(id==='scout'){for(let i=0;i<24;i++)later(i*.04,()=>{const a=i/24*TAU*2;P.x+=Math.sin(a)*1.2;P.z+=Math.cos(a)*1.2;collide(P,.4);arcHit(a,2.6,TAU,120/6,'phys','ult',6,0xe8f0ff)});P.inv=1.2}
  else if(id==='pilot'){H3.berserk=12;stats();banner('暴走','');G.flash=.4}
  else if(id==='suit'){const t=inRange(P.x,P.z,16).slice(0,20);t.forEach((e,i)=>later(i*.15,()=>{if(e.dead)return;const a=Math.atan2(e.x-P.x,e.z-P.z);shoot('dagger',a,40,{dmg:120,pierce:1,life:.6,el:'phys',src:'ult',fc:true})}))}}
wrapHook('castUlt',o=>()=>{if(!P||P.ult<100||G.state!=='play'||!HDEF[P.hunter]){o();return}const H=HDEF[P.hunter];
  P.ult-=100;AU.sfx('ult');G.shake=Math.max(G.shake,.5);ultFx=1;ultRing.material.color.set(H.acc);if(P.rel.grail)healP(S.maxHp*.3,true);banner(H.ult.n,'');ult3(P.hunter);if(typeof homageUlt==='function')homageUlt()});
wrapHook('relicUpdate',o=>dt=>{o(dt);
  if(H3.kak>0){H3.kak-=dt;if(H3.kak<=0)stats()}if(H3.saw>0)H3.saw-=dt;H3.atf-=dt;if(H3.gunT>0)H3.gunT-=dt*.2;
  if(H3.berserk>0){H3.berserk-=dt;if(H3.berserk<=0)stats()}
  if(P.hunter==='blindfold')query(P.x,P.z,1.5,e=>{if((e.x-P.x)**2+(e.z-P.z)**2<2.4)e.st.slow=.5});
  if(H3.dmn>0){H3.dmn-=dt;inRange(P.x,P.z,15).forEach(e=>{if(!e.boss)e.st.frozen=Math.max(e.st.frozen,.3);if((e.hc.dm||0)<RUN.t){e.hc.dm=RUN.t+.5;hit(e,40,{src:'ult',np:1})}});postMat.uniforms.slow.value=1}
  if(P.hunter==='rubber')ebolts=ebolts;
  for(const pw of H3.pawns){pw.t-=dt;pw.cd-=dt;if(pw.cd<=0){pw.cd=.6;const t=nearest(pw.x,pw.z,14);if(t){const a=Math.atan2(t.x-pw.x,t.z-pw.z);proj.push({k:'shard',x:pw.x,z:pw.z,y:hAt(pw.x,pw.z)+1,vx:Math.sin(a)*20,vz:Math.cos(a)*20,rot:a,life:.8,dmg:pw.dmg,pierce:1,hits:new Set(),el:'dark',src:'pawn'})}}}
  H3.pawns=H3.pawns.filter(p=>p.t>0)});
wrapHook('homageRender',o=>()=>{o();pawnKind.begin();if(P)for(const pw of H3.pawns)pawnKind.add(pw.x,hAt(pw.x,pw.z),pw.z,0,1);pawnKind.end()});
wrapHook('newRun',o=>(h,d)=>{Object.assign(H3,{pawns:[],kak:0,saw:0,berserk:0,dmn:0,lastHurt:0,limit:0,limitHits:0,atf:0,gunT:0});o(h,d)});
// 橡胶：雷电伤害无效（敌方弹幕视为雷电）
wrapHook('hurtPlayer',o=>d=>{if(P&&P.hunter==='rubber'&&d===13*DIFFS[RUN.diff].dmg*(1+RUN.stage*.3))return;o(d)});

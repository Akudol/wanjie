/* ============ 万界乱斗 · 名作致敬遗物 ============
   只借用"设定与玩法套路"，不使用任何作品名、角色名或原招式名。 */
Object.assign(ICONS,{
  hmask:'<path d="M4 6c4-3 12-3 16 0v5c0 5-4 9-8 9s-8-4-8-9z"/><path d="M7 10l3 1M17 10l-3 1M9 16h6"/>',
  fist:'<path d="M6 10V7a2 2 0 0 1 4 0v3M10 9V6a2 2 0 0 1 4 0v4M14 9V7a2 2 0 0 1 4 0v6a7 7 0 0 1-7 7H9a5 5 0 0 1-5-5v-3a2 2 0 0 1 2-2z"/>',
  watch:'<circle cx="12" cy="13" r="7"/><path d="M12 9v4l3 2M10 2h4M12 2v4"/>',
  note:'<path d="M5 3h12a2 2 0 0 1 2 2v16H7a2 2 0 0 1-2-2z"/><path d="M9 8h6M9 12h6M9 16h3"/>',
  fire2:'<path d="M12 22c-4 0-6-3-6-6 0-4 4-6 4-11 3 2 7 6 7 11 0 3-2 6-5 6z"/><path d="M12 22v-6l-2-2"/>',
  wave:'<path d="M4 18C8 10 14 6 21 5c-3 3-5 8-6 14"/><path d="M3 21l4-3"/>',
  scroll:'<path d="M6 4h11a2 2 0 0 1 0 4H8v10a2 2 0 0 1-4 0V6a2 2 0 0 1 2-2z"/><path d="M8 18h11a2 2 0 0 0 0-4"/>',
  sphere:'<circle cx="12" cy="10" r="7"/><path d="M8 21l4-4 4 4M12 17v-2"/><circle cx="10" cy="8" r="2"/>',
  spiky:'<path d="M4 14l2-7 3 4 3-8 3 8 3-4 2 7z"/><path d="M6 14c0 4 3 7 6 7s6-3 6-7"/>',
  seal:'<path d="M12 3c-2 3-6 4-6 8s3 6 6 6 6-2 6-6-4-5-6-8z"/><path d="M8 20h8M9 11c1 2 5 2 6 0"/>',
  ball:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><circle cx="12" cy="12" r="2.5"/>',
  whip:'<path d="M4 20L8 16M8 16c6-2 12-6 13-12-3 6-8 9-13 9"/>',
  echo2:'<path d="M12 3c3 5 6 8 6 12a6 6 0 0 1-12 0c0-4 3-7 6-12z"/><path d="M9 15a3 3 0 0 0 6 0"/>',
  chip:'<path d="M7 7h10v10H7z"/><path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4"/>',
  hack:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><path d="M9 12h2l1-2 1 4 1-2h1"/>',
  hat:'<path d="M3 19h18M6 19c2-4 3-9 4-15 2 2 5 4 7 6-2 1-3 4-3 9"/>',
  stag:'<path d="M8 8L5 3M8 8l-4 1M16 8l3-5M16 8l4 1"/><path d="M8 8h8l-1 6-3 7-3-7z"/>',
  katana:'<path d="M4 20l12-12M8 20l12-12"/><path d="M3 21l3-1M7 21l3-1"/>',
  bullet:'<path d="M3 12h12l5-3v6l-5-3"/><path d="M6 9v6"/>',
  meter:'<path d="M3 7h18v10H3z"/><path d="M6 9v6M9 9v6M12 13v2M15 9v6M18 9v6"/>',
});
const HOMAGE={
  persona:{r:3,tag:'dark',n:'人格面具',icon:'hmask',d:'内心的另一个人格戴着面具现身，每 7 秒释放一次随机元素大技能；大技能命中 8 名以上敌人时可能触发全员围殴。',hint:'面具与内心的另一个自己'},
  stand:{r:3,tag:'motion',n:'灵魂替身',icon:'fist',d:'身后浮现只有你能驱使的人形灵体，对附近敌人打出一轮高速连拳，最后一拳将其击飞。',hint:'站在身后的灵体'},
  zawarudo:{r:3,tag:'time',n:'灰色世界怀表',icon:'watch',d:'每 25 秒，世界褪成灰色、时间停止 4 秒。停止期间造成的伤害先被储存，时间恢复时一次性爆发 ×1.5。',hint:'只有你能在静止的时间中行动'},
  deathnote:{r:3,tag:'dark',n:'死神手记',icon:'note',d:'自动在手记上写下场上最强敌人的名字，40 秒后它将心脏骤停而死（首领损失 10% 生命）。',hint:'写下名字的那个人'},
  bonfire:{r:2,tag:'fire',n:'余火篝火',icon:'fire2',d:'站定 3 秒且附近无敌时点燃篝火：生命回满并获得 20 秒伤害 +25%。代价：周围的敌人复活。冷却 60 秒。',hint:'在篝火旁休息，世界随之重置'},
  swordbeam:{r:1,tag:'motion',n:'满血剑气',icon:'wave',d:'生命全满时，每秒向最近的敌人挥出一道穿透剑气。',hint:'满心时挥剑会放出光'},
  clone:{r:2,tag:'motion',n:'影分身卷轴',icon:'scroll',d:'每次冲刺留下一个影分身（最多 3 个），持续 4 秒，向敌人投掷手里剑。',hint:'结印，分身'},
  spiritbomb:{r:3,tag:'volt',n:'众生之力球',icon:'sphere',d:'站定后举起双手汇聚周围的力量，能量球持续变大（最多 4 秒）；移动时掷向敌人最密集处，造成巨大范围伤害。',hint:'大家，把力量借给我'},
  sayan:{r:3,tag:'fire',n:'怒发金焰',icon:'spiky',d:'击杀与受伤积攒怒气，满怒后头发竖起、金焰缠身 15 秒：伤害、移速与攻速大幅提升。每次觉醒更强，最高三阶。',hint:'愤怒到极点时的金色觉醒'},
  command:{r:2,tag:'bone',n:'三道令咒',icon:'seal',d:'手背刻有 3 道令咒。释放大招时消耗一道，强制所有眷属发动全力一击。',hint:'刻在手背上的三次绝对命令',need:'fam'},
  capture:{r:2,tag:'bone',n:'收容之球',icon:'ball',d:'自动向生命低于 25% 的精英投出收容球，收服后它会为你战斗 30 秒。冷却 25 秒。',hint:'把虚弱的对手收进球里'},
  whip:{r:2,tag:'blood',n:'吸血猎人之鞭',icon:'whip',d:'每 1.1 秒向前方甩出 7 米长鞭，横扫路径上的敌人并施加出血。',hint:'世代猎杀夜之一族的鞭子'},
  rally:{r:1,tag:'blood',n:'血之回响',icon:'echo2',d:'受伤后 3 秒内反击，可以把损失的生命按造成伤害的 20% 抢回来。',hint:'以血还血，越战越勇'},
  sandevistan:{r:2,tag:'motion',n:'义体·时滞加速',icon:'chip',d:'冲刺时激活神经加速义体：周围世界减速至 25%，持续 2.5 秒，留下残影。冷却 12 秒。',hint:'义体让时间为你放慢'},
  quickhack:{r:2,tag:'volt',n:'骇入义眼',icon:'hack',d:'每 6 秒远程骇入 3 名敌人：短路、过热、系统重启或病毒扩散，随机其一。',hint:'用义眼远程入侵'},
  sortinghat:{r:2,tag:'gold',n:'分院之帽',icon:'hat',d:'戴上这顶会说话的旧帽子，它会根据你的构筑把你分进四个学院之一，获得对应学院的永久加成。',hint:'它会读你的心'},
  patronus:{r:2,tag:'frost',n:'银色守护兽',icon:'stag',d:'每 7 秒召唤银色雄鹿冲过敌人群；对怨灵与幽魂伤害 ×3 并使其惊逃。',hint:'用最快乐的回忆召唤守护'},
  deadpool:{r:3,tag:'blood',n:'嘴炮佣兵的面罩',icon:'katana',d:'再生因子：每秒回复 2% 生命。被包围时双刀乱斩。每 25 秒打破第四面墙，抄起血条痛殴最强的敌人。',hint:'红衣、双刀、话很多'},
  truthbullet:{r:2,tag:'gold',n:'真相言弹',icon:'bullet',d:'每 5 秒向最强的敌人射出一发言弹；命中精英或首领时当场驳倒：造成其当前生命 25% 的伤害（首领 5%）。',hint:'用言弹击穿矛盾'},
  divergence:{r:3,tag:'time',n:'世界线变动率计',icon:'meter',d:'持续记录过去 10 秒。你将要死亡时，意识跳回 8 秒前的世界线（每层一次）。',hint:'跳回过去，改变世界线'},
};
for(const[k,v]of Object.entries(HOMAGE))RELICS[k]=v;
const _relicAllowed=relicAllowed;relicAllowed=function(id){if(id==='command'&&!fams.length)return false;return _relicAllowed(id)};

/* ---------- 召唤物像素图 ---------- */
function drawPersona(g,f){const b=[0,-1,-2,-1][f],coat=g.part('#1c1c30'),coatL=g.part('#34345a'),scarf=g.part('#d01c34'),mask=g.part('#f6f0e6'),eye=g.part('#ffd040',{flat:1,noOutline:1}),chain=g.part('#9a9aac'),gold=g.part('#e4b440');
  g.poly(coat,[[18,18+b],[30,18+b],[42,62],[6,62]]);g.poly(coatL,[[22,22+b],[26,22+b],[29,60],[19,60]]);
  g.line(coat,17,21+b,5,36+b,4);g.line(coat,31,21+b,43,36+b,4);g.ell(coatL,4,37+b,2.5,2.5);g.ell(coatL,44,37+b,2.5,2.5);
  g.poly(scarf,[[15,16+b],[33,16+b],[35,22+b],[13,22+b]]);g.poly(scarf,[[30,20+b],[42,28+b+(f&1)],[46,44+b],[36,34+b]]);
  for(let i=0;i<5;i++)g.px(chain,12+i,46+i*2);for(let i=0;i<5;i++)g.px(chain,36-i,46+i*2);
  g.poly(coat,[[16,8+b],[24,-1+b],[32,8+b],[30,4+b],[24,2+b],[18,4+b]]);g.ell(mask,24,10+b,6.5,7.5);g.rect(eye,19,9+b,4,1);g.rect(eye,26,9+b,4,1);g.rect(gold,23,4+b,2,3);g.rect(coatL,22,15+b,5,1)}
function drawStand(g,f){const skin=g.part('#7a5ac8'),plate=g.part('#e4c060'),dark=g.part('#3a2a6a'),eye=g.part('#7affd8',{flat:1,noOutline:1}),heart=g.part('#ff4a8a',{flat:1});
  g.poly(dark,[[13,26],[27,26],[26,50],[22,50],[20,40],[18,50],[14,50]]);
  g.poly(skin,[[9,14],[31,14],[28,28],[12,28]]);g.rect(plate,17,17,6,2);g.px(heart,19,22);g.px(heart,20,22);g.px(heart,19,23);
  const P=[[[7,16,6,30],[33,16,34,30]],[[7,16,14,8],[33,16,34,30]],[[7,16,6,30],[33,16,26,8]],[[7,16,12,6],[33,16,28,6]]][f];
  for(const[ax,ay,bx,by]of P){g.line(skin,ax,ay,bx,by,4);g.ell(plate,bx,by,3,3)}
  g.ell(skin,20,8,5.5,6);g.rect(plate,14,4,12,2);g.poly(plate,[[18,1],[22,1],[20,4]]);g.rect(dark,16,8,8,2);g.px(eye,17,8);g.px(eye,22,8)}
function drawStag(g,f){const body=g.part('#dceaff',{soft:1}),glow=g.part('#ffffff',{flat:1}),ant=g.part('#b8d0ff',{soft:1});
  const L=[[0,2,0,-2],[2,0,-2,0],[0,-2,0,2],[-2,0,2,0]][f];
  g.ell(body,22,22,12,6);g.line(body,14,26,12+L[0],38,2);g.line(body,18,26,18+L[1],38,2);g.line(body,27,26,26+L[2],38,2);g.line(body,31,25,33+L[3],38,2);
  g.line(body,32,19,38,10,4);g.ell(body,40,9,4,3);g.px(glow,41,8);
  g.line(ant,38,6,34,0,1);g.line(ant,36,3,32,2,1);g.line(ant,41,6,46,0,1);g.line(ant,44,3,47,4,1);g.line(body,10,20,6,16,1.5)}
function drawBonfire(g,f){const ash=g.part('#6a6268'),coal=g.part('#3a2a26'),sword=g.part('#c8c8d4'),hilt=g.part('#5a4a3a'),fl1=g.part('#ff8a20',{flat:1,noOutline:1}),fl2=g.part('#ffd060',{flat:1,noOutline:1}),fl3=g.part('#fff4c8',{flat:1,noOutline:1});
  g.ell(ash,12,28,10,3.5);for(let i=0;i<5;i++)g.ell(coal,5+i*3.5,27+(i&1),1.5,1);
  const s=f&1,t=f>>1;g.poly(fl1,[[5,28],[7,18+s],[9,22],[11,12+t],[13,21],[15,16-s],[17,22],[19,28]]);g.poly(fl2,[[8,28],[10,21],[12,17+s],[14,22],[16,28]]);g.poly(fl3,[[10,28],[12,23],[14,28]]);
  g.line(sword,13,27,16,6,1.4);for(let y=10;y<26;y+=3)g.px(hilt,14+(y%2),y);g.rect(hilt,14,4,4,2);g.line(hilt,16,3,16,0,1)}
const HPX={};
(function(){const one=(name,W,H,fn,h,max,rate)=>{const def={w:W,h:H,canvas:PXG.sheet(W,H,4,(g,f)=>fn(g,f))};HPX[name]=new PixKind(def,4,0,h,max,rate)};
  one('persona',48,64,drawPersona,4.2,1,3);one('stand',40,52,drawStand,2.6,1,14);one('stag',48,40,drawStag,2,1,10);one('bonfire',24,32,drawBonfire,1.4,3,8)})();
const bombMesh=new THREE.Group();{const a=new THREE.Mesh(GEO.sph,addM(0x5ac8ff,.55)),b=new THREE.Mesh(GEO.sph,addM(0xe8f8ff,.9));b.scale.setScalar(.6);bombMesh.add(a,b);bombMesh.visible=false;scene.add(bombMesh)}
const auraSpr=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTex,color:0xffd040,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));auraSpr.visible=false;scene.add(auraSpr);
K.crescent=new Kind([{g:new THREE.TorusGeometry(.9,.12,4,16,Math.PI),m:addM(0xe8f4ff,.95),l:L(0,0,0,Math.PI/2,0,Math.PI/2)}],40);
K.tbullet=new Kind([{g:GEO.cone,m:bas(0xffd860),l:L(0,0,0,Math.PI/2,0,0,.18,.7,.18)},{g:GEO.sph,m:addM(0xffb030,.5),l:L(0,0,-.2,0,0,0,.4,.4,.9)}],20);

/* ---------- 状态 ---------- */
const QUIPS=['嘿，屏幕前的你，对，就是你。这血条借我用一下。','这一下算你的，记得给我加戏份。','我用血条打人，这很合理，因为这是电子游戏。','编剧说我不能打破第四面墙……哦，已经打破了。','这个首领？我在预告片里见过，挺菜的。','再来十个！不，等等，五个就够了。'];
const HOUSES=[{id:'lion',n:'狮之学院',c:'#e04030',d:'生命低于 50% 时伤害 +30%，击退加强。',say:'勇敢的心……就是这里！'},{id:'eagle',n:'鹰之学院',c:'#4a8aff',d:'经验获取 +20%，武器冷却 -10%。',say:'聪慧的头脑，嗯，不错不错。'},{id:'badger',n:'獾之学院',c:'#e8c040',d:'眷属伤害 +50%，每秒回复 +0.6。',say:'忠诚又可靠，就是你了。'},{id:'snake',n:'蛇之学院',c:'#30b070',d:'金币 +40%，暴击率 +10%。',say:'野心勃勃……你会成就伟业的。'}];
function hm(){return P.hm||(P.hm={persT:5,persFx:0,standT:2,bar:null,zwT:25,zwOn:false,dn:null,dnPick:3,bfCd:0,bfBuff:0,fires:[],swT:1,clones:[],ghosts:[],sb:{c:0,on:false,fly:null,cd:0},rage:0,ssj:0,tier:0,seals:0,capCd:0,whipT:1,rallyPool:0,rallyT:0,sandCd:0,hackT:4,house:null,patT:5,stag:null,dpT:25,kataCd:0,tbT:3,hist:[],histT:0,leapUsed:false})}
function homageObtain(id){const h=hm();if(id==='command'){h.seals+=3;toast('三道令咒','手背上浮现出三道红色纹路','seal')}
  if(id==='sortinghat'&&!h.house){const tags={};for(const it of P.box)if(it){const t=RELICS[it.id].tag;tags[t]=(tags[t]||0)+1}
    const score=[ (tags.blood||0)+(tags.fire||0), (tags.time||0)+(tags.volt||0)+(tags.frost||0), (tags.bone||0)+fams.length*2, (tags.gold||0)+(tags.dark||0)];
    let best=0;for(let i=1;i<4;i++)if(score[i]+Math.random()*.5>score[best])best=i;h.house=HOUSES[best];
    toast('分院之帽：“嗯……难，非常难……”',h.house.say,'hat');setTimeout(()=>{banner(h.house.n+'！',h.house.d);stats()},1600)}
  if(id==='divergence')toast('世界线变动率',(Math.random()*1.2).toFixed(6)+'%','meter')}
const _addRelic=addRelic;addRelic=function(id,opt){_addRelic(id,opt);if(HOMAGE[id])homageObtain(id)};
function homageStats(){if(!P.hm&&!P.rel.deadpool)return;const h=hm(),r=P.rel;
  if(r.deadpool)S.regen+=S.maxHp*.02*r.deadpool;
  if(h.ssj>0)S.spd*=1.25+.05*h.tier;
  if(h.house){const id=h.house.id;if(id==='eagle'){S.xp+=.2;S.cd*=.9}else if(id==='badger')S.regen+=.6;else if(id==='snake'){S.gold*=1.4;S.crit+=.1}}}
function homageCd(){const h=P.hm;return h&&h.ssj>0?.8:1}
function homageDmgMul(e,o){const h=P.hm;if(!h)return 1;let m=1;
  if(h.ssj>0)m*=[1,1.5,1.8,2.2][h.tier];if(h.bfBuff>0)m*=1.25;
  if(h.house){if(h.house.id==='lion'&&P.hp<S.maxHp*.5)m*=1.3;if(h.house.id==='badger'&&o.src==='fam')m*=1.5}
  if(P.rel.patronus&&o.src==='patronus'&&e.D.ghost)m*=3;return m}
function homageOnHit(e,o,dmg){const h=P.hm;if(!h)return;
  if(P.rel.rally&&h.rallyT>0&&h.rallyPool>0&&!o.dot){const v=Math.min(h.rallyPool,dmg*.2);h.rallyPool-=v;healP(v)}
  if(o.src==='truth'&&(e.elite||e.boss)&&!o.dot){const v=e.boss?e.max*.05:e.hp*.25;showReact(e,'论破！');burst(e.x,e.y+1.5,e.z,0xffd860,24,8);G.shake=Math.max(G.shake,.3);e.hp-=v;track('relic',v)}}
function homageOnKill(e){const h=P.hm;if(!h)return;if(P.rel.sayan&&h.ssj<=0)h.rage=Math.min(100,h.rage+1.1)}
function homageOnHurt(d){const h=P.hm;if(!h)return d;if(P.rel.sayan&&h.ssj<=0)h.rage=Math.min(100,h.rage+d*.9);if(P.rel.rally){h.rallyPool+=d;h.rallyT=3}return d}
function homageCheatDeath(){const h=P.hm;if(!h||!P.rel.divergence||h.leapUsed||!h.hist.length)return false;
  const s=h.hist[0];h.leapUsed=true;P.x=s.x;P.z=s.z;P.hp=Math.max(s.hp,S.maxHp*.4);P.inv=2;ebolts=[];teleList=[];G.flash=.8;
  banner('世界线变动率 '+(Math.random()*1.5).toFixed(6)+'%','意识跳回了 8 秒前');AU.sfx('evo');return true}
function homageDash(){const h=hm(),r=P.rel;
  if(r.clone){h.clones.push({x:P.x,z:P.z,t:4,cd:.2});if(h.clones.length>3*r.clone)h.clones.shift()}
  if(r.sandevistan&&h.sandCd<=0){h.sandCd=12;G.slow=2.5;AU.sfx('ult');showReact({x:P.x,y:P.y,z:P.z,s:1},'义体加速')}}
function homageUlt(){const h=P.hm;if(!h||!P.rel.command||h.seals<=0||!fams.length)return;h.seals--;banner('令咒发动','全力一击！（剩余 '+h.seals+' 道）');
  for(const f of fams){fxRing(f.x,f.z,6,0xff3050);burst(f.x,f.y+1,f.z,0xff3050,30,8);inRange(f.x,f.z,6).forEach(e=>hit(e,220,{src:'fam',np:1,kb:10,fx:e.x-f.x,fz:e.z-f.z}))}}
function allyTick(e,dt){e.allyT-=dt;if(e.allyT<=0){e.dead=true;burst(e.x,e.y+1,e.z,0x7dffb0,16,5);return}
  let best=null,bd=400;for(const o of enemies){if(o===e||o.dead||o.ally)continue;const d=(o.x-e.x)**2+(o.z-e.z)**2;if(d<bd){bd=d;best=o}}
  let tx=best?best.x:P.x+1.5,tz=best?best.z:P.z+1.5;const dx=tx-e.x,dz=tz-e.z,d=Math.hypot(dx,dz)||1;if(d>1)e.x+=dx/d*e.spd*1.4*dt,e.z+=dx===0&&dz===0?0:dz/d*e.spd*1.4*dt;
  e.y=hAt(e.x,e.z);e.rot=Math.atan2(dx,dz);e.t+=dt*3;e.atkT=(e.atkT||0)-dt;
  if(best&&d<e.r+best.r+.4&&e.atkT<=0){e.atkT=.6;hit(best,e.dmg*3,{src:'fam',np:1,kb:4,fx:dx,fz:dz})}}
function densest(R=25){let best=null,bc=0;for(let i=0;i<enemies.length;i+=Math.max(1,(enemies.length/60)|0)){const e=enemies[i];if(e.dead||e.ally||(e.x-P.x)**2+(e.z-P.z)**2>R*R)continue;let c=0;query(e.x,e.z,4,()=>{c++});if(c>bc){bc=c;best=e}}return best}

/* ---------- 每帧 ---------- */
function homageUpdate(dt){const r=P.rel,h=hm();
  // 世界线：记录
  if(r.divergence){h.histT-=dt;if(h.histT<=0){h.histT=.5;h.hist.push({x:P.x,z:P.z,hp:P.hp});if(h.hist.length>17)h.hist.shift()}}
  // 时停（储存伤害）
  if(r.zawarudo){h.zwT-=dt;if(h.zwT<=0){h.zwT=25;G.timeStop=4;h.zwOn=true;banner('时间停止','世界褪成了灰色');AU.sfx('boss')}}
  if(h.zwOn&&G.timeStop<=0){h.zwOn=false;let n=0;for(const e of enemies)if(e.stored&&!e.dead){const v=e.stored*1.5;e.stored=0;e.hp-=v;track('relic',v);showDmg(e.x,e.y+2,e.z,v,true);n++;if(e.hp<=0)kill(e,{})}
    if(n)banner('时间开始流动','储存的伤害一次性爆发');G.shake=.5}
  // 人格面具
  if(r.persona){h.persT-=dt;h.persFx-=dt;if(h.persT<=0){h.persT=7/r.persona;h.persFx=1.6;const el=pick(['volt','frost','fire','dark']);const nm={volt:'雷霆大技',frost:'冰结大技',fire:'业火大技',dark:'咒怨大技'}[el];showReact({x:P.x,y:P.y+3,z:P.z,s:1},nm);
    let hits=0;if(el==='volt'){inRange(P.x,P.z,14).sort(()=>Math.random()-.5).slice(0,6).forEach(e=>{strike(e.x,e.z,60,2.4,false);hits+=3})}
    else if(el==='frost'){frostRings.push({x:P.x,z:P.z,r:0,max:11,delay:0,hit:new Set(),dmg:50,stack:3});hits=inRange(P.x,P.z,11).length}
    else if(el==='fire'){const t=inRange(P.x,P.z,8);t.forEach(e=>{hit(e,70,{el:'fire',src:'relic',np:1,kb:6,fx:e.x-P.x,fz:e.z-P.z})});hits=t.length;fxRing(P.x,P.z,8,0xff7030)}
    else{const t=inRange(P.x,P.z,12);t.forEach(e=>{hit(e,40,{el:'dark',src:'relic',np:1})});hits=t.length;fxRing(P.x,P.z,12,0xc070ff)}
    if(hits>=8&&Math.random()<.35){setTimeout(()=>{if(!P)return;banner('全员围殴！','');const t=inRange(P.x,P.z,9);t.forEach(e=>{hit(e,90,{src:'relic',np:1,kb:12,fx:e.x-P.x,fz:e.z-P.z});burst(e.x,e.y+1,e.z,0xe8e0d0,6,6)});G.shake=.6},700)}}}
  // 替身
  if(r.stand){h.standT-=dt;if(!h.bar&&h.standT<=0){const t=nearest(P.x,P.z,7);if(t){h.bar={t,n:12,k:0}}h.standT=2.4/r.stand}
    if(h.bar){h.bar.k-=dt;if(h.bar.t.dead||h.bar.n<=0)h.bar=null;else if(h.bar.k<=0){h.bar.k=.075;h.bar.n--;const e=h.bar.t,fin=h.bar.n===0;hit(e,fin?34:8,{src:'relic',np:1,kb:fin?16:1.5,fx:e.x-P.x,fz:e.z-P.z});burst(e.x,e.y+1.2,e.z,0xb090ff,2,4);if(h.bar.n%4===0)showReact(e,fin?'击飞！':'连打！')}}}
  // 死神手记
  if(r.deathnote){if(h.dn&&h.dn.e.dead)h.dn=null;if(!h.dn){h.dnPick-=dt;if(h.dnPick<=0){let best=null;for(const e of enemies)if(!e.dead&&!e.ally&&(!best||e.max>best.max))best=e;if(best){h.dn={e:best,t:40};showReact(best,'名字已被写下');toast('死神手记','写下了：'+best.D.n,'note')}h.dnPick=5}}
    else{const pt=h.dn.t;h.dn.t-=dt;if(Math.floor(pt/10)!==Math.floor(h.dn.t/10)&&h.dn.t>0)showReact(h.dn.e,'余命 '+Math.ceil(h.dn.t)+' 秒');
      if(h.dn.t<=0){const e=h.dn.e;h.dn=null;showReact(e,'心脏骤停');if(e.boss){const v=e.max*.1;e.hp-=v;track('relic',v)}else{track('relic',e.hp);e.hp=0;kill(e,{})}}}}
  // 篝火
  h.bfCd-=dt;h.bfBuff-=dt;for(const f of h.fires)f.t-=dt;h.fires=h.fires.filter(f=>f.t>0);
  if(r.bonfire&&h.bfCd<=0&&P.stillT>=3&&!inRange(P.x,P.z,6).length){h.bfCd=60;h.bfBuff=20;h.fires.push({x:P.x+.8,z:P.z+.8,t:20});P.hp=S.maxHp;banner('篝火已点燃','生命回满——但敌人复活了');AU.sfx('heal');
    for(let i=0;i<8;i++){const a=i/8*TAU;spawnEnemy(pickType(),P.x+Math.sin(a)*10,P.z+Math.cos(a)*10)}}
  // 满血剑气
  if(r.swordbeam&&P.hp>=S.maxHp-.01){h.swT-=dt;if(h.swT<=0){h.swT=1/r.swordbeam;const t=nearest(P.x,P.z,20);const a=t?Math.atan2(t.x-P.x,t.z-P.z):P.face;shoot('crescent',a,20,{dmg:26,pierce:4,life:1,el:'phys',src:'relic'})}}
  // 影分身
  for(const c of h.clones){c.t-=dt;c.cd-=dt;if(c.cd<=0){c.cd=.5;const t=nearest(c.x,c.z,14);if(t){const a=Math.atan2(t.x-c.x,t.z-c.z);proj.push({k:'shard',x:c.x,z:c.z,y:hAt(c.x,c.z)+1,vx:Math.sin(a)*18,vz:Math.cos(a)*18,rot:a,life:.9,dmg:12,pierce:1,hits:new Set(),el:'phys',src:'relic'})}}}
  h.clones=h.clones.filter(c=>c.t>0);for(const g2 of h.ghosts)g2.t-=dt;h.ghosts=h.ghosts.filter(g2=>g2.t>0);
  // 义体
  h.sandCd-=dt;if(G.slow>0){G.slow-=dt;if(Math.random()<.5)h.ghosts.push({x:P.x,z:P.z,y:P.y,t:.35,f:Math.floor(G.rt*9)%4})}
  // 众生之力球
  const sb=h.sb;sb.cd-=dt;
  if(r.spiritbomb){if(!sb.on&&!sb.fly&&sb.cd<=0&&P.stillT>=1)sb.on=true;
    if(sb.on){sb.c=Math.min(4,sb.c+dt);if(Math.random()<.6){const a=rand(0,TAU),R=rand(5,9);parts.push({x:P.x+Math.sin(a)*R,y:P.y+rand(1,5),z:P.z+Math.cos(a)*R,vx:-Math.sin(a)*R*1.4,vy:2.5,vz:-Math.cos(a)*R*1.4,life:.6,max:.6,c:new THREE.Color(0x8ad8ff)})}
      if(P.moving||sb.c>=4){const t=densest();if(t){sb.fly={x:P.x,y:P.y+3.6,z:P.z,tx:t.x,tz:t.z,t:0,c:sb.c};showReact({x:P.x,y:P.y+2,z:P.z,s:1},'接招吧！')}sb.on=false;sb.c=0;sb.cd=3}}
    if(sb.fly){const F=sb.fly;F.t+=dt/.8;const k=Math.min(1,F.t);bombMesh.position.set(F.x+(F.tx-F.x)*k,F.y+(hAt(F.tx,F.tz)+.5-F.y)*k,F.z+(F.tz-F.z)*k);
      if(F.t>=1){const R=3+F.c*1.6,dm=60+F.c*130;inRange(F.tx,F.tz,R).forEach(e=>hit(e,dm,{src:'relic',np:1,kb:14,fx:e.x-F.tx,fz:e.z-F.tz}));fxRing(F.tx,F.tz,R,0x8ad8ff);burst(F.tx,hAt(F.tx,F.tz)+1,F.tz,0xbfe8ff,60,12);G.shake=.9;G.flash=.4;AU.sfx('bolt');sb.fly=null}}}
  bombMesh.visible=!!(sb.on||sb.fly);if(sb.on){bombMesh.position.set(P.x,P.y+3.6+sb.c*.3,P.z)}if(bombMesh.visible){const s=.5+(sb.fly?sb.fly.c:sb.c)*.45;bombMesh.scale.setScalar(s*(1+Math.sin(G.rt*12)*.04))}
  // 怒发金焰
  if(r.sayan){if(h.ssj>0){h.ssj-=dt;if(Math.random()<.35)burst(P.x+rand(-.6,.6),P.y+rand(.5,2),P.z+rand(-.6,.6),h.tier>=2?0xbfe8ff:0xffd040,1,2);if(h.ssj<=0)stats()}
    else if(h.rage>=100){h.rage=0;h.tier=Math.min(3,h.tier+1);h.ssj=15;banner('金焰觉醒 · '+['','一','二','三'][h.tier]+'阶','头发竖起，金色的气焰包裹全身');G.flash=.7;G.shake=.8;AU.sfx('evo');fxRing(P.x,P.z,8,0xffd040);inRange(P.x,P.z,6).forEach(e=>hit(e,80,{src:'relic',np:1,kb:16,fx:e.x-P.x,fz:e.z-P.z}));stats()}}
  auraSpr.visible=!!(r.sayan&&h.ssj>0);if(auraSpr.visible){const s=2.6+h.tier*.4+Math.sin(G.rt*18)*.15;auraSpr.scale.set(s,s*1.4,1);auraSpr.position.set(P.x,P.y+1.3,P.z);auraSpr.material.color.set(h.tier>=3?0xffe890:0xffc830)}
  // 收容之球
  if(r.capture){h.capCd-=dt;if(h.capCd<=0)for(const e of enemies){if(e.elite&&!e.ally&&!e.dead&&e.hp<e.max*.25&&(e.x-P.x)**2+(e.z-P.z)**2<144){h.capCd=25;e.ally=true;e.allyT=30;e.hp=e.max*.6;e.elite=false;e.tint=new THREE.Color(.55,1,.7);burst(e.x,e.y+1,e.z,0xffffff,24,6);showReact(e,'收容成功！');toast('收容之球',e.D.n+' 成为了你的伙伴（30 秒）','ball');break}}}
  // 长鞭
  if(r.whip){h.whipT-=dt;if(h.whipT<=0){h.whipT=1.1;const a=P.face,len=7.5,dx=Math.sin(a),dz=Math.cos(a);const b=beams.find(b=>b.life<=0)||beams[0];b.life=.14;b.m.visible=true;b.m.material.color.set(0xc86040);b.m.position.set(P.x+dx*len/2,P.y+1.1,P.z+dz*len/2);b.m.scale.set(.35,.12,len);b.m.rotation.set(0,a,0);
    query(P.x+dx*len/2,P.z+dz*len/2,len/2+1,e=>{const px=e.x-P.x,pz=e.z-P.z,t=px*dx+pz*dz;if(t<0||t>len)return;if(Math.abs(px*dz-pz*dx)<1.2+e.r*.5)hit(e,28*r.whip,{el:'blood',src:'relic',np:1,kb:5,fx:dx,fz:dz})});AU.sfx('scythe')}}
  h.rallyT-=dt;if(h.rallyT<=0)h.rallyPool=0;
  // 骇入义眼
  if(r.quickhack){h.hackT-=dt;if(h.hackT<=0){h.hackT=6/r.quickhack;inRange(P.x,P.z,15).sort(()=>Math.random()-.5).slice(0,3).forEach(e=>{const q=pick(['短路','过热','系统重启','病毒扩散']);drawChain({x:P.x,y:P.y,z:P.z},e);showReact(e,q);
    if(q==='短路')hit(e,40,{el:'volt',src:'relic',np:1});else if(q==='过热')e.st.burn=5;else if(q==='系统重启')e.st.frozen=2;else{e.st.curse=6;let n=0;query(e.x,e.z,5,o=>{if(o!==e&&n<4){o.st.curse=6;n++}})}})}}
  // 银色守护兽
  if(r.patronus){h.patT-=dt;if(h.patT<=0&&!h.stag){h.patT=7/r.patronus;const t=densest(18);if(t){const a=Math.atan2(t.x-P.x,t.z-P.z);h.stag={x:P.x,z:P.z,a,t:0,hit:new Set()}}}
    if(h.stag){const s=h.stag;s.t+=dt;s.x+=Math.sin(s.a)*16*dt;s.z+=Math.cos(s.a)*16*dt;query(s.x,s.z,1.8,e=>{if(s.hit.has(e))return;if((e.x-s.x)**2+(e.z-s.z)**2<4){s.hit.add(e);hit(e,45,{el:'frost',src:'patronus',np:1,kb:8,fx:Math.sin(s.a),fz:Math.cos(s.a)});if(e.D.ghost){e.kx-=Math.sin(s.a)*-12;e.kz+=Math.cos(s.a)*12}}});
      if(Math.random()<.7)parts.push({x:s.x,y:hAt(s.x,s.z)+1,z:s.z,vx:0,vy:1,vz:0,life:.5,max:.5,c:new THREE.Color(0xdceaff)});if(s.t>1.1)h.stag=null}}
  // 佣兵
  if(r.deadpool){h.kataCd-=dt;h.dpT-=dt;
    if(h.kataCd<=0&&inRange(P.x,P.z,3).length>=8){h.kataCd=2;inRange(P.x,P.z,3.6).forEach(e=>hit(e,35,{src:'relic',np:1,kb:8,fx:e.x-P.x,fz:e.z-P.z}));fxRing(P.x,P.z,3.6,0xff3040);showReact({x:P.x,y:P.y+.5,z:P.z,s:1},'切切切！')}
    if(h.dpT<=0){h.dpT=25;let t=boss&&!boss.dead?boss:null;if(!t)for(const e of enemies)if(!e.dead&&!e.ally&&(!t||e.max>t.max))t=e;
      if(t){const v=t.boss?t.max*.04:t.elite?t.max*.15:t.hp+1;t.hp-=v;track('relic',v);showReact(t,'吃我血条！');burst(t.x,t.y+2,t.z,0xff3050,30,8);G.shake=.4;toast('第四面墙',pick(QUIPS),'katana');if(t.hp<=0&&!t.dead)kill(t,{})}}}
  // 真相言弹
  if(r.truthbullet){h.tbT-=dt;if(h.tbT<=0){h.tbT=5/r.truthbullet;let t=null;for(const e of enemies)if(!e.dead&&!e.ally&&(e.x-P.x)**2+(e.z-P.z)**2<400&&(!t||e.max>t.max))t=e;
    if(t){const a=Math.atan2(t.x-P.x,t.z-P.z);shoot('tbullet',a,28,{dmg:30,pierce:3,life:1.2,el:'phys',src:'truth'});showReact({x:P.x,y:P.y+1.6,z:P.z,s:1},pick(['矛盾！','不对！','证据在此！','这就是真相！']))}}}
  // 画面效果
  postMat.uniforms.desat.value=Math.max(0,Math.min(1,G.timeStop>0&&h.zwOn?1:0));postMat.uniforms.slow.value=G.slow>0?1:0}

/* ---------- 渲染：召唤物、分身、篝火、金色发光 ---------- */
function heroTint(){const h=P&&P.hm;if(h&&h.ssj>0)return h.tier>=2?new THREE.Color(1.6,1.5,1.1):new THREE.Color(1.6,1.3,.5);return null}
function homageHeroAdds(kind){const h=P&&P.hm;if(!h)return;const back=4;
  for(const c of h.clones)kind.add(c.x,hAt(c.x,c.z),c.z,0,.95,0,0,new THREE.Color(.25,.3,.7),Math.floor(G.rt*6)%4,false,false);
  for(const g2 of h.ghosts)kind.add(g2.x,g2.y,g2.z,0,1,0,0,new THREE.Color(.2,1,.6),g2.f,false,false)}
function homageRender(){for(const k in HPX)HPX[k].begin();const h=P&&P.hm;
  if(h&&G.state!=='menu'){const r=P.rel;
    if(r.persona&&h.persFx>0){const k=Math.min(1,h.persFx/1.6);HPX.persona.add(P.x+Math.sin(camYaw())*2.2,P.y+.2+(1-k)*.6,P.z+Math.cos(camYaw())*2.2,0,1,G.rt,0,new THREE.Color(.8+k*.4,.8+k*.4,1),null,false,false)}
    if(r.stand){let x=P.x+Math.sin(camYaw()+.9)*1.3,z=P.z+Math.cos(camYaw()+.9)*1.3,fr=0;if(h.bar&&h.bar.t&&!h.bar.t.dead){x=P.x+(h.bar.t.x-P.x)*.55;z=P.z+(h.bar.t.z-P.z)*.55;fr=1+Math.floor(G.rt*14)%3}
      HPX.stand.add(x,P.y+.6+Math.sin(G.rt*3)*.08,z,0,1,0,0,null,fr,false,false)}
    if(h.stag)HPX.stag.add(h.stag.x,hAt(h.stag.x,h.stag.z)+.2,h.stag.z,0,1,G.rt,0,null,null,Math.sin(h.stag.a-camYaw())<0,false);
    for(const f of h.fires)HPX.bonfire.add(f.x,hAt(f.x,f.z),f.z,0,1,G.rt,0,null,null,false,true)}
  for(const k in HPX)HPX[k].end()}

/* ---------- 挂到战斗事件上（包装原有钩子，不改动原逻辑） ---------- */
function wrapHook(name,mk){const o=window[name];if(typeof o==='function')window[name]=mk(o)}
wrapHook('relicDmgMul',o=>(e,op)=>o(e,op)*homageDmgMul(e,op));
wrapHook('relicOnHit',o=>(e,op,d)=>{o(e,op,d);homageOnHit(e,op,d)});
wrapHook('relicOnKill',o=>(e,op,ov)=>{o(e,op,ov);homageOnKill(e,op)});
wrapHook('relicOnHurt',o=>d=>o(homageOnHurt(d)));
wrapHook('relicDash',o=>()=>{o();homageDash()});
wrapHook('relicUpdate',o=>dt=>{o(dt);homageUpdate(dt)});
wrapHook('relicStats',o=>()=>{o();homageStats()});
wrapHook('cdDyn',o=>()=>o()*homageCd());
wrapHook('castUlt',o=>()=>{const ok=P&&P.ult>=100&&G.state==='play';o();if(ok)homageUlt()});
wrapHook('relicStageEnter',o=>()=>{o();if(P&&P.hm){P.hm.leapUsed=false;P.hm.hist=[]}});

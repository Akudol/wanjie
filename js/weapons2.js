/* ============ 永夜挽歌 · 致敬武器（全部进入公共升级池） ============ */
Object.assign(ICONS,{
  kiorb:'<circle cx="12" cy="12" r="5"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/>',
  finger:'<path d="M3 12h10M13 12l4-4M13 12l4 4"/><path d="M15 6h6M15 18h6M17 12h4"/>',
  gun:'<path d="M3 9h15v4H9l-1 6H5l1-6H3z"/><path d="M18 10h3"/>',
  twin:'<path d="M3 7h10v3H7l-1 4H4l1-4H3zM11 14h10v3h-6l-1 4h-2l1-4h-2z"/>',
  ball2:'<circle cx="12" cy="12" r="9"/><path d="M12 7l4 3-1.5 5h-5L8 10z"/>',
  gaunt:'<path d="M6 21V11l2-6h2v6h1V4h2v7h1V5h2v7h1V8h2v6c0 4-3 7-6 7z"/><circle cx="12" cy="15" r="1.5" fill="currentColor"/>',
  flask:'<path d="M9 3h6M10 3v6l-5 10a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-10V3"/><path d="M7 15h10"/>',
  bigsword:'<path d="M4 22l3-3M7 19l12-12 2-4-4 2L5 17z"/><path d="M5 14l5 5"/>',
  rapier:'<path d="M3 21L19 5M17 3l4 4M6 15l3 3"/>',
  banana:'<path d="M5 6c-1 7 4 13 13 12-6-2-9-6-10-12z"/>',
  cuts:'<path d="M4 4l16 16M20 4L4 20M12 2v20"/>',
});
const W2={
  kiblast:{n:'气功弹',el:'volt',icon:'kiorb',d:'向亡者射出会爆裂的气功弹。',base:{dmg:14,cd:.9,count:1,area:1,speed:18},ups:['dmg','count','area','cd'],evo:{relic:'sayan',n:'金色气功炮',d:'气功弹变得巨大并穿透一切。'}},
  maskblade:{n:'人格之刃',el:'dark',icon:'hmask',d:'挥刀斩击前方，每第三刀召来元素落雷。',base:{dmg:16,cd:.8,area:1},ups:['dmg','area','cd'],evo:{relic:'persona',n:'千面之刃',d:'每一刀都召来元素攻击。'}},
  standrush:{n:'替身拳',el:'phys',icon:'fist',d:'替身对近处的亡者打出 6 连拳。',base:{dmg:5,cd:1.3,count:6,area:1},ups:['dmg','count','cd'],evo:{relic:'stand',n:'无尽连打',d:'连拳翻倍，最后一拳击飞。'}},
  armblade:{n:'义体臂刃',el:'volt',icon:'chip',d:'弹出臂刃，对附近亡者连斩两次并感电。',base:{dmg:18,cd:1.4,area:1},ups:['dmg','area','cd'],evo:{relic:'sandevistan',n:'超载臂刃',d:'每次斩击都会短暂放慢周围亡者。'}},
  spellbolt:{n:'魔杖光弹',el:'fire',icon:'stag',d:'挥动魔杖射出追踪的三色咒语光弹。',base:{dmg:11,cd:1,count:2,area:1},ups:['dmg','count','cd'],evo:{relic:'patronus',n:'守护咒光',d:'光弹命中后分裂出银色光点。'}},
  katanas:{n:'佣兵双刀',el:'phys',icon:'katana',d:'原地旋身双刀乱斩。',base:{dmg:15,cd:1,area:1},ups:['dmg','area','cd'],evo:{relic:'deadpool',n:'嘴炮旋风',d:'旋斩两圈，并附带吐槽。'}},
  truthgun:{n:'言弹手枪',el:'phys',icon:'bullet',d:'快速射出穿透的言弹。',base:{dmg:9,cd:.45,count:1,pierce:2,area:1,speed:30},ups:['dmg','count','pierce','cd'],evo:{relic:'truthbullet',n:'完全论破',d:'言弹必定暴击。'}},
  gelbanana:{n:'凝胶香蕉炮',el:'frost',icon:'banana',d:'抛出一根会炸开绿色凝胶的香蕉，减速并伤害范围内亡者。',base:{dmg:12,cd:1.6,area:1},ups:['dmg','area','cd'],evo:{relic:'divergence',n:'世界线凝胶',d:'凝胶冻结亡者。'}},
  objection:{n:'异议之指',el:'phys',icon:'finger',d:'伸手一指，前方扇形冲击波击退亡者。',base:{dmg:20,cd:2,area:1},ups:['dmg','area','cd'],evo:{relic:'lens',n:'决定性证据',d:'冲击波范围翻倍并眩晕亡者。'}},
  handgun:{n:'警用手枪',el:'phys',icon:'gun',d:'精准点射（高暴击），亡者贴身时改用战术刀。',base:{dmg:13,cd:.5,count:1,area:1,speed:34},ups:['dmg','count','cd'],evo:{relic:'whetstone',n:'破甲马格南',d:'子弹穿透并必定暴击。'}},
  rebellion:{n:'双枪大剑',el:'fire',icon:'twin',d:'双枪连射之后一记大剑横扫。',base:{dmg:20,cd:1.4,count:4,area:1},ups:['dmg','count','area','cd'],evo:{relic:'ember',n:'魔剑狂欢',d:'横扫附带火焰，射击次数翻倍。'}},
  yamato:{n:'次元斩',el:'dark',icon:'cuts',d:'在亡者所在处凭空斩出次元裂隙，片刻后爆发。',base:{dmg:24,cd:1.6,count:2,area:1},ups:['dmg','count','area','cd'],evo:{relic:'stopwatch',n:'次元斩·绝',d:'裂隙数量翻倍。'}},
  striker:{n:'利己射门',el:'phys',icon:'ball2',d:'一脚踢出足球，在亡者之间连续反弹。',base:{dmg:18,cd:1.4,count:3,area:1,speed:22},ups:['dmg','count','cd'],evo:{relic:'feather',n:'无回转射门',d:'足球反弹次数翻倍且越弹越快。'}},
  nullify:{n:'无效之触',el:'dark',icon:'note',d:'身边形成无效领域：消除敌方弹幕，剥夺精英的强化。',base:{dmg:6,cd:.5,area:1},ups:['dmg','area','cd'],evo:{relic:'codex',n:'人间失格',d:'领域翻倍，被剥夺的精英受到大量伤害。'}},
  gauntlet:{n:'碎星手套',el:'phys',icon:'gaunt',d:'挥拳打出扇形冲击；镶嵌的六颗晶石轮流赋予元素。',base:{dmg:30,cd:1.8,area:1},ups:['dmg','area','cd'],evo:{relic:'crown',n:'六晶齐鸣',d:'每拳同时附带全部元素。'}},
  hfblade:{n:'高周波刀',el:'volt',icon:'rapier',d:'极快的前方连斩，命中时少量回复生命。',base:{dmg:9,cd:.35,area:1},ups:['dmg','area','cd'],evo:{relic:'fang',n:'斩夺之刃',d:'斩击回复量翻三倍。'}},
  chemistry:{n:'蓝色结晶',el:'dark',icon:'flask',d:'向亡者群扔出烧瓶，生成蓝色毒雾并诅咒。',base:{dmg:5,cd:2.2,area:1},ups:['dmg','area','cd'],evo:{relic:'seed',n:'纯度 99%',d:'毒雾范围与伤害大幅提升。'}},
  dragonslayer:{n:'屠龙铁块',el:'phys',icon:'bigsword',d:'抡起巨大的铁块横扫一圈；每第三次发射义手炮。',base:{dmg:45,cd:2.2,area:1},ups:['dmg','area','cd'],evo:{relic:'pact',n:'狂战之刃',d:'每一击都发射义手炮。'}},
  falconrapier:{n:'银隼细剑',el:'phys',icon:'rapier',d:'朝最近的亡者连续直刺。',base:{dmg:20,cd:.7,count:2,area:1},ups:['dmg','count','cd'],evo:{relic:'saint',n:'白鹰之梦',d:'直刺距离翻倍。'}},
};
for(const[k,v]of Object.entries(W2))WEAPONS[k]=v;

/* ---------- 视觉与通用攻击 ---------- */
K.orbB=new Kind([{g:GEO.sph,m:bas(0xe8f8ff),l:L(0,0,0,0,0,0,.25)},{g:GEO.sph,m:addM(0x4ab8ff,.5),l:L(0,0,0,0,0,0,.6)}],60);
K.ball=new Kind([{g:new THREE.IcosahedronGeometry(1,0),m:std(0xf4f4f4,{flatShading:true}),l:L(0,0,0,0,0,0,.32),sh:1}],12);
K.flask=new Kind([{g:GEO.cyl,m:addM(0x40c8ff,.85),l:L(0,0,0,0,0,0,.14,.4,.14)}],16);
const EXTRA_PROJ=['orbB','ball'];
const arcs=pool(14,()=>{const m=new THREE.Mesh(new THREE.RingGeometry(.55,1,20,1,-1,2),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));m.rotation.order='YXZ';return m});
function arcFx(x,y,z,a,R,arc,col){const f=arcs.find(f=>f.life<=0)||arcs[0];if(f.arc!==arc){f.m.geometry.dispose();f.m.geometry=new THREE.RingGeometry(.5,1,Math.max(6,Math.round(arc*8)),1,-arc/2,arc);f.m.geometry.rotateX(-Math.PI/2);f.arc=arc}
  f.life=.16;f.m.visible=true;f.m.position.set(x,y,z);f.m.scale.set(R,1,R);f.m.rotation.y=a-Math.PI/2;f.m.material.color.set(col);f.m.material.opacity=1}
function arcHit(a,R,arc,dmg,el,src,kb=4,col=0xffffff){query(P.x,P.z,R,e=>{const dx=e.x-P.x,dz=e.z-P.z,d=Math.hypot(dx,dz);if(d>R+e.r*.5)return;let da=Math.atan2(dx,dz)-a;da=Math.atan2(Math.sin(da),Math.cos(da));if(Math.abs(da)<=arc/2||d<.9)hit(e,dmg,{el,src,kb,fx:dx,fz:dz})});arcFx(P.x,P.y+.9,P.z,a,R,arc,col)}
function lineHit(x,z,a,len,w,dmg,el,src,col){const dx=Math.sin(a),dz=Math.cos(a),b=beams.find(b=>b.life<=0)||beams[0];b.life=.12;b.m.visible=true;b.m.material.color.set(col);b.m.position.set(x+dx*len/2,hAt(x,z)+1,z+dz*len/2);b.m.scale.set(w,.12,len);b.m.rotation.set(0,a,0);
  query(x+dx*len/2,z+dz*len/2,len/2+1,e=>{const px=e.x-x,pz=e.z-z,t=px*dx+pz*dz;if(t<0||t>len)return;if(Math.abs(px*dz-pz*dx)<w+e.r*.5)hit(e,dmg,{el,src,kb:4,fx:dx,fz:dz})})}
const aim=(R=20)=>{const t=nearest(P.x,P.z,R);return t?Math.atan2(t.x-P.x,t.z-P.z):P.face};
/* 延时裂隙 / 毒雾 / 抛射 / 连击队列 */
const WX={cuts:[],clouds:[],lobs:[],queue:[]};
const cutMeshes=pool(16,()=>new THREE.Mesh(GEO.sph,addM(0x3a5aff,.55)));
const cloudMeshes=pool(10,()=>{const m=makeDrape(new THREE.MeshBasicMaterial({map:glowTex,color:0x40c8ff,transparent:true,opacity:.6,blending:THREE.AdditiveBlending,depthWrite:false}),10);scene.remove(m);return m});
function later(t,fn){WX.queue.push({t,fn})}
function w2Update(dt){
  for(const q of WX.queue){q.t-=dt;if(q.t<=0){q.done=true;try{q.fn()}catch(e){}}}WX.queue=WX.queue.filter(q=>!q.done);
  for(const c of WX.cuts){c.t-=dt;if(c.t<=0){c.done=true;inRange(c.x,c.z,c.R).forEach(e=>hit(e,c.dmg,{el:'dark',src:c.src,kb:2}));fxRing(c.x,c.z,c.R,0x6a8aff);burst(c.x,hAt(c.x,c.z)+1,c.z,0xb8c8ff,8,6)}}WX.cuts=WX.cuts.filter(c=>!c.done);
  for(const c of WX.clouds){c.t-=dt;c.k-=dt;if(c.k<=0){c.k=.5;inRange(c.x,c.z,c.R).forEach(e=>{hit(e,c.dmg,{el:c.el,src:c.src,np:1,stack:c.stack||1});if(c.curse)e.st.curse=3;if(c.freeze&&!e.boss)e.st.frozen=Math.max(e.st.frozen,.6)})}}WX.clouds=WX.clouds.filter(c=>c.t>0);
  for(const l of WX.lobs){l.t+=dt/l.dur;if(l.t>=1){l.done=true;l.land(l.tx,l.tz)}}WX.lobs=WX.lobs.filter(l=>!l.done);
  cutMeshes.forEach((m,i)=>{const c=WX.cuts[i];if(c){m.m.visible=true;m.m.position.set(c.x,hAt(c.x,c.z)+1,c.z);const s=c.R*(.4+.6*(1-c.t/c.max));m.m.scale.set(s,s*.3,s)}else m.m.visible=false});
  cloudMeshes.forEach((m,i)=>{const c=WX.clouds[i];if(c){m.m.visible=true;m.m.material.color.set(c.col);drape(m.m,c.x,c.z,c.R*2.2,G.rt*.4,.15);m.m.material.opacity=Math.min(1,c.t)*.65}else m.m.visible=false});
  for(const a of arcs)if(a.life>0){a.life-=dt;a.m.material.opacity=a.life/.16;if(a.life<=0)a.m.visible=false}
}
function w2Render(){K.flask.begin();for(const l of WX.lobs){const x=l.sx+(l.tx-l.sx)*l.t,z=l.sz+(l.tz-l.sz)*l.t,y=hAt(x,z)+1+Math.sin(l.t*Math.PI)*3;K.flask.add(x,y,z,l.t*12,1)}K.flask.end()}
function lob(tx,tz,dur,land){WX.lobs.push({sx:P.x,sz:P.z,tx,tz,t:0,dur,land})}
function bounceHit(p,e){if(p.bounces>0){p.bounces--;const n=nearest(e.x,e.z,9,e);if(n&&!p.hits.has(n)){const a=Math.atan2(n.x-p.x,n.z-p.z),sp=Math.hypot(p.vx,p.vz)*(p.accel||1);p.vx=Math.sin(a)*sp;p.vz=Math.cos(a)*sp;p.rot=a;p.pierce++;p.life=1.2}}}
function explodeHit(p,e){inRange(p.x,p.z,p.boom).forEach(o=>{if(o!==e)hit(o,p.dmg*.6,{el:p.el,src:p.src,np:1})});fxRing(p.x,p.z,p.boom,0x8ad8ff)}

/* ---------- 各武器的攻击逻辑 ---------- */
const GEMCOL={phys:0xe8dcc4,fire:0xff8030,frost:0x8fe3ff,volt:0xb9a6ff,dark:0xc77dff,blood:0xff4a62};
const TICKS={
  kiblast(w){if(w.t>0)return;w.t=w.cd*S.cd*cdDyn();const a=aim(22);for(let i=0;i<w.count;i++)shoot('orbB',a+(i-(w.count-1)/2)*.14,w.speed,{dmg:w.dmg*(w.evo?1.6:1),pierce:w.evo?6:1,life:1.3,el:'volt',src:'kiblast',onHit:explodeHit,boom:1.6*w.area*S.area*(w.evo?1.6:1)});AU.sfx('throw')},
  maskblade(w){if(w.t>0)return;w.t=w.cd*S.cd*cdDyn();w.n=(w.n||0)+1;arcHit(aim(6),2.6*w.area*S.area,2.1,w.dmg,'dark','maskblade',4,0xd8c0ff);
    if(w.evo||w.n%3===0){const t=nearest(P.x,P.z,12);if(t)strike(t.x,t.z,w.dmg*1.5,1.6,false)}},
  standrush(w){if(w.t>0)return;const t=nearest(P.x,P.z,3.6*w.area*S.area);if(!t)return;w.t=w.cd*S.cd*cdDyn();const n=w.count*(w.evo?2:1);
    for(let i=0;i<n;i++)later(i*.06,()=>{if(t.dead)return;const fin=i===n-1;hit(t,fin&&w.evo?w.dmg*5:w.dmg,{src:'standrush',kb:fin?(w.evo?16:5):1,fx:t.x-P.x,fz:t.z-P.z});burst(t.x,t.y+1.2,t.z,0xb090ff,2,4)})},
  armblade(w){if(w.t>0)return;const t=nearest(P.x,P.z,5);if(!t)return;w.t=w.cd*S.cd*cdDyn();const a=Math.atan2(t.x-P.x,t.z-P.z);
    for(let i=0;i<2;i++)later(i*.12,()=>{arcHit(a+(i?.3:-.3),3.2*w.area*S.area,1.6,w.dmg,'volt','armblade',3,0xff2a8a);if(w.evo)inRange(P.x,P.z,4).forEach(e=>e.st.slow=1.5)})},
  spellbolt(w){if(w.t>0)return;w.t=w.cd*S.cd*cdDyn();const els=['fire','frost','volt'];for(let i=0;i<w.count;i++){const a=rand(0,TAU),t=nearest(P.x,P.z,18);
    proj.push({k:'wisp',x:P.x,z:P.z,y:P.y+1.4,vx:Math.sin(a)*7,vz:Math.cos(a)*7,rot:a,life:2.6,dmg:w.dmg,pierce:1,hits:new Set(),el:els[(i+(w.n=(w.n||0)+1))%3],src:'spellbolt',home:t,
      onHit:w.evo?(p,e)=>{for(let k=0;k<3;k++){const b=rand(0,TAU);proj.push({k:'shard',x:p.x,z:p.z,y:p.y,vx:Math.sin(b)*14,vz:Math.cos(b)*14,rot:b,life:.5,dmg:p.dmg*.4,pierce:1,hits:new Set([e]),el:'frost',src:'spellbolt'})}}:null})}},
  katanas(w){if(w.t>0)return;w.t=w.cd*S.cd*cdDyn();const R=2.4*w.area*S.area;arcHit(P.face,R,TAU,w.dmg,'phys','katanas',5,0xff5060);
    if(w.evo){later(.2,()=>arcHit(P.face+3,R*1.2,TAU,w.dmg,'phys','katanas',5,0xffffff));if(Math.random()<.05)toast('佣兵',pick(QUIPS),'katana')}},
  truthgun(w){if(w.t>0)return;w.t=w.cd*S.cd*cdDyn();const a=aim(24);for(let i=0;i<w.count;i++)shoot('tbullet',a+(i-(w.count-1)/2)*.1,w.speed,{dmg:w.dmg,pierce:w.pierce,life:.9,el:'phys',src:'truthgun',fc:!!w.evo})},
  gelbanana(w){if(w.t>0)return;const t=densest(16)||nearest(P.x,P.z,16);if(!t)return;w.t=w.cd*S.cd*cdDyn();const R=1.9*w.area*S.area;
    lob(t.x,t.z,.55,(x,z)=>{inRange(x,z,R).forEach(e=>{hit(e,w.dmg,{el:'frost',src:'gelbanana',stack:w.evo?3:1})});WX.clouds.push({x,z,R,t:2.5,k:.5,dmg:w.dmg*.3,el:'frost',src:'gelbanana',col:0x7aff60,freeze:!!w.evo});burst(x,hAt(x,z)+.5,z,0x9aff60,14,6)})},
  objection(w){if(w.t>0)return;const t=nearest(P.x,P.z,8);if(!t)return;w.t=w.cd*S.cd*cdDyn();const R=7*w.area*S.area*(w.evo?1.5:1),a=Math.atan2(t.x-P.x,t.z-P.z);
    arcHit(a,R,1.1*(w.evo?1.6:1),w.dmg,'phys','objection',14,0xffe070);showReact({x:P.x,y:P.y+1.2,z:P.z,s:1},'异议！');if(w.evo)inRange(P.x,P.z,R).forEach(e=>{if(!e.boss)e.st.frozen=Math.max(e.st.frozen,1)})},
  handgun(w){if(w.t>0)return;const c=nearest(P.x,P.z,1.9);w.t=w.cd*S.cd*cdDyn();if(c){arcHit(Math.atan2(c.x-P.x,c.z-P.z),2,1.6,w.dmg*1.6,'phys','handgun',6,0xd8d8e8);return}
    const a=aim(26);for(let i=0;i<w.count;i++)later(i*.08,()=>shoot('dagger',a,w.speed,{dmg:w.dmg,pierce:w.evo?4:1,life:.9,el:'phys',src:'handgun',fc:w.evo||Math.random()<.3}));AU.sfx('throw')},
  rebellion(w){if(w.t>0)return;w.t=w.cd*S.cd*cdDyn();const a=aim(20),n=w.count*(w.evo?2:1);
    for(let i=0;i<n;i++)later(i*.07,()=>shoot('sonic',a+(i%2?.05:-.05),26,{dmg:w.dmg*.35,pierce:1,life:.8,el:'phys',src:'rebellion'}));
    later(n*.07+.05,()=>arcHit(aim(6),3*w.area*S.area,2.4,w.dmg,w.evo?'fire':'phys','rebellion',8,0xff3030))},
  yamato(w){if(w.t>0)return;const near=inRange(P.x,P.z,16);if(!near.length)return;w.t=w.cd*S.cd*cdDyn();const n=w.count*(w.evo?2:1);
    for(let i=0;i<n;i++){const e=near[(Math.random()*near.length)|0];WX.cuts.push({x:e.x,z:e.z,R:1.8*w.area*S.area,t:.35,max:.35,dmg:w.dmg,src:'yamato'})}},
  striker(w){if(w.t>0)return;w.t=w.cd*S.cd*cdDyn();const a=aim(22);shoot('ball',a,w.speed,{dmg:w.dmg,pierce:1,life:1.4,el:'phys',src:'striker',onHit:bounceHit,bounces:w.count*(w.evo?2:1),accel:w.evo?1.12:1})},
  nullify(w){const R=2.2*w.area*S.area*(w.evo?2:1);if(w.t>0)return;w.t=w.cd*S.cd*cdDyn();
    inRange(P.x,P.z,R).forEach(e=>{hit(e,w.dmg,{el:'dark',src:'nullify',np:1});if(e.elite&&!e.nulled){e.nulled=true;e.elite=false;e.dmg/=1.5;showReact(e,'无效化');if(w.evo)hit(e,e.max*.2/S.dmg,{src:'nullify',np:1})}});
    const n0=ebolts.length;ebolts=ebolts.filter(b=>(b.x-P.x)**2+(b.z-P.z)**2>(R+1.5)**2);if(ebolts.length<n0)burst(P.x,P.y+1,P.z,0xe8e0ff,6,4);fxRing(P.x,P.z,R,0xa8a0c8)},
  gauntlet(w){if(w.t>0)return;const t=nearest(P.x,P.z,6);if(!t)return;w.t=w.cd*S.cd*cdDyn();const els=['phys','fire','frost','volt','dark','blood'];w.n=((w.n||0)+1)%6;
    const a=Math.atan2(t.x-P.x,t.z-P.z),R=5*w.area*S.area;if(w.evo)els.forEach((el,i)=>later(i*.04,()=>arcHit(a,R,1.4,w.dmg*.35,el,'gauntlet',3,GEMCOL[el])));else arcHit(a,R,1.4,w.dmg,els[w.n],'gauntlet',10,GEMCOL[els[w.n]]);G.shake=Math.max(G.shake,.15)},
  hfblade(w){if(w.t>0)return;const t=nearest(P.x,P.z,3.4);if(!t)return;w.t=w.cd*S.cd*cdDyn();let n=0;
    query(P.x,P.z,3,e=>{n++});arcHit(Math.atan2(t.x-P.x,t.z-P.z),2.8*w.area*S.area,2.8,w.dmg,'volt','hfblade',2,0x9af0ff);healP(Math.min(4,n)*.15*(w.evo?3:1))},
  chemistry(w){if(w.t>0)return;const t=densest(16);if(!t)return;w.t=w.cd*S.cd*cdDyn();const R=2.5*w.area*S.area*(w.evo?1.5:1);
    lob(t.x,t.z,.6,(x,z)=>{WX.clouds.push({x,z,R,t:4,k:0,dmg:w.dmg*(w.evo?2:1),el:'dark',curse:true,src:'chemistry',col:0x40c8ff});burst(x,hAt(x,z)+.5,z,0x40c8ff,16,5)})},
  dragonslayer(w){if(w.t>0)return;if(!nearest(P.x,P.z,5))return;w.t=w.cd*S.cd*cdDyn();w.n=(w.n||0)+1;arcHit(P.face,3.6*w.area*S.area,TAU,w.dmg,'phys','dragonslayer',14,0xb8b8c0);G.shake=Math.max(G.shake,.3);
    if(w.evo||w.n%3===0){const a=aim(18);shoot('skull',a,22,{dmg:w.dmg*1.2,pierce:1,life:1,el:'fire',src:'dragonslayer',onHit:explodeHit,boom:2.2})}},
  falconrapier(w){if(w.t>0)return;const t=nearest(P.x,P.z,7);if(!t)return;w.t=w.cd*S.cd*cdDyn();const a=Math.atan2(t.x-P.x,t.z-P.z),len=5*(w.evo?2:1)*w.area*S.area;
    for(let i=0;i<w.count;i++)later(i*.1,()=>lineHit(P.x,P.z,a+rand(-.08,.08),len,.5,w.dmg,'phys','falconrapier',0xe8f0ff))},
};
for(const id in TICKS)W2[id].tick=TICKS[id];
wrapHook('weaponTick',o=>(w,dt)=>{const W=WEAPONS[w.id];if(W&&W.tick){w.t-=dt;W.tick(w,dt)}else o(w,dt)});
wrapHook('relicUpdate',o=>dt=>{o(dt);w2Update(dt)});
wrapHook('homageRender',o=>()=>{o();w2Render()});
wrapHook('newRun',o=>(h,d)=>{WX.cuts=[];WX.clouds=[];WX.lobs=[];WX.queue=[];o(h,d)});
// 已有致敬猎人改用专属武器
Object.assign(HUNTERS.fighter,{w:'kiblast'});Object.assign(HUNTERS.student,{w:'maskblade'});Object.assign(HUNTERS.standuser,{w:'standrush'});Object.assign(HUNTERS.cyber,{w:'armblade'});
Object.assign(HUNTERS.wizard,{w:'spellbolt'});Object.assign(HUNTERS.merc,{w:'katanas'});Object.assign(HUNTERS.debater,{w:'truthgun'});Object.assign(HUNTERS.scientist,{w:'gelbanana'});

/* ============ 万界乱斗 · 三个致敬世界 ============
   霓虹都市（夜）→ 魔法学院（昼）→ 武道擂台（晴），由次元之门串联。 */
const winTex=(()=>{const c=cv(32,64,(g)=>{g.fillStyle='#22263a';g.fillRect(0,0,32,64);for(let y=3;y<62;y+=6)for(let x=3;x<30;x+=7){const r=Math.random();g.fillStyle=r<.45?'#ffe08a':r<.6?'#7af0ff':r<.7?'#ff7ad0':'#141828';g.fillRect(x,y,4,3)}});
  const t=new THREE.CanvasTexture(c);t.magFilter=THREE.NearestFilter;t.minFilter=THREE.NearestFilter;t.encoding=THREE.sRGBEncoding;return t})();
const winM=new THREE.MeshBasicMaterial({map:winTex}),slateM=std(0x3a4058),neonM=bas(0xffffff),poleM=std(0x5a5e6a),carM=std(0xffffff),wheelM=std(0x18181c),glassM=bas(0x6ab8ff),
  stoneL=std(0xd8ccb4),roofM=std(0x3a5ab8),hedgeM=std(0x3a8a3a),clothM=std(0xffffff,{side:THREE.DoubleSide}),waterM=bas(0x7ad8ff),leafM=std(0x4aa84a),trunkM=std(0x7a5432),
  redM=std(0xd8342a),roofR=std(0x2a5a3a),tileM=std(0xf0ece2),rockM=std(0x8a8c94),orangeM=std(0xff8a20),whiteM=std(0xf4f4f4);
Object.assign(DK,{
  building:new Kind([{g:GEO.box,m:slateM,l:L(0,5,0,0,0,0,4,10,4),sh:1,rs:1},{g:GEO.plane,m:winM,l:L(0,5,2.01,0,0,0,3.6,9.6,1)},{g:GEO.plane,m:winM,l:L(0,5,-2.01,0,Math.PI,0,3.6,9.6,1)},{g:GEO.plane,m:winM,l:L(2.01,5,0,0,Math.PI/2,0,3.6,9.6,1)},{g:GEO.plane,m:winM,l:L(-2.01,5,0,0,-Math.PI/2,0,3.6,9.6,1)},{g:GEO.box,m:poleM,l:L(0,10.2,0,0,0,0,4.2,.4,4.2)}],40),
  neon:new Kind([{g:GEO.cyl,m:poleM,l:L(0,2,0,0,0,0,.12,4,.12)},{g:GEO.box,m:neonM,tint:0xff3a8a,main:1,l:L(0,4.2,0,0,0,0,2.4,1,.12)},{g:GEO.sph,m:addM(0xffffff,.25),tint:0xff3a8a,main:1,l:L(0,4.2,.2,0,0,0,1.8,.9,.3)}],40),
  car:new Kind([{g:GEO.box,m:carM,tint:0xd84040,main:1,l:L(0,.6,0,0,0,0,1.8,.7,3.6),sh:1,rs:1},{g:GEO.box,m:carM,tint:0xd84040,main:1,l:L(0,1.15,-.2,0,0,0,1.6,.5,1.8),sh:1},{g:GEO.box,m:glassM,l:L(0,1.15,.72,0,0,0,1.5,.4,.05)},
    ...[[.9,1.1],[-.9,1.1],[.9,-1.1],[-.9,-1.1]].map(([x,z])=>({g:GEO.cyl,m:wheelM,l:L(x,.32,z,0,0,Math.PI/2,.32,.2,.32)}))],30),
  lamp:new Kind([{g:GEO.cyl,m:poleM,l:L(0,2.2,0,0,0,0,.1,4.4,.1)},{g:GEO.box,m:poleM,l:L(.5,4.4,0,0,0,0,1.1,.12,.2)},{g:GEO.sph,m:bas(0xfff0b0),l:L(1,4.25,0,0,0,0,.22)},{g:GEO.plane,m:new THREE.MeshBasicMaterial({map:glowTex,color:0xfff0b0,transparent:true,opacity:.35,blending:THREE.AdditiveBlending,depthWrite:false}),l:L(1,.06,0,-Math.PI/2,0,0,4,4,1)}],40),
  barrier:new Kind([{g:GEO.box,m:orangeM,l:L(0,.5,0,0,0,0,2.4,.3,.2),sh:1},{g:GEO.box,m:whiteM,l:L(0,.85,0,0,0,0,2.4,.25,.2),sh:1},{g:GEO.box,m:poleM,l:L(-1,.45,0,0,0,0,.12,.9,.5)},{g:GEO.box,m:poleM,l:L(1,.45,0,0,0,0,.12,.9,.5)}],40),
  tower:new Kind([{g:GEO.cyl,m:stoneL,l:L(0,3.5,0,0,0,0,1.6,7,1.6),sh:1,rs:1},{g:GEO.cone,m:roofM,l:L(0,8.2,0,0,0,0,2,2.6,2),sh:1},{g:GEO.box,m:bas(0xffe08a),l:L(0,5,1.58,0,0,0,.4,.7,.05)}],20),
  hedge:new Kind([{g:GEO.box,m:hedgeM,l:L(0,.6,0,0,0,0,3.4,1.2,.9),sh:1,rs:1}],50),
  banner:new Kind([{g:GEO.cyl,m:poleM,l:L(0,1.8,0,0,0,0,.08,3.6,.08)},{g:GEO.plane,m:clothM,tint:0xc8302a,main:1,l:L(.45,2.7,0,0,0,0,.9,1.6,1)},{g:GEO.sph,m:bas(0xffd23a),l:L(0,3.65,0,0,0,0,.12)}],40),
  fcandle:new Kind([{g:GEO.cyl,m:waxM,l:L(0,2.8,0,0,0,0,.08,.5,.08)},{g:GEO.cone,m:flameM,l:L(0,3.15,0,0,0,0,.06,.18,.06)},{g:GEO.cyl,m:waxM,l:L(.6,3.3,.3,0,0,0,.07,.4,.07)},{g:GEO.cone,m:flameM,l:L(.6,3.6,.3,0,0,0,.05,.16,.05)},{g:GEO.cyl,m:waxM,l:L(-.5,3.6,-.2,0,0,0,.07,.45,.07)},{g:GEO.cone,m:flameM,l:L(-.5,3.92,-.2,0,0,0,.05,.16,.05)}],60),
  fountain:new Kind([{g:GEO.cyl,m:stoneL,l:L(0,.35,0,0,0,0,2.2,.7,2.2),sh:1,rs:1},{g:GEO.cyl,m:waterM,l:L(0,.72,0,0,0,0,1.9,.06,1.9)},{g:GEO.cyl,m:stoneL,l:L(0,1.4,0,0,0,0,.3,1.4,.3),sh:1},{g:GEO.sph,m:addM(0x9ae8ff,.5),l:L(0,2.2,0,0,0,0,.5,.7,.5)}],10),
  treeR:new Kind([{g:GEO.cyl,m:trunkM,l:L(0,1.1,0,0,0,0,.25,2.2,.25),sh:1},{g:GEO.sph,m:leafM,l:L(0,2.9,0,0,0,0,1.5,1.3,1.5),sh:1},{g:GEO.sph,m:leafM,l:L(.6,3.6,.2,0,0,0,.9,.8,.9),sh:1}],50),
  pagoda:new Kind([{g:GEO.box,m:redM,l:L(-2,2,0,0,0,0,.45,4,.45),sh:1,rs:1},{g:GEO.box,m:redM,l:L(2,2,0,0,0,0,.45,4,.45),sh:1,rs:1},{g:GEO.box,m:redM,l:L(0,3.5,0,0,0,0,5,.3,.4),sh:1},{g:GEO.box,m:roofR,l:L(0,4.3,0,0,0,0,6,.35,1),sh:1},{g:GEO.box,m:roofR,l:L(0,4.6,0,0,0,0,4.6,.3,.7),sh:1}],14),
  arena:new Kind([{g:GEO.box,m:tileM,l:L(0,.25,0,0,0,0,8,.5,8),rs:1},{g:GEO.box,m:std(0xc8c0b0),l:L(0,.52,0,0,0,0,7.6,.04,7.6),rs:1},...[[3.8,3.8],[-3.8,3.8],[3.8,-3.8],[-3.8,-3.8]].map(([x,z])=>({g:GEO.box,m:tileM,l:L(x,.9,z,0,0,0,.5,.8,.5),sh:1}))],6),
  rock:new Kind([{g:new THREE.DodecahedronGeometry(1,0),m:rockM,l:L(0,.6,0,0,0,0,1.2,.9,1),sh:1,rs:1},{g:new THREE.DodecahedronGeometry(1,0),m:rockM,l:L(.9,.35,.4,0,0,0,.6,.5,.6),sh:1}],40),
});
Object.assign(DCOL,{building:2.8,car:1.3,lamp:.2,tower:1.7,hedge:1,fountain:2.2,treeR:.4,pagoda:0,rock:1.1,barrier:.6});
const DTINT={neon:[0xff3a8a,0x3af0ff,0xffe03a,0x9a5aff],car:[0xd84040,0x3a7ad8,0xf0f0f0,0xffc030,0x3ab070],banner:[0xc8302a,0x2a8a4a,0xe8b830,0x2a5ac8]};

STAGES.length=0;
STAGES.push(
  {id:'neon',n:'霓虹都市',sub:'第一界',fog:0x221a4a,fogD:.018,hemi:[0x9a8aff,0x2a1a4a,1.05],moon:0xa8c8ff,moonI:.85,sky:0x221a4a,moonVis:1,mist:0x5a4ab0,ash:0x7ae8ff,
    ground:{bg:'#24263a',hue:[225,240],sat:10,light:[20,27],moss:'80,200,255',stain:'255,60,140',style:'asphalt'},amp:.4,wall:0x3a4058,
    decor:{building:30,neon:30,car:22,lamp:30,barrier:24},
    roster:[['ghoul',0,10],['bat',20,6],['bloodghoul',70,4],['knight',110,3]],boss:'colossus',mul:1},
  {id:'academy',n:'魔法学院',sub:'第二界',fog:0x8ab4e8,fogD:.011,hemi:[0xfff0dc,0x4a6a3a,.72],moon:0xfff0c8,moonI:1.0,sky:0x7aaee8,moonVis:0,mist:0xffffff,ash:0xffe080,
    ground:{bg:'#7a6e60',hue:[28,42],sat:20,light:[40,52],moss:'80,160,60',stain:'120,90,60',style:'cobble'},amp:.6,wall:0xc8bca4,
    decor:{tower:12,hedge:36,banner:28,fcandle:40,fountain:6,treeR:24},
    roster:[['penitent',0,10],['wraith',20,6],['gargoyle',60,4],['knight',100,3]],boss:'bishop',mul:2.1},
  {id:'dojo',n:'武道擂台',sub:'第三界',fog:0x6eb2f0,fogD:.009,hemi:[0xfffaf0,0x4a7a34,.72],moon:0xfff6dc,moonI:1.05,sky:0x5aa8f0,moonVis:0,mist:0xffffff,ash:0xffa8c8,
    ground:{bg:'#3a7a30',hue:[95,118],sat:48,light:[27,36],moss:'40,120,40',stain:'200,180,120',style:'arena'},amp:1.2,wall:0x6a8a5a,
    decor:{pagoda:10,arena:5,rock:30,treeR:30,hedge:10},
    roster:[['ghoul',0,10],['hellknight',40,4],['bat',30,5],['bloodghoul',80,5]],boss:'lord',mul:4});
Object.assign(ENEMIES.ghoul,{n:'丧尸'});Object.assign(ENEMIES.bat,{n:'蝙蝠'});Object.assign(ENEMIES.knight,{n:'铁甲兵'});Object.assign(ENEMIES.wraith,{n:'幽灵'});
Object.assign(ENEMIES.penitent,{n:'斗篷信徒'});Object.assign(ENEMIES.gargoyle,{n:'石像鬼'});Object.assign(ENEMIES.bloodghoul,{n:'狂暴丧尸'});Object.assign(ENEMIES.hellknight,{n:'熔岩甲兵'});
Object.assign(BOSSES.colossus,{n:'钢铁巨兵'});Object.assign(BOSSES.bishop,{n:'黑袍教授'});Object.assign(BOSSES.lord,{n:'擂台霸王'});
Object.assign(POI_INFO.portal,{n:'次元之门',d:'穿越到下一个世界。'});Object.assign(POI_INFO.boss,{n:'首领擂台',d:'提前召唤本界首领。击败首领开启次元之门。'});
Object.assign(POI_INFO.blood,{n:'献血台'});Object.assign(POI_INFO.curse,{n:'挑战碑',d:'敌人永久变强 12%，立即召来精英群；击败后得宝箱。'});Object.assign(POI_INFO.nest,{n:'伙伴之巢',d:'孵化一只伙伴，或喂养已有的伙伴。'});

/* ---------- 新地面 ---------- */
wrapHook('groundCanvas',o=>G=>{if(!['asphalt','cobble','arena'].includes(G.style))return o(G);return cv(64,64,(g,W)=>{
  const col=(l,s=G.sat,h)=>`hsl(${h==null?rand(G.hue[0],G.hue[1]):h},${s}%,${l}%)`,L0=G.light[0],L1=G.light[1];
  const px=(x,y,c)=>{g.fillStyle=c;g.fillRect(((x%W)+W)%W,((y%W)+W)%W,1,1)};
  if(G.style==='asphalt'){g.fillStyle=col((L0+L1)/2);g.fillRect(0,0,W,W);for(let i=0;i<500;i++)px(Math.random()*W|0,Math.random()*W|0,col(rand(L0-4,L1+3)));
    for(let x=0;x<W;x+=16){g.fillStyle='#e8c030';g.fillRect(x+2,31,9,2)}for(let i=0;i<6;i++){g.fillStyle='rgba(120,200,255,.35)';g.fillRect(rand(0,56)|0,rand(0,56)|0,rand(4,9)|0,rand(2,4)|0)}
    for(let i=0;i<4;i++){let x=Math.random()*W|0,y=Math.random()*W|0;for(let k=0;k<6;k++){px(x,y,col(L0-8));x+=Math.random()<.5?1:-1;y+=1}}}
  else if(G.style==='cobble'){const seeds=[];for(let i=0;i<26;i++)seeds.push([Math.random()*W,Math.random()*W,rand(L0,L1)]);
    for(let y=0;y<W;y++)for(let x=0;x<W;x++){let b=1e9,b2=1e9,bs=null;for(const s of seeds){let dx=Math.abs(x-s[0]),dy=Math.abs(y-s[1]);dx=Math.min(dx,W-dx);dy=Math.min(dy,W-dy);const d=dx*dx+dy*dy;if(d<b){b2=b;b=d;bs=s}else if(d<b2)b2=d}
      const edge=Math.sqrt(b2)-Math.sqrt(b)<1.3;px(x,y,edge?(Math.random()<.35?'#5aa040':col(L0-18)):col(bs[2]+(y%3===0?3:0)))}}
  else{g.fillStyle=col(L0);g.fillRect(0,0,W,W);for(let i=0;i<700;i++)px(Math.random()*W|0,Math.random()*W|0,col(rand(L0-6,L1+6)));
    for(const[x0,y0]of[[2,2],[34,34]]){g.fillStyle='#cfc6b4';g.fillRect(x0,y0,28,28);g.fillStyle='#f6f2e8';g.fillRect(x0,y0,28,2);g.fillRect(x0,y0,2,28);g.fillStyle='#c8c0b0';g.fillRect(x0,y0+26,28,2);g.fillRect(x0+26,y0,2,28);
      for(let i=0;i<20;i++)px(x0+2+(Math.random()*24|0),y0+2+(Math.random()*24|0),'#d8d0c0')}
    for(let i=0;i<10;i++){const x=Math.random()*W|0,y=Math.random()*W|0;px(x,y,'#ffb0d0');px(x+1,y,'#ff90c0')}}
})});
wrapHook('buildStage',o=>idx=>{o(idx);const st=STAGES[idx];scene.background.set(st.sky||st.fog);mistM.color.set(st.mist||0xffffff);mistM.opacity=st.moonVis?.14:.03;ashMat.color.set(st.ash||0xffffff);
  if(typeof moonSpr!=='undefined'){moonSpr.visible=!!st.moonVis;moonSpr.material.color.set(st.moonVis?0xb8d8ff:0xffffff)}
  lantern.intensity=st.moonVis?2.6:.6;renderer.toneMappingExposure=st.moonVis?1.3:.92});

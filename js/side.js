/* ============ 万界乱斗 · 角色侧面像素帧 ============
   侧面 = 专门绘制的侧身躯干 / 侧向迈步的双腿 / 侧脸，
   再把各角色自己的配饰（发型、帽子、武器等）沿水平方向压缩叠上去，保留辨识度。 */
/* ---------- 2 倍精度下的脸部与衣物细节（正面）：眉毛、鼻影、嘴巴、腮红、袖口、衣摆线 ---------- */
const mixHex=(a,b,t)=>{const A=parseInt(a.slice(1),16),B=parseInt(b.slice(1),16);return'#'+[16,8,0].map(s=>Math.round(((A>>s)&255)*(1-t)+((B>>s)&255)*t).toString(16).padStart(2,'0')).join('')};
const hexSh=(h,k)=>{const n=parseInt(h.slice(1),16),c=[(n>>16)&255,(n>>8)&255,n&255].map(v=>k>=0?Math.round(v+(255-v)*k):Math.round(v*(1+k)));return'#'+c.map(v=>v.toString(16).padStart(2,'0')).join('')};
wrapHook('baseHero',o=>(g,f,view,c)=>{const r=o(g,f,view,c);if(!g.fpx||g.side||view!=='front')return r;const b=r.b,S=2,F=(p,x,y)=>g.fpx(p,x,y);
  const brow=g.part(c.hair||'#201820',{flat:1,noOutline:1}),mouth=g.part(hexSh(c.skin,-.42),{flat:1,noOutline:1}),nose=g.part(hexSh(c.skin,-.16),{flat:1,noOutline:1}),blush=g.part(mixHex(c.skin,'#ff8a9a',.28),{flat:1,noOutline:1});
  const y0=(13+b)*S;
  for(const x of[27,28,29])F(brow,x,y0-2);for(const x of[35,36,37])F(brow,x,y0-2);
  F(nose,32,y0+3);F(mouth,31,y0+6);F(mouth,32,y0+6);F(mouth,33,y0+6);
  F(blush,26,y0+4);F(blush,38,y0+4);
  // 袖口与衣摆的细线
  if(!c.noArms){const cuff=g.part(hexSh(c.sleeve||c.top,-.3),{flat:1});for(const[x,sw]of[[7,-r.sw],[22,r.sw]])for(let i=0;i<6;i++)F(cuff,x*S+i,(31+b+sw)*S-1)}
  return r});
function sideProxy(g){const k=.62,sx=x=>16+(x-16)*k+1;
  return{side:true,raw:g,W:g.W,H:g.H,parts:g.parts,part:(c,o)=>g.part(c,o),
    rect:(p,x,y,w,h)=>{const a=Math.round(sx(x)),b2=Math.round(sx(x+w));g.rect(p,a,y,Math.max(1,b2-a),h)},
    ell:(p,cx,cy,rx,ry)=>g.ell(p,sx(cx),cy,Math.max(.9,rx*k),ry),
    poly:(p,pts)=>g.poly(p,pts.map(([x,y])=>[sx(x),y])),
    line:(p,ax,ay,bx,by,w)=>g.line(p,sx(ax),ay,sx(bx),by,w),
    px:(p,x,y)=>{const P=g.parts[p];if(P&&P.flat&&P.noOutline&&x<16)return;g.px(p,Math.round(sx(x)),y)}}}
// 侧面迈步的双腿
wrapHook('heroLegs',o=>(g,f,pal,x,top,gap)=>{if(!g.side)return o(g,f,pal,x,top,gap);const R=g.raw,legs=R.part(pal.legs),boots=R.part(pal.boots),A=[3,0,-3,0][f],B=-A,t=top==null?36:top;
  R.line(legs,16,t,16+B,44,2.6);R.rect(boots,16+B-1,44,4,2);R.line(legs,17,t,17+A,44,2.8);R.rect(boots,17+A-1,44,5,2)});
// 侧身躯干 / 手臂 / 侧脸
wrapHook('baseHero',o=>(g,f,view,c)=>{if(!g.side)return o(g,f,view,c);const R=g.raw,b=WALK.bob[f],sw=WALK.sw[f];
  heroLegs(g,f,{legs:c.legs,boots:c.boots},12,36+b);
  const top=R.part(c.top),topD=R.part(c.topD||c.top),sl=R.part(c.sleeve||c.top),hand=R.part(c.hand||c.skin),skin=R.part(c.skin),hair=R.part(c.hair);
  const hem=c.long?42:35;R.poly(top,[[13,19+b],[20,19+b],[c.long?23:21,hem+b],[c.long?10:12,hem+b]]);if(c.long)R.line(topD,13,26+b,11,hem+b,1);
  if(!c.noArms){R.line(sl,17,20+b,17+sw*3,30+b,3);R.ell(hand,17+sw*3,31+b,1.6,1.4)}
  R.ell(skin,17,13+b,4.3,5.5);R.px(skin,21,14+b);
  return{b,sw,back:false,top,topD,sl,hand,skin,hair,side:true}});
/* 重新生成所有角色的 12 帧图集：0-3 正面，4-7 背面，8-11 侧面（朝右，向左时翻转） */
(function(){const BASE={warden:drawWarden,heir:drawHeir,raven:drawRaven};
  for(const id in HUNTERS){const fn=HUNTERS[id].draw||BASE[id];if(!fn||!HERO_PX[id])continue;
    let cv;try{cv=PXG.sheet(32,48,12,(g,f)=>f<8?fn(g,f%4,f>=4?'back':'front'):fn(sideProxy(g),f%4,'side'))}catch(e){console.warn('side',id,e);continue}
    SPR2[id]={w:32,h:48,canvas:cv};scene.remove(HERO_PX[id].m);HERO_PX[id]=new PixKind(SPR2[id],4,8,id==='titan'?2.8:2.4,10,8)}})();
/* 头像：从（2 倍精度的）正面第一帧裁出 */
(function(){for(const id in HUNTERS){const s=SPR2[id];if(!s||!s.canvas)continue;const H=s.canvas.height,W=Math.round(H*s.w/s.h),c=document.createElement('canvas');c.width=W;c.height=H;
  c.getContext('2d').drawImage(s.canvas,0,0,W,H,0,0,W,H);HERO_PORTRAIT[id]=c.toDataURL()}})();

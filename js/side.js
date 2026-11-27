/* ============ 万界乱斗 · 角色侧面像素帧 ============
   侧面 = 专门绘制的侧身躯干 / 侧向迈步的双腿 / 侧脸，
   再把各角色自己的配饰（发型、帽子、武器等）沿水平方向压缩叠上去，保留辨识度。 */
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

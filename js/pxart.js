/* ============ 万界乱斗 · 全新像素角色绘制器 ============
   从零绘制（不再沿用旧的像素图）：
   · 每帧 48×64，Q 版 2.6 头身：大头、圆脸、清晰的眼睛高光
   · 四色阶明暗（高光偏暖、阴影偏冷紫），左上受光，阶梯交界用抖动过渡；金属件额外有镜面高光
   · 彩色描边：外轮廓用相邻材质的最深色，不是一律纯黑
   · 动画：8 帧行走循环（腿的摆动、抬脚、手臂反向摆动、身体起伏、头发与衣摆的滞后飘动）
   · 正面 / 背面 / 侧面三个朝向分别绘制
   造型只取各类角色的"原型特征"（发型轮廓、服装类型、配色、武器类型），不复刻任何作品的具体设计。 */
const PXA=(()=>{
  const W=48,H=72,NF=8,OY=8; // 顶部留 8 格给头发、帽子
  const rgb=h=>{const n=parseInt(h.slice(1),16);return[(n>>16)&255,(n>>8)&255,n&255]};
  const mix=(a,b,t)=>a.map((v,i)=>Math.round(v*(1-t)+b[i]*t));
  const WARM=rgb('#fff4d8'),COOL=rgb('#3a2a72'),DEEP=rgb('#140c2a');
  const ramp=(hex,o={})=>{const c=rgb(hex);return[mix(c,WARM,o.hi??.32),c,mix(c,COOL,o.sh??.3),mix(c,DEEP,.55),mix(c,DEEP,.78)]};
  const BAY=[[0,8,2,10],[12,4,14,6],[3,11,1,9],[15,7,13,5]];
  class Pt{
    constructor(){this.m=new Int16Array(W*H).fill(-1);this.mats=[];this.ov=[]}
    mat(hex,o={}){this.mats.push({t:ramp(hex,o),mode:o.mode||'soft',noOut:!!o.noOut});return this.mats.length-1}
    set(x,y,id){x=Math.round(x);y=Math.round(y)+OY;if(x>=0&&y>=0&&x<W&&y<H)this.m[y*W+x]=id}
    clr(x,y){x=Math.round(x);y=Math.round(y)+OY;if(x>=0&&y>=0&&x<W&&y<H)this.m[y*W+x]=-1}
    lget(x,y){return this.get(Math.round(x),Math.round(y)+OY)}
    get(x,y){return x<0||y<0||x>=W||y>=H?-1:this.m[y*W+x]}
    rect(id,x,y,w,h){for(let j=0;j<h;j++)for(let i=0;i<w;i++)this.set(x+i,y+j,id)}
    ell(id,cx,cy,rx,ry){for(let y=Math.floor(cy-ry-1);y<=cy+ry+1;y++)for(let x=Math.floor(cx-rx-1);x<=cx+rx+1;x++){const dx=(x+.5-cx)/rx,dy=(y+.5-cy)/ry;if(dx*dx+dy*dy<=1)this.set(x,y,id)}}
    poly(id,pts){let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;for(const[x,y]of pts){x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y)}
      for(let y=Math.floor(y0);y<=y1;y++)for(let x=Math.floor(x0);x<=x1;x++){const px=x+.5,py=y+.5;let ins=false;
        for(let i=0,j=pts.length-1;i<pts.length;j=i++){const[xi,yi]=pts[i],[xj,yj]=pts[j];if((yi>py)!==(yj>py)&&px<(xj-xi)*(py-yi)/(yj-yi)+xi)ins=!ins}if(ins)this.set(x,y,id)}}
    cap(id,ax,ay,bx,by,r){const x0=Math.floor(Math.min(ax,bx)-r-1),x1=Math.ceil(Math.max(ax,bx)+r+1),y0=Math.floor(Math.min(ay,by)-r-1),y1=Math.ceil(Math.max(ay,by)+r+1),dx=bx-ax,dy=by-ay,L=dx*dx+dy*dy||1;
      for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){const px=x+.5,py=y+.5;let t=((px-ax)*dx+(py-ay)*dy)/L;t=Math.max(0,Math.min(1,t));const qx=ax+dx*t-px,qy=ay+dy*t-py;if(qx*qx+qy*qy<=r*r)this.set(x,y,id)}}
    // 细节层：着色之后直接写颜色（眼睛、嘴、缝线、纹样）
    dot(x,y,hex){this.ov.push([Math.round(x),Math.round(y)+OY,typeof hex==='string'?rgb(hex):hex])}
    hl(x,y,w,hex){for(let i=0;i<w;i++)this.dot(x+i,y,hex)}
    vl(x,y,h,hex){for(let i=0;i<h;i++)this.dot(x,y+i,hex)}
    tone(id,k){return this.mats[id].t[k]}
    render(ctx,ox){const img=ctx.createImageData(W,H),d=img.data,M=this.m;
      const put=(x,y,c)=>{const i=(y*W+x)*4;d[i]=c[0];d[i+1]=c[1];d[i+2]=c[2];d[i+3]=255};
      const run=(x,y,dx,dy,id)=>{let n=0;while(n<7&&this.get(x+dx*(n+1),y+dy*(n+1))===id)n++;return n};
      for(let y=0;y<H;y++)for(let x=0;x<W;x++){const id=M[y*W+x];if(id<0)continue;const m=this.mats[id],t=m.t;
        if(m.mode==='flat'){put(x,y,t[1]);continue}if(m.mode==='glow'){put(x,y,run(x,y,0,-1,id)<1?t[0]:t[1]);continue}
        const a=Math.min(run(x,y,-1,0,id),run(x,y,0,-1,id),run(x,y,-1,-1,id)),b=Math.min(run(x,y,1,0,id),run(x,y,0,1,id),run(x,y,1,1,id));
        let v=(b+.6)/(a+b+1.2)+(BAY[y&3][x&3]/16-.5)*.16;let k=v>.74?0:v>.42?1:v>.2?2:3;
        if(m.mode==='metal'){k=a===0?0:b===0?3:v>.6?1:2;if(a===1&&((x+y)&1))k=0}
        if(k===3&&b>0)k=2;
        put(x,y,t[k])}
      // 彩色描边
      for(let y=0;y<H;y++)for(let x=0;x<W;x++){if(M[y*W+x]>=0)continue;let n=-1;
        for(const[dx,dy]of[[0,-1],[-1,0],[1,0],[0,1]]){const q=this.get(x+dx,y+dy);if(q>=0&&!this.mats[q].noOut){n=q;break}}
        if(n>=0)put(x,y,this.mats[n].t[4])}
      for(const[x,y,c]of this.ov)if(x>=0&&y>=0&&x<W&&y<H&&M[y*W+x]>=0)put(x,y,c);
      ctx.putImageData(img,ox,0)}
  }
  function sheet(draw){const cv=document.createElement('canvas');cv.width=W*NF*3;cv.height=H;const ctx=cv.getContext('2d');
    ['front','back','side'].forEach((view,vi)=>{for(let f=0;f<NF;f++){const p=new Pt();try{draw(p,view,f)}catch(e){console.warn('pxa',e)}p.render(ctx,(vi*NF+f)*W)}});return cv}
  return{W,H,NF,OY,Pt,sheet,rgb,mix}
})();

/* ---------- 角色模板 ---------- */
const PXT=(()=>{const TAU=Math.PI*2;
  const dk=(hex,k)=>{const c=PXA.rgb(hex).map(v=>Math.round(v*(1-k)));return'#'+c.map(v=>v.toString(16).padStart(2,'0')).join('')};
  const lt=(hex,k)=>{const c=PXA.rgb(hex).map(v=>Math.round(v+(255-v)*k));return'#'+c.map(v=>v.toString(16).padStart(2,'0')).join('')};
  function pose(f){const a=f/8*TAU,s=Math.sin(a),c=Math.cos(a);return{a,s,c,bob:Math.abs(s)>.7?1:0,sway:Math.sin(a-.9)}}
  /* ===== 腿 ===== */
  function legs(p,S,view,P){const pants=p.mat(S.pants),shoe=p.mat(S.shoes),skin=p.mat(S.skin);const short=S.shorts;
    if(view==='side'){for(const sg of[-1,1]){const far=sg<0,pm=far?p.mat(dk(S.pants,.22)):pants,sm=far?p.mat(dk(S.shoes,.2)):shoe,km=far?p.mat(dk(S.skin,.2)):skin;
        const fx=23+sg*P.s*6,lift=Math.round(Math.max(0,sg*P.c)*3),kx=(23+fx)/2+1.6,ky=51-lift*.6;
        p.cap(pm,23,44,kx,ky,2.7);p.cap(short?km:pm,kx,ky,fx,59-lift,2.4);if(short)p.cap(pm,23,44,kx,ky,2.9);p.ell(sm,fx+1.6,60-lift,3.6,2)}return}
    for(const[x,sg]of[[20,1],[28,-1]]){const lift=Math.round(Math.max(0,sg*P.c)*2.4),fy=60-lift;
      p.cap(pants,x,43,x,short?50:fy-2,2.9);if(short)p.cap(skin,x,50,x,fy-2,2.3);p.ell(shoe,x+(view==='back'?0:0),fy-.5,3.4,2.1)}}
  /* ===== 躯干 ===== */
  function torso(p,S,view,P){const b=P.bob,top=p.mat(S.top),side=view==='side';
    if(side){p.poly(top,[[19,27+b],[28,27+b],[29,44+b],[18,44+b]]);p.ell(top,23.5,29+b,5.6,3.2)}
    else{p.poly(top,[[17,27+b],[31,27+b],[32.5,44+b],[15.5,44+b]]);p.ell(top,17,29.5+b,3.3,3);p.ell(top,31,29.5+b,3.3,3)}
    return top}
  function coat(p,S,view,P){const C=S.coat;if(!C)return;const b=P.bob,cm=p.mat(C.col),len=C.len||54,sw=Math.round(P.sway*1.4),side=view==='side';
    if(side){p.poly(cm,[[18,27+b],[28,27+b],[30,40+b],[30+sw,len],[16+sw,len],[17,40+b]]);p.ell(cm,23.5,29+b,5.8,3.3);if(C.trim){const tm=p.mat(C.trim);p.rect(tm,16+sw,len-1,15,1)}return}
    p.poly(cm,[[16.5,27+b],[31.5,27+b],[33,40+b],[34+sw,len],[14+sw,len],[15,40+b]]);p.ell(cm,17,29.5+b,3.6,3.2);p.ell(cm,31,29.5+b,3.6,3.2);
    if(C.open&&view==='front'){const sh=p.mat(S.top);p.poly(sh,[[21.5,27+b],[26.5,27+b],[26+sw*.3,len],[22+sw*.3,len]]);if(len>46){const lg=p.mat(S.pants);p.rect(lg,21,45+b,6,len-45-b)}}
    if(C.trim){const tm=p.mat(C.trim);p.rect(tm,14+sw,len-1,21,1);if(view==='front'&&C.open){p.rect(tm,21,28+b,1,len-28-b);p.rect(tm,26,28+b,1,len-28-b)}}}
  function cape(p,S,view,P,behind){const C=S.cape;if(!C)return;const b=P.bob,cm=p.mat(C.col),sw=Math.round(P.sway*2),len=C.len||52;
    if(view==='back'&&!behind){p.poly(cm,[[15,26+b],[33,26+b],[36+sw,len],[12+sw,len]]);if(C.trim){const t=p.mat(C.trim);p.rect(t,12+sw,len-1,25,1)}return}
    if(view==='front'&&behind){const im=p.mat(C.inner||dk(C.col,.35));p.poly(im,[[13,28+b],[35,28+b],[37+sw,len],[11+sw,len]]);return}
    if(view==='side'&&behind){p.poly(cm,[[17,27+b],[21,27+b],[18-sw*2,len],[10-sw*2,len]])}}
  /* ===== 手臂 ===== */
  function arms(p,S,view,P,which){const sl=p.mat(S.sleeve||S.top),hd=p.mat(S.glove||S.skin),b=P.bob;
    if(view==='side'){const far=which==='far',m=far?p.mat(dk(S.sleeve||S.top,.22)):sl,hm=far?p.mat(dk(S.glove||S.skin,.2)):hd,sg=far?-1:1,hx=23+sg*P.s*5,hy=39+b-Math.abs(P.s)*1;
      p.cap(m,23.5,29+b,hx,hy-1.5,2.4);p.ell(hm,hx,hy,2.4,2.3);return{hx,hy}}
    const L={x:14.5,y:40+b+Math.round(P.s*1)},R={x:33.5,y:40+b-Math.round(P.s*1)};
    if(!S.noArmL){p.cap(sl,16.5,29.5+b,L.x,L.y-2,2.5);p.ell(hd,L.x,L.y,2.4,2.3)}
    if(!S.noArmR){p.cap(sl,31.5,29.5+b,R.x,R.y-2,2.5);p.ell(hd,R.x,R.y,2.4,2.3)}
    return{L,R}}
  /* ===== 头 ===== */
  function head(p,S,view,P){const b=P.bob,sk=p.mat(S.skin);
    if(view==='side'){p.ell(sk,24,16+b,9.6,9.4);p.rect(sk,32,17+b,2,2);p.rect(sk,22,24+b,4,3);return sk}
    p.rect(sk,22,24+b,4,3);p.ell(sk,24,16.5+b,10.4,9.6);if(view==='front'){p.ell(sk,13.6,18.5+b,1.4,2);p.ell(sk,34.4,18.5+b,1.4,2)}return sk}
  function face(p,S,view,P){const b=P.bob,E=S.eye||'#3a2a5a',ey=S.eyeY||19;if(view==='back')return;
    const eyeAt=(x,y)=>{p.rect(p.mat(E,{mode:'flat',noOut:1}),x,y,2,3);p.dot(x,y,dk(E,.45));p.dot(x+1,y,dk(E,.45));p.dot(x,y+1,'#ffffff');p.dot(x+1,y+2,lt(E,.35))};
    const brow=S.brow||dk(S.hair||'#222',.15);
    if(view==='side'){if(S.eyeStyle!=='none'&&S.eyeStyle!=='blind'){eyeAt(29,ey+b);p.hl(28,ey-2+b,3,brow)}p.dot(31,24+b,dk(S.skin,.35));p.dot(27,21.5+b,lt('#ff8a9a',.2));return}
    if(S.eyeStyle==='none'||S.eyeStyle==='blind'){}else if(S.eyeStyle==='narrow'){p.hl(18,ey+1+b,3,dk(E,.3));p.hl(27,ey+1+b,3,dk(E,.3));p.hl(18,ey-1+b,3,brow);p.hl(27,ey-1+b,3,brow)}
    else{eyeAt(19,ey+b);eyeAt(27,ey+b);p.hl(18,ey-2+b,3,brow);p.hl(27,ey-2+b,3,brow)}
    if(!S.noMouth){if(S.mouth==='grin'){p.hl(22,24+b,4,dk(S.skin,.5));p.hl(23,25+b,2,'#ffffff')}else if(S.mouth==='frown')p.hl(22,24+b,4,dk(S.skin,.45));else p.hl(23,24+b,2,dk(S.skin,.42))}
    if(!S.noBlush){p.dot(17,22+b,lt('#ff8a9a',.35));p.dot(31,22+b,lt('#ff8a9a',.35))}}
  /* ===== 发型 ===== */
  const HAIR={
    short(p,h,v,b,sw){if(v==='back'){p.ell(h,24,15.5+b,11,10);p.poly(h,[[14,18+b],[34,18+b],[31,25+b],[17,25+b]]);return}
      if(v==='side'){p.ell(h,22.5,11.2+b,10.6,6.6);p.ell(h,18,16.5+b,6.4,7.6);p.poly(h,[[26,11+b],[33,10+b],[32,14.5+b],[29,14+b]]);return}
      p.ell(h,24,10.8+b,11.4,6.8);p.poly(h,[[13,12+b],[35,12+b],[34,15.5+b],[30,15+b],[27,16.5+b],[24,15+b],[21,16.5+b],[18,15+b],[14,15.5+b]]);p.rect(h,13,12+b,2,6);p.rect(h,33,12+b,2,6)},
    spiky(p,h,v,b,sw){const sp=(v==='side'?[[-160,15],[-130,17],[-100,16],[-70,14],[-40,11]]:[[-165,14],[-140,16],[-115,17],[-90,18],[-65,17],[-40,16],[-15,14]]).map(([d,r])=>[d,r*.95]);
      const cx=v==='side'?22:24,cy=10.5+b;for(const[deg,r]of sp){const a=deg*Math.PI/180,tx=cx+Math.cos(a)*r+sw*.4,ty=cy+Math.sin(a)*r;p.poly(h,[[cx+Math.cos(a+1.6)*5,cy+Math.sin(a+1.6)*4],[tx,ty],[cx+Math.cos(a-1.6)*5,cy+Math.sin(a-1.6)*4]])}
      HAIR.short(p,h,v,b,sw);if(v==='front')p.poly(h,[[20,11+b],[23,17+b],[25,11+b]])},
    spikyBig(p,h,v,b,sw){const cx=v==='side'?21:24,cy=10.5+b;
      for(const[deg,r]of v==='side'?[[-170,17],[-145,19],[-120,18],[-95,15],[-200,14]]:[[-175,15],[-150,18],[-125,19],[-100,17],[-75,18],[-50,18],[-25,15],[-200,12],[20,12]]){const a=deg*Math.PI/180;p.poly(h,[[cx+Math.cos(a+1.5)*5,cy+Math.sin(a+1.5)*4],[cx+Math.cos(a)*r*.95+sw*.5,cy+Math.sin(a)*r*.95],[cx+Math.cos(a-1.5)*5,cy+Math.sin(a-1.5)*4]])}
      HAIR.short(p,h,v,b,sw);if(v==='front'){p.poly(h,[[18,11+b],[20,18.5+b],[22,12+b]]);p.poly(h,[[26,12+b],[28,18+b],[30,11+b]])}},
    messy(p,h,v,b,sw){HAIR.short(p,h,v,b,sw);if(v==='front')for(const x of[15,19,23,27,31])p.poly(h,[[x-2,14+b],[x,17+b],[x+2,14+b]]);if(v!=='side')for(const x of[16,22,28,33])p.poly(h,[[x-3,6+b],[x,2.5+b],[x+2,6+b]])},
    slick(p,h,v,b,sw){if(v==='front'){p.ell(h,24,10.5+b,11.2,6.5);p.rect(h,13,10+b,2,7);p.rect(h,33,10+b,2,7);p.poly(h,[[22,9+b],[20,17+b],[22,16+b],[24,10+b]]);return}
      if(v==='side'){p.ell(h,21.5,12.5+b,10.4,7.2);p.ell(h,17,17+b,6,7.6);p.poly(h,[[12,10+b],[8,13+b+sw*.5],[12,16+b]]);return}HAIR.short(p,h,v,b,sw);p.poly(h,[[16,20+b],[24,28+b],[32,20+b]])},
    shaggy(p,h,v,b,sw){HAIR.short(p,h,v,b,sw);if(v==='front'){p.poly(h,[[13,13+b],[16,13+b],[16,26+b],[13,24+b]]);p.poly(h,[[32,13+b],[35,13+b],[35,24+b],[32,26+b]]);p.poly(h,[[17,11+b],[22,11+b],[19,18.5+b]]);p.poly(h,[[26,11+b],[31,11+b],[29,18.5+b]])}
      else if(v==='back')p.poly(h,[[14,16+b],[34,16+b],[33,27+b],[15,27+b]]);else p.poly(h,[[13,14+b],[20,14+b],[19,27+b],[14,26+b]])},
    long(p,h,v,b,sw){HAIR.short(p,h,v,b,sw);const L=S_=>0;
      if(v==='front'){p.poly(h,[[13,13+b],[16,13+b],[16+sw*.3,34+b],[12+sw*.5,33+b]]);p.poly(h,[[32,13+b],[35,13+b],[36+sw*.5,33+b],[32+sw*.3,34+b]])}
      else if(v==='back')p.poly(h,[[13,14+b],[35,14+b],[36+sw,38],[12+sw,38]]);else p.poly(h,[[11,12+b],[20,12+b],[18+sw,38],[9+sw,36]])},
    longBack(p,h,v,b,sw){if(v==='front')return;HAIR.long(p,h,v,b,sw)},
    bun(p,h,v,b,sw){HAIR.short(p,h,v,b,sw);if(v==='front'){p.poly(h,[[13,13+b],[16,13+b],[16,25+b],[14,24+b]]);p.poly(h,[[32,13+b],[35,13+b],[34,24+b],[32,25+b]]);p.ell(h,24,4.5+b,4,3)}
      else if(v==='back'){p.ell(h,24,9+b,5,4.5);p.cap(h,24,12+b,24,22+b,2)}else p.ell(h,15,9+b,4.5,4.5)},
    ahoge(p,h,v,b,sw){HAIR.messy(p,h,v,b,sw);const x=v==='side'?22:24;p.cap(h,x,4+b,x+2+sw,0+b,1);p.cap(h,x+2+sw,0+b,x+5+sw,1+b,1)},
    tilted(p,h,v,b,sw){HAIR.short(p,h,v,b,sw);for(const[x,y,tx,ty]of[[14,10,5,3],[18,6,11,0],[23,5,18,-1],[28,6,25,-1],[32,9,31,1]]){const dx=v==='side'?-3:0;p.poly(h,[[x-3+dx,y+b+2],[tx+dx,ty+b],[x+3+dx,y+b]])}},
    bald(p,h,v,b,sw){},
    swept(p,h,v,b,sw){HAIR.short(p,h,v,b,sw);if(v==='front'){p.poly(h,[[24,10+b],[35,11+b],[34,22+b],[30,18+b],[27,19.5+b]]);}},
    wavy(p,h,v,b,sw){HAIR.short(p,h,v,b,sw);if(v==='front'){for(const x of[14,34]){p.ell(h,x,19+b,2.5,3);p.ell(h,x,23+b,2.3,2.6)}p.poly(h,[[18,12+b],[23,12+b],[19,17.5+b]]);p.poly(h,[[25,12+b],[30,12+b],[29,17.5+b]])}
      else if(v==='back')for(const x of[16,24,32])p.ell(h,x,24+b,3,3)},
    ponytail(p,h,v,b,sw){HAIR.slick(p,h,v,b,sw);if(v==='back'){p.cap(h,24,14+b,24+sw,40,3);p.ell(h,24+sw,41,3.2,2.6)}else if(v==='side'){p.cap(h,13,13+b,6+sw*2,36,2.8)}else{p.cap(h,24,8+b,24,10+b,2)}},
    undercut(p,h,v,b,sw){HAIR.short(p,h,v,b,sw);if(v==='front'){p.poly(h,[[16,8+b],[24,6+b],[22,16+b]]);p.poly(h,[[24,6+b],[32,8+b],[27,16+b]])}},
  };
  /* ===== 头饰 / 面部配件 ===== */
  const HAT={
    wide(p,S,v,b){const m=p.mat(S.hatCol||'#2a2244'),bd=p.mat(S.hatBand||'#b02030');p.ell(m,24,9.5+b,16,3.2);p.poly(m,[[17,9+b],[18,0+b],[30,0+b],[31,9+b]]);p.rect(bd,18,6+b,13,2)},
    straw(p,S,v,b){const m=p.mat('#e8c060'),bd=p.mat('#d02a2a');p.ell(m,24,9.5+b,15,3.2);p.ell(m,24,6+b,8,5);p.rect(bd,16,7+b,16,2);p.dot(19,4+b,'#fff0b0');p.dot(26,3+b,'#fff0b0')},
    hood(p,S,v,b){const m=p.mat(S.hatCol||'#2a3048'),dk2=p.mat('#0c0c18',{mode:'flat'});p.ell(m,24,15.5+b,12.5,12);p.poly(m,[[14,20+b],[34,20+b],[36,30+b],[12,30+b]]);
      if(v==='front'){p.ell(dk2,24,19.5+b,7.5,6.5);const g=p.mat(S.eye||'#8fa8ff',{mode:'flat',noOut:1});p.rect(g,20,19+b,2,2);p.rect(g,26,19+b,2,2)}else if(v==='side'){p.ell(dk2,30,19+b,4,6);const g=p.mat(S.eye||'#8fa8ff',{mode:'flat',noOut:1});p.rect(g,30,19+b,2,2)}},
    wingHelm(p,S,v,b){const m=p.mat('#d8c89a',{mode:'metal'}),w=p.mat('#f4f0e8');p.ell(m,24,10+b,11,7);p.rect(m,13,10+b,22,3);
      for(const sg of v==='side'?[-1]:[-1,1]){const x=v==='side'?16:24+sg*11;p.poly(w,[[x,8+b],[x+sg*7,0+b],[x+sg*4,6+b],[x+sg*8,4+b],[x+sg*2,11+b]])}},
    fullMask(p,S,v,b){const m=p.mat(S.maskCol||'#c81c2a'),blk=p.mat('#1a1018');p.ell(m,24,16+b,10.8,10);if(v==='back')return;
      if(v==='side'){p.ell(blk,29,18+b,3,3.6);p.rect(p.mat('#ffffff',{mode:'flat',noOut:1}),29,18+b,2,2);return}
      p.ell(blk,19,18.5+b,3.6,4);p.ell(blk,29,18.5+b,3.6,4);const wh=p.mat('#ffffff',{mode:'flat',noOut:1});p.poly(wh,[[17,18+b],[21,17+b],[20,20+b]]);p.poly(wh,[[27,17+b],[31,18+b],[28,20+b]])},
    visor(p,S,v,b){const m=p.mat(S.hatCol||'#e8ecf4',{mode:'metal'}),vz=p.mat(S.visorCol||'#ff2a4a',{mode:'glow',noOut:1});p.ell(m,24,15+b,10.8,10);if(v==='back')return;if(v==='side'){p.rect(vz,26,16+b,8,3);return}p.rect(vz,15,16+b,18,3)},
    headband(p,S,v,b){const c=p.mat(S.bandCol||'#2a3a6a'),pl=p.mat('#b8c0d0',{mode:'metal'});if(v==='side'){p.rect(c,14,11+b,19,3);p.cap(c,14,12+b,9,18+b,1);return}p.rect(c,13,11+b,22,3);if(v==='front')p.rect(pl,18,10+b,12,5)},
    crown(p,S,v,b){const g=p.mat('#ffd040',{mode:'metal'});p.poly(g,[[16,8+b],[16,2+b],[19,5+b],[22,1+b],[24,5+b],[26,1+b],[29,5+b],[32,2+b],[32,8+b]])},
    horns(p,S,v,b){const m=p.mat(S.hornCol||'#3a2a2a');p.poly(m,[[15,8+b],[10,0+b],[17,5+b]]);p.poly(m,[[33,8+b],[38,0+b],[31,5+b]])},
  };
  const FACE={
    glasses(p,S,v,b){if(v==='back')return;const m=p.mat(S.glassCol||'#2a2a30');if(v==='side'){p.rect(m,28,18+b,5,1);p.rect(m,28,22+b,5,1);p.rect(m,27,18+b,1,5);return}
      for(const x of[16,25]){p.rect(m,x,17+b,7,1);p.rect(m,x,22+b,7,1);p.rect(m,x,17+b,1,6);p.rect(m,x+6,17+b,1,6)}p.rect(m,23,18+b,2,1)},
    shades(p,S,v,b){if(v==='back')return;const m=p.mat('#101018',{mode:'metal'});if(v==='side'){p.rect(m,27,18+b,6,3);return}p.rect(m,16,18+b,7,3);p.rect(m,25,18+b,7,3);p.rect(m,23,18+b,2,1)},
    blind(p,S,v,b){const m=p.mat(S.blindCol||'#1a1a24');if(v==='side'){p.rect(m,14,16+b,20,4);return}p.rect(m,13,16+b,22,4);if(v==='back')p.cap(m,24,18+b,24+2,26+b,1)},
    patch(p,S,v,b){if(v==='back')return;const m=p.mat(S.patchCol||'#1a1a20');if(v==='side')return;p.ell(m,28,19+b,3.4,3.4);p.cap(m,14,15+b,34,15+b,.8)},
    lowerMask(p,S,v,b){if(v==='back')return;const m=p.mat(S.lowerCol||'#2a3048');if(v==='side'){p.poly(m,[[24,21+b],[34,20+b],[33,26+b],[24,27+b]]);return}p.poly(m,[[14,21+b],[34,21+b],[32,27+b],[16,27+b]])},
    scar(p,S,v,b){if(v!=='front')return;p.vl(29,22+b,3,'#b04040');p.hl(28,23+b,3,'#b04040')},
    bandage(p,S,v,b){const m=p.mat('#f0ece2');if(v==='side'){p.rect(m,20,25+b,8,2);return}p.rect(m,20,25+b,8,2);if(v==='front')p.poly(m,[[25,14+b],[34,14+b],[34,19+b],[26,17+b]])},
    goatee(p,S,v,b){if(v==='back')return;const m=p.mat(S.hair||'#6a4a2a');if(v==='side'){p.rect(m,28,25+b,4,3);return}p.rect(m,21,25+b,6,2);p.rect(m,22,27+b,4,1)},
    mark(p,S,v,b){if(v!=='front')return;p.vl(16,20+b,3,'#c03030')},
  };
  /* ===== 武器 / 道具 ===== */
  function blade(p,ax,ay,bx,by,w,col,hilt){const bm=p.mat(col||'#d8e0ec',{mode:'metal'});p.cap(bm,ax,ay,bx,by,w);if(hilt){const hm=p.mat(hilt);const dx=bx-ax,dy=by-ay,L=Math.hypot(dx,dy);p.cap(hm,ax-dx/L*4,ay-dy/L*4,ax,ay,1.3);p.cap(hm,ax-dy/L*2.6,ay+dx/L*2.6,ax+dy/L*2.6,ay-dx/L*2.6,.9)}}
  const WPN={
    katana(p,S,v,P,H,stage){if(stage!=='hand')return;const h=v==='side'?H:H.R;if(!h)return;blade(p,h.hx??h.x,h.hy??h.y,(h.hx??h.x)+(v==='side'?10:7),(h.hy??h.y)-12,1,S.bladeCol,'#2a2230')},
    sheath(p,S,v,P,H,stage){if(stage!=='front'||v==='back')return;const m=p.mat(S.sheathCol||'#1a1a30'),b=P.bob;if(v==='side'){p.cap(m,19,40+b,34,44+b,1.4);return}p.cap(m,30,38+b,40,47+b,1.4);p.cap(p.mat('#d8c060'),29,37+b,31,39+b,1.2)},
    great(p,S,v,P,H,stage){const b=P.bob,col=S.bladeCol||'#8a8c98';const bw=S.bladeW||3.6;if(stage==='behind'&&v!=='back'){blade(p,v==='side'?17:33,6+b,v==='side'?12:15,58,bw,col,'#3a2a20')}
      if(stage==='front'&&v==='back')blade(p,32,8+b,16,56,bw,col,'#3a2a20')},
    sword(p,S,v,P,H,stage){if(stage!=='hand')return;const h=v==='side'?H:H.R,x=h.hx??h.x,y=h.hy??h.y;blade(p,x,y-1,x+(v==='side'?9:4),y-15,1.6,S.bladeCol||'#e8ecf4',S.hiltCol||'#d8b040')},
    twin(p,S,v,P,H,stage){if(stage!=='hand')return;if(v==='side'){blade(p,H.hx,H.hy,H.hx+9,H.hy-3,1,'#e8ecf4','#3a3a40');return}for(const h of[H.L,H.R])blade(p,h.x,h.y,h.x+(h===H.L?-6:6),h.y-8,1,'#e8ecf4','#3a3a40')},
    crossed(p,S,v,P,H,stage){const b=P.bob;if((stage==='behind'&&v!=='back')||(stage==='front'&&v==='back')){blade(p,14,4+b,30,30+b,1.1,'#e8ecf4','#1a1a20');blade(p,34,4+b,18,30+b,1.1,'#e8ecf4','#1a1a20')}},
    gun(p,S,v,P,H,stage){if(stage!=='hand')return;const m=p.mat(S.gunCol||'#3a3c44',{mode:'metal'});const h=v==='side'?{x:H.hx,y:H.hy}:H.R;p.rect(m,h.x-1,h.y-3,v==='side'?7:3,3);p.rect(m,h.x-1,h.y-1,2,3)},
    daggers(p,S,v,P,H,stage){if(stage!=='hand')return;if(v==='side'){blade(p,H.hx,H.hy,H.hx+6,H.hy+3,.9,'#cfd8f0');return}blade(p,H.L.x,H.L.y,H.L.x-3,H.L.y+6,.9,'#cfd8f0');blade(p,H.R.x,H.R.y,H.R.x+3,H.R.y+6,.9,'#cfd8f0')},
    wand(p,S,v,P,H,stage){if(stage!=='hand')return;const h=v==='side'?{x:H.hx,y:H.hy}:H.R,m=p.mat('#6a4a2a');p.cap(m,h.x,h.y,h.x+(v==='side'?7:3),h.y-9,.8);p.dot(h.x+(v==='side'?7:3),h.y-9,'#fff8c0')},
    lantern(p,S,v,P,H,stage){if(stage!=='hand')return;const h=v==='side'?{x:H.hx,y:H.hy}:H.R,fr=p.mat('#3a2a20',{mode:'metal'}),gl=p.mat('#ffd060',{mode:'glow',noOut:1});p.cap(fr,h.x,h.y,h.x,h.y+3,.6);p.rect(fr,h.x-3,h.y+3,6,7);p.rect(gl,h.x-2,h.y+4,4,5)},
    gauntlet(p,S,v,P,H,stage){if(stage!=='hand')return;const g=p.mat('#ffc830',{mode:'metal'});const h=v==='side'?{x:H.hx,y:H.hy}:H.L;p.ell(g,h.x,h.y,3.6,3.4);p.cap(g,h.x,h.y-2,h.x+(v==='side'?-1:1),h.y-7,2.6);
      for(const[i,c]of['#ff3050','#3a8aff','#2ad870','#ffd030','#c050ff','#ff9a30'].entries())p.dot(h.x-2+i%3*2,h.y-1+Math.floor(i/3)*2,c)},
    cyberArm(p,S,v,P,H,stage){if(stage!=='hand')return;const m=p.mat('#9aa4b8',{mode:'metal'}),bl=p.mat('#ff2a8a',{mode:'glow',noOut:1});const h=v==='side'?{x:H.hx,y:H.hy}:H.R;p.cap(m,h.x,h.y-8,h.x,h.y,2.4);p.cap(bl,h.x+1,h.y-6,h.x+5,h.y+4,.7)},
    protoArm(p,S,v,P,H,stage){if(stage!=='hand')return;const m=p.mat('#d8b050',{mode:'metal'});const h=v==='side'?{x:H.hx,y:H.hy}:H.R;p.cap(m,h.x,h.y-9,h.x,h.y,2.3);p.ell(m,h.x,h.y,2.4,2.2);blade(p,h.x,h.y,h.x+(v==='side'?9:5),h.y-14,1,'#e8ecf4','#c8a040')},
    chainsaw(p,S,v,P,H,stage){if(stage!=='hand')return;const h=v==='side'?{x:H.hx,y:H.hy}:H.R,bd=p.mat('#ff8a20'),bl=p.mat('#c8ccd4',{mode:'metal'});p.rect(bd,h.x-2,h.y-3,6,5);p.cap(bl,h.x+2,h.y-1,h.x+(v==='side'?13:6),h.y-12,1.6);
      for(let i=0;i<5;i++)p.dot(h.x+3+i*(v==='side'?2:.8),h.y-3-i*2.2,'#3a3c44')},
    kunai(p,S,v,P,H,stage){if(stage!=='hand')return;const h=v==='side'?{x:H.hx,y:H.hy}:H.R;blade(p,h.x,h.y,h.x+(v==='side'?6:2),h.y-6,1,'#c8d0dc','#2a2a30')},
    ball(p,S,v,P,H,stage){if(stage!=='feet'||v==='back')return;const w=p.mat('#f4f4f4'),k=p.mat('#1a1a20',{mode:'flat',noOut:1}),x=v==='side'?33+P.s*2:31,y=58;p.ell(w,x,y,3.4,3.4);p.rect(k,x-1,y-1,2,2);p.dot(x-3,y,'#1a1a20');p.dot(x+2,y-2,'#1a1a20')},
    flask(p,S,v,P,H,stage){if(stage!=='hand')return;const h=v==='side'?{x:H.hx,y:H.hy}:H.R,g=p.mat('#c8f0ff'),l=p.mat('#40c8ff',{mode:'glow',noOut:1});p.rect(g,h.x-1,h.y-5,2,3);p.ell(g,h.x,h.y+1,3,3);p.ell(l,h.x,h.y+2,2,1.6)},
    blaster(p,S,v,P,H,stage){if(stage!=='hand')return;const h=v==='side'?{x:H.hx,y:H.hy}:H.R,m=p.mat('#f0e060'),k=p.mat('#3a3c44',{mode:'metal'});p.rect(m,h.x-2,h.y-4,v==='side'?9:5,4);p.rect(k,h.x-1,h.y,2,3)},
    card(p,S,v,P,H,stage){if(stage!=='hand'||v==='back')return;const h=v==='side'?{x:H.hx,y:H.hy}:H.R,m=p.mat('#ffffff');p.rect(m,h.x-1,h.y-5,4,5);p.dot(h.x,h.y-4,'#d02030');p.dot(h.x+1,h.y-2,'#2030a0')},
    ring(p,S,v,P,H,stage){if(stage!=='hand'||v==='back')return;const h=v==='side'?{x:H.hx,y:H.hy}:H.L;p.dot(h.x,h.y-1,'#5affff');p.dot(h.x+1,h.y-1,'#ffffff')},
    piece(p,S,v,P,H,stage){if(stage!=='hand'||v==='back')return;const h=v==='side'?{x:H.hx,y:H.hy}:H.R,m=p.mat('#f0f0f4');p.rect(m,h.x-1,h.y-6,3,4);p.ell(m,h.x,h.y-7,1.6,1.4);p.rect(m,h.x-2,h.y-2,5,2)},
    scythe(p,S,v,P,H,stage){}, none(){},
  };
  /* ===== 组装 ===== */
  function draw(S){return(p,view,f)=>{const P=pose(f),b=P.bob,sw=P.sway;const hairM=S.hair?p.mat(S.hair):-1;const W=WPN[S.weapon||'none']||WPN.none;
    // 1 身后层
    cape(p,S,view,P,true);W(p,S,view,P,null,'behind');
    if(view==='front'&&S.hairStyle&&/long|ponytail/.test(S.hairStyle)&&!S.hat&&hairM>=0)p.poly(hairM,[[14,14+b],[34,14+b],[35+sw,34+b],[13+sw,34+b]]);
    // 2 侧面：远侧手臂在身体后
    let H={};if(view==='side')arms(p,S,view,P,'far');
    legs(p,S,view,P);torso(p,S,view,P);coat(p,S,view,P);if(S.detail)S.detail(p,view,P,'torso');
    if(view==='back')cape(p,S,view,P,false);
    if(view!=='side')H=arms(p,S,view,P);
    const PH=Object.assign({},P,{bob:b+1}),hb=b+1;head(p,S,view,PH);face(p,S,view,PH);
    if(S.faceItem)for(const k of[].concat(S.faceItem))FACE[k](p,S,view,hb);
    if(S.hairStyle&&hairM>=0)HAIR[S.hairStyle](p,hairM,view,hb,sw);
    if(S.hat)HAT[S.hat](p,S,view,hb);
    if(S.detail)S.detail(p,view,PH,'head');
    if(view==='side'){H=arms(p,S,view,P,'near')}
    W(p,S,view,P,H,'hand');W(p,S,view,P,H,'front');W(p,S,view,P,H,'feet');
    if(S.detail)S.detail(p,view,P,'top')}}
  return{draw,dk,lt,WPN,HAT,FACE,HAIR}})();

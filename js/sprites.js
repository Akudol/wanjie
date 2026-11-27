/* ============ 万界乱斗 · 精细像素角色生成器 ============
   用简单几何（矩形 / 椭圆 / 多边形 / 粗线）在像素网格上画出各个部件，
   再自动加上：顶部高光、底部与右侧阴影、圆柱体明暗抖动、按部件颜色加深的选择性描边。 */
const PXG=(()=>{
  const rgb=h=>{const n=parseInt(h.slice(1),16);return[(n>>16)&255,(n>>8)&255,n&255]};
  const sh=(c,k)=>k>=0?c.map(v=>Math.round(v+(255-v)*k)):c.map(v=>Math.round(v*(1+k)));
  class Grid{
    constructor(W,H){this.W=W;this.H=H;this.id=new Int16Array(W*H).fill(-1);this.parts=[]}
    part(col,o={}){this.parts.push(Object.assign({c:rgb(col)},o));return this.parts.length-1}
    set(x,y,p){x=Math.floor(x);y=Math.floor(y);if(x>=0&&y>=0&&x<this.W&&y<this.H)this.id[y*this.W+x]=p}
    get(x,y){return x<0||y<0||x>=this.W||y>=this.H?-1:this.id[y*this.W+x]}
    rect(p,x,y,w,h){for(let j=0;j<h;j++)for(let i=0;i<w;i++)this.set(x+i,y+j,p)}
    ell(p,cx,cy,rx,ry){for(let y=Math.floor(cy-ry-1);y<=cy+ry+1;y++)for(let x=Math.floor(cx-rx-1);x<=cx+rx+1;x++){const dx=(x+.5-cx)/rx,dy=(y+.5-cy)/ry;if(dx*dx+dy*dy<=1)this.set(x,y,p)}}
    poly(p,pts){let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;for(const[x,y]of pts){x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y)}
      for(let y=Math.floor(y0);y<=y1;y++)for(let x=Math.floor(x0);x<=x1;x++){const px=x+.5,py=y+.5;let ins=false;
        for(let i=0,j=pts.length-1;i<pts.length;j=i++){const[xi,yi]=pts[i],[xj,yj]=pts[j];if((yi>py)!==(yj>py)&&px<(xj-xi)*(py-yi)/(yj-yi)+xi)ins=!ins}if(ins)this.set(x,y,p)}}
    line(p,ax,ay,bx,by,w=1){const x0=Math.floor(Math.min(ax,bx)-w),x1=Math.ceil(Math.max(ax,bx)+w),y0=Math.floor(Math.min(ay,by)-w),y1=Math.ceil(Math.max(ay,by)+w),dx=bx-ax,dy=by-ay,L=dx*dx+dy*dy||1;
      for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){const px=x+.5,py=y+.5;let t=((px-ax)*dx+(py-ay)*dy)/L;t=Math.max(0,Math.min(1,t));const qx=ax+dx*t-px,qy=ay+dy*t-py;if(qx*qx+qy*qy<=w*w/4+.05)this.set(x,y,p)}}
    px(p,x,y){this.set(x,y,p)}
    render(ctx,ox){const W=this.W,H=this.H,img=ctx.createImageData(W,H),d=img.data,bb=this.parts.map(()=>({x0:1e9,x1:-1}));
      for(let y=0;y<H;y++)for(let x=0;x<W;x++){const p=this.id[y*W+x];if(p>=0){const b=bb[p];if(x<b.x0)b.x0=x;if(x>b.x1)b.x1=x}}
      const put=(x,y,c,a=255)=>{const i=(y*W+x)*4;d[i]=c[0];d[i+1]=c[1];d[i+2]=c[2];d[i+3]=a};
      for(let y=0;y<H;y++)for(let x=0;x<W;x++){const p=this.id[y*W+x];if(p<0)continue;const P=this.parts[p];
        if(P.flat){put(x,y,P.c);continue}
        const up=this.get(x,y-1),dn=this.get(x,y+1),lf=this.get(x-1,y),rt=this.get(x+1,y),b=bb[p],t=(x-b.x0)/Math.max(1,b.x1-b.x0);let k=0;
        if(up!==p)k+=.24;else if(lf!==p)k+=.1;
        if(dn!==p)k-=.24;else if(rt!==p)k-=.16;
        if(t>.66&&k<=0)k-=((x+y)&1)||t>.8?.15:0;else if(t<.3&&k===0)k+=(x+y)&1?.07:0;
        put(x,y,sh(P.c,k*(P.soft?.5:1)))}
      // 选择性描边：用相邻部件颜色的深色
      for(let y=0;y<H;y++)for(let x=0;x<W;x++){if(this.id[y*W+x]>=0)continue;let n=-1;
        for(const[dx,dy]of[[0,1],[0,-1],[1,0],[-1,0]]){const q=this.get(x+dx,y+dy);if(q>=0&&!this.parts[q].noOutline){n=q;break}}
        if(n>=0)put(x,y,sh(this.parts[n].c,-.78))}
      ctx.putImageData(img,ox,0)}
  }
  function sheet(W,H,F,fn){const cv=document.createElement('canvas');cv.width=W*F;cv.height=H;const ctx=cv.getContext('2d');
    for(let f=0;f<F;f++){const g=new Grid(W,H);fn(g,f);g.render(ctx,f*W)}return cv}
  return{sheet,Grid}
})();

/* ---------- 走路参数 ---------- */
const WALK={sw:[1,0,-1,0],bob:[0,-1,0,-1]};

/* ---------- 猎人（32×48，前 4 帧正面，后 4 帧背面） ---------- */
function heroLegs(g,f,pal,x=12,top=36,gap=5){const sw=WALK.sw[f],legs=g.part(pal.legs),boots=g.part(pal.boots);
  const lL=sw>0?2:0,lR=sw<0?2:0;g.rect(legs,x,top,3,10-lL);g.rect(boots,x-1,top+7-lL,4,3);g.rect(legs,x+3+gap-3,top,3,10-lR);g.rect(boots,x+gap,top+7-lR,4,3)}
function drawWarden(g,f,view){const pal={legs:'#2e2436',boots:'#18101c'},b=WALK.bob[f],sw=WALK.sw[f],back=view==='back';
  heroLegs(g,f,pal,12,36+b);
  const coat=g.part('#433060'),coatD=g.part('#2c1f42'),belt=g.part('#3a2418'),buckle=g.part('#e0b048'),scarf=g.part('#b4202e'),sleeve=g.part('#3a2a54'),hand=g.part('#d0b098'),
    skin=g.part('#d8bca4'),shade=g.part('#5a4048',{soft:1}),hair=g.part('#2a2030'),eye=g.part('#ffd27a',{flat:1,noOutline:1}),hat=g.part('#2a2240'),band=g.part('#a8182a'),
    iron=g.part('#4a3a2c'),glow=g.part('#ffd070',{flat:1}),glow2=g.part('#ff9a30',{flat:1});
  g.poly(coat,[[10,19+b],[22,19+b],[25,39+b],[7,39+b]]);
  if(!back){g.rect(coatD,15,25+b,2,14);g.line(coatD,11,30+b,9,38+b,1);g.line(coatD,21,30+b,23,38+b,1)}else{g.rect(coatD,15,21+b,2,18);g.line(coatD,12,24+b,10,38+b,1)}
  g.rect(belt,10,29+b,12,2);if(!back)g.rect(buckle,15,29+b,2,2);
  g.rect(sleeve,7,20+b-sw,3,11);g.rect(sleeve,22,20+b+sw,3,11);g.rect(hand,7,31+b-sw,3,2);g.rect(hand,22,31+b+sw,3,2);
  g.rect(scarf,11,17+b,10,3);if(!back){g.rect(scarf,18,20+b,2,6);g.px(scarf,19,26+b)}
  g.ell(back?hair:skin,16,13+b,5,5);
  if(!back){g.rect(shade,11,10+b,10,3);g.px(eye,14,13+b);g.px(eye,18,13+b)}
  g.ell(hat,16,9+b,11,2.4);g.poly(hat,[[11,9+b],[12,2+b],[20,2+b],[21,9+b]]);g.rect(band,12,6+b,8,2);
  // 灯笼（右手）
  const ly=33+b+sw;g.line(iron,24,32+b+sw,24,ly,1);g.rect(iron,22,ly,5,1);g.rect(iron,22,ly+6,5,1);g.rect(glow,23,ly+1,3,5);g.px(glow2,23,ly+4);g.px(glow2,25,ly+2);g.rect(iron,22,ly+1,1,5);g.rect(iron,26,ly+1,1,5)}
function drawHeir(g,f,view){const pal={legs:'#1e141e',boots:'#0c080c'},b=WALK.bob[f],sw=WALK.sw[f],back=view==='back';
  const capeO=g.part('#24101c'),capeL=g.part('#a01428'),coat=g.part('#2e1e30'),vest=g.part('#8c1424'),btn=g.part('#e0b048',{flat:1}),crav=g.part('#f0e8e0'),
    sleeve=g.part('#281828'),hand=g.part('#ece0d8'),skin=g.part('#f0e2da'),hair=g.part('#16101a'),eye=g.part('#ff2438',{flat:1,noOutline:1}),mouth=g.part('#8a2030',{flat:1});
  if(back){g.poly(capeO,[[9,17+b],[23,17+b],[28,44],[4,44]]);g.rect(capeL,5,42,23,2);heroLegs(g,f,pal,12,40+b);g.ell(hair,16,13+b,5,5.5);g.poly(capeO,[[8,10+b],[11,10+b],[12,19+b],[8,19+b]]);g.poly(capeO,[[21,10+b],[24,10+b],[24,19+b],[20,19+b]]);return}
  g.poly(capeO,[[8,18+b],[24,18+b],[28,43],[4,43]]);g.poly(capeL,[[8,20+b],[10,20+b],[8,42],[5,42]]);g.poly(capeL,[[22,20+b],[24,20+b],[27,42],[24,42]]);
  heroLegs(g,f,pal,12,36+b);
  g.poly(coat,[[10,19+b],[22,19+b],[23,38+b],[9,38+b]]);g.poly(vest,[[13,20+b],[19,20+b],[18,33+b],[14,33+b]]);g.px(btn,16,24+b);g.px(btn,16,27+b);g.px(btn,16,30+b);
  g.poly(crav,[[14,18+b],[18,18+b],[17,23+b],[15,23+b]]);
  g.rect(sleeve,7,20+b-sw,3,11);g.rect(sleeve,22,20+b+sw,3,11);g.rect(hand,7,31+b-sw,3,2);g.rect(hand,22,31+b+sw,3,2);
  g.poly(capeL,[[8,10+b],[11,12+b],[12,19+b],[8,19+b]]);g.poly(capeL,[[24,10+b],[21,12+b],[20,19+b],[24,19+b]]);
  g.ell(skin,16,13+b,5,5.5);g.poly(hair,[[11,12+b],[11,8+b],[14,7+b],[16,10+b],[18,7+b],[21,8+b],[21,12+b],[20,10+b],[16,12+b],[12,10+b]]);
  g.px(eye,14,14+b);g.px(eye,18,14+b);g.rect(mouth,15,17+b,2,1)}
function drawRaven(g,f,view){const pal={legs:'#18202e',boots:'#0a0a12'},b=WALK.bob[f],sw=WALK.sw[f],back=view==='back';
  heroLegs(g,f,pal,12,36+b);
  const cloak=g.part('#24304e'),cloakD=g.part('#182238'),trim=g.part('#4a5a8a'),strap=g.part('#5a4630'),hood=g.part('#2a3858'),face=g.part('#0a0a14',{flat:1}),eye=g.part('#6ae0ff',{flat:1,noOutline:1}),
    mask=g.part('#8a8c9c'),sleeve=g.part('#1e2840'),hand=g.part('#2a2a34'),blade=g.part('#dce4f4'),hilt=g.part('#6a4a2a');
  g.poly(cloak,[[10,18+b],[22,18+b],[25,40+b],[7,40+b]]);g.line(trim,10,19+b,7,39+b,1);g.line(trim,22,19+b,25,39+b,1);
  g.line(strap,10,20+b,21,32+b,1.4);g.line(strap,22,20+b,11,32+b,1.4);if(back)g.rect(cloakD,15,22+b,2,17);
  g.rect(sleeve,7,20+b-sw,3,11);g.rect(sleeve,22,20+b+sw,3,11);g.rect(hand,7,31+b-sw,3,2);g.rect(hand,22,31+b+sw,3,2);
  if(!back){g.line(blade,8,33+b-sw,5,41+b-sw,1.3);g.px(hilt,8,32+b-sw);g.line(blade,24,33+b+sw,27,41+b+sw,1.3);g.px(hilt,24,32+b+sw)}
  g.poly(hood,[[16,2+b],[23,10+b],[23,19+b],[9,19+b],[9,10+b]]);
  if(!back){g.ell(face,16,13+b,4,4.5);g.px(eye,14,12+b);g.px(eye,18,12+b);g.rect(mask,13,15+b,7,3)}else g.line(cloakD,16,4+b,16,18+b,1)}

/* ---------- 敌人 ---------- */
function drawGhoul(g,f,c){const b=WALK.bob[f],sw=WALK.sw[f],skin=g.part(c.skin),rib=g.part(c.rib),rag=g.part(c.rag),eye=g.part(c.eye,{flat:1,noOutline:1}),mouth=g.part('#1a0a0a',{flat:1}),tooth=g.part('#e8e0c8',{flat:1}),claw=g.part('#e0d8c0');
  g.line(skin,13,30+b,12,38,2.2);g.line(skin,19,30+b,20,38,2.2);if(sw>0)g.line(skin,12,34,11,38,2.2);if(sw<0)g.line(skin,20,34,21,38,2.2);
  g.ell(skin,16,24+b,7,7);g.ell(skin,16,20+b,9,4);g.poly(rag,[[10,28+b],[22,28+b],[21,33+b],[18,31+b],[16,34+b],[14,31+b],[11,33+b]]);
  for(let i=0;i<3;i++){g.line(rib,12,21+b+i*2,15,22+b+i*2,1);g.line(rib,20,21+b+i*2,17,22+b+i*2,1)}
  g.line(skin,8,20+b,6,30+b-sw,2.2);g.line(skin,24,20+b,26,30+b+sw,2.2);g.px(claw,5,31+b-sw);g.px(claw,7,31+b-sw);g.px(claw,25,31+b+sw);g.px(claw,27,31+b+sw);
  g.ell(skin,16,13+b,5,5);g.px(eye,14,12+b);g.px(eye,18,12+b);g.rect(mouth,14,15+b,5,2);g.px(tooth,14,15+b);g.px(tooth,16,15+b);g.px(tooth,18,15+b)}
function drawPenitent(g,f){const b=WALK.bob[f],sw=WALK.sw[f],robe=g.part('#5e3e2a'),robeD=g.part('#3e281a'),rope=g.part('#d8c8a0'),face=g.part('#140c0a',{flat:1}),eye=g.part('#ffd060',{flat:1,noOutline:1}),
    foot=g.part('#c8a080'),wax=g.part('#ece4cc'),fl=g.part('#ffd070',{flat:1,noOutline:1}),hand=g.part('#c8a080');
  g.rect(foot,12+(sw>0?-1:0),40,3,2);g.rect(foot,18+(sw<0?1:0),40,3,2);
  g.poly(robe,[[11,15+b],[21,15+b],[26,41],[6,41]]);g.line(robeD,12,24+b,9,40,1);g.line(robeD,20,24+b,23,40,1);g.line(robeD,16,30+b,16,40,1);
  g.rect(rope,10,27+b,12,1);g.line(rope,18,28+b,19,34+b,1);
  g.ell(robe,16,10+b,6.5,6.5);g.poly(robe,[[16,1+b],[21,6+b],[11,6+b]]);g.ell(face,16,11+b,4,4);g.px(eye,14,11+b);g.px(eye,18,11+b);
  g.rect(hand,14,21+b,5,2);g.rect(wax,15,17+b,2,4);g.px(fl,15,15+b+(f&1));g.px(fl,16,16+b)}
function drawKnight(g,f,c){const b=WALK.bob[f],sw=WALK.sw[f],bone=g.part(c.bone),armor=g.part(c.armor),armorD=g.part(c.armorD),plume=g.part(c.plume),visor=g.part('#0a0608',{flat:1}),eye=g.part(c.eye,{flat:1,noOutline:1}),
    blade=g.part(c.blade),gold=g.part('#d8a840'),shield=g.part(c.shield),emb=g.part('#d8a840',{flat:1});
  const lL=sw>0?2:0,lR=sw<0?2:0;g.rect(bone,12,34+b,2,11-lL);g.rect(bone,18,34+b,2,11-lR);g.rect(armorD,11,38+b,4,4-lL);g.rect(armorD,17,38+b,4,4-lR);g.rect(armor,11,44-lL,4,2);g.rect(armor,17,44-lR,4,2);
  g.poly(armor,[[10,18+b],[22,18+b],[21,33+b],[11,33+b]]);g.rect(armorD,15,20+b,2,12);g.line(armorD,12,26+b,20,26+b,1);
  g.ell(armor,9,19+b,3.5,3);g.ell(armor,23,19+b,3.5,3);g.line(bone,9,22+b,8,30+b-sw,1.6);g.line(bone,23,22+b,24,30+b+sw,1.6);
  g.line(blade,25,6+b+sw,25,29+b+sw,1.6);g.rect(gold,23,29+b+sw,5,1);g.rect(c.hiltCol?gold:armorD,24,30+b+sw,2,2);
  g.poly(shield,[[3,21+b-sw],[11,21+b-sw],[11,30+b-sw],[7,35+b-sw],[3,30+b-sw]]);g.rect(emb,6,24+b-sw,2,6);g.rect(emb,5,26+b-sw,4,1);
  g.rect(armor,11,6+b,10,11);g.ell(armor,16,7+b,5,3);g.rect(visor,12,10+b,8,2);g.px(eye,13,10+b);g.px(eye,18,10+b);g.rect(bone,13,14+b,6,2);
  g.poly(plume,[[15,5+b],[17,5+b],[19,0+b],[14,1+b]])}
function drawWraith(g,f){const robe=g.part('#b4a8e4'),robeD=g.part('#8a7ac0'),face=g.part('#1a1430',{flat:1}),eye=g.part('#7affc0',{flat:1,noOutline:1}),hand=g.part('#d8d0f4');
  const w=[[0,2,0,-2],[1,-1,2,0],[0,-2,0,2],[-1,1,-2,0]][f];
  g.poly(robe,[[11,12],[21,12],[25,30],[26,40+w[0]],[22,44+w[1]],[18,41+w[2]],[14,45+w[3]],[10,41+w[0]],[6,44+w[2]],[7,30]]);
  g.line(robeD,13,20,11,40,1);g.line(robeD,19,20,21,40,1);g.line(robeD,16,24,16,42,1);
  g.line(robe,10,17,4,26+(f&1),2);g.line(robe,22,17,28,26+((f+1)&1),2);g.line(hand,4,26+(f&1),2,29,1);g.line(hand,28,26+((f+1)&1),30,29,1);
  g.ell(robe,16,9,6,6.5);g.poly(robe,[[16,0],[21,5],[11,5]]);g.ell(face,16,10,3.6,4.2);g.px(eye,14,9);g.px(eye,18,9);g.px(eye,14,10);g.px(eye,18,10)}
function drawBat(g,f,c){const body=g.part(c.body),wing=g.part(c.wing),bonec=g.part(c.bone),eye=g.part(c.eye,{flat:1,noOutline:1});
  const tip=[[2,2],[1,8],[3,16],[1,8]][f],mid=[[8,4],[7,9],[8,14],[7,9]][f];
  for(const s of[1,-1]){const X=x=>16+s*(16-x);g.poly(wing,[[X(13),8],[X(mid[0]),mid[1]],[X(tip[0]),tip[1]],[X(6),12],[X(9),13],[X(12),12]]);g.line(bonec,X(13),8,X(tip[0]),tip[1],1);g.line(bonec,X(mid[0]),mid[1],X(9),13,1)}
  g.ell(body,16,10,3.5,4.5);g.poly(body,[[13,6],[14,2],[15,6]]);g.poly(body,[[17,6],[18,2],[19,6]]);if(c.horn){g.px(bonec,13,4);g.px(bonec,19,4)}g.px(eye,15,8);g.px(eye,17,8)}
function drawBishop(g,f){const robe=g.part('#5c2c7e'),robeD=g.part('#3e1a58'),stole=g.part('#d4aa48'),mitre=g.part('#ece4d4'),mitreG=g.part('#d4aa48',{flat:1}),skin=g.part('#a8a090'),eye=g.part('#ffe060',{flat:1,noOutline:1}),staff=g.part('#d4aa48');
  const w=[[0,1],[1,0],[0,-1],[-1,0]][f];
  g.poly(robe,[[10,20],[22,20],[27,48+w[0]],[5,48+w[1]]]);g.line(robeD,12,26,8,47,1);g.line(robeD,20,26,24,47,1);g.rect(stole,13,21,2,27);g.rect(stole,18,21,2,27);g.rect(stole,13,30,7,1);
  g.line(robe,10,21,6,32,2.4);g.line(robe,22,21,25,31,2.4);g.rect(skin,5,32,3,2);g.rect(skin,24,31,3,2);
  g.line(staff,26,4,26,50,1.4);g.px(staff,27,3);g.px(staff,28,4);g.px(staff,28,6);g.px(staff,27,7);
  g.ell(skin,16,16,4.5,4.5);g.px(eye,14,16);g.px(eye,18,16);g.rect(robeD,14,19,5,1);
  g.poly(mitre,[[11,13],[21,13],[20,6],[16,0],[12,6]]);g.rect(mitreG,15,4,2,8);g.rect(mitreG,13,7,6,1);g.rect(mitreG,11,12,10,1)}
function drawLord(g,f){const b=WALK.bob[f],sw=WALK.sw[f],capeO=g.part('#4a0a16'),capeL=g.part('#a01024'),armor=g.part('#221a24'),armorR=g.part('#8a1020'),skin=g.part('#ecdcd4'),eye=g.part('#ff1030',{flat:1,noOutline:1}),
    crown=g.part('#e8b840'),horn=g.part('#2e1e1a'),blade=g.part('#ff3850',{flat:1}),bladeE=g.part('#ffc0c8',{flat:1}),gold=g.part('#e8b840');
  g.poly(capeO,[[14,22+b],[34,22+b],[44,62],[4,62]]);g.poly(capeL,[[14,24+b],[17,24+b],[10,61],[6,61]]);g.poly(capeL,[[31,24+b],[34,24+b],[42,61],[38,61]]);
  const lL=sw>0?2:0,lR=sw<0?2:0;g.rect(armor,18,48+b,5,13-lL);g.rect(armor,26,48+b,5,13-lR);g.rect(armorR,18,52+b,5,1);g.rect(armorR,26,52+b,5,1);
  g.poly(armor,[[15,23+b],[33,23+b],[31,49+b],[17,49+b]]);g.rect(armorR,23,26+b,2,20);g.line(armorR,17,36+b,31,36+b,1);
  g.poly(armor,[[10,22+b],[16,19+b],[18,26+b],[11,28+b]]);g.poly(armor,[[38,22+b],[32,19+b],[30,26+b],[37,28+b]]);g.px(gold,11,22+b);g.px(gold,37,22+b);
  g.line(armor,11,27+b,10,40+b-sw,3);g.line(armor,37,27+b,39,40+b+sw,3);
  g.line(blade,40,4+b+sw,40,40+b+sw,2.6);g.line(bladeE,40,6+b+sw,40,36+b+sw,1);g.rect(gold,36,40+b+sw,9,2);g.rect(armor,39,42+b+sw,3,4);
  g.ell(skin,24,16+b,6,6.5);g.px(eye,21,16+b);g.px(eye,22,16+b);g.px(eye,26,16+b);g.px(eye,27,16+b);g.rect(armorR,22,20+b,5,1);
  g.poly(horn,[[18,12+b],[13,4+b],[11,-1+b],[16,6+b],[20,10+b]]);g.poly(horn,[[30,12+b],[35,4+b],[37,-1+b],[32,6+b],[28,10+b]]);
  g.poly(crown,[[18,11+b],[30,11+b],[30,7+b],[28,9+b],[26,5+b],[24,8+b],[22,5+b],[20,9+b],[18,7+b]])}
function drawHound(g,f,c){const sw=WALK.sw[f],bone=g.part(c.bone),dark=g.part(c.dark),eye=g.part(c.eye,{flat:1,noOutline:1}),fire=g.part(c.fire||c.bone,{flat:!!c.fire,noOutline:!!c.fire});
  g.line(bone,10,15,9,22+(sw>0?-1:0),1.6);g.line(bone,22,15,23,22+(sw<0?-1:0),1.6);g.line(bone,13,14,12,22+(sw<0?-1:0),1.4);g.line(bone,19,14,20,22+(sw>0?-1:0),1.4);
  g.ell(bone,16,14,7,4);for(let i=0;i<3;i++)g.line(dark,12+i*3,12,12+i*3,16,1);
  if(c.fire)for(let i=0;i<4;i++)g.px(fire,12+i*2+(f&1),9-(i&1));
  const head=(x,y,s)=>{g.ell(bone,x,y,3.6*s,3.2*s);g.rect(bone,x-2*s,y+1,4*s,3*s);g.px(eye,x-1.4*s,y-.5);g.px(eye,x+1.2*s,y-.5);g.rect(dark,x-1.5*s,y+3*s,3*s,1)};
  head(16,7,1.1);if(c.three){head(9,9,.8);head(23,9,.8)}}
function drawWisp(g,f,c){const o=g.part(c.outer,{flat:1}),m=g.part(c.mid,{flat:1}),i=g.part(c.inner,{flat:1}),eye=g.part('#140a1e',{flat:1,noOutline:1});
  const s=f&1;g.poly(o,[[8,1+s],[12,6],[13,11],[11,16],[5,16],[3,11],[4,6]]);g.poly(m,[[8,5+s],[11,9],[11,13],[8,15],[5,13],[5,9]]);g.ell(i,8,12,2,2.5);g.px(eye,6,11);g.px(eye,10,11)}

/* ---------- 生成全部图集 ---------- */
const SPR2={};
(function(){
  const hero=(name,fn)=>{SPR2[name]={w:32,h:48,canvas:PXG.sheet(32,48,8,(g,f)=>fn(g,f%4,f>=4?'back':'front'))}};
  hero('warden',drawWarden);hero('heir',drawHeir);hero('raven',drawRaven);
  const one=(name,W,H,fn,arg)=>{SPR2[name]={w:W,h:H,canvas:PXG.sheet(W,H,4,(g,f)=>fn(g,f,arg))}};
  one('ghoul',32,40,drawGhoul,{skin:'#7e8e64',rib:'#56664a',rag:'#4a3a2a',eye:'#ff3030'});
  one('bloodghoul',32,40,drawGhoul,{skin:'#ae4046',rib:'#7a2028',rag:'#3a1010',eye:'#ffe060'});
  one('penitent',32,44,drawPenitent);
  one('knight',32,48,drawKnight,{bone:'#e4d8bc',armor:'#80828e',armorD:'#4c4e58',plume:'#c81c2c',eye:'#ff3040',blade:'#e4e8f4',shield:'#5a1a24',hiltCol:1});
  one('hellknight',32,48,drawKnight,{bone:'#8a7a6a',armor:'#4e2a1c',armorD:'#2e140c',plume:'#ff7a20',eye:'#ffb040',blade:'#ff9a48',shield:'#2a1008'});
  one('colossus',32,48,drawKnight,{bone:'#d4ccb4',armor:'#5e6474',armorD:'#363a46',plume:'#3aa8ff',eye:'#6ad8ff',blade:'#c8d8ff',shield:'#1e2a40',hiltCol:1});
  one('wraith',32,48,drawWraith);
  one('bat',32,20,drawBat,{body:'#3e2438',wing:'#5e2c4a',bone:'#2a1424',eye:'#ff3040'});
  one('gargoyle',32,20,drawBat,{body:'#80808c',wing:'#5e5e6a',bone:'#3e3e48',eye:'#ffb040',horn:1});
  one('bishop',32,52,drawBishop);
  one('lord',48,64,drawLord);
  one('fam_bat0',32,20,drawBat,{body:'#3e2438',wing:'#5e2c4a',bone:'#2a1424',eye:'#ff3040'});
  one('fam_bat1',32,20,drawBat,{body:'#6a1424',wing:'#8a1c30',bone:'#3a0a14',eye:'#ffd060'});
  one('fam_bat2',32,20,drawBat,{body:'#1a0810',wing:'#3a0a1c',bone:'#e0b040',eye:'#ffe060',horn:1});
  one('fam_hound0',32,26,drawHound,{bone:'#e0d4b8',dark:'#5a5040',eye:'#ff3040'});
  one('fam_hound1',32,26,drawHound,{bone:'#c86030',dark:'#5a1a08',eye:'#ffe060',fire:'#ffb040'});
  one('fam_hound2',32,26,drawHound,{bone:'#3a2a2a',dark:'#120808',eye:'#ff6020',fire:'#ff5020',three:1});
  one('fam_wisp0',16,18,drawWisp,{outer:'#4ab0ff',mid:'#8ad8ff',inner:'#e8f8ff'});
  one('fam_wisp1',16,18,drawWisp,{outer:'#8a40ff',mid:'#c080ff',inner:'#f4e8ff'});
  one('fam_wisp2',16,18,drawWisp,{outer:'#30d8a0',mid:'#80ffd0',inner:'#f0fff8'});
})();

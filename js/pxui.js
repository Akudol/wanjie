/* ============ 万界乱斗 · 像素界面：像素图标、像素边框 ============ */
/* 图标：把矢量图标栅格化成 16×16 的硬边像素，再放大 4 倍作为可着色的遮罩 */
function buildPixIcons(done){const keys=Object.keys(ICONS);let left=keys.length;
  for(const k of keys){const body=ICONS[k].replace(/currentColor/g,'#fff');
    const s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#fff" stroke-width="2.3" stroke-linecap="square" stroke-linejoin="miter">${body}</svg>`;
    const img=new Image();
    img.onload=()=>{const c=document.createElement('canvas');c.width=c.height=16;const g=c.getContext('2d');g.drawImage(img,0,0,16,16);
      const d=g.getImageData(0,0,16,16);for(let i=0;i<d.data.length;i+=4){const a=d.data[i+3];d.data[i]=d.data[i+1]=d.data[i+2]=255;d.data[i+3]=a>70?255:0}g.putImageData(d,0,0);
      const big=document.createElement('canvas');big.width=big.height=64;const b=big.getContext('2d');b.imageSmoothingEnabled=false;b.drawImage(c,0,0,64,64);PIXICON[k]=big.toDataURL();if(--left===0&&done)done()};
    img.onerror=()=>{if(--left===0&&done)done()};
    img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s)}}
/* 边框：24×24 的九宫格像素边框，切片 8 */
function pxFrame(fill,hi,lo,edge,gem){const c=document.createElement('canvas');c.width=c.height=24;const g=c.getContext('2d');
  const p=(x,y,col,w=1,h=1)=>{g.fillStyle=col;g.fillRect(x,y,w,h)};
  p(1,1,fill,22,22);p(0,2,edge,1,20);p(23,2,edge,1,20);p(2,0,edge,20,1);p(2,23,edge,20,1);p(1,1,edge);p(22,1,edge);p(1,22,edge);p(22,22,edge);
  p(2,1,hi,20,1);p(1,2,hi,1,20);p(2,22,lo,20,1);p(22,2,lo,1,20);
  p(3,3,hi,18,1);p(3,3,hi,1,18);p(3,20,lo,18,1);p(20,3,lo,1,18);
  if(gem)for(const[x,y]of[[2,2],[20,2],[2,20],[20,20]]){p(x,y,gem,2,2);p(x,y,'#fff8d8',1,1)}
  return`url(${c.toDataURL()})`}
function applyPixelUI(){const r=document.documentElement.style;
  r.setProperty('--fr-panel',pxFrame('#161b38','#4a5ad8','#0a0d20','#04050c','#ffd23a'));
  r.setProperty('--fr-card',pxFrame('#1c2244','#5a6ae8','#0e1228','#04050c',null));
  r.setProperty('--fr-gold',pxFrame('#2a2410','#ffd23a','#8a6a10','#0a0804','#ffffff'));
  r.setProperty('--fr-btn',pxFrame('#ff2e6e','#ff9ac0','#a0103e','#20040e',null));
  r.setProperty('--fr-ghost',pxFrame('#24305e','#6a82f0','#121a38','#04050c',null));
  r.setProperty('--fr-hud',pxFrame('#121630','#3a4aa8','#080a18','#020308',null));
  r.setProperty('--fr-tip',pxFrame('#141a36','#3af0ff','#1a6a80','#04050c',null))}
applyPixelUI();
buildPixIcons(()=>{try{if(typeof renderSlots==='function'&&P)renderSlots();if(typeof toMenu==='function'&&G.state==='menu'){}document.body.classList.add('pxicons')}catch(e){}});

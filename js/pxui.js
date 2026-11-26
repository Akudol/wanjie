/* ============ 永夜挽歌 · 像素界面：像素图标、像素边框 ============ */
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
  r.setProperty('--fr-panel',pxFrame('#170c16','#5a3c50','#0c060c','#050205','#c9a35a'));
  r.setProperty('--fr-card',pxFrame('#1c1020','#6a4a5e','#100810','#050205',null));
  r.setProperty('--fr-gold',pxFrame('#24160e','#e0b860','#6a4a20','#0a0604','#fff0b0'));
  r.setProperty('--fr-btn',pxFrame('#8c1424','#e8566a','#4a0612','#14020a',null));
  r.setProperty('--fr-ghost',pxFrame('#24182a','#6a5070','#120a14','#08040a',null));
  r.setProperty('--fr-hud',pxFrame('#120a12','#4a3444','#080408','#030103',null));
  r.setProperty('--fr-tip',pxFrame('#140a14','#c9a35a','#5a4020','#050205',null))}
applyPixelUI();
buildPixIcons(()=>{try{if(typeof renderSlots==='function'&&P)renderSlots();if(typeof toMenu==='function'&&G.state==='menu'){}document.body.classList.add('pxicons')}catch(e){}});

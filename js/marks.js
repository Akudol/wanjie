/* ============ 万界乱斗 · 地图指示 ============
   世界坐标上的据点浮标（图标 + 距离，近处显示名称）；屏幕外的同类最近据点 / 首领擂台 / 次元之门贴边显示并带方向箭头；
   小地图图标加粗描边，关键据点脉冲。 */
const MK=(()=>{const box=document.createElement('div');box.id='marks';document.body.insertBefore(box,document.getElementById('hud'));const pool=[];
  const get=i=>pool[i]||(pool[i]=(()=>{const d=document.createElement('div');d.className='mk';d.innerHTML='<div class="ic"></div><b></b><i></i>';box.appendChild(d);return d})());
  return{box,pool,get}})();
wrapHook('hudExtra',o=>dt=>{o(dt);if(!P||!RUN)return;const play=G.state==='play'&&!$('#hud').hidden;MK.box.style.display=play?'':'none';if(!play)return;
  if(!(boss&&!boss.dead))$('#edgearrow').style.opacity=0; // 次元之门改由浮标指示，旧箭头只追踪首领
  const W=innerWidth,H=innerHeight,m=48,best={},RB=$("#right").getBoundingClientRect(),KB=$("#keyhints").getBoundingClientRect(),HB=$("#hpbox").getBoundingClientRect(),inR=(r,x,y,p=20)=>r.width&&x>r.left-p&&x<r.right+p&&y>r.top-p&&y<r.bottom+p+30;
  for(const p of POIS){if(p.used&&p.type!=='portal')continue;p._d=Math.hypot(p.x-P.x,p.z-P.z);if(!best[p.type]||p._d<best[p.type]._d)best[p.type]=p}
  let n=0;
  for(const p of POIS){if(p.used&&p.type!=='portal')continue;const d=p._d;if(d<4.5)continue;
    const key=p.type==='portal'||(p.type==='boss'&&!boss),prio=key||best[p.type]===p;
    const s=toScreen(p.x,(p.y||0)+4.6,p.z),on=s.front&&s.x>m&&s.x<W-m&&s.y>m+40&&s.y<H-m-30;
    if(on&&(inR(RB,s.x,s.y)||inR(HB,s.x,s.y)))continue;if(!on&&!prio)continue;if(on&&d>110&&!key)continue;
    const el=MK.get(n++),I=POI_INFO[p.type];
    if(el._t!==p.type){el._t=p.type;el.style.setProperty('--c',I.c);el.firstChild.innerHTML=svg(I.icon)}
    let x=s.x,y=s.y,a=0;
    if(!on){let dx=s.x-W/2,dy=s.y-H/2;if(!s.front){dx=-dx;dy=-dy}a=Math.atan2(dy,dx);const rx=W/2-m,ry=H/2-m-34,k=1/Math.max(Math.abs(Math.cos(a))/rx,Math.abs(Math.sin(a))/ry);x=W/2+Math.cos(a)*k;y=H/2+Math.sin(a)*k;if(x>RB.left-30&&y<RB.bottom+16)x=RB.left-30;if(KB.width&&x<KB.right+28&&y>KB.top-24)y=KB.top-24;if(y>H-110)y=H-110;if(inR(HB,x,y,6))x=HB.right+34;const SB=$("#sysbtns").getBoundingClientRect(),TB=$("#tbtns").getBoundingClientRect();if(inR(SB,x,y,8))x=SB.right+30;if(inR(TB,x,y,8))y=TB.top-34}
    el.style.display='';el.className='mk'+(on?'':' edge')+(key?' key':'');
    const sc=on?clamp(1.2-d/140,.72,1.12):.82;el.style.transform=`translate(${x|0}px,${y|0}px) scale(${sc.toFixed(2)})`;el.style.opacity=on?clamp(1.35-d/100,.5,1).toFixed(2):.92;
    const txt=(on&&d<30?I.n+' · ':'')+Math.round(d)+'米';if(el.children[1].textContent!==txt)el.children[1].textContent=txt;
    el.lastChild.style.transform=`rotate(${a.toFixed(3)}rad)`}
  for(let i=n;i<MK.pool.length;i++)MK.pool[i].style.display='none'});
// 小地图：图标加深色描边 + 白色内描边，关键据点脉冲光圈
wrapHook('drawPoiIcon',o=>(g,p,x,y,s)=>{const key=!p.used&&(p.type==='portal'||p.type==='boss');
  if(key){const t=(performance.now()/900)%1;g.save();g.strokeStyle=POI_INFO[p.type].c;g.globalAlpha*=1-t;g.lineWidth=2;g.beginPath();g.arc(x,y,s+2+t*9,0,TAU);g.stroke();g.restore()}
  g.fillStyle='#04050c';g.beginPath();g.arc(x,y,s+2.2,0,TAU);g.fill();o(g,p,x,y,s*1.05);
  if(!p.used){g.strokeStyle='rgba(255,255,255,.85)';g.lineWidth=1;g.beginPath();g.arc(x,y,s+1.2,0,TAU);g.stroke()}});
(function(){const st=document.createElement('style');st.textContent=`
#marks{position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:3}
.mk{position:absolute;left:0;top:0;width:0;height:0;transition:opacity .2s;will-change:transform}
.mk .ic{position:absolute;left:-15px;top:-36px;width:30px;height:30px;display:grid;place-items:center;background:#10153a;color:var(--c);
  border:2px solid var(--c);box-shadow:0 0 0 2px #04050c,0 0 12px var(--c);animation:mkbob 1.6s ease-in-out infinite}
.mk .ic::after{content:'';position:absolute;left:50%;bottom:-9px;margin-left:-5px;border:5px solid transparent;border-top-color:var(--c)}
.mk .ic svg,.mk .ic .pi{width:18px;height:18px;display:block}
.mk b{position:absolute;left:-70px;top:2px;width:140px;text-align:center;font:700 12px "Noto Sans SC",sans-serif;color:#fff;letter-spacing:.04em;white-space:nowrap;
  text-shadow:1px 1px 0 #04050c,-1px -1px 0 #04050c,1px -1px 0 #04050c,-1px 1px 0 #04050c}
.mk>i{display:none}
.mk.edge .ic{top:-15px;animation:none}.mk.edge .ic::after{display:none}.mk.edge b{top:18px}
.mk.edge>i{display:block;position:absolute;left:0;top:0;width:0;height:0}
.mk.edge>i::before{content:'';position:absolute;left:20px;top:-7px;border:7px solid transparent;border-left:10px solid var(--c);filter:drop-shadow(0 0 4px var(--c))}
.mk.key .ic{width:36px;height:36px;left:-18px;top:-42px;animation:mkbob 1.6s ease-in-out infinite,mkglow 1s ease-in-out infinite alternate}
.mk.key.edge .ic{top:-18px}
.mk.key b{color:var(--c)}
@keyframes mkbob{50%{transform:translateY(-4px)}}
@keyframes mkglow{to{box-shadow:0 0 0 2px #04050c,0 0 22px var(--c),0 0 40px var(--c)}}
@media (max-width:700px){.mk .ic{transform:scale(.85)}.mk b{font-size:11px}}`;document.head.appendChild(st)})();

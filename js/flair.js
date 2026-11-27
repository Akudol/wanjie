/* ============ 万界乱斗 · 角色台词气泡与天赋 / 大招特效 ============
   · 角色说的话（打破第四面墙、分院帽、大招喊招）显示在角色头顶的对话气泡里，而不是右侧提示栏
   · 大招：角色专属色的冲天光柱、三重冲击环、螺旋上升的粒子、全屏染色闪光 + 头顶喊出招式名
   · 天赋触发（在角色身上冒出的提示字）：角色色光环 + 粒子迸发
   · 常驻：脚下随角色色彩缓缓升起的光点 */
const SPEAK_TITLES=new Set(['第四面墙','佣兵']);
const SAY={el:null,t:0};
function say(text,dur=3.2){if(!SAY.el){SAY.el=document.createElement('div');SAY.el.id='sayb';SAY.el.innerHTML='<span></span>';document.body.insertBefore(SAY.el,$('#hud'))}
  const sp=SAY.el.firstChild;sp.textContent=text;SAY.t=dur;SAY.el.classList.remove('pop');void SAY.el.offsetWidth;SAY.el.classList.add('pop');SAY.el.style.display='block'}
wrapHook('toast',o=>(t,d,icon)=>{if(SPEAK_TITLES.has(t)&&d){say(d);return}if(t&&t.startsWith('分院之帽')){const m=t.match(/[“"](.+)[”"]/);say((m?m[1]+' ':'')+(d||''));return}o(t,d,icon)});
wrapHook('hudExtra',o=>dt=>{o(dt);if(!SAY.el)return;if(SAY.t>0&&P&&G.state!=='menu'&&G.state!=='over'){SAY.t-=dt;_v.set(P.x,P.y+3.35,P.z).project(camera);
    SAY.el.style.transform=`translate(${((_v.x*.5+.5)*innerWidth)|0}px,${((-_v.y*.5+.5)*innerHeight)|0}px)`;SAY.el.style.opacity=Math.min(1,SAY.t*3)}else SAY.el.style.display='none'});
/* ---------- 光柱池 ---------- */
const pillars=[];for(let i=0;i<3;i++){const m=new THREE.Mesh(new THREE.CylinderGeometry(1,1,1,16,1,true),new THREE.MeshBasicMaterial({map:beamTex,color:0xffffff,transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));
  m.visible=false;m.frustumCulled=false;scene.add(m);pillars.push({m,life:0,max:1,r:1})}
function pillar(x,y,z,col,r=1.6,h=30,life=1){const p=pillars.find(p=>p.life<=0)||pillars[0];p.life=p.max=life;p.r=r;p.m.visible=true;p.m.material.color.set(col);p.m.scale.set(r,h,r);p.m.position.set(x,y+h/2,z)}
const accOf=()=>{const H=HUNTERS[P.hunter];return H&&H.acc!=null?H.acc:0xffd23a};
const elOf=()=>{const W=WEAPONS[HUNTERS[P.hunter].w];return(typeof ECOL!=='undefined'&&W&&ECOL[W.el])||0xffffff};
/* ---------- 大招 ---------- */
function heroUltFx(){const c=accOf(),c2=elOf(),x=P.x,y=P.y,z=P.z;
  pillar(x,y,z,c,1.3,34,1.1);
  fxRing(x,z,3,0xffffff);later(.08,()=>fxRing(P.x,P.z,7,c));later(.18,()=>fxRing(P.x,P.z,11,c2));later(.3,()=>fxRing(P.x,P.z,15,c));
  for(let i=0;i<40;i++){const a=i/40*TAU*3,r=.6+i*.05;parts.push({x:x+Math.sin(a)*r,y:y+.2+i*.06,z:z+Math.cos(a)*r,vx:Math.sin(a+1.6)*3,vy:rand(4,8),vz:Math.cos(a+1.6)*3,life:rand(.6,1),max:1,c:vcol(i%3?c:c2)})}
  spark(x,y+1.2,z,c,24,10,.7,7);spark(x,y+1.2,z,0xffffff,12,6,.5,5);
  const f=$('#ultflash');f.style.setProperty('--c','#'+c.toString(16).padStart(6,'0'));f.classList.remove('on');void f.offsetWidth;f.classList.add('on');
  const U=HUNTERS[P.hunter].ult;if(U&&U.n)say('「'+U.n+'」！',2)}
wrapHook('castUlt',o=>()=>{const before=P?P.ult:0,st=G.state;o();if(P&&st==='play'&&P.ult<before-50)heroUltFx()});
/* ---------- 天赋触发：角色身上冒字时 ---------- */
let talT=0;
wrapHook('showReact',o=>(e,txt)=>{o(e,txt);if(!P||!e||Math.abs(e.x-P.x)>.05||Math.abs(e.z-P.z)>.05||talT>0)return;talT=.25;const c=accOf();
  fxRing(P.x,P.z,2.6,c);spark(P.x,P.y+1.4,P.z,c,14,6,.55,5);spark(P.x,P.y+1.4,P.z,0xffffff,5,4,.4,4);pillar(P.x,P.y,P.z,c,1,8,.45)});
/* ---------- 常驻：脚下光点 + 光柱动画 ---------- */
wrapHook('relicUpdate',o=>dt=>{o(dt);talT-=dt;
  if(parts.length<650&&Math.random()<.35){const a=rand(0,TAU),r=rand(.3,.8);parts.push({x:P.x+Math.sin(a)*r,y:P.y+.1,z:P.z+Math.cos(a)*r,vx:0,vy:rand(2.5,4.5),vz:0,life:.5,max:.5,c:vcol(accOf())})}
  for(const p of pillars){if(p.life<=0)continue;p.life-=dt;const k=Math.max(0,p.life/p.max);p.m.material.opacity=k*.32;const s=p.r*(1+(1-k)*.6);p.m.scale.x=p.m.scale.z=s;if(p.life<=0)p.m.visible=false}});
(function(){document.body.insertAdjacentHTML('beforeend','<div id="ultflash"></div>');const st=document.createElement('style');st.textContent=`
#sayb{position:fixed;left:0;top:0;display:none;pointer-events:none;z-index:4;will-change:transform}
#sayb span{position:absolute;left:0;bottom:12px;transform:translateX(-50%);display:block;width:max-content;max-width:min(300px,70vw);padding:8px 12px;background:#fffdf4;color:#10153a;
  font:700 14px/1.45 "Noto Sans SC",sans-serif;text-align:center;box-shadow:0 0 0 3px #10153a,4px 4px 0 3px #ff2e6e}
#sayb span::after{content:'';position:absolute;left:50%;bottom:-13px;margin-left:-8px;border:8px solid transparent;border-top:9px solid #10153a}
#sayb span::before{content:'';position:absolute;left:50%;bottom:-8px;margin-left:-5px;border:5px solid transparent;border-top:6px solid #fffdf4;z-index:1}
#sayb.pop span{animation:saypop .28s cubic-bezier(.2,1.6,.4,1)}@keyframes saypop{from{transform:translateX(-50%) scale(.3) translateY(14px);opacity:0}}
#ultflash{position:fixed;inset:0;pointer-events:none;z-index:2;opacity:0;background:radial-gradient(circle at 50% 55%,transparent 35%,color-mix(in srgb,var(--c,#fff) 40%,transparent) 100%);mix-blend-mode:screen}
#ultflash.on{animation:ultfl .7s ease-out}@keyframes ultfl{0%{opacity:1}100%{opacity:0}}`;document.head.appendChild(st)})();
// 离开战斗（回菜单、结算）时收起头顶气泡和地图浮标
wrapHook('showHud',o=>on=>{o(on);if(!on){if(typeof MK!=='undefined')MK.box.style.display='none';if(SAY.el){SAY.el.style.display='none';SAY.t=0}}});

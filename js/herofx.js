/* ============ 万界乱斗 · 人气角色专属大招表现 ============
   在通用大招特效之上，给 10 位角色加专属演出（只是视觉，不改数值）：
   金焰武者（金色觉醒气场）· 替身使者（身后浮现替身 + 连打）· 一拳秃头（认真一拳 + 屏幕裂纹）· 蓝衣剑魔 / 红衣魔狩（满屏次元斩）
   蒙眼最强（紫色领域）· 刺猬佣兵（极限连斩）· 橡胶船长（连环拳）· 电锯少年（血雾）· 写轮上忍（雷光一闪） */
const HX={t:0,id:null,k:0};
const ovl=(()=>{const d=document.createElement('div');d.id='fxov';document.body.insertBefore(d,$('#hud'));return d})();
function ovFlash(html,ms=900,cls=''){const el=document.createElement('div');el.className='fxl '+cls;el.innerHTML=html;ovl.appendChild(el);setTimeout(()=>el.remove(),ms)}
function screenSlashes(col,n=12){for(let i=0;i<n;i++)setTimeout(()=>{const a=rand(-70,70),y=rand(10,90);ovFlash(`<i style="--a:${a}deg;top:${y}%;--c:${col}"></i>`,600,'slash')},i*45);
  setTimeout(()=>{G.flash=.5;AU.sfx('shatter')},n*45+120)}
function screenCrack(){const cx=50,cy=52;let p='';for(let i=0;i<11;i++){let a=i/11*TAU+rand(-.2,.2),x=cx,y=cy,pts=[[x,y]];for(let k=0;k<5;k++){const r=rand(5,11);a+=rand(-.35,.35);x+=Math.cos(a)*r;y+=Math.sin(a)*r*1.3;pts.push([x,y])}
    p+=`<polyline points="${pts.map(q=>q.join(',')).join(' ')}"/>`}
  ovFlash(`<svg viewBox="0 0 100 100" preserveAspectRatio="none">${p}</svg>`,1400,'crack')}
const voidM=new THREE.Mesh(new THREE.SphereGeometry(1,24,16),new THREE.MeshBasicMaterial({color:0x9a5aff,transparent:true,opacity:.35,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));
voidM.visible=false;scene.add(voidM);
const HFX={
  fighter(){HX.t=8;say('觉醒吧！',2);pillar(P.x,P.y,P.z,0xffd23a,1.8,40,1.6)},
  standuser(){HX.t=3.5;say('无限连打！',2)},
  bald(){say('认真的一拳。',2.2);G.flash=1;G.shake=1.2;screenCrack();for(const[r,d]of[[6,0],[14,.1],[24,.22]])later(d,()=>fxRing(P.x,P.z,r,0xffffff));spark(P.x,P.y+1.5,P.z,0xffffff,30,14,.7,6)},
  vergil(){say('万象皆斩。',2);screenSlashes('#9ab8ff',14)},
  dante(){say('派对开始！',2);screenSlashes('#ff4a4a',12)},
  blindfold(){say('领域·无限',2);HX.t=1.6;voidM.visible=true;voidM.position.set(P.x,P.y+1,P.z)},
  cloud(){say('极限连斩！',2);for(let i=0;i<16;i++)later(i*.075,()=>{const a=rand(0,TAU),R=rand(2.5,5);arcFx(P.x+Math.sin(a)*R*.4,P.y+1,P.z+Math.cos(a)*R*.4,a,R,1.6,i%2?0x9ad8ff:0xffffff);spark(P.x,P.y+1.2,P.z,0x9ad8ff,3,7,.3,3)});
    later(1.3,()=>{fxRing(P.x,P.z,9,0x9ad8ff);G.shake=.6})},
  rubber(){say('连环拳！',2);HX.t=1.6},
  sawboy(){say('开锯！',2);spark(P.x,P.y+1.4,P.z,0xff2040,50,12,.8,7);ovFlash('',700,'blood')},
  copyninja(){say('雷光一闪',2);const t=nearest(P.x,P.z,16);const tx=t?t.x:P.x+Math.sin(P.face)*10,tz=t?t.z:P.z+Math.cos(P.face)*10;
    for(let i=0;i<=20;i++){const k=i/20;spark(P.x+(tx-P.x)*k+rand(-.3,.3),P.y+1.2+rand(-.3,.3),P.z+(tz-P.z)*k+rand(-.3,.3),i%2?0x9ae8ff:0xffffff,2,2,.4,1.5)}
    fxRing(tx,tz,3.5,0x9ae8ff);strike(tx,tz,0,0,false)},
};
wrapHook('castUlt',o=>()=>{const before=P?P.ult:0,st=G.state;o();if(P&&st==='play'&&P.ult<before-50&&HFX[P.hunter]){HX.id=P.hunter;HFX[P.hunter]()}});
wrapHook('relicUpdate',o=>dt=>{o(dt);if(HX.t<=0)return;HX.t-=dt;const id=HX.id,m=typeof PART_MUL!=='undefined'?PART_MUL:1;
  if(id==='fighter'){for(let i=0;i<3*m;i++){const a=rand(0,TAU),r=rand(.4,1.1);parts.push({x:P.x+Math.sin(a)*r,y:P.y+rand(0,.6),z:P.z+Math.cos(a)*r,vx:0,vy:rand(5,9),vz:0,life:.45,max:.45,c:vcol(i%2?0xffd23a:0xfff2a0)})}
    if(Math.random()<.25*m)spark(P.x+rand(-.8,.8),P.y+rand(.5,2.2),P.z+rand(-.8,.8),0x9ae8ff,2,5,.15,1);HX.k-=dt;if(HX.k<=0){HX.k=.5;fxRing(P.x,P.z,1.8,0xffd23a)}}
  else if(id==='standuser'){HX.k-=dt;if(HX.k<=0){HX.k=.045;const f=P.face,d=rand(1.3,2.2),s=rand(-.8,.8);spark(P.x+Math.sin(f)*d+Math.cos(f)*s,P.y+rand(.9,1.9),P.z+Math.cos(f)*d-Math.sin(f)*s,0xffc8ff,3,4,.25,2)}}
  else if(id==='blindfold'){const k=1-HX.t/1.6,R=k<.45?k/.45*12:12*(1-(k-.45)/.55);voidM.scale.setScalar(Math.max(.01,R));voidM.material.opacity=.35*(1-k*.6);voidM.position.set(P.x,P.y+1,P.z);
    for(let i=0;i<4*m;i++){const a=rand(0,TAU),r=rand(6,11);parts.push({x:P.x+Math.sin(a)*r,y:P.y+rand(.5,3),z:P.z+Math.cos(a)*r,vx:-Math.sin(a)*r*2,vy:0,vz:-Math.cos(a)*r*2,life:.45,max:.45,c:vcol(i%2?0xb080ff:0x6a3aff)})}
    if(HX.t<=0){voidM.visible=false;fxRing(P.x,P.z,12,0xb080ff);G.flash=.4}}
  else if(id==='rubber'){HX.k-=dt;if(HX.k<=0){HX.k=.05;const a=P.face+rand(-.5,.5),len=rand(4,8);for(let i=0;i<6;i++){const t=len*i/6;parts.push({x:P.x+Math.sin(a)*t,y:P.y+1.2,z:P.z+Math.cos(a)*t,vx:0,vy:0,vz:0,life:.12,max:.12,c:vcol(0xffd8b0)})}
    spark(P.x+Math.sin(a)*len,P.y+1.2,P.z+Math.cos(a)*len,0xffffff,3,5,.25,2)}}});
// 金焰觉醒期间角色发金光；替身浮现在身后
wrapHook('heroTint',o=>()=>{if(HX.t>0&&HX.id==='fighter'&&P&&P.hunter==='fighter')return new THREE.Color(1.7,1.45,.6);return o()});
wrapHook('homageHeroAdds',o=>kind=>{o(kind);if(!(HX.t>0&&HX.id==='standuser'&&P&&P.hunter==='standuser'))return;const f=P.face,b=1.1;
  kind.add(P.x-Math.sin(f)*b,P.y+.55+Math.sin(G.rt*3)*.12,P.z-Math.cos(f)*b,0,1.28,0,0,new THREE.Color(1.1,.6,1.6),Math.floor(G.rt*14)%4,false,false)});
// 没有 homageHeroAdds 时也要能显示替身
if(typeof homageHeroAdds!=='function')window.homageHeroAdds=function(kind){};
(function(){const st=document.createElement('style');st.textContent=`
#fxov{position:fixed;inset:0;pointer-events:none;z-index:3;overflow:hidden}
#fxov .fxl{position:absolute;inset:0}
#fxov .slash i{position:absolute;left:-10%;width:120%;height:3px;background:linear-gradient(90deg,transparent,var(--c) 20%,#fff 50%,var(--c) 80%,transparent);box-shadow:0 0 12px var(--c),0 0 30px var(--c);transform:rotate(var(--a)) scaleX(0);animation:slsh .55s ease-out forwards}
@keyframes slsh{0%{transform:rotate(var(--a)) scaleX(0);opacity:1}35%{transform:rotate(var(--a)) scaleX(1);opacity:1}100%{transform:rotate(var(--a)) scaleX(1);opacity:0}}
#fxov .crack svg{width:100%;height:100%;fill:none;stroke:#fff;stroke-width:.35;filter:drop-shadow(0 0 1px #000) drop-shadow(0 0 3px rgba(150,200,255,.9));animation:crk 1.4s ease-in forwards}
@keyframes crk{0%,60%{opacity:1}100%{opacity:0}}
#fxov .blood{background:radial-gradient(ellipse at center,transparent 35%,rgba(200,10,30,.55) 100%);animation:bld .7s ease-out forwards}@keyframes bld{to{opacity:0}}`;document.head.appendChild(st)})();

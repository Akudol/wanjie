/* ============ 万界乱斗 · 武器特效 ============
   按元素 / 武器着色：投射物拖尾、命中火花、斩击双层光弧与刃屑、光束沿线粒子、落雷冲击环、冰环冰晶、击杀爆散。 */
const ECOL={phys:0xfff0c8,fire:0xff7a20,frost:0x7ae8ff,volt:0xb8a8ff,dark:0xc060ff,blood:0xff3050};
const SRCCOL={kiblast:0x5ad8ff,rebellion:0xff3a3a,yamato:0x6a8aff,hfblade:0x7af0ff,katanas:0xff5060,truthgun:0xffd860,spellbolt:0xffe070,bluered:0x8a6aff,
  positron:0xff9a40,oathsword:0xffe8a0,waterblade:0x7ae0ff,kagune:0xff2040,chainsaw:0xff4050,gauntlet:0xffd040,bigblade:0x9ad8ff,dagger:0xe8f0ff,scythe:0xb080ff,
  falconrapier:0xf0f4ff,dragonslayer:0xd8d8e0,objection:0xffe070,plainpunch:0xfff0a0,stretch:0xffd8b0,prosblade:0xff5050,kunai:0xb8d8ff,twinblades:0xe8f0ff,gunkata:0xfff0c0,handgun:0xfff0c0};
const _vc={};const vcol=h=>_vc[h]||(_vc[h]=new THREE.Color(h));
function spark(x,y,z,col,n=4,sp=4,life=.45,up=3){if(parts.length>760)return;const c=vcol(col);for(let i=0;i<n;i++){const a=Math.random()*TAU,u=rand(.3,1);parts.push({x,y,z,vx:Math.sin(a)*sp*u,vy:rand(up*.3,up),vz:Math.cos(a)*sp*u,life:rand(life*.6,life),max:life,c})}}
const colOf=(src,el)=>SRCCOL[src]||ECOL[el]||0xffffff;
// 投射物拖尾 + 冰环冰晶 + 光环火星
wrapHook('relicUpdate',o=>dt=>{o(dt);
  for(const p of proj){if(parts.length>720)break;if(Math.random()<.55*(typeof PART_MUL!=="undefined"?PART_MUL:1)){const c=vcol(colOf(p.src,p.el));parts.push({x:p.x+rand(-.08,.08),y:(p.y||1)+rand(-.08,.08),z:p.z+rand(-.08,.08),vx:-(p.vx||0)*.05,vy:rand(.2,.9),vz:-(p.vz||0)*.05,life:.28,max:.28,c})}}
  for(const f of frostRings){if(f.delay>0||parts.length>700)continue;for(let i=0;i<2;i++){const a=Math.random()*TAU;parts.push({x:f.x+Math.sin(a)*f.r,y:hAt(f.x,f.z)+.3,z:f.z+Math.cos(a)*f.r,vx:0,vy:rand(1,3),vz:0,life:.4,max:.4,c:vcol(0xbff4ff)})}}
  const aw=getW('aura');if(aw&&Math.random()<.5){const R=2.6*aw.area*S.area*(aw.evo?1.8:1),a=Math.random()*TAU;spark(P.x+Math.sin(a)*R,hAt(P.x,P.z)+.2,P.z+Math.cos(a)*R,aw.evo?0xff3a10:0xffb040,1,.5,.6,2.5)}
  for(const[x,z]of orbs)if(Math.random()<.6)spark(x,P.y+1,z,0xff3050,1,.4,.3,.6)});
// 命中火花（按元素），大伤害额外爆闪
wrapHook('relicOnHit',o=>(e,op,d)=>{o(e,op,d);if(op.dot||!op.src)return;const c=colOf(op.src,op.el);if(Math.random()<.6)spark(e.x,e.y+1.1*e.s,e.z,c,d>60?7:3,d>60?7:4,.4,3)});
// 击杀爆散
wrapHook('relicOnKill',o=>(e,op,ov)=>{o(e,op,ov);if(op&&op.src)spark(e.x,e.y+1,e.z,colOf(op.src,op.el),6,6,.5,5)});
// 斩击：外层光晕 + 沿弧线的刃屑
wrapHook('arcFx',o=>(x,y,z,a,R,arc,col)=>{o(x,y,z,a,R,arc,col);o(x,y-.05,z,a,R*1.14,arc,new THREE.Color(col).multiplyScalar(.45).getHex());
  const n=Math.min(10,3+Math.round(arc*2));for(let i=0;i<n;i++){const t=a-arc/2+arc*(i+.5)/n;spark(x+Math.sin(t)*R,y,z+Math.cos(t)*R,col,1,1.5,.35,1.5)}});
// 光束 / 直刺：沿线粒子
wrapHook('lineHit',o=>(x,z,a,len,w,dmg,el,src,col)=>{o(x,z,a,len,w,dmg,el,src,col);const n=Math.min(14,4+(len|0));for(let i=0;i<n;i++){const t=len*Math.random();spark(x+Math.sin(a)*t,hAt(x,z)+1+rand(-.2,.2),z+Math.cos(a)*t,col,1,1+w,.35,1.5)}});
wrapHook('fireBeam',o=>(a,dmg,len,w)=>{o(a,dmg,len,w);for(let i=0;i<8;i++){const t=len*Math.random();spark(P.x+Math.sin(a)*t,P.y+1,P.z+Math.cos(a)*t,0xfff0c0,1,1.2,.3,1.2)}});
// 落雷：地面冲击环 + 竖直电光
wrapHook('strike',o=>(x,z,dmg,R,evo)=>{o(x,z,dmg,R,evo);fxRing(x,z,R*1.1,0xb8a8ff);for(let i=0;i<8;i++)parts.push({x:x+rand(-.3,.3),y:hAt(x,z)+rand(.5,5),z:z+rand(-.3,.3),vx:rand(-2,2),vy:rand(-1,4),vz:rand(-2,2),life:.35,max:.35,c:vcol(0xe8e0ff)})});
// 元素反应：彩色冲击环
wrapHook('showReact',o=>(e,txt)=>{o(e,txt);const c={'碎冰':0x9ae8ff,'融蚀':0xff8a30,'沸血':0xff3050,'黑雷':0xa060ff,'蒸腾':0xd0f0ff}[txt];if(c&&e.x!=null){fxRing(e.x,e.z,2.2,c);spark(e.x,e.y+1.2,e.z,c,10,7,.5,5)}});
// 投射物本体：用元素色的发光外壳（替换默认的白色外壳）
(function(){const glow=(k,col,s)=>{if(!K[k])return;const P=K[k].parts.find(p=>p.m.material&&p.m.material.blending===THREE.AdditiveBlending);if(P){P.m.material.color.set(col);P.m.material.opacity=Math.min(1,(P.m.material.opacity||.4)*1.5)}};
  glow('dagger',0xcfe4ff);glow('sonic',0xff3050);glow('wisp',0xb060ff);glow('raven',0x7a50ff);glow('orbB',0x3ab8ff);glow('ebolt',0xff2040);glow('skull',0xff1030);glow('tbullet',0xffb030)})();

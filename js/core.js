/* ============ 万界乱斗 · 渲染核心 / 音频 / 存档 ============ */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const rand=(a,b)=>a+Math.random()*(b-a),TAU=Math.PI*2,clamp=(v,a,b)=>v<a?a:v>b?b:v;
const pick=a=>a[(Math.random()*a.length)|0];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=t=>{t=Math.max(0,Math.floor(t));return String(Math.floor(t/60)).padStart(2,'0')+':'+String(t%60).padStart(2,'0')};

/* ---------- 存档与设置 ---------- */
// 本地账号：每个账号一份独立存档；未登录（游客）沿用旧存档
const ACC_CUR=(()=>{try{return localStorage.getItem('wanjie-cur')||''}catch(e){return''}})();
const SAVE_KEY=ACC_CUR?'wanjie-save-'+ACC_CUR:'nocturne-save-v2';
const SAVE=(()=>{let s=null;try{s=JSON.parse(localStorage.getItem(SAVE_KEY)||'null')}catch(e){}
  s=s||{};s.settings=Object.assign({pix:3,cam:'tp',sens:.45,invY:false,vol:.7,music:.5,sfx:.8,shake:true,nums:true,shadows:true,hidpi:true,fps:false},s.settings||{});
  s.codex=Object.assign({w:[],r:[],f:[],e:[]},s.codex||{});s.rec=s.rec||{};s.tot=Object.assign({runs:0,kills:0,clears:0,gold:0,time:0},s.tot||{});s.ach=s.ach||[];
  return s})();
// 撤销 2 倍精度时，把当时被自动改成「细」的像素颗粒恢复为「中」（只执行一次）
if(SAVE.settings.pixv===2){if(SAVE.settings.pix===2)SAVE.settings.pix=3;delete SAVE.settings.pixv}
function persist(){try{localStorage.setItem(SAVE_KEY,JSON.stringify(SAVE))}catch(e){}}
function discover(cat,id){if(!SAVE.codex[cat].includes(id)){SAVE.codex[cat].push(id);persist()}}

/* ---------- 渲染器 ---------- */
const canvas=$('#c');
const renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});
renderer.outputEncoding=THREE.sRGBEncoding;
renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.3;
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
const scene=new THREE.Scene();
scene.background=new THREE.Color(0x0c0712);scene.fog=new THREE.FogExp2(0x0c0712,.03);
const camera=new THREE.PerspectiveCamera(46,1,.5,240);
const camOff=new THREE.Vector3(0,20,15);
function applyQuality(){renderer.setPixelRatio(SAVE.settings.hidpi?Math.min(devicePixelRatio,1.75):1);
  renderer.shadowMap.enabled=SAVE.settings.shadows;scene.traverse(o=>{if(o.material){const ms=Array.isArray(o.material)?o.material:[o.material];ms.forEach(m=>m.needsUpdate=true)}});resize()}
function resize(){const w=innerWidth,h=innerHeight;renderer.setSize(w,h,false);camera.aspect=w/h;
  if(h>w)camOff.set(0,28,20);else camOff.set(0,20,15);camera.updateProjectionMatrix()}
addEventListener('resize',resize);
/* ---------- 像素化后处理：低分辨率渲染 → 最近邻放大 + 色阶量化 + 拜耳抖动 ---------- */
const PIXPOST={rt:null};
const postMat=new THREE.ShaderMaterial({uniforms:{tDiffuse:{value:null},res:{value:new THREE.Vector2(1,1)},levels:{value:22},desat:{value:0},slow:{value:0}},depthTest:false,depthWrite:false,
  vertexShader:"varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}",
  fragmentShader:"uniform sampler2D tDiffuse;uniform vec2 res;uniform float levels,desat,slow;varying vec2 vUv;"+
    "float b2(vec2 a){a=floor(a);return fract(dot(a,vec2(.5,a.y*.75)));}float bayer4(vec2 a){return b2(.5*a)*.25+b2(a);}"+
    "void main(){vec3 c=texture2D(tDiffuse,vUv).rgb;float lu=dot(c,vec3(.299,.587,.114));c=mix(c,vec3(lu)*vec3(.92,.96,1.08),desat*.9);c=mix(c,c*vec3(.55,1.15,1.05)+vec3(0.,.04,.03),slow*.7);float d=bayer4(floor(vUv*res))-.5;c=floor(c*levels+d*.9+.5)/levels;gl_FragColor=vec4(c,1.);}"});
const postScene=new THREE.Scene(),postCam=new THREE.OrthographicCamera(-1,1,1,-1,0,1);postScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2),postMat));
function renderFrame(){const s=SAVE.settings.pix||1;
  if(s<=1){renderer.setRenderTarget(null);renderer.render(scene,camera);return}
  const w=Math.max(1,Math.floor(innerWidth/s)),h=Math.max(1,Math.floor(innerHeight/s));
  if(!PIXPOST.rt||PIXPOST.rt.width!==w||PIXPOST.rt.height!==h){if(PIXPOST.rt)PIXPOST.rt.dispose();
    PIXPOST.rt=new THREE.WebGLRenderTarget(w,h,{minFilter:THREE.NearestFilter,magFilter:THREE.NearestFilter});PIXPOST.rt.texture.encoding=THREE.sRGBEncoding;
    postMat.uniforms.tDiffuse.value=PIXPOST.rt.texture;postMat.uniforms.res.value.set(w,h)}
  renderer.setRenderTarget(PIXPOST.rt);renderer.render(scene,camera);renderer.setRenderTarget(null);renderer.render(postScene,postCam)}

const hemi=new THREE.HemisphereLight(0x6a58a0,0x140810,.4);scene.add(hemi);
const moon=new THREE.DirectionalLight(0xb8a0ff,.6);moon.castShadow=true;moon.shadow.mapSize.set(2048,2048);
{const c=moon.shadow.camera;c.left=-32;c.right=32;c.top=32;c.bottom=-32;c.near=1;c.far=90}
moon.shadow.bias=-.0006;scene.add(moon,moon.target);
const lantern=new THREE.PointLight(0xffa050,2.8,22,1.3);scene.add(lantern);
const flashLight=new THREE.PointLight(0xd0c0ff,0,34,1.4);scene.add(flashLight);
const bossLight=new THREE.PointLight(0xff2030,0,24,1.5);scene.add(bossLight);

/* ---------- 纹理 ---------- */
function cv(w,h,f){const c=document.createElement('canvas');c.width=c.height=w;c.height=h;f(c.getContext('2d'),w,h);return c}
function groundCanvas(G){return cv(64,64,(g,W)=>{
  const col=(l,s=G.sat,h)=>`hsl(${h==null?rand(G.hue[0],G.hue[1]):h},${s}%,${l}%)`,L0=G.light[0],L1=G.light[1];
  const px=(x,y,c)=>{g.fillStyle=c;g.fillRect(((x%W)+W)%W,((y%W)+W)%W,1,1)};
  g.fillStyle=col(L0*.55);g.fillRect(0,0,W,W);
  const tile=(x0,y0,w,h)=>{const L=rand(L0,L1),hu=rand(G.hue[0],G.hue[1]);g.fillStyle=col(L,G.sat,hu);g.fillRect(x0+1,y0+1,w-2,h-2);
    for(let i=1;i<w-1;i++){px(x0+i,y0+1,col(L+6,G.sat,hu));px(x0+i,y0+h-2,col(L-5,G.sat,hu))}for(let j=1;j<h-1;j++){px(x0+1,y0+j,col(L+4,G.sat,hu));px(x0+w-2,y0+j,col(L-4,G.sat,hu))}
    for(let k=0;k<w*h/18;k++)px(x0+1+((Math.random()*(w-2))|0),y0+1+((Math.random()*(h-2))|0),col(L+rand(-4,4),G.sat,hu))};
  if(G.style==='checker'){for(let i=0;i<8;i++)for(let j=0;j<8;j++){const L=(i+j)%2?L0*.85:L1*1.1;g.fillStyle=col(L);g.fillRect(i*8,j*8,8,8);for(let k=0;k<8;k++){px(i*8+k,j*8,col(L+5));px(i*8,j*8+k,col(L+3))}}}
  else if(G.style==='rock'){const seeds=[];for(let i=0;i<18;i++)seeds.push([Math.random()*W,Math.random()*W,rand(L0,L1)]);
    for(let y=0;y<W;y++)for(let x=0;x<W;x++){let b=1e9,b2=1e9,bs=null;for(const s of seeds){let dx=Math.abs(x-s[0]),dy=Math.abs(y-s[1]);dx=Math.min(dx,W-dx);dy=Math.min(dy,W-dy);const d=dx*dx+dy*dy;if(d<b){b2=b;b=d;bs=s}else if(d<b2)b2=d}
      px(x,y,Math.sqrt(b2)-Math.sqrt(b)<1.2?col(L0*.5):col(bs[2]+(Math.random()<.15?rand(-3,3):0)))}}
  else{for(let r=0;r<4;r++)for(let c2=0;c2<3;c2++)tile(c2*32-(r%2)*16,r*16,32,16)}
  for(let i=0;i<5;i++){let x=(Math.random()*W)|0,y=(Math.random()*W)|0;for(let k=0;k<7;k++){px(x,y,col(L0*.4));x+=Math.random()<.5?1:-1;y+=Math.random()<.6?1:0}}
  for(let i=0;i<14;i++){const x=(Math.random()*W)|0,y=(Math.random()*W)|0;g.fillStyle=`rgba(${G.moss},.55)`;g.fillRect(x,y,1+(Math.random()*2|0),1)}
  for(let i=0;i<3;i++){const x=(Math.random()*W)|0,y=(Math.random()*W)|0;g.fillStyle=`rgba(${G.stain},.5)`;g.fillRect(x,y,2,2);g.fillRect(x+1,y+2,2,1)}
})}
const glowTex=new THREE.CanvasTexture(cv(64,64,g=>{const gr=g.createRadialGradient(32,32,0,32,32,32);gr.addColorStop(0,'rgba(255,255,255,1)');gr.addColorStop(.3,'rgba(255,255,255,.5)');gr.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gr;g.fillRect(0,0,64,64)}));
const ringTex=new THREE.CanvasTexture(cv(256,256,g=>{
  const gr=g.createRadialGradient(128,128,60,128,128,128);gr.addColorStop(0,'rgba(255,255,255,0)');gr.addColorStop(.7,'rgba(255,255,255,.22)');gr.addColorStop(.93,'rgba(255,255,255,.95)');gr.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gr;g.fillRect(0,0,256,256);
  g.strokeStyle='rgba(255,255,255,.8)';g.lineWidth=2;g.beginPath();g.arc(128,128,96,0,TAU);g.stroke();
  g.font='bold 18px serif';g.fillStyle='rgba(255,255,255,.9)';g.textAlign='center';
  const runes='✝ᚱᛟᚾᛞ✝ᛉᛗᚦ✝ᛃᛇᛒ';for(let i=0;i<runes.length;i++){g.save();g.translate(128,128);g.rotate(i/runes.length*TAU);g.fillText(runes[i],0,-104);g.restore()}}));
const softRingTex=new THREE.CanvasTexture(cv(128,128,g=>{const gr=g.createRadialGradient(64,64,40,64,64,64);gr.addColorStop(0,'rgba(255,255,255,0)');gr.addColorStop(.8,'rgba(255,255,255,.9)');gr.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gr;g.fillRect(0,0,128,128)}));
const mistTex=new THREE.CanvasTexture(cv(128,128,g=>{for(let i=0;i<14;i++){const x=rand(30,98),y=rand(30,98),r=rand(18,40);const gr=g.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,'rgba(255,255,255,.35)');gr.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gr;g.fillRect(0,0,128,128)}}));
const beamTex=new THREE.CanvasTexture(cv(64,256,(g,w,h)=>{const gr=g.createLinearGradient(0,h,0,0);gr.addColorStop(0,'rgba(255,255,255,.9)');gr.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gr;g.fillRect(0,0,64,256);
  const gx=g.createLinearGradient(0,0,64,0);gx.addColorStop(0,'rgba(0,0,0,1)');gx.addColorStop(.5,'rgba(0,0,0,0)');gx.addColorStop(1,'rgba(0,0,0,1)');g.globalCompositeOperation='destination-out';g.fillStyle=gx;g.fillRect(0,0,64,256)}));

/* ---------- 实例化渲染 ---------- */
const _m=new THREE.Matrix4(),_b=new THREE.Matrix4(),_q=new THREE.Quaternion(),_p=new THREE.Vector3(),_s=new THREE.Vector3(),UP=new THREE.Vector3(0,1,0),_e=new THREE.Euler();
function L(x=0,y=0,z=0,rx=0,ry=0,rz=0,sx=1,sy=sx,sz=sx){return new THREE.Matrix4().compose(new THREE.Vector3(x,y,z),new THREE.Quaternion().setFromEuler(new THREE.Euler(rx,ry,rz)),new THREE.Vector3(sx,sy,sz))}
function setL(o,x,y,z,rx,ry,rz,sx=1,sy=sx,sz=sx){_e.set(rx,ry,rz);_q.setFromEuler(_e);_p.set(x,y,z);_s.set(sx,sy,sz);return o.compose(_p,_q,_s)}
const WHITE=new THREE.Color(5,5,5);
class Kind{
  constructor(parts,max){this.max=max;this.n=0;
    this.parts=parts.map(p=>{const m=new THREE.InstancedMesh(p.g,p.m,max);m.frustumCulled=false;m.castShadow=!!p.sh;m.receiveShadow=!!p.rs;
      let tint=null;if(p.tint!==undefined){tint=new THREE.Color(p.tint);for(let i=0;i<max;i++)m.setColorAt(i,tint)}
      m.count=0;scene.add(m);return{m,l:p.l||new THREE.Matrix4(),a:p.a,o:new THREE.Matrix4(),tint,main:!!p.main}})}
  begin(){this.n=0}
  add(x,y,z,ry,s,t=0,flash=0,tint=null,rx=0,rz=0){if(this.n>=this.max)return;const i=this.n++;
    _p.set(x,y,z);if(rx||rz){_e.set(rx,ry,rz,'YXZ');_q.setFromEuler(_e)}else _q.setFromAxisAngle(UP,ry);_s.set(s,s,s);_b.compose(_p,_q,_s);
    for(const P of this.parts){const loc=P.a?P.a(t,P.o):P.l;_m.multiplyMatrices(_b,loc);P.m.setMatrixAt(i,_m);
      if(P.tint)P.m.setColorAt(i,flash>0?WHITE:(tint&&P.main?tint:P.tint))}}
  end(){for(const P of this.parts){P.m.count=this.n;P.m.instanceMatrix.needsUpdate=true;if(P.tint)P.m.instanceColor.needsUpdate=true}}
}
const std=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.85,metalness:0,flatShading:true},o));
const bas=(c,o={})=>new THREE.MeshBasicMaterial(Object.assign({color:c},o));
const addM=(c,op=1)=>new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:op,blending:THREE.AdditiveBlending,depthWrite:false});
const GEO={box:new THREE.BoxGeometry(1,1,1),sph:new THREE.SphereGeometry(1,12,10),sphLo:new THREE.SphereGeometry(1,8,6),cyl:new THREE.CylinderGeometry(1,1,1,10),cone:new THREE.ConeGeometry(1,1,10),oct:new THREE.OctahedronGeometry(1,0),plane:new THREE.PlaneGeometry(1,1),torus:new THREE.TorusGeometry(1,.06,6,28)};
const W_=std(0xffffff),eyeR=bas(0xff2030),eyeG=bas(0x8affd8);

/* ---------- 音频（全部程序合成） ---------- */
const AU={ctx:null,out:null,mus:null,fx:null,last:{},
  init(){if(this.ctx){if(this.ctx.state==='suspended')this.ctx.resume();return}
    try{const C=window.AudioContext||window.webkitAudioContext;this.ctx=new C();this.out=this.ctx.createGain();this.out.connect(this.ctx.destination);
      this.mus=this.ctx.createGain();this.mus.connect(this.out);this.fx=this.ctx.createGain();this.fx.connect(this.out);this.apply();this.drone()}catch(e){this.ctx=null}},
  apply(){if(!this.ctx)return;const s=SAVE.settings;this.out.gain.value=s.vol*.6;this.mus.gain.value=s.music;this.fx.gain.value=s.sfx},
  ok(n,gap){if(!this.ctx)return false;const t=performance.now();if(this.last[n]&&t-this.last[n]<gap)return false;this.last[n]=t;return true},
  tone(f,d,type='sine',v=.15,slide=0,delay=0){const c=this.ctx,t=c.currentTime+delay,o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.setValueAtTime(f,t);if(slide)o.frequency.exponentialRampToValueAtTime(Math.max(20,f*slide),t+d);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0005,t+d);o.connect(g);g.connect(this.fx);o.start(t);o.stop(t+d+.05)},
  noise(d,v,freq,q=1){const c=this.ctx,t=c.currentTime,len=Math.max(1,(c.sampleRate*d)|0),b=c.createBuffer(1,len,c.sampleRate),a=b.getChannelData(0);for(let i=0;i<len;i++)a[i]=(Math.random()*2-1)*(1-i/len);
    const s=c.createBufferSource();s.buffer=b;const f=c.createBiquadFilter();f.type='bandpass';f.frequency.value=freq;f.Q.value=q;const g=c.createGain();g.gain.value=v;s.connect(f);f.connect(g);g.connect(this.fx);s.start(t)},
  drone(){const c=this.ctx,f=c.createBiquadFilter();f.type='lowpass';f.frequency.value=320;const g=c.createGain();g.gain.value=.09;f.connect(g);g.connect(this.mus);
    [55,55.35,82.4,110.2].forEach((fr,i)=>{const o=c.createOscillator();o.type=i<2?'sawtooth':'triangle';o.frequency.value=fr;o.connect(f);o.start()});
    const l=c.createOscillator(),lg=c.createGain();l.frequency.value=.07;lg.gain.value=160;l.connect(lg);lg.connect(f.frequency);l.start();
    // 缓慢的管风琴琶音
    const notes=[220,261.6,329.6,293.7,246.9,196,220,174.6];let i=0;
    setInterval(()=>{if(!this.ctx||document.hidden)return;const t=c.currentTime,o=c.createOscillator(),gg=c.createGain();o.type='triangle';o.frequency.value=notes[i++%notes.length]/2;
      gg.gain.setValueAtTime(0,t);gg.gain.linearRampToValueAtTime(.035,t+.8);gg.gain.exponentialRampToValueAtTime(.0005,t+3.6);o.connect(gg);gg.connect(this.mus);o.start(t);o.stop(t+3.7)},2400)},
  sfx(n){if(!this.ctx)return;
    if(n==='hit'&&this.ok(n,45))this.noise(.07,.16,rand(900,1500),2);
    else if(n==='throw'&&this.ok(n,90))this.noise(.08,.08,3200,3);
    else if(n==='gem'&&this.ok(n,40))this.tone(rand(1100,1500),.09,'sine',.06,1.4);
    else if(n==='coin'&&this.ok(n,60)){this.tone(1568,.08,'square',.04);this.tone(2093,.12,'square',.035,0,.05)}
    else if(n==='kill'&&this.ok(n,50))this.tone(rand(120,170),.18,'square',.045,.4);
    else if(n==='hurt'&&this.ok(n,150)){this.tone(90,.3,'sawtooth',.22,.5);this.noise(.2,.25,300,.7)}
    else if(n==='bolt'&&this.ok(n,80)){this.noise(.5,.4,1800,.4);this.tone(60,.5,'sawtooth',.18,.3)}
    else if(n==='frost'&&this.ok(n,120)){this.tone(1760,.5,'sine',.07,.5);this.noise(.3,.12,5000,2)}
    else if(n==='shatter'&&this.ok(n,70)){this.noise(.25,.25,4200,1.5);this.tone(2600,.15,'triangle',.06,.3)}
    else if(n==='react'&&this.ok(n,90))this.tone(rand(500,700),.2,'triangle',.08,1.6);
    else if(n==='level'&&this.ok(n,200))[392,494,587,784].forEach((f,i)=>this.tone(f,.5,'triangle',.12,0,i*.08));
    else if(n==='boss'&&this.ok(n,500)){this.tone(55,2.2,'sawtooth',.3,.6);this.tone(58,2.2,'sawtooth',.25,.6);this.noise(1.5,.3,200,.5)}
    else if(n==='heal'&&this.ok(n,200))[523,659,784].forEach((f,i)=>this.tone(f,.4,'sine',.1,0,i*.06));
    else if(n==='chest'&&this.ok(n,300))[330,415,494,659,831].forEach((f,i)=>this.tone(f,.6,'triangle',.12,0,i*.07));
    else if(n==='legend'&&this.ok(n,300))[523,659,784,1047,1319].forEach((f,i)=>this.tone(f,.9,'triangle',.12,0,i*.09));
    else if(n==='scythe'&&this.ok(n,120))this.noise(.18,.09,700,1.5);
    else if(n==='jump'&&this.ok(n,100))this.tone(300,.15,'sine',.08,2);
    else if(n==='dash'&&this.ok(n,100))this.noise(.2,.18,1200,.8);
    else if(n==='ult'&&this.ok(n,300)){this.tone(110,1.5,'sawtooth',.2,4);this.noise(1,.35,800,.4)}
    else if(n==='ui'&&this.ok(n,40))this.tone(660,.06,'triangle',.06);
    else if(n==='deny'&&this.ok(n,120))this.tone(140,.18,'square',.08,.7);
    else if(n==='evo'&&this.ok(n,400))[262,330,392,523,659,784,1047].forEach((f,i)=>this.tone(f,1,'triangle',.11,0,i*.07));
    else if(n==='over'&&this.ok(n,500))[220,196,165,110].forEach((f,i)=>this.tone(f,.9,'sawtooth',.12,0,i*.25));
  },
};

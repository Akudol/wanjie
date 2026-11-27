/* ============ 万界乱斗 · 背景音乐（程序合成的明亮街机风） ============
   替换原来低沉的管风琴嗡鸣。五首曲子按场景自动切换（在小节边界切，不会突兀）：
   主菜单「出发吧」· 霓虹都市「霓虹夜驰」(城市流行/合成器) · 魔法学院「学院午后」(轻快摇摆) · 武道擂台「擂台烈阳」(五声音阶+太鼓) · 海贼港湾「扬帆曲」(水手号子) · 首领战「万界决战」
   旋律由固定种子生成：每首歌每次听都一样，8 小节一循环，前后乐句呼应。 */
const CH_={C:[48,[0,4,7]],G:[43,[0,4,7]],G7:[43,[0,4,7,10]],Am:[45,[0,3,7]],F:[41,[0,4,7]],Fmaj7:[41,[0,4,7,11]],Em7:[40,[0,3,7,10]],Am7:[45,[0,3,7,10]],
  D:[50,[0,4,7]],Bm:[47,[0,3,7]],A:[45,[0,4,7]],Dm7:[50,[0,3,7,10]],Cmaj7:[48,[0,4,7,11]],E:[40,[0,4,7]],Em:[40,[0,3,7]]};
const TRACKS={
  menu:{bpm:100,prog:['C','G','Am','F'],kick:'x.......x.......',snare:'....x.......x...',hat:'..x...x...x...x.',bass:'r...r...r..5r...',arp:8,lead:'triangle',oct:72,
    rhy:['x-x-x-x---x-x---','x---x-x-x-----..'],pad:1,seed:11,lv:.9},
  neon:{bpm:116,prog:['Fmaj7','G','Em7','Am7'],kick:'x...x...x...x...',snare:'....x.......x...',hat:'..x...x...x...x.',ohat:'......x.......x.',bass:'r.ro.r.rr.ro.r.o',arp:16,arpW:'sawtooth',lead:'square',oct:72,
    rhy:['x-.x-.x-x-.x--..','x-.x-.x-x---x---'],pad:1,seed:23,lv:1},
  academy:{bpm:132,swing:.17,prog:['C','Am','F','G7'],kick:'x.....x.x.......',snare:'....x.......x..x',hat:'x.x.x.x.x.x.x.x.',bass:'r...5...o...5...',arp:0,lead:'sine',bell:1,oct:79,
    rhy:['x.x.x-x.x.x.x---','x.x.x.x.x-x-x---'],pad:1,seed:37,lv:1},
  dojo:{bpm:140,prog:['D','Bm','G','A'],penta:[0,2,4,7,9],kick:'x..x..x.x..x..x.',tom:'......x.......xx',snare:'....x.......x...',hat:'.x.x.x.x.x.x.x.x',bass:'r.r.o.r.r.r.o.5.',arp:8,lead:'square',oct:74,
    rhy:['x-x-x.x-x---x-x-','x-x-x.x-x-x-x---'],pad:0,seed:41,lv:1},
  harbor:{bpm:124,swing:.12,prog:['G','Em','C','D'],kick:'x.....x.x.....x.',snare:'....x.......x...',hat:'x.x.x.x.x.x.x.x.',bass:'r..5r..5r..5o..5',arp:0,lead:'square',oct:74,
    rhy:['x-xx-xx-x-xx-x--','x-xx-xx-x---x---'],pad:1,seed:67,lv:1},
  boss:{bpm:152,prog:['Am','F','C','G'],kick:'x...x...x...x.x.',snare:'....x.......x...',hat:'xxxxxxxxxxxxxxxx',bass:'rrorrrorrrorrror',arp:0,lead:'sawtooth',oct:69,
    rhy:['x---x-x-x---x---','x-x-x-x-x-------'],pad:1,seed:53,lv:1},
};
const mf=m=>440*Math.pow(2,(m-69)/12);
function buildMelody(T){const R=mulberry(T.seed),bars=[];let prev=T.oct+4;
  const tones=(ch)=>{const[root,iv]=CH_[ch],s=[];for(let o=-12;o<=24;o+=12)for(const i of iv){const m=root+i+o+12;if(m>=T.oct-2&&m<=T.oct+14)s.push(m)}
    if(T.penta){for(let m=T.oct-2;m<=T.oct+14;m++)if(T.penta.includes(((m-62)%12+12)%12)&&!s.includes(m))s.push(m)}return s.sort((a,b)=>a-b)};
  for(let b=0;b<8;b++){if(b>=4&&b<6){bars.push(bars[b-4].slice());continue}
    const rh=T.rhy[b%4<2?0:1],ts=tones(T.prog[b%T.prog.length]),notes=[];
    for(let s=0;s<16;s++){if(rh[s]!=='x'){notes.push(null);continue}let len=1;while(s+len<16&&rh[s+len]==='-')len++;
      let i=ts.findIndex(m=>m>=prev);if(i<0)i=ts.length-1;{const st=[-2,-1,-1,1,1,2,0][(R()*7)|0];i=Math.max(0,Math.min(ts.length-1,i+st));if(ts[i]===prev&&R()<.7)i=i>0&&R()<.5?i-1:Math.min(ts.length-1,i+1)}
      if(b===7&&s>=12){const root=CH_[T.prog[0]][0];i=ts.findIndex(m=>((m-root)%12+12)%12===0&&m>=T.oct-2);if(i<0)i=0}
      prev=ts[i];notes.push([prev,len])}
    bars.push(notes)}
  return bars}
for(const k in TRACKS)TRACKS[k].mel=buildMelody(TRACKS[k]);
const MU={id:null,pend:null,step:0,next:0,timer:null,bus:null,dly:null};
function muInit(){const c=AU.ctx;if(!c||MU.bus)return;const comp=c.createDynamicsCompressor();comp.threshold.value=-18;comp.ratio.value=3;comp.connect(AU.mus);
  MU.bus=c.createGain();MU.bus.gain.value=.85;MU.bus.connect(comp);
  MU.dly=c.createDelay(1);const fb=c.createGain(),wet=c.createGain();fb.gain.value=.28;wet.gain.value=.22;MU.dly.connect(fb);fb.connect(MU.dly);MU.dly.connect(wet);wet.connect(MU.bus);
  MU.timer=setInterval(muTick,25)}
function voice(f,t,d,type,v,o={}){const c=AU.ctx,os=c.createOscillator(),g=c.createGain();os.type=type;os.frequency.setValueAtTime(f,t);if(o.slide)os.frequency.exponentialRampToValueAtTime(Math.max(20,f*o.slide),t+d);
  let node=os;if(o.lp){const fl=c.createBiquadFilter();fl.type='lowpass';fl.frequency.value=o.lp;fl.Q.value=o.q||1;os.connect(fl);node=fl}
  if(o.vib){const l=c.createOscillator(),lg=c.createGain();l.frequency.value=5.5;lg.gain.value=f*.012;l.connect(lg);lg.connect(os.frequency);l.start(t);l.stop(t+d+.1)}
  const a=o.att||.005;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+a);g.gain.setTargetAtTime(o.sus!=null?v*o.sus:0.0001,t+a,o.rel||d*.35);g.gain.setTargetAtTime(0.0001,t+d,.04);
  node.connect(g);g.connect(MU.bus);if(o.send)g.connect(MU.dly);os.start(t);os.stop(t+d+.3)}
function noiseHit(t,d,v,type,freq){const c=AU.ctx,len=Math.max(1,(c.sampleRate*d)|0),b=c.createBuffer(1,len,c.sampleRate),a=b.getChannelData(0);for(let i=0;i<len;i++)a[i]=(Math.random()*2-1)*Math.pow(1-i/len,2);
  const s=c.createBufferSource();s.buffer=b;const f=c.createBiquadFilter();f.type=type;f.frequency.value=freq;const g=c.createGain();g.gain.value=v;s.connect(f);f.connect(g);g.connect(MU.bus);s.start(t)}
function playStep(T,step,t,sd){const s=step%16,bar=Math.floor(step/16),ch=CH_[T.prog[bar%T.prog.length]],[root,iv]=ch,L=T.lv;
  if(T.kick[s]==='x')voice(150,t,.22,'sine',.55*L,{slide:.3,rel:.08});
  if(T.snare[s]==='x'){noiseHit(t,.16,.32*L,'bandpass',1900);voice(220,t,.08,'triangle',.12*L,{slide:.6})}
  if(T.hat[s]==='x')noiseHit(t,.035,(T.id==='boss'?.05:.09)*L,'highpass',8000);
  if(T.ohat&&T.ohat[s]==='x')noiseHit(t,.18,.07*L,'highpass',7000);
  if(T.tom&&T.tom[s]==='x')voice(s%2?110:90,t,.3,'sine',.4*L,{slide:.5,rel:.1});
  const bc=T.bass[s];if(bc!=='.'){const m=root+(bc==='o'?12:bc==='5'?7:0);voice(mf(m),t,sd*(T.id==='boss'?.9:1.6),T.id==='academy'?'triangle':'sawtooth',.16*L,{lp:T.id==='boss'?1100:700,q:4,rel:sd*.6})}
  if(T.arp&&s%(16/T.arp)===0){const k=(s/(16/T.arp))|0,m=root+24+iv[k%iv.length]+(k>=iv.length&&T.arp===16?12:0);voice(mf(m),t,sd*1.2,T.arpW||'triangle',.035*L,{lp:T.arpW?2400:5000,send:1,rel:sd*.4})}
  if(T.pad&&s===0)for(const i of iv)voice(mf(root+12+i),t,sd*16,'triangle',.022*L,{att:.25,sus:.7,rel:1,lp:1800});
  const n=T.mel[bar%8][s];if(n){const[m,len]=n,d=sd*len;
    if(T.bell){voice(mf(m),t,d+.4,'sine',.09*L,{rel:.35,send:1});voice(mf(m+12),t,.25,'sine',.025*L,{rel:.08})}
    else voice(mf(m),t,d*.95,T.lead,(T.lead==='square'?.05:T.lead==='sawtooth'?.055:.085)*L,{lp:T.lead==='triangle'?6000:3200,vib:len>2,send:1,sus:.6,rel:d*.5})}}
function muTick(){const c=AU.ctx;if(!c||!MU.id)return;if(MU.next<c.currentTime-.2)MU.next=c.currentTime+.05;
  while(MU.next<c.currentTime+.15){let T=TRACKS[MU.id];
    if(MU.step%16===0&&MU.pend){MU.id=MU.pend;MU.pend=null;MU.step=0;T=TRACKS[MU.id]}
    const sd=60/T.bpm/4,sw=T.swing&&MU.step%2===1?sd*T.swing:0;playStep(T,MU.step,MU.next+sw,sd);MU.next+=sd;MU.step++}}
function playTrack(id){if(!TRACKS[id])return;TRACKS[id].id=id;if(MU.id===id&&!MU.pend)return;if(!MU.id){MU.id=id;MU.step=0;MU.next=AU.ctx?AU.ctx.currentTime+.05:0}else MU.pend=id===MU.id?null:id}
for(const k in TRACKS)TRACKS[k].id=k;
function victoryJingle(){const c=AU.ctx;if(!c||!MU.bus)return;const t=c.currentTime+.05;[[72,0],[76,.12],[79,.24],[84,.36],[79,.6],[84,.72]].forEach(([m,d])=>voice(mf(m),t+d,.5,'square',.06,{lp:3500,send:1}));
  [48,55,60,64].forEach(m=>voice(mf(m),t+.72,1.6,'triangle',.05,{att:.05,sus:.6,rel:.8}))}
// 接入音频系统：替换原来的低沉嗡鸣
AU.drone=function(){muInit();playTrack(G.state==='menu'?'menu':(RUN&&STAGES[RUN.stage]?STAGES[RUN.stage].id:'menu'))};
if(AU.ctx)AU.drone();
wrapHook('loadStage',o=>i=>{o(i);playTrack(STAGES[i].id)});
wrapHook('summonBoss',o=>f=>{const was=RUN.bossSummoned;o(f);if(!was)playTrack('boss')});
wrapHook('toMenu',o=>()=>{o();playTrack('menu')});
wrapHook('endRun',o=>win=>{o(win);if(win)victoryJingle();playTrack('menu')});
wrapHook('relicUpdate',o=>dt=>{o(dt);if(MU.id==='boss'&&!MU.pend&&RUN.bossDead)playTrack(STAGES[RUN.stage].id)});

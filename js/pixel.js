/* ============ 永夜挽歌 · 像素角色（全部为代码手绘的像素图，立牌式渲染） ============
   每个角色左半边逐行绘制、自动镜像；腿、武器、灯笼等不对称部件用代码补画。
   敌人用实例化立牌批量绘制，始终朝向镜头；猎人有正面 / 背面两套帧。 */
const PIX_PAL={
  '.':null,k:'#120a10',K:'#2a1a22',
  // 灯守
  h:'#2a2236',b:'#9a1828',f:'#6a5048',y:'#ffd27a',c:'#3a2c48',r:'#a01828',l:'#5a4a6a',n:'#1a1018',d:'#2a1e36',
};
function palOf(over){return Object.assign({},PIX_PAL,over)}
const SPR={
  warden:{w:16,h:24,legs:{y:21,h:3,x:5,w:2,c:'#2a2030',b:'#120a10'},
    pal:palOf({}),
    rows:['........','........','.....kkk','....khhh','....khhh','....kbbb','.kkkkhhh','khhhhhhh','.kkkkkkk','....kfff','....kfyf','...kkfff',
      '..kcccrr','.kccccrr','.kcccccr','kccccccc','kclccccc','kclnnnnn','kclccccc','kclccdcc','.kkccdcc'],
    back:{9:'....khhh',10:'....khhh',11:'...kkhhh',12:'..kccccc',13:'.kcccccc',14:'.kcccccc'},
    extra:(p,f,back)=>{if(back)return;const y=14+(f%2);p(13,y,'#3a2a1a');p(14,y,'#3a2a1a');p(13,y+1,'#ffb040');p(14,y+1,'#ffd27a');p(13,y+2,'#ffb040');p(14,y+2,'#ff9a30');p(13,y+3,'#3a2a1a');p(14,y+3,'#3a2a1a');p(12,y-1,'#120a10')}},
  heir:{w:16,h:24,legs:{y:21,h:3,x:5,w:2,c:'#1a1018',b:'#0a0608'},
    pal:palOf({M:'#3a1626',h:'#16101a',s:'#e8dcd0',y:'#ff2030',r:'#9a0f22',w:'#f0e8e0',c:'#241a26',m:'#0e080e',g:'#c9a35a'}),
    rows:['........','........','........','.....kkk','....khhh','....khhh','...kkhsh','...khsss','...khsys','....ksss','..kkkkss',
      '.krrkkss','krrrkwww','krrkcwwc','kcrkcccc','kmrkcccc','kmrkcgcc','kmrkcccc','kmrkcgcc','kmrkcccc','kmmkkccc'],
    back:{6:'...kkhhh',7:'...khhhh',8:'...khhhh',9:'....khhh',10:'..kkkkmm',11:'.krMMMMM',12:'krMMMMMM',13:'krMMMMMM',14:'krMMMMmM',15:'krMMMMmM',16:'krMMMmMM',17:'krMMMmMM',18:'krMMmMMM',19:'krMMmMMM',20:'krrrrrrr'}},
  raven:{w:16,h:24,legs:{y:21,h:3,x:5,w:2,c:'#141826',b:'#0a0a12'},
    pal:palOf({d:'#1c2238',e:'#3a4a78',m:'#7a7a8a',s:'#a8b0c8',n:'#3a2a1a',B:'#6ad8ff'}),
    rows:['........','........','......kk','.....kdd','....kddd','...kdddd','...kdkkk','...kdkBk','...kdkmm','...kddkk','..kddddd',
      '.kdeeddd','.kdeddsd','kddeddds','kddeddsd','kddedsdd','kddeddnn','kdkeeddd','kdkddddd','.kkdddkd','..kkdkkd'],
    back:{6:'...kdddd',7:'...kdddd',8:'...kdddd',9:'...kdddd'},
    extra:(p,f,back)=>{if(back)return;for(let i=0;i<4;i++){p(1,15+i,'#c8d0e8');p(14,15+i,'#c8d0e8')}p(1,19,'#3a2a1a');p(14,19,'#3a2a1a')}},
  ghoul:{w:16,h:20,legs:{y:17,h:3,x:5,w:2,c:'#5a6a50',b:'#2a3028'},
    pal:palOf({g:'#7a8a6a',r:'#ff3030',d:'#3a3028'}),
    rows:['........','........','........','......kk','.....kgg','....kggg','....kgrg','....kggg','....kgkk','...kgggg','..kgggdd','.kggkddd','kggkdddd','kgk.kddd','kgk.kddd','kk..kddd','....kkdd']},
  penitent:{w:16,h:22,legs:{y:19,h:3,x:5,w:2,c:'#c8a888',b:'#8a6a50'},
    pal:palOf({b:'#5a3a28',c:'#d8c8a0',y:'#ffd060',s:'#c8a888',d:'#3a2418'}),
    rows:['........','......kk','.....kbb','....kbbb','....kbkk','...kbkyk','...kbkkk','...kbbbb','..kbbbbb','.kbbcbbb','.kbbcbbb','kbbbbccc','kbsbbbbb','kbsbbbbb','kbbbbbbb','kbbbbdbb','kbbbbdbb','.kbbbdbb','..kkkkkk']},
  knight:{w:16,h:24,legs:{y:19,h:5,x:5,w:2,c:'#d8ccb0',b:'#3a3c46'},
    pal:palOf({a:'#6a6c78',r:'#c01828',w:'#e8dcc0',d:'#40424c'}),
    rows:['........','.......r','.....kkr','....kaaa','....kaaa','....kakk','....kark','....kaaa','...kkwww','..kaakkk','.kaaaaaa','kaaakaaa','kakkadad','kak.kaaa','kak.kada','kwk.kaaa','kk..kddd','....kaaa','....kddd'],
    extra:(p,f)=>{for(let y=6;y<17;y++)p(14,y,y<8?'#ffffff':'#c8ccd8');p(13,16,'#c9a35a');p(15,16,'#c9a35a');p(14,17,'#3a2a1a');
      for(let y=10;y<17;y++)for(let x=0;x<3;x++)p(x,y,x===0||y===10||y===16?'#120a10':'#3a2030');p(1,13,'#c9a35a')}},
  wraith:{w:16,h:24,legs:null,
    pal:palOf({p:'#a898d8',P:'#d0c8f0',G:'#6affb8'}),
    rows:['........','......kk','.....kpp','....kppp','....kpkk','....kpGk','....kpkk','....kppp','...kpppp','..kppPpp','.kpppPpp','.kp.kppp','kp..kppp','kk..kppp','....kppp','...kpppp','...kpppP','..kppppP','..kpppPp','.kpppppp'],
    extra:(p,f)=>{const hem=[[1,3,5,7,9,11,13],[2,4,6,8,10,12,14],[1,4,7,10,13],[2,5,8,11,14]][f];for(let x=1;x<15;x++){p(x,20,'#a898d8');p(x,21,'#a898d8')}for(const x of hem){p(x,22,'#a898d8');p(x,23,'#8a7ab8')}}},
  bat:{w:16,h:10,legs:null,pal:palOf({b:'#3a2236',r:'#ff3040',w:'#5a2a46'}),
    rows:['........','......k.','......kk','......kb','.....kbr','......bb','.......b','........'],
    extra:(p,f)=>{const W=[[[5,1],[4,1],[3,0],[2,0],[1,1],[4,2],[3,2],[2,1],[5,3]],[[5,3],[4,3],[3,3],[2,3],[1,3],[0,4],[4,4],[3,4],[2,4]],[[5,4],[4,5],[3,6],[2,7],[1,7],[4,4],[3,5],[2,6],[5,5]],[[5,3],[4,3],[3,3],[2,3],[1,3],[0,4],[4,4],[3,4],[2,4]]][f];
      for(const[x,y]of W){p(x,y,'#5a2a46');p(15-x,y,'#5a2a46')}}},
  bishop:{w:16,h:26,legs:null,pal:palOf({w:'#e8e0d0',g:'#c9a35a',s:'#9a9090',y:'#ffe060',p:'#5a2a7a',P:'#7a4aa0'}),
    rows:['.......k','......kw','.....kwg','.....kwg','....kwgg','....kwwg','....kwww','....kkkk','....ksss','....ksys','....kssk','...kpppp','..kppgpp','.kpppgpp','.kppkgpp','kpppkgpp','kspkpgpp','kk.kpgpp','...kpgpp','...kppgp','..kpppgp','..kppppg','.kpppppp','.kpppppp'],
    extra:(p,f)=>{const s=f%2;for(let x=1;x<15;x++)p(x,24,'#5a2a7a');for(let x=0;x<16;x+=2)p(x+s,25,'#3a1a50');for(let y=2;y<24;y++)p(15,y,'#c9a35a');p(14,2,'#c9a35a');p(13,3,'#c9a35a');p(14,4,'#c9a35a')}},
  lord:{w:24,h:32,legs:{y:29,h:3,x:8,w:3,c:'#1a0a10',b:'#0a0408'},
    pal:palOf({g:'#e0b040',p:'#e8d8d0',R:'#ff1030',m:'#2a0a14',r:'#8a0a1c',a:'#141016'}),
    rows:['............','..k.........','..kk........','...kk....k.g','....kk..kgkg','.....kkkgggg','........kppp','........kpRp','........kppp','........kkpk','.......kmmkk','....kkmmmmrr','...kmmmmmrrr','..kmmmmmrrar','.kmmmmmmraaa','.kmmmmmmaaaa','kmmmmmmmaaga','kmmmmmmmaaaa','kmmrmmmmaaaa','kmmrmmmmaaaa','kmmrmmmmmaaa','kmrrmmmmmmaa','kmrrmmmmmmma','kmrrmmmmmmmm','kmrmmmmmmmmm','kmrmmmmmmmmm','kmmmmmmmmmmm','kkmmmmmmmmmm','.kkkkkmmmmmm'],
    extra:(p,f)=>{for(let y=8;y<28;y++)p(22,y,y<10?'#ff6070':'#b01020');p(21,26,'#e0b040');p(23,26,'#e0b040')}},
  hound:{w:16,h:14,legs:{y:11,h:3,x:3,w:2,c:'#d8ccb0',b:'#8a8070'},pal:palOf({b:'#d8ccb0',r:'#ff2030'}),
    rows:['........','...kk...','...kbk..','....kbbb','....kbrb','....kbbb','.....kkk','...kbbbb','..kbbbbb','..kbkbbb','..kbkbbb']},
  wisp:{w:12,h:14,legs:null,pal:palOf({}),rows:['......','......','......','......','......','......','......','......','......','......','......','......','......','......'],
    extra:(p,f)=>{const sh=[[5,0],[4,1],[5,1],[6,1],[4,2],[5,2],[6,2],[3,3],[4,3],[5,3],[6,3],[7,3],[3,4],[4,4],[5,4],[6,4],[7,4],[2,5],[3,5],[4,5],[5,5],[6,5],[7,5],[8,5],[2,6],[3,6],[4,6],[5,6],[6,6],[7,6],[8,6],[2,7],[3,7],[4,7],[5,7],[6,7],[7,7],[8,7],[3,8],[4,8],[5,8],[6,8],[7,8],[4,9],[5,9],[6,9]];
      const off=f%2;for(const[x,y]of sh){const c=(x===5||x===4)&&y>3?'#ffffff':y<3?'#c070ff':'#a050ff';p(x+(y<4?off:0),y+3,c)}p(4,8,'#120a10');p(6,8,'#120a10')}},
};
// 换色变体
function recolor(base,map,extra={}){const s=Object.assign({},SPR[base],extra);s.pal=Object.assign({},SPR[base].pal,map);if(extra.legs===undefined&&SPR[base].legs)s.legs=Object.assign({},SPR[base].legs,map.__legs||{});delete s.pal.__legs;return s}
SPR.bloodghoul=recolor('ghoul',{g:'#a83a40',d:'#4a1018',r:'#ffe060',__legs:{c:'#8a2a30',b:'#3a0a10'}});
SPR.hellknight=recolor('knight',{a:'#3a1a14',d:'#24100c',r:'#ff7020',w:'#6a5a50',__legs:{c:'#6a5a50',b:'#24100c'}});
SPR.colossus=recolor('knight',{a:'#4a4c5a',d:'#2a2c36',r:'#5ad0ff',w:'#c8c0a8'});
SPR.gargoyle=recolor('bat',{b:'#6a6a74',r:'#ffb040',w:'#8a8a94'});
SPR.fam_bat0=SPR.bat;SPR.fam_bat1=recolor('bat',{b:'#6a1020',r:'#ffd060'});SPR.fam_bat2=recolor('bat',{b:'#1a0008',r:'#ffe060'});
SPR.fam_hound0=SPR.hound;SPR.fam_hound1=recolor('hound',{b:'#a04020',r:'#ffd040',__legs:{c:'#a04020',b:'#401008'}});SPR.fam_hound2=recolor('hound',{b:'#2a1a1a',r:'#ff6020',__legs:{c:'#2a1a1a',b:'#100808'}});
SPR.fam_wisp0=SPR.wisp;SPR.fam_wisp1=SPR.wisp;SPR.fam_wisp2=SPR.wisp;

/* ---------- 生成图集 ---------- */
function drawSprite(def,frames,backFrames){
  if(def.canvas)return def.canvas;
  const W=def.w,H=def.h,F=frames+(backFrames||0),c=document.createElement('canvas');c.width=W*F;c.height=H;const g=c.getContext('2d');
  for(let f=0;f<F;f++){const back=f>=frames,ff=back?f-frames:f,ox=f*W;
    const p=(x,y,col)=>{if(col&&x>=0&&x<W&&y>=0&&y<H){g.fillStyle=col;g.fillRect(ox+x,y,1,1)}};
    const bob=def.legs&&(ff===1||ff===3)?-1:0;
    def.rows.forEach((row0,y)=>{const row=back&&def.back&&def.back[y]?def.back[y]:row0;
      for(let x=0;x<row.length;x++){const col=def.pal[row[x]];if(col){p(x,y+bob,col);p(W-1-x,y+bob,col)}}});
    if(def.legs){const L=def.legs,liftL=[0,1,0,0][ff],liftR=[0,0,0,1][ff];
      const leg=(x0,lift)=>{for(let i=0;i<L.h-lift;i++)for(let k=0;k<L.w;k++)p(x0+k,L.y+i+bob+lift*0,i===L.h-lift-1?L.b:L.c)};
      leg(L.x,liftL);leg(W-L.x-L.w,liftR)}
    if(def.extra)def.extra(p,ff,back)}
  return c}
/* ---------- 实例化立牌 ---------- */
let PIX_TILT=.2;const _pe=new THREE.Euler(),_pq=new THREE.Quaternion();
const blobMat=new THREE.MeshBasicMaterial({map:glowTex,color:0x000000,transparent:true,opacity:.5,depthWrite:false});
const blobKind=new Kind([{g:GEO.plane,m:blobMat,l:L(0,.06,0,-Math.PI/2,0,0)}],1200);
class PixKind{
  constructor(def,frames,back,height,max,rate=5.5){const cvs=drawSprite(def,frames,back);this.F=frames+(back||0);this.walkF=frames;this.rate=rate;this.max=max;this.n=0;
    const tex=new THREE.CanvasTexture(cvs);tex.magFilter=THREE.NearestFilter;tex.minFilter=THREE.NearestFilter;tex.generateMipmaps=false;tex.encoding=THREE.sRGBEncoding;
    const wW=height*def.w/def.h,geo=new THREE.PlaneGeometry(wW,height);geo.translate(0,height/2,0);
    this.fr=new Float32Array(max);geo.setAttribute('aFrame',new THREE.InstancedBufferAttribute(this.fr,1));
    const mat=new THREE.MeshBasicMaterial({map:tex,alphaTest:.5,side:THREE.DoubleSide,color:0xffffff});const F=this.F;
    mat.onBeforeCompile=sh=>{sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nattribute float aFrame;').replace('#include <uv_vertex>',`#include <uv_vertex>\n#ifdef USE_UV\nvUv.x=(vUv.x+aFrame)/${F}.0;\n#endif`)};
    mat.customProgramCacheKey=()=>"pix"+F;
    this.m=new THREE.InstancedMesh(geo,mat,max);this.m.frustumCulled=false;const w=new THREE.Color(1,1,1);for(let i=0;i<max;i++)this.m.setColorAt(i,w);this.m.count=0;scene.add(this.m);this.def=w}
  begin(){this.n=0}
  add(x,y,z,ry,s,t=0,flash=0,tint=null,frame=null,flip=false,shadow=true){if(this.n>=this.max)return;const i=this.n++;
    const by=Math.atan2(camera.position.x-x,camera.position.z-z);_pe.set(-PIX_TILT,by,0,'YXZ');_pq.setFromEuler(_pe);_p.set(x,y,z);_s.set(flip?-s:s,s,s);_b.compose(_p,_pq,_s);
    this.m.setMatrixAt(i,_b);this.m.setColorAt(i,flash>0?WHITE:(tint||this.def));
    this.fr[i]=frame!=null?frame:((Math.floor(t*this.rate)%this.walkF)+this.walkF)%this.walkF;
    if(shadow)blobKind.add(x,hAt(x,z),z,0,s*1.1)}
  end(){this.m.count=this.n;this.m.instanceMatrix.needsUpdate=true;this.m.instanceColor.needsUpdate=true;this.m.geometry.attributes.aFrame.needsUpdate=true}
}
/* ---------- 建立全部角色 ---------- */
const HERO_PX={};const FAM_PX={};
(function setupPixels(){
  const D=n=>(typeof SPR2!=='undefined'&&SPR2[n])||SPR[n];
  const mk=(name,h,max,rate)=>{EK['px_'+name]=new PixKind(D(name),4,0,h,max,rate)};
  mk('ghoul',1.7,440);mk('bloodghoul',1.7,300);mk('penitent',1.8,300);mk('knight',2.2,220);mk('hellknight',2.2,200);mk('wraith',2.4,200,4);
  mk('bat',1,300,12);mk('gargoyle',1,120,10);mk('colossus',2.2,2,4);mk('bishop',2.6,2,3);mk('lord',4.8,2,3);
  for(const h of['warden','heir','raven'])HERO_PX[h]=new PixKind(D(h),4,4,2.4,10,8);
  for(const f of['bat','hound','wisp'])for(let s=0;s<3;s++)FAM_PX[f+s]=new PixKind(D('fam_'+f+s),4,0,f==='hound'?1.1:f==='wisp'?1:.8,1,f==='bat'?12:f==='wisp'?6:9);
  const set=(def,k,extra)=>Object.assign(def,{kind:'px_'+k},extra||{});
  set(ENEMIES.ghoul,'ghoul');set(ENEMIES.bloodghoul,'bloodghoul',{tint:undefined});set(ENEMIES.penitent,'penitent',{tint:undefined,sc:1});
  set(ENEMIES.knight,'knight');set(ENEMIES.hellknight,'hellknight',{tint:undefined});set(ENEMIES.wraith,'wraith');
  set(ENEMIES.bat,'bat');set(ENEMIES.gargoyle,'gargoyle',{tint:undefined});
  set(BOSSES.colossus,'colossus',{tint:undefined});set(BOSSES.bishop,'bishop',{tint:undefined});set(BOSSES.lord,'lord',{sc:1});
})();
// 眷属：只保留一个空的位置节点，画面由像素立牌负责
famModel=function(id,stg){const g=new THREE.Group();scene.add(g);return g};
body.visible=false;
/* 兼容旧的 3D 模型接口 */
function setHero(){}function heroShot(){}function loadModels(){}
/* 每帧：猎人、眷属、阴影 */
function updateHero(dt){
  PIX_TILT=CAM.mode==='tp'?Math.min(.5,CAM.pitch*.55):.62;
  for(const k in HERO_PX)HERO_PX[k].begin();for(const k in FAM_PX)FAM_PX[k].begin();
  const hunter=P?P.hunter:(typeof selHunter!=='undefined'?selHunter:'warden');
  const px=player.position,vis=player.visible;
  if(vis){let frame=0;
    // 正面 / 背面：角色朝向与镜头方向同向时显示背面
    const cy=G.state==='menu'?0:camYaw(),face=P?P.face:player.rotation.y;
    const fx=Math.sin(face),fz=Math.cos(face),back=fx*Math.sin(cy)+fz*Math.cos(cy)>.1,side=fx*-Math.cos(cy)+fz*Math.sin(cy);
    const air=P&&P.y-hAt(P.x,P.z)>.25,mov=P&&(P.moving||P.dashT>0);
    if(air)frame=1;else if(mov)frame=Math.floor(G.rt*(P.dashT>0?16:9))%4;
    if(back)frame+=4;
    const sq=P&&P.dashT>0?.92:1;
    HERO_PX[hunter].add(px.x,px.y+(mov||air?0:Math.abs(Math.sin(G.rt*2.5))*.03),px.z,0,sq,0,0,typeof heroTint==='function'?heroTint():null,frame,side<-.2,false);}
  if(typeof homageHeroAdds==='function'&&P)homageHeroAdds(HERO_PX[hunter]);
  for(const k in HERO_PX)HERO_PX[k].end();
  for(const f of fams){const kk=FAM_PX[f.id+f.stage];kk.add(f.x,f.id==='hound'?f.y:f.y-.4,f.z,0,1+f.stage*.25,f.t*(f.id==='bat'?2:1),0,f.id==='wisp'?new THREE.Color(...[[.6,.9,1],[.8,.6,1],[.6,1,.85]][f.stage]):null,null,false,false)}
  for(const k in FAM_PX)FAM_PX[k].end();
  if(typeof homageRender==='function')homageRender();
}
// 敌人阴影随 EK 循环一起开始 / 结束
EK.zz_blob=blobKind;

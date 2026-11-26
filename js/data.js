/* ============ 永夜挽歌 · 数据表 ============ */
const ICONS={
  dagger:'<path d="M12 2l2.2 11h-4.4z"/><path d="M7.5 13.5h9M12 13.5V19M10.3 20.5h3.4"/>',
  orbit:'<circle cx="12" cy="12" r="2.5"/><circle cx="12" cy="12" r="8" stroke-dasharray="2 3"/><circle cx="20" cy="12" r="1.8" fill="currentColor"/><circle cx="6.3" cy="6.3" r="1.8" fill="currentColor"/><circle cx="6.3" cy="17.7" r="1.8" fill="currentColor"/>',
  bolt:'<path d="M13.5 2L5 14h6l-1.5 8L18 10h-6z"/>',
  aura:'<circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="8.5"/><path d="M12 1v2M12 21v2M1 12h2M21 12h2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>',
  scythe:'<path d="M6 22L15.5 4"/><path d="M15.5 4C11 1 5 2 2.5 7c3.5-2.5 8-3 13-3z"/>',
  frost:'<path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7"/><path d="M9.5 3.5L12 6l2.5-2.5M9.5 20.5L12 18l2.5 2.5"/>',
  bell:'<path d="M6 17V11a6 6 0 0 1 12 0v6l2 2H4z"/><path d="M10 21h4M12 2v3"/>',
  whetstone:'<path d="M3 15l9-9 6 6-9 9z"/><path d="M14 4l6 6"/>',
  feather:'<path d="M20 4C10 4 5 10 4 20c4-6 8-8 12-9-3-1-6 0-8 1 3-4 7-6 12-8z"/>',
  boneshield:'<path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z"/><path d="M9 10h6M12 7v8"/>',
  holywater:'<path d="M10 2h4v4l4 5v9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-9l4-5z"/><path d="M9.5 15h5M12 12.5v5"/>',
  coinpurse:'<path d="M8 6h8l3 5v7a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-7z"/><path d="M9 3h6l-1 3h-4z"/><circle cx="12" cy="15" r="2"/>',
  candle:'<path d="M9 10h6v11H9z"/><path d="M12 2c2 2.5 2 4 0 6-2-2-2-3.5 0-6z"/>',
  fang:'<path d="M5 3h14l-3 9-2 9-2-6-2 6-2-9z"/>',
  ember:'<circle cx="12" cy="14" r="6"/><path d="M12 8c-2-2-1-5 1-6 0 2 3 3 2 6"/>',
  frostheart:'<path d="M12 20.5s-8-5-8-11a4.4 4.4 0 0 1 8-2.6 4.4 4.4 0 0 1 8 2.6c0 6-8 11-8 11z"/><path d="M12 8v8M8.5 10l7 4M8.5 14l7-4"/>',
  seed:'<path d="M12 3c4 3 6 7 6 10a6 6 0 0 1-12 0c0-3 2-7 6-10z"/><path d="M9 14l3 2 3-2"/>',
  spurs:'<circle cx="15" cy="15" r="4"/><path d="M15 9v-3M15 21v3M9 15H6M21 15h3M3 3l8 8"/>',
  lens:'<circle cx="10" cy="10" r="6.5"/><path d="M15 15l6 6M7 10h6M10 7v6"/>',
  codex:'<path d="M5 3h11a3 3 0 0 1 3 3v15H8a3 3 0 0 1-3-3z"/><path d="M5 18a3 3 0 0 1 3-3h11"/><path d="M12 6v6M9.5 8.5h5"/>',
  mirror:'<path d="M12 2l7 7-7 13-7-13z"/><path d="M12 2v20M5 9h14"/>',
  thorns:'<path d="M12 3l2 4 4-2-1 4 4 2-4 2 1 4-4-2-2 4-2-4-4 2 1-4-4-2 4-2-1-4 4 2z"/>',
  hourglass:'<path d="M6 2h12M6 22h12M7 2c0 5 10 6 10 10S7 17 7 22M17 2c0 5-10 6-10 10s10 5 10 10"/>',
  pact:'<path d="M4 4h12l4 4v12H4z"/><path d="M8 10h8M8 14h5"/><circle cx="16" cy="17" r="2" fill="currentColor"/>',
  phoenix:'<path d="M12 21c-5-3-8-7-8-12 3 2 5 2 6 1-2-3-1-6 2-8 3 2 4 5 2 8 1 1 3 1 6-1 0 5-3 9-8 12z"/>',
  crown:'<path d="M3 8l4 4 5-7 5 7 4-4-2 11H5z"/><path d="M5 19h14"/>',
  saint:'<path d="M12 20.5s-8-5-8-11a4.4 4.4 0 0 1 8-2.6 4.4 4.4 0 0 1 8 2.6c0 6-8 11-8 11z"/><path d="M12 7v9M9 10h6"/>',
  chalice:'<path d="M6 3h12c0 5.5-3 8-6 8s-6-2.5-6-8z"/><path d="M12 11v7M8 21h8M9 18h6"/>',
  tome:'<path d="M4 4h7a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4z"/><path d="M20 4h-7a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h7z"/>',
  coin:'<circle cx="12" cy="12" r="8"/><path d="M12 7v10M9.5 9.5h4a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 0 0 3h4"/>',
  skull:'<path d="M5 11a7 7 0 0 1 14 0v3.5h-2.5V19h-9v-4.5H5z"/><circle cx="9" cy="11" r="1.6" fill="currentColor"/><circle cx="15" cy="11" r="1.6" fill="currentColor"/>',
  bat:'<path d="M2 9c3 0 4 2 5 4 1-2 2-3 5-3s4 1 5 3c1-2 2-4 5-4-1 4-3 7-6 7l-1 2-3-2-3 2-1-2c-3 0-5-3-6-7z"/>',
  hound:'<path d="M4 18l2-6-3-3 4-1 3-4 2 4h5l4 4-2 2h-3l-1 4h-3l-1-3H8l-1 3z"/>',
  wisp:'<path d="M12 21a5 5 0 0 1-5-5c0-4 5-6 4-13 3 3 6 7 6 13a5 5 0 0 1-5 5z"/><circle cx="12" cy="16" r="1.5" fill="currentColor"/>',
  eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  boots:'<path d="M8 3h5v9l6 3.5V20H8z"/><path d="M8 17h11"/>',
  heart:'<path d="M12 20.5s-8-5-8-11a4.4 4.4 0 0 1 8-2.6 4.4 4.4 0 0 1 8 2.6c0 6-8 11-8 11z"/>',
  magnet:'<path d="M6 3v9a6 6 0 0 0 12 0V3h-4v9a2 2 0 0 1-4 0V3z"/>',
  clover:'<circle cx="9" cy="9" r="3.2"/><circle cx="15" cy="9" r="3.2"/><circle cx="9" cy="15" r="3.2"/><circle cx="15" cy="15" r="3.2"/><path d="M15 18l4 4"/>',
  armor:'<path d="M6 3l6 2 6-2 2 5-2 3v9H6v-9L4 8z"/>',
  lantern:'<path d="M9 4h6M10 2h4M8 4h8v3l1 2v9l-1 2H8l-1-2V9l1-2z"/><path d="M12 10c1.5 1.5 1.5 3 0 4.5-1.5-1.5-1.5-3 0-4.5z"/>',
  blood:'<path d="M12 2c3 5 6 8 6 12a6 6 0 0 1-12 0c0-4 3-7 6-12z"/>',
  raven:'<path d="M3 13c4-1 6-4 8-8l2 4 4-1-2 3 6 2-7 2-1 5-3-4-7 1 3-2z"/>',
  altar:'<path d="M4 20h16M6 20v-7h12v7M5 13h14M9 13V9h6v4M12 3v6"/>',
  portal:'<ellipse cx="12" cy="12" rx="6" ry="9"/><ellipse cx="12" cy="12" rx="3" ry="5.5"/>',
  obelisk:'<path d="M10 3h4l2 17H8z"/><path d="M6 20h12M11 9h2"/>',
  nest:'<path d="M3 14c2 5 16 5 18 0"/><ellipse cx="12" cy="11" rx="4" ry="5"/>',
  shrine:'<path d="M12 2l3 5H9z"/><path d="M8 7h8v13H8zM5 20h14"/><circle cx="12" cy="13" r="2"/>',
};
const PIXICON={};
const svg=(k,cls='')=>PIXICON[k]?`<i class="pi ${cls}" style="--m:url(${PIXICON[k]})"></i>`:`<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICONS[k]||ICONS.skull}</svg>`;

const ELEM={
  phys:{n:'物理',c:'#e8dcc4'},blood:{n:'鲜血',c:'#ff4a62'},fire:{n:'圣火',c:'#ffa040'},
  volt:{n:'雷霆',c:'#b9a6ff'},frost:{n:'霜寒',c:'#8fe3ff'},dark:{n:'暗咒',c:'#c77dff'},
};
const RAR=[
  {id:'c',n:'普通',c:'#bdb4a8',m:1},{id:'r',n:'稀有',c:'#5fa8ff',m:1.5},
  {id:'e',n:'史诗',c:'#c070ff',m:2.2},{id:'l',n:'传说',c:'#ffb340',m:3.2},
];
/* 武器：每级随机强化一项属性，强化幅度取决于卡牌稀有度 */
const WEAPONS={
  dagger:{n:'银十字匕首',el:'phys',icon:'dagger',d:'向最近的亡者投掷银匕首，可穿透。',
    base:{dmg:12,cd:.75,count:1,pierce:1,area:1,speed:21},ups:['dmg','count','pierce','cd'],
    evo:{relic:'whetstone',n:'千刃圣十字',d:'匕首向八方齐射，暴击时再分裂。'}},
  orbit:{n:'血之念珠',el:'blood',icon:'orbit',d:'血珠环绕旋转，叠加出血。',
    base:{dmg:9,cd:.45,count:2,area:1,speed:3},ups:['dmg','count','area','speed'],
    evo:{relic:'fang',n:'猩红日蚀',d:'血珠变为血月，命中必定吸血。'}},
  bolt:{n:'天罚雷殛',el:'volt',icon:'bolt',d:'雷霆劈落随机亡者，使其感电。',
    base:{dmg:26,cd:2.5,count:1,area:1},ups:['dmg','count','area','cd'],
    evo:{relic:'bell',n:'审判之雷',d:'每道雷霆都会在亡者间连锁跳跃。'}},
  aura:{n:'圣焰荆冠',el:'fire',icon:'aura',d:'灼烧身边的亡者。',
    base:{dmg:5,cd:.5,area:1},ups:['dmg','area','cd'],
    evo:{relic:'ember',n:'炼狱冠冕',d:'火环范围翻倍，被灼烧者死亡时爆炸。'}},
  scythe:{n:'亡者镰刀',el:'dark',icon:'scythe',d:'掷出回旋镰刀，命中施加诅咒。',
    base:{dmg:18,cd:2.3,count:1,area:1},ups:['dmg','count','area','cd'],
    evo:{relic:'seed',n:'死神收割',d:'镰刀永久环绕你旋转并不断回旋。'}},
  frost:{n:'霜魂丧钟',el:'frost',icon:'frost',d:'敲响丧钟，放出冰环冻结亡者。',
    base:{dmg:10,cd:3.2,area:1,stack:1},ups:['dmg','area','cd','stack'],
    evo:{relic:'frostheart',n:'永冬挽钟',d:'冰环连续扩散三次，必定冻结。'}},
};
const UPN={dmg:'伤害',count:'数量',pierce:'穿透',cd:'冷却',area:'范围',speed:'速度',stack:'冰霜层数'};
function upAmount(stat,base,m){
  switch(stat){
    case'dmg':return base.dmg*.22*m;
    case'count':return m>=3?2:1;
    case'pierce':return m>=2.2?2:1;
    case'cd':return Math.min(.25,.07*m);
    case'area':return .1*m;
    case'speed':return .12*m;
    case'stack':return m>=2.2?2:1;
  }return 0}
function upText(stat,v){
  if(stat==='dmg')return`伤害 +${v.toFixed(1)}`;if(stat==='cd')return`冷却 -${Math.round(v*100)}%`;
  if(stat==='area')return`范围 +${Math.round(v*100)}%`;if(stat==='speed')return`速度 +${Math.round(v*100)}%`;
  return`${UPN[stat]} +${v}`}

/* 典籍：升级时出现的属性强化 */
const TOMES={
  t_dmg:{n:'力量典籍',icon:'tome',s:'dmg',v:.08,f:v=>`全部伤害 +${Math.round(v*100)}%`},
  t_cd:{n:'迅捷典籍',icon:'hourglass',s:'cdr',v:.05,f:v=>`武器冷却 -${Math.round(v*100)}%`},
  t_area:{n:'辉光典籍',icon:'eye',s:'area',v:.08,f:v=>`攻击范围 +${Math.round(v*100)}%`},
  t_spd:{n:'鸦步典籍',icon:'boots',s:'spd',v:.06,f:v=>`移动速度 +${Math.round(v*100)}%`},
  t_hp:{n:'血肉典籍',icon:'heart',s:'hp',v:15,f:v=>`生命上限 +${Math.round(v)}`},
  t_crit:{n:'处刑典籍',icon:'whetstone',s:'crit',v:.04,f:v=>`暴击率 +${Math.round(v*100)}%`},
  t_luck:{n:'命运典籍',icon:'clover',s:'luck',v:.08,f:v=>`幸运 +${Math.round(v*100)}%（稀有度更高）`},
  t_mag:{n:'引魂典籍',icon:'magnet',s:'mag',v:.2,f:v=>`拾取范围 +${Math.round(v*100)}%`},
  t_xp:{n:'智慧典籍',icon:'candle',s:'xp',v:.08,f:v=>`经验获取 +${Math.round(v*100)}%`},
  t_armor:{n:'铁甲典籍',icon:'armor',s:'armor',v:1,f:v=>`护甲 +${v.toFixed(1)}`},
};

/* 遗物：宝箱 / 祭坛获得，带有触发效果，可叠加 */
const RELICS={
  whetstone:{r:0,n:'磨刀石',icon:'whetstone',d:'暴击率 +7%。'},
  feather:{r:0,n:'渡鸦羽',icon:'feather',d:'移速 +6%，冲刺冷却 -10%。'},
  boneshield:{r:0,n:'骨盾',icon:'boneshield',d:'护甲 +1.5（每次受伤减免）。'},
  holywater:{r:0,n:'圣水瓶',icon:'holywater',d:'每秒回复 0.4 生命。'},
  coinpurse:{r:0,n:'守墓人钱袋',icon:'coinpurse',d:'金币获取 +25%。'},
  candle:{r:0,n:'长明烛',icon:'candle',d:'拾取范围 +25%，经验 +5%。'},
  fang:{r:1,n:'吸血獠牙',icon:'fang',d:'命中时 4% 几率回复 1 生命。'},
  ember:{r:1,n:'余烬之戒',icon:'ember',d:'命中时 10% 几率施加灼烧。'},
  frostheart:{r:1,n:'霜之心',icon:'frostheart',d:'命中时 10% 几率叠加冰霜。'},
  seed:{r:1,n:'腐尸之种',icon:'seed',d:'亡者死亡时 20% 几率爆炸，造成其最大生命 25% 的范围伤害。'},
  spurs:{r:1,n:'疾影马刺',icon:'spurs',d:'冲刺穿过的亡者受到 40 点伤害并被灼烧。'},
  lens:{r:1,n:'猎魔透镜',icon:'lens',d:'对精英与首领伤害 +20%。'},
  bell:{r:2,n:'雷鸣钟',icon:'bell',d:'每第 12 次命中，释放跳跃 5 次的连锁闪电。'},
  codex:{r:2,n:'诅咒圣典',icon:'codex',d:'命中时 10% 几率诅咒（受伤 +25%，死亡传染）。'},
  mirror:{r:2,n:'镜之碎片',icon:'mirror',d:'投射物击杀亡者时分裂出 2 枚碎片。'},
  thorns:{r:2,n:'荆棘圣衣',icon:'thorns',d:'受伤时对周围造成 300% 反伤并击退。'},
  stopwatch:{r:2,n:'凝滞怀表',icon:'hourglass',d:'每 30 秒，时间凝滞 3 秒。'},
  pact:{r:3,n:'死神契约',icon:'pact',d:'伤害 ×1.6，但生命上限 -40%。',curse:1},
  phoenix:{r:3,n:'不死鸟之羽',icon:'phoenix',d:'死亡时复活并回复 50% 生命（消耗）。'},
  crown:{r:3,n:'血月王冠',icon:'crown',d:'每次击杀永久 +0.04% 伤害（本局）。'},
  saint:{r:3,n:'圣徒之心',icon:'saint',d:'生命全满时，伤害 +35%。'},
  grail:{r:3,n:'永夜圣杯',icon:'chalice',d:'大招充能 ×2，释放大招时回复 30% 生命。'},
};

const HUNTERS={
  warden:{n:'灯守',t:'圣焰的守夜人',icon:'lantern',w:'aura',coat:0x2a2234,acc:0xc9a35a,
    p:'生命上限 +30，护甲 +1。',hp:130,armor:1,
    ult:{n:'圣光审判',d:'以灯为心引爆圣光，焚烧 14 米内所有亡者。'}},
  heir:{n:'血裔',t:'背弃家族的吸血伯爵',icon:'blood',w:'orbit',coat:0x3a0f18,acc:0xff3050,
    p:'击杀时 4% 几率回复 2 生命；出血伤害 +50%。',hp:100,armor:0,
    ult:{n:'血宴',d:'6 秒内持续抽取周身亡者的血，按命中数回复生命。'}},
  raven:{n:'鸦刃',t:'无声的暗夜刺客',icon:'raven',w:'dagger',coat:0x161a24,acc:0x8fa8ff,
    p:'冲刺冷却 -40%，暴击 +10%，可二段跳。',hp:90,armor:0,
    ult:{n:'鸦群风暴',d:'释放 36 只暗影渡鸦螺旋飞出，穿透一切。'}},
};
const DIFFS=[
  {id:'dusk',n:'黄昏',d:'亡者更脆弱，适合初次狩猎',hp:.7,dmg:.65,spawn:.85,gold:1},
  {id:'night',n:'永夜',d:'标准的挽歌',hp:1,dmg:1,spawn:1,gold:1},
  {id:'blood',n:'血月',d:'亡者更强更多，金币 +30%',hp:1.6,dmg:1.4,spawn:1.3,gold:1.3},
];
const FAMS={
  bat:{n:['夜蝠','吸血蝠王','夜之君主'],icon:'bat',d:'远程音波，进化后命中吸血。',el:'blood'},
  hound:{n:['骨犬','地狱犬','三首冥犬'],icon:'hound',d:'扑咬近处的亡者，进化后附带灼烧。',el:'fire'},
  wisp:{n:['鬼火','魂灯','冥火之灵'],icon:'wisp',d:'放出追踪鬼火诅咒亡者，最终形态附带冰霜。',el:'dark'},
};
const FAM_EVO=[120,400];

/* 亡者 */
const ENEMIES={
  ghoul:{n:'食尸鬼',kind:'ghoul',hp:8,spd:2.2,dmg:6,r:.55,xp:1,y:0,col:0x5a6a50},
  bat:{n:'吸血蝠',kind:'bat',hp:5,spd:4.1,dmg:4,r:.45,xp:1,y:1.3,col:0x3a1a2a,fly:1},
  knight:{n:'骸骨骑士',kind:'knight',hp:48,spd:1.7,dmg:12,r:.8,xp:5,y:0,col:0xcfc4a8},
  wraith:{n:'怨灵',kind:'wraith',hp:28,spd:3,dmg:10,r:.6,xp:3,y:.2,col:0x9a8ac8,ghost:1},
  penitent:{n:'苦修者',kind:'ghoul',hp:18,spd:2.6,dmg:8,r:.6,xp:2,y:0,col:0x8a7a60,tint:0x9a8a6a,sc:1.15},
  gargoyle:{n:'石像鬼',kind:'bat',hp:30,spd:3.2,dmg:10,r:.7,xp:3,y:1.6,col:0x6a6a72,tint:0x7a7a84,sc:1.7,fly:1},
  bloodghoul:{n:'血尸',kind:'ghoul',hp:30,spd:2.8,dmg:11,r:.6,xp:2,y:0,col:0x9a2030,tint:0xa02a38,sc:1.1},
  hellknight:{n:'狱火骑士',kind:'knight',hp:95,spd:1.9,dmg:16,r:.85,xp:7,y:0,col:0xff5020,tint:0x5a1a10,sc:1.1},
};
const BOSSES={
  colossus:{n:'守墓巨像',kind:'knight',hp:2600,spd:1.9,dmg:22,r:2.2,sc:3,tint:0x3a3c46,col:0xcfc4a8},
  bishop:{n:'堕落主教',kind:'wraith',hp:5200,spd:2.2,dmg:24,r:2,sc:2.8,tint:0xb08ad8,col:0xc070ff},
  lord:{n:'血月领主',kind:'lord',hp:9000,spd:2.1,dmg:28,r:2.1,sc:1.2,col:0xff2030},
};
const STAGES=[
  {id:'grave',n:'月下墓园',sub:'第一层',fog:0x2a2040,fogD:.019,hemi:[0x9a88d0,0x2a1a2a,.8],moon:0xd0c0ff,moonI:1.05,
    ground:{bg:'#1a1420',hue:[262,292],sat:14,light:[17,26],moss:'40,60,30',stain:'90,0,10',style:'flag'},amp:1.4,wall:0x3a3540,
    decor:{tomb:70,cross:30,tree:26,pillar:14,arch:6,candle:36,fence:16},
    roster:[['ghoul',0,10],['bat',20,6],['knight',80,3],['wraith',150,3]],boss:'colossus',mul:1},
  {id:'cathedral',n:'腐朽大教堂',sub:'第二层',fog:0x1e2438,fogD:.017,hemi:[0x8a9ad8,0x1a1e2a,.85],moon:0xb8c8ff,moonI:1,
    ground:{bg:'#1a1a24',hue:[218,240],sat:12,light:[19,29],moss:'30,40,60',stain:'60,10,60',style:'checker'},amp:.5,wall:0x2e3040,
    decor:{pillar:40,pew:40,candle:50,arch:10,tomb:10,glass:14,statue:10},
    roster:[['penitent',0,10],['gargoyle',25,5],['wraith',60,5],['knight',100,3]],boss:'bishop',mul:2.1},
  {id:'abyss',n:'血池深渊',sub:'第三层',fog:0x34121c,fogD:.019,hemi:[0xd08090,0x2a0c10,.8],moon:0xff9a8a,moonI:1,
    ground:{bg:'#22100f',hue:[350,368],sat:34,light:[15,23],moss:'60,0,10',stain:'160,0,20',style:'rock'},amp:2,wall:0x3a1a1e,
    decor:{spike:50,cage:14,tree:20,pool:14,candle:30,bones:40,pillar:10},
    roster:[['bloodghoul',0,10],['bat',0,6],['hellknight',70,3],['wraith',110,4]],boss:'lord',mul:4},
];
const STAGE_T=300; // 秒：首领被强制召唤的时间
const POI_INFO={
  chest:{n:'宝箱',icon:'coin',c:'#ffc060',d:'花费金币开启，获得一件遗物。'},
  charge:{n:'充能神龛',icon:'shrine',c:'#8fe3ff',d:'站在光圈内充能，完成后选择一项祝福。'},
  blood:{n:'血之祭坛',icon:'blood',c:'#ff4a62',d:'献出 25% 生命，换取一件稀有以上的遗物。'},
  curse:{n:'诅咒方尖碑',icon:'obelisk',c:'#c77dff',d:'亡者永久变强 12%，立即召来精英群；击败后得宝箱。'},
  nest:{n:'眷属之巢',icon:'nest',c:'#7dffb0',d:'孵化一只眷属伙伴，或喂养已有的眷属。'},
  boss:{n:'首领祭坛',icon:'altar',c:'#ff3050',d:'提前召唤本层首领。击败首领开启通往下一层的门。'},
  portal:{n:'深渊之门',icon:'portal',c:'#ff6a7a',d:'进入下一层。'},
};
const ACH={
  first:{n:'初次狩猎',d:'完成一局游戏'},
  k500:{n:'百鬼斩',d:'单局击杀 500 名亡者'},
  k2000:{n:'千魂收割',d:'单局击杀 2000 名亡者'},
  shatter:{n:'碎冰者',d:'单局触发 50 次碎冰反应'},
  evo:{n:'圣器觉醒',d:'进化一把武器'},
  fam:{n:'眷属之主',d:'将眷属进化到最终形态'},
  stage2:{n:'深入教堂',d:'抵达腐朽大教堂'},
  dawn:{n:'黎明降临',d:'击败血月领主'},
  bloodmoon:{n:'血月征服者',d:'在血月难度下通关'},
  rich:{n:'守墓人的财富',d:'单局获得 500 金币'},
};

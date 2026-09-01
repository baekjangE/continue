const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const boot=$("#boot"),yes=$("#yes"),no=$("#no"),locked=$("#locked"),warning=$("#warning");
const bgm=$("#bgm"); bgm.volume=.45;
function musicTry(){bgm.play().catch(()=>{})} musicTry();
["pointerdown","keydown","touchstart"].forEach(e=>addEventListener(e,()=>{if(bgm.paused&&bgm.currentTime===0)musicTry()},{once:true}));
yes.onclick=()=>{boot.classList.remove("accepted");void boot.offsetWidth;boot.classList.add("accepted");musicTry();setTimeout(()=>boot.classList.add("off"),430);setTimeout(()=>{
  const box=warning.querySelector(".warning-box");
  box.classList.remove("glitch","glitch-in");
  void box.offsetWidth;
  box.classList.add("glitch-in");
  warning.classList.add("show");
  setTimeout(()=>box.classList.remove("glitch-in"),620);
},900)}
no.onclick=()=>{if(no.dataset.l)return;no.dataset.l=1;locked.classList.add("show");no.textContent="LOCKED";boot.classList.remove("denied");void boot.offsetWidth;boot.classList.add("denied");musicTry();setTimeout(()=>$(".choices").classList.add("locked"),430);/* ACCESS DENIED remains visible after NO is locked */}
$("#warningX").onclick=()=>{let b=$(".warning-box");b.classList.add("glitch");setTimeout(()=>{warning.classList.remove("show");b.classList.remove("glitch")},620)}
$("#mapOpen").onclick=()=>$("#mapModal").classList.add("show"); $("#mapX").onclick=()=>$("#mapModal").classList.remove("show"); $("#mapModal .shade").onclick=()=>$("#mapModal").classList.remove("show");
$("#pp").onclick=()=>bgm.paused?bgm.play():bgm.pause();$("#stop").onclick=()=>{bgm.pause();bgm.currentTime=0};$("#vol").oninput=e=>{bgm.volume=+e.target.value;bgm.muted=false};$("#mute").onclick=()=>bgm.muted=!bgm.muted;bgm.onplay=()=>$("#pp").textContent="Ⅱ";bgm.onpause=()=>$("#pp").textContent="▶";
const kd={
eden:["FILE // FR-01","EDEN","FRANCE","능글맞고 냉소적인 킬러. 소리에 민감하며, 빠르고 정확한 공격으로 플레이어를 단칼에 죽인다.","신속 / 정확","CENTRAL [마을 중심]","KILLER","portraits/eden.png"],
ash:["FILE // RU-02","ASH","RUSSIA","압도적인 체격과 짐승 같은 괴력을 가진 킬러. 어둡고 조용한 장소에 홀로 머무는 경우가 많다.","괴력 / 돌진","OUTSKIRTS [마을 외곽]","KILLER","portraits/ash.png"],
vincent:["FILE // UK-03","VINCENT","UNITED KINGDOM","정중한 태도와 차분한 말투를 유지하는 킬러. 빠른 죽음보다 오래 이어지는 저항과 반응을 선호한다.","통제 / 지연","CENTRAL [마을 중심]","KILLER","portraits/vincent.png"],
kits:["FILE // DE-04","KITS","GERMANY","호기심과 충동에 따라 움직이는 변덕스러운 흡혈귀. 추격과 사냥을 놀이처럼 즐긴다.","변덕 / 추격","CATHEDRAL [성당 구역]","KILLER","portraits/kits.png"],
kamiya:["FILE // JP-05","KAMIYA REN","JAPAN","신중하고 침착한 플레이어. 위험을 피해 움직이며, 주변 상황을 예민하게 살피고 필요한 물자를 확보하며 생존한다.","계산 / 배신","UNKNOWN [알 수 없음]","PLAYER","portraits/kamiya-ren.png"]
};
$$(".tabs button[data-k]").forEach(b=>b.onclick=()=>{
  let d=kd[b.dataset.k];
  ["#kf","#kn","#ko","#kd","#ks","#kr","#krole"].forEach((x,i)=>$(x).textContent=d[i]);
  const portrait=$("#killerPortrait"); portrait.src=d[7]; portrait.alt=d[1];
  $$(".tabs button[data-k]").forEach(x=>x.classList.toggle("selected",x===b));
});
const deletedWarning=$("#deletedKillerWarning"), deletedBtn=$("#deletedKillerBtn");
function openDeletedWarning(){
  deletedBtn.classList.remove("locked-flash"); void deletedBtn.offsetWidth; deletedBtn.classList.add("locked-flash");
  const box=deletedWarning.querySelector(".warning-box");
  box.classList.remove("glitch","glitch-in"); void box.offsetWidth; box.classList.add("glitch-in");
  deletedWarning.classList.add("show"); deletedWarning.setAttribute("aria-hidden","false");
  setTimeout(()=>box.classList.remove("glitch-in"),620);
}
function closeDeletedWarning(){
  const box=deletedWarning.querySelector(".warning-box");
  box.classList.remove("glitch-in"); void box.offsetWidth; box.classList.add("glitch");
  setTimeout(()=>{deletedWarning.classList.remove("show");deletedWarning.setAttribute("aria-hidden","true");box.classList.remove("glitch")},620);
}
deletedBtn.onclick=openDeletedWarning;
$("#deletedKillerX").onclick=closeDeletedWarning;
$("#deletedKillerWarning .shade").onclick=closeDeletedWarning;
// Zone gallery handlers are defined below.
const c=$("#rain"),ctx=c.getContext("2d");let drops=[],on=true;function resize(){c.width=innerWidth*devicePixelRatio;c.height=innerHeight*devicePixelRatio;c.style.width=innerWidth+"px";c.style.height=innerHeight+"px";ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);drops=Array.from({length:Math.floor(innerWidth/6.4)},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,l:34+Math.random()*42,s:14+Math.random()*10,a:.055+Math.random()*.13,w:.55+Math.random()*1.15}))}function rain(){ctx.clearRect(0,0,innerWidth,innerHeight);if(on)drops.forEach(d=>{ctx.beginPath();ctx.moveTo(d.x,d.y);ctx.lineTo(d.x+d.w*5,d.y+d.l);ctx.strokeStyle=`rgba(220,232,228,${d.a})`;ctx.lineWidth=.42+Math.random()*.34;ctx.stroke();d.x+=d.w;d.y+=d.s;if(d.y>innerHeight+50){d.y=-60;d.x=Math.random()*innerWidth}});requestAnimationFrame(rain)}resize();rain();onresize=resize;$("#rainBtn").onclick=()=>{$("#rainBtn").textContent=`RAIN // ${(on=!on)?"ON":"OFF"}`};
const cur=$("#cursor");onmousemove=e=>{cur.style.left=e.clientX+"px";cur.style.top=e.clientY+"px"};$$("a,button,input").forEach(x=>{x.onmouseenter=()=>cur.classList.add("hover");x.onmouseleave=()=>cur.classList.remove("hover")});onmousedown=()=>cur.classList.add("click");onmouseup=()=>cur.classList.remove("click");

// Fixed numbered page rail: highlight the section currently in view.
const railLinks = $$('.page-rail a');
const railSections = [
  {id:'top', el:$('.hero')},
  {id:'world', el:$('#world')},
  {id:'killers', el:$('#killers')},
  {id:'system', el:$('#system')},
  {id:'test', el:$('#test')},
  {id:'farewell', el:$('#farewell')}
].filter(x=>x.el);
const setRailActive = id => railLinks.forEach(a=>a.classList.toggle('active',a.dataset.target===id));
const railObserver = new IntersectionObserver(entries=>{
  const visible = entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
  if(visible) setRailActive(visible.target.dataset.railId);
},{threshold:[.22,.4,.6],rootMargin:'-18% 0px -18% 0px'});
railSections.forEach(x=>{x.el.dataset.railId=x.id;railObserver.observe(x.el)});

// Village zone image archive
const zoneImages = {
  CENTRAL: [
    ['zones/central-square.png','광장'],
    ['zones/central-shops.png','상점가'],
    ['zones/central-general-store.png','잡화점'],
    ['zones/central-manors.png','저택가'],
    ['zones/central-residential.png','주택가']
  ],
  CATHEDRAL: [
    ['zones/cathedral-gothic.png','고딕 성당'],
    ['zones/cathedral-graveyard.png','성당 묘지']
  ],
  INDUSTRIAL: [
    ['zones/industrial-factory.png','공장'],
    ['zones/industrial-warehouse-street.png','창고 거리'],
    ['zones/industrial-warehouse.png','창고'],
    ['zones/industrial-sewer.png','지하수로']
  ],
  SLUM: [
    ['zones/slum-slum.png','빈민가'],
    ['zones/slum-back-alley.png','뒷골목'],
    ['zones/slum-abandoned-house.png','폐가']
  ],
  OUTSKIRTS: [
    ['zones/outskirts-riverside.png','강변'],
    ['zones/outskirts-cemetery.png','공동묘지'],
    ['zones/outskirts-fog-forest.png','안개숲']
  ]
};
const zoneGallery = $('#zoneGallery');
const imageModal = $('#imageModal');
const imageModalImg = $('#imageModalImg');
const imageModalCaption = $('#imageModalCaption');
function openImageModal(src, title){
  imageModalImg.src = src;
  imageModalImg.alt = title;
  imageModalCaption.textContent = title;
  imageModal.classList.add('show');
  imageModal.setAttribute('aria-hidden','false');
}
function closeImageModal(){
  imageModal.classList.remove('show');
  imageModal.setAttribute('aria-hidden','true');
}
function renderZone(name){
  zoneGallery.innerHTML='';
  (zoneImages[name]||[]).forEach(([src,title],i)=>{
    const button=document.createElement('button');
    button.className='zone-photo';
    button.type='button';
    button.innerHTML=`<img src="${src}" alt="${title}" loading="lazy"><span><b>${String(i+1).padStart(2,'0')}</b>${title}<em>EXPAND ↗</em></span>`;
    button.addEventListener('click',()=>openImageModal(src,title));
    button.addEventListener('mouseenter',()=>cur.classList.add('hover'));
    button.addEventListener('mouseleave',()=>cur.classList.remove('hover'));
    zoneGallery.appendChild(button);
  });
}
$$('.areas button').forEach(b=>b.addEventListener('click',()=>{
  $$('.areas button').forEach(x=>x.classList.remove('active'));
  b.classList.add('active');
  $('#areaText').textContent=b.dataset.t;
  renderZone(b.dataset.n);
}));
$('#imageModalX').addEventListener('click',closeImageModal);
$('#imageModal .shade').addEventListener('click',closeImageModal);
renderZone('CENTRAL');

// Every image popup can be dismissed with ESC.
window.addEventListener('keydown',e=>{
  if(e.key!=='Escape') return;
  if(imageModal.classList.contains('show')) closeImageModal();
  if($('#mapModal').classList.contains('show')) $('#mapModal').classList.remove('show');
  if(deletedWarning.classList.contains('show')) closeDeletedWarning();
});


// 04 / ESCAPE ATTEMPT — maze mini game.
// Every NEW ATTEMPT has a 30% chance of generating a genuine escape route.
const mazeCanvas = $('#mazeCanvas');
const mazeCtx = mazeCanvas.getContext('2d');
const mazeN = 15;
const mazeCell = mazeCanvas.width / mazeN;
let mazeGrid = [];
let mazePlayer = {x:0,y:0};
let mazeExit = {x:mazeN-1,y:mazeN-1};
let mazeAttempt = 0;
let mazeSteps = 0;
let mazeDeaths = 0;
let mazeEnded = false;
let mazeIsEscapable = false;
let mazeKiller = {x:mazeN-1,y:0};
let mazeKillerAwake = false;

function mazeCellAt(x,y){ return mazeGrid[y]?.[x]; }
function generatePerfectMaze(){
  mazeGrid = Array.from({length:mazeN},(_,y)=>Array.from({length:mazeN},(_,x)=>({x,y,seen:false,w:[1,1,1,1]})));
  const stack=[mazeGrid[0][0]];
  stack[0].seen=true;
  while(stack.length){
    const c=stack[stack.length-1];
    const opts=[];
    [[0,-1,0,2],[1,0,1,3],[0,1,2,0],[-1,0,3,1]].forEach(([dx,dy,a,b])=>{
      const n=mazeCellAt(c.x+dx,c.y+dy);
      if(n && !n.seen) opts.push([n,a,b]);
    });
    if(!opts.length){stack.pop();continue;}
    const [n,a,b]=opts[Math.floor(Math.random()*opts.length)];
    c.w[a]=0;n.w[b]=0;n.seen=true;stack.push(n);
  }
  mazeGrid.flat().forEach(c=>c.seen=false);
}
function sealFakeExit(){
  // In the 70% false-attempt maps, EXIT is visually present but fully sealed.
  const e=mazeCellAt(mazeExit.x,mazeExit.y);
  if(!e) return;
  e.w=[1,1,1,1];
  const left=mazeCellAt(mazeExit.x-1,mazeExit.y);
  const up=mazeCellAt(mazeExit.x,mazeExit.y-1);
  if(left) left.w[1]=1;
  if(up) up.w[2]=1;
}
function mazeNeighbors(pos){
  const c=mazeCellAt(pos.x,pos.y), out=[];
  if(!c) return out;
  [[0,-1,0],[1,0,1],[0,1,2],[-1,0,3]].forEach(([dx,dy,wi])=>{if(!c.w[wi])out.push({x:pos.x+dx,y:pos.y+dy});});
  return out;
}
function mazeKillerStep(){
  if(!mazeKillerAwake || mazeEnded) return;
  const q=[mazeKiller], prev=new Map([[`${mazeKiller.x},${mazeKiller.y}`,null]]);
  let found=null;
  while(q.length){
    const p=q.shift();
    if(p.x===mazePlayer.x && p.y===mazePlayer.y){found=p;break;}
    mazeNeighbors(p).forEach(n=>{const k=`${n.x},${n.y}`;if(!prev.has(k)){prev.set(k,p);q.push(n);}});
  }
  if(found){
    const path=[];let p=found;
    while(p){path.push(p);p=prev.get(`${p.x},${p.y}`);}
    path.reverse();
    if(path[1]) mazeKiller={...path[1]};
  }
}
function updateMazeStatus(label='ALIVE'){
  $('#mazeStatus').innerHTML=`ATTEMPT // ${String(mazeAttempt).padStart(3,'0')}<br>STATUS // ${label}<br>STEPS // ${mazeSteps}<br>DEATHS // ${mazeDeaths}`;
}
function drawMaze(){
  const ctx=mazeCtx, C=mazeCell;
  ctx.fillStyle='#050706';ctx.fillRect(0,0,mazeCanvas.width,mazeCanvas.height);
  ctx.strokeStyle='rgba(199,205,201,.25)';ctx.lineWidth=1.4;
  mazeGrid.flat().forEach(c=>{
    const x=c.x*C,y=c.y*C;ctx.beginPath();
    if(c.w[0]){ctx.moveTo(x,y);ctx.lineTo(x+C,y)}
    if(c.w[1]){ctx.moveTo(x+C,y);ctx.lineTo(x+C,y+C)}
    if(c.w[2]){ctx.moveTo(x,y+C);ctx.lineTo(x+C,y+C)}
    if(c.w[3]){ctx.moveTo(x,y);ctx.lineTo(x,y+C)}
    ctx.stroke();
  });
  ctx.font='600 12px "IBM Plex Mono", monospace';ctx.fillStyle='#8e2929';ctx.fillText('EXIT',mazeExit.x*C+3,mazeExit.y*C+22);
  if(mazeKillerAwake){ctx.fillStyle='#8d2424';ctx.beginPath();ctx.arc((mazeKiller.x+.5)*C,(mazeKiller.y+.5)*C,6.5,0,Math.PI*2);ctx.fill();}
  ctx.fillStyle='#d4d8d5';ctx.beginPath();ctx.arc((mazePlayer.x+.5)*C,(mazePlayer.y+.5)*C,5.5,0,Math.PI*2);ctx.fill();
}
function showMazeOverlay(html, victory=false){
  const o=$('#mazeOverlay');o.innerHTML=html;o.classList.toggle('victory',victory);o.classList.add('show');
}
function hideMazeOverlay(){const o=$('#mazeOverlay');o.classList.remove('show','victory');o.innerHTML='';}
function mazeDeath(message='YOU WERE FOUND.'){
  mazeDeaths++;
  mazeEnded=true;updateMazeStatus('DEAD');drawMaze();
  showMazeOverlay(`<div><strong>YOU DIED.</strong><small>${message}</small><button id="mazeContinue" type="button">CONTINUE?</button></div>`);
  setTimeout(()=>{const b=$('#mazeContinue');if(b)b.addEventListener('click',newMazeAttempt);},0);
}
function mazeVictory(){
  mazeEnded=true;updateMazeStatus('ESCAPED');drawMaze();
  showMazeOverlay(`<div><strong>CONGRATULATIONS.</strong><small class="victory-copy">YOU ABANDONED THE ONE YOU LOVE.</small><small class="victory-ko">당신은 사랑하는 사람을 버렸습니다.</small><em>ESCAPE CONFIRMED.</em></div>`,true);
}
function newMazeAttempt(){
  mazeAttempt++;mazeSteps=0;mazeEnded=false;mazeKillerAwake=false;
  mazeIsEscapable=Math.random()<0.30;
  generatePerfectMaze();
  mazePlayer={x:0,y:0};mazeExit={x:mazeN-1,y:mazeN-1};mazeKiller={x:mazeN-1,y:0};
  if(!mazeIsEscapable) sealFakeExit();
  hideMazeOverlay();updateMazeStatus('ALIVE');drawMaze();
}
function moveMaze(dx,dy){
  if(mazeEnded) return;
  const c=mazeCellAt(mazePlayer.x,mazePlayer.y);
  const wi=dx===1?1:dx===-1?3:dy===1?2:0;
  if(!c || c.w[wi]) return;
  mazePlayer.x+=dx;mazePlayer.y+=dy;mazeSteps++;
  if(mazePlayer.x===mazeExit.x && mazePlayer.y===mazeExit.y){
    if(mazeIsEscapable) mazeVictory(); else mazeDeath('THIS IS NOT AN EXIT.');
    return;
  }
  if(mazeSteps>=9) mazeKillerAwake=true;
  if(mazeKillerAwake && mazeSteps%2===0) mazeKillerStep();
  if(mazePlayer.x===mazeKiller.x && mazePlayer.y===mazeKiller.y){mazeDeath();return;}
  updateMazeStatus('ALIVE');drawMaze();
}
$('#mazeReset').addEventListener('click',newMazeAttempt);
$$('.maze-dpad button').forEach(b=>b.addEventListener('click',()=>moveMaze(...b.dataset.move.split(',').map(Number))));
window.addEventListener('keydown',e=>{
  if(mazeEnded || imageModal.classList.contains('show') || $('#mapModal').classList.contains('show')) return;
  const map={ArrowUp:[0,-1],w:[0,-1],W:[0,-1],ArrowDown:[0,1],s:[0,1],S:[0,1],ArrowLeft:[-1,0],a:[-1,0],A:[-1,0],ArrowRight:[1,0],d:[1,0],D:[1,0]};
  if(map[e.key]){e.preventDefault();moveMaze(...map[e.key]);}
});
newMazeAttempt();

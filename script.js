(function(){
"use strict";
const $=(s,c)=>(c||document).querySelector(s), $$=(s,c)=>[...(c||document).querySelectorAll(s)];
const store={get(k){try{return localStorage.getItem(k)||""}catch(e){return ""}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;

const NAME="Anieza";
$$(".who").forEach(e=>e.textContent=NAME);
document.title=`Untuk ${NAME} ♡`;
function hide(el){el.classList.add("is-hidden");setTimeout(()=>el.style.display="none",650)}

const fx=$("#fx");
function hearts(x,y,n){for(let i=0;i<n;i++){const h=document.createElement("span");h.textContent="♡";
  h.style.cssText=`left:${x+(Math.random()*60-30)}px;top:${y}px;font-size:${1+Math.random()*1.2}rem;--dx:${Math.random()*80-40}px`;
  fx.appendChild(h);setTimeout(()=>h.remove(),1000)}}
document.addEventListener("pointerdown",e=>{if(!e.target.closest("input,.hugbtn")&&!reduce)hearts(e.clientX,e.clientY,1)});

const audio=$("#audio"), mb=$("#music-btn");
const mf=$("#music-float");
audio.volume=.6;
function setMusic(on){[mb,mf].forEach(b=>{if(b)b.textContent=on?"❚❚":"♪"});if(mf)mf.classList.toggle("on",on)}
function playMusic(){return audio.play().then(()=>setMusic(true)).catch(()=>{})}
function toggleMusic(){if(!audio.paused){audio.pause();setMusic(false)}else playMusic()}
if(mb)mb.addEventListener("click",toggleMusic);
if(mf)mf.addEventListener("click",toggleMusic);
const asrc=$("#audio source");
if(asrc)asrc.addEventListener("error",()=>{if(mf)mf.hidden=true;if(mb)mb.hidden=true});

$("#open-btn").addEventListener("click",()=>{
  hearts(innerWidth/2,innerHeight/2,12);
  playMusic();
  const o=$("#opening");hide(o);
  $("#site").hidden=false;document.body.classList.add("in-site");scrollTo(0,0);reveal();
});

const tb=$("#theme-btn"), root=document.documentElement;
function theme(t){root.setAttribute("data-theme",t);tb.textContent=t==="dark"?"☀":"☾"}
theme(store.get("ofp_theme")||"dark");
tb.addEventListener("click",()=>{
  const cur=root.getAttribute("data-theme")||"dark";
  const n=cur==="dark"?"light":"dark";theme(n);store.set("ofp_theme",n)});

function reveal(){
  const t=$$(".sec h2,.sec .lead,.reasons li,.tl li,.shot,.quote,.hugwrap,.env,.stats div,.pr,.flip,.arena,.seal,.heartqr");
  const V=["up","left","right","zoom"],SC=$$(".sec");
  t.forEach(e=>{e.classList.add("rv");const sc=e.closest(".sec"),si=sc?SC.indexOf(sc):0;
    if(!e.matches(".shot"))e.dataset.v=V[si%4];
    const sib=sc?$$(".rv",sc):[e];e.style.setProperty("--rd",(Math.min(sib.indexOf(e),8)*.06).toFixed(2)+"s")});
  if(!("IntersectionObserver" in window)){t.forEach(e=>e.classList.add("in"));return}
  const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add("in");if(x.target.matches("h2")){const sc=x.target.closest(".sec");if(sc)sc.classList.add("seen")}io.unobserve(x.target)}}),{threshold:.15});
  t.forEach(e=>io.observe(e));
}

const lb=$("#lightbox");
$$(".shot").forEach(s=>s.addEventListener("click",()=>{const i=$("img",s);
  $("#lb-img").src=i.src;$("#lb-img").alt=i.alt;$("#lb-cap").textContent=s.dataset.cap||"";
  lb.hidden=false;document.body.style.overflow="hidden"}));
function closeLb(){lb.hidden=true;document.body.style.overflow=""}
$("#lb-close").addEventListener("click",closeLb);
lb.addEventListener("click",e=>{if(e.target===lb)closeLb()});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!lb.hidden)closeLb()});

const WORDS=[
 "Anieza, kamu sudah hebat, bahkan di hari yang berat.",
 "Pelan-pelan juga nggak apa-apa. Yang penting kamu tetap jalan.",
 "Istirahat dulu ya. Kamu juga butuh dipeluk.",
 "Aku di sini, walau cuma lewat kata-kata.",
 "Kamu lebih kuat dari yang kamu kira.",
 "Hari ini nggak harus sempurna. Cukup kamu baik-baik saja.",
 "Satu langkah kecil hari ini tetap kuhitung."];
let last=0;const bt=$("#boost-text");
$("#boost-btn").addEventListener("click",e=>{
  bt.classList.add("swap");
  setTimeout(()=>{let i;do{i=Math.floor(Math.random()*WORDS.length)}while(i===last);last=i;
    bt.textContent=WORDS[i];bt.classList.remove("swap")},250);
  const r=e.currentTarget.getBoundingClientRect();hearts(r.left+r.width/2,r.top,6)});

const LETTER=`Hai, Anieza.

Aku cuma mau bilang satu hal.

Kalau suatu hari semuanya terasa berat, ingat ya: kamu sudah berhasil melewati banyak hari yang sulit. Dan aku bangga sama kamu.

Kamu nggak harus selalu kuat.
Nggak harus selalu tersenyum.
Nggak harus selalu sempurna.

Capek ya istirahat.
Siap ya jalan lagi.

Lekas sembuh ya, adekku.
Lain kali hati-hati bawa motornya.
Aku nggak mau kamu kenapa-kenapa.

Kalau kuliah lagi bikin pusing, ingat ya, ada aku yang selalu nyemangatin kamu dari sini.
Dan kalau capek, cerita aja. Aku dengerin.

Apa pun yang sedang kamu hadapi sekarang, semoga selalu ada alasan kecil buat kamu tersenyum.
Dan kalau belum ketemu, kamu boleh pakai aku.

Dari orang yang diam-diam selalu senang kalau ada kamu. ♡`;
const seal=$("#seal"), paper=$("#paper"), lt=$("#letter-text");
seal.addEventListener("click",()=>{
  seal.setAttribute("aria-expanded","true");paper.hidden=false;
  const r=seal.getBoundingClientRect();hearts(innerWidth/2,r.top+80,8);
  if(reduce){lt.textContent=LETTER;return}
  let i=0;(function step(){lt.textContent=LETTER.slice(0,i);i+=2;if(i<=LETTER.length+1)setTimeout(step,22)})();
});

const FACTS=[
 "Ada seseorang yang diam-diam senang karena kamu ada.",
 "Kamu pernah bikin aku senyum, dan kamu sama sekali nggak sadar.",
 "Nama Anieza itu salah satu hal favoritku untuk disebut.",
 "Hari yang lagi kamu jalani sekarang, nanti jadi cerita yang bagus.",
 "Kamu lebih berarti dari yang kamu kira, Anieza. Serius."];
let fi=-1;const flip=$("#flip");
flip.addEventListener("click",()=>{
  if(!flip.classList.contains("is-flipped")){fi=(fi+1)%FACTS.length;$("#flip-text").textContent=FACTS[fi]}
  flip.classList.toggle("is-flipped")});

const end=$(".end");let done=false;
if("IntersectionObserver" in window)new IntersectionObserver(es=>es.forEach(x=>{
  if(x.isIntersecting&&!done&&!reduce){done=true;const r=$("#rise");
    for(let i=0;i<14;i++)setTimeout(()=>{const h=document.createElement("span");h.textContent="♡";
      h.style.cssText=`left:${Math.random()*100}%;bottom:-5%;font-size:${1+Math.random()*1.5}rem;--dx:${Math.random()*60-30}px`;
      r.appendChild(h);setTimeout(()=>h.remove(),6200)},i*180)}
}),{threshold:.4}).observe(end);

const WA_NUMBER="6282281276704";
const waLink=m=>`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(m)}`;
$("#wa-main").href=waLink(`Hai, ini ${NAME}. Aku udah buka hadiahmu, dan aku senyum-senyum sendiri. ♡`);
$("#wa-float").href=waLink(`Hai, ini ${NAME}. Aku mau cerita sesuatu ke kamu. ♡`);

const prog=$("#progress");
addEventListener("scroll",()=>{const m=document.documentElement.scrollHeight-innerHeight;
  prog.style.transform=`scaleX(${m>0?Math.min(scrollY/m,1):0})`},{passive:true});
const petals=$("#petals");
if(!reduce)setInterval(()=>{const p=document.createElement("span");p.textContent=["♡","✿","♡"][Math.floor(Math.random()*3)];
  p.style.cssText=`left:${Math.random()*100}%;font-size:${.8+Math.random()*1.3}rem;--dx:${Math.random()*120-60}px`;
  petals.appendChild(p);setTimeout(()=>p.remove(),15500)},2200);

const hw=$("#hugwrap"), hb=$("#hug-btn"), ht=$("#hug-text"), hr=$("#hug-reply"), warm=$("#warm");
const HUG_MSG=["Pelukannya sampai dengan selamat. Hangatnya sengaja aku kasih lebih 🤗","Peluk lagi ya dek. Habisnya kalau udah meluk kamu, aku jadi lupa lepasinnya.","Udah ah dek, nanti aku kebiasaan. Eh tapi sebentar lagi deh, satu lagi aja 🤍"];
let timer=null,hugs=0;
function burst(){const r=hw.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;
  for(let i=0;i<30;i++){const h=document.createElement("span"),a=Math.random()*Math.PI*2,d=90+Math.random()*190;
    h.className="b";h.textContent=["♡","♥","✿","✦"][i%4];
    h.style.cssText=`left:${cx}px;top:${cy}px;font-size:${1+Math.random()*1.6}rem;--dx:${Math.cos(a)*d}px;--dy:${Math.sin(a)*d}px`;
    fx.appendChild(h);setTimeout(()=>h.remove(),1700)}}
function hugDone(){
  hw.classList.remove("holding");hw.classList.add("hugged");hugs++;
  ht.textContent=HUG_MSG[Math.min(hugs-1,HUG_MSG.length-1)];ht.classList.remove("pop");void ht.offsetWidth;ht.classList.add("pop");
  warm.classList.remove("on");void warm.offsetWidth;warm.classList.add("on");
  if(!reduce)burst();
  if(navigator.vibrate)navigator.vibrate([80,60,80,60,180]);
  hr.hidden=false;hr.href=waLink(`Peluknya udah sampai. Makasih ya. Aku balas peluk balik. 🤗 (dari ${NAME})`);
  setTimeout(()=>hw.classList.remove("hugged"),2000);
}
function hugStart(e){if(e&&e.type==="keydown"&&(e.repeat||!["Enter"," "].includes(e.key)))return;
  if(e&&e.type==="keydown")e.preventDefault();
  if(timer)return;hw.classList.remove("hugged");hw.classList.add("holding");
  ht.textContent="Tahan dek, pelukannya lagi dikirim, jangan dilepas dulu...";
  timer=setTimeout(()=>{timer=null;hugDone()},1600)}
function hugStop(){if(timer){clearTimeout(timer);timer=null;hw.classList.remove("holding");ht.textContent="Yaah kelepasan dek, pelukannya jadi nyasar. Coba lagi ya!"}}
hb.addEventListener("pointerdown",e=>{
  hb.setPointerCapture(e.pointerId);
  hugStart(e);
});
["pointerup","pointercancel","lostpointercapture"].forEach(t=>hb.addEventListener(t,hugStop));
hb.addEventListener("keydown",hugStart);hb.addEventListener("keyup",hugStop);
hb.addEventListener("contextmenu",e=>e.preventDefault());

const df=$("#depth-fill"), dn=$("#depth-num");
function depth(){const m=document.documentElement.scrollHeight-innerHeight,p=m>0?Math.min(scrollY/m,1):0;
  df.style.transform=`scaleY(${p})`;dn.textContent=Math.round(p*40)+" m";root.style.setProperty("--p",p.toFixed(3))}
addEventListener("scroll",depth,{passive:true});

/* pergantian bagian: efek berlebihan dimatikan, cukup isi muncul halus */
let lastSec="";
function sectionChange(id){lastSec=id}
const links=$$(".nav ul a");
if("IntersectionObserver" in window){const so=new IntersectionObserver(es=>es.forEach(x=>{
  if(x.isIntersecting){const m=links.find(a=>a.getAttribute("href")==="#"+x.target.id);
    if(m)links.forEach(a=>a.classList.toggle("on",a===m));sectionChange(x.target.id)}}),{rootMargin:"-45% 0px -50% 0px"});
  $$("#top,#gallery,#why,#boost,#hug,#letter,#timeline,#fact,#when,#game,#stats,#promise,#qr,#wa").forEach(e=>so.observe(e))}
if(!reduce)setInterval(()=>{const b=document.createElement("span"),z=6+Math.random()*16;b.className="bub";
  b.style.cssText=`left:${Math.random()*100}%;--s:${z}px;--dx:${Math.random()*80-40}px`;
  petals.appendChild(b);setTimeout(()=>b.remove(),15500)},1300);

function fixImg(i){
  if(i.dataset.r){i.style.opacity="0";return}
  i.dataset.r="1";const u=i.src.split("?")[0];i.src=u+"?r="+Date.now()}
$$("img").forEach(i=>{i.addEventListener("error",()=>fixImg(i));
  if(i.complete&&i.naturalWidth===0&&i.src.indexOf("data:")!==0)fixImg(i)});

const WHEN=["Nggak apa-apa nangis dulu. Habis itu cuci muka, minum air putih, terus ingat ya: kamu nggak sendirian. Ada aku yang peduli banget sama kamu.",
 "Taruh dulu semuanya. Kamu udah berusaha banyak hari ini. Istirahat ya, besok kita mulai pelan-pelan lagi.",
 "Aku juga kangen. Coba lihat langit, kita lagi lihat langit yang sama. Dan nanti, ayo ketemu.",
 "Pejamin mata, tarik napas pelan. Anggap aja aku lagi nemenin kamu. Selamat tidur, Anieza. Mimpi indah ya."];
const envs=$$(".env"), wm=$("#when-msg");
envs.forEach((b,i)=>b.addEventListener("click",()=>{
  envs.forEach(x=>x.classList.toggle("on",x===b));
  wm.hidden=false;wm.textContent=WHEN[i];wm.classList.remove("pop");void wm.offsetWidth;wm.classList.add("pop");
  const r=b.getBoundingClientRect();hearts(r.left+r.width/2,r.top,5)}));

const arena=$("#arena"), sc=$("#score"), gb=$("#game-btn"), gm=$("#game-msg");
let gs=0, gn=0, gt=null, gend=null, won=false;
function spawn(){const h=document.createElement("button");h.className="fh";h.type="button";h.textContent=["♡","♥","💗"][gn%3];
  h.setAttribute("aria-label","hati");h.style.left=(5+Math.random()*85)+"%";h.style.animationDuration=(3+Math.random()*1.5)+"s";
  h.addEventListener("pointerdown",e=>{e.stopPropagation();if(h.classList.contains("pop")||won)return;
    h.style.top=getComputedStyle(h).top;h.classList.add("pop");sc.textContent=`${++gs} / 10`;setTimeout(()=>h.remove(),300);if(gs>=10)win()});
  h.addEventListener("animationend",()=>{if(!h.classList.contains("pop"))h.remove()});arena.appendChild(h)}
function stopG(){clearInterval(gt);gt=null;clearTimeout(gend);gb.disabled=false;gb.textContent="Main lagi"}
function say(t){gm.textContent=t;gm.classList.remove("pop");void gm.offsetWidth;gm.classList.add("pop")}
function win(){won=true;stopG();$$(".fh",arena).forEach(x=>x.remove());
  say("Yey, semuanya ketangkep! Sama kayak kamu yang udah nangkep hatiku. ♡");
  const r=arena.getBoundingClientRect();if(!reduce)hearts(r.left+r.width/2,r.top+r.height/2,18)}
gb.addEventListener("click",()=>{if(gt)return;gs=0;gn=0;won=false;sc.textContent="0 / 10";gm.textContent="";
  $$(".fh",arena).forEach(x=>x.remove());gb.disabled=true;gb.textContent="Ayo cepat...";
  gt=setInterval(()=>{if(gn>=18){clearInterval(gt);gend=setTimeout(()=>{if(!won){stopG();say("Yah, kelewat beberapa. Coba lagi ya, aku nunggu.")}},4800);return}spawn();gn++},650)});

function countUp(el){const to=+el.dataset.to,t0=performance.now();
  (function f(t){const p=Math.min((t-t0)/1400,1);el.textContent=Math.round(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(t0)}
const nums=$$("[data-to]");
if("IntersectionObserver" in window){const co=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){countUp(x.target);co.unobserve(x.target)}}),{threshold:.6});nums.forEach(n=>co.observe(n))}
else nums.forEach(n=>n.textContent=n.dataset.to);
let secs=0;const se=$("#secs");setInterval(()=>{if(!$("#site").hidden)se.textContent=++secs},1000);

const prs=$$(".pr");
prs.forEach(b=>b.addEventListener("click",()=>{
  b.classList.add("sealed");$("i",b).textContent="✓";const r=b.getBoundingClientRect();hearts(r.left+30,r.top+10,5);
  if(prs.every(x=>x.classList.contains("sealed"))){const d=$("#promise-done");d.hidden=false;d.classList.add("pop");if(!reduce)hearts(innerWidth/2,innerHeight/2,16)}}));

let lastT=0;
document.addEventListener("pointermove",e=>{
  if(e.pointerType!=="mouse"||reduce||!document.body.classList.contains("in-site"))return;
  const n=performance.now();if(n-lastT<70)return;lastT=n;
  const h=document.createElement("span");h.className="t";h.textContent="♡";
  h.style.cssText=`left:${e.clientX}px;top:${e.clientY}px;--dx:${Math.random()*30-15}px`;fx.appendChild(h);setTimeout(()=>h.remove(),900)});
$$(".shot,.env").forEach(el=>{
  el.addEventListener("pointermove",e=>{if(e.pointerType!=="mouse"||reduce)return;
    const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    el.style.transition="transform .12s";el.style.transform=`perspective(600px) rotateY(${x*14}deg) rotateX(${-y*14}deg) scale(1.03)`});
  el.addEventListener("pointerleave",()=>{el.style.transition="";el.style.transform=""})});

/* tambahan: cahaya lembut mengikuti jari / kursor */
addEventListener("pointermove",e=>{root.style.setProperty("--mx",e.clientX+"px");root.style.setProperty("--my",e.clientY+"px")},{passive:true});

/* pembatas ombak antar-bagian + gerak pelan kata bayangan */
(function(){
  const secs=$$(".sec");
  secs.forEach((s,i)=>{if(i===0)return;const d=document.createElement("div");d.className="wdiv";d.setAttribute("aria-hidden","true");s.parentNode.insertBefore(d,s)});
  function par(){const h=innerHeight;secs.forEach(s=>{const r=s.getBoundingClientRect();if(r.bottom<-200||r.top>h+200)return;
    s.style.setProperty("--sy",(((r.top+r.height/2)-h/2)*-.09).toFixed(1)+"px")})}
  if(!reduce){addEventListener("scroll",par,{passive:true});par()}
})();
})();
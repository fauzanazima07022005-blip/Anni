(function(){
"use strict";
const $=(s,c)=>(c||document).querySelector(s), $$=(s,c)=>[...(c||document).querySelectorAll(s)];
const store={get(k){try{return localStorage.getItem(k)||""}catch(e){return ""}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Nama penerima */
const NAME="Anieza";
$$(".who").forEach(e=>e.textContent=NAME);
document.title=`Untuk ${NAME} ♡`;
function hide(el){el.classList.add("is-hidden");setTimeout(()=>el.style.display="none",650)}

/* Hati kecil yang melayang */
const fx=$("#fx");
function hearts(x,y,n){for(let i=0;i<n;i++){const h=document.createElement("span");h.textContent="♡";
  h.style.cssText=`left:${x+(Math.random()*60-30)}px;top:${y}px;font-size:${1+Math.random()*1.2}rem;--dx:${Math.random()*80-40}px`;
  fx.appendChild(h);setTimeout(()=>h.remove(),1000)}}
document.addEventListener("pointerdown",e=>{if(!e.target.closest("input,.hugbtn")&&!reduce)hearts(e.clientX,e.clientY,1)});

/* Musik (tidak autoplay) */
const audio=$("#audio"), mb=$("#music-btn");
if(mb)mb.addEventListener("click",()=>{if(!audio.paused){audio.pause();mb.textContent="♪";return}
  audio.play().then(()=>mb.textContent="❚❚").catch(()=>{})});

/* Buka hadiah */
$("#open-btn").addEventListener("click",()=>{
  hearts(innerWidth/2,innerHeight/2,12);
  const o=$("#opening");hide(o);
  $("#site").hidden=false;document.body.classList.add("in-site");scrollTo(0,0);reveal();
});

/* Tema */
const tb=$("#theme-btn"), root=document.documentElement;
function theme(t){root.setAttribute("data-theme",t);tb.textContent=t==="dark"?"☀":"☾"}
theme(store.get("ofp_theme")||"dark");
tb.addEventListener("click",()=>{
  const cur=root.getAttribute("data-theme")||"dark";
  const n=cur==="dark"?"light":"dark";theme(n);store.set("ofp_theme",n)});

/* Muncul pelan saat digulir */
function reveal(){
  const t=$$(".sec h2,.reasons li,.tl li,.shot");
  t.forEach(e=>e.classList.add("rv"));
  if(!("IntersectionObserver" in window)){t.forEach(e=>e.classList.add("in"));return}
  const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}}),{threshold:.15});
  t.forEach(e=>io.observe(e));
}

/* Foto besar */
const lb=$("#lightbox");
$$(".shot").forEach(s=>s.addEventListener("click",()=>{const i=$("img",s);
  $("#lb-img").src=i.src;$("#lb-img").alt=i.alt;$("#lb-cap").textContent=s.dataset.cap||"";
  lb.hidden=false;document.body.style.overflow="hidden"}));
function closeLb(){lb.hidden=true;document.body.style.overflow=""}
$("#lb-close").addEventListener("click",closeLb);
lb.addEventListener("click",e=>{if(e.target===lb)closeLb()});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!lb.hidden)closeLb()});

/* Kata penyemangat */
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

/* Surat */
const LETTER=`Hai, Anieza.

Aku cuma mau bilang satu hal.

Kalau suatu hari semuanya terasa berat, ingat ya: kamu sudah berhasil melewati banyak hari yang sulit. Dan aku bangga sama kamu.

Kamu nggak harus selalu kuat.
Nggak harus selalu tersenyum.
Nggak harus selalu sempurna.

Capek ya istirahat.
Siap ya jalan lagi.

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

/* Rahasia kecil */
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

/* QR menuju halaman ini */
const qc=$("#qr-canvas"), url=location.href.split("#")[0];
if(window.QRCode&&QRCode.toCanvas&&/^https?:/.test(url)){
  QRCode.toCanvas(qc,url,{width:260,margin:0,color:{dark:"#3b1f2f",light:"#ffffff"}},()=>{});
}else{
  const p=qc.parentElement;p.innerHTML='<p style="padding:1rem;color:#86616f;max-width:12rem">QR akan muncul setelah halaman ini dibuka lewat link online.</p>';
}

/* Penutup */
const end=$(".end");let done=false;
if("IntersectionObserver" in window)new IntersectionObserver(es=>es.forEach(x=>{
  if(x.isIntersecting&&!done&&!reduce){done=true;const r=$("#rise");
    for(let i=0;i<14;i++)setTimeout(()=>{const h=document.createElement("span");h.textContent="♡";
      h.style.cssText=`left:${Math.random()*100}%;bottom:-5%;font-size:${1+Math.random()*1.5}rem;--dx:${Math.random()*60-30}px`;
      r.appendChild(h);setTimeout(()=>h.remove(),6200)},i*180)}
}),{threshold:.4}).observe(end);

/* ---- Nomor WhatsApp: ganti angka di bawah (format 62, tanpa 0 / + / spasi) ---- */
const WA_NUMBER="6282281276704";
const waLink=m=>`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(m)}`;
$("#wa-main").href=waLink(`Hai, ini ${NAME}. Aku udah buka hadiahmu, dan aku senyum-senyum sendiri. ♡`);
$("#wa-float").href=waLink(`Hai, ini ${NAME}. Aku mau cerita sesuatu ke kamu. ♡`);

/* ---- Bar progres + kelopak hati ambient ---- */
const prog=$("#progress");
addEventListener("scroll",()=>{const m=document.documentElement.scrollHeight-innerHeight;
  prog.style.transform=`scaleX(${m>0?Math.min(scrollY/m,1):0})`},{passive:true});
const petals=$("#petals");
if(!reduce)setInterval(()=>{const p=document.createElement("span");p.textContent=["♡","✿","♡"][Math.floor(Math.random()*3)];
  p.style.cssText=`left:${Math.random()*100}%;font-size:${.8+Math.random()*1.3}rem;--dx:${Math.random()*120-60}px`;
  petals.appendChild(p);setTimeout(()=>p.remove(),15500)},2200);

/* ---- Peluk virtual: tahan tombol ---- */
const hw=$("#hugwrap"), hb=$("#hug-btn"), ht=$("#hug-text"), hr=$("#hug-reply"), warm=$("#warm");
const HUG_MSG=["Pelukan sampai, Anieza. Eraaat banget. 🤗","Nah, udah kupeluk. Hangat kan? Jangan dilepas dulu.","Peluk lagi satu, buat semua hal yang bikin kamu capek hari ini."];
let timer=null, hugs=0;
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
  ht.textContent="Terus ditahan ya... jangan dilepas dulu.";
  timer=setTimeout(()=>{timer=null;hugDone()},1600)}
function hugStop(){if(timer){clearTimeout(timer);timer=null;hw.classList.remove("holding");ht.textContent="Yah, kelepasan. Coba tahan sedikit lebih lama ya."}}
hb.addEventListener("pointerdown",hugStart);
["pointerup","pointerleave","pointercancel"].forEach(t=>hb.addEventListener(t,hugStop));
hb.addEventListener("keydown",hugStart);hb.addEventListener("keyup",hugStop);
hb.addEventListener("contextmenu",e=>e.preventDefault());

/* ---- meteran kedalaman, menu aktif, gelembung ---- */
const df=$("#depth-fill"), dn=$("#depth-num");
function depth(){const m=document.documentElement.scrollHeight-innerHeight,p=m>0?Math.min(scrollY/m,1):0;
  df.style.transform=`scaleY(${p})`;dn.textContent=Math.round(p*40)+" m"}
addEventListener("scroll",depth,{passive:true});
const links=$$(".nav ul a");
if("IntersectionObserver" in window){const so=new IntersectionObserver(es=>es.forEach(x=>{
  if(x.isIntersecting)links.forEach(a=>a.classList.toggle("on",a.getAttribute("href")==="#"+x.target.id))}),{rootMargin:"-45% 0px -50% 0px"});
  $$("#top,#gallery,#why,#hug,#letter,#wa").forEach(e=>so.observe(e))}
if(!reduce)setInterval(()=>{const b=document.createElement("span"),z=6+Math.random()*16;b.className="bub";
  b.style.cssText=`left:${Math.random()*100}%;--s:${z}px;--dx:${Math.random()*80-40}px`;
  petals.appendChild(b);setTimeout(()=>b.remove(),15500)},1300);
})();

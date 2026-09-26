// Safe wrapper: some browsers block localStorage entirely when the page
// is opened via file:// (double-clicked) or in strict private-browsing
// mode. Without this guard, the very first line below would throw and
// stop the whole script from running -- which is why every button in
// the app looked "dead" (no click handlers ever got attached).
const safeStorage = {
  get(key, fallback) {
    try { return localStorage.getItem(key) ?? fallback; }
    catch (e) { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, value); return true; }
    catch (e) { return false; }
  }
};

let initialFavs = [];
try { initialFavs = JSON.parse(safeStorage.get("kw_favs", "[]")); }
catch (e) { initialFavs = []; }

const state = { query: "", cuisine: "ทั้งหมด", tab: "home", favs: initialFavs };
const cuisines = ["ทั้งหมด", ...Array.from(new Set(RECIPES.map(r=>r.cuisine)))];

const $ = s => document.querySelector(s);
const grid = $("#grid"), chips = $("#chips"), searchEl = $("#search");

function renderChips(){
  chips.innerHTML = cuisines.map(c =>
    `<button class="chip ${c===state.cuisine?"active":""}" data-c="${c}">${c}</button>`
  ).join("");
  chips.querySelectorAll(".chip").forEach(b=>b.onclick=()=>{state.cuisine=b.dataset.c; render();});
}

function filtered(){
  return RECIPES.filter(r=>{
    const matchC = state.cuisine==="ทั้งหมด" || r.cuisine===state.cuisine;
    const matchQ = r.name.toLowerCase().includes(state.query.toLowerCase());
    const matchFav = state.tab!=="fav" || state.favs.includes(r.id);
    return matchC && matchQ && matchFav;
  });
}

function render(){
  renderChips();
  const list = filtered();
  $("#count").textContent = `${list.length} เมนู`;
  grid.innerHTML = list.length ? list.map(r=>`
    <div class="card-wrap">
      <button class="fav-btn" data-fav="${r.id}">${state.favs.includes(r.id)?"❤️":"🤍"}</button>
      <div class="card" data-open="${r.id}">
        <div class="img">${r.emoji}</div>
        <div class="info">
          <div class="cuisine">${r.cuisine}</div>
          <div class="name">${r.name}</div>
          <div class="meta"><span>⏱ ${r.time}</span><span>· ${r.diff}</span></div>
        </div>
      </div>
    </div>`).join("") : `<div class="empty">ไม่พบเมนูที่ค้นหา 🍽️</div>`;

  grid.querySelectorAll("[data-open]").forEach(c=>c.onclick=()=>openRecipe(+c.dataset.open));
  grid.querySelectorAll("[data-fav]").forEach(b=>b.onclick=(e)=>{
    e.stopPropagation();
    const id = +b.dataset.fav;
    state.favs = state.favs.includes(id) ? state.favs.filter(x=>x!==id) : [...state.favs, id];
    safeStorage.set("kw_favs", JSON.stringify(state.favs));
    render();
  });
}

function openRecipe(id){
  const r = RECIPES.find(x=>x.id===id);
  $("#sheet-content").innerHTML = `
    <div class="sheet-hero">${r.emoji}<button class="close" id="closeSheet">✕</button></div>
    <div class="sheet-body">
      <h2>${r.name}<span class="badge">${r.cuisine}</span></h2>
      <div class="tag-row"><span class="tag">⏱ ${r.time}</span><span class="tag">ระดับ: ${r.diff}</span></div>
      <h3>🧂 วัตถุดิบ</h3>
      <ul>${r.ingredients.map(i=>`<li>${i}</li>`).join("")}</ul>
      <h3>👨‍🍳 วิธีทำ</h3>
      <ol>${r.steps.map(s=>`<li>${s}</li>`).join("")}</ol>
    </div>`;
  $("#overlay").classList.add("open");
  $("#closeSheet").onclick = ()=> $("#overlay").classList.remove("open");
}
$("#overlay").onclick = e => { if(e.target.id==="overlay") $("#overlay").classList.remove("open"); };

searchEl.oninput = e => { state.query = e.target.value; render(); };

$("#shuffleBtn").onclick = () => {
  const pool = filtered();
  if (!pool.length) return;
  const pick = pool[Math.floor(Math.random() * pool.length)];
  openRecipe(pick.id);
};

document.querySelectorAll("nav.tabbar button").forEach(b=>{
  b.onclick = ()=>{
    document.querySelectorAll("nav.tabbar button").forEach(x=>x.classList.remove("active"));
    b.classList.add("active");
    state.tab = b.dataset.tab;
    render();
  };
});

render();

// PWA: register service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(()=>{});
  });
}

// Install prompt
let deferredPrompt;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  $("#installBar").classList.add("show");
});
$("#installBtn").onclick = async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  $("#installBar").classList.remove("show");
};
$("#dismissInstall").onclick = () => $("#installBar").classList.remove("show");

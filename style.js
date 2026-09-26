:root{
  --bg:#fff6ec; --card:#ffffff; --primary:#e2622a; --primary-d:#c94f1c;
  --text:#3a2a1e; --muted:#9b8776; --line:#f0e0cf; --accent:#3f8f5f;
}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',system-ui,sans-serif;background:var(--bg);color:var(--text);padding-bottom:70px}
header{background:linear-gradient(135deg,var(--primary),#f2984a);color:#fff;padding:22px 16px 60px;position:relative;overflow:hidden}
header h1{font-size:22px;font-weight:800}
header p{font-size:13px;opacity:.9;margin-top:4px}
.search-wrap{position:relative;margin:-40px 16px 0;z-index:2}
#search{width:100%;padding:14px 16px 14px 44px;border-radius:16px;border:none;font-size:15px;box-shadow:0 6px 20px rgba(0,0,0,.12)}
.search-wrap::before{content:"🔍";position:absolute;left:16px;top:14px;font-size:15px}
.chips{display:flex;gap:8px;overflow-x:auto;padding:18px 16px 4px;scrollbar-width:none}
.chips::-webkit-scrollbar{display:none}
.chip{flex:0 0 auto;padding:8px 16px;border-radius:999px;background:var(--card);border:1px solid var(--line);font-size:13px;font-weight:600;color:var(--text);white-space:nowrap;cursor:pointer}
.chip.active{background:var(--primary);color:#fff;border-color:var(--primary)}
.toolbar-row{display:flex;align-items:center;justify-content:space-between;padding:6px 16px 0}
.count{font-size:12px;color:var(--muted)}
.shuffle-btn{background:var(--card);border:1px solid var(--line);padding:6px 12px;border-radius:999px;font-size:12px;font-weight:700;color:var(--primary-d);cursor:pointer}
main{padding:8px 16px 16px}
.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:10px}
.card{background:var(--card);border-radius:18px;overflow:hidden;box-shadow:0 3px 12px rgba(0,0,0,.06);cursor:pointer;transition:transform .15s}
.card:active{transform:scale(.97)}
.card .img{height:100px;display:flex;align-items:center;justify-content:center;font-size:44px;background:linear-gradient(135deg,#ffe7cf,#ffd3ae)}
.card .info{padding:10px 12px 12px}
.card .cuisine{font-size:11px;color:var(--primary);font-weight:700}
.card .name{font-size:14px;font-weight:700;margin:2px 0 6px;line-height:1.3}
.card .meta{display:flex;gap:8px;font-size:11px;color:var(--muted)}
.fav-btn{position:absolute;margin:8px;background:rgba(255,255,255,.9);border:none;border-radius:50%;width:30px;height:30px;font-size:15px;cursor:pointer}
.card-wrap{position:relative}
.empty{text-align:center;color:var(--muted);padding:40px 10px;font-size:14px}

nav.tabbar{position:fixed;bottom:0;left:0;right:0;background:#fff;border-top:1px solid var(--line);display:flex;z-index:20}
nav.tabbar button{flex:1;background:none;border:none;padding:10px 4px 8px;font-size:11px;color:var(--muted);display:flex;flex-direction:column;align-items:center;gap:2px}
nav.tabbar button span{font-size:19px}
nav.tabbar button.active{color:var(--primary);font-weight:700}

.overlay{position:fixed;inset:0;background:rgba(0,0,0,.4);display:none;align-items:flex-end;z-index:50}
.overlay.open{display:flex}
.sheet{background:var(--bg);width:100%;max-height:90vh;overflow-y:auto;border-radius:24px 24px 0 0;animation:up .25s ease-out}
@keyframes up{from{transform:translateY(30px);opacity:0}to{transform:translateY(0);opacity:1}}
.sheet-hero{height:140px;background:linear-gradient(135deg,#ffe7cf,#ffd3ae);display:flex;align-items:center;justify-content:center;font-size:70px;position:relative}
.sheet-hero .close{position:absolute;top:12px;right:12px;background:rgba(255,255,255,.9);border:none;border-radius:50%;width:32px;height:32px;font-size:16px}
.sheet-body{padding:18px 20px 30px}
.sheet-body h2{font-size:20px;margin-bottom:4px}
.tag-row{display:flex;gap:8px;flex-wrap:wrap;margin:8px 0 14px}
.tag{background:#fff;border:1px solid var(--line);padding:5px 10px;border-radius:999px;font-size:11px;color:var(--muted)}
.sheet-body h3{font-size:14px;color:var(--primary-d);margin:14px 0 8px}
.sheet-body ul,.sheet-body ol{padding-left:20px;font-size:13.5px;line-height:1.9}
.sheet-body ol li{margin-bottom:6px}
.badge{display:inline-block;background:var(--accent);color:#fff;font-size:10px;padding:3px 8px;border-radius:8px;margin-left:6px}

.install-bar{position:fixed;bottom:64px;left:12px;right:12px;background:var(--text);color:#fff;padding:10px 14px;border-radius:14px;display:none;align-items:center;justify-content:space-between;font-size:13px;z-index:30}
.install-bar.show{display:flex}
.install-bar button{background:var(--primary);color:#fff;border:none;padding:7px 12px;border-radius:10px;font-size:12px;font-weight:700}

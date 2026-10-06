// =====================================================================
// Motor de la aplicación
// =====================================================================

const UNIT_BY_ID = {};
UNITS.forEach(u => UNIT_BY_ID[u.id] = u);

const SITE_CREDIT = '<br><span style="opacity:.75;">Hecho en 2026 por alumnos de Comunicaciones — UTN-FRT · ISI</span>';

const content = document.getElementById('content');
const unitNav = document.getElementById('unit-nav');
const crumb = document.getElementById('crumb');

// Fallback: si KaTeX no llegó a cargar (CDN bloqueado, sin conexión, etc.)
// se muestra la fórmula en texto plano en vez de dejar la página en blanco.
function plainFormula(latex){
  return '<span style="font-family:var(--mono);color:var(--ink);font-size:14.5px;">'+
    latex
      .replace(/\\dfrac\{([^{}]+)\}\{([^{}]+)\}/g,'($1)/($2)')
      .replace(/\\log_\{?2\}?/g,'log2').replace(/\\log_\{?10\}?/g,'log10')
      .replace(/\\times/g,'×').replace(/\\cdot/g,'·').replace(/\\le/g,'≤').replace(/\\ge/g,'≥')
      .replace(/\\Rightarrow/g,'⇒').replace(/\\pmod\s*2/g,'(mód 2)')
      .replace(/\\text\{([^{}]*)\}/g,'$1').replace(/\\;|\\quad|\\qquad/g,'  ')
      .replace(/[\\{}]/g,'') +
    '</span>';
}
function renderLatex(latex){
  try{
    if(window.katex) return katex.renderToString(latex, {throwOnError:false, displayMode:true});
    return plainFormula(latex);
  }catch(e){
    return plainFormula(latex);
  }
}
function katexReady(fn){
  let waited = 0;
  (function poll(){
    if(window.katex || waited>=2000){ fn(); return; }
    waited += 80;
    setTimeout(poll, 80);
  })();
}

// ---------------------------------------------------------------
// Sidebar navigation
// ---------------------------------------------------------------
function buildSidebar(){
  let html = `<a class="unit-link" data-target="inicio"><span class="n">·</span><span class="t">Inicio<small>Presentación de la guía</small></span></a>`;
  UNITS.forEach(u=>{
    html += `<a class="unit-link" data-target="${u.id}">
      <span class="n">${String(u.num).padStart(2,'0')}</span>
      <span class="t">${u.name}<small>${u.short}</small></span>
    </a>`;
  });
  html += `<a class="unit-link" data-target="mapa"><span class="n">◈</span><span class="t">Mapa de conexiones<small>Qué fórmula se usa dónde</small></span></a>`;
  unitNav.innerHTML = html;
  unitNav.querySelectorAll('.unit-link').forEach(a=>{
    a.addEventListener('click', ()=>{ goTo(a.dataset.target); closeSidebarMobile(); });
  });
}

function setActiveNav(target){
  unitNav.querySelectorAll('.unit-link').forEach(a=>{
    a.classList.toggle('active', a.dataset.target===target);
  });
}

// ---------------------------------------------------------------
// Rendering: formula card
// ---------------------------------------------------------------
function chipFor(id){
  const f = FORMULAS[id];
  if(!f) return '';
  const u = UNIT_BY_ID[f.unit];
  return `<span class="chip" data-jump="${id}"><span class="u">U${u.num}</span>${f.name}</span>`;
}

function renderCard(f){
  const u = UNIT_BY_ID[f.unit];
  let html = `<div class="fcard" id="card-${f.id}">
    <div class="fcard-head">
      <div>
        <div class="id">U${u.num} · ${f.id.toUpperCase()}</div>
        <h3>${f.name}</h3>
      </div>
    </div>
    <div class="fcard-body">
      <div class="formula-box">${renderLatex(f.latex)}</div>
      <div class="vars">
        ${f.vars.map(v=>`<div class="vrow"><span class="sym">${v[0]}</span><span>${v[1]}</span></div>`).join('')}
      </div>
      <div class="explain"><p>${f.explain}</p></div>
      ${f.example? `<div class="example"><b>Ejemplo —</b> ${f.example}</div>` : ''}
      <div class="calc-slot" id="calc-${f.id}"></div>
      ${(f.related && f.related.length) ? `
      <div class="xref">
        <div class="xref-label">TAMBIÉN APARECE / SE USA EN</div>
        <div class="chips">${f.related.map(chipFor).join('')}</div>
      </div>` : ''}
    </div>
  </div>`;
  return html;
}

// ---------------------------------------------------------------
// Generic numeric calculator engine
// ---------------------------------------------------------------
function mountGenericCalc(f){
  const slot = document.getElementById('calc-'+f.id);
  if(!slot || !f.calc) return;
  const cfg = f.calc;
  let html = `<div class="calc"><div class="calc-label">CALCULADORA</div><div class="row">`;
  cfg.inputs.forEach(inp=>{
    const wrapId = `wrap-${f.id}-${inp.key}`;
    html += `<div class="field" id="${wrapId}">
      <label>${inp.label}${inp.unit? ' ['+inp.unit+']':''}</label>`;
    if(inp.type==="select"){
      html += `<select data-k="${inp.key}">${inp.options.map(o=>`<option value="${o[0]}" ${o[0]===inp.def?'selected':''}>${o[1]}</option>`).join('')}</select>`;
    } else {
      html += `<input type="number" step="any" data-k="${inp.key}" value="${inp.def}">`;
    }
    html += `</div>`;
  });
  html += `</div><div class="calc-out" id="out-${f.id}"></div></div>`;
  slot.innerHTML = html;

  function currentVals(){
    const vals = {};
    cfg.inputs.forEach(inp=>{
      const el = slot.querySelector(`[data-k="${inp.key}"]`);
      if(!el) return;
      vals[inp.key] = inp.type==="select" ? el.value : parseFloat(el.value);
    });
    return vals;
  }
  function applyVisibility(){
    const vals = currentVals();
    cfg.inputs.forEach(inp=>{
      const wrap = document.getElementById(`wrap-${f.id}-${inp.key}`);
      if(!wrap) return;
      if(inp.showIf){
        const key = Object.keys(inp.showIf)[0];
        wrap.style.display = (vals[key]===inp.showIf[key]) ? '' : 'none';
      }
    });
  }
  function recompute(){
    applyVisibility();
    const vals = currentVals();
    const out = document.getElementById('out-'+f.id);
    try{
      const results = cfg.compute(vals);
      out.classList.remove('err');
      out.innerHTML = results.map(r=>`<div class="oitem"><span class="l">${r.label}</span><span class="v">${r.value}${r.unit? ' '+r.unit:''}</span></div>`).join('');
    }catch(e){
      out.classList.add('err');
      out.innerHTML = `⚠ ${e}`;
    }
  }
  slot.querySelectorAll('input,select').forEach(el=>{
    el.addEventListener('input', recompute);
    el.addEventListener('change', recompute);
  });
  recompute();
}

// ---------------------------------------------------------------
// Special calculators
// ---------------------------------------------------------------
function mountSpecialCalc(f){
  const slot = document.getElementById('calc-'+f.id);
  if(!slot) return;

  if(f.special === "constellation"){
    slot.innerHTML = `<div class="calc">
      <div class="calc-label">DIAGRAMA DE CONSTELACIÓN — FASES × AMPLITUDES (ASK / PSK / QAM)</div>
      <div class="row">
        <div class="field"><label>N° de fases</label><input type="number" step="1" min="1" id="co-fases" value="4"></div>
        <div class="field"><label>N° de amplitudes</label><input type="number" step="1" min="1" id="co-amp" value="1"></div>
      </div>
      <canvas id="co-canvas" width="520" height="520" style="width:100%;max-width:520px;height:auto;aspect-ratio:1/1;background:var(--scope-bg);border:1px solid var(--line-soft);border-radius:3px;display:block;margin:0 auto;"></canvas>
      <div class="calc-out" id="co-out"></div>
    </div>`;
    const fasesEl=document.getElementById('co-fases'), ampEl=document.getElementById('co-amp');
    const canvas=document.getElementById('co-canvas'), ctx=canvas.getContext('2d');
    const out=document.getElementById('co-out');

    function draw(){
      const fases=parseInt(fasesEl.value), amplitudes=parseInt(ampEl.value);
      if(!(fases>=1) || !(amplitudes>=1)){ out.classList.add('err'); out.innerHTML='⚠ Ambos valores deben ser al menos 1'; return; }
      out.classList.remove('err');
      const M = fases*amplitudes;
      const points=[];
      for(let p=0;p<fases;p++){
        const angle = 2*Math.PI*p/fases + (fases>1 ? Math.PI/fases : 0);
        for(let a=0;a<amplitudes;a++){
          const radius = (a+1)/amplitudes;
          points.push({x:radius*Math.cos(angle), y:radius*Math.sin(angle), idx:p*amplitudes+a});
        }
      }
      const W=canvas.width, H=canvas.height, cx=W/2, cy=H/2, R=Math.min(W,H)*0.38;
      ctx.clearRect(0,0,W,H);
      // reference circles per amplitude level
      for(let a=0;a<amplitudes;a++){
        const radius=(a+1)/amplitudes;
        ctx.strokeStyle='rgba(14,124,102,0.18)'; ctx.lineWidth=1;
        ctx.beginPath(); ctx.arc(cx,cy,radius*R,0,Math.PI*2); ctx.stroke();
      }
      // axes
      ctx.strokeStyle='rgba(22,36,30,0.25)'; ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(16,cy); ctx.lineTo(W-16,cy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx,16); ctx.lineTo(cx,H-16); ctx.stroke();
      ctx.fillStyle='#4E5F56'; ctx.font='11px IBM Plex Mono, monospace';
      ctx.fillText('I', W-26, cy-8); ctx.fillText('Q', cx+8, 22);
      // points
      points.forEach(pt=>{
        const x=cx+pt.x*R, y=cy-pt.y*R;
        ctx.beginPath(); ctx.arc(x,y,7,0,Math.PI*2);
        ctx.fillStyle='#0E7C66'; ctx.fill();
        ctx.strokeStyle='#0B5C4C'; ctx.lineWidth=1.5; ctx.stroke();
        ctx.fillStyle='#A85A18'; ctx.font='10px IBM Plex Mono, monospace'; ctx.textAlign='center';
        ctx.fillText(pt.idx.toString(2).padStart(Math.max(1,Math.ceil(Math.log2(M))),'0'), x, y-12);
      });
      ctx.textAlign='left';

      // minimum distance between neighboring points
      let minD=Infinity;
      for(let i=0;i<points.length;i++) for(let j=i+1;j<points.length;j++){
        const d=Math.hypot(points[i].x-points[j].x, points[i].y-points[j].y);
        if(d<minD) minD=d;
      }
      out.innerHTML = `
        <div class="oitem"><span class="l">M = fases × amplitudes</span><span class="v">${M}</span></div>
        <div class="oitem"><span class="l">Bits por símbolo (log₂M)</span><span class="v">${Math.log2(M).toFixed(2)}</span></div>
        <div class="oitem"><span class="l">Distancia mínima entre símbolos</span><span class="v">${isFinite(minD)?minD.toFixed(3):'—'} (unidades de amplitud máx.)</span></div>`;
    }
    [fasesEl,ampEl].forEach(el=>el.addEventListener('input', draw));
    draw();
  }

  if(f.special === "fourier"){
    slot.innerHTML = `<div class="calc">
      <div class="calc-label">SIMULADOR — RECONSTRUCCIÓN DE UNA ONDA CUADRADA</div>
      <div class="row">
        <div class="field" style="flex:2">
          <label>Cantidad de armónicos impares a sumar: <span id="fx-nval">1</span></label>
          <input type="range" min="1" max="49" step="2" value="1" id="fx-range">
        </div>
      </div>
      <canvas id="fx-canvas" width="820" height="220" style="width:100%;height:auto;aspect-ratio:820/220;background:var(--scope-bg);border:1px solid var(--line-soft);border-radius:3px;"></canvas>
      <div class="calc-out"><div class="oitem"><span class="l">Serie parcial</span><span class="v" id="fx-formula" style="font-size:12.5px;"></span></div></div>
    </div>`;
    const canvas = document.getElementById('fx-canvas');
    const ctx = canvas.getContext('2d');
    const range = document.getElementById('fx-range');
    const nval = document.getElementById('fx-nval');
    const fxFormula = document.getElementById('fx-formula');

    function draw(maxN){
      const W=canvas.width, H=canvas.height, mid=H/2, amp=H*0.38;
      ctx.clearRect(0,0,W,H);
      // grid
      ctx.strokeStyle = 'rgba(14,124,102,0.14)';
      ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(0,mid); ctx.lineTo(W,mid); ctx.stroke();
      // ideal square wave (faint)
      ctx.strokeStyle = 'rgba(168,90,24,0.4)';
      ctx.beginPath();
      for(let px=0; px<=W; px++){
        const t = (px/W)*2*Math.PI*2; // 2 periods
        const s = Math.sin(t) >= 0 ? 1 : -1;
        const y = mid - s*amp;
        if(px===0) ctx.moveTo(px,y); else ctx.lineTo(px,y);
      }
      ctx.stroke();
      // partial fourier sum
      ctx.strokeStyle = '#0E7C66';
      ctx.lineWidth=2;
      ctx.beginPath();
      const harmonics = [];
      for(let n=1; n<=maxN; n+=2) harmonics.push(n);
      for(let px=0; px<=W; px++){
        const t = (px/W)*2*Math.PI*2;
        let sum=0;
        harmonics.forEach(n=>{ sum += (1/n)*Math.sin(n*t); });
        const y = mid - (4/Math.PI)*sum*amp*0.9;
        if(px===0) ctx.moveTo(px,y); else ctx.lineTo(px,y);
      }
      ctx.stroke();
      const terms = harmonics.slice(0,6).map(n=> n===1? 'sen(ω₀t)' : `(1/${n})sen(${n}ω₀t)`).join(' + ');
      fxFormula.textContent = `f(t) ≈ (4/π)[ ${terms}${harmonics.length>6?' + …':''} ]  ·  armónicos usados: ${harmonics.length}`;
    }
    range.addEventListener('input', ()=>{ nval.textContent=range.value; draw(parseInt(range.value)); });
    draw(1);
  }

  if(f.special === "huffman-tree"){
    slot.innerHTML = `<div class="calc">
      <div class="calc-label">ÁRBOL DE HUFFMAN — PASO A PASO</div>
      <div class="row">
        <div class="field" style="flex:1 1 100%;">
          <label>Símbolo:probabilidad, separados por coma (deben sumar 1)</label>
          <input type="text" id="hf-input" value="A:0.40,B:0.18,C:0.10,D:0.10,E:0.07,F:0.06,G:0.05,H:0.04">
        </div>
      </div>
      <canvas id="hf-canvas" width="900" height="420" style="width:100%;height:auto;background:var(--scope-bg);border:1px solid var(--line-soft);border-radius:3px;"></canvas>
      <div class="calc-out" id="hf-out" style="flex-direction:column;align-items:flex-start;gap:6px;"></div>
    </div>`;
    const inp=document.getElementById('hf-input');
    const canvas=document.getElementById('hf-canvas'), ctx=canvas.getContext('2d');
    const out=document.getElementById('hf-out');
    let hfSeq = 0;

    function parseInput(){
      const parts = inp.value.split(',').map(s=>s.trim()).filter(Boolean);
      const items = parts.map(p=>{
        const [sym,probStr] = p.split(':');
        return {label:(sym||'?').trim(), prob:parseFloat(probStr)};
      });
      if(items.some(it=>isNaN(it.prob) || it.prob<=0)) throw "Cada símbolo necesita una probabilidad numérica > 0 (formato símbolo:prob)";
      if(items.length<2) throw "Ingresá al menos 2 símbolos";
      const sum = items.reduce((a,b)=>a+b.prob,0);
      if(Math.abs(sum-1)>0.01) throw `Las probabilidades deben sumar 1 (suman ${sum.toFixed(3)})`;
      return items;
    }

    function buildTree(items){
      let nodes = items.map(it=>({id:'n'+(hfSeq++), label:it.label, prob:it.prob, leaf:true}));
      const merges = [];
      while(nodes.length>1){
        nodes.sort((a,b)=>a.prob-b.prob);
        const a=nodes.shift(), b=nodes.shift();
        const parent = {id:'n'+(hfSeq++), prob:+(a.prob+b.prob).toFixed(6), leaf:false, left:a, right:b};
        merges.push({a,b,parent});
        nodes.push(parent);
      }
      return {root:nodes[0], merges};
    }

    function assignCodes(node, prefix, map){
      if(node.leaf){ map[node.label]=prefix||'0'; return; }
      assignCodes(node.left, prefix+'0', map);
      assignCodes(node.right, prefix+'1', map);
    }

    function layout(node, depth, leafCounter){
      node.depth = depth;
      if(node.leaf){ node.x = leafCounter.n++; return; }
      layout(node.left, depth+1, leafCounter);
      layout(node.right, depth+1, leafCounter);
      node.x = (node.left.x + node.right.x)/2;
    }

    function maxDepth(node){ return node.leaf ? node.depth : Math.max(maxDepth(node.left), maxDepth(node.right)); }

    function draw(root, leafCount, codes){
      hfSeq=0; // not used here, placeholder
      const depth = maxDepth(root);
      const W = Math.max(900, leafCount*110), H = Math.max(300, (depth+1)*78+60);
      canvas.width=W; canvas.height=H;
      canvas.style.aspectRatio = W+'/'+H;
      ctx.clearRect(0,0,W,H);
      const padL=70, padR=70, padT=30, padB=50;
      const plotW=W-padL-padR;
      function xPix(x){ return leafCount<=1 ? padL+plotW/2 : padL + (x/(leafCount-1))*plotW; }
      function yPix(d){ return padT + d*((H-padT-padB)/Math.max(1,depth)); }

      function drawEdges(node){
        if(node.leaf) return;
        [['left','0'],['right','1']].forEach(([side,bit])=>{
          const child = node[side];
          const x0=xPix(node.x), y0=yPix(node.depth), x1=xPix(child.x), y1=yPix(child.depth);
          ctx.strokeStyle='rgba(14,124,102,0.55)'; ctx.lineWidth=1.6;
          ctx.beginPath(); ctx.moveTo(x0,y0); ctx.lineTo(x1,y1); ctx.stroke();
          ctx.fillStyle='#A85A18'; ctx.font='12px IBM Plex Mono, monospace';
          ctx.fillText(bit, (x0+x1)/2 + (side==='left'?-10:4), (y0+y1)/2);
          drawEdges(child);
        });
      }
      drawEdges(root);

      function drawNode(node){
        const x=xPix(node.x), y=yPix(node.depth);
        ctx.beginPath(); ctx.arc(x,y,node.leaf?20:16,0,Math.PI*2);
        ctx.fillStyle = node.leaf ? '#0E7C66' : '#16241E';
        ctx.strokeStyle = '#0E7C66'; ctx.lineWidth=1.5;
        ctx.fill(); ctx.stroke();
        ctx.fillStyle='#EFF6F2'; ctx.font='10.5px IBM Plex Mono, monospace'; ctx.textAlign='center';
        ctx.fillText(node.prob.toFixed(2), x, y+3);
        if(node.leaf){
          ctx.fillStyle='#0B5C4C'; ctx.font='12px IBM Plex Sans, sans-serif';
          ctx.fillText(node.label, x, y-28);
          ctx.fillStyle='#A85A18'; ctx.font='10.5px IBM Plex Mono, monospace';
          ctx.fillText(codes[node.label], x, y+36);
        }
        ctx.textAlign='left';
        if(!node.leaf){ drawNode(node.left); drawNode(node.right); }
      }
      drawNode(root);
    }

    function recompute(){
      try{
        const items = parseInput();
        const {root, merges} = buildTree(items);
        const codes = {};
        assignCodes(root, '', codes);
        const leafCounter = {n:0};
        layout(root, 0, leafCounter);
        draw(root, Math.max(1,leafCounter.n), codes);

        const H = items.reduce((acc,it)=> acc + it.prob*Math.log2(1/it.prob), 0);
        const Lbar = items.reduce((acc,it)=> acc + it.prob*codes[it.label].length, 0);
        const eta = H/Lbar*100;

        out.classList.remove('err');
        const rows = items.slice().sort((a,b)=>b.prob-a.prob)
          .map(it=>`<div class="oitem"><span class="l">${it.label} (P=${it.prob})</span><span class="v">${codes[it.label]} — ${codes[it.label].length} bits</span></div>`).join('');
        out.innerHTML = rows + `
          <div class="oitem"><span class="l">H(x)</span><span class="v">${H.toFixed(4)} bits/símbolo</span></div>
          <div class="oitem"><span class="l">L̄(C)</span><span class="v">${Lbar.toFixed(4)} dígitos/símbolo</span></div>
          <div class="oitem"><span class="l">Eficiencia η</span><span class="v">${eta.toFixed(2)} %</span></div>`;
      }catch(e){
        out.classList.add('err');
        out.innerHTML = '⚠ '+e;
        ctx.clearRect(0,0,canvas.width,canvas.height);
      }
    }
    inp.addEventListener('input', recompute);
    recompute();
  }

  if(f.special === "entropy"){
    slot.innerHTML = `<div class="calc">
      <div class="calc-label">CALCULADORA — ENTROPÍA, ENTROPÍA MÁXIMA Y REDUNDANCIA</div>
      <div class="row">
        <div class="field" style="flex:1 1 100%;">
          <label>Probabilidades separadas por coma (deben sumar 1)</label>
          <input type="text" id="ent-input" value="0.5,0.25,0.125,0.125">
        </div>
      </div>
      <div class="calc-out" id="ent-out"></div>
    </div>`;
    const inp = document.getElementById('ent-input');
    const out = document.getElementById('ent-out');
    function recompute(){
      try{
        const parts = inp.value.split(',').map(s=>parseFloat(s.trim())).filter(x=>!isNaN(x));
        if(parts.length<2) throw "Ingresá al menos 2 probabilidades";
        const sum = parts.reduce((a,b)=>a+b,0);
        if(Math.abs(sum-1) > 0.01) throw `Las probabilidades deben sumar 1 (suman ${sum.toFixed(3)})`;
        let h=0;
        parts.forEach(p=>{ if(p>0) h += p*Math.log2(1/p); });
        const hmax = Math.log2(parts.length);
        const rd = (hmax-h)/hmax*100;
        out.classList.remove('err');
        out.innerHTML = `
          <div class="oitem"><span class="l">N (símbolos)</span><span class="v">${parts.length}</span></div>
          <div class="oitem"><span class="l">H(x)</span><span class="v">${h.toFixed(4)} bits/símbolo</span></div>
          <div class="oitem"><span class="l">H máx = log₂N</span><span class="v">${hmax.toFixed(4)} bits/símbolo</span></div>
          <div class="oitem"><span class="l">Redundancia Rd</span><span class="v">${rd.toFixed(2)} %</span></div>`;
      }catch(e){
        out.classList.add('err');
        out.innerHTML = '⚠ '+e;
      }
    }
    inp.addEventListener('input', recompute);
    recompute();
  }

  if(f.special === "hamming-builder"){
    slot.innerHTML = `<div class="calc">
      <div class="calc-label">CONSTRUCTOR — CÓDIGO DE HAMMING (POSICIONES Y SÍNDROME)</div>
      <div class="row">
        <div class="field" style="flex:1 1 100%;">
          <label>Bits de datos (se arma la palabra completa con sus bits de paridad)</label>
          <input type="text" id="hb-data" value="1011" maxlength="12">
        </div>
      </div>
      <div id="hb-word" style="display:flex;flex-wrap:wrap;gap:6px;margin:14px 0;"></div>
      <div class="hint" style="font-family:var(--mono);font-size:11px;color:var(--ink-faint);margin-bottom:10px;">Hacé clic en un bit para simular un error (lo invierte) y ver cómo el síndrome lo detecta.</div>
      <div class="calc-out" id="hb-out" style="flex-direction:column;align-items:flex-start;gap:6px;"></div>
    </div>`;
    const dataEl=document.getElementById('hb-data');
    const wordWrap=document.getElementById('hb-word');
    const out=document.getElementById('hb-out');
    let total=0, working=[];

    function isPow2(x){ return x>0 && (x & (x-1))===0; }

    function buildClean(dataBits){
      const n=dataBits.length;
      let p=1;
      while(Math.pow(2,p) < n+p+1){ p++; if(p>20) break; }
      total = n+p;
      const w = new Array(total+1).fill(0);
      let di=0;
      for(let i=1;i<=total;i++){ if(!isPow2(i)){ w[i]=dataBits[di++]; } }
      for(let k=0; Math.pow(2,k)<=total; k++){
        const pos=Math.pow(2,k);
        let val=0;
        for(let i=1;i<=total;i++){ if(i!==pos && (i & pos)) val ^= w[i]; }
        w[pos]=val;
      }
      return w;
    }

    function syndrome(w){
      let s=0;
      for(let k=0; Math.pow(2,k)<=total; k++){
        const pos=Math.pow(2,k);
        let check=0;
        for(let i=1;i<=total;i++){ if(i & pos) check ^= w[i]; }
        if(check) s += pos;
      }
      return s;
    }

    function renderWord(){
      wordWrap.innerHTML = working.map((bit,i)=>{
        if(i===0) return '';
        const parity = isPow2(i);
        return `<div data-pos="${i}" style="cursor:pointer;text-align:center;min-width:34px;padding:6px 4px;border-radius:4px;background:${parity?'var(--amber-soft)':'var(--teal-soft)'};border:1px solid ${parity?'#E3C79B':'#BFE0D4'};">
          <div style="font-family:var(--mono);font-size:9px;color:var(--ink-faint);">${i}${parity?' (p)':''}</div>
          <div style="font-family:var(--mono);font-size:16px;font-weight:600;color:var(--ink);">${bit}</div>
        </div>`;
      }).join('');
      wordWrap.querySelectorAll('[data-pos]').forEach(el=>{
        el.addEventListener('click', ()=>{
          const pos=parseInt(el.dataset.pos);
          working[pos] = working[pos]?0:1;
          renderWord();
          renderOut();
        });
      });
    }

    function renderOut(){
      const s = syndrome(working);
      const parityVals = [];
      for(let k=0; Math.pow(2,k)<=total; k++) parityVals.push('p'+Math.pow(2,k)+'='+working[Math.pow(2,k)]);
      out.innerHTML = `
        <div class="oitem"><span class="l">Palabra completa (${total} bits)</span><span class="v">${working.slice(1).join('')}</span></div>
        <div class="oitem"><span class="l">Bits de paridad</span><span class="v">${parityVals.join(' · ')}</span></div>
        <div class="oitem"><span class="l">Síndrome</span><span class="v">${s===0?'0 (sin error)':s+' → bit erróneo en la posición '+s}</span></div>`;
    }

    function recompute(){
      try{
        const clean = dataEl.value.replace(/[^01]/g,'');
        if(!clean.length) throw "Ingresá al menos 1 bit de datos";
        const dataBits = clean.split('').map(Number);
        const w = buildClean(dataBits);
        working = w.slice();
        out.classList.remove('err');
        renderWord();
        renderOut();
      }catch(e){
        out.classList.add('err');
        out.innerHTML = '⚠ '+e;
        wordWrap.innerHTML='';
      }
    }
    dataEl.addEventListener('input', recompute);
    recompute();
  }

  if(f.special === "parity2d"){
    slot.innerHTML = `<div class="calc">
      <div class="calc-label">PARIDAD BIDIMENSIONAL — VRC (fila) + LRC (columna)</div>
      <div class="row">
        <div class="field" style="flex:1 1 100%;">
          <label>Caracteres del bloque (cada uno = una fila, código de 7 bits)</label>
          <input type="text" id="p2-text" value="SOS12" maxlength="10">
        </div>
      </div>
      <div id="p2-grid" style="overflow-x:auto;margin:14px 0;"></div>
      <div class="hint" style="font-family:var(--mono);font-size:11px;color:var(--ink-faint);margin-bottom:10px;">Hacé clic en un bit de datos para simular un error — fijate cómo se marcan la fila y columna que fallan.</div>
      <div class="calc-out" id="p2-out"></div>
    </div>`;
    const textEl=document.getElementById('p2-text');
    const grid=document.getElementById('p2-grid');
    const out=document.getElementById('p2-out');
    let rows=[], cols=0;

    function toBits7(ch){
      const code = ch.charCodeAt(0) & 0x7F;
      return code.toString(2).padStart(7,'0').split('').map(Number);
    }

    function rowParity(bits){ return bits.reduce((a,b)=>a^b,0); }

    function renderGrid(){
      cols = rows[0] ? rows[0].length : 0;
      const lrc = new Array(cols).fill(0);
      rows.forEach(r=> r.forEach((b,c)=> lrc[c]^=b));
      let html = '<table class="map-table" style="min-width:420px;"><tbody>';
      rows.forEach((r,ri)=>{
        html += '<tr>';
        r.forEach((b,ci)=>{
          html += `<td data-r="${ri}" data-c="${ci}" style="cursor:pointer;font-family:var(--mono);">${b}</td>`;
        });
        html += `<td style="font-family:var(--mono);background:var(--amber-soft);">${rowParity(r)}</td></tr>`;
      });
      html += '<tr>';
      lrc.forEach(v=> html += `<td style="font-family:var(--mono);background:var(--amber-soft);">${v}</td>`);
      html += '<td style="background:var(--panel-2);">—</td></tr>';
      html += '</tbody></table>';
      grid.innerHTML = html;
      grid.querySelectorAll('td[data-r]').forEach(td=>{
        td.addEventListener('click', ()=>{
          const r=parseInt(td.dataset.r), c=parseInt(td.dataset.c);
          rows[r][c] = rows[r][c]?0:1;
          renderGrid();
          renderOut();
        });
      });
    }

    function renderOut(){
      const badRows=[], badCols=[];
      rows.forEach((r,i)=>{ if(rowParity(r)!==0) badRows.push(i+1); });
      const lrc = new Array(cols).fill(0);
      rows.forEach(r=> r.forEach((b,c)=> lrc[c]^=b));
      lrc.forEach((v,i)=>{ if(v!==0) badCols.push(i+1); });
      out.classList.remove('err');
      if(!badRows.length && !badCols.length){
        out.innerHTML = `<div class="oitem"><span class="l">Estado</span><span class="v">sin error detectado</span></div>`;
      } else {
        out.innerHTML = `<div class="oitem"><span class="l">VRC falla en fila(s)</span><span class="v">${badRows.join(', ')||'—'}</span></div>
          <div class="oitem"><span class="l">LRC falla en columna(s)</span><span class="v">${badCols.join(', ')||'—'}</span></div>
          <div class="oitem"><span class="l">Bit erróneo</span><span class="v">${badRows.length===1&&badCols.length===1?('fila '+badRows[0]+', columna '+badCols[0]):'patrón de error múltiple — no localizable con certeza'}</span></div>`;
      }
    }

    function recompute(){
      try{
        const chars = textEl.value.split('');
        if(chars.length<1) throw "Ingresá al menos un carácter";
        rows = chars.map(toBits7);
        out.classList.remove('err');
        renderGrid();
        renderOut();
      }catch(e){
        out.classList.add('err');
        out.innerHTML='⚠ '+e;
        grid.innerHTML='';
      }
    }
    textEl.addEventListener('input', recompute);
    recompute();
  }

  if(f.special === "hamming-distance"){
    slot.innerHTML = `<div class="calc">
      <div class="calc-label">CALCULADORA — DISTANCIA DE HAMMING</div>
      <div class="row">
        <div class="field"><label>Dado H (distancia mínima)</label><input type="number" id="hd-h" value="3"></div>
        <div class="field"><label>Errores a detectar (D deseado)</label><input type="number" id="hd-d" value=""></div>
        <div class="field"><label>Errores a corregir (C deseado)</label><input type="number" id="hd-c" value=""></div>
      </div>
      <div class="calc-out" id="hd-out"></div>
    </div>`;
    const h=document.getElementById('hd-h'), d=document.getElementById('hd-d'), c=document.getElementById('hd-c'), out=document.getElementById('hd-out');
    function recompute(){
      const items=[];
      const hv = parseFloat(h.value);
      if(!isNaN(hv) && hv>0){
        items.push({l:"Con H="+hv+", detecta hasta", v:(hv-1)+" errores"});
        items.push({l:"Con H="+hv+", corrige hasta", v:Math.floor((hv-1)/2)+" errores"});
      }
      const dv = parseFloat(d.value);
      if(!isNaN(dv) && dv>=0) items.push({l:"Para detectar D="+dv+", se necesita", v:"H ≥ "+(dv+1)});
      const cv = parseFloat(c.value);
      if(!isNaN(cv) && cv>=0) items.push({l:"Para corregir C="+cv+", se necesita", v:"H ≥ "+(2*cv+1)});
      out.innerHTML = items.map(i=>`<div class="oitem"><span class="l">${i.l}</span><span class="v">${i.v}</span></div>`).join('') || '⚠ Completá al menos un campo';
    }
    [h,d,c].forEach(el=>el.addEventListener('input', recompute));
    recompute();
  }

  if(f.special === "parity"){
    slot.innerHTML = `<div class="calc">
      <div class="calc-label">CALCULADORA — BIT DE PARIDAD (VRC)</div>
      <div class="row">
        <div class="field"><label>Bits de datos (ej: 1010001)</label><input type="text" id="par-bits" value="1010001"></div>
        <div class="field"><label>Tipo de paridad</label>
          <select id="par-type"><option value="par">Par</option><option value="impar">Impar</option></select>
        </div>
      </div>
      <div class="calc-out" id="par-out"></div>
    </div>`;
    const bitsEl=document.getElementById('par-bits'), typeEl=document.getElementById('par-type'), out=document.getElementById('par-out');
    function recompute(){
      const raw = bitsEl.value.replace(/[^01]/g,'');
      if(!raw.length){ out.classList.add('err'); out.innerHTML='⚠ Ingresá una cadena de 0 y 1'; return; }
      const ones = raw.split('').filter(b=>b==='1').length;
      const isPar = typeEl.value==='par';
      let parityBit;
      if(isPar) parityBit = (ones%2===0)? '0':'1';
      else parityBit = (ones%2!==0)? '0':'1';
      out.classList.remove('err');
      out.innerHTML = `
        <div class="oitem"><span class="l">Unos en los datos</span><span class="v">${ones}</span></div>
        <div class="oitem"><span class="l">Bit de paridad agregado</span><span class="v">${parityBit}</span></div>
        <div class="oitem"><span class="l">Palabra completa a transmitir</span><span class="v">${raw}${parityBit}</span></div>`;
    }
    bitsEl.addEventListener('input', recompute);
    typeEl.addEventListener('change', recompute);
    recompute();
  }

  if(f.special === "dmt-bitload"){
    slot.innerHTML = `<div class="calc">
      <div class="calc-label">GRÁFICO — BITS POR SUBPORTADORA DMT (CON INTERFERENCIA SIMULADA)</div>
      <div class="row">
        <div class="field"><label>Subportadora inicio interferencia</label><input type="number" min="0" max="63" step="1" id="dm-i0" value="18"></div>
        <div class="field"><label>Subportadora fin interferencia</label><input type="number" min="0" max="63" step="1" id="dm-i1" value="27"></div>
        <div class="field"><label>Intensidad de la interferencia [dB]</label><input type="range" min="0" max="40" step="1" id="dm-lvl" value="25"></div>
      </div>
      <canvas id="dm-canvas" width="900" height="320" style="width:100%;height:auto;aspect-ratio:900/320;background:var(--scope-bg);border:1px solid var(--line-soft);border-radius:3px;"></canvas>
      <div class="calc-out" id="dm-out"></div>
    </div>`;
    const i0El=document.getElementById('dm-i0'), i1El=document.getElementById('dm-i1'), lvlEl=document.getElementById('dm-lvl');
    const canvas=document.getElementById('dm-canvas'), ctx=canvas.getContext('2d');
    const out=document.getElementById('dm-out');
    const N=64; // subportadoras simplificadas (ADSL real usa 256)
    const dfSub=4312.5; // Hz, ancho de cada subportadora (estándar ADSL)

    function draw(){
      const i0=Math.min(parseInt(i0El.value), parseInt(i1El.value));
      const i1=Math.max(parseInt(i0El.value), parseInt(i1El.value));
      const lvl=parseFloat(lvlEl.value);
      const bits=[];
      for(let k=0;k<N;k++){
        let snrDb = 48 - k*0.35; // perfil base: cae suavemente con la frecuencia
        if(k>=i0 && k<=i1) snrDb -= lvl;
        const snr = Math.pow(10, snrDb/10);
        let b = Math.round(Math.log2(1+snr));
        b = Math.max(0, Math.min(14, b));
        bits.push(b);
      }
      const W=canvas.width, H=canvas.height, padL=50, padR=16, padT=16, padB=40;
      const plotW=W-padL-padR, plotH=H-padT-padB;
      const barW = plotW/N;
      ctx.clearRect(0,0,W,H);
      ctx.strokeStyle='rgba(14,124,102,0.16)'; ctx.lineWidth=1;
      [0,4,8,12].forEach(v=>{
        const y=padT+plotH-(v/14)*plotH;
        ctx.beginPath(); ctx.moveTo(padL,y); ctx.lineTo(padL+plotW,y); ctx.stroke();
        ctx.fillStyle='#4E5F56'; ctx.font='10px IBM Plex Mono, monospace'; ctx.textAlign='right';
        ctx.fillText(v+'b', padL-6, y+3);
      });
      ctx.textAlign='left';
      bits.forEach((b,k)=>{
        const x=padL+k*barW;
        const h=(b/14)*plotH;
        const interf = k>=i0 && k<=i1;
        ctx.fillStyle = interf ? '#A85A18' : '#0E7C66';
        ctx.fillRect(x+1, padT+plotH-h, barW-2, h);
      });
      ctx.fillStyle='#4E5F56'; ctx.font='11px IBM Plex Mono, monospace'; ctx.textAlign='center';
      ctx.fillText('subportadora (0–'+(N-1)+', '+(dfSub/1000).toFixed(2)+' kHz c/u)', padL+plotW/2, H-10);
      ctx.textAlign='left';

      const totalBps = bits.reduce((a,b)=>a+b,0) * dfSub * (4000/4312.5); // tasa de símbolos ~4000 baud estándar DMT
      out.innerHTML = `
        <div class="oitem"><span class="l">Subportadoras afectadas</span><span class="v">${i0}–${i1} (${i1-i0+1} de ${N})</span></div>
        <div class="oitem"><span class="l">Bits en esa franja</span><span class="v">${bits.slice(i0,i1+1).join(',')}</span></div>
        <div class="oitem"><span class="l">Velocidad total estimada</span><span class="v">${(totalBps/1e6).toFixed(2)} Mbps</span></div>`;
    }
    [i0El,i1El,lvlEl].forEach(el=>el.addEventListener('input', draw));
    draw();
  }

  if(f.special === "linecode"){
    slot.innerHTML = `<div class="calc">
      <div class="calc-label">GRAFICADOR — CÓDIGOS DE LÍNEA (NRZ-L, NRZ-I, RZ, MANCHESTER, MANCHESTER DIFERENCIAL, AMI, B8ZS, HDB3)</div>
      <div class="row">
        <div class="field" style="flex:2">
          <label>Trama de bits (máx. 16)</label>
          <input type="text" id="lc-bits" value="1000000001100001" maxlength="16">
        </div>
      </div>
      <canvas id="lc-canvas" width="860" height="540" style="width:100%;height:auto;aspect-ratio:860/540;background:var(--scope-bg);border:1px solid var(--line-soft);border-radius:3px;"></canvas>
    </div>`;
    const bitsEl = document.getElementById('lc-bits');
    const canvas = document.getElementById('lc-canvas');
    const ctx = canvas.getContext('2d');

    const SCHEMES = [
      {key:'bits', label:'Bits'},
      {key:'nrzl', label:'NRZ-L'},
      {key:'nrzi', label:'NRZ-I'},
      {key:'rz', label:'RZ (unipolar)'},
      {key:'man', label:'Manchester'},
      {key:'dman', label:'Manchester diferencial'},
      {key:'ami', label:'AMI (bipolar)'},
      {key:'b8zs', label:'B8ZS'},
      {key:'hdb3', label:'HDB3'}
    ];

    function levelsB8ZS(bits){
      const levels = new Array(bits.length).fill(0);
      let lastPulse = -1, i=0;
      while(i<bits.length){
        if(bits[i]===0 && i+8<=bits.length && bits.slice(i,i+8).every(b=>b===0)){
          const v = lastPulse;
          const pattern = [0,0,0,v,-v,0,-v,v];
          for(let k=0;k<8;k++) levels[i+k]=pattern[k];
          lastPulse = v; i+=8;
        } else if(bits[i]===0){ i++; }
        else { lastPulse = -lastPulse; levels[i]=lastPulse; i++; }
      }
      return levels;
    }

    function levelsHDB3(bits){
      const levels = new Array(bits.length).fill(0);
      let lastPulse=-1, lastViolation=-1, onesSinceSub=0, i=0;
      while(i<bits.length){
        if(bits[i]===0 && i+4<=bits.length && bits.slice(i,i+4).every(b=>b===0)){
          lastViolation = -lastViolation;
          const v = lastViolation;
          const pattern = (onesSinceSub%2===1) ? [0,0,0,v] : [v,0,0,v];
          for(let k=0;k<4;k++) levels[i+k]=pattern[k];
          lastPulse = v; onesSinceSub=0; i+=4;
        } else if(bits[i]===0){ i++; }
        else { lastPulse=-lastPulse; levels[i]=lastPulse; onesSinceSub++; i++; }
      }
      return levels;
    }

    function genSegments(bits, scheme){
      if(scheme==='b8zs' || scheme==='hdb3'){
        const levels = scheme==='b8zs' ? levelsB8ZS(bits) : levelsHDB3(bits);
        return levels.map((lvl,i)=>({t0:i, t1:i+1, lvl}));
      }
      const segs = [];
      if(scheme==='nrzl'){
        bits.forEach((b,i)=> segs.push({t0:i, t1:i+1, lvl: b? 1 : -1}));
      } else if(scheme==='nrzi'){
        let prev=-1;
        bits.forEach((b,i)=>{ if(b===1) prev=-prev; segs.push({t0:i,t1:i+1,lvl:prev}); });
      } else if(scheme==='rz'){
        bits.forEach((b,i)=>{
          if(b===1){ segs.push({t0:i,t1:i+0.5,lvl:1}); segs.push({t0:i+0.5,t1:i+1,lvl:0}); }
          else { segs.push({t0:i,t1:i+1,lvl:0}); }
        });
      } else if(scheme==='man'){
        bits.forEach((b,i)=>{
          if(b===1){ segs.push({t0:i,t1:i+0.5,lvl:-1}); segs.push({t0:i+0.5,t1:i+1,lvl:1}); }
          else { segs.push({t0:i,t1:i+0.5,lvl:1}); segs.push({t0:i+0.5,t1:i+1,lvl:-1}); }
        });
      } else if(scheme==='dman'){
        let prevEnd=-1;
        bits.forEach((b,i)=>{
          const start = b===0 ? -prevEnd : prevEnd;
          const mid = -start;
          segs.push({t0:i,t1:i+0.5,lvl:start});
          segs.push({t0:i+0.5,t1:i+1,lvl:mid});
          prevEnd = mid;
        });
      } else if(scheme==='ami'){
        let pol=1;
        bits.forEach((b,i)=>{
          if(b===0){ segs.push({t0:i,t1:i+1,lvl:0}); }
          else { segs.push({t0:i,t1:i+1,lvl:pol}); pol=-pol; }
        });
      }
      return segs;
    }

    function draw(bits){
      const W=canvas.width, H=canvas.height;
      const n = bits.length;
      const laneH = H/SCHEMES.length;
      ctx.clearRect(0,0,W,H);

      // vertical grid: one line per bit boundary
      ctx.strokeStyle = 'rgba(14,124,102,0.16)';
      ctx.lineWidth = 1;
      for(let i=0;i<=n;i++){
        const x = (i/n)*W;
        ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke();
      }

      SCHEMES.forEach((s, laneIdx)=>{
        const laneTop = laneIdx*laneH;
        const laneMid = laneTop + laneH*0.55;
        const amp = laneH*0.32;

        // lane separator + label
        ctx.strokeStyle = 'rgba(22,36,30,0.08)';
        ctx.beginPath(); ctx.moveTo(0,laneTop); ctx.lineTo(W,laneTop); ctx.stroke();
        ctx.fillStyle = '#A85A18';
        ctx.font = '11px IBM Plex Mono, monospace';
        ctx.fillText(s.label, 8, laneTop+14);

        if(s.key==='bits'){
          ctx.fillStyle = '#16241E';
          ctx.font = '13px IBM Plex Mono, monospace';
          bits.forEach((b,i)=>{
            const x = ((i+0.5)/n)*W;
            ctx.textAlign='center';
            ctx.fillText(String(b), x, laneTop+laneH*0.72);
          });
          ctx.textAlign='left';
          return;
        }

        // baseline
        ctx.strokeStyle = 'rgba(14,124,102,0.3)';
        ctx.beginPath(); ctx.moveTo(0,laneMid); ctx.lineTo(W,laneMid); ctx.stroke();

        const segs = genSegments(bits, s.key);
        ctx.strokeStyle = '#0E7C66';
        ctx.lineWidth = 2;
        ctx.beginPath();
        segs.forEach((seg,idx)=>{
          const x0 = (seg.t0/n)*W, x1 = (seg.t1/n)*W;
          const y = laneMid - seg.lvl*amp;
          if(idx===0) ctx.moveTo(x0,y); else ctx.lineTo(x0,y);
          ctx.lineTo(x1,y);
        });
        ctx.stroke();
        // vertical connectors between consecutive segment levels
        ctx.strokeStyle = 'rgba(14,124,102,0.6)';
        ctx.beginPath();
        for(let i=1;i<segs.length;i++){
          const x = (segs[i].t0/n)*W;
          const yPrev = laneMid - segs[i-1].lvl*amp;
          const yNow = laneMid - segs[i].lvl*amp;
          ctx.moveTo(x,yPrev); ctx.lineTo(x,yNow);
        }
        ctx.stroke();
      });
    }

    function recompute(){
      const clean = bitsEl.value.replace(/[^01]/g,'').slice(0,16);
      if(clean !== bitsEl.value) bitsEl.value = clean;
      if(!clean.length){ ctx.clearRect(0,0,canvas.width,canvas.height); return; }
      draw(clean.split('').map(Number));
    }
    bitsEl.addEventListener('input', recompute);
    recompute();
  }

  if(f.special === "filter"){
    slot.innerHTML = `<div class="calc">
      <div class="calc-label">GRÁFICO — RESPUESTA EN FRECUENCIA DE UN FILTRO RC PASA-BAJO (DIAGRAMA DE BODE)</div>
      <div class="row">
        <div class="field"><label>Resistencia R [Ω]</label><input type="number" step="any" id="ft-r" value="1600"></div>
        <div class="field"><label>Capacitancia C [nF]</label><input type="number" step="any" id="ft-c" value="100"></div>
        <div class="field" style="flex:2"><label>Frecuencia a inspeccionar: <span id="ft-fval">—</span></label><input type="range" id="ft-f" min="0" max="5" step="0.01" value="2"></div>
      </div>
      <canvas id="ft-canvas" width="860" height="360" style="width:100%;height:auto;aspect-ratio:860/360;background:var(--scope-bg);border:1px solid var(--line-soft);border-radius:3px;"></canvas>
      <div class="calc-out" id="ft-out"></div>
    </div>`;
    const rEl=document.getElementById('ft-r'), cEl=document.getElementById('ft-c'), fEl=document.getElementById('ft-f');
    const fval=document.getElementById('ft-fval');
    const canvas=document.getElementById('ft-canvas'), ctx=canvas.getContext('2d');
    const out=document.getElementById('ft-out');

    function fmtHz(n){
      if(n>=1e6) return (n/1e6).toFixed(2)+' MHz';
      if(n>=1e3) return (n/1e3).toFixed(2)+' kHz';
      return n.toFixed(1)+' Hz';
    }

    function draw(){
      const R=parseFloat(rEl.value), C=parseFloat(cEl.value)*1e-9;
      if(!(R>0) || !(C>0)){ out.classList.add('err'); out.innerHTML='⚠ R y C deben ser mayores a 0'; return; }
      out.classList.remove('err');
      const fc = 1/(2*Math.PI*R*C);
      const logF = parseFloat(fEl.value); // 0..5 -> represents log10(f/fc)+2, range fc/100..fc*1000
      const fNow = fc * Math.pow(10, logF-2);
      fval.textContent = fmtHz(fNow);

      const W=canvas.width, H=canvas.height, padL=80, padR=20, padT=24, padB=46;
      const plotW=W-padL-padR, plotH=H-padT-padB;
      ctx.clearRect(0,0,W,H);
      const xMin=-3, xMax=3; // log10(f/fc)
      const yMin=-40, yMax=5; // dB
      function xPix(lg){ return padL + (lg-xMin)/(xMax-xMin)*plotW; }
      function yPix(db){ return padT + (yMax-db)/(yMax-yMin)*plotH; }

      // grid
      ctx.strokeStyle='rgba(14,124,102,0.16)'; ctx.lineWidth=1;
      for(let lg=xMin; lg<=xMax; lg++){
        const x=xPix(lg);
        ctx.beginPath(); ctx.moveTo(x,padT); ctx.lineTo(x,padT+plotH); ctx.stroke();
        ctx.fillStyle='#4E5F56'; ctx.font='10.5px IBM Plex Mono, monospace'; ctx.textAlign='center';
        ctx.fillText(lg===0?'fc':(lg>0?'fc·10^'+lg:'fc/10^'+(-lg)), x, padT+plotH+16);
      }
      [0,-3,-10,-20,-30,-40].forEach(db=>{
        const y=yPix(db);
        ctx.strokeStyle = db===-3 ? 'rgba(168,90,24,0.5)' : 'rgba(14,124,102,0.1)';
        ctx.setLineDash(db===-3?[5,4]:[]);
        ctx.beginPath(); ctx.moveTo(padL,y); ctx.lineTo(padL+plotW,y); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle='#4E5F56'; ctx.textAlign='right';
        ctx.fillText(db+' dB', padL-8, y+3);
      });
      ctx.textAlign='left';

      // magnitude curve
      ctx.strokeStyle='#0E7C66'; ctx.lineWidth=2.4; ctx.beginPath();
      const steps=240;
      for(let i=0;i<=steps;i++){
        const lg = xMin + (xMax-xMin)*i/steps;
        const ratio = Math.pow(10,lg); // f/fc
        const gv = 1/Math.sqrt(1+ratio*ratio);
        const db = 20*Math.log10(gv);
        const x=xPix(lg), y=yPix(Math.max(db,yMin));
        if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
      }
      ctx.stroke();

      // current point marker
      const ratioNow = fNow/fc;
      const gvNow = 1/Math.sqrt(1+ratioNow*ratioNow);
      const dbNow = 20*Math.log10(gvNow);
      const phiNow = -Math.atan(ratioNow)*180/Math.PI;
      const px=xPix(logF-2), py=yPix(Math.max(dbNow,yMin));
      ctx.strokeStyle='rgba(168,90,24,0.6)'; ctx.setLineDash([3,3]);
      ctx.beginPath(); ctx.moveTo(px,padT+plotH); ctx.lineTo(px,py); ctx.lineTo(padL,py); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle='#A85A18'; ctx.beginPath(); ctx.arc(px,py,5,0,7); ctx.fill();

      ctx.fillStyle='#4E5F56'; ctx.font='12px IBM Plex Mono, monospace';
      ctx.save(); ctx.translate(20,padT+plotH/2); ctx.rotate(-Math.PI/2); ctx.textAlign='center';
      ctx.fillText('Ganancia (dB)',0,0); ctx.restore();

      out.innerHTML = `
        <div class="oitem"><span class="l">fc = 1/(2πRC)</span><span class="v">${fmtHz(fc)}</span></div>
        <div class="oitem"><span class="l">f inspeccionada</span><span class="v">${fmtHz(fNow)}</span></div>
        <div class="oitem"><span class="l">Gv(f)</span><span class="v">${gvNow.toFixed(4)} (${dbNow.toFixed(2)} dB)</span></div>
        <div class="oitem"><span class="l">Fase φ(f)</span><span class="v">${phiNow.toFixed(1)}°</span></div>`;
    }
    [rEl,cEl,fEl].forEach(el=>el.addEventListener('input', draw));
    draw();
  }

  if(f.special === "shannon-capacity"){
    slot.innerHTML = `<div class="calc">
      <div class="calc-label">GRÁFICO — CAPACIDAD DE SHANNON vs. ANCHO DE BANDA (S y N₀ fijos)</div>
      <div class="row">
        <div class="field"><label>Potencia de señal S [W]</label><input type="number" step="any" id="sc-s" value="1"></div>
        <div class="field"><label>Densidad de ruido N₀ [W/Hz]</label><input type="number" step="any" id="sc-n0" value="0.000000001"></div>
        <div class="field" style="flex:2"><label>Ancho de banda B actual: <span id="sc-bval">1 kHz</span></label><input type="range" id="sc-b" min="1" max="8" step="0.01" value="3"></div>
      </div>
      <canvas id="sc-canvas" width="860" height="400" style="width:100%;height:auto;aspect-ratio:860/400;background:var(--scope-bg);border:1px solid var(--line-soft);border-radius:3px;"></canvas>
      <div class="calc-out" id="sc-out"></div>
    </div>`;
    const sEl=document.getElementById('sc-s'), n0El=document.getElementById('sc-n0'), bEl=document.getElementById('sc-b');
    const bval=document.getElementById('sc-bval');
    const canvas=document.getElementById('sc-canvas'), ctx=canvas.getContext('2d');
    const out=document.getElementById('sc-out');

    function capacity(B,S,N0){ return B*Math.log2(1+S/(N0*B)); }

    function draw(){
      const S=parseFloat(sEl.value), N0=parseFloat(n0El.value);
      const logB=parseFloat(bEl.value); // log10(B), 1..8
      const B=Math.pow(10, logB);
      bval.textContent = fmt(B)+' Hz';
      if(!(S>0) || !(N0>0)){ out.classList.add('err'); out.innerHTML='⚠ S y N₀ deben ser mayores a 0'; return; }
      out.classList.remove('err');
      const asym = S/(N0*Math.LN2);
      const W=canvas.width, H=canvas.height, padL=90, padB=50, padT=20, padR=20;
      const plotW=W-padL-padR, plotH=H-padT-padB;
      ctx.clearRect(0,0,W,H);
      const xMin=1, xMax=8; // log10(Hz)
      const yMax=asym*1.15;
      function xPix(logHz){ return padL + (logHz-xMin)/(xMax-xMin)*plotW; }
      function yPix(c){ return padT + plotH - (c/yMax)*plotH; }
      // grid + axes
      ctx.strokeStyle='rgba(14,124,102,0.16)'; ctx.lineWidth=1;
      for(let lg=xMin; lg<=xMax; lg++){
        const x=xPix(lg);
        ctx.beginPath(); ctx.moveTo(x,padT); ctx.lineTo(x,padT+plotH); ctx.stroke();
        ctx.fillStyle='#4E5F56'; ctx.font='11px IBM Plex Mono, monospace'; ctx.textAlign='center';
        ctx.fillText('10^'+lg, x, padT+plotH+18);
      }
      ctx.textAlign='left';
      // asymptote line
      ctx.strokeStyle='rgba(168,90,24,0.55)'; ctx.setLineDash([5,4]);
      ctx.beginPath(); ctx.moveTo(padL, yPix(asym)); ctx.lineTo(padL+plotW, yPix(asym)); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle='#A85A18'; ctx.font='11px IBM Plex Mono, monospace';
      ctx.fillText('límite S/(N₀·ln2) ≈ '+fmt(asym)+' bps', padL+8, yPix(asym)-8);
      // curve C(B)
      ctx.strokeStyle='#0E7C66'; ctx.lineWidth=2.4; ctx.beginPath();
      const steps=240;
      for(let i=0;i<=steps;i++){
        const lg = xMin + (xMax-xMin)*i/steps;
        const Bx = Math.pow(10,lg);
        const c = capacity(Bx,S,N0);
        const x=xPix(lg), y=yPix(Math.min(c,yMax));
        if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
      }
      ctx.stroke();
      // current point
      const cNow = capacity(B,S,N0);
      const px=xPix(logB), py=yPix(Math.min(cNow,yMax));
      ctx.strokeStyle='rgba(168,90,24,0.6)'; ctx.setLineDash([3,3]);
      ctx.beginPath(); ctx.moveTo(px,padT+plotH); ctx.lineTo(px,py); ctx.lineTo(padL,py); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle='#A85A18'; ctx.beginPath(); ctx.arc(px,py,5,0,7); ctx.fill();
      // axis labels
      ctx.fillStyle='#4E5F56'; ctx.font='12px IBM Plex Mono, monospace';
      ctx.save(); ctx.translate(22,padT+plotH/2); ctx.rotate(-Math.PI/2); ctx.textAlign='center';
      ctx.fillText('C (bps)',0,0); ctx.restore();
      ctx.textAlign='center'; ctx.fillText('B (Hz, escala log)', padL+plotW/2, H-10); ctx.textAlign='left';

      out.innerHTML = `
        <div class="oitem"><span class="l">B actual</span><span class="v">${fmt(B)} Hz</span></div>
        <div class="oitem"><span class="l">SNR = S/(N₀B)</span><span class="v">${(S/(N0*B)).toFixed(2)}</span></div>
        <div class="oitem"><span class="l">C(B)</span><span class="v">${fmt(cNow)} bps</span></div>
        <div class="oitem"><span class="l">Techo (B→∞)</span><span class="v">${fmt(asym)} bps</span></div>`;
    }
    function fmt(n){
      if(n>=1e9) return (n/1e9).toFixed(2)+'G';
      if(n>=1e6) return (n/1e6).toFixed(2)+'M';
      if(n>=1e3) return (n/1e3).toFixed(2)+'k';
      return n.toFixed(2);
    }
    [sEl,n0El,bEl].forEach(el=>el.addEventListener('input', draw));
    draw();
  }

  if(f.special === "crc"){
    slot.innerHTML = `<div class="calc">
      <div class="calc-label">CALCULADORA — DIVISIÓN POLINOMIAL CRC (MÓDULO 2)</div>
      <div class="row">
        <div class="field"><label>Mensaje M(x) — bits</label><input type="text" id="crc-msg" value="10110111"></div>
        <div class="field"><label>Generador G(x) — bits</label><input type="text" id="crc-gen" value="110011"></div>
      </div>
      <div class="calc-out" id="crc-out" style="font-size:12.5px;flex-direction:column;align-items:flex-start;gap:6px;"></div>
    </div>`;
    const msgEl=document.getElementById('crc-msg'), genEl=document.getElementById('crc-gen'), out=document.getElementById('crc-out');
    function xorDivide(dividend, gen){
      const arr = dividend.split('').map(Number);
      const g = gen.split('').map(Number);
      const r = arr.length - g.length;
      for(let i=0;i<=r;i++){
        if(arr[i]===1){
          for(let j=0;j<g.length;j++){
            arr[i+j] = arr[i+j]^g[j];
          }
        }
      }
      return arr.slice(arr.length-(g.length-1)).join('');
    }
    function recompute(){
      const msg = msgEl.value.replace(/[^01]/g,'');
      const gen = genEl.value.replace(/[^01]/g,'');
      if(!msg.length || !gen.length || gen.length<2){
        out.classList.add('err'); out.innerHTML='⚠ Ingresá mensaje y un generador de al menos 2 bits'; return;
      }
      const r = gen.length-1;
      const augmented = msg + '0'.repeat(r);
      const remainder = xorDivide(augmented, gen);
      const transmitted = msg + remainder;
      out.classList.remove('err');
      out.innerHTML = `
        <div class="oitem" style="flex-direction:column;align-items:flex-start;"><span class="l">Grado r del generador</span><span class="v">${r}</span></div>
        <div class="oitem" style="flex-direction:column;align-items:flex-start;"><span class="l">P(x) = M(x) desplazado ${r} bits</span><span class="v">${augmented}</span></div>
        <div class="oitem" style="flex-direction:column;align-items:flex-start;"><span class="l">Resto R(x) = P(x) / G(x) (mód. 2)</span><span class="v">${remainder}</span></div>
        <div class="oitem" style="flex-direction:column;align-items:flex-start;"><span class="l">Trama a transmitir T(x) = M(x) + R(x)</span><span class="v">${transmitted}</span></div>`;
    }
    msgEl.addEventListener('input', recompute);
    genEl.addEventListener('input', recompute);
    recompute();
  }
}

function mountAllCalcs(){
  Object.values(FORMULAS).forEach(f=>{
    if(f.special) mountSpecialCalc(f);
    else if(f.calc) mountGenericCalc(f);
  });
}

// ---------------------------------------------------------------
// Views
// ---------------------------------------------------------------
function viewInicio(){
  crumb.innerHTML = 'INICIO';
  let html = `<div class="hero">
    <div class="kicker">GUÍA INTERACTIVA · CÁTEDRA COMUNICACIONES</div>
    <h2>Todas las fórmulas de la cátedra, explicadas y conectadas.</h2>
    <p>Nueve unidades, un mismo hilo conductor: cómo se genera, se degrada, se mide y se transmite la información. Cada fórmula tiene su calculadora para practicar y muestra en qué otras unidades vuelve a aparecer, para que se entienda por qué el programa está ordenado así.</p>
  </div>
  <div class="hero-grid">`;
  UNITS.forEach(u=>{
    html += `<div class="hero-card" data-target="${u.id}">
      <div class="num">UNIDAD ${u.num}</div>
      <div class="t">${u.name}</div>
      <div class="c">${u.short}</div>
    </div>`;
  });
  html += `</div>
  <footer class="credit">Fuente: material teórico de cátedra (Unidad 1 a 9) · UTN-FRT · ISI · Comunicaciones${SITE_CREDIT}</footer>`;
  content.innerHTML = html;
  content.querySelectorAll('.hero-card').forEach(c=>c.addEventListener('click', ()=>goTo(c.dataset.target)));
  setActiveNav('inicio');
}

function diagramU1(){
  const blocks = [
    {name:"Fuente", link:"→ U4: Teoría de la Información", target:"u4"},
    {name:"Transmisor", link:"→ U8: Modulación", target:"u8"},
    {name:"Canal", link:"→ U3: Atenuación y Ruido · U5: Capacidad", target:"u5"},
    {name:"Receptor", link:"→ U6: Control de Errores", target:"u6"},
    {name:"Destino", link:"→ U9: Equipos (ETD/ETCD)", target:"u9"}
  ];
  let html = `<div class="diagram">`;
  blocks.forEach((b,i)=>{
    html += `<div class="dblock" data-target="${b.target}"><div class="name">${b.name}</div><div class="link">${b.link}</div></div>`;
    if(i<blocks.length-1) html += `<div class="arrow">→</div>`;
  });
  html += `</div>`;
  return html;
}

function viewUnit(id){
  const u = UNIT_BY_ID[id];
  crumb.innerHTML = `UNIDAD <b>${u.num}</b> · ${u.name.toUpperCase()}`;
  let html = `<div class="unit-head">
    <div class="eyebrow">UNIDAD ${u.num}</div>
    <h2>${u.name}</h2>
    <div class="desc">${u.intro}</div>
  </div>`;

  if(u.id==="u1") html += diagramU1();
  (u.topics||[]).forEach(t=>{
    html += `<div class="topic-block"><h3>${t.title}</h3>${t.html}</div>`;
  });

  (u.formulas||[]).forEach(fid=>{
    html += renderCard(FORMULAS[fid]);
  });

  html += `<footer class="credit">UNIDAD ${u.num} · ${u.name} — UTN-FRT · ISI · Comunicaciones${SITE_CREDIT}</footer>`;
  content.innerHTML = html;

  if(u.id==="u1"){
    content.querySelectorAll('.dblock').forEach(b=>b.addEventListener('click', ()=>goTo(b.dataset.target)));
  }
  mountAllCalcs();
  attachChipHandlers();
  setActiveNav(id);
}

// concept x unit connection map
// cada entrada de "units" mapea unidad -> id de fórmula al que saltar
// (o `true` si la unidad toca el concepto pero sin una fórmula puntual)
const MAP_CONCEPTS = [
  {name:"Ancho de banda (B)", units:{u2:"u2-f2", u3:true, u5:"u5-f2", u7:"u7-f3", u8:"u8-f1"}},
  {name:"Decibel / dBm / dBi (log₁₀)", units:{u3:"u3-f1"}},
  {name:"Ruido térmico y SNR", units:{u3:"u3-f8", u5:"u5-f6", u6:"u6-f1", u8:"u8-f4"}},
  {name:"log₂ · niveles M · bits por símbolo", units:{u4:"u4-f1", u5:"u5-f2", u7:"u7-f1", u8:"u8-f2", u9:"u9-f1"}},
  {name:"Capacidad del canal (Nyquist/Shannon)", units:{u5:"u5-f3", u7:"u7-f2", u8:"u8-f4", u9:"u9-f2"}},
  {name:"Entropía / Redundancia / Huffman", units:{u4:"u4-f2", u5:"u5-f0"}},
  {name:"Tasa de bits vs. tasa de baudios", units:{u7:"u7-f2", u8:"u8-f2", u9:"u9-f1"}},
  {name:"Muestreo (Nyquist Ts=1/fs)", units:{u5:"u5-f1", u8:"u8-f5"}},
  {name:"Control y corrección de errores", units:{u3:"u3-f8", u5:"u5-f6", u6:"u6-f1"}},
  {name:"Modulación / multicanalización aplicada", units:{u2:"u2-f1", u3:"u3-f8", u5:"u5-f3", u7:"u7-f4", u8:"u8-f6", u9:"u9-f1"}},
];

function viewMapa(){
  crumb.innerHTML = 'MAPA DE CONEXIONES';
  let html = `<div class="unit-head">
    <div class="eyebrow">VISIÓN GENERAL</div>
    <h2>¿Qué concepto se usa en qué unidad?</h2>
    <div class="desc">Ninguna unidad es un compartimento estanco: el ancho de banda que se define en la Unidad 2 reaparece en Nyquist (U5), en el ancho de banda de una modulación (U8) y en un módem real (U9). Esta tabla resume esas conexiones — hacé clic en un punto marcado para saltar directo a esa fórmula.</div>
  </div>`;
  html += `<div class="map-scroll"><table class="map-table"><thead><tr><th style="text-align:left;">Concepto</th>`;
  UNITS.forEach(u=> html += `<th>U${u.num}</th>`);
  html += `</tr></thead><tbody>`;
  MAP_CONCEPTS.forEach(c=>{
    html += `<tr><td class="concept">${c.name}</td>`;
    UNITS.forEach(u=>{
      const hit = c.units[u.id];
      if(!hit){ html += `<td class="no">·</td>`; return; }
      const fid = (hit===true) ? '' : hit;
      html += `<td class="yes" data-map-unit="${u.id}" data-map-formula="${fid}">●</td>`;
    });
    html += `</tr>`;
  });
  html += `</tbody></table></div>`;

  html += `<div class="topic-block" style="margin-top:26px;"><h3>Cómo leer esta guía</h3><p>Cada fórmula muestra, al pie, chips con las demás fórmulas relacionadas ("también aparece / se usa en"). Hacé clic en un chip para saltar directamente a esa fórmula en su unidad correspondiente. Es la forma más rápida de repasar un tema siguiendo el hilo real de la cátedra en vez del orden de las diapositivas.</p></div>`;
  html += `<footer class="credit">Mapa de conexiones — construido a partir de las referencias cruzadas de cada fórmula${SITE_CREDIT}</footer>`;
  content.innerHTML = html;
  content.querySelectorAll('.map-table td.yes').forEach(td=>{
    td.addEventListener('click', ()=>{
      const unit = td.dataset.mapUnit;
      const fid = td.dataset.mapFormula;
      goTo(unit, fid || undefined);
    });
  });
  setActiveNav('mapa');
}

function attachChipHandlers(){
  document.querySelectorAll('.chip[data-jump]').forEach(chip=>{
    chip.addEventListener('click', ()=>{
      const fid = chip.dataset.jump;
      const f = FORMULAS[fid];
      if(!f) return;
      goTo(f.unit, fid);
    });
  });
}

// ---------------------------------------------------------------
// Router
// ---------------------------------------------------------------
function goTo(target, focusFormulaId){
  if(target==='inicio') viewInicio();
  else if(target==='mapa') viewMapa();
  else if(UNIT_BY_ID[target]) viewUnit(target);
  else return;

  window.scrollTo({top:0, behavior:'instant'});
  if(focusFormulaId){
    setTimeout(()=>{
      const el = document.getElementById('card-'+focusFormulaId);
      if(el){
        el.scrollIntoView({behavior:'smooth', block:'center'});
        el.classList.add('pulse');
        setTimeout(()=>el.classList.remove('pulse'), 1500);
      }
    }, 60);
  }
  location.hash = target + (focusFormulaId? ('/'+focusFormulaId):'');
}

// ---------------------------------------------------------------
// Search
// ---------------------------------------------------------------
function buildSearchIndex(){
  return Object.values(FORMULAS).map(f=>({
    id:f.id, unit:f.unit, name:f.name,
    haystack:(f.name+' '+f.explain+' '+f.id).toLowerCase()
  }));
}
const SEARCH_INDEX = [];

const searchBox = document.getElementById('search-box');
const searchSuggest = document.getElementById('search-suggest');
let searchActiveIdx = -1;
let searchMatches = [];

function searchRank(q){
  return SEARCH_INDEX
    .map(s=>{
      const nameLower = s.name.toLowerCase();
      let score = -1;
      if(nameLower.startsWith(q)) score = 3;
      else if(nameLower.includes(q)) score = 2;
      else if(s.haystack.includes(q)) score = 1;
      return {s, score};
    })
    .filter(x=>x.score>0)
    .sort((a,b)=> b.score-a.score || a.s.name.length-b.s.name.length)
    .slice(0,8)
    .map(x=>x.s);
}

function renderSuggest(){
  if(!searchMatches.length){
    searchSuggest.innerHTML = `<div class="empty">Sin resultados — probá con el nombre de la fórmula o un id (ej. u5-f3)</div>`;
    searchSuggest.classList.add('open');
    return;
  }
  searchSuggest.innerHTML = searchMatches.map((s,i)=>{
    const u = UNIT_BY_ID[s.unit];
    return `<div class="sitem${i===searchActiveIdx?' active':''}" data-idx="${i}"><span class="n">${s.name}</span><span class="u">U${u.num} · ${s.id}</span></div>`;
  }).join('');
  searchSuggest.classList.add('open');
}

function closeSuggest(){
  searchSuggest.classList.remove('open');
  searchActiveIdx = -1;
}

function jumpToMatch(s){
  if(!s) return;
  goTo(s.unit, s.id);
  searchBox.value = '';
  closeSuggest();
  searchBox.blur();
}

searchBox.addEventListener('input', ()=>{
  const q = searchBox.value.trim().toLowerCase();
  searchActiveIdx = -1;
  if(!q){ closeSuggest(); return; }
  searchMatches = searchRank(q);
  renderSuggest();
});

searchBox.addEventListener('focus', ()=>{
  if(searchBox.value.trim()) renderSuggest();
});

searchBox.addEventListener('keydown', (e)=>{
  if(e.key==='ArrowDown'){
    if(!searchMatches.length) return;
    e.preventDefault();
    searchActiveIdx = Math.min(searchActiveIdx+1, searchMatches.length-1);
    renderSuggest();
  } else if(e.key==='ArrowUp'){
    if(!searchMatches.length) return;
    e.preventDefault();
    searchActiveIdx = Math.max(searchActiveIdx-1, 0);
    renderSuggest();
  } else if(e.key==='Enter'){
    const pick = searchMatches[searchActiveIdx] || searchMatches[0];
    if(pick) jumpToMatch(pick);
  } else if(e.key==='Escape'){
    closeSuggest();
  }
});

searchSuggest.addEventListener('click', (e)=>{
  const item = e.target.closest('.sitem');
  if(!item) return;
  jumpToMatch(searchMatches[parseInt(item.dataset.idx)]);
});

document.addEventListener('click', (e)=>{
  if(!e.target.closest('.search-wrap')) closeSuggest();
});

// ---------------------------------------------------------------
// Mobile sidebar
// ---------------------------------------------------------------
document.getElementById('menu-btn').addEventListener('click', ()=>{
  document.getElementById('sidebar').classList.toggle('open');
});
function closeSidebarMobile(){
  document.getElementById('sidebar').classList.remove('open');
}

// ---------------------------------------------------------------
// Boot
// ---------------------------------------------------------------
function boot(){
  buildSidebar();
  SEARCH_INDEX.push(...buildSearchIndex());
  const hash = location.hash.replace('#','');
  if(hash){
    const [target, fid] = hash.split('/');
    goTo(target, fid);
  } else {
    viewInicio();
  }
}
katexReady(boot);

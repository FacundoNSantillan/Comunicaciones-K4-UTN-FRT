// =====================================================================
// Motor de la aplicación
// =====================================================================

const UNIT_BY_ID = {};
UNITS.forEach(u => UNIT_BY_ID[u.id] = u);

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

  if(f.special === "fourier"){
    slot.innerHTML = `<div class="calc">
      <div class="calc-label">SIMULADOR — RECONSTRUCCIÓN DE UNA ONDA CUADRADA</div>
      <div class="row">
        <div class="field" style="flex:2">
          <label>Cantidad de armónicos impares a sumar: <span id="fx-nval">1</span></label>
          <input type="range" min="1" max="49" step="2" value="1" id="fx-range">
        </div>
      </div>
      <canvas id="fx-canvas" width="820" height="220" style="width:100%;background:#081210;border:1px solid var(--line-soft);border-radius:3px;"></canvas>
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
      ctx.strokeStyle = 'rgba(95,208,196,0.12)';
      ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(0,mid); ctx.lineTo(W,mid); ctx.stroke();
      // ideal square wave (faint)
      ctx.strokeStyle = 'rgba(255,180,84,0.35)';
      ctx.beginPath();
      for(let px=0; px<=W; px++){
        const t = (px/W)*2*Math.PI*2; // 2 periods
        const s = Math.sin(t) >= 0 ? 1 : -1;
        const y = mid - s*amp;
        if(px===0) ctx.moveTo(px,y); else ctx.lineTo(px,y);
      }
      ctx.stroke();
      // partial fourier sum
      ctx.strokeStyle = '#5fd0c4';
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
  <footer class="credit">Fuente: material teórico de cátedra (Unidad 1 a 9) · UTN-FRT · ISI · Comunicaciones</footer>`;
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

  if(u.id==="u1"){
    html += diagramU1();
    html += `<div class="topic-block"><h3>Objetivos de un sistema de comunicaciones</h3><p>Intercambiar información entre dos o más entidades. Toda transmisión de datos requiere hardware y software organizados en un sistema de comunicación, cuya efectividad depende de cuatro características: entrega, exactitud, puntualidad y retardo variable (jitter).</p></div>`;
    html += `<div class="topic-block"><h3>Esquema de bloques</h3><p><b>Fuente</b> (genera la información) → <b>Transmisor</b> (codifica/transforma la señal para el canal) → <b>Canal</b> (medio de transmisión, con una fuente de ruido asociada) → <b>Receptor</b> (decodifica) → <b>Destino</b>. Cada uno de estos bloques es, en rigor, el título de una de las unidades siguientes — hacé clic en cualquier bloque del diagrama de arriba.</p></div>`;
    html += `<div class="topic-block"><h3>Medios de transmisión</h3><p>Se clasifican en <b>guiados</b> (par trenzado, cable coaxial, fibra óptica) y <b>no guiados</b> (radio, microondas, satélite, infrarrojo). Sus características físicas — atenuación, ancho de banda disponible, susceptibilidad al ruido — son justamente el contenido de la Unidad 3.</p></div>`;
  } else if(u.isConceptual){
    // fallback, not used currently
  }

  (u.formulas||[]).forEach(fid=>{
    html += renderCard(FORMULAS[fid]);
  });

  html += `<footer class="credit">UNIDAD ${u.num} · ${u.name} — UTN-FRT · ISI · Comunicaciones</footer>`;
  content.innerHTML = html;

  if(u.id==="u1"){
    content.querySelectorAll('.dblock').forEach(b=>b.addEventListener('click', ()=>goTo(b.dataset.target)));
  }
  mountAllCalcs();
  attachChipHandlers();
  setActiveNav(id);
}

// concept x unit connection map
const MAP_CONCEPTS = [
  {name:"Ancho de banda (B)", units:["u2","u3","u5","u7","u8"]},
  {name:"Decibel / dBm / dBi (log₁₀)", units:["u3"]},
  {name:"Ruido térmico y SNR", units:["u3","u5","u6","u8"]},
  {name:"log₂ · niveles M · bits por símbolo", units:["u4","u5","u7","u8","u9"]},
  {name:"Capacidad del canal (Nyquist/Shannon)", units:["u5","u7","u8","u9"]},
  {name:"Entropía / Redundancia / Huffman", units:["u4","u5"]},
  {name:"Tasa de bits vs. tasa de baudios", units:["u7","u8","u9"]},
  {name:"Muestreo (Nyquist Ts=1/fs)", units:["u5","u8"]},
  {name:"Control y corrección de errores", units:["u3","u5","u6"]},
  {name:"Modulación / multicanalización aplicada", units:["u2","u3","u5","u7","u8","u9"]},
];

function viewMapa(){
  crumb.innerHTML = 'MAPA DE CONEXIONES';
  let html = `<div class="unit-head">
    <div class="eyebrow">VISIÓN GENERAL</div>
    <h2>¿Qué concepto se usa en qué unidad?</h2>
    <div class="desc">Ninguna unidad es un compartimento estanco: el ancho de banda que se define en la Unidad 2 reaparece en Nyquist (U5), en el ancho de banda de una modulación (U8) y en un módem real (U9). Esta tabla resume esas conexiones; cada celda marcada es "sí, esta unidad usa este concepto".</div>
  </div>`;
  html += `<table class="map-table"><thead><tr><th style="text-align:left;">Concepto</th>`;
  UNITS.forEach(u=> html += `<th>U${u.num}</th>`);
  html += `</tr></thead><tbody>`;
  MAP_CONCEPTS.forEach(c=>{
    html += `<tr><td class="concept">${c.name}</td>`;
    UNITS.forEach(u=>{
      html += c.units.includes(u.id) ? `<td class="yes">●</td>` : `<td class="no">·</td>`;
    });
    html += `</tr>`;
  });
  html += `</tbody></table>`;

  html += `<div class="topic-block" style="margin-top:26px;"><h3>Cómo leer esta guía</h3><p>Cada fórmula muestra, al pie, chips con las demás fórmulas relacionadas ("también aparece / se usa en"). Hacé clic en un chip para saltar directamente a esa fórmula en su unidad correspondiente. Es la forma más rápida de repasar un tema siguiendo el hilo real de la cátedra en vez del orden de las diapositivas.</p></div>`;
  html += `<footer class="credit">Mapa de conexiones — construido a partir de las referencias cruzadas de cada fórmula</footer>`;
  content.innerHTML = html;
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

document.getElementById('search-box').addEventListener('keydown', (e)=>{
  if(e.key==='Enter'){
    const q = e.target.value.trim().toLowerCase();
    if(!q) return;
    const hit = SEARCH_INDEX.find(s=>s.haystack.includes(q));
    if(hit){ goTo(hit.unit, hit.id); }
  }
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

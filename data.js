// =====================================================================
// Contenido extraído de la cátedra "Comunicaciones" (UTN-FRT ISI)
// Unidades 1 a 9 — cada fórmula está vinculada a las unidades donde
// vuelve a aparecer o se reutiliza.
// =====================================================================

const UNITS = [
  {
    id: "u1", num: 1, name: "Sistemas de Comunicación",
    short: "Esquema general",
    intro: "Presenta el objetivo de todo sistema de comunicaciones (intercambiar información entre dos o más entidades), su esquema de bloques y los medios de transmisión. Es la unidad conceptual que da marco a todas las demás: cada bloque del esquema se desarrolla en detalle en una unidad posterior.",
    isConceptual: true,
    formulas: [],
    topics: [
      {title:"Objetivos de un sistema de comunicaciones", html:"<p>La idea de fondo es simple: hacer que dos puntos intercambien información. Para que eso funcione bien, un sistema tiene que cumplir cuatro cosas: entregar los datos, que lleguen sin errores, a tiempo, y sin saltos raros en la demora (jitter).</p>"},
      {title:"Esquema de bloques", html:"<p><b>Fuente</b> → <b>Transmisor</b> → <b>Canal</b> → <b>Receptor</b> → <b>Destino</b>. La fuente genera la información, el transmisor la adapta para poder viajar por el canal, el canal es el medio físico (con su ruido), el receptor la decodifica del otro lado y el destino la recibe. Cada bloque es, básicamente, el tema de una unidad distinta — probá clickear alguno en el diagrama de arriba.</p>"},
      {title:"Simplex, half-duplex y full-duplex", html:"<p>Tres formas de repartir el sentido de la comunicación: <b>simplex</b> es un solo sentido siempre (la radio FM), <b>half-duplex</b> son los dos sentidos pero de a uno por vez (un walkie-talkie), y <b>full-duplex</b> son los dos al mismo tiempo (una llamada). No es solo una categoría: en full-duplex el ancho de banda se reparte entre ambos sentidos, en half-duplex cada uno lo usa entero, pero turnándose.</p>"},
      {title:"Banda base vs. modulada", html:"<p>Una señal digital se puede mandar <b>en banda base</b> (los bits viajan tal cual, con algún código de línea — Unidad 7) o <b>modulada</b> (los bits varían la amplitud, frecuencia o fase de una portadora — Unidad 8). Banda base es más simple, pero ocupa el espectro desde 0 Hz, así que no sirve para inalámbrico ni para compartir un cable. Modular la traslada a una banda de frecuencia específica, lo que permite multicanalizar y transmitir a distancia.</p>"},
      {title:"Alcance y topología de una red", html:"<p>Por alcance: PAN (personal), LAN (un edificio), MAN (una ciudad) y WAN (un país o el mundo — Internet, básicamente). Por topología física, cómo están cableados los nodos entre sí: bus (un cable compartido), estrella (todos contra un nodo central), anillo (en círculo), malla (todos con todos) y árbol (estrellas jerarquizadas). La topología que se elija define qué tan tolerante a fallas es la red y cuánto cuesta cablearla.</p>"},
      {title:"Medios guiados y no guiados", html:"<p>Guiados: par trenzado, cable coaxial y fibra óptica. No guiados: radio, microondas, satélite, infrarrojo. Cada uno tiene su propia atenuación típica (par trenzado ≈3 dB/km, coaxial ≈7 dB/km, fibra ≈0,2–0,5 dB/km) — esos números son justo los que después se usan en las fórmulas de atenuación de la Unidad 3.</p>"}
    ]
  },
  {
    id: "u2", num: 2, name: "Características de Señales",
    short: "Fourier y ancho de banda",
    intro: "Clasifica las señales y muestra cómo cualquier señal periódica puede descomponerse en una suma de senos y cosenos (Serie de Fourier), lo que permite definir su espectro y su ancho de banda: la base de todo lo que en unidades posteriores se hace con el ancho de banda de un canal.",
    formulas: ["u2-f1", "u2-f2", "u2-f3"]
  },
  {
    id: "u3", num: 3, name: "Atenuación, Distorsión y Ruido",
    short: "dB, dBm, SNR, ruido térmico",
    intro: "Estudia cómo se degrada una señal en su paso por el canal: atenuación (dB, dBm, dBi), pérdida en espacio libre, ruido térmico y la relación señal a ruido (SNR). Estas magnitudes son el insumo directo de la Unidad 5 (capacidad del canal) y de la Unidad 8 (calidad de una modulación).",
    topics: [
      {title:"Tipos de distorsión", html:"<p>El ruido agrega algo que no estaba; la distorsión cambia la forma de lo que ya estaba. Hay tres tipos: <b>por atenuación</b> (no todas las frecuencias se atenúan igual, así que las más agudas llegan más débiles), <b>por retardo</b> (cada frecuencia viaja a distinta velocidad y llega desfasada, un problema serio en transmisión digital rápida) y <b>armónica</b> (un componente no lineal genera armónicos — 2f, 3f... — que no estaban en la señal original).</p>"},
      {title:"Tipos de ruido", html:"<p>Además del ruido térmico (u3-f6/u3-f7) hay varios más. Externo: atmosférico, generado por motores o líneas de alta tensión, impulsivo (picos cortos), y diafonía (una señal se acopla a un cable vecino). Interno: ruido de disparo (shot noise) y de partición, por cómo se mueve la corriente en los semiconductores. La distorsión armónica y la intermodulación son distintas: dependen de la señal y desaparecen si la señal desaparece.</p>"}
    ],
    formulas: ["u3-f1","u3-f2","u3-f3","u3-f4","u3-f5","u3-f6","u3-f7","u3-f8","u3-f9"]
  },
  {
    id: "u4", num: 4, name: "Teoría de la Información y Codificación",
    short: "Entropía, Huffman",
    intro: "Teoría matemática de Shannon: cuánta información aporta un mensaje, cuánta incertidumbre promedio tiene una fuente (entropía) y cómo codificarla de forma óptima (Huffman). Es la base de la eficiencia de un codificador de fuente que se retoma en la Unidad 5.",
    formulas: ["u4-f1","u4-f2","u4-f3","u4-f4","u4-f5","u4-f6"]
  },
  {
    id: "u5", num: 5, name: "Canales de Comunicaciones",
    short: "Nyquist, Shannon, Eb/No",
    intro: "Responde la pregunta central de la cátedra: ¿cuál es la máxima velocidad a la que se puede transmitir información por un canal? Nyquist para canales ideales, Shannon para canales con ruido, y la relación Eb/No para comparar esquemas de modulación digital.",
    formulas: ["u5-f0","u5-f1","u5-f2","u5-f3","u5-f4","u5-f5","u5-f6","u5-f7"]
  },
  {
    id: "u6", num: 6, name: "Errores en la transmisión de datos",
    short: "BER, paridad, CRC, Hamming",
    intro: "Toda la Unidad 3 (ruido) tiene una consecuencia práctica: bits que llegan mal. Acá se ve cómo medirlo (BER), cómo detectarlo (paridad VRC/LRC, CRC) y cómo corregirlo (distancia de Hamming, código de Hamming, FEC).",
    topics: [
      {title:"ARQ: corrección pidiendo retransmisión", html:"<p>Hamming corrige sin pedir nada de vuelta (FEC). ARQ hace lo opuesto: detecta el error y pide retransmitir. Hay tres variantes. <b>Parada-y-espera</b>: mandás una trama, esperás el ACK, recién ahí mandás la siguiente — simple, pero deja el canal parado mientras espera.</p><p><b>Go-Back-N</b>: mandás varias tramas seguidas sin esperar cada ACK; si una llega mal, se retransmiten todas desde ahí, aunque algunas hayan llegado bien. <b>Repetición selectiva</b> hace lo mismo pero retransmite solo la trama que falló — más eficiente, pero el receptor necesita más memoria para reordenar.</p>"}
    ],
    formulas: ["u6-f1","u6-f2","u6-f3","u6-f4","u6-f5","u6-f6","u6-f7"]
  },
  {
    id: "u7", num: 7, name: "Técnicas de transmisión de la información",
    short: "Bits, baudios, ancho de banda",
    intro: "Formaliza la relación entre bits, símbolos (baudios) y ancho de banda necesario para transmitirlos. Es la 'caja de herramientas' que después se usa tal cual en la Unidad 8 (modulación) y en la Unidad 9 (módems).",
    topics: [
      {title:"Síncrona, asíncrona e isócrona", html:"<p>La <b>asíncrona</b> manda bit a bit, con un bit de inicio y uno de parada por carácter: simple, pero esos bits extra son pura sobrecarga. La <b>síncrona</b> agrupa los datos en tramas grandes con un reloj compartido entre emisor y receptor, mucho más eficiente. La <b>isócrona</b> suma a eso una latencia constante entre símbolos — necesaria para voz o video, donde una demora variable molesta más que perder algún dato.</p>"}
    ],
    formulas: ["u7-f1","u7-f2","u7-f3","u7-f4"]
  },
  {
    id: "u8", num: 8, name: "Modulación y Multiplexación de señales",
    short: "ASK/FSK/PSK/QAM, PCM",
    intro: "Aplica todo lo anterior: ancho de banda (U2/U7), capacidad y SNR (U3/U5) y tasa de bits/baudios (U7) a las técnicas concretas de modulación digital (ASK, FSK, PSK, QAM), a la modulación de pulsos (PAM/PCM) y a la multicanalización (FDM/TDM).",
    topics: [
      {title:"PAM, PWM y PPM: pulsos analógicos", html:"<p>Antes de llegar a PCM (ya digital) hay tres formas de modular con pulsos sin cuantificar nada. <b>PAM</b>: la amplitud de cada pulso sigue la señal — es, de hecho, el primer paso de PCM. <b>PWM</b>: la amplitud es constante pero varía el ancho del pulso; se usa mucho en electrónica de potencia. <b>PPM</b>: amplitud y ancho constantes, varía la posición del pulso en el tiempo — la más inmune al ruido, pero también la más difícil de detectar.</p>"},
      {title:"FDM y TDM: compartir el canal", html:"<p><b>FDM</b> le da a cada señal una banda de frecuencia distinta, separadas por bandas de guarda — es la técnica detrás de la radio FM con varias emisoras. <b>TDM</b> en cambio reparte el tiempo: cada señal transmite por turnos en una ranura fija dentro de una trama que se repite (así funciona la trama E1 de telefonía). También existe la <b>TDM estadística</b>, que asigna ranuras solo a quien tiene datos para mandar en ese momento — la base de ATM y, después, de los paquetes.</p>"}
    ],
    formulas: ["u8-f1","u8-f2","u8-f3","u8-f4","u8-f5","u8-f6","u8-f7"]
  },
  {
    id: "u9", num: 9, name: "Equipos de comunicación de datos (ECD)",
    short: "Módems, xDSL, DMT",
    intro: "Baja todo a los equipos reales: el módem como ETCD, sus velocidades M-arias (misma fórmula de la Unidad 7) y la técnica DMT usada en xDSL para calcular la velocidad máxima teórica de un ADSL.",
    topics: [
      {title:"Estándares de módem (Serie V, ITU-T)", html:"<p>Cada estándar fija la modulación y la tasa de símbolos, y de ahí sale la velocidad máxima (R=r×n, Unidad 7):</p><table class='map-table' style='margin-top:10px;'><tr><th>Estándar</th><th>Modulación</th><th>Semidúplex</th><th>Dúplex</th></tr><tr><td class='concept'>V.22bis</td><td>4-QAM</td><td>2400 bps</td><td>1200 bps</td></tr><tr><td class='concept'>V.26</td><td>4-PSK</td><td>2400 bps</td><td>1200 bps</td></tr><tr><td class='concept'>V.27</td><td>8-PSK</td><td>4800 bps</td><td>2400 bps</td></tr><tr><td class='concept'>V.29</td><td>16-QAM</td><td>9600 bps</td><td>4800 bps</td></tr><tr><td class='concept'>V.32</td><td>32-QAM</td><td>—</td><td>9600 bps</td></tr><tr><td class='concept'>V.32bis</td><td>64-QAM</td><td>—</td><td>14400 bps</td></tr><tr><td class='concept'>V.34</td><td>960-QAM</td><td>—</td><td>33600 bps</td></tr></table><p style='margin-top:10px;'>La tasa semidúplex siempre duplica a la dúplex, porque en dúplex el canal se reparte entre los dos sentidos al mismo tiempo.</p>"},
      {title:"Canales de un ADSL clásico", html:"<p>El ADSL reparte la línea de cobre en tres usos: <b>voz</b> (0-4 kHz), una <b>banda de guarda</b> y, con FDM, <b>upstream</b> (24 subcanales, hasta 1,44 Mbps teóricos) y <b>downstream</b> (224 subcanales, hasta 13,44 Mbps teóricos). En la práctica, por la distancia a la central, un ADSL clásico suele dar unos 8 Mbps de bajada y 1 Mbps de subida.</p>"},
      {title:"Familia xDSL: velocidad vs. distancia", html:"<p>Todas las variantes son el mismo principio (DMT sobre cobre) con distinto reparto de banda: ADSL llega a 8/1 Mbps, ADSL2+ a 24/2, VDSL2 hasta 100/50 pero solo muy cerca de la central, y HDSL es simétrico (1,5-2 Mbps ambos lados), pensado para enlaces dedicados. El patrón se repite siempre: más velocidad promete, menos distancia aguanta, porque el cable de cobre atenúa más a mayor frecuencia.</p>"}
    ],
    formulas: ["u9-f1","u9-f2","u9-f3"]
  }
];

// A quick lookup index built at runtime: FORMULAS[id] -> formula obj
const FORMULAS = {};

// =====================================================================
// UNIDAD 2
// =====================================================================
FORMULAS["u2-f1"] = {
  id:"u2-f1", unit:"u2",
  name:"Serie de Fourier trigonométrica",
  latex:"f(t)=\\dfrac{a_0}{2}+\\sum_{n=1}^{\\infty}a_n\\cos(n\\omega_0 t)+\\sum_{n=1}^{\\infty}b_n\\,\\text{sen}(n\\omega_0 t)\\qquad \\omega_0=\\dfrac{2\\pi}{T}",
  vars:[
    ["f(t)","función periódica de período T"],
    ["a₀, aₙ, bₙ","coeficientes: amplitudes de cada armónico"],
    ["ω₀","frecuencia angular fundamental (rad/s)"],
    ["n","número de armónico (1,2,3…)"]
  ],
  explain:`Fourier se dio cuenta de algo útil: cualquier señal periódica se puede armar sumando senos y cosenos de distintas frecuencias (armónicos). Con pocos armónicos la aproximación es gruesa; sumando más, se va pareciendo cada vez más a la señal real. De acá sale la idea de "espectro": en vez de pensar la señal en el tiempo, pensarla como una lista de frecuencias y qué tanto pesa cada una.`,
  example:`Para una onda cuadrada de período T, la serie resulta<br><code>f(t) = (4/π)[ sen(ω₀t) + (1/3)sen(3ω₀t) + (1/5)sen(5ω₀t) + (1/7)sen(7ω₀t) + … ]</code><br>— sólo aparecen armónicos impares. Probá el simulador: cada armónico que agregás acerca la curva a la onda cuadrada ideal.`,
  related:["u2-f2","u5-f2","u7-f3"],
  special:"fourier"
};

FORMULAS["u2-f2"] = {
  id:"u2-f2", unit:"u2",
  name:"Ancho de banda efectivo de una señal",
  latex:"B = \\Delta f = f_2-f_1 \\;\\;\\text{(rango de frecuencias que concentra la mayor parte de la energía)}",
  vars:[["B","ancho de banda efectivo (Hz)"],["f1, f2","frecuencias que delimitan el espectro útil"]],
  explain:"Una señal real tiene infinitos armónicos, pero no todos pesan igual. El ancho de banda efectivo es, en la práctica, el rango de frecuencias donde se concentra casi toda la energía de la señal. Y es un dato clave: cuanto más ancho de banda tiene un canal, más información puede transportar (esto se formaliza en Nyquist y Shannon, Unidad 5).",
  example:"La voz humana ocupa entre 300 Hz y 3400 Hz aproximadamente: su ancho de banda efectivo (usado por la telefonía) es de unos 3100 Hz, aunque el oído humano perciba hasta 20 kHz.",
  related:["u7-f3","u5-f2","u5-f3","u8-f1"],
  calc:null
};

FORMULAS["u2-f3"] = {
  id:"u2-f3", unit:"u2",
  name:"Filtros: respuesta en frecuencia (RC pasa-bajo)",
  latex:"G_v(f) = \\dfrac{1}{\\sqrt{1+(2\\pi f R C)^2}} \\qquad f_c=\\dfrac{1}{2\\pi RC} \\qquad \\varphi(f) = -\\arctan(2\\pi f RC)",
  vars:[["R, C","resistencia y capacitancia del filtro RC"],["fc","frecuencia de corte: donde la ganancia cae a 0,707 (−3 dB)"],["Gv(f)","ganancia de tensión a la frecuencia f (adimensional, o en dB)"],["φ(f)","desfasaje que introduce el filtro a la frecuencia f"]],
  explain:"Un filtro deja pasar ciertas frecuencias y frena otras — pasa-bajo, pasa-alto, pasa-banda o rechaza-banda, según qué deje pasar. El RC pasa-bajo es el caso más simple para entender la idea: por debajo de fc casi no atenúa nada, y por encima empieza a cortar cada vez más fuerte. Justo en fc ya perdió el 29% de la amplitud (−3 dB) y la señal sale desfasada 45°.",
  example:"Con R=1,6kΩ y C=100nF: fc=1/(2π·1600·10⁻⁷)≈995 Hz. A f=fc la ganancia es 0,707 (−3dB) y la fase −45°; a f=10·fc la ganancia ya cayó a ≈0,0995 (−20dB), diez veces más atenuada.",
  related:["u2-f2","u3-f1"],
  special:"filter"
};

// =====================================================================
// UNIDAD 3
// =====================================================================
FORMULAS["u3-f1"] = {
  id:"u3-f1", unit:"u3",
  name:"El decibel (dB): atenuación / ganancia",
  latex:"dB = 10\\,\\log_{10}\\!\\left(\\dfrac{P_2}{P_1}\\right)",
  vars:[["P1","potencia de entrada (W, mW…)"],["P2","potencia de salida (misma unidad que P1)"]],
  explain:"El decibel compara dos potencias: negativo si se perdió señal, positivo si se ganó. Lo que lo hace tan usado es que, al ser logarítmico, las pérdidas y ganancias de varios tramos se suman directamente en vez de multiplicarse. Por eso aparece en todos los presupuestos de enlace.",
  example:"Si la potencia se reduce a la mitad (P2 = 0,5·P1): dB = 10·log₁₀(0,5) = −3 dB. Perder 3 dB equivale siempre a perder la mitad de la potencia.",
  related:["u3-f2","u3-f3","u3-f8","u3-f9"],
  calc:{
    inputs:[
      {key:"p1", label:"P1 (potencia entrada)", unit:"mW", def:100},
      {key:"p2", label:"P2 (potencia salida)", unit:"mW", def:50}
    ],
    compute:(v)=>{
      if(v.p1<=0||v.p2<=0) throw "Las potencias deben ser mayores a 0";
      const db = 10*Math.log10(v.p2/v.p1);
      return [
        {label:"Atenuación/Ganancia", value:db.toFixed(3), unit:"dB"},
        {label:"Interpretación", value: db<0? "Atenuación":"Ganancia", unit:""}
      ];
    }
  }
};

FORMULAS["u3-f2"] = {
  id:"u3-f2", unit:"u3",
  name:"dBm — potencia referida a 1 mW",
  latex:"dBm = 10\\,\\log_{10}\\!\\left(\\dfrac{P[\\text{mW}]}{1\\text{ mW}}\\right)",
  vars:[["P","potencia absoluta en mW"]],
  explain:"Mismo dB de antes, pero fijando la referencia en 1 mW — así deja de ser una relación y pasa a ser una medida de potencia absoluta. Es la unidad que vas a ver siempre en las hojas de datos de equipos WiFi: potencia de transmisión, sensibilidad del receptor, todo en dBm.",
  example:"Una potencia de transmisión típica de un router WiFi es de 20 dBm = 100 mW. Una sensibilidad típica de recepción es de −82 dBm (un número extremadamente pequeño en mW).",
  related:["u3-f1","u3-f5"],
  calc:{
    inputs:[{key:"p", label:"Potencia P", unit:"mW", def:100}],
    compute:(v)=>{
      if(v.p<=0) throw "La potencia debe ser mayor a 0";
      return [{label:"Potencia en dBm", value:(10*Math.log10(v.p)).toFixed(3), unit:"dBm"}];
    }
  }
};

FORMULAS["u3-f3"] = {
  id:"u3-f3", unit:"u3",
  name:"dBi — ganancia de antena",
  latex:"dBi = 10\\,\\log_{10}\\!\\left(\\dfrac{P_{antena}}{P_{isotropica}}\\right)",
  vars:[["dBi","ganancia de la antena respecto de una antena isotrópica ideal"]],
  explain:"Compara una antena real contra una ideal que irradia igual para todos lados (isotrópica). Más dBi significa que la antena concentra más la energía en una dirección en vez de repartirla — un dato clave a la hora de calcular el presupuesto de enlace de un radioenlace.",
  example:"Una antena que dobla la potencia respecto de la isotrópica: dBi = 10·log₁₀(2) = 3 dBi. Si la triplica: 10·log₁₀(3) ≈ 4,8 dBi.",
  related:["u3-f1","u3-f5"],
  calc:{
    inputs:[{key:"r", label:"Relación de potencias (veces)", unit:"", def:2}],
    compute:(v)=>{
      if(v.r<=0) throw "La relación debe ser mayor a 0";
      return [{label:"Ganancia de antena", value:(10*Math.log10(v.r)).toFixed(3), unit:"dBi"}];
    }
  }
};

FORMULAS["u3-f4"] = {
  id:"u3-f4", unit:"u3",
  name:"Pérdida en el espacio libre (L₀)",
  latex:"L_0[dB] = 32{,}45 + 20\\log_{10} f[\\text{MHz}] + 20\\log_{10} d[\\text{Km}] \\;=\\; 92{,}44 + 20\\log_{10} f[\\text{GHz}] + 20\\log_{10} d[\\text{Km}]",
  vars:[["L0","pérdida por espacio libre (dB)"],["f","frecuencia de la portadora"],["d","distancia entre antenas (Km)"]],
  explain:"Una onda de radio se va debilitando sola a medida que se aleja, porque la misma potencia se reparte en un frente cada vez más grande. Esa pérdida crece con la frecuencia y con la distancia, y suele ser el término que más pesa en cualquier presupuesto de enlace.",
  example:"f = 5,8 GHz, d = 100 m (0,1 Km): L₀ = 92,44 + 20·log₁₀(5,8) + 20·log₁₀(0,1) ≈ 87,71 dB — el valor usado en el ejemplo de presupuesto de enlace de la cátedra.",
  related:["u3-f5"],
  calc:{
    inputs:[
      {key:"funit", label:"Unidad de frecuencia", type:"select", options:[["MHz","MHz"],["GHz","GHz"]], def:"GHz"},
      {key:"f", label:"Frecuencia", unit:"(según unidad elegida)", def:5.8},
      {key:"d", label:"Distancia d", unit:"Km", def:0.1}
    ],
    compute:(v)=>{
      if(v.f<=0||v.d<=0) throw "f y d deben ser mayores a 0";
      const l0 = v.funit==="MHz"
        ? 32.45 + 20*Math.log10(v.f) + 20*Math.log10(v.d)
        : 92.44 + 20*Math.log10(v.f) + 20*Math.log10(v.d);
      return [{label:"Pérdida en espacio libre", value:l0.toFixed(2), unit:"dB"}];
    }
  }
};

FORMULAS["u3-f5"] = {
  id:"u3-f5", unit:"u3",
  name:"Presupuesto de enlace (RSSI)",
  latex:"P_{RX} = P_{TX} - L_{cable,TX} + G_{ant,TX} - L_{espacio\\ libre} + G_{ant,RX} - L_{cable,RX}",
  vars:[["Ptx","potencia de transmisión (dBm)"],["Lcable","pérdida de cada tramo de cable/conectores (dB)"],["Gant","ganancia de cada antena (dBi)"],["Lfsl","pérdida en espacio libre (dB), ver fórmula anterior"],["Prx = RSSI","potencia recibida (dBm)"]],
  explain:"Acá se junta todo lo anterior: sumás y restás, en dB, todas las ganancias y pérdidas entre el transmisor y el receptor. El resultado es el RSSI, y se compara contra la sensibilidad del receptor: si RSSI es mayor, el enlace funciona.",
  example:"Ptx=20 dBm, Lcable=1 dB (cada extremo), Gant=3 dBi y 1 dBi, Lfsl=87,71 dB → RSSI = 20−1+3−87,71+1−1 = −65,71 dBm. Con Srx=−82 dBm, el enlace funciona con 16,29 dB de margen.",
  related:["u3-f1","u3-f2","u3-f3","u3-f4"],
  calc:{
    inputs:[
      {key:"ptx", label:"Ptx", unit:"dBm", def:20},
      {key:"lctx", label:"Lcable TX", unit:"dB", def:1},
      {key:"gtx", label:"Gant TX", unit:"dBi", def:3},
      {key:"lfsl", label:"L espacio libre", unit:"dB", def:87.71},
      {key:"grx", label:"Gant RX", unit:"dBi", def:1},
      {key:"lcrx", label:"Lcable RX", unit:"dB", def:1},
      {key:"srx", label:"Sensibilidad Rx (opcional)", unit:"dBm", def:-82}
    ],
    compute:(v)=>{
      const rssi = v.ptx - v.lctx + v.gtx - v.lfsl + v.grx - v.lcrx;
      const out = [{label:"RSSI (Prx)", value:rssi.toFixed(2), unit:"dBm"}];
      if(v.srx!==undefined && v.srx!==null && !isNaN(v.srx)){
        const margen = rssi - v.srx;
        out.push({label:"Margen sobre sensibilidad", value:margen.toFixed(2), unit:"dB"});
        out.push({label:"Enlace", value: margen>0 ? "Viable ✓":"No viable ✗", unit:""});
      }
      return out;
    }
  }
};

FORMULAS["u3-f6"] = {
  id:"u3-f6", unit:"u3",
  name:"Densidad de potencia de ruido térmico (N₀)",
  latex:"N_0 = kT \\;\\;\\left[\\dfrac{W}{Hz}\\right]",
  vars:[["N0","densidad de potencia de ruido (W/Hz)"],["k","constante de Boltzmann = 1,38×10⁻²³ J/K"],["T","temperatura absoluta (Kelvin)"]],
  explain:"Los electrones se mueven solos por efecto de la temperatura, y eso genera ruido — está en todas partes, en todas las frecuencias por igual. Esta fórmula dice cuánta potencia de ruido aporta por cada Hz, y depende nada más que de la temperatura. Es el punto de partida para calcular la potencia total de ruido (siguiente fórmula).",
  example:"A T = 17°C = 290 K: N₀ = 1,38×10⁻²³ × 290 ≈ 4,00×10⁻²¹ W/Hz.",
  related:["u3-f7","u5-f3","u5-f6"],
  calc:{
    inputs:[{key:"tc", label:"Temperatura T", unit:"°C", def:17}],
    compute:(v)=>{
      const k=1.38e-23, tk=v.tc+273;
      const n0=k*tk;
      return [
        {label:"T en Kelvin", value:tk.toFixed(2), unit:"K"},
        {label:"N₀", value:n0.toExponential(4), unit:"W/Hz"}
      ];
    }
  }
};

FORMULAS["u3-f7"] = {
  id:"u3-f7", unit:"u3",
  name:"Potencia de ruido térmico (N)",
  latex:"N = N_0\\,B = kTB \\;\\;[W]",
  vars:[["N","potencia total de ruido en el ancho de banda B (W)"],["N0","densidad de potencia de ruido (W/Hz)"],["B","ancho de banda del sistema (Hz)"]],
  explain:"Simplemente multiplicás la densidad de ruido (N0) por el ancho de banda que estás usando. Cuanto más ancho de banda, más ruido entra — esta N es la que después aparece abajo en la relación señal/ruido.",
  example:"T=17°C, B=1 MHz: N = 4,00×10⁻²¹ × 10⁶ = 4,00×10⁻¹⁵ W, equivalente a NdBm = 10·log₁₀(N/1mW) ≈ −114 dBm.",
  related:["u3-f6","u3-f8","u5-f3"],
  calc:{
    inputs:[
      {key:"tc", label:"Temperatura T", unit:"°C", def:17},
      {key:"b", label:"Ancho de banda B", unit:"Hz", def:1000000}
    ],
    compute:(v)=>{
      const k=1.38e-23, tk=v.tc+273, n0=k*tk, n=n0*v.b;
      const ndbm = 10*Math.log10(n/0.001);
      return [
        {label:"N₀", value:n0.toExponential(4), unit:"W/Hz"},
        {label:"N (potencia de ruido)", value:n.toExponential(4), unit:"W"},
        {label:"N en dBm", value:ndbm.toFixed(2), unit:"dBm"}
      ];
    }
  }
};

FORMULAS["u3-f8"] = {
  id:"u3-f8", unit:"u3",
  name:"Relación Señal a Ruido — SNR(dB)",
  latex:"SNR = \\dfrac{P_S}{P_N}\\ \\text{(veces)} \\qquad SNR[dB] = 10\\,\\log_{10}\\!\\left(\\dfrac{S}{N}\\right)",
  vars:[["S","potencia de la señal útil (W)"],["N","potencia de ruido (W), ver fórmula anterior"]],
  explain:"Mide qué tan arriba del ruido está la señal útil. Junto con el ancho de banda, es lo único que hace falta para saber la capacidad máxima de un canal (Shannon, Unidad 5) y qué tan exigente puede ser una modulación como QAM.",
  example:"SNR = 24 dB equivale a una relación lineal SNR = 10^(24/10) ≈ 251 veces.",
  related:["u3-f7","u3-f9","u5-f3","u5-f4","u5-f5","u8-f4"],
  calc:{
    inputs:[
      {key:"mode", label:"Dato de entrada", type:"select", options:[["potencias","Tengo S y N (W o mW)"],["db","Tengo SNR en dB"]], def:"potencias"},
      {key:"s", label:"S (potencia de señal)", unit:"W", def:0.001, showIf:{mode:"potencias"}},
      {key:"n", label:"N (potencia de ruido)", unit:"W", def:0.000004, showIf:{mode:"potencias"}},
      {key:"snrdb", label:"SNR", unit:"dB", def:24, showIf:{mode:"db"}}
    ],
    compute:(v)=>{
      if(v.mode==="potencias"){
        if(v.s<=0||v.n<=0) throw "S y N deben ser mayores a 0";
        const snr = v.s/v.n;
        return [
          {label:"SNR (veces)", value:snr.toFixed(3), unit:""},
          {label:"SNR en dB", value:(10*Math.log10(snr)).toFixed(2), unit:"dB"}
        ];
      } else {
        const snr = Math.pow(10, v.snrdb/10);
        return [{label:"SNR (veces)", value:snr.toFixed(3), unit:""}];
      }
    }
  }
};

FORMULAS["u3-f9"] = {
  id:"u3-f9", unit:"u3",
  name:"Factor de Ruido (F) e Índice de Ruido (NF)",
  latex:"F = \\dfrac{S/R_i}{S/R_o} \\qquad NF[dB] = 10\\log_{10}(F)",
  vars:[["S/Ri","SNR a la entrada del dispositivo/canal"],["S/Ro","SNR a la salida"],["F","factor de ruido (adimensional, no logarítmico)"]],
  explain:"Mide cuánto empeora la SNR al pasar por un dispositivo. En uno ideal no cambia nada (F=1), pero en la realidad todo circuito agrega su propio ruido interno, así que la SNR de salida siempre es peor que la de entrada y F siempre da mayor a 1.",
  example:"Si la SNR de entrada es 100 y la de salida cae a 40, F = 100/40 = 2,5 → NF = 10·log₁₀(2,5) ≈ 3,98 dB.",
  related:["u3-f8","u3-f1"],
  calc:{
    inputs:[
      {key:"snri", label:"SNR entrada (veces)", unit:"", def:100},
      {key:"snro", label:"SNR salida (veces)", unit:"", def:40}
    ],
    compute:(v)=>{
      if(v.snri<=0||v.snro<=0) throw "Ambas SNR deben ser mayores a 0";
      const f = v.snri/v.snro;
      return [
        {label:"Factor de ruido F", value:f.toFixed(3), unit:""},
        {label:"Índice de ruido NF", value:(10*Math.log10(f)).toFixed(2), unit:"dB"}
      ];
    }
  }
};

// =====================================================================
// UNIDAD 4
// =====================================================================
FORMULAS["u4-f1"] = {
  id:"u4-f1", unit:"u4",
  name:"Cantidad de información I(x)",
  latex:"I(x) = \\log_2\\!\\left(\\dfrac{1}{P(x)}\\right) = -\\log_2 P(x) \\quad [\\text{bits}]",
  vars:[["P(x)","probabilidad de ocurrencia del símbolo/mensaje x"],["I(x)","cantidad de información que aporta x (bits)"]],
  explain:"La idea es simple: cuanto menos probable es algo, más sorpresa da que pase, y más información aporta. Algo que siempre va a pasar (P=1) no te dice nada nuevo. Esta cantidad es el ladrillo con el que se arma la entropía.",
  example:"Un símbolo con P(x)=0,01 aporta I(x) = log₂(1/0,01) = log₂(100) ≈ 6,64 bits, mientras que uno con P(x)=0,5 aporta sólo 1 bit.",
  related:["u4-f2"],
  calc:{
    inputs:[{key:"p", label:"P(x)", unit:"(0 a 1)", def:0.25}],
    compute:(v)=>{
      if(v.p<=0||v.p>1) throw "P(x) debe estar entre 0 (exclusivo) y 1";
      return [{label:"I(x)", value:(-Math.log2(v.p)).toFixed(4), unit:"bits"}];
    }
  }
};

FORMULAS["u4-f2"] = {
  id:"u4-f2", unit:"u4",
  name:"Entropía de una fuente H(x)",
  latex:"H(x) = \\sum_{i=1}^{N} P(x_i)\\log_2\\!\\left(\\dfrac{1}{P(x_i)}\\right) \\quad [\\text{bits/símbolo}] \\qquad 0\\le H \\le \\log_2 N",
  vars:[["N","cantidad de símbolos distintos de la fuente"],["P(xi)","probabilidad de cada símbolo"],["H(x)","información promedio por símbolo (bits/símbolo)"]],
  explain:"Es el promedio de información que aporta una fuente, símbolo por símbolo. Es máxima cuando todos los símbolos son igual de probables (no podés anticipar nada) y baja cuando algunos son mucho más frecuentes que otros. Este número marca el límite teórico de cuánto se puede comprimir esa fuente.",
  example:"Fuente con P(A)=0,5; P(B)=0,25; P(C)=0,125; P(D)=0,125 → H = 0,5·1 + 0,25·2 + 0,125·3 + 0,125·3 = 1,75 bits/símbolo.",
  related:["u4-f1","u4-f3","u4-f4","u5-f0"],
  special:"entropy"
};

FORMULAS["u4-f3"] = {
  id:"u4-f3", unit:"u4",
  name:"Redundancia de una fuente",
  latex:"R_d = \\dfrac{H_{MAX}-H}{H_{MAX}}\\times 100 \\;\\;[\\%]",
  vars:[["Hmax","entropía máxima posible = log₂N (fuente equiprobable)"],["H","entropía real de la fuente"],["Rd","redundancia porcentual"]],
  explain:"Mide qué tan previsible es una fuente comparada con el caso más parejo posible. A mayor redundancia, menor entropía: hay símbolos tan probables que casi no aportan información nueva. El inglés escrito, por ejemplo, anda por el 50% de redundancia.",
  example:"Fuente binaria con P(0)=1/4, P(1)=3/4: H = 0,25·log₂4 + 0,75·log₂(4/3) ≈ 0,811 bits/símbolo. Como Hmax=log₂2=1, la redundancia es Rd=(1−0,811)/1×100 ≈ 18,9%.",
  related:["u4-f2"],
  calc:{
    inputs:[
      {key:"p0", label:"P(0) — fuente binaria", unit:"(0 a 1)", def:0.25}
    ],
    compute:(v)=>{
      if(v.p0<=0||v.p0>=1) throw "P(0) debe estar estrictamente entre 0 y 1";
      const p1=1-v.p0;
      const h = -(v.p0*Math.log2(v.p0) + p1*Math.log2(p1));
      const hmax = 1; // log2(2)
      const rd = (hmax-h)/hmax*100;
      return [
        {label:"P(1) = 1−P(0)", value:p1.toFixed(4), unit:""},
        {label:"H(x)", value:h.toFixed(4), unit:"bits/símbolo"},
        {label:"Redundancia Rd", value:rd.toFixed(2), unit:"%"}
      ];
    }
  }
};

FORMULAS["u4-f4"] = {
  id:"u4-f4", unit:"u4",
  name:"Eficiencia de un codificador de fuente",
  latex:"\\bar L(C) = \\sum_i P(x_i)\\,l_i \\qquad \\eta = \\dfrac{H(x)}{\\bar L(C)}\\times 100\\;[\\%]",
  vars:[["L̄(C)","longitud media del código (dígitos/símbolo)"],["li","longitud (en bits) asignada al símbolo i"],["η","eficiencia del código respecto del límite teórico H(x)"]],
  explain:"Huffman arma un código de longitud variable: a los símbolos más probables les da palabras cortas, y a los raros, palabras largas. Nunca se puede bajar de H(x) (eso lo garantiza Shannon), así que la eficiencia mide qué tan cerca queda el código de ese límite. El orden de asignación importa — dárselo al símbolo equivocado empeora todo — pero Huffman lo resuelve solo. El armado paso a paso está en u4-f6.",
  example:"En el ejemplo de la cátedra (8 símbolos con probabilidades entre 0,01 y 0,40), Huffman logra L̄(C2) = 2,44 dígitos/símbolo frente a una entropía H(x) = 2,38 bits/símbolo: eficiencia η = 2,38/2,44 ≈ 97,5%.",
  related:["u4-f2","u4-f6","u5-f0"],
  calc:{
    inputs:[
      {key:"h", label:"H(x) — entropía", unit:"bits/símbolo", def:2.38},
      {key:"l", label:"L̄(C) — long. media del código", unit:"dígitos/símbolo", def:2.44}
    ],
    compute:(v)=>{
      if(v.l<=0) throw "L̄(C) debe ser mayor a 0";
      return [{label:"Eficiencia η", value:(v.h/v.l*100).toFixed(2), unit:"%"}];
    }
  }
};

FORMULAS["u4-f5"] = {
  id:"u4-f5", unit:"u4",
  name:"Tasa de información R = H/σ̄",
  latex:"R = \\dfrac{H(x)}{\\bar\\sigma} \\;[\\text{bps}] \\qquad \\bar\\sigma=\\sum_j P_j\\,\\sigma_j",
  vars:[["H(x)","entropía de la fuente (bits/símbolo)"],["σ̄","duración media ponderada de un símbolo (s); si todos duran igual, σ̄=Ts"],["R","tasa de información real (bits/segundo)"]],
  explain:"H(x) sola no dice nada sobre velocidad: dos fuentes con la misma entropía pueden exigirle cosas muy distintas al canal si una emite símbolos más rápido que la otra. R convierte bits por símbolo en bits por segundo, dividiendo por cuánto dura cada símbolo. Si todos duran igual, se simplifica a R=r·H(x), con r la tasa de símbolos.",
  example:"Fuente de 4 símbolos no equiprobables con H(x)=1,75 bits/símbolo, emitida a r=1000 símbolos/seg (todos de igual duración): R=1,75×1000=1750 bps. Si la fuente fuera equiprobable (H(x)=log₂4=2 bits/símbolo) a la misma tasa, R=2000 bps: el máximo posible para 4 símbolos.",
  related:["u4-f2","u5-f1","u7-f2"],
  calc:{
    inputs:[
      {key:"h", label:"H(x) — entropía", unit:"bits/símbolo", def:1.75},
      {key:"r", label:"Tasa de símbolos r (=1/σ̄)", unit:"símb/seg", def:1000}
    ],
    compute:(v)=>{
      if(v.r<=0) throw "r debe ser mayor a 0";
      return [{label:"Tasa de información R", value:(v.h*v.r).toFixed(2), unit:"bps"}];
    }
  }
};

FORMULAS["u4-f6"] = {
  id:"u4-f6", unit:"u4",
  name:"Construcción del árbol de Huffman",
  latex:"\\text{Fusionar las 2 probabilidades menores} \\;\\longrightarrow\\; \\text{repetir hasta llegar a } 1{,}00",
  vars:[
    ["Paso 1","ordenar los símbolos por probabilidad descendente"],
    ["Paso 2","fusionar los dos de menor probabilidad en un nodo con la suma de ambas; reinsertar ordenado y repetir hasta tener un único nodo (1,00)"],
    ["Paso 3","asignar 0/1 a cada rama de derecha a izquierda (o viceversa, cualquier convención consistente)"],
    ["Paso 4","leer el código de cada símbolo recorriendo el árbol desde la raíz hasta su hoja"]
  ],
  explain:"Así se arma el código de Huffman en la práctica: en cada paso se fusionan los dos símbolos menos probables, y se repite hasta que queda uno solo. Por eso los símbolos raros terminan con códigos largos (enterrados en el árbol) y los frecuentes con códigos cortos (cerca de la raíz). Cargá tus propios símbolos y probabilidades abajo (tienen que sumar 1) y mirá el árbol armarse solo.",
  example:"Con los 8 símbolos cargados por defecto abajo (probabilidades entre 0,04 y 0,40), el árbol fusiona primero los dos símbolos menos probables (G y H), después vuelve a fusionar el resultado con el siguiente más chico, y así hasta llegar a un único nodo con probabilidad 1 — los valores de H(x), L̄(C) y η se recalculan solos a medida que cambiás las probabilidades.",
  related:["u4-f2","u4-f4"],
  special:"huffman-tree"
};

// =====================================================================
// UNIDAD 5
// =====================================================================
FORMULAS["u5-f0"] = {
  id:"u5-f0", unit:"u5",
  name:"Teorema de codificación de la fuente (cota de Shannon)",
  latex:"\\bar L(C) \\ge H(x) \\quad [\\text{dígitos binarios/símbolo}]",
  vars:[["H(x)","entropía de la fuente, calculada en la Unidad 4"],["L̄(C)","longitud media del código usado para representarla"]],
  explain:"Es el piso teórico: ningún código puede representar una fuente, en promedio, con menos bits por símbolo que su entropía. Huffman apunta justamente a acercarse lo más posible a este límite.",
  example:"Ver el ejemplo de eficiencia de Huffman en la Unidad 4: L̄(C2)=2,44 nunca puede bajar de H(x)=2,38.",
  related:["u4-f2","u4-f4"],
  calc:null
};

FORMULAS["u5-f1"] = {
  id:"u5-f1", unit:"u5",
  name:"Período de muestreo",
  latex:"T_s = \\dfrac{1}{f_s}",
  vars:[["fs","frecuencia de muestreo (Hz)"],["Ts","tiempo entre dos muestras consecutivas (s)"]],
  explain:"Simplemente la inversa de la frecuencia de muestreo: si tomás más muestras por segundo, menos tiempo pasa entre una y otra. La idea de fondo es de Nyquist: no hace falta mandar la señal analógica completa, alcanza con muestrearla lo suficientemente rápido como para poder reconstruirla después.",
  example:"Si fs = 8000 Hz (telefonía digital), Ts = 1/8000 = 125 µs entre muestra y muestra.",
  related:["u5-f2","u8-f5","u8-f6"],
  calc:{
    inputs:[{key:"fs", label:"Frecuencia de muestreo fs", unit:"Hz", def:8000}],
    compute:(v)=>{
      if(v.fs<=0) throw "fs debe ser mayor a 0";
      return [{label:"Período de muestreo Ts", value:(1/v.fs).toExponential(4), unit:"s"}];
    }
  }
};

FORMULAS["u5-f2"] = {
  id:"u5-f2", unit:"u5",
  name:"Teorema de Nyquist — canal sin ruido",
  latex:"C = 2B\\log_2 M \\quad [\\text{bps}]",
  vars:[["C","capacidad máxima del canal (bps)"],["B","ancho de banda del canal (Hz)"],["M","número de niveles distintos de la señal"]],
  explain:"Para un canal ideal, sin ruido, esta es la velocidad máxima posible. Con señal binaria (M=2) se reduce a C=2B. La parte interesante: si usás más niveles de tensión (M más grande), ganás capacidad sin necesitar más ancho de banda — la misma lógica que después aparece en modulación M-aria y en los módems.",
  example:"Canal de voz con B=3100 Hz y señal binaria (M=2): C=2·3100·log₂(2)=6200 bps. Con 4 niveles (M=4): C=2·3100·log₂(4)=12400 bps.",
  related:["u2-f2","u7-f1","u7-f2","u8-f2","u8-f3","u9-f1"],
  calc:{
    inputs:[
      {key:"b", label:"Ancho de banda B", unit:"Hz", def:3100},
      {key:"m", label:"Niveles M", unit:"", def:2}
    ],
    compute:(v)=>{
      if(v.b<=0) throw "B debe ser mayor a 0";
      if(v.m<2) throw "M debe ser mayor o igual a 2";
      return [{label:"Capacidad C", value:(2*v.b*Math.log2(v.m)).toFixed(2), unit:"bps"}];
    }
  }
};

FORMULAS["u5-f3"] = {
  id:"u5-f3", unit:"u5",
  name:"Teorema de Shannon — canal con ruido",
  latex:"C = B\\log_2\\!\\left(1+\\dfrac{S}{N}\\right) \\quad [\\text{bps}]",
  vars:[["C","capacidad máxima teórica del canal (bps)"],["B","ancho de banda del canal (Hz)"],["S/N","relación señal a ruido, en veces (no en dB)"]],
  explain:"Shannon agarró la idea de Nyquist y la llevó a canales reales, con ruido. Es probablemente el resultado más importante de toda la materia: la capacidad de un canal depende solo de su ancho de banda y de su SNR. No importa qué modulación uses, nunca se puede superar este límite sin errores.",
  example:"Canal de 1 MHz con SNR=24 dB (SNR≈255 veces): C = 10⁶·log₂(1+255) = 8 Mbps.",
  related:["u3-f8","u5-f2","u5-f4","u5-f5","u8-f4"],
  calc:{
    inputs:[
      {key:"b", label:"Ancho de banda B", unit:"Hz", def:1000000},
      {key:"mode", label:"Formato de S/N", type:"select", options:[["veces","S/N en veces"],["db","SNR en dB"]], def:"db"},
      {key:"snr", label:"S/N (veces)", unit:"", def:255, showIf:{mode:"veces"}},
      {key:"snrdb", label:"SNR", unit:"dB", def:24, showIf:{mode:"db"}}
    ],
    compute:(v)=>{
      if(v.b<=0) throw "B debe ser mayor a 0";
      const snr = v.mode==="db" ? Math.pow(10, v.snrdb/10) : v.snr;
      if(snr<0) throw "S/N no puede ser negativo";
      const c = v.b*Math.log2(1+snr);
      return [
        {label:"S/N usado (veces)", value:snr.toFixed(2), unit:""},
        {label:"Capacidad C", value:c.toFixed(2), unit:"bps"}
      ];
    }
  }
};

FORMULAS["u5-f4"] = {
  id:"u5-f4", unit:"u5",
  name:"Eficiencia espectral",
  latex:"E_{max} = \\dfrac{C}{B} = \\log_2\\!\\left(1+\\dfrac{S}{N}\\right) \\quad [\\text{bps/Hz}]",
  vars:[["Emax","eficiencia espectral máxima (bps/Hz)"],["S/N","relación señal a ruido en veces"]],
  explain:"Reordenando Shannon: cuántos bits por segundo entran en cada Hz de ancho de banda depende solo de la SNR, no del tamaño del canal. Sirve para comparar qué tan bien aprovechado está un canal, sea chico o grande.",
  example:"Con SNR=255 veces (24 dB): Emax = log₂(256) = 8 bps/Hz — no importa si el canal es de 1 kHz o de 1 GHz.",
  related:["u5-f3"],
  calc:{
    inputs:[{key:"snr", label:"S/N (veces)", unit:"", def:255}],
    compute:(v)=>{
      if(v.snr<0) throw "S/N no puede ser negativo";
      return [{label:"Eficiencia espectral máxima", value:Math.log2(1+v.snr).toFixed(3), unit:"bps/Hz"}];
    }
  }
};

FORMULAS["u5-f5"] = {
  id:"u5-f5", unit:"u5",
  name:"Niveles M necesarios (Shannon–Hartley)",
  latex:"2B\\log_2 M = B\\log_2(1+SNR) \\;\\Rightarrow\\; M=\\sqrt{1+SNR}",
  vars:[["M","niveles de señal necesarios para alcanzar el límite de Shannon"],["SNR","relación señal/ruido en veces"]],
  explain:"Igualando Nyquist (que depende de M) con Shannon (que depende del SNR), se puede despejar cuántos niveles M hacen falta para llegar justo a la capacidad máxima. Es la misma cuenta que en la Unidad 8 se usa para saber cuántos niveles de QAM soporta un canal.",
  example:"Canal de 1 MHz con SNR=255: M=√(1+255)=16 niveles — coincide con el ejemplo de la cátedra.",
  related:["u5-f2","u5-f3","u8-f3","u8-f4"],
  calc:{
    inputs:[{key:"snr", label:"SNR (veces)", unit:"", def:255}],
    compute:(v)=>{
      if(v.snr<0) throw "SNR no puede ser negativo";
      return [{label:"Niveles M requeridos", value:Math.sqrt(1+v.snr).toFixed(3), unit:""}];
    }
  }
};

FORMULAS["u5-f6"] = {
  id:"u5-f6", unit:"u5",
  name:"Relación Eb/N0",
  latex:"SNR = \\dfrac{E_b/N_0}{B/C}",
  vars:[["Eb","energía por bit"],["N0","densidad de potencia de ruido (Unidad 3)"],["B","ancho de banda (Hz)"],["C (o R)","capacidad o tasa de bit del canal (bps)"]],
  explain:"Para comparar modulaciones se usa Eb/N0 ('SNR por bit') en vez del SNR global, porque no depende del ancho de banda: así se puede comparar ASK contra QAM aunque usen anchos distintos, mirando el BER para el mismo Eb/N0. También se puede escribir como Eb/N0 = SNR/η — cuantos más bits por Hz querés meter, más energía por bit necesitás para mantener la misma tasa de error.",
  example:"Si Eb/N0 = 10 dB, B = 1 MHz y C = 2 Mbps: SNR = (Eb/N0 en veces)·(C/B) = 10·2 = 20 veces ≈ 13 dB.",
  related:["u3-f7","u3-f8","u6-f1"],
  calc:{
    inputs:[
      {key:"ebno_db", label:"Eb/N0", unit:"dB", def:10},
      {key:"c", label:"Tasa de bit C (o R)", unit:"bps", def:2000000},
      {key:"b", label:"Ancho de banda B", unit:"Hz", def:1000000}
    ],
    compute:(v)=>{
      if(v.b<=0) throw "B debe ser mayor a 0";
      const ebno = Math.pow(10, v.ebno_db/10);
      const snr = ebno*(v.c/v.b);
      return [
        {label:"Eb/N0 (veces)", value:ebno.toFixed(3), unit:""},
        {label:"SNR (veces)", value:snr.toFixed(3), unit:""},
        {label:"SNR en dB", value:(10*Math.log10(snr)).toFixed(2), unit:"dB"}
      ];
    }
  }
};

FORMULAS["u5-f7"] = {
  id:"u5-f7", unit:"u5",
  name:"Capacidad de Shannon vs. ancho de banda y SNR",
  latex:"C = B\\log_2\\!\\left(1+\\dfrac{S}{N_0 B}\\right) \\;\\xrightarrow[B\\to\\infty]{}\\; \\dfrac{S}{N_0\\ln 2}",
  vars:[["S","potencia de señal, fija (W)"],["N0","densidad de potencia de ruido (W/Hz, Unidad 3)"],["B","ancho de banda (Hz) — el ruido total N=N0·B crece con B"],["C","capacidad del canal (bps)"]],
  explain:"Agrandar B no hace crecer C sin límite, aunque la fórmula de Shannon lo sugiera a simple vista. El truco: si S es fija, más B también significa más ruido (N=N0·B), así que la SNR cae. El resultado es que C sigue subiendo, pero cada vez más despacio, hasta un techo (S/N0·ln2). Por eso, en la práctica, mejorar la SNR suele rendir más que seguir agrandando el ancho de banda.",
  example:"Con S=1W y N0=10⁻⁹ W/Hz: para B=1kHz, C≈19,93 kbps; para B=1MHz, C≈9,97 Mbps (mil veces más B, pero no mil veces más C); el techo S/(N0·ln2)≈1,44 Gbps no se alcanza nunca del todo. Movés el slider de B abajo y mirás cómo la curva se va achatando.",
  related:["u5-f2","u5-f3","u3-f6","u3-f7"],
  special:"shannon-capacity"
};

// =====================================================================
// UNIDAD 6
// =====================================================================
FORMULAS["u6-f1"] = {
  id:"u6-f1", unit:"u6",
  name:"Tasa de error de bit — BER",
  latex:"BER = \\dfrac{\\text{bits erróneos recibidos}}{\\text{total de bits recibidos}}",
  vars:[["BER","Bit Error Rate, adimensional (se expresa como potencia de 10)"]],
  explain:"Es la forma más directa de medir cuánto ruido terminó afectando la transmisión. Una red telefónica típica anda en 10⁻⁶, un LAN de cobre en 10⁻⁸/10⁻⁹, fibra óptica hasta 10⁻¹¹. Según qué tan mal esté este número, se elige qué mecanismo de control de errores usar.",
  example:"Sobre 20.000 bits transmitidos, si se reciben 2 con error: BER = 2/20000 = 1×10⁻⁴.",
  related:["u5-f6","u6-f2"],
  calc:{
    inputs:[
      {key:"err", label:"Bits erróneos", unit:"", def:2},
      {key:"tot", label:"Bits totales recibidos", unit:"", def:20000}
    ],
    compute:(v)=>{
      if(v.tot<=0) throw "El total de bits debe ser mayor a 0";
      return [{label:"BER", value:(v.err/v.tot).toExponential(3), unit:""}];
    }
  }
};

FORMULAS["u6-f2"] = {
  id:"u6-f2", unit:"u6",
  name:"Distancia de Hamming",
  latex:"\\text{Detectar } D \\text{ errores} \\Rightarrow H\\ge D+1 \\qquad \\text{Corregir } C \\text{ errores} \\Rightarrow H\\ge 2C+1",
  vars:[["H","distancia de Hamming mínima entre palabras de código válidas"],["D","cantidad de errores de bit que se pueden detectar"],["C","cantidad de errores de bit que se pueden corregir"]],
  explain:"Es cuántos bits hay que cambiar para pasar de una palabra válida a otra. Cuanto más grande esa distancia mínima, más difícil confundir un código con otro — y de ahí sale directamente cuántos errores puede detectar o corregir el código.",
  example:"Con H=3 se pueden detectar D=2 errores, o corregir C=1 error, pero no ambas cosas al mismo tiempo con la misma capacidad (H−1 = D + C).",
  related:["u6-f3"],
  special:"hamming-distance"
};

FORMULAS["u6-f3"] = {
  id:"u6-f3", unit:"u6",
  name:"Bits de paridad necesarios (Código de Hamming)",
  latex:"2^{p}\\ge n+p+1",
  vars:[["n","cantidad de bits de datos a proteger"],["p","cantidad de bits de paridad (redundancia) a agregar"]],
  explain:"Hamming agrega p bits de paridad en las posiciones potencia de 2 (1, 2, 4, 8...), de forma que alcanza para no solo detectar sino también ubicar y corregir un bit erróneo. Esta desigualdad dice cuántos bits de paridad mínimos hacen falta según cuántos bits de datos quieras proteger. El armado completo está en u6-f6. Para más de un bit erróneo por palabra existen otras familias de FEC, como Reed-Solomon o LDPC.",
  example:"Para n=4 bits de datos, con p=3 se cumple 2³=8 ≥ 4+3+1=8 (justo en el límite) → se necesitan 3 bits de paridad, total 7 bits transmitidos (código de Hamming (7,4)).",
  related:["u6-f2","u6-f6"],
  calc:{
    inputs:[{key:"n", label:"Bits de datos n", unit:"", def:4}],
    compute:(v)=>{
      if(v.n<1) throw "n debe ser al menos 1";
      let p=1;
      while(Math.pow(2,p) < v.n+p+1){p++; if(p>30) break;}
      return [
        {label:"Bits de paridad mínimos p", value:p, unit:""},
        {label:"Total de bits transmitidos (n+p)", value:v.n+p, unit:""}
      ];
    }
  }
};

FORMULAS["u6-f4"] = {
  id:"u6-f4", unit:"u6",
  name:"Código de Redundancia Cíclica (CRC)",
  latex:"T(x) = P(x) + R(x) \\qquad P(x)=X^{r}\\cdot M(x) \\qquad R(x) = \\text{resto de } \\dfrac{P(x)}{G(x)}",
  vars:[["M(x)","mensaje original, como polinomio binario"],["G(x)","polinomio generador (clave), de grado r"],["P(x)","mensaje desplazado r bits (se agregan r ceros)"],["R(x)","resto de dividir P(x) por G(x), en módulo 2 (XOR)"],["T(x)","trama a transmitir: mensaje + resto (FCS)"]],
  explain:"El emisor le agrega ceros al mensaje, lo divide por un generador G(x) usando XOR, y manda el mensaje junto con el resto de esa división. El receptor repite la cuenta: si el resto da 0, todo bien; si no, hubo un error. No se usa un generador cualquiera — hay estándares (CRC-16, CRC-32, etc.) elegidos para garantizar que detecten errores simples, dobles y en ráfaga. CRC-32 es el que usa Ethernet.",
  example:"Probá abajo con el ejemplo de la cátedra: mensaje 10110111 y generador 110011.",
  related:["u6-f1"],
  special:"crc"
};

FORMULAS["u6-f5"] = {
  id:"u6-f5", unit:"u6",
  name:"Control de paridad (VRC)",
  latex:"\\sum \\text{bits de la palabra (incl. paridad)} \\equiv 0\\ (\\text{par}) \\text{ ó } 1\\ (\\text{impar}) \\pmod 2",
  vars:[["bit de paridad","bit adicional que fuerza a que la cantidad total de unos sea par (paridad par) o impar (paridad impar)"]],
  explain:"El esquema más simple: se agrega 1 bit por carácter para que la cantidad de unos sea par o impar, según se acuerde. El receptor recalcula; si no coincide, hubo un error (aunque no sepa cuál bit). Su punto débil: si cambian dos bits a la vez, la paridad vuelve a dar bien y el error pasa desapercibido.",
  example:"Probá abajo con un byte de datos y el tipo de paridad elegido.",
  related:["u6-f3","u6-f4","u6-f7"],
  special:"parity"
};

FORMULAS["u6-f6"] = {
  id:"u6-f6", unit:"u6",
  name:"Construcción del código de Hamming (posiciones y síndrome)",
  latex:"\\text{posición } p_j \\text{ cubre los bits cuyo índice binario tiene el bit } j \\text{ en } 1",
  vars:[["p1,p2,p4,…","bits de paridad, ubicados en las posiciones potencia de 2 (1,2,4,8…) de la palabra completa"],["síndrome","los pⱼ recalculados en el receptor, leídos juntos como número binario: 0 = sin error, N = la posición exacta del bit dañado"]],
  explain:"u6-f3 dice cuántos bits de paridad hacen falta; esto es cómo se acomodan. Se numeran las posiciones desde 1, dejando las potencias de 2 (1,2,4,8...) para paridad y el resto para datos. Cada bit de paridad controla las posiciones cuyo número en binario tiene un 1 en ese lugar. En la recepción se recalcula todo: si da 0000, no hubo error; si no, el resultado (síndrome) es directamente, en binario, la posición del bit dañado — así que corregirlo es solo invertirlo.",
  example:"Para 4 bits de datos 1011 con p=3 (código de Hamming (7,4)): se arma la palabra de 7 bits, se calculan p1,p2,p4 y se arma la palabra completa. Si se simula un error dando vuelta un bit, el síndrome recalculado en el receptor da, en binario, exactamente la posición de ese bit.",
  related:["u6-f2","u6-f3"],
  special:"hamming-builder"
};

FORMULAS["u6-f7"] = {
  id:"u6-f7", unit:"u6",
  name:"Paridad bidimensional (VRC + LRC)",
  latex:"\\text{VRC: paridad por carácter (fila)} \\quad + \\quad \\text{LRC: paridad por columna del bloque}",
  vars:[["VRC","paridad vertical: 1 bit por carácter, controla los bits de esa fila"],["LRC (BCC)","paridad longitudinal: 1 carácter extra al final del bloque, cada uno de sus bits controla una columna (la misma posición de bit en todos los caracteres del bloque)"]],
  explain:"VRC solo detecta un bit erróneo por carácter, pero no ve patrones que se repiten en la misma posición de varios caracteres. LRC agrega un carácter extra al final del bloque: es la misma idea que VRC, pero calculada por columna en vez de por fila. Usados juntos, el esquema puede corregir un único bit erróneo en todo el bloque — la fila y la columna que fallan se cruzan justo en ese bit.",
  example:"Bloque de 4 caracteres de 7 bits cada uno: si falla la paridad VRC de la fila 2 y la paridad LRC de la columna 5, el bit erróneo está, sin ambigüedad, en la fila 2 columna 5 — alcanza con invertirlo para corregirlo.",
  related:["u6-f5"],
  special:"parity2d"
};

// =====================================================================
// UNIDAD 7
// =====================================================================
FORMULAS["u7-f1"] = {
  id:"u7-f1", unit:"u7",
  name:"Bits por elemento de señal (baudio)",
  latex:"n = \\log_2 N \\qquad N = 2^{n}",
  vars:[["N","cantidad de niveles (o elementos) distintos que puede tomar la señal"],["n","bits que representa cada elemento de señal (bits/baudio)"]],
  explain:"Lo mismo que Nyquist, pero visto desde cuántos bits entran en cada símbolo. Con 2 niveles, 1 bit por símbolo; con 4 niveles, 2 bits (dibits); con 8, 3 bits (tribits); y así.",
  example:"N=4 elementos de señal (por ejemplo, 4 niveles de tensión) → n=log₂4=2 bits por cada elemento transmitido.",
  related:["u5-f2","u7-f2","u8-f2","u9-f1"],
  calc:{
    inputs:[{key:"n_niveles", label:"Niveles N", unit:"", def:4}],
    compute:(v)=>{
      if(v.n_niveles<2) throw "N debe ser al menos 2";
      return [{label:"Bits por elemento (n)", value:Math.log2(v.n_niveles).toFixed(3), unit:"bits/baudio"}];
    }
  }
};

FORMULAS["u7-f2"] = {
  id:"u7-f2", unit:"u7",
  name:"Tasa de bits a partir de la tasa de símbolos",
  latex:"R = r \\times n \\qquad [\\text{bps}]",
  vars:[["R","tasa de bits o velocidad de transmisión (bps)"],["r","tasa de símbolos o de señal (Baud)"],["n","bits por elemento de señal = log₂N"]],
  explain:"Separa dos cosas que se suelen confundir: la tasa de bit (bps, lo que importa en la práctica) y la tasa de símbolo o baudios (cuántas veces cambia la línea por segundo). Son iguales solo si cada símbolo es 1 bit; con más niveles por símbolo, la tasa de bits supera a los baudios sin necesitar más ancho de banda.",
  example:"Canal de r=1200 baudios con N=8 niveles (n=3 bits/baudio): R = 1200 × 3 = 3600 bps.",
  related:["u5-f2","u7-f1","u8-f2","u9-f1"],
  calc:{
    inputs:[
      {key:"r", label:"Tasa de símbolos r", unit:"Baud", def:1200},
      {key:"n_niveles", label:"Niveles N", unit:"", def:8}
    ],
    compute:(v)=>{
      if(v.r<=0) throw "r debe ser mayor a 0";
      if(v.n_niveles<2) throw "N debe ser al menos 2";
      const n = Math.log2(v.n_niveles);
      return [
        {label:"Bits por baudio (n)", value:n.toFixed(3), unit:"bits/baudio"},
        {label:"Tasa de bits R", value:(v.r*n).toFixed(2), unit:"bps"}
      ];
    }
  }
};

FORMULAS["u7-f3"] = {
  id:"u7-f3", unit:"u7",
  name:"Ancho de banda a partir del rango de frecuencias",
  latex:"B = \\Delta f = f_2-f_1",
  vars:[["f1, f2","frecuencias mínima y máxima del rango que ocupa la señal/canal"],["B","ancho de banda (Hz)"]],
  explain:"Lo mismo que se vio conceptualmente en la Unidad 2, pero bien concreto: la diferencia entre la frecuencia más alta y la más baja que el canal deja pasar. Es el dato de entrada de Nyquist y Shannon.",
  example:"Un canal de voz que va de 300 Hz a 3400 Hz tiene B = 3400−300 = 3100 Hz.",
  related:["u2-f2","u5-f2","u5-f3","u8-f1"],
  calc:{
    inputs:[
      {key:"f1", label:"f1 (frecuencia menor)", unit:"Hz", def:300},
      {key:"f2", label:"f2 (frecuencia mayor)", unit:"Hz", def:3400}
    ],
    compute:(v)=>{
      if(v.f2<=v.f1) throw "f2 debe ser mayor que f1";
      return [{label:"Ancho de banda B", value:(v.f2-v.f1).toFixed(2), unit:"Hz"}];
    }
  }
};

FORMULAS["u7-f4"] = {
  id:"u7-f4", unit:"u7",
  name:"Códigos de línea (codificación digital a digital)",
  latex:"\\text{Bits} \\;\\longrightarrow\\; \\text{Señal digital en banda base}",
  vars:[
    ["NRZ-L","nivel alto = '1', nivel bajo = '0' (no retorna a cero entre bits)"],
    ["NRZ-I","invierte el nivel cada vez que aparece un '1'; el '0' no cambia nivel"],
    ["RZ","cada bit vuelve a cero a mitad del intervalo; el nivel (alto/bajo) en la primera mitad indica el bit"],
    ["Manchester","en cada bit hay una transición a mitad de intervalo: de bajo a alto = '1', de alto a bajo = '0' (convención IEEE 802.3)"],
    ["Manchester diferencial","siempre hay transición a mitad de bit (para el reloj); '0' agrega además una transición al inicio del intervalo, '1' no agrega ninguna"],
    ["AMI (bipolar)","el '0' es nivel cero; los '1' alternan polaridad (+V, −V, +V, …)"],
    ["B8ZS","igual que AMI, pero cada tirada de 8 ceros se reemplaza por un patrón con 2 violaciones de bipolaridad intencionales, para que el receptor nunca pierda el sincronismo"],
    ["HDB3","igual que AMI, pero cada tirada de 4 ceros se reemplaza por un patrón con 1 violación de bipolaridad, alternando la polaridad de esas violaciones para no acumular continua"]
  ],
  explain:"Una vez que sabés cuántos bits entran en cada símbolo y a qué tasa se transmiten, falta decidir cómo se dibuja cada bit en la línea física — eso son los códigos de línea. NRZ es simple pero no se auto-sincroniza: una tirada larga de ceros o unos no genera transiciones, y el receptor puede perder el reloj. RZ soluciona eso agregando una transición por bit, a costa de más ancho de banda. Manchester (el de Ethernet clásico) siempre tiene una transición a mitad de bit, así el receptor nunca pierde el reloj, pero también necesita el doble de ancho de banda que NRZ. AMI alterna la polaridad de los unos para evitar continua, aunque sigue teniendo el problema de las tiradas largas de ceros — B8ZS y HDB3 lo arreglan sustituyendo esas tiradas por un patrón detectable, sin perder nunca el sincronismo.",
  example:"Para la trama 1 0 1 1 0 0 1, Manchester queda: ↑↓ (1) · ↓↑ (0) · ↑↓ (1) · ↑↓ (1) · ↓↑ (0) · ↓↑ (0) · ↑↓ (1) — siempre con una transición a mitad de cada bit. Probá distintas tramas en el graficador de abajo y compará las 6 codificaciones una debajo de la otra.",
  related:["u7-f1","u7-f2","u8-f1"],
  special:"linecode"
};

// =====================================================================
// UNIDAD 8
// =====================================================================
FORMULAS["u8-f1"] = {
  id:"u8-f1", unit:"u8",
  name:"Ancho de banda necesario según el tipo de modulación digital",
  latex:"B_{ASK}=B_{PSK}\\approx 2r \\qquad B_{FSK}\\approx 2(\\Delta f + r)",
  vars:[["r","tasa de símbolos (Baud)"],["Δf","desviación de frecuencia entre las dos frecuencias de FSK"],["B","ancho de banda necesario para transmitir esa modulación (Hz)"]],
  explain:"Cada modulación ocupa distinto ancho de banda según su tasa de símbolos. ASK y PSK son las más eficientes (el doble de la tasa de baudios); FSK necesita espacio extra para separar las dos frecuencias que representan 0 y 1, de ahí el término 2Δf.",
  example:"Con r=5 Baudios: ASK/PSK necesitan B≈10 Hz. Si además Δf=5 Hz, FSK necesita B≈2(5+5)=20 Hz.",
  related:["u2-f2","u7-f3","u5-f2","u5-f3"],
  calc:{
    inputs:[
      {key:"tipo", label:"Tipo de modulación", type:"select", options:[["ask","ASK / PSK"],["fsk","FSK"]], def:"ask"},
      {key:"r", label:"Tasa de símbolos r", unit:"Baud", def:5},
      {key:"df", label:"Δf (sólo FSK)", unit:"Hz", def:5, showIf:{tipo:"fsk"}}
    ],
    compute:(v)=>{
      if(v.r<=0) throw "r debe ser mayor a 0";
      if(v.tipo==="ask"){
        return [{label:"Ancho de banda necesario", value:(2*v.r).toFixed(2), unit:"Hz"}];
      } else {
        return [{label:"Ancho de banda necesario", value:(2*(v.df+v.r)).toFixed(2), unit:"Hz"}];
      }
    }
  }
};

FORMULAS["u8-f2"] = {
  id:"u8-f2", unit:"u8",
  name:"Bits por símbolo en modulaciones M-arias",
  latex:"n = \\log_2 M",
  vars:[["M","cantidad de símbolos posibles (fases, amplitudes o combinaciones)"],["n","bits que representa cada símbolo"]],
  explain:"La misma relación n=log₂N de la Unidad 7, aplicada a modulación. Binario (M=2) da 1 bit/símbolo; QPSK (M=4) da 2 bits (dibits); 8-QAM (M=8) da 3 bits (tribits), y así.",
  example:"4PSK: hay 4 fases de salida posibles (135°, 225°, 45°, 315°), cada una representando un dibit (00, 01, 10, 11) → n=log₂4=2 bits/símbolo.",
  related:["u7-f1","u8-f3"],
  calc:null
};

FORMULAS["u8-f3"] = {
  id:"u8-f3", unit:"u8",
  name:"Símbolos posibles en n-QAM",
  latex:"M \\le N^{\\circ}\\text{Fases} \\times N^{\\circ}\\text{Amplitudes}",
  vars:[["M","cantidad máxima de símbolos distintos que admite el esquema QAM"],["N° Fases","cantidad de fases distintas disponibles"],["N° Amplitudes","cantidad de amplitudes distintas disponibles"]],
  explain:"QAM mezcla amplitud y fase (ASK + PSK) para separar mejor los símbolos entre sí. Como la amplitud es más sensible al ruido que la fase, siempre se usan más niveles de fase que de amplitud.",
  example:"Con 4 fases y 2 amplitudes: M ≤ 4×2 = 8 símbolos posibles (8-QAM).",
  related:["u8-f2","u5-f5"],
  calc:{
    inputs:[
      {key:"fases", label:"N° de Fases", unit:"", def:4},
      {key:"amp", label:"N° de Amplitudes", unit:"", def:2}
    ],
    compute:(v)=>{
      if(v.fases<1||v.amp<1) throw "Ambos valores deben ser al menos 1";
      return [{label:"M máximo de símbolos", value:v.fases*v.amp, unit:""}];
    }
  }
};

FORMULAS["u8-f4"] = {
  id:"u8-f4", unit:"u8",
  name:"QAM vs SNR (misma relación de Shannon-Hartley)",
  latex:"M = \\sqrt{SNR+1} \\qquad n=\\log_2 M \\;[\\text{bits/símbolo}]",
  vars:[["SNR","relación señal/ruido del canal, en veces"],["M","niveles QAM que ese canal puede soportar sin superar el límite de Shannon"]],
  explain:"La misma M=√(1+SNR) de la Unidad 5, aplicada concretamente: dado el SNR de un canal, cuántos niveles de QAM soporta sin pasarse del límite de Shannon. También sirve al revés: dado un M, qué SNR mínimo hace falta.",
  example:"SNR=255 veces → M=√256=16 → 16-QAM, con n=log₂16=4 bits/símbolo.",
  related:["u5-f5","u5-f3","u8-f3"],
  calc:{
    inputs:[{key:"snr", label:"SNR (veces)", unit:"", def:255}],
    compute:(v)=>{
      if(v.snr<0) throw "SNR no puede ser negativo";
      const m = Math.sqrt(1+v.snr);
      return [
        {label:"M (niveles QAM)", value:m.toFixed(3), unit:""},
        {label:"Bits por símbolo (n=log₂M)", value:Math.log2(m).toFixed(3), unit:"bits/símbolo"}
      ];
    }
  }
};

FORMULAS["u8-f5"] = {
  id:"u8-f5", unit:"u8",
  name:"Condición de muestreo de Nyquist",
  latex:"f_s \\ge 2f_{MAX} \\qquad T_s \\le \\dfrac{1}{2f_{MAX}}",
  vars:[["fMAX","máxima frecuencia contenida en la señal analógica a muestrear"],["fs","frecuencia de muestreo mínima para poder reconstruir la señal"]],
  explain:"Para poder reconstruir bien una señal del lado del receptor, hay que muestrearla al menos al doble de su frecuencia máxima. Es el mismo Nyquist de la Unidad 5, aplicado a PCM.",
  example:"Voz telefónica limitada a fMAX=4000 Hz → fs mínima = 8000 Hz (el estándar real de telefonía digital).",
  related:["u5-f1","u5-f2","u8-f6"],
  calc:{
    inputs:[{key:"fmax", label:"fMAX de la señal", unit:"Hz", def:4000}],
    compute:(v)=>{
      if(v.fmax<=0) throw "fMAX debe ser mayor a 0";
      return [
        {label:"fs mínima", value:(2*v.fmax).toFixed(2), unit:"Hz"},
        {label:"Ts máximo", value:(1/(2*v.fmax)).toExponential(4), unit:"s"}
      ];
    }
  }
};

FORMULAS["u8-f6"] = {
  id:"u8-f6", unit:"u8",
  name:"PCM — niveles de cuantificación y velocidad del canal",
  latex:"M = 2^{n} \\qquad C = f_s \\times n \\quad [\\text{bps}]",
  vars:[["n","bits usados para codificar cada muestra"],["M","cantidad de niveles de cuantificación disponibles"],["fs","frecuencia de muestreo (Hz)"],["C","velocidad de bit resultante del canal PCM (bps)"]],
  explain:"PCM tiene tres pasos: muestreo, cuantificación y codificación. Cada muestra se representa con n bits (M=2ⁿ niveles), y la velocidad del canal es simplemente fs×n — la misma lógica de R=r×n de la Unidad 7. Un detalle del estándar G.711: en vez de cuantificar en pasos todos iguales, la señal pasa primero por una curva logarítmica (Ley A o Ley μ) que le da más resolución a las amplitudes bajas, las más comunes en la voz humana.",
  example:"Telefonía: fs=8000 Hz, n=8 bits/muestra (M=256 niveles, estándar G.711 con Ley A / Ley µ) → C = 8000×8 = 64.000 bps = 64 Kbps.",
  related:["u7-f2","u8-f5"],
  calc:{
    inputs:[
      {key:"fs", label:"Frecuencia de muestreo fs", unit:"Hz", def:8000},
      {key:"n", label:"Bits por muestra n", unit:"", def:8}
    ],
    compute:(v)=>{
      if(v.fs<=0) throw "fs debe ser mayor a 0";
      if(v.n<1) throw "n debe ser al menos 1";
      return [
        {label:"Niveles de cuantificación M", value:Math.pow(2,v.n), unit:""},
        {label:"Velocidad del canal C", value:(v.fs*v.n).toLocaleString('es-AR'), unit:"bps"}
      ];
    }
  }
};

FORMULAS["u8-f7"] = {
  id:"u8-f7", unit:"u8",
  name:"Diagrama de constelación",
  latex:"\\text{símbolo} \\to (A\\cos\\theta,\\; A\\sin\\theta) \\quad \\text{en el plano fase-amplitud}",
  vars:[["A","amplitud del símbolo (distancia al origen)"],["θ","fase del símbolo (ángulo respecto al eje de referencia)"],["M","cantidad de símbolos — cada uno es un punto fijo del plano"]],
  explain:"Es la forma estándar de ver una modulación digital: cada símbolo es un punto en el plano fase-amplitud. En PSK todos los puntos están a la misma distancia del origen (solo cambia la fase); en ASK, todos en el mismo eje (solo cambia la amplitud); QAM combina las dos. Lo importante es la distancia mínima entre símbolos vecinos: cuanto más amontonados, más fácil que el ruido los confunda.",
  example:"QPSK (4-PSK) tiene 4 puntos a 45°, 135°, 225° y 315°, todos a la misma distancia del origen. 16-QAM tiene 16 puntos acomodados en una grilla de 4×4, con distintas combinaciones de amplitud y fase. Elegí el esquema abajo y mirá cómo cambia la distancia entre símbolos vecinos.",
  related:["u8-f2","u8-f3","u8-f4"],
  special:"constellation"
};

// =====================================================================
// UNIDAD 9
// =====================================================================
FORMULAS["u9-f1"] = {
  id:"u9-f1", unit:"u9",
  name:"Velocidad de un módem M-ario",
  latex:"R = \\dfrac{1}{T_s}\\times\\log_2 M \\quad [\\text{bps}]",
  vars:[["Ts","tiempo de símbolo del módem (s)"],["M","cantidad de niveles/estados de modulación del módem"],["R","velocidad de transmisión de datos (bps)"]],
  explain:"Es R=r×n de la Unidad 7, escrita como se especifica un módem real (r=1/Ts). Los módems de la serie V no llegan a velocidades altas usando más ancho de banda, sino metiendo más bits en cada símbolo sobre la misma línea telefónica.",
  example:"Un módem con Ts=200 ms y M=8 estados: r=1/0,2=5 Baudios, R = 5×log₂8 = 15 bps.",
  related:["u7-f1","u7-f2","u5-f2"],
  calc:{
    inputs:[
      {key:"ts", label:"Tiempo de símbolo Ts", unit:"s", def:0.2},
      {key:"m", label:"Niveles M", unit:"", def:8}
    ],
    compute:(v)=>{
      if(v.ts<=0) throw "Ts debe ser mayor a 0";
      if(v.m<2) throw "M debe ser al menos 2";
      const r=1/v.ts, n=Math.log2(v.m);
      return [
        {label:"Tasa de símbolos r", value:r.toFixed(3), unit:"Baud"},
        {label:"Bits por símbolo (n)", value:n.toFixed(3), unit:"bits/símbolo"},
        {label:"Velocidad R", value:(r*n).toFixed(3), unit:"bps"}
      ];
    }
  }
};

FORMULAS["u9-f2"] = {
  id:"u9-f2", unit:"u9",
  name:"Velocidad máxima teórica DMT (xDSL)",
  latex:"V = N_{subcanales}\\times \\Delta f_{subcanal}\\times \\text{bits}_{subcanal}",
  vars:[["Nsubcanales","cantidad de subcanales (subportadoras) usados por DMT"],["Δf subcanal","ancho de banda de cada subcanal (Hz)"],["bits subcanal","bits que transporta cada subcanal por símbolo"]],
  explain:"DMT divide el ancho de banda en muchos subcanales angostos y modula cada uno por separado, como una FDM de mini-canales QAM. La velocidad total es simplemente la suma de lo que aporta cada subcanal.",
  example:"ADSL clásico: 224 subcanales de 4 kHz con 15 bits cada uno → V = 224×4000×15 = 13,44 Mbps (downstream); con 24 subcanales para upstream → 24×4000×15 = 1,44 Mbps.",
  related:["u7-f2","u8-f2"],
  calc:{
    inputs:[
      {key:"nsub", label:"N° de subcanales", unit:"", def:224},
      {key:"df", label:"Ancho de banda por subcanal", unit:"Hz", def:4000},
      {key:"bits", label:"Bits por subcanal", unit:"", def:15}
    ],
    compute:(v)=>{
      if(v.nsub<1||v.df<=0||v.bits<1) throw "Todos los valores deben ser positivos";
      const vel = v.nsub*v.df*v.bits;
      return [
        {label:"Velocidad máxima teórica", value:(vel/1e6).toFixed(3), unit:"Mbps"},
        {label:"(en bps)", value:vel.toLocaleString('es-AR'), unit:"bps"}
      ];
    }
  }
};

FORMULAS["u9-f3"] = {
  id:"u9-f3", unit:"u9",
  name:"Asignación de bits por subportadora (bit-loading DMT)",
  latex:"\\text{bits}_k = \\log_2(1+SNR_k) \\quad \\text{(redondeado, por subportadora } k\\text{)}",
  vars:[["SNRk","relación señal/ruido medida en la subportadora k (varía según el tramo de línea e interferencias)"],["bitsk","bits que esa subportadora puede transportar por símbolo, entre 2 (4-QAM) y 14-15 (16384-QAM)"]],
  explain:"u9-f2 asume que todos los subcanales cargan la misma cantidad de bits, pero en la realidad no es así: el módem mide la SNR de cada subportadora por separado y le asigna tantos bits como esa SNR permita. El resultado es un perfil bien irregular — las frecuencias limpias cargan muchos bits, y las que caen en una zona con interferencia bajan a casi nada, sin perder la conexión entera.",
  example:"Con una interferencia fuerte entre 80kHz y 120kHz, las subportadoras de esa franja (números 19 a 28 aproximadamente, a 4,3125kHz cada una) caen a 0-2 bits, mientras que el resto de la banda sigue cargando 12-14 bits; la velocidad total es la suma de todas, no la de la peor.",
  related:["u9-f2","u5-f5"],
  special:"dmt-bitload"
};

// build lookup already done via assignment above (object literal keys)

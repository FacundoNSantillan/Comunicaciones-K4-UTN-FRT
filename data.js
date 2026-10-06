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
      {title:"Objetivos de un sistema de comunicaciones", html:"<p>Intercambiar información entre dos o más entidades. Toda transmisión de datos requiere hardware y software organizados en un sistema de comunicación, cuya efectividad depende de cuatro características: entrega, exactitud, puntualidad y retardo variable (jitter).</p>"},
      {title:"Esquema de bloques", html:"<p><b>Fuente</b> (genera la información) → <b>Transmisor</b> (codifica/transforma la señal para el canal) → <b>Canal</b> (medio de transmisión, con una fuente de ruido asociada) → <b>Receptor</b> (decodifica) → <b>Destino</b>. Cada uno de estos bloques es, en rigor, el título de una de las unidades siguientes — hacé clic en cualquier bloque del diagrama de arriba.</p>"},
      {title:"Modos de transmisión: simplex, half-duplex y full-duplex", html:"<p>Según el sentido en que puede circular la información entre dos puntos: <b>simplex</b> (un solo sentido, siempre — ej. radio FM), <b>half-duplex o semidúplex</b> (los dos sentidos, pero no al mismo tiempo — ej. un walkie-talkie) y <b>full-duplex</b> (los dos sentidos simultáneamente — ej. una llamada telefónica). Esta clasificación no es un detalle menor: en la Unidad 8/9 el ancho de banda disponible para un módem en modo full-duplex se divide al medio entre ambos sentidos, mientras que en half-duplex cada sentido puede usarlo entero (pero de a uno por vez).</p>"},
      {title:"Transmisión en banda base vs. transmisión modulada", html:"<p>Una señal digital se puede enviar <b>en banda base</b> (los pulsos de bits viajan tal cual, codificados con algún código de línea — ver Unidad 7) o <b>modulada</b> (se usa como información para variar amplitud/frecuencia/fase de una onda portadora de mayor frecuencia — ver Unidad 8). La banda base es más simple pero ocupa el espectro desde 0 Hz, lo que la hace poco práctica para medios inalámbricos o para compartir un mismo cable entre varias señales; la modulación traslada la señal a una banda de frecuencias determinada, permitiendo multicanalización (FDM) y transmisión a distancia.</p>"},
      {title:"Clasificación de redes: alcance y topología", html:"<p>Por <b>alcance</b>: PAN (personal, unos metros), LAN (local, un edificio), MAN (metropolitana, una ciudad) y WAN (amplia, un país o el mundo — Internet es la WAN por excelencia). Por <b>topología física</b> (cómo están conectados los nodos entre sí): bus (todos comparten un mismo cable), estrella (todos contra un nodo central), anillo (cada nodo conectado a los dos vecinos, cerrando un círculo), malla (conexiones redundantes punto a punto) y árbol (jerarquía de estrellas). La topología elegida afecta directamente la tolerancia a fallas y el costo de cableado.</p>"},
      {title:"Medios de transmisión guiados y no guiados", html:"<p>Se clasifican en <b>guiados</b> — par trenzado (UTP/STP, categorías 5e/6/6a), cable coaxial y fibra óptica (monomodo/multimodo) — y <b>no guiados</b> — radio, microondas, satélite, infrarrojo. Cada uno tiene un ancho de banda y una atenuación típica muy distintos (ej. par trenzado ≈3 dB/km, coaxial ≈7 dB/km, fibra óptica ≈0,2–0,5 dB/km): esos valores son justamente el insumo numérico de las fórmulas de atenuación de la Unidad 3.</p>"}
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
      {title:"Tipos de distorsión", html:"<p>A diferencia del ruido (que agrega energía ajena a la señal), la distorsión es un cambio en la <i>forma</i> de la propia señal, causado por el canal: <b>por atenuación</b> (la atenuación no es igual para todas las frecuencias — crece con f —, así que las componentes agudas de la señal llegan más débiles que las graves; se corrige con ecualizadores); <b>por retardo/fase</b> (cada componente de frecuencia viaja a distinta velocidad de propagación dentro del medio y llega desfasada respecto a las demás — es crítica en transmisión digital de alta velocidad, donde desalinea los bits); y <b>armónica</b> (la no linealidad de un amplificador o un componente activo genera armónicos — 2f, 3f, 5f... — que no estaban en la señal original, 'ensuciando' su espectro; ver Serie de Fourier en la Unidad 2 para entender por qué aparecen justo en esas frecuencias).</p>"},
      {title:"Tipos de ruido", html:"<p>El <b>ruido térmico</b> (u3-f6/u3-f7, agitación de electrones por temperatura) no es el único: existe ruido <b>externo</b> — atmosférico, cósmico/solar, generado por el hombre (motores, líneas de alta tensión), impulsivo (picos breves y de gran amplitud) y diafonía/crosstalk (una señal de un par de cables se acopla a otro par adyacente) — y ruido <b>interno</b> adicional al térmico — de disparo o <i>shot noise</i> (fluctuaciones por la naturaleza discreta de la corriente eléctrica en semiconductores) y de partición (cuando la corriente se reparte entre varios caminos dentro de un dispositivo). La distorsión armónica y la intermodulación (mezcla de dos o más frecuencias que genera productos no deseados) se consideran, a diferencia de los anteriores, <b>ruido correlacionado</b> con la señal, porque dependen de ella y desaparecen si la señal desaparece.</p>"}
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
      {title:"ARQ: corrección pidiendo retransmisión", html:"<p>Frente a FEC (Forward Error Correction — Hamming, u6-f3/u6-f6 — que corrige sin pedir nada de vuelta), existe el enfoque opuesto: <b>ARQ</b> (Automatic Repeat reQuest), que detecta el error (con paridad o CRC) y pide retransmitir la trama dañada. Tres variantes: <b>Parada-y-espera</b> (Stop-and-Wait) — el emisor manda una trama y espera su ACK/NACK antes de mandar la siguiente; simple pero deja el canal ocioso mientras espera. <b>Vuelta-atrás-N</b> (Go-Back-N) — el emisor manda varias tramas seguidas (ventana deslizante) sin esperar cada ACK; si una llega dañada, se descartan y retransmiten <i>todas</i> las tramas desde esa en adelante, aunque hayan llegado bien. <b>Repetición selectiva</b> (Selective Repeat) — igual que Go-Back-N pero solo retransmite la trama puntual que falló (vía NAK), más eficiente pero exige más memoria en el receptor para reordenar. La elección es un compromiso clásico entre simplicidad, uso del canal y complejidad del receptor.</p>"}
    ],
    formulas: ["u6-f1","u6-f2","u6-f3","u6-f4","u6-f5","u6-f6","u6-f7"]
  },
  {
    id: "u7", num: 7, name: "Técnicas de transmisión de la información",
    short: "Bits, baudios, ancho de banda",
    intro: "Formaliza la relación entre bits, símbolos (baudios) y ancho de banda necesario para transmitirlos. Es la 'caja de herramientas' que después se usa tal cual en la Unidad 8 (modulación) y en la Unidad 9 (módems).",
    topics: [
      {title:"Transmisión síncrona, asíncrona e isócrona", html:"<p>La <b>asíncrona</b> envía bit a bit, cada carácter enmarcado por un bit de inicio (start) y uno o más de parada (stop), con huecos irregulares entre caracteres: es simple de implementar (no requiere reloj compartido) pero ineficiente, porque los bits de start/stop son pura sobrecarga. La <b>síncrona</b> agrupa los datos en tramas más grandes transmitidas con un reloj compartido entre emisor y receptor (sincronizado, justamente, gracias a códigos de línea autosincronizantes como Manchester — ver u7-f4), lo que la hace mucho más eficiente para grandes volúmenes de datos. La <b>isócrona</b> agrega a lo síncrono la garantía de una latencia constante entre símbolos, imprescindible para tráfico de tiempo real como voz o video, donde una demora variable (jitter) es peor que una pérdida ocasional.</p>"}
    ],
    formulas: ["u7-f1","u7-f2","u7-f3","u7-f4"]
  },
  {
    id: "u8", num: 8, name: "Modulación y Multiplexación de señales",
    short: "ASK/FSK/PSK/QAM, PCM",
    intro: "Aplica todo lo anterior: ancho de banda (U2/U7), capacidad y SNR (U3/U5) y tasa de bits/baudios (U7) a las técnicas concretas de modulación digital (ASK, FSK, PSK, QAM), a la modulación de pulsos (PAM/PCM) y a la multicanalización (FDM/TDM).",
    topics: [
      {title:"PAM, PWM y PPM: modulación de pulsos analógica", html:"<p>Antes de llegar a PCM (que ya es digital), existen tres formas de modular una señal analógica usando pulsos, sin cuantificar ni codificar nada: <b>PAM</b> (Pulse Amplitude Modulation) — la amplitud de cada pulso sigue el valor de la señal muestreada; es, de hecho, el primer paso de PCM antes de cuantificar. <b>PWM</b> (Pulse Width Modulation) — la amplitud de los pulsos es constante, pero su ancho (duración) varía según la señal; se usa muchísimo en electrónica de potencia (control de motores, dimmers) porque es fácil de generar y filtrar. <b>PPM</b> (Pulse Position Modulation) — los pulsos tienen amplitud y ancho constantes, pero su posición en el tiempo (el instante en que aparecen dentro de cada intervalo) varía según la señal; es la más inmune al ruido de amplitud de las tres (un pulso ruidoso sigue estando 'en su lugar'), pero también la más compleja de detectar correctamente.</p>"},
      {title:"FDM y TDM: cómo comparte el canal más de una señal", html:"<p><b>FDM</b> (Frequency Division Multiplexing) traslada cada señal a una banda de frecuencias distinta dentro del mismo medio físico (usando modulación, Unidad 8), separadas por bandas de guarda para que no se superpongan — es analógico por naturaleza y es la técnica detrás de la radio FM con múltiples emisoras o del cable coaxial de TV. Ejemplo típico: 5 canales de 100kHz con guardas de 10kHz ocupan en total 5×100+4×10=540kHz de ancho de banda. <b>TDM</b> (Time Division Multiplexing) en cambio usa toda la banda pero reparte el tiempo: cada señal transmite por turnos, en una ranura (slot) de tiempo fija dentro de una trama que se repite — es la técnica digital por excelencia (la trama E1 de telefonía, por ejemplo, tiene 32 ranuras de 8 bits cada una, 30 de voz y 2 de señalización, repitiéndose 8000 veces por segundo). Existe además <b>TDM estadística o asíncrona</b>, que no reserva una ranura fija por canal sino que la asigna dinámicamente solo a quien tiene datos para enviar en ese instante, aprovechando mejor el canal cuando no todas las fuentes transmiten todo el tiempo (la base conceptual de ATM y, más adelante, de los paquetes).</p>"}
    ],
    formulas: ["u8-f1","u8-f2","u8-f3","u8-f4","u8-f5","u8-f6","u8-f7"]
  },
  {
    id: "u9", num: 9, name: "Equipos de comunicación de datos (ECD)",
    short: "Módems, xDSL, DMT",
    intro: "Baja todo a los equipos reales: el módem como ETCD, sus velocidades M-arias (misma fórmula de la Unidad 7) y la técnica DMT usada en xDSL para calcular la velocidad máxima teórica de un ADSL.",
    topics: [
      {title:"Estándares de módem (Serie V, ITU-T)", html:"<p>Cada estándar de módem fija qué modulación usa y a qué tasa de símbolos, lo que determina su velocidad máxima — la misma relación R=r×n de la Unidad 7 (u7-f2), aplicada a cada estándar concreto:</p><table class='map-table' style='margin-top:10px;'><tr><th>Estándar</th><th>Modulación</th><th>Semidúplex</th><th>Dúplex</th></tr><tr><td class='concept'>V.22bis</td><td>4-QAM</td><td>2400 bps</td><td>1200 bps</td></tr><tr><td class='concept'>V.26</td><td>4-PSK</td><td>2400 bps</td><td>1200 bps</td></tr><tr><td class='concept'>V.27</td><td>8-PSK</td><td>4800 bps</td><td>2400 bps</td></tr><tr><td class='concept'>V.29</td><td>16-QAM</td><td>9600 bps</td><td>4800 bps</td></tr><tr><td class='concept'>V.32</td><td>32-QAM</td><td>—</td><td>9600 bps</td></tr><tr><td class='concept'>V.32bis</td><td>64-QAM</td><td>—</td><td>14400 bps</td></tr><tr><td class='concept'>V.34</td><td>960-QAM</td><td>—</td><td>33600 bps</td></tr></table><p style='margin-top:10px;'>Nota cómo, salvo cuando el modo es dúplex (ancho de banda compartido entre ambos sentidos, ver Unidad 1), la tasa semidúplex siempre duplica a la dúplex: es la misma señal, pero en dúplex el canal se reparte entre ambos sentidos simultáneos.</p>"},
      {title:"Estructura de canales de un ADSL clásico (FDM)", html:"<p>El ADSL reparte la línea telefónica de cobre en bandas de frecuencia (FDM, Unidad 8) entre tres usos: <b>voz</b> (0-4 kHz, el teléfono de siempre), una <b>banda de guarda</b> (canales 1 a 5, evita que el teléfono interfiera con los datos), <b>upstream</b> (canales 6 a 30 — 24 subcanales de datos, hasta 1,44 Mbps teóricos según u9-f2/u9-f3) y <b>downstream</b> (canales 31 a 255 — 224 subcanales, hasta 13,44 Mbps teóricos). En la práctica, por el bit-loading real (u9-f3) y la distancia a la central, un ADSL clásico suele dar unos 8 Mbps de bajada y 1 Mbps de subida.</p>"},
      {title:"Familia xDSL: velocidad vs. distancia", html:"<p>Todas las variantes xDSL son el mismo principio (DMT sobre el par de cobre existente) con distinto reparto de banda y agresividad: <b>ADSL</b> hasta 8 Mbps bajada / 1 Mbps subida; <b>ADSL2+</b> hasta 24/2 Mbps; <b>VDSL2</b> hasta 100/50 Mbps (pero solo a muy corta distancia de la central, su alcance cae rápido con los km de cable); <b>HDSL</b>, simétrico, 1,5-2 Mbps en ambos sentidos, pensado para enlaces dedicados más que para internet residencial. El patrón común a toda la familia: a más velocidad prometida, menor alcance sobre el mismo cable de cobre — la atenuación del par trenzado (Unidad 1/3) crece con la frecuencia, y más Mbps exige usar frecuencias más altas.</p>"}
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
  explain:`Fourier demostró que cualquier función periódica "de comportamiento razonable" (condiciones de Dirichlet) se puede reconstruir como una suma de senos y cosenos de frecuencias múltiplos de la fundamental (armónicos). Cada armónico agrega detalle: con pocos armónicos se obtiene una aproximación gruesa de la señal, y a medida que se suman más, la señal reconstruida se acerca a la original. Esta idea es la que permite después hablar del "espectro" de una señal y de su ancho de banda.`,
  example:`Para una onda cuadrada de período T, la serie resulta<br><code>f(t) = (4/π)[ sen(ω₀t) + (1/3)sen(3ω₀t) + (1/5)sen(5ω₀t) + (1/7)sen(7ω₀t) + … ]</code><br>— sólo aparecen armónicos impares. Probá el simulador: cada armónico que agregás acerca la curva a la onda cuadrada ideal.`,
  related:["u2-f2","u5-f2","u7-f3"],
  special:"fourier"
};

FORMULAS["u2-f2"] = {
  id:"u2-f2", unit:"u2",
  name:"Ancho de banda efectivo de una señal",
  latex:"B = \\Delta f = f_2-f_1 \\;\\;\\text{(rango de frecuencias que concentra la mayor parte de la energía)}",
  vars:[["B","ancho de banda efectivo (Hz)"],["f1, f2","frecuencias que delimitan el espectro útil"]],
  explain:"Como una señal real está formada por infinitos armónicos que decrecen en amplitud, en la práctica se define el ancho de banda efectivo como el rango de frecuencias que concentra la mayor parte de la energía del espectro. A mayor ancho de banda, mayor es la capacidad de transportar información por ese canal — esta idea aparece de forma exacta en la fórmula de Nyquist y en la de Shannon (Unidad 5), y en el ancho de banda necesario de cada tipo de modulación (Unidad 8).",
  example:"La voz humana ocupa entre 300 Hz y 3400 Hz aproximadamente: su ancho de banda efectivo (usado por la telefonía) es de unos 3100 Hz, aunque el oído humano perciba hasta 20 kHz.",
  related:["u7-f3","u5-f2","u5-f3","u8-f1"],
  calc:null
};

FORMULAS["u2-f3"] = {
  id:"u2-f3", unit:"u2",
  name:"Filtros: respuesta en frecuencia (RC pasa-bajo)",
  latex:"G_v(f) = \\dfrac{1}{\\sqrt{1+(2\\pi f R C)^2}} \\qquad f_c=\\dfrac{1}{2\\pi RC} \\qquad \\varphi(f) = -\\arctan(2\\pi f RC)",
  vars:[["R, C","resistencia y capacitancia del filtro RC"],["fc","frecuencia de corte: donde la ganancia cae a 0,707 (−3 dB)"],["Gv(f)","ganancia de tensión a la frecuencia f (adimensional, o en dB)"],["φ(f)","desfasaje que introduce el filtro a la frecuencia f"]],
  explain:"Un filtro deja pasar unas frecuencias y atenúa otras — es la herramienta física detrás de 'ancho de banda del canal' (u2-f2) y de la ecualización que corrige la distorsión por atenuación (Unidad 3). Se clasifican por banda que dejan pasar: pasa-bajo, pasa-alto, pasa-banda y rechaza-banda (notch); y por si tienen ganancia propia: pasivo (solo R, L, C) o activo (con amplificador). El circuito RC pasa-bajo de un polo es el caso más simple: por encima de fc la ganancia cae a razón de 6 dB por octava (se duplica la atenuación cada vez que se duplica la frecuencia), y a la propia fc la señal ya perdió un 29% de su amplitud (−3 dB) y está desfasada 45°.",
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
  explain:"El decibel mide la relación entre dos potencias. Es negativo cuando la señal se atenuó y positivo cuando se amplificó. Su gran ventaja práctica: como es logarítmico, las atenuaciones y ganancias de varios tramos en cascada se pueden sumar algebraicamente en vez de multiplicarse — por eso se usa en todos los presupuestos de enlace (ver dBm, dBi y RSSI más abajo).",
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
  explain:"El dB expresa una relación entre dos potencias, pero no exige que ambas existan físicamente: si se fija arbitrariamente una de referencia (1 mW), el resultado es una medida absoluta de potencia expresada en dBm. Es la unidad estándar para especificar la potencia de transmisión (Ptx) y la sensibilidad de un receptor (Srx) en cualquier hoja de datos de radioenlaces o WiFi.",
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
  explain:"Compara la potencia irradiada por una antena real, en su dirección de máxima ganancia, contra la de una antena isotrópica ideal (que irradia igual en todas direcciones). Cuanta más ganancia en dBi, más concentra la antena la energía en una dirección — parámetro clave del presupuesto de enlace (RSSI) de una red WiFi o de radioenlace.",
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
  explain:"A medida que una onda de radio se aleja del transmisor, su potencia se reparte sobre un frente de onda cada vez mayor y la densidad de potencia disminuye. Esta pérdida crece con la frecuencia y con la distancia, y es el término dominante en el presupuesto de enlace (RSSI) de cualquier enlace WiFi o radioenlace punto a punto.",
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
  explain:"Es la suma en dB (por eso todo se puede sumar y restar directamente) de todas las ganancias y pérdidas entre el transmisor y el receptor. El resultado, el RSSI, se compara contra la sensibilidad del receptor (Srx): si RSSI > Srx el enlace es viable; si no, hay que subir potencia, ganancia de antena o acortar distancia.",
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
  explain:"El ruido térmico se origina en el movimiento aleatorio de los electrones por agitación térmica. Es aleatorio, blanco (está presente en todas las frecuencias por igual) y resistivo. La densidad de potencia que aporta por cada Hz de ancho de banda depende únicamente de la temperatura — es la base para calcular la potencia total de ruido (N) y, con ella, la relación señal/ruido de la Unidad 5.",
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
  explain:"La potencia total de ruido dentro de una banda de trabajo es simplemente la densidad de potencia por el ancho de banda considerado. Cuanto mayor es el ancho de banda de un receptor, mayor es la potencia de ruido que 'deja pasar' — esta N es exactamente la que aparece en el denominador de la relación señal/ruido S/N.",
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
  explain:"Mide qué tan por encima de la 'niebla' de ruido está la señal útil. Es, junto con el ancho de banda, uno de los dos únicos parámetros que determinan la capacidad máxima de un canal ruidoso (Teorema de Shannon, Unidad 5) y la calidad posible de una modulación digital como QAM (Unidad 8).",
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
  explain:"Caracteriza cuánto empeora la relación señal/ruido un dispositivo (amplificador, canal, etc.) al atravesarlo. En un circuito ideal S/Ri = S/Ro y F=1 (0 dB). En cualquier circuito real, el ruido interno agregado hace que la SNR de salida sea siempre peor que la de entrada, así que F > 1 siempre.",
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
  explain:"Cuanto menos probable es un mensaje, más información aporta el hecho de que ocurra (más 'sorpresa' genera). Un mensaje con probabilidad 1 (seguro) no aporta ninguna información. Esta es la unidad básica sobre la que se construye la entropía.",
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
  explain:"La entropía es el contenido promedio de información de una fuente: el promedio ponderado de I(xi) de todos sus símbolos. Es máxima (log₂N) cuando todos los símbolos son equiprobables (máxima incertidumbre) y disminuye cuando algunos símbolos son mucho más probables que otros (más previsible, menos información). Marca el límite teórico de compresión de esa fuente (ver Unidad 5, cota de Shannon).",
  example:"Fuente con P(A)=0,5; P(B)=0,25; P(C)=0,125; P(D)=0,125 → H = 0,5·1 + 0,25·2 + 0,125·3 + 0,125·3 = 1,75 bits/símbolo.",
  related:["u4-f1","u4-f3","u4-f4","u5-f0"],
  special:"entropy"
};

FORMULAS["u4-f3"] = {
  id:"u4-f3", unit:"u4",
  name:"Redundancia de una fuente",
  latex:"R_d = \\dfrac{H_{MAX}-H}{H_{MAX}}\\times 100 \\;\\;[\\%]",
  vars:[["Hmax","entropía máxima posible = log₂N (fuente equiprobable)"],["H","entropía real de la fuente"],["Rd","redundancia porcentual"]],
  explain:"Mide qué porcentaje de los símbolos emitidos por la fuente son, en promedio, 'previsibles' o innecesarios para transmitir la información esencial. Redundancia y entropía son opuestos: a mayor redundancia (símbolos muy probables, previsibles), menor entropía. Un texto en inglés, por ejemplo, tiene alrededor de 50% de redundancia.",
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
  explain:"El algoritmo de Huffman construye, a partir de las probabilidades de cada símbolo, un código de longitud variable que minimiza L̄(C): a los símbolos más probables les asigna palabras más cortas. El teorema de codificación de la fuente de Shannon garantiza que nunca se puede bajar de L̄(C) = H(x); la eficiencia mide qué tan cerca de ese límite teórico llega el código construido. Ojo: no alcanza con que un código tenga longitud variable para ser bueno — el <i>orden</i> de asignación importa. Si por error se le asigna el código más corto al símbolo menos probable (en vez de al más probable), L̄(C) empeora notablemente aunque se usen las mismas longitudes disponibles; Huffman, al construirse de abajo hacia arriba fusionando siempre las dos probabilidades menores, garantiza automáticamente el orden correcto. Ver el árbol paso a paso en u4-f6.",
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
  explain:"La entropía H(x) sola no dice nada sobre la velocidad real de una fuente: dos fuentes con la misma H(x) pueden exigirle cosas muy distintas al canal si una emite símbolos mucho más rápido que la otra. R convierte 'bits por símbolo' en 'bits por segundo' dividiendo por la duración media del símbolo. Cuando todos los símbolos duran lo mismo (Ts, como en la mayoría de los sistemas digitales), se simplifica a R=H(x)/Ts=r·H(x), con r la tasa de símbolos de la Unidad 5 (u5-f1) — esta es la conexión directa entre la Unidad 4 (cuánta información hay) y la Unidad 7 (a qué tasa se transmite).",
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
  explain:"Es el procedimiento concreto detrás de u4-f4: Huffman no asigna longitudes 'a ojo', las deriva de fusionar siempre las dos probabilidades más chicas en cada paso (por eso los símbolos poco probables terminan enterrados varios niveles, con códigos largos, y los símbolos frecuentes quedan cerca de la raíz, con códigos cortos). Ingresá tus propios símbolos y probabilidades abajo — tienen que sumar 1 — y mirá el árbol construirse fusión por fusión, con el código final de cada símbolo, L̄(C) y la eficiencia η calculados automáticamente.",
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
  explain:"Es el puente directo entre la Unidad 4 y la Unidad 5: ningún código puede representar una fuente, en promedio, con menos dígitos por símbolo que su entropía. Huffman (Unidad 4) es precisamente el intento de acercarse a esta cota lo más posible.",
  example:"Ver el ejemplo de eficiencia de Huffman en la Unidad 4: L̄(C2)=2,44 nunca puede bajar de H(x)=2,38.",
  related:["u4-f2","u4-f4"],
  calc:null
};

FORMULAS["u5-f1"] = {
  id:"u5-f1", unit:"u5",
  name:"Período de muestreo",
  latex:"T_s = \\dfrac{1}{f_s}",
  vars:[["fs","frecuencia de muestreo (Hz)"],["Ts","tiempo entre dos muestras consecutivas (s)"]],
  explain:"Es la relación inversa básica entre la velocidad a la que se toman muestras de una señal y el tiempo que separa a cada muestra de la siguiente. Nyquist demostró que no hace falta transmitir toda una señal analógica continua: alcanza con muestrearla a una velocidad suficiente para poder reconstruirla del lado del receptor (frecuencia de Nyquist).",
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
  explain:"Para un canal ideal (sin ruido) de ancho de banda finito B, Nyquist estableció el límite máximo de velocidad de transmisión. Si M=2 (señal binaria), log₂2=1 y la fórmula se reduce a C=2B. Aumentar los niveles de tensión distinguibles en la señal (M) permite incrementar la capacidad sin tocar el ancho de banda — la misma idea que después se usa en la modulación M-aria (Unidad 8) y en los módems (Unidad 9).",
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
  explain:"Shannon extendió a 1948 el trabajo de Nyquist para canales reales, sujetos a ruido aleatorio. Es el resultado más importante de toda la teoría de la comunicación: la capacidad de un canal está limitada únicamente por su ancho de banda B y por su relación señal/ruido — no importa qué esquema de modulación se use, jamás se puede superar este límite sin errores.",
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
  explain:"Reordenando la fórmula de Shannon, la eficiencia espectral —cuántos bits por segundo se pueden transmitir por cada Hz de ancho de banda disponible— depende exclusivamente de la calidad del canal (su SNR), no de su ancho de banda absoluto. Es la métrica que se usa para comparar qué tan 'aprovechado' está un canal, independientemente de su tamaño.",
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
  explain:"Compara la capacidad del canal según Nyquist (que depende de M) con la de Shannon (que depende del SNR) para el mismo canal, y despeja cuántos niveles M haría falta usar para efectivamente alcanzar la capacidad máxima que Shannon dice que es posible. Es exactamente la misma relación que se usa en la Unidad 8 para saber cuántos niveles de QAM soporta un canal dado su SNR.",
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
  explain:"En sistemas digitales se prefiere comparar esquemas de modulación usando Eb/N0 ('SNR por bit') en vez de la SNR global, porque es una magnitud normalizada que no depende del ancho de banda: permite comparar la calidad de un ASK contra un QAM aunque usen anchos de banda distintos, mirando únicamente su tasa de error de bit (BER, Unidad 6) para un mismo Eb/N0. De la misma igualdad sale una forma alternativa muy usada: Eb/N0 = SNR / η, donde η=C/B es la eficiencia espectral (u5-f4) — cuanto más bits por Hz se intenta transmitir, más Eb/N0 (más energía por bit) hace falta para sostener la misma probabilidad de error.",
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
  explain:"Agrandar el ancho de banda B no hace crecer la capacidad sin límite, aunque la fórmula de Shannon (u5-f3) lo sugiera a simple vista: si la potencia de señal S es fija, al agrandar B también entra más ruido térmico (N=N0·B, Unidad 3), así que la SNR=S/(N0B) cae. El resultado neto es que C crece con B pero cada vez más despacio, saturando en un techo (el 'límite de Shannon en potencia') igual a S/(N0·ln2) cuando B tiende a infinito. Es la razón por la que, en la práctica, agrandar el ancho de banda de un enlace tiene retornos decrecientes a partir de cierto punto, y por qué mejorar la SNR (más potencia, menos ruido) suele ser más rentable que seguir agrandando B.",
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
  explain:"Es la medida directa y más básica de cuánto ruido (Unidad 3) terminó afectando a la transmisión digital. Redes telefónicas típicas rondan 10⁻⁶ BER; redes LAN con par trenzado, 10⁻⁸ a 10⁻⁹; fibra óptica hasta 10⁻¹¹. A partir de este valor se decide qué mecanismo de control de errores conviene aplicar (paridad, CRC, FEC).",
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
  explain:"La distancia de Hamming es el número de bits que hay que cambiar para transformar una palabra de código válida en otra palabra válida distinta. Cuanto mayor sea esa distancia mínima, más errores hacen falta para 'confundir' un código válido con otro — de ahí se derivan directamente cuántos errores puede detectar o corregir un código dado.",
  example:"Con H=3 se pueden detectar D=2 errores, o corregir C=1 error, pero no ambas cosas al mismo tiempo con la misma capacidad (H−1 = D + C).",
  related:["u6-f3"],
  special:"hamming-distance"
};

FORMULAS["u6-f3"] = {
  id:"u6-f3", unit:"u6",
  name:"Bits de paridad necesarios (Código de Hamming)",
  latex:"2^{p}\\ge n+p+1",
  vars:[["n","cantidad de bits de datos a proteger"],["p","cantidad de bits de paridad (redundancia) a agregar"]],
  explain:"El código de Hamming agrega p bits de paridad, ubicados en las posiciones potencia de 2 (1, 2, 4, 8…), de forma que su combinación permita no sólo detectar sino localizar y corregir un bit erróneo. La cantidad mínima de bits de paridad necesarios depende de cuántos bits de datos n se quieran proteger, según esta desigualdad. Ver el armado completo (posiciones, cálculo de cada paridad y localización del error) en u6-f6. Hamming corrige un único bit erróneo por palabra; para necesidades más exigentes existen otras familias de FEC: Reed-Solomon (pensado para errores en ráfaga, muy usado en CD/DVD y códigos QR), LDPC (códigos de paridad de baja densidad, para bloques grandes en canales muy ruidosos — WiFi, 5G) y los códigos convolucionales (procesan un flujo continuo de bits en vez de bloques, usados en telefonía satelital).",
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
  explain:"El emisor desplaza el mensaje r bits a la izquierda (agrega r ceros, siendo r el grado del generador), lo divide por el generador G(x) usando aritmética módulo 2 (sin acarreo, o sea, con XOR), y transmite el mensaje original seguido del resto de esa división. El receptor repite la división de la trama completa: si el resto da 0, no hubo error; si no, se detectó un error. En la práctica no se inventa un generador cualquiera: se usan generadores estandarizados (CRC-12, CRC-16, CRC-CCITT, CRC-32) elegidos matemáticamente para garantizar la detección del 100% de los errores simples, dobles y en ráfaga de longitud ≤ al grado r del generador — CRC-32 (grado 32), por ejemplo, es el que usa Ethernet.",
  example:"Probá abajo con el ejemplo de la cátedra: mensaje 10110111 y generador 110011.",
  related:["u6-f1"],
  special:"crc"
};

FORMULAS["u6-f5"] = {
  id:"u6-f5", unit:"u6",
  name:"Control de paridad (VRC)",
  latex:"\\sum \\text{bits de la palabra (incl. paridad)} \\equiv 0\\ (\\text{par}) \\text{ ó } 1\\ (\\text{impar}) \\pmod 2",
  vars:[["bit de paridad","bit adicional que fuerza a que la cantidad total de unos sea par (paridad par) o impar (paridad impar)"]],
  explain:"Es el esquema de detección de errores más simple: se agrega 1 bit por carácter (VRC, vertical) para forzar que la cantidad de unos —incluyendo ese bit— sea par o impar según se acuerde. El receptor recalcula la paridad; si no coincide, sabe que hubo un error (pero no cuál bit ni puede corregirlo). Su gran debilidad: no detecta errores dobles (dos bits que cambian a la vez).",
  example:"Probá abajo con un byte de datos y el tipo de paridad elegido.",
  related:["u6-f3","u6-f4","u6-f7"],
  special:"parity"
};

FORMULAS["u6-f6"] = {
  id:"u6-f6", unit:"u6",
  name:"Construcción del código de Hamming (posiciones y síndrome)",
  latex:"\\text{posición } p_j \\text{ cubre los bits cuyo índice binario tiene el bit } j \\text{ en } 1",
  vars:[["p1,p2,p4,…","bits de paridad, ubicados en las posiciones potencia de 2 (1,2,4,8…) de la palabra completa"],["síndrome","los pⱼ recalculados en el receptor, leídos juntos como número binario: 0 = sin error, N = la posición exacta del bit dañado"]],
  explain:"u6-f3 dice cuántos bits de paridad p hacen falta; esto es cómo se arman. Se numeran las posiciones de la palabra completa desde 1, dejando las posiciones potencia de 2 (1,2,4,8…) para los bits de paridad y el resto para los datos. Cada bit de paridad pⱼ controla exactamente las posiciones cuyo número, escrito en binario, tiene un 1 en el bit j (p1 controla 1,3,5,7…; p2 controla 2,3,6,7…; p4 controla 4,5,6,7…, etc. — por eso basta con log₂(n+p+1) bits de paridad para cubrir n+p+1 posiciones). En la recepción se recalcula cada paridad; si todas dan bien, el síndrome (los pⱼ leídos como número binario) es 0000 y no hubo error — si no, el síndrome apunta directamente, en binario, a la posición exacta del bit que se dio vuelta, así que corregirlo es tan simple como invertirlo.",
  example:"Para 4 bits de datos 1011 con p=3 (código de Hamming (7,4)): se arma la palabra de 7 bits, se calculan p1,p2,p4 y se arma la palabra completa. Si se simula un error dando vuelta un bit, el síndrome recalculado en el receptor da, en binario, exactamente la posición de ese bit.",
  related:["u6-f2","u6-f3"],
  special:"hamming-builder"
};

FORMULAS["u6-f7"] = {
  id:"u6-f7", unit:"u6",
  name:"Paridad bidimensional (VRC + LRC)",
  latex:"\\text{VRC: paridad por carácter (fila)} \\quad + \\quad \\text{LRC: paridad por columna del bloque}",
  vars:[["VRC","paridad vertical: 1 bit por carácter, controla los bits de esa fila"],["LRC (BCC)","paridad longitudinal: 1 carácter extra al final del bloque, cada uno de sus bits controla una columna (la misma posición de bit en todos los caracteres del bloque)"]],
  explain:"VRC (u6-f5) por sí solo detecta un bit erróneo en un carácter, pero es ciego a patrones que se repiten en la misma posición de varios caracteres distintos. LRC agrega, al final de un bloque de N caracteres, un carácter de verificación (BCC) donde cada bit es la paridad de esa misma posición en los N caracteres del bloque — en los hechos, es VRC pero aplicado por columna en vez de por fila. Usados juntos (paridad bidimensional), el esquema no solo detecta sino que puede corregir un único bit erróneo en todo el bloque: la fila que falla en su VRC y la columna que falla en su LRC se cruzan exactamente en el bit dañado.",
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
  explain:"Es la misma relación logarítmica de Nyquist (Unidad 5) y de la modulación M-aria (Unidad 8), vista desde el punto de vista de cuántos bits 'caben' en cada símbolo transmitido. Con 2 niveles cada símbolo transporta 1 bit; con 4 niveles, 2 bits (dibits); con 8, 3 bits (tribits), y así sucesivamente.",
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
  explain:"Distingue explícitamente entre la 'tasa de bit' (bps, lo que realmente le importa al usuario) y la 'tasa de símbolo' o baudios (cuántas veces por segundo cambia la línea de transmisión). Son iguales sólo cuando cada símbolo representa 1 bit (N=2); si se usan más niveles por símbolo, la tasa de bits supera a la tasa de baudios sin necesitar más ancho de banda — la misma idea que Nyquist (Unidad 5) y que las modulaciones M-arias (Unidad 8/9).",
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
  explain:"Es la definición operativa del ancho de banda ya presentada conceptualmente en la Unidad 2: simplemente el rango entre la frecuencia más alta y la más baja que el canal deja pasar (o que ocupa la señal). Es el dato de entrada directo de Nyquist y Shannon (Unidad 5), y determina cuánta información se puede transmitir por ese canal.",
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
  explain:"Es el paso final de la Unidad 7: una vez que se sabe cuántos bits entran en cada elemento de señal (n=log₂N) y a qué tasa se transmiten (R=r·n), hay que decidir *cómo se dibuja* cada bit en la línea física. Los códigos de línea son las distintas convenciones para representar 0s y 1s como niveles de tensión. NRZ es simple pero no auto-sincroniza (tiradas largas de 0 o 1 no generan transiciones) y puede tener componente de continua. RZ agrega una transición por bit pero duplica el ancho de banda necesario. Manchester (el usado históricamente en Ethernet 802.3) garantiza siempre una transición a mitad de cada bit, lo que permite que el receptor recupere el reloj (self-clocking) sin componente de continua, a costa de necesitar el doble de ancho de banda que NRZ para la misma tasa de bits. Manchester diferencial agrega además inmunidad a la inversión de polaridad de los cables. AMI evita continua alternando la polaridad de los unos, pero tiene el mismo problema que NRZ-L con tiradas largas de ceros (no hay transiciones, se pierde el reloj); B8ZS y HDB3 son las correcciones de AMI que usan las redes de telefonía digital real (T1/E1): sustituyen esas tiradas de ceros por un patrón con alguna 'violación' de bipolaridad deliberada, detectable por el receptor como la señal de que ahí había ceros, sin perder nunca el sincronismo. Existen además códigos multinivel (2B1Q, 8B6T, 4D-PAM5, MLT-3) usados en xDSL y Ethernet de alta velocidad, que agrupan varios bits por símbolo para necesitar menos ancho de banda.",
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
  explain:"Cada técnica de modulación digital 'ocupa' un ancho de banda distinto en función de la tasa de símbolos con la que se transmite. ASK y PSK son las más eficientes en ancho de banda (ocupan aproximadamente el doble de la tasa de baudios); FSK necesita además espacio adicional para separar las dos frecuencias que representan 0 y 1, por eso incorpora el término 2Δf. Es la contracara, en modulación, del ancho de banda visto de forma abstracta en las Unidades 2, 3, 5 y 7.",
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
  explain:"Es la aplicación directa, a la modulación digital, de la relación n=log₂N ya vista en la Unidad 7. En ASK/FSK/PSK binarios M=2 (n=1 bit/símbolo); en 4PSK o QPSK, M=4 (n=2 bits/símbolo, agrupados en dibits); en 8-QAM, M=8 (n=3 bits/símbolo, tribits), etc.",
  example:"4PSK: hay 4 fases de salida posibles (135°, 225°, 45°, 315°), cada una representando un dibit (00, 01, 10, 11) → n=log₂4=2 bits/símbolo.",
  related:["u7-f1","u8-f3"],
  calc:null
};

FORMULAS["u8-f3"] = {
  id:"u8-f3", unit:"u8",
  name:"Símbolos posibles en n-QAM",
  latex:"M \\le N^{\\circ}\\text{Fases} \\times N^{\\circ}\\text{Amplitudes}",
  vars:[["M","cantidad máxima de símbolos distintos que admite el esquema QAM"],["N° Fases","cantidad de fases distintas disponibles"],["N° Amplitudes","cantidad de amplitudes distintas disponibles"]],
  explain:"QAM combina modulación de amplitud y de fase a la vez (ASK + PSK), de forma de maximizar el contraste entre símbolos vecinos. Como los cambios de amplitud son más sensibles al ruido que los de fase, en la práctica siempre se usan más niveles de fase que de amplitud. Existen esquemas estándar de 8-QAM, 16-QAM, 32-QAM, 64-QAM, etc.",
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
  explain:"Es exactamente la misma fórmula M=√(1+SNR) de la Unidad 5, aplicada aquí de forma muy concreta: dado el SNR de un canal, indica cuántos niveles de QAM (o de cuantificación PCM) puede soportar como máximo sin violar el límite de Shannon. Es la pregunta inversa también válida: dado un esquema con cierto M, qué SNR mínimo se necesita.",
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
  explain:"Antes de convertir una señal analógica a PCM hay que muestrearla y, para poder reconstruirla exactamente del lado del receptor, la frecuencia de muestreo debe ser al menos el doble de la máxima frecuencia presente en la señal (por eso se filtra la señal antes de muestrear, limitándola a fMAX). Es el mismo criterio de Nyquist de la Unidad 5, aplicado ahora a PCM.",
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
  explain:"El PCM (Modulación de Pulsos Codificados) consta de tres pasos: muestreo, cuantificación y codificación. Cada muestra se representa con n bits, lo que da M=2ⁿ niveles de cuantificación posibles. La velocidad final del canal digital es simplemente el producto entre cuántas muestras se toman por segundo (fs) y cuántos bits usa cada una (n) — la misma estructura que R=r×n de la Unidad 7, aplicada a PCM. Un detalle que el estándar G.711 resuelve con algo más que fuerza bruta: si se cuantificara con pasos todos iguales (cuantificación uniforme), las señales de baja amplitud (una voz suave) quedarían mal representadas, con mucho error relativo, mientras que las de alta amplitud sobrarían de precisión. Por eso se usa cuantificación no uniforme (companding): antes de cuantificar, la señal pasa por una curva logarítmica que comprime los niveles altos y expande los bajos (Ley A, 13 segmentos, usada en Europa/Argentina; Ley μ, 15 segmentos, usada en EE.UU./Japón), dándole más resolución relativa a las amplitudes chicas, que son las más frecuentes en la voz humana. 30 canales de voz de 64kbps más 2 de señalización arman un E1 de 2,048 Mbps — la base de la jerarquía digital PDH/SDH usada en telefonía.",
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
  explain:"Es la forma estándar de visualizar cualquier modulación digital: cada símbolo posible se dibuja como un punto en el plano fase-amplitud (eje real/imaginario, o I/Q). En PSK todos los puntos están a la misma distancia del origen (misma amplitud, distinta fase) porque solo se modula fase; en ASK están todos sobre el mismo eje (misma fase, distinta amplitud); QAM combina ambas, acomodando los puntos en una grilla para maximizar la distancia mínima entre símbolos vecinos — esa distancia mínima es, en los hechos, lo que determina qué tan robusta es la modulación frente al ruido (más símbolos amontonados = más sensible a un mismo nivel de ruido, ver u8-f4).",
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
  explain:"Es la fórmula R=r×n de la Unidad 7 escrita en términos del período de símbolo (r=1/Ts) tal como se especifica un módem real. Los módems de la serie V (ITU-T) alcanzan altas velocidades de bit no por usar más ancho de banda, sino por codificar más bits en cada símbolo (M alto) sobre la misma línea telefónica.",
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
  explain:"La técnica DMT (Discrete MultiTone) usada en xDSL divide el ancho de banda disponible en muchos subcanales angostos y modula cada uno de forma independiente (como una gran FDM de mini-canales QAM). La velocidad máxima teórica es la suma de lo que aporta cada subcanal — la misma lógica de 'bits por símbolo × cantidad de símbolos' de las Unidades 7 y 8, multiplicada por la cantidad de subcanales en paralelo.",
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
  explain:"u9-f2 calcula la velocidad total de DMT asumiendo que todos los subcanales transportan la misma cantidad de bits — en la realidad no es así: el módem mide la SNR de cada una de las ~256 subportadoras por separado (igual que Shannon-Hartley, u5-f5, pero subcanal por subcanal) y le asigna a cada una tantos bits como esa SNR puntual permita, desde un mínimo de 2 (4-QAM) hasta un máximo de 14 o 15 (16384-QAM o 32768-QAM). El resultado es un perfil de 'bits por portadora' muy irregular: las subportadoras en frecuencias limpias cargan muchos bits, y las que caen en una banda con interferencia (un ruido de línea, una emisora de radio AM cercana) se hunden a 0 o pocos bits — el módem simplemente las evita o las usa poco, sin perder la conexión entera.",
  example:"Con una interferencia fuerte entre 80kHz y 120kHz, las subportadoras de esa franja (números 19 a 28 aproximadamente, a 4,3125kHz cada una) caen a 0-2 bits, mientras que el resto de la banda sigue cargando 12-14 bits; la velocidad total es la suma de todas, no la de la peor.",
  related:["u9-f2","u5-f5"],
  special:"dmt-bitload"
};

// build lookup already done via assignment above (object literal keys)

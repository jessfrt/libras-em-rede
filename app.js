/*
 * LIBRAS EM REDE — conteúdo editável.
 * Coloque o vídeo correspondente em /videos com o nome abaixo (MP4, preferencialmente H.264).
 * Exemplo: videos/atencao.mp4. O site já procura o arquivo automaticamente.
 * Nunca substitua a gravação em Libras por animações ou ícones genéricos.
 */

const CATEGORIES = [
  {
    slug: "brincar", number: "01", title: "Vem brincar!", descriptor: "Socialização e recreio",
    subtitle: "Convites e sinais usados durante brincadeiras e recreação.",
    icon: "users", className: "play", tags: ["Recreio", "Convivência"],
    signs: [
      {slug:"quer-brincar", name:"Quer brincar?", icon:"bag", description:"Convite para iniciar uma brincadeira com um colega.", usage:"Apresente o sinal antes dos momentos de recreação."},
      {slug:"sua-vez", name:"Sua vez", icon:"shuffle", description:"Indica o momento em que outra pessoa pode participar.", usage:"Use durante jogos com rodadas ou atividades coletivas."},
      {slug:"vamos-juntos", name:"Vamos juntos", icon:"users", description:"Convite para realizar uma atividade em grupo.", usage:"Use para incentivar a participação de colegas."},
      {slug:"legal", name:"Legal!", icon:"thumbs", description:"Expressa aprovação ou entusiasmo por uma atividade.", usage:"Pratique ao final de uma brincadeira ou conquista."},
      {slug:"amigo", name:"Amigo", icon:"heart", description:"Palavra relacionada à amizade e à convivência.", usage:"Trabalhe o sinal em atividades sobre relações de amizade."}
    ]
  },
  {
    slug: "estudar", number: "02", title: "Hora de estudar", descriptor: "Comandos e atividades",
    subtitle: "Sinais usados durante atividades pedagógicas.",
    icon: "book", className: "study", tags: ["Sala de aula", "Aprendizagem"],
    signs: [
      {slug:"atencao", name:"Atenção", icon:"alert", description:"Usado para solicitar foco da turma durante uma explicação.", usage:"Apresente o sinal antes de iniciar uma orientação coletiva."},
      {slug:"abrir-caderno", name:"Abrir caderno", icon:"book", description:"Orientação para preparar o caderno para a atividade.", usage:"Associe o sinal ao começo de uma tarefa escrita."},
      {slug:"pergunta", name:"Pergunta", icon:"question", description:"Permite introduzir perguntas e dúvidas em sala.", usage:"Use quando a turma puder pedir esclarecimentos."},
      {slug:"esperar", name:"Esperar", icon:"clock", description:"Indica a necessidade de aguardar por um momento.", usage:"Pratique em situações que envolvam turnos e pequenas pausas."},
      {slug:"ajuda", name:"Ajuda", icon:"help", description:"Expressa necessidade de apoio ou disponibilidade para ajudar.", usage:"Incentive a turma a utilizar o sinal em atividades compartilhadas."}
    ]
  },
  {
    slug: "necessidades", number: "03", title: "Preciso de...", descriptor: "Necessidades básicas",
    subtitle: "Comunicação rápida para necessidades do cotidiano escolar.",
    icon: "droplet", className: "needs", tags: ["Autonomia", "Cotidiano"],
    signs: [
      {slug:"banheiro", name:"Banheiro", icon:"bathroom", description:"Indica a necessidade de usar o banheiro.", usage:"Ajude a turma a reconhecer esta comunicação durante a rotina."},
      {slug:"agua", name:"Água", icon:"droplet", description:"Usado para comunicar sede ou pedir água.", usage:"Contextualize o sinal nos intervalos para hidratação."},
      {slug:"nao-entendi", name:"Não entendi", icon:"question", description:"Comunica que uma informação precisa ser esclarecida.", usage:"Estimule o uso em momentos em que a orientação não estiver clara."},
      {slug:"obrigado", name:"Obrigado", icon:"heart", description:"Expressa agradecimento em interações cotidianas.", usage:"Pratique em situações naturais de colaboração e cuidado."},
      {slug:"dor", name:"Dor", icon:"zap", description:"Permite comunicar desconforto ou dor.", usage:"Mostre que sinais de necessidade ou dor exigem acolhimento imediato, não apenas repetição didática."}
    ]
  },
  {
    slug: "emocoes", number: "04", title: "Como estou?", descriptor: "Expressão emocional",
    subtitle: "Expressão de sentimentos e emoções.",
    icon: "smile", className: "feelings", tags: ["Sentimentos", "Expressão"],
    signs: [
      {slug:"feliz", name:"Feliz", icon:"smile", description:"Expressa alegria ou um estado de felicidade.", usage:"Inclua em uma roda de conversa sobre como cada pessoa está."},
      {slug:"triste", name:"Triste", icon:"frown", description:"Expressa tristeza ou desânimo.", usage:"Trabalhe o reconhecimento e o respeito às emoções."},
      {slug:"raiva", name:"Raiva", icon:"angry", description:"Comunica um sentimento de irritação ou raiva.", usage:"Associe a conversas sobre identificar emoções e agir com cuidado."},
      {slug:"medo", name:"Medo", icon:"fear", description:"Comunica medo ou insegurança.", usage:"Use em atividades de nomeação de sentimentos, sem minimizar o que a criança expressa."},
      {slug:"gostei", name:"Gostei", icon:"thumbs", description:"Indica aprovação ou satisfação com algo.", usage:"Convide a turma a expressar como se sentiu após uma atividade."}
    ]
  }
];

const icon = (name, cls = "icon") => `<svg class="${cls}" aria-hidden="true" viewBox="0 0 24 24"><use href="#i-${name}"></use></svg>`;
const safeText = (value) => String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const videoPath = (slug) => `videos/${slug}.mp4`;
const main = document.getElementById("conteudo");
let activeSign = null;
let loopEnabled = true;
let playbackIndex = 1;
let videoReady = false;
const speeds = [0.75, 1, 1.25];

function categoryCard(category) {
  return `<a class="category-card category-${category.className}" href="#/categoria/${category.slug}" aria-label="Abrir ${safeText(category.title)}, cinco sinais">
    <div class="category-card-top"><span class="category-index">${category.number} / CONTEXTO</span><span class="card-arrow">${icon("arrow-right")}</span></div>
    <div class="category-icon">${icon(category.icon)}</div>
    <div class="category-card-bottom"><div><h3>${safeText(category.title)}</h3><p>${safeText(category.descriptor)}</p></div><span class="sign-count">${category.signs.length} sinais</span></div>
  </a>`;
}

function renderHome() {
  main.innerHTML = `
    <section class="hero container" aria-labelledby="home-title">
      <div class="hero-content">
        <span class="eyebrow"><span class="eyebrow-dot"></span> COMUNICAÇÃO E INCLUSÃO NA ESCOLA</span>
        <h1 id="home-title">Quando todos participam, <span class="accent-text">a escola se aproxima.</span></h1>
        <p class="hero-description">Uma biblioteca visual de sinais em Libras para apoiar a comunicação entre estudantes, professores e toda a turma.</p>
        <div class="hero-actions"><a class="button button-primary" href="#/categorias">Explorar os sinais ${icon("arrow-right")}</a><a class="button button-text" href="#/sobre">Entenda a proposta ${icon("arrow-right")}</a></div>
        <div class="hero-qualities"><span>${icon("check")} Simples de explorar</span><span>${icon("check")} Vídeos em repetição</span><span>${icon("check")} Pensado para a sala</span></div>
      </div>
      <div class="hero-art" aria-label="Ilustração abstrata sobre conexão e aprendizagem" role="img">
        <div class="art-circle art-circle-one"></div><div class="art-circle art-circle-two"></div>
        <div class="art-panel art-panel-one"><div class="art-panel-icon">${icon("book")}</div><span>APRENDER</span><strong>Em conjunto.</strong></div>
        <div class="art-panel art-panel-two"><div class="art-panel-icon">${icon("message")}</div><span>COMUNICAR</span><strong>Com todos.</strong></div>
        <div class="art-connector"><span></span><span></span><span></span></div>
        <div class="art-caption"><span class="caption-square"></span> LIBRAS EM REDE / 2026</div>
      </div>
    </section>
    <section class="home-categories section-surface" aria-labelledby="home-categories-title">
      <div class="container section-inner">
        <div class="section-heading"><div><span class="eyebrow subtle">SEUS PRIMEIROS SINAIS</span><h2 id="home-categories-title">Um momento de cada vez.</h2><p>Escolha um contexto da rotina escolar para começar.</p></div><span class="section-counter">04 CONTEXTOS · 20 SINAIS</span></div>
        <div class="category-grid">${CATEGORIES.map(categoryCard).join("")}</div>
      </div>
    </section>
    <section class="how-strip container" aria-labelledby="how-heading"><div class="how-heading"><span class="eyebrow subtle">COMO FUNCIONA</span><h2 id="how-heading">Feito para usar, não para complicar.</h2></div><div class="how-steps"><div><span>01</span><strong>Escolha</strong><p>Selecione uma situação do dia a dia.</p></div><div><span>02</span><strong>Observe</strong><p>Abra o sinal e assista ao vídeo.</p></div><div><span>03</span><strong>Compartilhe</strong><p>Projete e pratique com toda a turma.</p></div></div></section>
  `;
}

function renderCategories() {
  main.innerHTML = `<div class="container page-container">
    <div class="breadcrumb"><a href="#/">Início</a>${icon("chevron-right")}<span aria-current="page">Categorias</span></div>
    <div class="page-intro"><span class="eyebrow subtle">BIBLIOTECA VISUAL</span><h1>Explore por contexto.</h1><p>Comece por uma situação familiar à turma. Cada categoria reúne cinco sinais para apoiar interações no cotidiano escolar.</p></div>
    <div class="category-grid category-grid-page">${CATEGORIES.map(categoryCard).join("")}</div>
    <div class="quiet-note">${icon("eye")} Os vídeos podem ser exibidos em tela cheia, com repetição contínua, sem cortar o enquadramento original.</div>
  </div>`;
}

function signCard(sign, category, index) {
  return `<a class="sign-card" href="#/sinal/${sign.slug}" aria-label="Assistir sinal ${safeText(sign.name)}">
    <div class="sign-card-upper"><span class="sign-index">${String(index + 1).padStart(2, "0")}</span><span class="sign-card-icon">${icon(sign.icon)}</span></div>
    <div class="sign-card-lower"><div><h2>${safeText(sign.name)}</h2><span>Visualizar sinal</span></div><span class="sign-card-arrow">${icon("arrow-right")}</span></div>
  </a>`;
}

function renderCategory(category) {
  main.innerHTML = `<div class="container page-container">
    <div class="breadcrumb"><a href="#/">Início</a>${icon("chevron-right")}<a href="#/categorias">Categorias</a>${icon("chevron-right")}<span aria-current="page">${safeText(category.title)}</span></div>
    <a class="return-link" href="#/categorias">${icon("arrow-left")} Todas as categorias</a>
    <div class="category-title-block"><div><span class="eyebrow subtle">${safeText(category.number)} / ${safeText(category.descriptor).toUpperCase()}</span><h1>${safeText(category.title)}</h1><p>${safeText(category.subtitle)}</p><div class="tag-list">${category.tags.map(t=>`<span>${safeText(t)}</span>`).join("")}</div></div><span class="category-title-icon category-${category.className}">${icon(category.icon)}</span></div>
    <div class="section-heading small-heading"><div><h2>Escolha um sinal</h2><p>Toque em um item para assistir e repetir.</p></div><span class="section-counter">${category.signs.length} SINAIS</span></div>
    <div class="sign-grid">${category.signs.map((s,i)=>signCard(s, category, i)).join("")}</div>
  </div>`;
}

function renderSign(category, sign, index) {
  activeSign = sign;
  loopEnabled = true;
  playbackIndex = 1;
  videoReady = false;
  const prev = category.signs[(index - 1 + category.signs.length) % category.signs.length];
  const next = category.signs[(index + 1) % category.signs.length];
  main.innerHTML = `<div class="container page-container sign-page">
    <div class="breadcrumb"><a href="#/">Início</a>${icon("chevron-right")}<a href="#/categorias">Categorias</a>${icon("chevron-right")}<a href="#/categoria/${category.slug}">${safeText(category.title)}</a>${icon("chevron-right")}<span aria-current="page">${safeText(sign.name)}</span></div>
    <a class="return-link" href="#/categoria/${category.slug}">${icon("arrow-left")} Voltar aos sinais</a>
    <div class="sign-intro"><div><span class="eyebrow subtle">${safeText(category.title).toUpperCase()} · SINAL ${String(index + 1).padStart(2,"0")}/${category.signs.length}</span><h1>${safeText(sign.name)}</h1><p>${safeText(category.subtitle)}</p></div><span class="sign-title-mark">${icon(sign.icon)}</span></div>
    <div class="sign-layout">
      <div class="video-column">
        <div class="video-stage" id="video-stage">
          <div class="video-placeholder" id="video-placeholder" role="status"><div class="placeholder-frame"><span class="placeholder-symbol">${icon("play")}</span></div><strong>Espaço reservado para o vídeo</strong><p>Adicione <code>${safeText(videoPath(sign.slug))}</code><br>e o sinal aparecerá aqui automaticamente.</p></div>
          <video id="sign-video" aria-label="Vídeo do sinal em Libras: ${safeText(sign.name)}" autoplay muted loop playsinline controls preload="metadata" hidden></video>
          <div class="stage-label">LIBRAS EM REDE <span>·</span> ${safeText(sign.name).toUpperCase()}</div>
        </div>
        <div class="video-toolbar" aria-label="Controles de exibição">
          <div class="toolbar-primary"><button type="button" class="tool-button is-active" data-action="loop" aria-pressed="true" id="loop-button" disabled>${icon("refresh")} <span>Loop ativado</span></button><button type="button" class="tool-button" data-action="replay" disabled>${icon("play")} <span>Reiniciar</span></button></div>
          <div class="toolbar-secondary"><button type="button" class="tool-button" data-action="speed" id="speed-button" aria-label="Velocidade de reprodução" disabled>1×</button><button type="button" class="tool-button icon-tool" data-action="fullscreen" title="Tela cheia" aria-label="Exibir vídeo em tela cheia" disabled>${icon("expand")}</button></div>
        </div>
        <p class="video-hint" id="video-status">Os vídeos serão reproduzidos automaticamente, sem áudio e em loop. O enquadramento original será preservado.</p>
      </div>
      <aside class="sign-detail" aria-labelledby="sign-detail-heading"><span class="detail-kicker">SOBRE ESTE SINAL</span><h2 id="sign-detail-heading">${safeText(sign.name)}</h2><p class="detail-description">${safeText(sign.description)}</p><div class="detail-divider"></div><div class="detail-tip"><span class="detail-tip-icon">${icon("sparkle")}</span><div><h3>Na prática</h3><p>${safeText(sign.usage)}</p></div></div><div class="detail-bottom"><span>PRÓXIMO SINAL</span><a class="next-sign" href="#/sinal/${next.slug}"><span>${safeText(next.name)}</span>${icon("arrow-right")}</a></div></aside>
    </div>
    <div class="sign-navigation"><a href="#/sinal/${prev.slug}">${icon("arrow-left")} ${safeText(prev.name)}</a><a href="#/categoria/${category.slug}">Ver os cinco sinais ${icon("arrow-right")}</a></div>
  </div>`;
  attachVideo(sign);
}

function attachVideo(sign) {
  const video = document.getElementById("sign-video");
  const placeholder = document.getElementById("video-placeholder");
  const status = document.getElementById("video-status");
  const toolbar = main.querySelectorAll(".video-toolbar button");
  if (!video || !placeholder) return;

  video.addEventListener("loadedmetadata", () => {
    videoReady = true;
    video.hidden = false;
    placeholder.hidden = true;
    const stageLabel = document.querySelector(".stage-label");
    if (stageLabel) stageLabel.hidden = true; // Evita sobrepor texto às mãos no vídeo.
    toolbar.forEach(button => button.disabled = false);
    video.loop = loopEnabled;
    video.playbackRate = speeds[playbackIndex];
    status.textContent = "Vídeo pronto. Use tela cheia para projeção ou ajuste a velocidade de reprodução.";
    video.play().catch(() => { status.textContent = "Vídeo pronto. Toque em reproduzir para começar."; });
  }, { once: true });

  video.addEventListener("error", () => {
    videoReady = false;
    video.hidden = true;
    placeholder.hidden = false;
    status.textContent = "O vídeo ainda não foi adicionado ou o formato não é compatível. Consulte o README para incluir o arquivo.";
  }, { once: true });

  video.src = videoPath(sign.slug);
  video.load();
}

function renderAbout() {
  main.innerHTML = `<div class="container page-container about-page"><div class="breadcrumb"><a href="#/">Início</a>${icon("chevron-right")}<span aria-current="page">Sobre o projeto</span></div>
    <div class="about-hero"><span class="eyebrow subtle">POR QUE LIBRAS EM REDE?</span><h1>Inclusão é uma <span class="accent-text">prática coletiva.</span></h1><p>O Libras em Rede é um protótipo educacional criado para apoiar o contato da turma com sinais básicos de Libras em situações reais da rotina escolar.</p></div>
    <div class="about-grid"><article><span class="about-num">01</span><h2>Um recurso para todos</h2><p>A proposta vai além do uso individual: permite que estudantes e educadores visualizem sinais juntos, inclusive por projeção em sala.</p></article><article><span class="about-num">02</span><h2>Começar pelo cotidiano</h2><p>Brincadeiras, atividades, necessidades básicas e emoções são situações presentes no início da experiência escolar.</p></article><article><span class="about-num">03</span><h2>Crescer com validação</h2><p>O repertório inicial tem 20 sinais planejados. A qualidade das gravações e sua adequação linguística precisam de revisão com pessoas surdas fluentes e profissionais de Libras.</p></article></div>
    <div class="about-note"><div class="about-note-icon">${icon("heart")}</div><div><h2>Importante</h2><p>Este site é um recurso complementar de mediação visual. Não substitui intérpretes, professores de Libras, materiais didáticos especializados nem a participação da comunidade surda no planejamento pedagógico. A variação regional dos sinais deve ser considerada na curadoria.</p></div></div>
    <a class="button button-primary" href="#/categorias">Conhecer as categorias ${icon("arrow-right")}</a>
  </div>`;
}

function renderNotFound() {
  main.innerHTML = `<div class="container not-found"><span class="eyebrow subtle">PÁGINA NÃO ENCONTRADA</span><h1>Este caminho ainda não existe.</h1><p>Você pode voltar e explorar as categorias disponíveis.</p><a class="button button-primary" href="#/categorias">Explorar sinais ${icon("arrow-right")}</a></div>`;
}

function render() {
  const route = (location.hash.replace(/^#\/?/, "") || "").split("/").filter(Boolean);
  activeSign = null;
  if (route.length === 0) renderHome();
  else if (route[0] === "categorias" && route.length === 1) renderCategories();
  else if (route[0] === "sobre" && route.length === 1) renderAbout();
  else if (route[0] === "categoria" && route.length === 2) {
    const category = CATEGORIES.find(c => c.slug === route[1]);
    category ? renderCategory(category) : renderNotFound();
  } else if (route[0] === "sinal" && route.length === 2) {
    const category = CATEGORIES.find(c => c.signs.some(s => s.slug === route[1]));
    const index = category ? category.signs.findIndex(s => s.slug === route[1]) : -1;
    category ? renderSign(category, category.signs[index], index) : renderNotFound();
  } else renderNotFound();
  document.getElementById("nav-categorias").classList.toggle("current", ["categorias", "categoria", "sinal"].includes(route[0]));
  document.getElementById("nav-sobre").classList.toggle("current", route[0] === "sobre");
  window.scrollTo({top:0, behavior:"instant"});
  document.title = `${route[0] === "sinal" && activeSign ? activeSign.name + " · " : ""}Libras em Rede · Comunicação para todos`;
}

document.addEventListener("click", event => {
  const actionButton = event.target.closest("[data-action]");
  if (!actionButton || actionButton.disabled || !activeSign) return;
  const video = document.getElementById("sign-video");
  if (!video || !videoReady) return;
  switch (actionButton.dataset.action) {
    case "loop":
      loopEnabled = !loopEnabled;
      video.loop = loopEnabled;
      actionButton.setAttribute("aria-pressed", String(loopEnabled));
      actionButton.classList.toggle("is-active", loopEnabled);
      actionButton.querySelector("span").textContent = loopEnabled ? "Loop ativado" : "Loop desativado";
      break;
    case "replay":
      video.currentTime = 0;
      video.play().catch(() => {});
      break;
    case "speed":
      playbackIndex = (playbackIndex + 1) % speeds.length;
      video.playbackRate = speeds[playbackIndex];
      actionButton.textContent = `${speeds[playbackIndex].toString().replace(".", ",")}×`;
      break;
    case "fullscreen": {
      const stage = document.getElementById("video-stage");
      if (document.fullscreenElement) document.exitFullscreen();
      else if (stage.requestFullscreen) stage.requestFullscreen();
      break;
    }
  }
});

document.addEventListener("keydown", event => {
  if (!activeSign || event.altKey || event.ctrlKey || event.metaKey) return;
  if (["INPUT", "TEXTAREA", "BUTTON", "A", "SELECT"].includes(document.activeElement?.tagName)) return;
  if (!(["ArrowRight", "ArrowLeft"].includes(event.key))) return;
  const category = CATEGORIES.find(c => c.signs.some(s => s.slug === activeSign.slug));
  const index = category.signs.findIndex(s => s.slug === activeSign.slug);
  const step = event.key === "ArrowRight" ? 1 : -1;
  location.hash = `#/sinal/${category.signs[(index + step + category.signs.length) % category.signs.length].slug}`;
});

window.addEventListener("hashchange", render);
render();

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
const icon = (name, className = 'icon') => `<svg class="${className}" aria-hidden="true" viewBox="0 0 24 24"><use href="#i-${name}"></use></svg>`;
const safeText = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
// Arquivos MP4 existentes no repositório. O demonstrador HTML independente usa o GitHub como origem.
const VIDEO_BASE = window.LIBRAS_DEMO_VIDEO_BASE || 'videos/';
const videoPath = slug => `${VIDEO_BASE}${slug}.mp4`;
const main = document.getElementById('conteudo');
let activeSign = null;
let videoReady = false;
let loopEnabled = true;
let playbackIndex = 1;
const speeds = [0.75, 1, 1.25];

function categoryCard(category){
  return `<a class="category-card category-${category.className}" href="#/categoria/${category.slug}" aria-label="${safeText(category.title)} — ${category.signs.length} sinais">
    <span class="category-head"><span class="category-index">${category.number} / 04</span><span class="category-arrow">${icon('arrow-right')}</span></span>
    <span class="category-visual">${icon(category.icon)}</span>
    <span class="category-card-copy"><h3>${safeText(category.title)}</h3><p>${safeText(category.descriptor)}</p><span class="category-card-footer"><span>${category.signs.length} SINAIS PARA CONHECER</span>${icon('arrow-right')}</span></span>
  </a>`;
}
function crumbs(items) {
  return `<nav class="crumbs" aria-label="Caminho de navegação"><a href="#/">Início</a>${items.map((it,i)=>`${icon('chevron-right')}${i===items.length-1?`<span aria-current="page">${safeText(it.label)}</span>`:`<a href="${it.href}">${safeText(it.label)}</a>`}`).join('')}</nav>`;
}
function renderHome(){
  main.innerHTML = `
  <section class="hero"><div class="container hero-grid">
    <div class="hero-copy">
      <span class="eyebrow">Libras no cotidiano escolar</span>
      <h1>Todo mundo merece <em>fazer parte.</em></h1>
      <p class="hero-description">Uma biblioteca visual de sinais em Libras para transformar pequenos momentos da rotina em oportunidades de comunicação e convivência.</p>
      <div class="hero-actions"><a href="#/categorias" class="button button-primary">Explorar os sinais ${icon('arrow-right')}</a><a href="#/sobre" class="text-link">Conheça a proposta ${icon('arrow-right')}</a></div>
      <div class="hero-bottom"><div><span class="stat-number">04</span><span class="stat-label">contextos do dia a dia</span></div><div><span class="stat-number">20</span><span class="stat-label">sinais disponíveis</span></div><span class="hero-note">Uma experiência pensada para toda a turma, não apenas para uma pessoa.</span></div>
    </div>
    <div class="hero-art">
      <div class="art-grain" aria-hidden="true"></div><div class="art-top"><span class="art-label">UM GESTO, UMA CONEXÃO</span><span class="art-counter">EDIÇÃO 01 / 2026</span></div>
      <div class="art-shape" aria-hidden="true"></div><div class="art-knot" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
      <div class="art-main"><span class="serif">Uma sala.<br>Mais encontros.</span><p>Começar a se comunicar também é começar a pertencer.</p></div>
      <div class="art-bottom"><a class="art-mini play" href="#/categoria/brincar">${icon('users')}<div><small>01 / CONVIVÊNCIA</small><br><strong>Vem brincar! ↗</strong></div></a><a class="art-mini study" href="#/categoria/estudar">${icon('book')}<div><small>02 / APRENDIZAGEM</small><br><strong>Hora de estudar ↗</strong></div></a></div>
    </div>
  </div></section>
  <section class="catalog" id="contextos"><div class="container">
    <div class="section-heading"><div><span class="eyebrow">Uma biblioteca para situações reais</span><h2>O cotidiano é o <em>ponto de partida.</em></h2></div><p>Escolha o contexto que faz sentido agora. Cada categoria reúne cinco sinais com vídeos para assistir e repetir.</p></div>
    <div class="category-grid">${CATEGORIES.map(categoryCard).join('')}</div>
    <div class="lower-intro"><p>O Libras em Rede é um recurso complementar de aprendizagem coletiva. A inclusão acontece nas interações, com participação e orientação de pessoas fluentes em Libras.</p><a href="#/sobre">Entenda o projeto ${icon('arrow-right')}</a></div>
  </div></section>
  <section class="feature-band"><div class="container band-layout"><div><span class="eyebrow light">Criado para ser usado junto</span><h2>Aprender é bom.<br><em>Compartilhar é melhor.</em></h2></div><div class="band-right"><p>Escolha um sinal, assista ao vídeo em repetição e projete para a turma. Uma proposta simples para criar novas possibilidades de diálogo na escola.</p><a class="button button-cream" href="#/sinal/atencao">Conhecer um sinal ${icon('arrow-right')}</a></div></div></section>`;
}
function renderCategories(){
  main.innerHTML = `<div class="container page-container">
    ${crumbs([{label:'Categorias'}])}
    <header class="page-hero"><div><span class="eyebrow">Explore por contexto</span><h1>Pequenos gestos, <em>grandes encontros.</em></h1><p>Quatro momentos do dia a dia escolar. Escolha um contexto para encontrar os sinais relacionados.</p></div><div class="page-aside"><strong>04</strong> CATEGORIAS</div></header>
    <div class="category-mini-grid">${CATEGORIES.map(categoryCard).join('')}</div>
    <p class="section-note">Cada categoria reúne cinco sinais. Os vídeos podem ser repetidos, exibidos em tela cheia e reproduzidos em velocidade reduzida.</p>
  </div>`;
}
function signCard(sign,category,i){
  return `<a class="sign-card" href="#/sinal/${sign.slug}" aria-label="Assistir ao sinal ${safeText(sign.name)}">
    <div class="sign-preview ${category.className}"><video class="sign-preview-video" src="${safeText(videoPath(sign.slug))}#t=0.15" muted playsinline preload="metadata" aria-hidden="true" tabindex="-1"></video><div class="sign-preview-icon">${icon(sign.icon)}</div></div>
    <div class="sign-card-body"><div class="sign-card-top"><span>SINAL ${String(i+1).padStart(2,'0')} / 05</span><span class="sign-arrow">${icon('arrow-right')}</span></div><h2>${safeText(sign.name)}</h2><p>${safeText(sign.description)}</p></div>
  </a>`;
}
function renderCategory(category){
  main.innerHTML = `<div class="container page-container">
    ${crumbs([{label:'Categorias',href:'#/categorias'},{label:category.title}])}
    <header class="category-banner"><div><span class="eyebrow">${category.number} / Contextos da escola</span><h1>${safeText(category.title)}</h1><p>${safeText(category.subtitle)}</p></div><div class="category-banner-icon ${category.className}" aria-hidden="true">${icon(category.icon)}</div></header>
    <div class="section-minor-heading">Explore os 5 sinais desta categoria</div>
    <div class="sign-grid">${category.signs.map((s,i)=>signCard(s,category,i)).join('')}</div>
    <div class="watch-bottom"><a href="#/categorias">${icon('arrow-left')} Todas as categorias</a><a href="#/sinal/${category.signs[0].slug}">Começar pelo primeiro sinal ${icon('arrow-right')}</a></div>
  </div>`;
  document.querySelectorAll('.sign-preview-video').forEach(video => {
    video.addEventListener('loadeddata', () => video.parentElement?.classList.add('preview-ready'), {once:true});
    video.addEventListener('error', () => video.remove(), {once:true});
  });
}
function renderSign(category,sign,index){
  activeSign=sign;videoReady=false;
  const next=category.signs[(index+1)%category.signs.length];
  const previous=category.signs[(index-1+category.signs.length)%category.signs.length];
  main.innerHTML = `<div class="container page-container watch-page">
    ${crumbs([{label:'Categorias',href:'#/categorias'},{label:category.title,href:`#/categoria/${category.slug}`},{label:sign.name}])}
    <header class="watch-top"><div><span class="eyebrow">${safeText(category.title)} / Sinal ${String(index+1).padStart(2,'0')}</span><h1>${safeText(sign.name)}</h1></div><span class="watch-count">${String(index+1).padStart(2,'0')} <span style="color:#a5aaa1">/</span> 05</span></header>
    <div class="watch-layout"><div class="watch-main">
      <div class="player-shell">
        <div class="player-topbar"><span class="player-live">VÍDEO EM LIBRAS</span><span class="player-topbar-right">BIBLIOTECA VISUAL · 01</span></div>
        <div class="video-stage" id="video-stage">
          <div class="video-placeholder" id="video-placeholder" role="status"><span class="placeholder-symbol">${icon('play')}</span><strong>Preparando a demonstração</strong><p>O vídeo do sinal aparece aqui assim que o arquivo estiver disponível na biblioteca.</p></div>
          <video id="sign-video" aria-label="Demonstração do sinal de Libras ${safeText(sign.name)}" autoplay muted loop playsinline controls preload="metadata" hidden></video>
          <div class="projector-controls"><span class="projector-label" id="projector-title">${safeText(sign.name)}</span><div style="display:flex;gap:8px"><button type="button" data-action="project-next" aria-label="Próximo sinal">Próximo sinal →</button><button type="button" data-action="close-project" aria-label="Sair da apresentação">Fechar ✕</button></div></div>
        </div>
        <div class="video-toolbar" aria-label="Ferramentas do vídeo"><div class="toolbar-group"><button type="button" class="tool-button is-active" data-action="loop" aria-pressed="true" disabled>${icon('refresh')} <span>Repetição ligada</span></button><button type="button" class="tool-button" data-action="replay" disabled>${icon('play')} <span>Reiniciar</span></button></div><div class="toolbar-group"><button type="button" class="tool-button" data-action="speed" aria-label="Velocidade de reprodução" disabled>1×</button><button type="button" class="tool-button primary-tool" data-action="fullscreen" disabled>${icon('expand')} <span>Apresentar</span></button></div></div>
      </div><p class="video-status" role="status" id="video-status">O vídeo será reproduzido automaticamente, sem som e em repetição. Mãos, rosto e movimentos permanecem inteiros na imagem.</p>
    </div><aside class="watch-sidebar" aria-labelledby="detail-heading"><div class="detail-card"><span class="detail-kicker">CONHECENDO O SINAL</span><h2 id="detail-heading">${safeText(sign.name)}</h2><p>${safeText(sign.description)}</p><div class="detail-usage">${icon('heart')}<div><strong>Como usar na turma</strong><p>${safeText(sign.usage)}</p></div></div></div><div class="side-next"><span>CONTINUE EXPLORANDO</span><a href="#/sinal/${next.slug}"><span>${safeText(next.name)}</span>${icon('arrow-right')}</a></div></aside>
    </div><div class="watch-bottom"><a href="#/sinal/${previous.slug}">${icon('arrow-left')} ${safeText(previous.name)}</a><a href="#/categoria/${category.slug}">Ver os cinco sinais ${icon('arrow-right')}</a></div>
  </div>`;
  attachVideo(sign);
}
function attachVideo(sign){
  const video=document.getElementById('sign-video');
  const placeholder=document.getElementById('video-placeholder');
  const status=document.getElementById('video-status');
  const toolbar=main.querySelectorAll('.video-toolbar button');
  if(!video)return;
  video.muted=true;video.loop=loopEnabled;video.playsInline=true;
  video.addEventListener('loadedmetadata',()=>{
    if(!document.getElementById('sign-video'))return;
    videoReady=true;video.hidden=false;placeholder.hidden=true;
    toolbar.forEach(b=>b.disabled=false);
    video.playbackRate=speeds[playbackIndex];
    status.textContent='Vídeo disponível. Use Apresentar para projetar em tela cheia, ou ajuste a velocidade de reprodução.';
    video.play().catch(()=>{status.textContent='Vídeo disponível. Toque em reproduzir para começar.';});
  },{once:true});
  video.addEventListener('error',()=>{videoReady=false;video.hidden=true;placeholder.hidden=false;status.textContent='Não foi possível carregar este vídeo. Confira o nome do arquivo na pasta videos.';toolbar.forEach(b=>b.disabled=true);},{once:true});
  video.src=videoPath(sign.slug);
  video.load();
}
function renderAbout(){
 main.innerHTML=`<div class="container page-container">${crumbs([{label:'O projeto'}])}
   <div class="about-intro"><span class="eyebrow">Sobre o Libras em Rede</span><h1>Incluir é criar condições para <em>participar.</em></h1><p>O Libras em Rede nasce da percepção de que estar matriculado não significa, automaticamente, estar incluído. A ferramenta foi pensada para favorecer o contato cotidiano de toda a turma com sinais básicos de Libras.</p></div>
   <div class="about-grid"><article><span class="about-num">01</span><h2>Para a turma inteira</h2><p>Apoia estudantes, colegas e professores em situações comuns da rotina escolar, incentivando a aproximação e a comunicação coletiva.</p></article><article><span class="about-num">02</span><h2>Aprendizagem contextual</h2><p>Organiza os primeiros vinte sinais em quatro contextos reais: recreio, estudo, necessidades básicas e emoções.</p></article><article><span class="about-num">03</span><h2>Um projeto em evolução</h2><p>A biblioteca é um piloto e deverá crescer com avaliação de uso, escuta da comunidade escolar e validação linguística.</p></article></div>
   <div class="about-note">${icon('heart')}<div><h2>Compromisso com a comunidade surda</h2><p>Este recurso é complementar. Não substitui intérpretes, professores de Libras ou práticas pedagógicas bilíngues. Os sinais e materiais devem ser revisados por pessoas surdas fluentes e profissionais qualificados, levando em conta possíveis variações regionais.</p></div></div>
   <a class="button button-primary" href="#/categorias">Conhecer os sinais ${icon('arrow-right')}</a>
 </div>`;
}
function renderNotFound(){main.innerHTML=`<div class="container not-found"><span class="eyebrow">404 / Caminho não encontrado</span><h1>Esta página não existe.</h1><p>Explore os sinais que já estão disponíveis.</p><a href="#/categorias" class="button button-primary">Explorar as categorias ${icon('arrow-right')}</a></div>`;}
function render(){
  const route=(location.hash.replace(/^#\/?/,'')||'').split('/').filter(Boolean);
  const page=route[0];activeSign=null;
  if(route.length===0)renderHome();
  else if(page==='categorias'&&route.length===1)renderCategories();
  else if(page==='sobre'&&route.length===1)renderAbout();
  else if(page==='categoria'&&route.length===2){const c=CATEGORIES.find(c=>c.slug===route[1]);c?renderCategory(c):renderNotFound();}
  else if(page==='sinal'&&route.length===2){const c=CATEGORIES.find(c=>c.signs.some(s=>s.slug===route[1]));if(c)renderSign(c,c.signs.find(s=>s.slug===route[1]),c.signs.findIndex(s=>s.slug===route[1]));else renderNotFound();}
  else renderNotFound();
  document.getElementById('nav-categorias').classList.toggle('current',['categorias','categoria','sinal'].includes(page));
  document.getElementById('nav-sobre').classList.toggle('current',page==='sobre');
  document.title=(activeSign?`${activeSign.name} · `:'')+'Libras em Rede — Comunicação para toda a turma';
  window.scrollTo({top:0,behavior:'instant'});
}
function nextProjected(){
  const c=CATEGORIES.find(c=>c.signs.some(s=>s.slug===activeSign?.slug));if(!c)return;
  let index=c.signs.findIndex(s=>s.slug===activeSign.slug);
  activeSign=c.signs[(index+1)%c.signs.length];
  const video=document.getElementById('sign-video');if(!video)return;
  document.getElementById('projector-title').textContent=activeSign.name;
  video.src=videoPath(activeSign.slug);video.load();video.play().catch(()=>{});
}
document.addEventListener('click',event=>{
  const button=event.target.closest('[data-action]');if(!button)return;
  const action=button.dataset.action;
  if(action==='close-project'){if(document.fullscreenElement)document.exitFullscreen();return;}
  if(action==='project-next'){nextProjected();return;}
  if(!activeSign || button.disabled || !videoReady)return;
  const video=document.getElementById('sign-video');const stage=document.getElementById('video-stage');if(!video)return;
  if(action==='loop'){loopEnabled=!loopEnabled;video.loop=loopEnabled;button.classList.toggle('is-active',loopEnabled);button.setAttribute('aria-pressed',String(loopEnabled));button.querySelector('span').textContent=loopEnabled?'Repetição ligada':'Repetição desligada';}
  else if(action==='replay'){video.currentTime=0;video.play().catch(()=>{});}
  else if(action==='speed'){playbackIndex=(playbackIndex+1)%speeds.length;video.playbackRate=speeds[playbackIndex];button.textContent=speeds[playbackIndex].toString().replace('.',',')+'×';}
  else if(action==='fullscreen'){if(document.fullscreenElement)document.exitFullscreen();else if(stage?.requestFullscreen)stage.requestFullscreen().catch(()=>{});}
});
document.addEventListener('fullscreenchange',()=>{
  if(!document.fullscreenElement&&activeSign&&location.hash!==`#/sinal/${activeSign.slug}`)location.hash=`#/sinal/${activeSign.slug}`;
});
document.addEventListener('keydown',event=>{
  if(!activeSign||event.altKey||event.ctrlKey||event.metaKey)return;
  if(['INPUT','TEXTAREA','BUTTON','A','SELECT'].includes(document.activeElement?.tagName))return;
  if(event.key==='Escape'&&document.fullscreenElement){document.exitFullscreen();return;}
  if(!['ArrowLeft','ArrowRight'].includes(event.key))return;
  if(document.fullscreenElement){if(event.key==='ArrowRight')nextProjected();return;}
  const c=CATEGORIES.find(c=>c.signs.some(s=>s.slug===activeSign.slug));if(!c)return;
  const index=c.signs.findIndex(s=>s.slug===activeSign.slug),step=event.key==='ArrowRight'?1:-1;
  location.hash=`#/sinal/${c.signs[(index+step+c.signs.length)%c.signs.length].slug}`;
});
window.addEventListener('hashchange',render);
render();

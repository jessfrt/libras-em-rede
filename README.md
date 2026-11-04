# Libras em Rede — Direção visual 02

Uma versão de design editorial + humanista + funcional da biblioteca de sinais em Libras.

## O que mudou

- Marca geométrica própria, tipografia editorial, hierarquia mais consistente e composição profissional.
- Quatro categorias em cartões com cores próprias: **Vem brincar!**, **Hora de estudar**, **Preciso de...** e **Como estou?**
- As páginas internas mantêm os **20 sinais existentes** e seus textos de orientação.
- Player escuro com **loop**, **reinício**, **velocidades 0,75× / 1× / 1,25×** e **Apresentar** em tela cheia.
- Na apresentação em tela cheia, botão **Próximo sinal** continua a sequência da mesma categoria; ao sair, a rota fica atualizada.
- Prévia dos vídeos nos cartões da categoria quando o navegador consegue carregar o primeiro frame; ícone vetorial no fallback.
- Layout responsivo, links de navegação por teclado, `prefers-reduced-motion` e preservação do enquadramento (`object-fit: contain`) dos sinais.

## Como instalar no repositório existente

O projeto atual está em **https://github.com/jessfrt/libras-em-rede** e já inclui 20 vídeos reais no diretório `videos/`.

1. Faça um backup ou crie uma nova branch para testar a versão.
2. **Substitua apenas** `index.html`, `styles.css`, `app.js` pelos três arquivos deste pacote.
3. **Não apague** a pasta `videos/` do seu repositório. Os arquivos MP4 continuam sendo utilizados com os nomes atuais.
4. Abra `index.html` ou publique pelo GitHub Pages.
5. Para testar o site sem alterar nada, abra `demo-libras-em-rede.html` (arquivo de prévia independente). A prévia usa os arquivos MP4 públicos já hospedados no GitHub, portanto requer conexão com a internet.

### Estrutura final

```
libras-em-rede/
├── index.html
├── styles.css
├── app.js
├── README.md
└── videos/
    ├── atencao.mp4
    ├── abrir-caderno.mp4
    └── ... outros 18 arquivos MP4 existentes ...
```

## Pontos para validar com a comunidade escolar

A interface serve como ferramenta **complementar**. Antes de apresentar os sinais como material pedagógico validado, obtenha revisão das gravações e orientações por pessoas surdas fluentes e profissionais de Libras, considerando variações regionais. Verifique contraste em projetores, legibilidade à distância, enquadramento das mãos e expressões e a experiência da turma com as categorias.

## Observações técnicas

- Site estático sem dependências JS ou build: HTML, CSS e JavaScript puro.
- Fontes externas `DM Sans` e `Fraunces` são opcionais; o site inclui fallbacks locais de sistema/Georgia.
- `app.js` contém os dados dos 20 sinais, suas rotas e controles de vídeo.
- Para gravar vídeos, prefira MP4 com H.264; não corte gestos ou expressões com CSS.
- No modo `file://`, alguns navegadores podem restringir reprodução: GitHub Pages ou servidor HTTP são mais confiáveis.

# Libras em Rede — site funcional

Protótipo web **responsivo, sem dependências**, com 4 categorias, 20 sinais, player para vídeos, repetição automática, modo tela cheia e velocidade de reprodução.

## Como abrir

1. Abra `index.html` em um navegador para conhecer o site. É possível visualizar as telas mesmo sem vídeos.
2. Para testar com vídeos, coloque os arquivos `.mp4` na pasta `videos/` com os nomes listados abaixo.
3. Abra novamente `index.html` (ou atualize a página): o site localiza e exibe os vídeos automaticamente.
4. Para publicar no GitHub Pages, envie **todos os arquivos e a pasta `videos`** para um repositório; ative `Settings > Pages > Deploy from a branch` e escolha sua branch e pasta `/ (root)`.

## Organização

```text
libras-em-rede-site/
├── index.html       Estrutura e ícones SVG
├── styles.css       Layout, tipografia, cores, responsividade
├── app.js           Categorias, nomes, textos e interações
├── README.md        Este guia
└── videos/
    ├── atencao.mp4
    └── ...
```

## Nomes dos arquivos de vídeo

| Categoria | Sinal | Arquivo |
|---|---|---|
| Vem brincar! | Quer brincar? | `videos/quer-brincar.mp4` |
| Vem brincar! | Sua vez | `videos/sua-vez.mp4` |
| Vem brincar! | Vamos juntos | `videos/vamos-juntos.mp4` |
| Vem brincar! | Legal! | `videos/legal.mp4` |
| Vem brincar! | Amigo | `videos/amigo.mp4` |
| Hora de estudar | Atenção | `videos/atencao.mp4` |
| Hora de estudar | Abrir caderno | `videos/abrir-caderno.mp4` |
| Hora de estudar | Pergunta | `videos/pergunta.mp4` |
| Hora de estudar | Esperar | `videos/esperar.mp4` |
| Hora de estudar | Ajuda | `videos/ajuda.mp4` |
| Preciso de... | Banheiro | `videos/banheiro.mp4` |
| Preciso de... | Água | `videos/agua.mp4` |
| Preciso de... | Não entendi | `videos/nao-entendi.mp4` |
| Preciso de... | Obrigado | `videos/obrigado.mp4` |
| Preciso de... | Dor | `videos/dor.mp4` |
| Como estou? | Feliz | `videos/feliz.mp4` |
| Como estou? | Triste | `videos/triste.mp4` |
| Como estou? | Raiva | `videos/raiva.mp4` |
| Como estou? | Medo | `videos/medo.mp4` |
| Como estou? | Gostei | `videos/gostei.mp4` |

### Padrão recomendado para os vídeos

- **Formato:** MP4, vídeo H.264 (compatibilidade ampla com navegadores).
- **Resolução:** 1080p, quando possível.
- **Enquadramento:** mãos, braços, tronco e expressões faciais visíveis, sem cortes; mantenha contraste entre roupas, corpo e fundo.
- **Orientação:** vertical ou horizontal. O player usa `object-fit: contain`, por isso **não corta** vídeos verticais.
- **Duração:** clipes curtos, com pequena pausa natural no início/fim para melhorar a experiência em loop.
- **Áudio:** vídeos iniciam sem áudio para permitir autoplay; o player nativo pode oferecer outros controles.
- **Validação:** confirme os sinais e possíveis variações regionais com pessoas surdas fluentes/profissionais de Libras, antes de uso educacional.

## Como alterar os textos ou incluir mais sinais

Edite o array `CATEGORIES` no início do arquivo `app.js`. A rota do vídeo é calculada a partir do campo `slug`: `videos/SLUG.mp4`.

## Funcionalidades

- Página inicial, quatro categorias, vinte páginas individuais de sinais e página sobre.
- Navegação por links e URL com `#`, que funciona em arquivos locais e GitHub Pages.
- Vídeo com `autoplay`, `muted`, `loop`, `playsinline`, controles nativos e modo tela cheia.
- Botões para ativar/desativar loop, reiniciar vídeo, velocidade (0,75×/1×/1,25×) e expandir.
- Navegação entre sinais por links ou setas esquerda/direita do teclado quando o foco não está em um controle.
- Estado reservado claro para vídeos que ainda não foram adicionados.
- Layout mobile, tablet e desktop, navegação por teclado e preferência por movimento reduzido.

### Importante

Este protótipo é um recurso complementar de mediação visual coletiva; não substitui ensino de Libras, intérprete, educador especializado ou avaliação junto à comunidade surda.

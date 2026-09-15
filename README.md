# Dom Quixote — entrega StayScape Motion

## Executar e publicar

Site estático, sem etapa de build, React, Tailwind ou Node obrigatório em produção.
Sirva esta pasta por HTTP. Para pré-visualizar com Python instalado:

```sh
python -m http.server 8765 --bind 127.0.0.1
```

Abra http://127.0.0.1:8765/ no Brave. Não use file://: módulos JavaScript e as páginas legadas precisam de HTTP.
Para publicar, copie TODO o conteúdo desta pasta para a raiz pública da hospedagem estática, incluindo `_next`, `vendor`, ícones, páginas auxiliares, robots.txt e sitemap.xml. Use HTTPS em produção. Não foi realizado deploy público.

## Escopo e fidelidade

- Base: Hotel_Dom_Quixote_Sao_Goncalo_material_publico-3.zip enviado pelo usuário.
- Todas as 11 seções da página principal permanecem na ordem original.
- Comparação automatizada dos nós de texto, elementos do body (exceto inclusão de scripts), links, imagens e textos alternativos: idênticos à fonte.
- Nenhuma página, seção, preço, comodidade, avaliação ou informação institucional foi criada ou removida.
- Os contatos e destinos das ações originais foram preservados, inclusive os botões que apontam para o formulário.
- As páginas de privacidade/erro e os assets legados foram mantidos byte a byte. O redesenho se concentra na página principal.
- Dados comerciais e avaliações do hotel foram mantidos tal como fornecidos. Não houve nova verificação externa de sua atualidade.
- Nenhum placeholder de conteúdo foi introduzido.

## Direção visual e referências

As duas imagens fornecidas na conversa foram examinadas. A primeira, StayScape, foi escolhida e confirmada pelo usuário, sem restrições adicionais. A segunda, Serenity, foi analisada apenas para comparação, não como direção adotada.

A composição combina títulos de grande escala em IBM Plex Sans local, fundo #F2F1EF, branco #FFFFFF, preto #101010, cinza #595752 e laranja #FF9500. Fotografias originais do hotel, galeria ampla, cards arredondados e seção de acomodações escura. Nenhuma fotografia da referência foi copiada.

O usuário declarou: sem referências de animação, intensidade expressiva. Nenhum exemplo de GSAP/21st.dev foi alegado como referência visual analisada.

## Movimento e interações

- GSAP 3.13.0 + ScrollTrigger 3.13.0: sequência coordenada no hero, entradas escalonadas, máscaras de recorte, parallax de baixa amplitude e transição do menu.
- Lenis 1.3.11: smooth wheel scroll no desktop, com navegação por âncoras e foco. O toque mantém a rolagem nativa.
- CTAs: efeito magnético limitado, preenchimento circular/líquido por CSS e compressão visual ao pressionar. Não depende de vibração física do dispositivo.
- Quartos: tilt 3D, zoom suave, revelação da descrição existente e resposta de teclado. Não existem preços por quarto na fonte; não foram inventados.
- Galeria: arrasto com inércia no mouse, swipe nativo por toque, setas/Home/End por teclado. Reutiliza somente as fotos da galeria original.
- Header fixo compacto, backdrop blur e menu móvel em tela cheia com Escape, confinamento de foco e bloqueio de interação com o fundo.
- FAQ: details/summary nativos com expansão animada cancelável.
- prefers-reduced-motion: desativa Lenis, ScrollTrigger, tilt, parallax e transições; a mudança de preferência também funciona em tempo real.
- Falha das bibliotecas: conteúdo visível e recursos essenciais em HTML/JavaScript nativo. A página continua legível sem JavaScript; recursos avançados requerem JS.
- O canvas original e as bibliotecas Three fornecidas continuam no pacote. O loop WebGL anterior, já invisível na versão recebida, não é executado. `three-scene.js` agora contém a galeria nativa, evitando gasto contínuo de GPU sem resultado visível.
- Transform/opacity são a base do movimento. Clip-path é usado nas revelações solicitadas; height apenas na expansão pontual da FAQ. Não se afirma aceleração por hardware universal para essas propriedades.

## Reserva

O formulário valida datas e exige check-out posterior ao check-in. A data mínima usa o calendário local, não UTC. A consulta navega para o WhatsApp da recepção com a mensagem correspondente, evitando bloqueio de pop-up. Não processa pagamento nem confirma reserva. Os testes interceptaram a navegação externa: nenhuma mensagem foi enviada ao hotel.

## Arquivos alterados/adicionados

Alterados: `index.html`, `style.css`, `script.js`, `three-scene.js`.
Adicionados: `vendor/gsap.min.js`, `vendor/ScrollTrigger.min.js`, `vendor/lenis.min.js`, `vendor/LENIS-LICENSE.txt`, `vendor/THIRD-PARTY.md` e este README.
Demais arquivos originais preservados, inclusive os recursos `_next` necessários às páginas auxiliares.

## Validação

Brave real, automatizado via Playwright, em 1440×1000, 768×1024, 390×844 e 320×568. Capturas examinadas de desktop, tablet, mobile, cards, reservas, avaliações e menu estreito/baixo.

Verificados: sintaxe JS, carregamento HTTP dos recursos principais, renderização de todas as fotos, ausência de overflow horizontal, menu aberto/fechado, teclado, foco, FAQ, campos obrigatórios, rejeição de mesma data, URL de WhatsApp com os dados corretos, arrasto, inércia, swipe por toque, hover, header compacto, movimento reduzido e atualização de preferência em tempo real.

A auditoria axe-core 4.10.3, tags WCAG 2 A/AA e 2.1 AA, não encontrou violações nos estados auditados. Isso não equivale a certificação completa de acessibilidade. Não foram feitos testes em aparelhos físicos, Safari ou Firefox, nem medições de Core Web Vitals em produção.

As páginas auxiliares fornecidas abriram por HTTP sem erros JavaScript. Não receberam a nova linguagem visual.

O relatório automatizado e o preview ficam ao lado do ZIP na pasta de entrega, não dentro dos assets públicos. O pacote é verificado por integridade e novamente aberto após extração limpa.

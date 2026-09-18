# Hype Drink — situação do projeto e o que falta

17/09/2026

## Situação e propósito

A Hype Drink do Espaço Prime Plaza **ainda não abriu**. A proprietária está contratando o serviço agora, e o que está sendo construído não é o site final de uma operação em funcionamento: é uma **demonstração do que o site pode ter**, para ela ver as funções e aprovar o trabalho.

Isso muda a prioridade de tudo. O objetivo número um não é converter cliente final — é convencer a proprietária. Na prática:

- O site precisa parecer pronto, mesmo com dados que ainda não existem.
- Funcionalidades podem ser simuladas, desde que a simulação seja convincente e esteja marcada como protótipo.
- Vale mostrar mais do que o mínimo, porque cada função visível é um argumento de venda.

O produto final, quando a loja abrir, é um **catálogo digital que funciona como cardápio**, acessado principalmente pelo celular — por QR Code ou NFC no balcão, ou pelo link do Instagram. Não é um site institucional para ser lido no desktop.

## O que foi pedido

Requisitos traduzidos das mensagens recebidas:

| Pedido | O que significa na prática |
| --- | --- |
| Site catálogo servindo de cardápio | Cliente abre e escolhe a bebida; não é página institucional |
| Adaptado para celular | Mobile é a tela principal, não uma adaptação do desktop |
| Não usar foto animada, usar fotos reais | Substituir as ilustrações vetoriais por fotografia dos copos |
| Sistema de pedido enviado para o WhatsApp | Carrinho com mais de um item, não só o botão por produto |
| Com entrega e tudo | Formulário de endereço, forma de pagamento e taxa entrando na mensagem |
| Tudo para mostrar as funções que o site terá | Pode ser simulado; a mensagem do WhatsApp é a entrega real |

O ponto de atenção está na terceira linha. A instrução "não usar foto animada" provavelmente se refere às ilustrações desenhadas em código — os copos vetoriais do catálogo. Vale confirmar se a animação do copo enchendo na abertura também está incluída nessa crítica, porque ela é o efeito mais forte do site e hoje já roda sobre a fotografia real, não sobre desenho.

## O que já está pronto

O site está no ar em `hyper-drink.vercel.app`, com deploy automático pelo Vercel. Stack: React 19, Vite, TypeScript, Tailwind, Framer Motion, GSAP, Lucide e Lenis. Código organizado em componentes, sem nada amontoado no `App.tsx`.

**Seções construídas**

- **Abertura** — tipografia grande, foto real do copo e a animação do líquido subindo sobre a própria fotografia
- **Conheça a Hype** — texto institucional curto e composição com três copos
- **Conheça os benefícios** — seis cards com a comunicação funcional da marca
- **Escolha seu Hype** — catálogo com oito sabores, filtros por Energia, Foco, Metabolismo e Pré-treino
- **Encontre a Hype** — recriação do cartaz da loja, endereço, horário e botões de rota, WhatsApp e Instagram
- **Entre no Hype** — grade no formato de posts, já com uma fotografia real
- **Aproxime, escaneie, escolha** — explicação do acesso por QR Code e NFC
- **Chamada final e rodapé**

**Funcionando hoje**

- Cada produto abre um painel com composição, quantidade e preço, que gera uma mensagem pronta no WhatsApp
- Botão flutuante de WhatsApp a partir da primeira rolagem
- Menu em tela cheia no celular, filtros com rolagem horizontal, áreas de toque adequadas
- Sem rolagem horizontal em 360, 390 e 430 px de largura
- Animações desligam sozinhas para quem ativa redução de movimento no sistema
- Identidade fiel ao material impresso: selo circular com o raio amarelo, verde da marca, copo com tampa

**Decisões já tomadas**

Os dados ficam centralizados em dois arquivos: `src/data/site.ts` para contatos e links, `src/data/products.ts` para o cardápio. Trocar o cardápio inteiro não exige mexer em componente nenhum. O catálogo segue a lógica real do produto — chá, N-R-G, CR7 Drive e Liftoff — e não uma lista genérica de sucos.

## O que falta

### Correções em andamento

Três problemas já identificados, com correção em execução no Claude Code:

- **Abertura no desktop** — em telas entre 1100 e 1500 px o título quebra em duas linhas e o copo passa por cima do fim da palavra. Causa: o título não tem largura máxima.
- **Abertura no celular** — o copo está posicionado fora do fluxo, o que deixa um vão morto abaixo dos botões e o canudo encostando no texto do canto.
- **Peso do arquivo** — 652 kB de JavaScript, 277 kB compactado, num único bloco. Funciona, mas é lento no 4G do shopping, que é exatamente o cenário do QR Code no balcão.

Há também **um erro no console** do navegador em produção, ainda não identificado. Pode ser bobagem de ícone, ou pode ser a fonte do Google sendo bloqueada — o que mudaria a tipografia do site inteiro para quem acessa.

### Funcionalidade nova: sistema de pedido

É o maior item em aberto e não existe hoje. O que existe é um botão por produto que abre o WhatsApp com um item só. O pedido:

- Carrinho que acumula vários itens, com quantidade por item
- Botão flutuante mostrando total de itens e valor
- Escolha entre retirada no balcão e entrega
- Formulário de entrega: nome, endereço com número e complemento, ponto de referência, bairro
- Forma de pagamento: dinheiro com troco para quanto, cartão na entrega, Pix
- Observações do pedido
- Taxa de entrega e total calculados na tela
- Tudo isso vira **uma mensagem organizada no WhatsApp**, pronta para a loja ler e separar

Tudo funciona sem servidor e sem banco de dados. O pedido não é registrado em lugar nenhum: a mensagem do WhatsApp é a entrega. Para o propósito de demonstração isso é suficiente e, para uma loja pequena, pode inclusive ser o modelo definitivo.

### Fotografia

O catálogo ainda usa ilustrações vetoriais, e o pedido foi para usar fotos reais. Faltam:

- Uma foto por sabor, todas no mesmo enquadramento, mesma luz e mesmo fundo — senão a grade fica desalinhada
- Foto da loja ou do balcão para a seção de localização
- Duas ou três fotos para a grade do Instagram
- Idealmente, a foto de estúdio original em alta resolução; a que temos chegou comprimida a 386 px de largura

### Conteúdo que só a loja tem

Nada disso é invenção nossa e tudo está marcado como provisório no código:

- Cardápio real: quais sabores existem, os nomes oficiais, os tamanhos
- Preços
- Número de WhatsApp (hoje há um fictício no lugar)
- Endereço completo e link do Google Maps
- Horário de funcionamento
- Perfil do Instagram a divulgar — se é o do espaço ou um da Hype Drink
- Se haverá entrega, para quais bairros e qual a taxa

### Antes de publicar

- Domínio próprio no lugar do endereço do Vercel
- QR Code gerado apontando para o endereço final
- Revisão das promessas de saúde na seção de benefícios
- Compressão das fotos e carregamento progressivo
- Ícone do site e imagem de compartilhamento para quando o link for enviado no WhatsApp

## O que depende da cliente

Perguntas objetivas para levar à reunião. As primeiras travam o trabalho; as últimas só entram antes de publicar.

**Travam agora**

1. Vai ter entrega? Se sim, quais bairros e qual a taxa — valor único ou por região?
2. Formas de pagamento aceitas na entrega?
3. Pedido chega em qual WhatsApp — o da loja ou o pessoal dela?
4. Ela consegue fotografar alguns copos antes da inauguração, ou seguimos com ilustração até abrir?

**Entram antes de publicar**

5. Cardápio fechado: sabores, nomes, tamanhos e preços
6. Endereço completo e horário de funcionamento
7. Qual Instagram divulgar
8. Domínio próprio: ela quer um, e em nome de quem fica registrado?
9. Quem mantém o site depois — trocar preço e sabor é edição de código, não painel

**Item à parte**

10. As promessas de saúde do material impresso ficam no site? Perda de peso, sono e inflamação são alegações que a ANVISA fiscaliza em página comercial, bem mais do que em story do Instagram. A decisão é dela, mas precisa ser consciente.

## Riscos e pontos de atenção

**Fotografar uma loja que ainda não abriu.** O pedido é usar fotos reais, mas os sabores podem nem existir ainda. Sem bebida pronta não há foto. Os caminhos são: montar dois ou três copos só para a sessão de fotos, manter ilustração até a inauguração, ou usar fotos do fabricante — que não mostram o copo da loja. Vale decidir isso antes de prometer o catálogo fotográfico.

**Expectativa versus protótipo.** Quanto mais o pedido com entrega parecer real, maior o risco de a cliente achar que o sistema já está funcionando. Ninguém recebe pedido, ninguém calcula rota, nada fica registrado. Isso precisa estar dito na apresentação, não só numa letra miúda no rodapé.

**Manutenção depois da entrega.** Hoje, mudar um preço significa editar código e publicar de novo. Para uma loja que vai ajustar cardápio nos primeiros meses, isso vira chamado recorrente. Ou entra no contrato como suporte, ou em algum momento o cardápio precisa sair para um painel editável — o que é um projeto bem maior.

**Velocidade no celular.** O cenário real é alguém com o celular no balcão, no 4G do shopping, decidindo se espera ou desiste. O site tem animação, fotos e efeitos. A conta de peso não pode ficar para depois.

**Escopo do "e tudo".** "Com entrega e tudo" pode significar o formulário que vira mensagem no WhatsApp — que é o que está previsto — ou pode significar cálculo de frete por distância, prazo, status do pedido e pagamento online. São projetos de tamanhos diferentes. Vale alinhar isso na mesma conversa em que se fala de preço.

## Próximos passos

Ordem sugerida, pensada para chegar à apresentação com o site inteiro de pé.

**1. Fechar as correções em andamento.** Abertura no desktop, abertura no celular e peso do arquivo. Verificar também o erro do console. Sem isso, qualquer coisa nova é construída sobre um alicerce torto.

**2. Construir o sistema de pedido.** É o que a cliente pediu e é o que mais impressiona numa demonstração: escolher três bebidas, preencher endereço, ver a taxa entrar na conta e a mensagem chegar pronta no WhatsApp. Sugestão de ordem: carrinho, depois botão flutuante com o total, depois a tela de finalização com entrega e pagamento, e por último a montagem da mensagem.

**3. Resolver a fotografia.** Depende da resposta dela sobre fotografar antes de abrir. Enquanto não houver definição, o catálogo continua com ilustração — que está apresentável e não trava nada.

**4. Preparar a apresentação.** Site aberto no celular, porque é a tela que importa. Roteiro curto: abertura, catálogo, um pedido completo do começo ao fim, e a explicação do QR Code no balcão. Deixar claro, em voz alta, o que é simulado.

**5. Só depois: cardápio real, domínio e QR Code.** Isso é fechamento, não demonstração. Entra quando ela aprovar e mandar os dados.
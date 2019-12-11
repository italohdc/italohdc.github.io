---
layout: post
title:  "Como desenvolvi um app para a She's Tech Conference com Vue + Firebase"
date:   2019-12-03 9:00:00 +0000
lang:   pt_BR
thumbnail: shestech-app.gif
banner: shestech-app.png
---

Entre os dias **21 e 23 de novembro** aconteceu a **She's Tech Conference 2019**. Foram três dias de workshops, palestras e painéis de especialistas no maior evento para mulheres na tecnologia do Brasil.

Como forma de contribuir para o enriquecimento do evento, desenvolvi uma **aplicação que mostrava informações sobre as atividades realizadas** durante a conferência.

Neste post, vou apresentar as tecnologias utilizadas para desenvolver o web app, alguns problemas que tive com o Firestore, como eles foram contornados e o resultado final da aplicação durante o evento.

{% include image.html file="shestech-app/app-sample.png" alt="Logotipo da She'sTech Conference acompanhado de dois celulares exibindo algumas telas da aplicação" %}

O repositório do projeto está disponível no [GitHub](https://github.com/shes-tech/conference-app).

Você pode testar o app pelo link: [https://shestech.netlify.com/events](https://shestech.netlify.com/events)


## Tecnologias Utilizadas

### Vue.js + Vuex

O [Vue.js](https://vuejs.org/) é um framework de desenvolvimento de SPA (single-page application). Apesar de existirem outras opções semelhantes, como o React e o Angular, escolhi o Vue devido ao tamanho pequeno do projeto inicial, à minha familiaridade com o framework e à facilidade em dividir a aplicação em componentes reutilizáveis.

Além disso, para facilitar o gerenciamento de estados global da aplicação, adicionei o [Vuex](https://vuex.vuejs.org/) ao projeto.

### Firebase Firestore

Como eu tinha um tempo curto para desenvolver a aplicação e não possuía muita experiência de como configurar um banco de dados do zero, resolvi utilizar o [Firebase Firestore](https://firebase.google.com/docs/firestore?hl=pt-br), que é um banco de dados NoSQL ao qual você não precisa configurar um servidor.

Além de possuir essa vantagem, o Firestore fornece uma cota de uso gratuita, ideal para ser utilizada em ambientes de teste.

{% include image.html file="shestech-app/firebase-pricing.png" description="Foto com algumas informações sobre cobrança do Firebase. Consultado em 03/12/2019." %}

Caso a modelagem do seu banco de dados seja bem feita, é possível utilizar um banco de dados robusto gastando pouco. Só cuidado para não fazer igual uma startup da Colômbia que conseguiu criar uma conta de 30 mil dólares em dois dias...

> Leia "[How NOT to get a $30k bill from Firebase](https://medium.com/@PurpleGreenLemon/how-not-to-get-a-30k-bill-from-firebase-37a6cb3abaca)"

### Netlify

Existem várias plataformas de hospedagem de sites que poderiam ser utilizadas. O próprio Firebase possui o serviço Firebase Hosting. No entanto, resolvi utilizar o [Netlify](https://www.netlify.com/) para fazer a hospedagem da aplicação porque, além de fornecer um serviço de hospedagem gratuita, ele permite configurar de forma fácil e rápida o deploy automático da aplicação.

Isso significa que sempre que alguma nova alteração for adicionada ao repositório Git do projeto na branch master, ele irá gerar a build da aplicação automaticamente e subir as mudanças para o ambiente de produção.

Mesmo que este não seja um projeto grande, não precisar se preocupar em atualizar a aplicação (e ter a confiança de que ela vai estar sempre atualizada) acaba sendo uma mão na roda.

### Buefy

O [Buefy](https://buefy.org/) é uma biblioteca de componentes estilizados para o Vue baseado no Bulma. Semelhante ao Bootstrap, o Bulma é um framework CSS que fornece alguns estilos prontos para agilizar a confecção de uma página web. Uma das grandes vantagens do Buefy, e um dos motivos pelo qual ele foi escolhido, é o tamanho pequeno da biblioteca.

### date-fns (no lugar do Moment.js)

Muitos devem conhecer o [Moment.js](https://momentjs.com/), uma biblioteca para manusear datas no JavaScript. Apesar de ser bastante utilizada, ela possui uma má fama de ser muito pesada. Como um dos requisitos do projeto era deixar a aplicação a mais leve possível, resolvi utilizar a biblioteca [date-fns](https://date-fns.org/), que possui funções muito similares ao Moment.

Além de possuir um tamanho menor que o Moment, a biblioteca date-fns permite que seja feito _tree-shaking_, o que significa que partes não utilizadas da biblioteca não são adicionadas à aplicação. Isso ajuda a reduzir ainda mais o tamanho final do projeto.


## Gerenciamento dos eventos

Quando comecei a desenvolver a aplicação, a primeira tela que projetei foi uma seção de gerenciamento de eventos. Nessa seção, seria possível criar, alterar e deletar eventos.

No entanto, como eu possuía um tempo curto, parei o desenvolvimento dessa seção e foquei o desenvolvimento nas telas de listagem de eventos para as participantes da conferência.

Para preencher a ausência de um painel de administração, criei uma tabela no Google Sheets em que coloquei a programação do evento. Para sincronizar as informações da tabela, criei um script no Google Script para exportar as informações da planilha para o Firestore.

{% include image.html file="shestech-app/gscript-example.png" alt="Duas janelas de um navegador mostrando o Google Sheets e o Google Script abertos" %}

Apesar de não ser a situação ideal (e que me impediu de delegar a tarefa de gerenciar os eventos para outras pessoas), essa abordagem permitiu criar um MVP da aplicação em um tempo hábil.

Abaixo você confere o código que utilizei no Google Script:

<script src="https://gist.github.com/italohdc/c529157a9d8543f31545f9364365279f.js"></script>

## Alguns problemas com o Firestore...

Nos próximos pontos, explicarei alguns problemas que tive ao utilizar o Firebase. Para isso, utilizarei alguns termos referentes à estrutura de dados do Firestore. Caso você não possua familiaridade com algum dos termos, recomendo que você [leia esta página](https://firebase.google.com/docs/firestore/data-model?hl=pt-br) explicando o funcionamento do Firestore.

### Problema 1: Cada evento estava gastando duas leituras

Apesar de o Firestore ser um banco de dados NoSQL, criar algumas relações entre os dados permite otimizar a leitura e pesquisa de documentos.

Além disso, a cobrança do Firestore é feita a partir da quantidade de documentos lidos (ou seja, quanto menos leituras forem feitas, menor será o valor final cobrado pelo Firebase).

Inicialmente, eu havia projetado o banco para salvar as informações do evento e da palestrante em coleções separadas (o documento do evento somente contém a referência do documento da palestrante). Apesar de compartimentalizar melhor o banco, seriam necessárias duas leituras para exibir o card de pré-visualização de cada evento.

Para evitar a leitura de dois documentos (evento e palestrante), adicionei aos documentos dos eventos, além da referência ao documento da palestrante, o nome da palestrante. Assim, seria possível exibir o nome da palestrante na pré-visualização gastando somente uma leitura. Caso fosse solicitado, as informações da palestrante poderiam ser carregadas com facilidade.

{% include image.html file="shestech-app/firebase-issue1.png" alt="Comparativo entre forma não otimizada e otimizada de salvar as informações no banco. Do lado esquerdo (não otimizado), são apresentados exemplos dos dois documentos que precisariam ser baixados. Do lado direito (otimizado) é apresentado apenas um documento contendo a junção de algumas informações dos dois documentos anteriores." %}

### Problema 2: Todos os eventos estavam sendo baixados simultaneamente

Durante a fase de desenvolvimento da aplicação, a tela de listagem de eventos carregava e apresentava todos os eventos de uma só vez. Apesar de isso facilitar o desenvolvimento, a aplicação realizava muitas leituras de desnecessariamente, o que deixa a inicialização da aplicação mais lenta e aumenta a quantidade de leituras no Firestore ao abrir a página inicial.

Uma forma que encontrei para evitar esses problemas foi implementar um **infinite-scroll** (semelhante ao feed do Instagram e Facebook) na listagem de eventos para carregar a lista de acordo com a necessidade do usuário.

{% include image.html file="shestech-app/infinite-scroll.gif" alt="Exemplo do Infinite Scroll funcionando" %}

Para efeito de comparação, após a implementação do infinite-scroll, a quantidade de leituras no período de desenvolvimento passou de **26k leituras/dia** para **1.3k leituras/dia**.

### Problema 3: Alguns eventos não estavam aparecendo na lista

Esse foi um problema que só descobri após o início da conferência: uma das voluntárias, ao checar a lista de eventos, me avisou que alguns dos eventos não estavam aparecendo.

Após debugar o código, descobri que isso ocorria porque, ao carregar os novos eventos pelo infinite-scroll, a pesquisa no Firestore recebia como parâmetro do startAfter um horário. Caso houvesse outros eventos no horário do último evento carregado, eles não eram mais mostrados na lista.

Para corrigir isso, passei a fornecer no startAfter o snapshot do último evento pesquisado.

{% include image.html file="shestech-app/firebase-issue2.png" alt="Do lado esquerdo, janela apresentando o código errado. Do lado direito, janela apresentando o código correto." %}


## E como funcionou na prática?

Após corrigidos os problemas citados, a aplicação funcionou com sucesso. Nenhuma queda do serviço foi registrada durante o evento. Apenas um bug foi reportado.

Em um único dia, o aplicativo foi acessado por **437 usuários únicos** e foram realizadas **83k leituras** do banco de dados.

Como a cota gratuita de 50k leituras/dia foi extrapolada, foi cobrado um valor de aproximadamente **R$ 0,10** referente ao excedente de leituras (esse valor foi descontado dos créditos do Google Cloud que eu tinha disponíveis).

{% include image.html file="shestech-app/firebase-result.png" description="Gráficos apresentando a quantidade de leituras feitas no banco e a quantidade de usuários em um dia" %}

---

Se você ficou em dúvida sobre algum assunto que foi abordado, pode deixar o seu comentário aqui no post.

Ah, e este projeto possui código aberto. Se você ficou interessada em contribuir, crie uma _issue_ no [GitHub](https://github.com/shes-tech/conference-app) manifestando a sua vontade de ajudar! :D

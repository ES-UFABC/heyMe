# heyMe - Apoio Psicológico

Atividade desenvolvida para a disciplina de Engenharia de Software da UFABC - ministrada pelo docente Paulo Meirelles e, pelos estudantes:

1. Leonardo Vaz Lourenço
1. Letícia Matias de Araújo
1. Lucas Kitahara
1. Lucca Ianaguivara Kisanucki
1. Thiago Silva das Mercês

### IMPORTANTE:

    Esse projeto NÃO seguiu qualquer conselho e nem foi aprovado por qualquer órgão ou especialista ligado ao Conselho Federal de Psicologia Brasileiro.

## Descrição do Projeto

Esta aplicação visa auxiliar as pessoas oferencendo um "pré" atendimento psicológico, em que o usuário poderá ter uma conversa com um chatbot, que por sua vez, auxiliaria o mesmo a entender o que está sentindo, ou ajudar a se conhecer.

Consonantemente, a cada conversa, se o Chatbot achar necessário, poderá indicar encaminhamento psicólogo e/ou atendimento. Adicionalmente, há uma opção para relatar sua rotina através de um diário para que o usuário pudesse se sentir confortável e ter onde guardar algo mais íntimo. 

O projeto contem as seguintes features:

### Diário Pessoal

O usuário pode fazer anotações diárias pessoais, levando em consideração suas atitudes e reflexões que fazem bem ou não pra si.

### Chatbot Companheiro

O chatbot tem como função ser alguém com quem o usuário possa conversar sobre os seus problemas psicológicos, e sua inteligência artificial é capaz de identificar sintomas de depressão e de transtornos de ansiedade, sendo assim capaz de realizar um pré-diagnóstico sobre os problemas do paciente. A partir do momento em que é identificado o transtorno psicológico que o paciente tem mais probabilidade de ter, o chatbot o apresenta a possibilidade de ser encaminhado para um psicólogo com o qual ele possa conversar em mais detalhes sobre seus problemas para assim buscar um tratamento mais individualizado.

### Chat com psicólogo(a)

Funcionalidade em que a pessoa poderá mandar mensagem pra algum(a) psicólogo(a). Mesmo que o usuário não possa fazer uma terapia contínua, ele poderá conversar com alguém de forma "assíncrona".

## Tecnologias Utilizadas

* Python;

* Flask;

* React / Javascript;

* MySQL.


## Acessando o site
O site está atualmente hospedado nos servidores da Amazon Web Services. Assim, se quiser acessá-lo, basta entrar no URL https://main.d2zkwp21ziyzwg.amplifyapp.com/. Caso queira rodar localmente, é preciso baixar os arquivos deste repositório e realizar a seguinte modificação no arquivo App.js do diretório heyMe/hey_me/src:

  Onde está escrito ```localStorage.setItem("api-origin", "https://main.d1w1cxbdfenujy.amplifyapp.com/");``` deve ser substituído por ```localStorage.setItem("api-origin", "http://localhost:3000");```

## Instalação

Neste projeto, utilizou-se as seguintes bibliotecas (Python):

```bash
random, json, pickle, numpy e nlkt
```

Para instalá-las, inicialmente instale as dependências Node Package Manager:

```bash
npm install
```

Na sequência, basta executar o comando abaixo dentro do repositório do projeto:

```bash
pip install -r requirements.txt
```

## Execução

Para executar o projeto, inicialize as dependências Node Package Manager:

```bash
npm start
```

Posteriormente, execute o comando abaixo dentro do repositório do projeto:

```bash
py hey_me/api/application.py    , no Windows
```
ou
```bash
python hey_me/api/application.py    , no Linux ou MacOS
```

## Cloud Service AWS
### BackEnd
* CI/CD using CodePipeline
* Hosted on Elastic Beanstalk:
http://heymeapi-env-1.eba-5rahmizp.us-east-1.elasticbeanstalk.com/
* Instance type: t3.small

### FrontEnd
* Hosted on the AWS Amplify:
https://main.d2zkwp21ziyzwg.amplifyapp.com/
* Build Settings:
```
version: 1
applications:
  - frontend:
      phases:
        preBuild:
          commands:
            - npm cache clean --force
            - npm install
        build:
          commands:
            - npm run build
      artifacts:
        baseDirectory: build
        files:
          - '**/*'
    appRoot: hey_me
```

### DataBase
* Hosted on the Amazon RDS
* Engine: MySQL Community
* Class: db.t3.micro

## Licença

Este projeto está sob a licença do MIT.

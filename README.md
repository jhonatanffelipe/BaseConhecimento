# Base Conhecimento

O projeto foi desenvolvido ao longo do curso de web moderno da cod3r.

A ideia do projeto é uma plataforma que permita aos usuários postarem artigos sobre um determinado assunto. Possibilitando o compartilhamento de conhecimento em diversas áreas.

<p align="center">
   <img alt="Tecnologias" src="https://img.shields.io/github/languages/count/jhonatanffelipe/BaseConhecimento?color=49a7c1">
   <img alt="Tamanho do repositório" src="https://img.shields.io/github/repo-size/jhonatanffelipe/BaseConhecimento?color=49a7c1">
   <img alt="Ultimo commit no Github" src="https://img.shields.io/github/last-commit/jhonatanffelipe/BaseConhecimento?color=49a7c1">
   <img alt="Criado por" src="https://img.shields.io/badge/made%20by-jhonatanffelipe-%20?color=49a7c1">
   <img alt="Linguagens mais usadas no programa" src="https://img.shields.io/github/languages/top/jhonatanffelipe/BaseConhecimento?color=49a7c1">
</p>

## Backend

Uma API REST desenvolvida em NodeJS. É responsável por servir os dados para a aplicação web;

#### Tecnologia utilizadas na construção do Backend

- [VS Code](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Javascript](https://www.javascript.com/)
- [Docker](https://www.docker.com/)
- [Postgres](https://www.postgresql.org/)
- [Knex](https://knexjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Mogoose](https://mongoosejs.com/docs/)
- [Cors](https://www.npmjs.com/package/cors)
- [JWT](https://jwt.io/introduction)


## Frontend Web

- A aplicação ter por responsabilidade permitir que os usuários se cadastrem e possam publicar artigos. 

<img alt="DevRadar" src="https://raw.githubusercontent.com/jhonatanffelipe/BaseConhecimento/main/assets/Dashboard.png" height="350px" />

#### Tecnologia utilizadas na construção do Frontend

- [Javascript](https://www.javascript.com/)
- [Vue](https://vuejs.org/)
- [Axios](https://www.npmjs.com/package/axios)


## Como Executar a aplicação?

- O primeiro passo é clonar o repositório nossa base;
- Em seguida dentro de cada um dos diretórios backend, frontend iremos executar no terminal o comando `yarn`, para baixar as dependências de nossas aplicação;
- Criar um banco de dados postgres.
- Realizar as configurações acessos no arquivo .env.
- Executar as migrations, para criar as tabelas do banco

    ```jsx
    //Execulta as migrations
    yarn knex migrate:latest
    ```

- Executaremos o comando `yarn start` dentro de backend para podermos executar nossa aplicação;
- Com o backend executando, podemos acessar o diretório frontend e executar o comando `yarn serve `no terminal, para executar o frontend da aplicação.

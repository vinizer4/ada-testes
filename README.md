# Projeto Final Testes Automatizados

Este projeto é a entrega final do módulo de testes da Ada Tech, focando na implementação e prática de testes unitários e de integração em uma aplicação Node.js que utiliza Express para a construção de uma API Rest. A aplicação permite a criação de usuários e sessões, bem como a alteração de senhas.

## Bibliotecas Utilizadas para Testes

### Jest

Jest é uma poderosa biblioteca de testes em JavaScript, utilizada para escrever e executar testes unitários e de integração. No projeto, o Jest foi configurado como o framework de teste principal para validar a lógica de negócios e a integração dos componentes da aplicação.

- **Website:** [Jest](https://jestjs.io/)
- **Uso no projeto:** Testes unitários e de integração.

### Supertest

Supertest é uma biblioteca que facilita o teste de APIs HTTP, permitindo que as requisições sejam feitas em um ambiente de teste. No projeto, o Supertest é utilizado em conjunto com o Jest para testar as rotas da aplicação, verificando as respostas HTTP esperadas.

- **Website:** [Supertest](https://github.com/visionmedia/supertest)
- **Uso no projeto:** Testar endpoints da API.

### @testcontainers/mongodb

A biblioteca @testcontainers/mongodb permite a execução de contêineres Docker para MongoDB durante os testes. Isso é especialmente útil para testes de integração, onde uma instância real do MongoDB é necessária para validar as operações do banco de dados.

- **Website:** [Testcontainers](https://www.testcontainers.org/)
- **Uso no projeto:** Criar um ambiente de banco de dados MongoDB isolado para testes de integração.

### Mongoose

Mongoose é uma biblioteca de modelagem de objetos MongoDB para Node.js. Embora não seja exclusivamente uma ferramenta de teste, ela é crucial para interagir com o MongoDB nos testes de integração.

- **Website:** [Mongoose](https://mongoosejs.com/)
- **Uso no projeto:** Interagir com o MongoDB nos testes de integração.

## Testes Implementados

O projeto inclui testes unitários e de integração, focando em validar o correto funcionamento das seguintes partes da aplicação:

- **Controllers:** Testes unitários para validar as operações de criação de usuários e sessões.
- **Services:** Testes unitários para as regras de negócio e interação com o banco de dados.
- **Middleware de Autenticação:** Testes unitários para garantir que apenas usuários autenticados possam acessar determinadas rotas.
- **Fluxo de Criação de Usuários:** Testes de integração para validar todo o processo de criação de usuários, desde a requisição HTTP até a persistência no banco de dados.

## Como Executar os Testes

Para executar os testes, você precisa ter o Node.js e o Docker instalados em sua máquina. Após clonar o projeto, execute os seguintes comandos no terminal:

Para que o teste de integração funcione o Docker tem que estar rodando no momento da execução
```bash
npm install
npm test
```

Este projeto foi desenvolvido por um grupo de estudantes da Ada Tech como parte da entrega final do módulo de testes automatizados. Abaixo estão os contribuintes deste projeto:

- **Vinicius Teixeira Saraiva**
- **Raquel Vitoria dos Santos Jacques**
- **Francieli Franco**
- **Ysabella Cristina De Almeira Silva**


**Agradecimentos especiais** a todos os professores e mentores da Ada Tech pelo suporte e orientação ao longo do curso.
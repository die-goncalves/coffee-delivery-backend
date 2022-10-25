<h1 align="center">
    <img alt="Coffee Delivery" title="Coffee Delivery" src="assets/logo.svg" width="125px" />
</h1>

<!-- TABLE OF CONTENTS -->

<h5 align="center"> 
<a href="#sobre">Sobre</a>
   •   <a href="#tecnologias">Tecnologias</a> 
   •   <a href="#instalação">Instalação</a> 
   •   <a href="#funcionalidades">Funcionalidades</a> 
   •   <a href="#licença">Licença</a>     
   •   <a href="#autor">Autor</a> 
</h5>

## Sobre
<h4>Backend da aplicação Coffee Delivery</h4>

O propósito para a construção deste backend é fornecer os serviços necessários para que o [frontend da aplicação Coffee Delivery](https://github.com/die-goncalves/coffee-delivery.git) funcione corretamente. Nele estabelecemos rotas para gerenciar os dados do estabelecimento, dos cafés, dos pedidos e da autenticação de usuários.

Os dados do estabelecimento e dos cafés foram armazenados no banco de dados utilizando o `prisma studio`.

A autenticação de usuários segue a estratégia de refresh token, ao realizar o cadastro de um usuário são armazenados no banco o email, senha e um refresh token que é um token com expiração de longa duração, além disso também é gerado um access token que é um token de curta duração e fornecido à parte frontend da aplicação, com esses dois tokens realizamos a autenticação do usuário sem precisar informar email e senha a todo momento.

Os pedidos só podem ser feitos e visualizados por usuários autenticados e por isso middlewares de autenticação foram adicionados em rotas específicas.

Na aplicação também foi construído um sistema centralizado para tratamento de erros.

## Tecnologias

- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [Json Web Tokens](https://jwt.io/)

> Veja o arquivo  [package.json](package.json)

## Instalação

- ### **Pré-requisitos**
  - É **necessário** possuir o **[Git](https://git-scm.com/)** instalado e configurado no computador.
  - É **necessário** ter um gerenciador de pacotes **[Yarn](https://yarnpkg.com/)** ou **[Npm](https://www.npmjs.com/)**.

- ### **Próximo passo**
1. Faça um clone deste repositório:
   ```sh
   $ git clone https://github.com/die-goncalves/coffee-delivery-backend.git
   ```

2. Instale as dependências:
   ```sh
   # Entre no diretório do repositório clonado
   $ cd coffee-delivery-backend
   # Instale as dependências do projeto.
   $ yarn #ou $ npm install
   ```

3. Variáveis de ambiente
  a. Crie o arquivo **.env** na raiz do projeto (Ficando no mesmo nível que o package.json) com a seguinte variável: 
    ```
    DATABASE_URL=
    ``` 
    ---
    - **DATABASE_URL**
      No projeto utilizamos um banco de dados local sqlite e por isso digite `"file:./dev.db"` em `DATABASE_URL`.
    <br />

4. Execute a aplicação
    ```sh
    # Na raiz do projeto abra o terminal e execute o comando 
    $ yarn dev #ou npm run dev
    # A aplicação inciará na porta 3333 - acesse <http://localhost:3333>

    # Se quiser ver o conteúdo do banco de dados você pode executar o comando abaixo
    $ npx prisma studio
    # Irá abrir uma aba no navegador com o endereço <http://localhost:5555> com uma interface gráfica para visualização do banco de dados
    ```

## Funcionalidades

- [x] Rota para buscar dados do estabelecimento;
- [x] Rota para buscar todos os cafés;
- [x] Rota para cadastrar usuários;
- [x] Rota para entrar em uma sessão;
- [x] Rota para salvar pedidos;
- [x] Rota para buscar pedidos realizados por um usuário;
- [x] Rota para atualizar access token a partir de um refresh token;
- [x] Rota para verificar se o access token é válido;
- [x] Rota para buscar informações do usuário se access token for válido;

## Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Autor

Feito por Diego Gonçalves, contato:

[![Badge](https://img.shields.io/static/v1?label=Linkedin&message=Diego%20Gonçalves&color=208BEE&style=flat-square&logo=linkedin&link=https://www.linkedin.com/in/diego-goncalves1990)](https://www.linkedin.com/in/diego-goncalves1990)
[![Badge](https://img.shields.io/static/v1?label=Gmail&message=die.goncalves1990@gmail.com&color=EA5134&style=flat-square&logo=gmail&link=mailto:die.goncalves1990@gmail.com)](mailto:die.goncalves1990@gmail.com)

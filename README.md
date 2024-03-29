# App

Este projeto tinha como objetivo criar um servidor para um cardápio virtual, nele utilizei Node.js, Prisma com PostgresSql e o framework Fastify para lidar com as chamadas HTTP, além da utilização de patterns como InMemory Database, factories, use-cases.
No projeto, implementei um sistema de snack bar digital, onde as lanchonetes e seus produtos eram criados e exibidos, além da parte de compras desses produtos. Na parte do usuário, implementei recursos de registros no servidor, permitindo que os clientes fizessem login e comprassem os produtos disponíveis.
Ainda criei um fluxo de aprovação onde um administrador validava os produtos e atualizações no cardápio virtual, garantindo a precisão das informações.

## RFs (Requisitos Funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível colocar dinheiro na conta de um usuário;
- [x] Deve ser possível um usuário cadastrar uma lanchonete;
- [x] Deve ser possível criar um produto em uma lanchonete (apenas pelo dono);
- [x] Deve ser possível procurar uma lanchone/produto pelo nome;
- [x] Deve ser possível realizar a compra de um produto;
- [x] Deve ser possível consultar todos produtos de uma lanchonete;
- [x] Deve ser possível obter o histórico de compra do usuário;

## RNs (Regras de negócios)

- [x] O usuário não pode se cadastrar com e-mail duplicado;
- [x] Toda loja deve ter um menu com todos os seus produtos cadastrado;
- [x] O usuário só pode concluir uma compra se tiver saldo suficiente;
- [x] O usuário só pode criar uma loja se tiver mais do que 18 anos;
- [x] Uma lanchonete só pode estar disponível para cadastro de produtos se for validada por um administrador;
- [x] Só pode ocorrer a compra de produtos de uma mesma loja;

## RNFs (Requisitos não funcionais)

- [x] A senha do usuário deve ser criptografada
- [x] Os dados precisam estar persistindo em um banco PostgreSQL;
- [x] Todas lista de dados precisam estar paginada com 20 itens por páginas;
- [x] O usuário deve ser identificado por JWT (JSON Web Token);



## ToDo

- Configuração JWT ✔
- Configuração Token e RefreshToken ✔
- Authentica como user, o back devolve os snackbar criado pelo usuario por uma rota ✔
- Factories SnackBar, products e buy ✔
- Prisma SnackBar, products e buy ✔
- Rotas que requerem o JWT ✔
- Rotas SnackBar, products e buy ✔
- Apenas o dono pode criar novos produtos de uma snack bar ✔
- aprimorar refresh token (criar tabela com id, userid, refreshtoken, expiratesin, created_at) ✔
- Testes E2E ✔
- CI 
- Deploy

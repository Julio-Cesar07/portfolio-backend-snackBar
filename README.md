# App

Snack bar style app where you can see the products.

## RFs (Requisitos Funcionais)

- [x] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível colocar dinheiro na conta de um usuário;
- [x] Deve ser possível um usuário cadastrar uma lanchonete;
- [ ] Deve ser possível criar um produto em uma lanchonete;
- [ ] Deve ser possível realizar a compra de um produto;

## RNs (Regras de negócios)

- [x] O usuário não pode se cadastrar com e-mail duplicado;
- [ ] Toda loja deve ter um menu com todos os seus produtos cadastrado;
- [ ] O usuário só pode concluir uma compra se tiver saldo suficiente;
- [ ] O usuário só pode criar uma loja se tiver mais do que 18 anos;
- [x] Uma lanchonete só pode estar disponível para cadastro de produtos se for validada por um administrador;

## RNFs (Requisitos não funcionais)

- [x] A senha do usuário deve ser criptografada
- [x] Os dados precisam estar persistindo em um banco PostgreSQL;
- [ ] Todas lista de dados precisam estar paginada com 20 itens por páginas;
- [ ] O usuário deve ser identificado por JWT (JSON Web Token);

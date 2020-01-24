# Simple Shop

Este é um projeto que foi desenvolvido utilizando as boas práticas em desenvolvimento com NodeJS. Além de possuir integrações importantes como por exemplo, o Sentry. Disparo de e-mail através de filas com o banco de dados Redis. Armazenamento de dados no MongoDb.

Principais características alcançadas no projeto:
- Autenticação com JWT
- Utilização do banco de dados MongoDB
- Utilização do banco de dados Redis para lidar com filas de disparo de e-mail
- Utilização da plataforma Sentry para coleta de erros em produção

## Installation

Para realizar a  instalação do projeto, será necessário a utilização de um banco de dados MongoDB e um banco Redis, além da criação de uma conta no Sentry para obter as credenciais de integração e por fim credenciais para disparo de e-mail. Neste projeto, foi utilizado o MailTrap (gratuito) como serviço de disparo de e-mail. Após terem em mãos os dados de acesso a esses bancos, basta configurar as variáveis de ambiente no arquivo .env. 

```bash
yarn install
yarn start
```

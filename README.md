# PROJETO FULLSTACK DESENVOLVIDO COM NEXT.JS

## Solução para o [Desafio](https://github.com/FranciscoWallison/desafio-back-end) passado pelo professor de Backend do 3º semestre de ADS

### O objetivo é construir uma API RESTful e uma interface visual que permitam as operações completas de CRUD (criar, ler, atualizar e deletar) utlizando o FrameWork NEXT.js.

### TECNOLOGIAS UTILIZADAS

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white) ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## [Acessar projeto](https://desafio-backend-nextjs.vercel.app/)

# **Rode na sua máquina:**

**1. Clone esse repositório**

    git clone https://github.com/pomptrash/desafio-backend-nextjs

**2. Abra o diretório do arquivo**

    cd desafio-backend-nextjs

**3. Instale as dependências**

    npm install

**4. Configure o ambiente**

- Crie o banco de dados MySQL localmente com o [SCRIPT](/sql/desafioBackendNextJS%20-%20CLIENT%20TABLE%20SQL%20SCRIPT.sql)
- Monte a URL de conexão do Prisma (ORM utilizado no projeto) no arquivo .env utilizando suas credenciais do MySQL ( Username, Password, Host e Port):

  ```
  DATABASE_URL="mysql://USERNAME:PASSWORD@HOST:PORT/desafioBackendNextJS"
  ```

- Crie a instância do cliente Prisma

  ```
  npx prisma generate
  ```

  ### OU, Caso prefira, ao invés de criar o Banco de dados manualmente, você pode utilizar `npx prisma migrate dev` para que o prisma crie as tabelas automaticamente de acordo com o [schema.prisma](./prisma/schema.prisma)

- Defina a variável de ambiente no arquivo .env para a URL da API local
  ```
  NEXT_PUBLIC_API_URL="http://localhost:3000"
  ```
- Rode o projeto

  ```
      npm run dev
  ```

## SCREENSHOTS

![Rota clientes](./screenshots/rota-clientes.png)

![Form novo cliente](./screenshots//form-novo-cliente.png)

![ordens de serviço](./screenshots/rota-ordens-de-servico.png)

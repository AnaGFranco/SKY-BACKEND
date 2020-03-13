# SKY-BACKEND

**Objetivo deste projeto**  
Criar um aplicativo backend que irá expor uma API RESTful de criação de sing up/sign in.

**Bibliotecas utilizadas:**

- bcrytjs
- jsonwebtoken
- express
- mongoose
- dotenv-safe
- cors
- body-parse


**Tecnologia**
- Node JS
- MongoDB

Para rodar os endpoits utilizamos o Postman

**Para a instalação:**

1º `Fork` esse repositório para seu github:

```
https://github.com/AnaGFranco/SKY-BACKEND/fork
```

2º Execute o comando em um terminal para clonar o repositorio

```
git clone https://github.com/AnaGFranco/SKY-BACKEND
```

Agora acesse o novo diretório criado e excute a instalação das dependencias com o comando:
  
`   npm install      `  

Para iniciar a aplicação execute

`   npm start node server.js     `  
  

**Endpoints**  

  
POST   usuarios/ => SIGN_UP

POST   usuarios/login => SIGN_IN

GET    usuarios/:id => LISTAR USUARIO POR ID

GET    usuarios/ => LISTA USUARIO
  
PATCH  usuarios/:id => ATUALIZAR USUARIO POR ID
  
DELETE usuarios/:id => DELETAR USUARIO POR ID

Heroku: https://backend-sky.herokuapp.com/ ou localhost:5000



  


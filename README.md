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

**Para a execução do codigo:**

Será necessario clonar este repositório:  
  
 **1º** Acessar o git bash;  
  
 **2º** Digite o comando:  
   
` git clone https://github.com/AnaGFranco/SKY-BACKEND `

Após clonar, acesse o novo diretório criado e excute a instalação das dependencias com o comando:
  
`   npm install      `  
`   npm start      `  
`   nodemon app.js      `  

**Endpoints**  

  
POST   usuarios/ => CRIAR USUARIO/SIGN_UP

POST   usuarios/login => REALIZAR LOGIN/SIGN_IN

GET    usuarios/:id => LISTAR USUARIO POR ID

GET    usuarios/ => LISTA USUARIO
  
PATCH  usuarios/:id => ATUALIZAR USUARIO POR ID
  
DELETE usuarios/:id => DELETAR USUARIO POR ID
  


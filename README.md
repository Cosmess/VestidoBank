## VestidoBank

### Tecnologias Utilizadas


- Node.js
- Fastify
- TypeScript
- Sequelize
- MySQL

### Instalação e inicio do serviço

```
npm install
```

```
npm start
```
### .ENV

```
DB_DATABASE=vestidobank
DB_DIALECT=mysql
DB_USERNAME=root
DB_PASSWORD=
DB_HOST=localhost
```


### Rotas:
1. Criar Usuário
Endpoint: POST /users

```
curl -X POST http://localhost:3000/users \
-H "Content-Type: application/json" \
-d '{
  "fullName": "Joao Silva",
  "cpf": "4758102588",
  "email": "joao.silva@example.com",
  "password": "senha123",
  "type": "user"
}'
```


2. Obter Usuário
Endpoint: GET /users/:id

```
curl -X GET http://localhost:3000/users/<userId>

```


3. Transferir Dinheiro
Endpoint: POST /transfer

```
curl -X POST http://localhost:3000/transfer \
-H "Content-Type: application/json" \
-d '{
  "senderCPF": "12345678901",
  "receiverCPF": "98765432109",
  "amount": 100
}'

```


4. Listar Transações
Endpoint: GET /transactions

```
curl -X GET http://localhost:3000/transactions

```


5. Obter Transação por ID
Endpoint: GET /transactions/:id

```
curl -X GET http://localhost:3000/transactions/<transactionId>

```

6. Manutenção de Transação
Endpoint: POST /transactions/maintenance

Aprovar:

```
curl -X POST http://localhost:3000/transactions/maintenance \
-H "Content-Type: application/json" \
-d '{
  "transactionId": "1",
  "status": "approved"
}'

```

rejeitar:

```
curl -X POST http://localhost:3000/transactions/maintenance \
-H "Content-Type: application/json" \
-d '{
  "transactionId": "1",
  "status": "rejected"
}'


```

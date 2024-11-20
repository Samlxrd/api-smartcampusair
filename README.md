# SmartCampusAir - Backend
Este é o backend do projeto de sistema responsável pelo gerenciamento de ar-condicionado em salas de aula, desenvolvido como TCC em Ciência da Computação na Universidade Estadual de Santa Cruz, 2024.2.
O sistema permite monitorar salas e controlar manualmente o desligamento dos aparelhos de ar-condicionado.

## 🚀 Funcionalidades
- Monitoramento em tempo real do status de salas (temperatura, presença).
- Controle manual do desligamento de aparelhos.
- Logs de ações realizadas no sistema (comandos para desligar o ar-condicionado).

## 📋 Pré-requisitos
Certifique-se de ter as seguintes ferramentas instaladas:

- Node.js (Foi utilizado Node v20.15.0)
- npm ou yarn

## 🛠️ Tecnologias Utilizadas
- Framework: Fastify
- ORM: Prisma
- Validação: Zod
- Banco de Dados: PostgreSQL

## 📂 Estrutura do Projeto
<pre>
src/  
├── database/             # Instância do banco de dados  
├── errors/               # Tratamento e personalização de erros  
├── pavilhao/             # Módulo de gerenciamento de pavilhão
├── sala/                 # Módulo de gerenciamento de salas  
├── usuario/              # Módulo de autenticação e usuários  
├── utils/                # Funções utilitárias (ex.: hashing, validação)  
└── server.ts             # Arquivo principal do servidor 
</pre>
## ⚙️ Configuração

1. Clone o repositório:
```
git clone https://github.com/Samlxrd/api-smartcampusair
```
```
cd api-smartcampusair
```

2. Instale as dependências:
```
npm install 
```
ou
```
yarn install 
```

3. Configure as variáveis de ambiente:
Crie um arquivo .env na raiz do projeto de acordo com o exemplo abaixo:
```
DATABASE_URL=<URL do Banco de Dados>
```

4. Migrações:
```
npx prisma migrate dev
```

5. Inicie o servidor:
```
npm run dev
```
PS: Lembre-se de verificar a porta que o servidor irá rodar, para evitar conflito com aplicações existentes em sua máquina.

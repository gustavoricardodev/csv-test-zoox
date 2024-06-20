# CVS-TEST-ZOOX <img href="#" src="https://img.shields.io/badge/Vue.js-000000?style=for-the-badge&logo=vue.js&logoColor=4FC08D" />

Este projeto permite aos usuários importar arquivos CSV, visualizar e selecionar linhas e colunas específicas, e exportar esses dados filtrados. Foi desenvolvido como parte de um desafio técnico de Frontend, utilizando Vue 3 com TypeScript, Vue Router e a Composition API.

## 🚀 Tencnologias utilizadas

- **Vite**: Ferramenta de construção rápida para projetos web.
- **Vue 3**: Framework JavaScript progressivo para a construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Vue Router**: Biblioteca oficial de roteamento para Vue.js.
- **Papaparse**: Utilizada para parsing e manipulação de arquivos CSV.
- **UUID**: Utilizada para gerar identificadores únicos universais (UUIDs) simulando backend.
- **Moment.js**: Utilizada para manipulação e formatação de datas de forma eficiente.

## 🚨 Requisitos Mínimos

Para rodar este projeto, você precisará ter os seguintes softwares instalados em seu ambiente:

- Node.js (versão 16 ou superior)
- npm (versão 7 ou superior) ou yarn (versão 1.22 ou superior)

## Instalação

Siga os passos abaixo para configurar e rodar o projeto localmente:

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/gustavoricardodev/csv-test-zoox.git
   cd csv-test-zoox
   ```

2. **Instale as dependências:**

    Usando npm:


    ```
      npm install
    ```

    Ou usando yarn:


    ```
      yarn install
    ```
3. **Inicie o servidor de desenvolvimento:**

    
    ```
      npm run dev
    ```

    Ou usando yarn:


    ```
      yarn dev
    ```

4. **Abra o navegador:**

    Normalmente, o Vite iniciará o projeto no endereço http://localhost:3000. Abra seu navegador e navegue para esse endereço.

## 📁 Estrutura do Projeto
```
├── public
│   └── index.html
├── src
│   ├── assets
│   ├── filesToTest
│   ├── assets
│   ├── components
│   ├── router
│   ├── types
│   ├── store
│   ├── views
│   ├── App.vue
│   ├── main.ts
├── .gitignore
├── index.html
├── env.d.ts
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

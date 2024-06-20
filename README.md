#  <div style="display: flex; align-items: center; gap: 16px;">[![My Skills](https://skillicons.dev/icons?i=vue&perline=3)](https://skillicons.dev)CVS-TEST-ZOOX </div>

Este projeto permite aos usuários importar arquivos CSV, visualizar e selecionar linhas e colunas específicas, e exportar esses dados filtrados. Foi desenvolvido como parte de um desafio técnico de Frontend, utilizando Vue 3 com TypeScript, Vue Router e a Composition API.



## <div style="display: flex; align-items: center; gap: 16px;"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rocket"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>Tencnologias utilizadas</div>


- **Vite**: Ferramenta de construção rápida para projetos web.
- **Vue 3**: Framework JavaScript progressivo para a construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Vue Router**: Biblioteca oficial de roteamento para Vue.js.
- **Papaparse**: Utilizada para parsing e manipulação de arquivos CSV.
- **UUID**: Utilizada para gerar identificadores únicos universais (UUIDs) simulando backend.
- **Moment.js**: Utilizada para manipulação e formatação de datas de forma eficiente.

## <div style="display: flex; align-items: center; gap: 16px;"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-workflow"><rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/></svg>Requisitos Mínimos</div>

Para rodar este projeto, você precisará ter os seguintes softwares instalados em seu ambiente:

- Node.js (versão 16 ou superior)
- npm (versão 7 ou superior) ou yarn (versão 1.22 ou superior)

## <div style="display: flex; align-items: center; gap: 16px;"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>Instalação</div>

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

## <div style="display: flex; align-items: center; gap: 16px;"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-folder"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>Estrutura do Projeto</div>
```
├── public
│   └── index.html
├── src
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
# Sistema de Gestão Nutricional

Este projeto é parte do Trabalho de Conclusão de Curso (TCC) e consiste em um sistema web para nutricionistas acompanharem seus pacientes. Os nutricionistas podem criar dietas, acompanhar a evolução dos pacientes e gerenciar informações relevantes. Por outro lado, os pacientes têm acesso às suas dietas, histórico de evolução e outras informações importantes.

![Pagina Inicial](./inicio.png)

## API

A API foi desenvolvida com as seguintes dependências:

- **Express**: Framework web para Node.js que facilita a criação de APIs.
- **JWT (JSON Web Token)**: Para autenticação e segurança.
- **Multer**: Para upload de arquivos, como imagens de perfil.
- **MySQL**: Banco de dados para armazenamento de informações.
- **Swagger**: Para documentação da API.
- **Winston**: Para logging.
- **Multer**: formulários multipart/form-data
- **Nodemon**: monitora alterações nos arquivos
  

### Instalação

Para instalar as dependências da API, execute o comando:

```bash
npm install
```

### Execução

Para iniciar a API, utilize o comando:

```bash
npm start
```

A API estará disponível em `http://localhost:8800`.

## Frontend

O frontend foi desenvolvido com as seguintes dependências:

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **React Router Dom**: Para navegação entre páginas.
- **Styled Components**: Para estilização de componentes.
- **Axios**: Para fazer requisições HTTP para a API.
- **React Icons**: Para ícones.
- **React Modal**: Para modais.
- **React Toastify**: Para notificações.
- **@testing-library**: Para testes unitários.
- **@react-pdf/renderer**: Para geração de PDFs.
- **date-fns**: Para manipulação de datas.
- **react-hook-form**: Para gerenciamento de formulários.
- **react-datepicker**: Para seleção de datas.

### Instalação

Para instalar as dependências do frontend, execute o comando:

```bash
npm install
```

### Execução

Para iniciar o frontend, utilize o comando:

```bash
npm start
```

O frontend estará disponível em `http://localhost:3000`.

## Desenvolvimento

O projeto foi desenvolvido como parte do Trabalho de Conclusão de Curso (TCC) e visa facilitar o acompanhamento nutricional de pacientes pelos nutricionistas, oferecendo uma interface intuitiva e eficiente.

## Estrutura do Projeto

### Backend

O backend foi organizado da seguinte maneira:

- `index.js`: Arquivo principal que inicia a API.
- `db.js`: Arquivo principal que configura o banco.
- `routes/`: Diretório que contém as definições de rotas.
- `services/`: Diretório que contém as definições de logicas.
- `controllers/`: Diretório que contém a lógica de controle das rotas.
- `models/`: Diretório que contém os modelos de dados.
- `schemas/`: Diretório que contém os modelos de payloads.

### Frontend

O frontend foi organizado da seguinte maneira:

  - `src/`: Diretório principal do código fonte.
  - `components/`: Componentes reutilizáveis.
  - `pages/`: Páginas da aplicação.
  - `services/`: Serviços para comunicação com a API.
  - `styles/`: Estilos globais e temas.
  - `utils/`: Utilitários e funções auxiliares.

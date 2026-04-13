# AgroTrace — Sprint 2 (Épico 4)

Módulo de **fazendas** e **talhões** com API REST em Node.js/Express e persistência em PostgreSQL. As rotas são protegidas por JWT (middleware da Sprint 1).

**Responsáveis:** Igor e Conrado

## Pré-requisitos

- Node.js (projeto base da Sprint 1 com Express)
- PostgreSQL
- Tabela `usuarios` já existente (a migration referencia `usuarios(id)`)

## Estrutura do repositório

```
src/
  app.js                 # Trecho para registrar rotas (integrar ao app principal)
  config/database.js     # Pool do pg (fornecido pelo projeto Sprint 1)
  middleware/autenticar.js
  controllers/
    fazendaController.js
    talhaoController.js
  models/
    fazendaModel.js
    talhaoModel.js
  routes/
    fazendaRoutes.js
    talhaoRoutes.js
  migrations/
    001_create_fazendas_talhoes.sql
```

> Este repositório contém o código da Sprint 2. Arquivos como `config/database.js` e `middleware/autenticar.js` devem existir no **projeto unificado** (Sprint 1 + Sprint 2).

## Banco de dados

Execute a migration no banco já usado pelo AgroTrace:

```bash
psql -U seu_usuario -d seu_banco -f src/migrations/001_create_fazendas_talhoes.sql
```

Ou copie o conteúdo de `src/migrations/001_create_fazendas_talhoes.sql` e execute no cliente SQL.

**Tabelas:** `fazendas` (ligada a `usuarios`) e `talhoes` (ligada a `fazendas`, com `coordenadas` em JSONB para GeoJSON do mapa).

## Integração no `app.js`

No aplicativo Express principal, importe e registre as rotas:

```js
const fazendaRoutes = require('./routes/fazendaRoutes');
app.use('/api/fazendas', fazendaRoutes);
```

O arquivo `src/app.js` deste repositório documenta o mesmo trecho e lista os endpoints.

## API (com token JWT no header `Authorization`)

### Fazendas

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/fazendas` | Criar fazenda |
| `GET` | `/api/fazendas` | Listar fazendas do usuário autenticado |
| `GET` | `/api/fazendas/:id` | Buscar por ID |
| `PUT` | `/api/fazendas/:id` | Atualizar |
| `DELETE` | `/api/fazendas/:id` | Remover |

### Talhões (aninhados à fazenda)

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/fazendas/:fazenda_id/talhoes` | Criar talhão |
| `GET` | `/api/fazendas/:fazenda_id/talhoes` | Listar talhões da fazenda |
| `GET` | `/api/fazendas/:fazenda_id/talhoes/:id` | Buscar talhão |
| `PUT` | `/api/fazendas/:fazenda_id/talhoes/:id` | Atualizar |
| `DELETE` | `/api/fazendas/:fazenda_id/talhoes/:id` | Remover |

## Repositório remoto

- GitHub: [Sprint-Agrotrace](https://github.com/conradont/Sprint-Agrotrace.git)

## Licença

Defina conforme o projeto AgroTrace principal.

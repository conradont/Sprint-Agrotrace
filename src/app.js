// src/app.js — Trecho para registrar as novas rotas
// Adicionar ao app.js existente da Sprint 1

const fazendaRoutes = require('./routes/fazendaRoutes');

// Registrar rotas de fazendas (talhões já estão aninhados dentro)
app.use('/api/fazendas', fazendaRoutes);

// Exemplo de uso completo das rotas:
//
// Fazendas:
//   POST   /api/fazendas
//   GET    /api/fazendas
//   GET    /api/fazendas/:id
//   PUT    /api/fazendas/:id
//   DELETE /api/fazendas/:id
//
// Talhões:
//   POST   /api/fazendas/:fazenda_id/talhoes
//   GET    /api/fazendas/:fazenda_id/talhoes
//   GET    /api/fazendas/:fazenda_id/talhoes/:id
//   PUT    /api/fazendas/:fazenda_id/talhoes/:id
//   DELETE /api/fazendas/:fazenda_id/talhoes/:id

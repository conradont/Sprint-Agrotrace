// src/routes/fazendaRoutes.js
// AgroTrace - Sprint 2 - Épico 4
// Responsáveis: Igor e Conrado

const express = require('express');
const router = express.Router();
const FazendaController = require('../controllers/fazendaController');
const talhaoRoutes = require('./talhaoRoutes');
const autenticar = require('../middleware/autenticar'); // middleware JWT da Sprint 1

// Todas as rotas exigem autenticação
router.use(autenticar);

// CRUD Fazendas
router.post('/',     FazendaController.criar);
router.get('/',      FazendaController.listar);
router.get('/:id',   FazendaController.buscar);
router.put('/:id',   FazendaController.atualizar);
router.delete('/:id', FazendaController.deletar);

// Rotas de talhões aninhadas sob fazenda
router.use('/:fazenda_id/talhoes', talhaoRoutes);

module.exports = router;

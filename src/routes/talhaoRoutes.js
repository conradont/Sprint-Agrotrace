// src/routes/talhaoRoutes.js
// AgroTrace - Sprint 2 - Épico 4
// Responsáveis: Igor e Conrado

const express = require('express');
// mergeParams: true permite acessar :fazenda_id da rota pai
const router = express.Router({ mergeParams: true });
const TalhaoController = require('../controllers/talhaoController');

// CRUD Talhões (autenticação já aplicada no fazendaRoutes)
router.post('/',      TalhaoController.criar);
router.get('/',       TalhaoController.listar);
router.get('/:id',    TalhaoController.buscar);
router.put('/:id',    TalhaoController.atualizar);
router.delete('/:id', TalhaoController.deletar);

module.exports = router;

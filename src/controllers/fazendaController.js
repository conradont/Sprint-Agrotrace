// src/controllers/fazendaController.js
// AgroTrace - Sprint 2 - Épico 4
// Responsáveis: Igor e Conrado

const FazendaModel = require('../models/fazendaModel');

const FazendaController = {
  async criar(req, res) {
    try {
      const { nome, estado, municipio, area_total_ha } = req.body;
      const usuario_id = req.usuario.id; // injetado pelo middleware JWT

      if (!nome || !estado || !municipio) {
        return res.status(400).json({ erro: 'Nome, estado e município são obrigatórios.' });
      }

      if (estado.length !== 2) {
        return res.status(400).json({ erro: 'Estado deve ser a sigla com 2 letras (ex: PI, SP).' });
      }

      const fazenda = await FazendaModel.criar({ nome, estado: estado.toUpperCase(), municipio, area_total_ha, usuario_id });
      return res.status(201).json(fazenda);
    } catch (err) {
      console.error('[FazendaController.criar]', err);
      return res.status(500).json({ erro: 'Erro ao criar fazenda.', detalhe: err.message });
    }
  },

  async listar(req, res) {
    try {
      const usuario_id = req.usuario.id;
      const fazendas = await FazendaModel.listarPorUsuario(usuario_id);
      return res.json(fazendas);
    } catch (err) {
      console.error('[FazendaController.listar]', err);
      return res.status(500).json({ erro: 'Erro ao listar fazendas.', detalhe: err.message });
    }
  },

  async buscar(req, res) {
    try {
      const { id } = req.params;
      const usuario_id = req.usuario.id;

      const fazenda = await FazendaModel.buscarPorId(id, usuario_id);
      if (!fazenda) return res.status(404).json({ erro: 'Fazenda não encontrada.' });

      return res.json(fazenda);
    } catch (err) {
      console.error('[FazendaController.buscar]', err);
      return res.status(500).json({ erro: 'Erro ao buscar fazenda.', detalhe: err.message });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const usuario_id = req.usuario.id;

      const fazenda = await FazendaModel.atualizar(id, usuario_id, req.body);
      if (!fazenda) return res.status(404).json({ erro: 'Fazenda não encontrada.' });

      return res.json(fazenda);
    } catch (err) {
      console.error('[FazendaController.atualizar]', err);
      return res.status(500).json({ erro: 'Erro ao atualizar fazenda.', detalhe: err.message });
    }
  },

  async deletar(req, res) {
    try {
      const { id } = req.params;
      const usuario_id = req.usuario.id;

      const resultado = await FazendaModel.deletar(id, usuario_id);
      if (!resultado) return res.status(404).json({ erro: 'Fazenda não encontrada.' });

      return res.json({ mensagem: 'Fazenda deletada com sucesso.' });
    } catch (err) {
      console.error('[FazendaController.deletar]', err);
      return res.status(500).json({ erro: 'Erro ao deletar fazenda.', detalhe: err.message });
    }
  }
};

module.exports = FazendaController;

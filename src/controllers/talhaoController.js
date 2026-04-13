// src/controllers/talhaoController.js
// AgroTrace - Sprint 2 - Épico 4
// Responsáveis: Igor e Conrado

const TalhaoModel = require('../models/talhaoModel');
const FazendaModel = require('../models/fazendaModel');

// Helper: garante que a fazenda existe e pertence ao usuário logado
async function verificarFazenda(fazenda_id, usuario_id, res) {
  const fazenda = await FazendaModel.buscarPorId(fazenda_id, usuario_id);
  if (!fazenda) {
    res.status(404).json({ erro: 'Fazenda não encontrada ou acesso não permitido.' });
    return false;
  }
  return true;
}

const TalhaoController = {
  async criar(req, res) {
    try {
      const { fazenda_id } = req.params;
      const { nome, area_ha, cultura, coordenadas } = req.body;
      const usuario_id = req.usuario.id;

      if (!nome || !coordenadas) {
        return res.status(400).json({ erro: 'Nome e coordenadas são obrigatórios.' });
      }

      if (!coordenadas.type || !coordenadas.coordinates) {
        return res.status(400).json({ erro: 'Coordenadas devem estar no formato GeoJSON.' });
      }

      const ok = await verificarFazenda(fazenda_id, usuario_id, res);
      if (!ok) return;

      const talhao = await TalhaoModel.criar({ nome, area_ha, cultura, coordenadas, fazenda_id });
      return res.status(201).json(talhao);
    } catch (err) {
      console.error('[TalhaoController.criar]', err);
      return res.status(500).json({ erro: 'Erro ao criar talhão.', detalhe: err.message });
    }
  },

  async listar(req, res) {
    try {
      const { fazenda_id } = req.params;
      const usuario_id = req.usuario.id;

      const ok = await verificarFazenda(fazenda_id, usuario_id, res);
      if (!ok) return;

      const talhoes = await TalhaoModel.listarPorFazenda(fazenda_id);
      return res.json(talhoes);
    } catch (err) {
      console.error('[TalhaoController.listar]', err);
      return res.status(500).json({ erro: 'Erro ao listar talhões.', detalhe: err.message });
    }
  },

  async buscar(req, res) {
    try {
      const { fazenda_id, id } = req.params;
      const usuario_id = req.usuario.id;

      const ok = await verificarFazenda(fazenda_id, usuario_id, res);
      if (!ok) return;

      const talhao = await TalhaoModel.buscarPorId(id, fazenda_id);
      if (!talhao) return res.status(404).json({ erro: 'Talhão não encontrado.' });

      return res.json(talhao);
    } catch (err) {
      console.error('[TalhaoController.buscar]', err);
      return res.status(500).json({ erro: 'Erro ao buscar talhão.', detalhe: err.message });
    }
  },

  async atualizar(req, res) {
    try {
      const { fazenda_id, id } = req.params;
      const usuario_id = req.usuario.id;

      const ok = await verificarFazenda(fazenda_id, usuario_id, res);
      if (!ok) return;

      const talhao = await TalhaoModel.atualizar(id, fazenda_id, req.body);
      if (!talhao) return res.status(404).json({ erro: 'Talhão não encontrado.' });

      return res.json(talhao);
    } catch (err) {
      console.error('[TalhaoController.atualizar]', err);
      return res.status(500).json({ erro: 'Erro ao atualizar talhão.', detalhe: err.message });
    }
  },

  async deletar(req, res) {
    try {
      const { fazenda_id, id } = req.params;
      const usuario_id = req.usuario.id;

      const ok = await verificarFazenda(fazenda_id, usuario_id, res);
      if (!ok) return;

      const resultado = await TalhaoModel.deletar(id, fazenda_id);
      if (!resultado) return res.status(404).json({ erro: 'Talhão não encontrado.' });

      return res.json({ mensagem: 'Talhão deletado com sucesso.' });
    } catch (err) {
      console.error('[TalhaoController.deletar]', err);
      return res.status(500).json({ erro: 'Erro ao deletar talhão.', detalhe: err.message });
    }
  }
};

module.exports = TalhaoController;

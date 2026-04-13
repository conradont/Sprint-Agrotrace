// src/models/fazendaModel.js
// AgroTrace - Sprint 2 - Épico 4
// Responsáveis: Igor e Conrado

const db = require('../config/database');

const FazendaModel = {
  async criar({ nome, estado, municipio, area_total_ha, usuario_id }) {
    const result = await db.query(
      `INSERT INTO fazendas (nome, estado, municipio, area_total_ha, usuario_id)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [nome, estado, municipio, area_total_ha, usuario_id]
    );
    return result.rows[0];
  },

  async listarPorUsuario(usuario_id) {
    const result = await db.query(
      `SELECT * FROM fazendas WHERE usuario_id = $1 ORDER BY criado_em DESC`,
      [usuario_id]
    );
    return result.rows;
  },

  async buscarPorId(id, usuario_id) {
    const result = await db.query(
      `SELECT * FROM fazendas WHERE id = $1 AND usuario_id = $2`,
      [id, usuario_id]
    );
    return result.rows[0];
  },

  async atualizar(id, usuario_id, { nome, estado, municipio, area_total_ha }) {
    const result = await db.query(
      `UPDATE fazendas
         SET nome=$1, estado=$2, municipio=$3, area_total_ha=$4, atualizado_em=NOW()
       WHERE id=$5 AND usuario_id=$6
       RETURNING *`,
      [nome, estado, municipio, area_total_ha, id, usuario_id]
    );
    return result.rows[0];
  },

  async deletar(id, usuario_id) {
    const result = await db.query(
      `DELETE FROM fazendas WHERE id=$1 AND usuario_id=$2 RETURNING id`,
      [id, usuario_id]
    );
    return result.rows[0];
  }
};

module.exports = FazendaModel;

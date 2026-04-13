// src/models/talhaoModel.js
// AgroTrace - Sprint 2 - Épico 4
// Responsáveis: Igor e Conrado

const db = require('../config/database');

const TalhaoModel = {
  async criar({ nome, area_ha, cultura, coordenadas, fazenda_id }) {
    const result = await db.query(
      `INSERT INTO talhoes (nome, area_ha, cultura, coordenadas, fazenda_id)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [nome, area_ha, cultura, JSON.stringify(coordenadas), fazenda_id]
    );
    return result.rows[0];
  },

  async listarPorFazenda(fazenda_id) {
    const result = await db.query(
      `SELECT * FROM talhoes WHERE fazenda_id = $1 ORDER BY criado_em DESC`,
      [fazenda_id]
    );
    return result.rows;
  },

  async buscarPorId(id, fazenda_id) {
    const result = await db.query(
      `SELECT * FROM talhoes WHERE id = $1 AND fazenda_id = $2`,
      [id, fazenda_id]
    );
    return result.rows[0];
  },

  async atualizar(id, fazenda_id, { nome, area_ha, cultura, coordenadas }) {
    const result = await db.query(
      `UPDATE talhoes
         SET nome=$1, area_ha=$2, cultura=$3, coordenadas=$4, atualizado_em=NOW()
       WHERE id=$5 AND fazenda_id=$6
       RETURNING *`,
      [nome, area_ha, cultura, JSON.stringify(coordenadas), id, fazenda_id]
    );
    return result.rows[0];
  },

  async deletar(id, fazenda_id) {
    const result = await db.query(
      `DELETE FROM talhoes WHERE id=$1 AND fazenda_id=$2 RETURNING id`,
      [id, fazenda_id]
    );
    return result.rows[0];
  }
};

module.exports = TalhaoModel;

-- Migration: Criação das tabelas fazendas e talhoes
-- Sprint 2 - Épico 4 - AgroTrace
-- Responsáveis: Igor e Conrado

-- Tabela de Fazendas
CREATE TABLE fazendas (
  id           SERIAL PRIMARY KEY,
  nome         VARCHAR(255) NOT NULL,
  estado       CHAR(2)      NOT NULL,
  municipio    VARCHAR(255) NOT NULL,
  area_total_ha NUMERIC(10, 2),
  usuario_id   INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  criado_em    TIMESTAMP DEFAULT NOW(),
  atualizado_em TIMESTAMP DEFAULT NOW()
);

-- Índice para buscas por usuário
CREATE INDEX idx_fazendas_usuario ON fazendas(usuario_id);

-- Tabela de Talhões
CREATE TABLE talhoes (
  id          SERIAL PRIMARY KEY,
  nome        VARCHAR(255) NOT NULL,
  area_ha     NUMERIC(10, 2),
  cultura     VARCHAR(255),
  coordenadas JSONB NOT NULL,  -- Polígono GeoJSON gerado pelo mapa interativo
  fazenda_id  INTEGER NOT NULL REFERENCES fazendas(id) ON DELETE CASCADE,
  criado_em   TIMESTAMP DEFAULT NOW(),
  atualizado_em TIMESTAMP DEFAULT NOW()
);

-- Índice para buscas por fazenda
CREATE INDEX idx_talhoes_fazenda ON talhoes(fazenda_id);

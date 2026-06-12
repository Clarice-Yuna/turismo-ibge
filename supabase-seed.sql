-- ============================================
-- Turismo IBGE 2016 - Supabase SQL Seed
-- ============================================
-- Cole este script inteiro no SQL Editor do Supabase
-- (SQL Editor → New Query → cole → Run)
--
-- ⚠️ SUBSTITUA a senha hash abaixo pela sua!
-- Para gerar o hash da sua senha, use o site:
-- https://emn178.github.io/online-tools/sha256.html
-- Depois substitua o valor na tabela User
-- ============================================

-- Drop tables (ordem reversa de dependência)
DROP TABLE IF EXISTS "QuizAttempt" CASCADE;
DROP TABLE IF EXISTS "QuizQuestion" CASCADE;
DROP TABLE IF EXISTS "QuizCategory" CASCADE;
DROP TABLE IF EXISTS "Curiosity" CASCADE;
DROP TABLE IF EXISTS "EstabPorLocalizacao" CASCADE;
DROP TABLE IF EXISTS "EstabPorCaracteristica" CASCADE;
DROP TABLE IF EXISTS "EstabPorCategoria" CASCADE;
DROP TABLE IF EXISTS "Capitais" CASCADE;
DROP TABLE IF EXISTS "UHLeitosUF" CASCADE;
DROP TABLE IF EXISTS "EstabPorGrupoUH" CASCADE;
DROP TABLE IF EXISTS "EstabPorTipo" CASCADE;
DROP TABLE IF EXISTS "User" CASCADE;

-- ============================================
-- CREATE TABLES
-- ============================================

CREATE TABLE "User" (
  "id" TEXT PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE,
  "name" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "avatar" TEXT,
  "role" TEXT NOT NULL DEFAULT 'user',
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "EstabPorTipo" (
  "id" TEXT PRIMARY KEY,
  "uf" TEXT NOT NULL,
  "total" INTEGER NOT NULL,
  "hoteis" INTEGER NOT NULL,
  "apartHoteis" INTEGER NOT NULL,
  "pousadas" INTEGER NOT NULL,
  "moteis" INTEGER NOT NULL,
  "pensoes" INTEGER NOT NULL,
  "hostels" INTEGER NOT NULL,
  "outros" INTEGER NOT NULL
);

CREATE TABLE "EstabPorGrupoUH" (
  "id" TEXT PRIMARY KEY,
  "uf" TEXT NOT NULL,
  "total" INTEGER NOT NULL,
  "ate4" INTEGER NOT NULL,
  "de5a9" INTEGER NOT NULL,
  "de10a19" INTEGER NOT NULL,
  "de20a29" INTEGER NOT NULL,
  "de30a49" INTEGER NOT NULL,
  "de50a99" INTEGER NOT NULL,
  "de100mais" INTEGER NOT NULL
);

CREATE TABLE "UHLeitosUF" (
  "id" TEXT PRIMARY KEY,
  "uf" TEXT NOT NULL,
  "uhTotal" INTEGER NOT NULL,
  "uhAdaptadas" INTEGER NOT NULL,
  "leitosTotal" INTEGER NOT NULL,
  "leitosSimples" INTEGER NOT NULL,
  "leitosDuplos" INTEGER NOT NULL
);

CREATE TABLE "Capitais" (
  "id" TEXT PRIMARY KEY,
  "capital" TEXT NOT NULL,
  "estabelecimentos" INTEGER NOT NULL,
  "uhTotal" INTEGER NOT NULL,
  "uhAdaptadas" INTEGER NOT NULL,
  "leitosTotal" INTEGER NOT NULL,
  "leitosSimples" INTEGER NOT NULL,
  "leitosDuplos" INTEGER NOT NULL
);

CREATE TABLE "EstabPorCategoria" (
  "id" TEXT PRIMARY KEY,
  "uf" TEXT NOT NULL,
  "total" INTEGER NOT NULL,
  "luxo" INTEGER NOT NULL,
  "superior" INTEGER NOT NULL,
  "turistico" INTEGER NOT NULL,
  "economico" INTEGER NOT NULL,
  "simples" INTEGER NOT NULL
);

CREATE TABLE "EstabPorCaracteristica" (
  "id" TEXT PRIMARY KEY,
  "uf" TEXT NOT NULL,
  "total" INTEGER NOT NULL,
  "independentes" INTEGER NOT NULL,
  "cadeiaNacional" INTEGER NOT NULL,
  "cadeiaInternacional" INTEGER NOT NULL
);

CREATE TABLE "EstabPorLocalizacao" (
  "id" TEXT PRIMARY KEY,
  "uf" TEXT NOT NULL,
  "total" INTEGER NOT NULL,
  "urbanaCentro" INTEGER NOT NULL,
  "urbanaFora" INTEGER NOT NULL,
  "orlaMaritima" INTEGER NOT NULL,
  "zonaRural" INTEGER NOT NULL
);

CREATE TABLE "QuizCategory" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "icon" TEXT NOT NULL,
  "color" TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE "QuizQuestion" (
  "id" TEXT PRIMARY KEY,
  "categoryId" TEXT NOT NULL REFERENCES "QuizCategory"("id"),
  "question" TEXT NOT NULL,
  "optionA" TEXT NOT NULL,
  "optionB" TEXT NOT NULL,
  "optionC" TEXT NOT NULL,
  "optionD" TEXT NOT NULL,
  "correctAnswer" TEXT NOT NULL,
  "explanation" TEXT NOT NULL,
  "difficulty" TEXT NOT NULL DEFAULT 'medium',
  "order" INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE "QuizAttempt" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES "User"("id"),
  "categoryId" TEXT NOT NULL REFERENCES "QuizCategory"("id"),
  "score" INTEGER NOT NULL,
  "totalQuestions" INTEGER NOT NULL,
  "timeTaken" INTEGER NOT NULL DEFAULT 0,
  "answers" TEXT NOT NULL,
  "completedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "Curiosity" (
  "id" TEXT PRIMARY KEY,
  "title" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "icon" TEXT NOT NULL,
  "source" TEXT,
  "order" INTEGER NOT NULL DEFAULT 0
);

-- ============================================
-- INSERT DATA
-- ============================================

-- ⚠️ NÃO inserir usuários falsos! O ranking deve mostrar apenas usuários reais.
-- Os usuários serão criados automaticamente pela página de registro do site.
-- Para criar seu primeiro usuário, acesse o site e clique em "Criar Conta".

-- Tabela 1 - Estabelecimentos por Tipo
INSERT INTO "EstabPorTipo" ("id", "uf", "total", "hoteis", "apartHoteis", "pousadas", "moteis", "pensoes", "hostels", "outros") VALUES
('t1_1', 'Brasil', 31299, 15005, 589, 9968, 4460, 609, 480, 188),
('t1_2', 'Rondônia', 307, 227, 0, 30, 46, 4, 0, 0),
('t1_3', 'Acre', 110, 76, 0, 0, 24, 0, 0, 0),
('t1_4', 'Amazonas', 359, 199, 0, 79, 47, 23, 0, 0),
('t1_5', 'Roraima', 60, 31, 0, 19, 10, 0, 0, 0),
('t1_6', 'Pará', 742, 511, 0, 93, 116, 10, 7, 0),
('t1_7', 'Amapá', 72, 37, 0, 0, 19, 0, 0, 0),
('t1_8', 'Tocantins', 317, 217, 0, 59, 32, 7, 0, 0),
('t1_9', 'Maranhão', 531, 262, 0, 147, 105, 8, 5, 0),
('t1_10', 'Piauí', 376, 152, 0, 113, 79, 25, 0, 0),
('t1_11', 'Ceará', 1162, 307, 24, 566, 237, 7, 17, 4),
('t1_12', 'Rio Grande do Norte', 669, 173, 31, 347, 99, 5, 14, 0),
('t1_13', 'Paraíba', 381, 131, 8, 169, 61, 5, 7, 0),
('t1_14', 'Pernambuco', 978, 315, 16, 397, 224, 10, 13, 3),
('t1_15', 'Alagoas', 449, 135, 0, 243, 62, 4, 0, 0),
('t1_16', 'Sergipe', 285, 83, 4, 138, 54, 3, 0, 0),
('t1_17', 'Bahia', 2552, 972, 48, 1275, 178, 28, 44, 7),
('t1_18', 'Minas Gerais', 3867, 2010, 53, 1078, 575, 97, 38, 16),
('t1_19', 'Espírito Santo', 688, 307, 10, 277, 75, 12, 3, 4),
('t1_20', 'Rio de Janeiro', 2680, 863, 33, 1354, 225, 59, 130, 16),
('t1_21', 'São Paulo', 5858, 3012, 135, 1531, 918, 135, 85, 42),
('t1_22', 'Paraná', 1760, 1066, 36, 263, 303, 57, 24, 11),
('t1_23', 'Santa Catarina', 1782, 798, 71, 657, 169, 27, 34, 26),
('t1_24', 'Rio Grande do Sul', 1915, 1006, 52, 455, 326, 32, 18, 26),
('t1_25', 'Mato Grosso do Sul', 710, 429, 3, 142, 104, 11, 13, 8),
('t1_26', 'Mato Grosso', 953, 670, 5, 138, 119, 12, 0, 0),
('t1_27', 'Goiás', 1457, 834, 23, 346, 211, 23, 10, 10),
('t1_28', 'Distrito Federal', 279, 182, 19, 28, 42, 5, 3, 0);

-- Tabela 2 - Estabelecimentos por Grupo UH
INSERT INTO "EstabPorGrupoUH" ("id", "uf", "total", "ate4", "de5a9", "de10a19", "de20a29", "de30a49", "de50a99", "de100mais") VALUES
('t2_1', 'Brasil', 31299, 645, 3606, 10014, 6674, 5530, 3304, 1526),
('t2_2', 'Rondônia', 307, 0, 20, 97, 79, 76, 0, 0),
('t2_3', 'Acre', 110, 0, 13, 34, 30, 17, 12, 4),
('t2_4', 'Amazonas', 359, 5, 39, 125, 78, 65, 21, 26),
('t2_5', 'Roraima', 60, 0, 6, 28, 11, 7, 8, 0),
('t2_6', 'Pará', 742, 4, 71, 241, 175, 144, 77, 30),
('t2_7', 'Amapá', 72, 0, 7, 25, 16, 15, 0, 0),
('t2_8', 'Tocantins', 317, 3, 29, 118, 86, 52, 26, 3),
('t2_9', 'Maranhão', 531, 11, 43, 180, 130, 94, 50, 23),
('t2_10', 'Piauí', 376, 10, 66, 135, 83, 45, 31, 6),
('t2_11', 'Ceará', 1162, 27, 193, 412, 266, 140, 78, 46),
('t2_12', 'Rio Grande do Norte', 669, 12, 99, 232, 135, 106, 42, 43),
('t2_13', 'Paraíba', 381, 4, 44, 125, 88, 58, 42, 20),
('t2_14', 'Pernambuco', 978, 21, 106, 311, 237, 167, 76, 60),
('t2_15', 'Alagoas', 449, 4, 72, 153, 103, 51, 40, 26),
('t2_16', 'Sergipe', 285, 3, 18, 96, 76, 43, 32, 17),
('t2_17', 'Bahia', 2552, 52, 313, 915, 552, 433, 189, 98),
('t2_18', 'Minas Gerais', 3867, 79, 479, 1278, 845, 661, 406, 119),
('t2_19', 'Espírito Santo', 688, 10, 57, 226, 142, 148, 69, 36),
('t2_20', 'Rio de Janeiro', 2680, 75, 443, 808, 460, 431, 304, 159),
('t2_21', 'São Paulo', 5858, 97, 490, 1721, 1235, 1211, 762, 342),
('t2_22', 'Paraná', 1760, 32, 186, 471, 360, 355, 248, 108),
('t2_23', 'Santa Catarina', 1782, 68, 253, 572, 310, 259, 221, 99),
('t2_24', 'Rio Grande do Sul', 1915, 62, 235, 559, 391, 346, 224, 98),
('t2_25', 'Mato Grosso do Sul', 710, 21, 77, 244, 146, 139, 64, 19),
('t2_26', 'Mato Grosso', 953, 17, 83, 349, 234, 164, 86, 20),
('t2_27', 'Goiás', 1457, 24, 154, 495, 346, 263, 103, 72),
('t2_28', 'Distrito Federal', 279, 4, 10, 64, 60, 40, 53, 48);

-- Tabela 3 - UH e Leitos por UF
INSERT INTO "UHLeitosUF" ("id", "uf", "uhTotal", "uhAdaptadas", "leitosTotal", "leitosSimples", "leitosDuplos") VALUES
('t3_1', 'Brasil', 1011254, 22543, 2407892, 1031200, 1376692),
('t3_2', 'Rondônia', 8591, 206, 19548, 7732, 11816),
('t3_3', 'Acre', 3085, 90, 6927, 2693, 4234),
('t3_4', 'Amazonas', 12416, 295, 29020, 9910, 19110),
('t3_5', 'Roraima', 1505, 20, 3407, 1233, 2174),
('t3_6', 'Pará', 23281, 469, 53611, 19559, 34052),
('t3_7', 'Amapá', 2098, 52, 4551, 1341, 3210),
('t3_8', 'Tocantins', 7818, 120, 17210, 8358, 8852),
('t3_9', 'Maranhão', 16109, 284, 36292, 14092, 22200),
('t3_10', 'Piauí', 8802, 308, 20819, 8925, 11894),
('t3_11', 'Ceará', 31983, 645, 81043, 32439, 48604),
('t3_12', 'Rio Grande do Norte', 20845, 649, 52807, 20743, 32064),
('t3_13', 'Paraíba', 12186, 377, 27856, 12000, 15856),
('t3_14', 'Pernambuco', 32076, 584, 77450, 35268, 42182),
('t3_15', 'Alagoas', 13665, 490, 31974, 12756, 19218),
('t3_16', 'Sergipe', 9340, 272, 21719, 9061, 12658),
('t3_17', 'Bahia', 74539, 1193, 188861, 86789, 102072),
('t3_18', 'Minas Gerais', 111565, 2666, 255131, 114425, 140706),
('t3_19', 'Espírito Santo', 23410, 443, 54727, 25637, 29090),
('t3_20', 'Rio de Janeiro', 92340, 2414, 221121, 88203, 132918),
('t3_21', 'São Paulo', 215674, 4633, 507412, 206502, 300910),
('t3_22', 'Paraná', 63257, 1287, 144694, 64420, 80274),
('t3_23', 'Santa Catarina', 56573, 1005, 146837, 70313, 76524),
('t3_24', 'Rio Grande do Sul', 61365, 1311, 143286, 59926, 83360),
('t3_25', 'Mato Grosso do Sul', 19363, 511, 47426, 23912, 23514),
('t3_26', 'Mato Grosso', 25146, 585, 57814, 28304, 29510),
('t3_27', 'Goiás', 46224, 1155, 116925, 51639, 65286),
('t3_28', 'Distrito Federal', 17998, 479, 39424, 15020, 24404);

-- Tabela 4 - Capitais
INSERT INTO "Capitais" ("id", "capital", "estabelecimentos", "uhTotal", "uhAdaptadas", "leitosTotal", "leitosSimples", "leitosDuplos") VALUES
('t4_1', 'Porto Velho', 94, 2979, 72, 6828, 2382, 4446),
('t4_2', 'Rio Branco', 49, 1742, 59, 3814, 1388, 2426),
('t4_3', 'Manaus', 164, 8449, 237, 18561, 5807, 12754),
('t4_4', 'Boa Vista', 39, 1118, 7, 2431, 865, 1566),
('t4_5', 'Belém', 141, 6874, 222, 15101, 4839, 10262),
('t4_6', 'Macapá', 36, 1364, 41, 2910, 928, 1982),
('t4_7', 'Palmas', 72, 2528, 58, 5468, 2628, 2840),
('t4_8', 'São Luís', 123, 5694, 106, 12443, 4595, 7848),
('t4_9', 'Teresina', 118, 3703, 198, 8110, 2706, 5404),
('t4_10', 'Fortaleza', 323, 13144, 202, 30733, 12863, 17870),
('t4_11', 'Natal', 224, 11085, 366, 28370, 11056, 17314),
('t4_12', 'João Pessoa', 125, 5673, 184, 12410, 5398, 7012),
('t4_13', 'Recife', 165, 8425, 140, 18929, 8541, 10388),
('t4_14', 'Maceió', 157, 7707, 324, 17674, 6970, 10704),
('t4_15', 'Aracaju', 125, 5797, 199, 13287, 5523, 7764),
('t4_16', 'Salvador', 363, 16319, 207, 35104, 11264, 23840),
('t4_17', 'Belo Horizonte', 334, 17429, 446, 35440, 12676, 22764),
('t4_18', 'Vitória', 45, 3860, 81, 8010, 3372, 4638),
('t4_19', 'Rio de Janeiro', 546, 38244, 835, 83070, 33108, 49962),
('t4_20', 'São Paulo', 1125, 61068, 779, 124794, 36822, 87972),
('t4_21', 'Curitiba', 237, 12512, 257, 25891, 10997, 14894),
('t4_22', 'Florianópolis', 311, 11242, 170, 30844, 15686, 15158),
('t4_23', 'Porto Alegre', 199, 11031, 177, 22492, 8408, 14084),
('t4_24', 'Campo Grande', 129, 4744, 123, 10786, 4408, 6378),
('t4_25', 'Cuiabá', 94, 4283, 93, 9374, 4462, 4912),
('t4_26', 'Goiânia', 174, 8420, 163, 17054, 7380, 9674),
('t4_27', 'Brasília', 279, 17998, 479, 39424, 15020, 24404);

-- Tabela 6 - Categorias
INSERT INTO "EstabPorCategoria" ("id", "uf", "total", "luxo", "superior", "turistico", "economico", "simples") VALUES
('t6_1', 'Brasil', 17011, 666, 1699, 6284, 5626, 2736),
('t6_2', 'Rondônia', 162, 0, 15, 52, 54, 0),
('t6_3', 'Acre', 65, 0, 5, 25, 26, 9),
('t6_4', 'Amazonas', 154, 8, 15, 45, 61, 25),
('t6_5', 'Roraima', 35, 0, 3, 7, 14, 11),
('t6_6', 'Pará', 381, 8, 30, 125, 147, 71),
('t6_7', 'Amapá', 49, 0, 3, 14, 23, 0),
('t6_8', 'Tocantins', 134, 7, 8, 58, 41, 20),
('t6_9', 'Maranhão', 246, 9, 23, 79, 91, 44),
('t6_10', 'Piauí', 161, 8, 15, 58, 53, 27),
('t6_11', 'Ceará', 544, 16, 45, 235, 172, 76),
('t6_12', 'Rio Grande do Norte', 361, 19, 39, 154, 80, 69),
('t6_13', 'Paraíba', 191, 6, 17, 64, 60, 44),
('t6_14', 'Pernambuco', 609, 25, 54, 227, 197, 106),
('t6_15', 'Alagoas', 256, 10, 19, 99, 94, 34),
('t6_16', 'Sergipe', 157, 6, 12, 53, 52, 34),
('t6_17', 'Bahia', 1264, 48, 120, 503, 384, 209),
('t6_18', 'Minas Gerais', 2134, 83, 214, 766, 686, 385),
('t6_19', 'Espírito Santo', 358, 10, 27, 137, 133, 51),
('t6_20', 'Rio de Janeiro', 1630, 61, 181, 692, 472, 224),
('t6_21', 'São Paulo', 3522, 134, 358, 1206, 1184, 640),
('t6_22', 'Paraná', 963, 48, 107, 304, 368, 136),
('t6_23', 'Santa Catarina', 947, 28, 131, 422, 294, 72),
('t6_24', 'Rio Grande do Sul', 1035, 51, 126, 404, 336, 118),
('t6_25', 'Mato Grosso do Sul', 368, 17, 24, 138, 131, 58),
('t6_26', 'Mato Grosso', 453, 15, 36, 170, 170, 62),
('t6_27', 'Goiás', 656, 31, 55, 207, 244, 119),
('t6_28', 'Distrito Federal', 176, 12, 17, 40, 59, 48);

-- Tabela 7 - Características
INSERT INTO "EstabPorCaracteristica" ("id", "uf", "total", "independentes", "cadeiaNacional", "cadeiaInternacional") VALUES
('t7_1', 'Brasil', 17011, 15687, 1048, 276),
('t7_2', 'Rondônia', 162, 153, 9, 0),
('t7_3', 'Acre', 65, 60, 0, 0),
('t7_4', 'Amazonas', 154, 142, 8, 4),
('t7_5', 'Roraima', 35, 35, 0, 0),
('t7_6', 'Pará', 381, 354, 21, 6),
('t7_7', 'Amapá', 49, 46, 0, 0),
('t7_8', 'Tocantins', 134, 129, 5, 0),
('t7_9', 'Maranhão', 246, 228, 15, 3),
('t7_10', 'Piauí', 161, 136, 0, 0),
('t7_11', 'Ceará', 544, 510, 28, 6),
('t7_12', 'Rio Grande do Norte', 361, 328, 29, 4),
('t7_13', 'Paraíba', 191, 164, 22, 5),
('t7_14', 'Pernambuco', 609, 556, 42, 11),
('t7_15', 'Alagoas', 256, 233, 16, 7),
('t7_16', 'Sergipe', 157, 147, 7, 3),
('t7_17', 'Bahia', 1264, 1173, 74, 17),
('t7_18', 'Minas Gerais', 2134, 2001, 117, 16),
('t7_19', 'Espírito Santo', 358, 339, 11, 8),
('t7_20', 'Rio de Janeiro', 1630, 1491, 98, 41),
('t7_21', 'São Paulo', 3522, 3243, 204, 75),
('t7_22', 'Paraná', 963, 859, 80, 24),
('t7_23', 'Santa Catarina', 947, 866, 64, 17),
('t7_24', 'Rio Grande do Sul', 1035, 939, 80, 16),
('t7_25', 'Mato Grosso do Sul', 368, 348, 16, 4),
('t7_26', 'Mato Grosso', 453, 429, 21, 3),
('t7_27', 'Goiás', 656, 618, 0, 0),
('t7_28', 'Distrito Federal', 176, 160, 0, 0);

-- Tabela 10 - Localização
INSERT INTO "EstabPorLocalizacao" ("id", "uf", "total", "urbanaCentro", "urbanaFora", "orlaMaritima", "zonaRural") VALUES
('t10_1', 'Brasil', 17033, 7272, 6085, 2194, 1482),
('t10_2', 'Rondônia', 162, 74, 78, 0, 10),
('t10_3', 'Acre', 65, 41, 23, 0, 0),
('t10_4', 'Amazonas', 154, 86, 46, 0, 0),
('t10_5', 'Roraima', 35, 12, 0, 0, 0),
('t10_6', 'Pará', 381, 227, 123, 19, 12),
('t10_7', 'Amapá', 49, 29, 0, 0, 0),
('t10_8', 'Tocantins', 134, 80, 46, 0, 0),
('t10_9', 'Maranhão', 246, 111, 99, 26, 10),
('t10_10', 'Piauí', 161, 52, 91, 7, 11),
('t10_11', 'Ceará', 544, 139, 168, 194, 43),
('t10_12', 'Rio Grande do Norte', 361, 90, 95, 153, 23),
('t10_13', 'Paraíba', 191, 56, 53, 69, 13),
('t10_14', 'Pernambuco', 609, 177, 234, 156, 42),
('t10_15', 'Alagoas', 256, 50, 83, 102, 21),
('t10_16', 'Sergipe', 157, 39, 56, 47, 15),
('t10_17', 'Bahia', 1266, 523, 326, 355, 62),
('t10_18', 'Minas Gerais', 2134, 1085, 759, 0, 290),
('t10_19', 'Espírito Santo', 358, 147, 97, 78, 36),
('t10_20', 'Rio de Janeiro', 1631, 546, 568, 397, 120),
('t10_21', 'São Paulo', 3529, 1465, 1400, 271, 393),
('t10_22', 'Paraná', 965, 510, 355, 24, 76),
('t10_23', 'Santa Catarina', 952, 386, 262, 254, 50),
('t10_24', 'Rio Grande do Sul', 1037, 516, 423, 36, 62),
('t10_25', 'Mato Grosso do Sul', 368, 191, 140, 0, 37),
('t10_26', 'Mato Grosso', 454, 244, 161, 0, 49),
('t10_27', 'Goiás', 658, 295, 296, 0, 67),
('t10_28', 'Distrito Federal', 176, 101, 65, 0, 10);

-- Quiz Categories
INSERT INTO "QuizCategory" ("id", "name", "description", "icon", "color", "order") VALUES
('cat1', 'Hospedagem no Brasil', 'Dados gerais sobre estabelecimentos de hospedagem no país', 'Building2', '#10b981', 1),
('cat2', 'Tipos de Estabelecimentos', 'Hotéis, pousadas, motéis e demais tipos', 'Hotel', '#f59e0b', 2),
('cat3', 'Capacidade e Leitos', 'Unidades habitacionais e capacidade de hospedagem', 'Bed', '#06b6d4', 3),
('cat4', 'Categorias e Classificação', 'Luxo, superior, turístico, econômico e simples', 'Star', '#8b5cf6', 4),
('cat5', 'Redes e Cadeias', 'Estabelecimentos independentes e cadeias hoteleiras', 'Link', '#ec4899', 5),
('cat6', 'Localização Geográfica', 'Distribuição por zona urbana, orla marítima e rural', 'MapPin', '#22c55e', 6);

-- Quiz Questions (30 perguntas)
INSERT INTO "QuizQuestion" ("id", "categoryId", "question", "optionA", "optionB", "optionC", "optionD", "correctAnswer", "explanation", "difficulty", "order") VALUES
-- Cat 1 - Hospedagem no Brasil
('q1', 'cat1', 'Quantos estabelecimentos de hospedagem o Brasil possuía em 2016?', '21.500', '31.299', '41.000', '25.800', 'B', 'Segundo a Pesquisa de Serviços de Hospedagem do IBGE 2016, o Brasil possuía 31.299 estabelecimentos de hospedagem.', 'easy', 1),
('q2', 'cat1', 'Qual região possuía o maior número de estabelecimentos de hospedagem em 2016?', 'Nordeste', 'Sudeste', 'Sul', 'Norte', 'B', 'O Sudeste liderava com São Paulo (5.858), Rio de Janeiro (2.680) e Minas Gerais (3.867), totalizando a maior concentração do país.', 'easy', 2),
('q3', 'cat1', 'Qual estado tinha menos estabelecimentos de hospedagem em 2016?', 'Acre', 'Roraima', 'Amapá', 'Tocantins', 'B', 'Roraima tinha apenas 60 estabelecimentos de hospedagem, a menor quantidade entre todos os estados.', 'medium', 3),
('q4', 'cat1', 'Em 2016, o Brasil possuía quantos leitos no total?', '1.507.892', '2.407.892', '3.000.000', '1.800.000', 'B', 'O Brasil possuía 2.407.892 leitos em estabelecimentos de hospedagem segundo o IBGE 2016.', 'medium', 4),
('q5', 'cat1', 'Quantas unidades habitacionais adaptadas existiam no Brasil em 2016?', '45.543', '12.000', '22.543', '8.300', 'C', 'O Brasil possuía 22.543 unidades habitacionais adaptadas para pessoas com deficiência em 2016.', 'hard', 5),
-- Cat 2 - Tipos
('q6', 'cat2', 'Qual tipo de estabelecimento era o mais comum no Brasil em 2016?', 'Pousadas', 'Hotéis', 'Motéis', 'Hostels', 'B', 'Os hotéis eram o tipo mais comum com 15.005 estabelecimentos, representando quase metade do total.', 'easy', 1),
('q7', 'cat2', 'Quantos hostels/albergues turísticos existiam no Brasil em 2016?', '480', '320', '1.200', '75', 'A', 'Havia 480 hostels/albergues turísticos registrados no Brasil em 2016.', 'medium', 2),
('q8', 'cat2', 'O estado da Bahia possuía mais pousadas do que hotéis em 2016?', 'Sim, 1.275 pousadas contra 972 hotéis', 'Não, hotéis eram maioria', 'Empataram em número', 'Não havia pousadas na Bahia', 'A', 'Na Bahia, pousadas (1.275) superavam hotéis (972), refletindo a forte vocação turística do estado.', 'medium', 3),
('q9', 'cat2', 'Qual estado possuía mais apart-hotéis/flats em 2016?', 'São Paulo', 'Rio de Janeiro', 'Minas Gerais', 'Bahia', 'A', 'São Paulo liderava com 135 apart-hotéis/flats, seguido pelo Rio de Janeiro com 33.', 'hard', 4),
('q10', 'cat2', 'Quantos motéis existiam no Brasil em 2016?', '2.100', '4.460', '3.500', '1.800', 'B', 'O Brasil possuía 4.460 motéis em 2016, sendo o terceiro tipo mais comum de estabelecimento.', 'medium', 5),
-- Cat 3 - Capacidade e Leitos
('q11', 'cat3', 'Quantas unidades habitacionais o Brasil possuía em 2016?', '500.000', '1.011.254', '750.000', '2.000.000', 'B', 'O Brasil possuía 1.011.254 unidades habitacionais em estabelecimentos de hospedagem em 2016.', 'easy', 1),
('q12', 'cat3', 'Qual capital possuía mais leitos em 2016?', 'Rio de Janeiro', 'São Paulo', 'Salvador', 'Brasília', 'B', 'São Paulo possuía 124.794 leitos, seguido pelo Rio de Janeiro com 83.070.', 'easy', 2),
('q13', 'cat3', 'No Brasil, leitos duplos eram mais numerosos que leitos simples?', 'Sim, 1.376.692 contra 1.031.200', 'Não, leitos simples eram mais', 'Eram iguais', 'Não há dados de leitos simples', 'A', 'Leitos duplos (1.376.692) superavam leitos simples (1.031.200), mostrando preferência por acomodações para casais.', 'medium', 3),
('q14', 'cat3', 'Quantos estabelecimentos com 100 ou mais UHs existiam no Brasil?', '500', '1.526', '3.000', '800', 'B', '1.526 estabelecimentos possuíam 100 ou mais unidades habitacionais em 2016.', 'hard', 4),
('q15', 'cat3', 'Qual estado tinha mais unidades habitacionais em 2016?', 'Rio de Janeiro', 'Minas Gerais', 'São Paulo', 'Bahia', 'C', 'São Paulo liderava com 215.674 unidades habitacionais, seguido por Minas Gerais com 111.565.', 'easy', 5),
-- Cat 4 - Categorias
('q16', 'cat4', 'Qual era a categoria mais comum entre os estabelecimentos com 5+ funcionários?', 'Luxo', 'Econômico', 'Turístico', 'Simples', 'C', 'A categoria turístico/médio conforto era a mais comum com 6.284 estabelecimentos.', 'easy', 1),
('q17', 'cat4', 'Quantos hotéis de luxo existiam no Brasil em 2016?', '666', '1.200', '350', '89', 'A', 'Havia 666 estabelecimentos de categoria luxo no Brasil em 2016.', 'medium', 2),
('q18', 'cat4', 'Qual estado possuía mais hotéis de luxo em 2016?', 'Rio de Janeiro', 'São Paulo', 'Bahia', 'Minas Gerais', 'B', 'São Paulo liderava com 134 estabelecimentos de luxo, seguido por Rio de Janeiro (61) e Minas Gerais (83).', 'medium', 3),
('q19', 'cat4', 'Na categoria econômico, qual estado liderava em número de estabelecimentos?', 'Bahia', 'São Paulo', 'Minas Gerais', 'Rio de Janeiro', 'B', 'São Paulo liderava na categoria econômico com 1.184 estabelecimentos, seguido por Minas Gerais com 686.', 'hard', 4),
('q20', 'cat4', 'Estabelecimentos de categoria simples representavam quantos do total?', '1.500', '5.626', '2.736', '4.000', 'C', '2.736 estabelecimentos eram classificados como categoria simples em 2016.', 'medium', 5),
-- Cat 5 - Redes e Cadeias
('q21', 'cat5', 'Qual porcentagem dos estabelecimentos era independente em 2016?', '50%', '72%', '92%', '85%', 'C', '15.687 de 17.011 estabelecimentos eram independentes, representando cerca de 92% do total.', 'medium', 1),
('q22', 'cat5', 'Quantos estabelecimentos integravam cadeias internacionais de hotéis?', '276', '500', '1.048', '150', 'A', '276 estabelecimentos integravam cadeias internacionais de hotéis em 2016.', 'easy', 2),
('q23', 'cat5', 'Qual estado possuía mais estabelecimentos de cadeias internacionais?', 'Rio de Janeiro', 'São Paulo', 'Bahia', 'Minas Gerais', 'B', 'São Paulo liderava com 75 estabelecimentos de cadeias internacionais, seguido por Rio de Janeiro com 41.', 'hard', 3),
('q24', 'cat5', 'Quantos estabelecimentos faziam parte de cadeias nacionais?', '2.500', '500', '1.048', '3.200', 'C', '1.048 estabelecimentos integravam cadeias nacionais de hotéis em 2016.', 'medium', 4),
('q25', 'cat5', 'Em Roraima, todos os estabelecimentos eram independentes?', 'Sim, 100% independentes', 'Não, havia cadeias nacionais', 'Não, havia cadeias internacionais', 'Havia tanto nacionais quanto internacionais', 'A', 'Roraima possuía 35 estabelecimentos, todos independentes, sem nenhuma cadeia nacional ou internacional.', 'hard', 5),
-- Cat 6 - Localização
('q26', 'cat6', 'A maioria dos estabelecimentos estava localizada em qual zona?', 'Zona urbana/centro', 'Zona urbana/fora do centro', 'Orla marítima', 'Zona rural', 'A', '7.272 estabelecimentos estavam na zona urbana/centro da cidade, a localização mais comum.', 'easy', 1),
('q27', 'cat6', 'Quantos estabelecimentos estavam localizados em orla marítima/praia/ilha?', '500', '2.194', '4.000', '1.000', 'B', '2.194 estabelecimentos estavam localizados em orla marítima/praia/ilha, concentrados principalmente no Nordeste.', 'medium', 2),
('q28', 'cat6', 'Qual estado tinha mais estabelecimentos em zona rural/reserva ambiental?', 'Minas Gerais', 'São Paulo', 'Goiás', 'Mato Grosso', 'B', 'São Paulo liderava com 393 estabelecimentos em zona rural, seguido por Minas Gerais com 290.', 'hard', 3),
('q29', 'cat6', 'No Ceará, qual localização era mais comum para estabelecimentos?', 'Urbana/centro', 'Urbana/fora do centro', 'Orla marítima', 'Zona rural', 'C', 'No Ceará, 194 estabelecimentos estavam em orla marítima, seguido por urbana/fora do centro (168) e urbana/centro (139).', 'hard', 4),
('q30', 'cat6', 'Minas Gerais tinha estabelecimentos em orla marítima em 2016?', 'Sim, mais de 100', 'Sim, poucos', 'Não, zero estabelecimentos', 'Sim, cerca de 50', 'C', 'Minas Gerais, por ser um estado sem litoral, tinha zero estabelecimentos em orla marítima/praia/ilha.', 'easy', 5);

-- Curiosidades (20)
INSERT INTO "Curiosity" ("id", "title", "content", "category", "icon", "source", "order") VALUES
('cur1', 'São Paulo: O Gigante da Hospedagem', 'São Paulo possuía 5.858 estabelecimentos de hospedagem em 2016 — quase 19% de todo o Brasil. Só a capital paulista tinha mais leitos (124.794) que muitos estados inteiros.', 'Hospedagem', 'Trophy', 'IBGE PSH 2016', 1),
('cur2', '92% dos Hotéis são Independentes', 'Dos 17.011 estabelecimentos com 5+ funcionários, 15.687 eram independentes. Apenas 276 integravam cadeias internacionais — mostrando que o mercado brasileiro é dominado por negócios locais.', 'Redes', 'Store', 'IBGE PSH 2016', 2),
('cur3', 'O Paradoxo da Bahia', 'A Bahia possuía mais pousadas (1.275) do que hotéis (972), um padrão único entre os grandes estados. Isso reflete a forte vocação para turismo de experiência e hospedagem mais aconchegante.', 'Tipos', 'Lightbulb', 'IBGE PSH 2016', 3),
('cur4', 'Roraima: O Menor Mercado', 'Com apenas 60 estabelecimentos de hospedagem e todos independentes, Roraima era o estado com menor infraestrutura hoteleira do Brasil em 2016.', 'Hospedagem', 'MapPin', 'IBGE PSH 2016', 4),
('cur5', '1 Milhão de Quartos', 'O Brasil possuía 1.011.254 unidades habitacionais em hospedagem — mais de 1 milhão de quartos! Colocados em fila, dariam a volta na Terra mais de 6 vezes.', 'Capacidade', 'Bed', 'IBGE PSH 2016', 5),
('cur6', 'O Nordeste é Praia', 'Dos 2.194 estabelecimentos em orla marítima no Brasil, a grande maioria estava no Nordeste. Ceará (194), Rio Grande do Norte (153) e Bahia (355) lideravam em hospedagem à beira-mar.', 'Localização', 'Waves', 'IBGE PSH 2016', 6),
('cur7', 'Luxo é para Poucos', 'Apenas 666 estabelecimentos (3,9%) eram classificados como luxo. São Paulo concentrava 134 deles — 20% de toda a oferta de luxo do país.', 'Categorias', 'Crown', 'IBGE PSH 2016', 7),
('cur8', 'Motéis: O Terceiro Tipo Mais Comum', 'Com 4.460 estabelecimentos, motéis eram o terceiro tipo mais comum no Brasil. São Paulo liderava com 918 motéis — quase 21% do total nacional.', 'Tipos', 'Car', 'IBGE PSH 2016', 8),
('cur9', '2,4 Milhões de Leitos', 'O Brasil oferecia 2.407.892 leitos em 2016. Se todos fossem ocupados simultaneamente, seria como se a população de Natal (RN) estivesse hospedada!', 'Capacidade', 'Calculator', 'IBGE PSH 2016', 9),
('cur10', 'Só 2,2% de Quartos Adaptados', 'Das 1.011.254 unidades habitacionais, apenas 22.543 (2,2%) eram adaptadas para pessoas com deficiência — um desafio enorme para a acessibilidade no turismo brasileiro.', 'Capacidade', 'Accessibility', 'IBGE PSH 2016', 10),
('cur11', 'Brasília: Campeã de Grandes Hotéis', 'O Distrito Federal tinha 48 estabelecimentos com 100+ UHs em 279 totais (17,2%) — a maior proporção de grandes hotéis entre todos os estados.', 'Capacidade', 'Building2', 'IBGE PSH 2016', 11),
('cur12', 'Sem Praia, mas com Rural', 'Estados sem litoral como Minas Gerais (290), São Paulo (393) e Goiás (67) compensavam com estabelecimentos em zona rural e reservas ambientais, oferecendo turismo ecológico.', 'Localização', 'TreePine', 'IBGE PSH 2016', 12),
('cur13', 'Fortaleza: Capital da Hospedagem no NE', 'Com 323 estabelecimentos e 30.733 leitos, Fortaleza era a capital nordestina com maior infraestrutura hoteleira em 2016.', 'Capitais', 'Sun', 'IBGE PSH 2016', 13),
('cur14', 'Hostels: Fenômeno Urbano', 'Dos 480 hostels do Brasil, 130 estavam no Rio de Janeiro e 85 em São Paulo — as duas cidades mais visitadas por turistas internacionais.', 'Tipos', 'Users', 'IBGE PSH 2016', 14),
('cur15', 'Leitos Duplos Dominam', 'Leitos duplos (1.376.692) superavam os simples (1.031.200) em todo o Brasil — uma proporção de 57% vs 43%, mostrando foco em casais e famílias.', 'Capacidade', 'Heart', 'IBGE PSH 2016', 15),
('cur16', 'Santa Catarina: Diversidade', 'SC tinha 71 apart-hotéis, 657 pousadas e 798 hotéis — uma das distribuições mais equilibradas entre tipos, refletindo turismo diversificado.', 'Tipos', 'Scale', 'IBGE PSH 2016', 16),
('cur17', 'A Cadena Hoteleira Paulista', 'São Paulo concentrava 204 dos 1.048 estabelecimentos de cadeias nacionais (19,5%) e 75 dos 276 de cadeias internacionais (27,2%).', 'Redes', 'Network', 'IBGE PSH 2016', 17),
('cur18', 'Pequenos Predominam', 'Dos 31.299 estabelecimentos, apenas 4.830 (15,4%) tinham 50 ou mais unidades habitacionais. A maioria era de pequeno porte com 10 a 29 UHs.', 'Capacidade', 'BarChart3', 'IBGE PSH 2016', 18),
('cur19', 'Natal: Capital Adaptada', 'Natal (RN) possuía 366 unidades habitacionais adaptadas — a maior proporção entre as capitais nordestinas, mostrando compromisso com acessibilidade.', 'Capitais', 'ShieldCheck', 'IBGE PSH 2016', 19),
('cur20', 'Turístico: A Categoria Média', '6.284 estabelecimentos eram classificados como turístico/médio conforto — a categoria mais comum, representando 37% do total com 5+ funcionários.', 'Categorias', 'Star', 'IBGE PSH 2016', 20);

-- ⚠️ QuizAttempt: NÃO inserir dados falsos!
-- O ranking deve mostrar APENAS usuários reais que completaram o quiz.
-- As tentativas serão criadas automaticamente quando usuários reais fizerem o quiz.

-- ============================================
-- PRONTO! Todas as tabelas e dados foram criados.
-- O ranking será preenchido automaticamente quando
-- usuários reais completarem os quizzes.
-- ============================================

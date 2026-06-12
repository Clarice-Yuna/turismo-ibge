import { createHash } from 'crypto'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const hashPassword = (password: string) => createHash('sha256').update(password).digest('hex')

function parseNum(val: any): number {
  if (val === null || val === undefined || val === '') return 0
  const s = String(val).trim()
  if (s === '(X)' || s === '-' || s === '..' || s === '...') return 0
  const n = parseInt(s.replace(/\./g, '').replace(/\s/g, ''), 10)
  return isNaN(n) ? 0 : n
}

async function main() {
  console.log('🌱 Seeding database...')

  // Clean existing data
  await prisma.quizAttempt.deleteMany()
  await prisma.quizQuestion.deleteMany()
  await prisma.quizCategory.deleteMany()
  await prisma.curiosity.deleteMany()
  await prisma.estabPorTipo.deleteMany()
  await prisma.estabPorGrupoUH.deleteMany()
  await prisma.uHLeitosUF.deleteMany()
  await prisma.capitais.deleteMany()
  await prisma.estabPorCategoria.deleteMany()
  await prisma.estabPorCaracteristica.deleteMany()
  await prisma.estabPorLocalizacao.deleteMany()
  await prisma.user.deleteMany()

  // ====== USERS ======
  const seedPassword = process.env.SEED_PASSWORD || 'changeme123'
  const pw = hashPassword(seedPassword)
  const admin = await prisma.user.create({ data: { email: 'admin@test.com', name: 'Admin', password: pw, role: 'admin' } })
  const maria = await prisma.user.create({ data: { email: 'maria@test.com', name: 'Maria Silva', password: pw } })
  const joao = await prisma.user.create({ data: { email: 'joao@test.com', name: 'João Santos', password: pw } })
  const ana = await prisma.user.create({ data: { email: 'ana@test.com', name: 'Ana Oliveira', password: pw } })
  const carlos = await prisma.user.create({ data: { email: 'carlos@test.com', name: 'Carlos Pereira', password: pw } })
  console.log('✅ Users created')

  // ====== TABELA 1 - Estab por Tipo ======
  const t1Data = [
    { uf: 'Brasil', total: 31299, hoteis: 15005, apartHoteis: 589, pousadas: 9968, moteis: 4460, pensoes: 609, hostels: 480, outros: 188 },
    { uf: 'Rondônia', total: 307, hoteis: 227, apartHoteis: 0, pousadas: 30, moteis: 46, pensoes: 4, hostels: 0, outros: 0 },
    { uf: 'Acre', total: 110, hoteis: 76, apartHoteis: 0, pousadas: 0, moteis: 24, pensoes: 0, hostels: 0, outros: 0 },
    { uf: 'Amazonas', total: 359, hoteis: 199, apartHoteis: 0, pousadas: 79, moteis: 47, pensoes: 23, hostels: 0, outros: 0 },
    { uf: 'Roraima', total: 60, hoteis: 31, apartHoteis: 0, pousadas: 19, moteis: 10, pensoes: 0, hostels: 0, outros: 0 },
    { uf: 'Pará', total: 742, hoteis: 511, apartHoteis: 0, pousadas: 93, moteis: 116, pensoes: 10, hostels: 7, outros: 0 },
    { uf: 'Amapá', total: 72, hoteis: 37, apartHoteis: 0, pousadas: 0, moteis: 19, pensoes: 0, hostels: 0, outros: 0 },
    { uf: 'Tocantins', total: 317, hoteis: 217, apartHoteis: 0, pousadas: 59, moteis: 32, pensoes: 7, hostels: 0, outros: 0 },
    { uf: 'Maranhão', total: 531, hoteis: 262, apartHoteis: 0, pousadas: 147, moteis: 105, pensoes: 8, hostels: 5, outros: 0 },
    { uf: 'Piauí', total: 376, hoteis: 152, apartHoteis: 0, pousadas: 113, moteis: 79, pensoes: 25, hostels: 0, outros: 0 },
    { uf: 'Ceará', total: 1162, hoteis: 307, apartHoteis: 24, pousadas: 566, moteis: 237, pensoes: 7, hostels: 17, outros: 4 },
    { uf: 'Rio Grande do Norte', total: 669, hoteis: 173, apartHoteis: 31, pousadas: 347, moteis: 99, pensoes: 5, hostels: 14, outros: 0 },
    { uf: 'Paraíba', total: 381, hoteis: 131, apartHoteis: 8, pousadas: 169, moteis: 61, pensoes: 5, hostels: 7, outros: 0 },
    { uf: 'Pernambuco', total: 978, hoteis: 315, apartHoteis: 16, pousadas: 397, moteis: 224, pensoes: 10, hostels: 13, outros: 3 },
    { uf: 'Alagoas', total: 449, hoteis: 135, apartHoteis: 0, pousadas: 243, moteis: 62, pensoes: 4, hostels: 0, outros: 0 },
    { uf: 'Sergipe', total: 285, hoteis: 83, apartHoteis: 4, pousadas: 138, moteis: 54, pensoes: 3, hostels: 0, outros: 0 },
    { uf: 'Bahia', total: 2552, hoteis: 972, apartHoteis: 48, pousadas: 1275, moteis: 178, pensoes: 28, hostels: 44, outros: 7 },
    { uf: 'Minas Gerais', total: 3867, hoteis: 2010, apartHoteis: 53, pousadas: 1078, moteis: 575, pensoes: 97, hostels: 38, outros: 16 },
    { uf: 'Espírito Santo', total: 688, hoteis: 307, apartHoteis: 10, pousadas: 277, moteis: 75, pensoes: 12, hostels: 3, outros: 4 },
    { uf: 'Rio de Janeiro', total: 2680, hoteis: 863, apartHoteis: 33, pousadas: 1354, moteis: 225, pensoes: 59, hostels: 130, outros: 16 },
    { uf: 'São Paulo', total: 5858, hoteis: 3012, apartHoteis: 135, pousadas: 1531, moteis: 918, pensoes: 135, hostels: 85, outros: 42 },
    { uf: 'Paraná', total: 1760, hoteis: 1066, apartHoteis: 36, pousadas: 263, moteis: 303, pensoes: 57, hostels: 24, outros: 11 },
    { uf: 'Santa Catarina', total: 1782, hoteis: 798, apartHoteis: 71, pousadas: 657, moteis: 169, pensoes: 27, hostels: 34, outros: 26 },
    { uf: 'Rio Grande do Sul', total: 1915, hoteis: 1006, apartHoteis: 52, pousadas: 455, moteis: 326, pensoes: 32, hostels: 18, outros: 26 },
    { uf: 'Mato Grosso do Sul', total: 710, hoteis: 429, apartHoteis: 3, pousadas: 142, moteis: 104, pensoes: 11, hostels: 13, outros: 8 },
    { uf: 'Mato Grosso', total: 953, hoteis: 670, apartHoteis: 5, pousadas: 138, moteis: 119, pensoes: 12, hostels: 0, outros: 0 },
    { uf: 'Goiás', total: 1457, hoteis: 834, apartHoteis: 23, pousadas: 346, moteis: 211, pensoes: 23, hostels: 10, outros: 10 },
    { uf: 'Distrito Federal', total: 279, hoteis: 182, apartHoteis: 19, pousadas: 28, moteis: 42, pensoes: 5, hostels: 3, outros: 0 },
  ]

  for (const d of t1Data) {
    await prisma.estabPorTipo.create({ data: d })
  }
  console.log('✅ Tabela 1 - Estab por Tipo')

  // ====== TABELA 2 - Estab por Grupo UH ======
  const t2Data = [
    { uf: 'Brasil', total: 31299, ate4: 645, de5a9: 3606, de10a19: 10014, de20a29: 6674, de30a49: 5530, de50a99: 3304, de100mais: 1526 },
    { uf: 'Rondônia', total: 307, ate4: 0, de5a9: 20, de10a19: 97, de20a29: 79, de30a49: 76, de50a99: 0, de100mais: 0 },
    { uf: 'Acre', total: 110, ate4: 0, de5a9: 13, de10a19: 34, de20a29: 30, de30a49: 17, de50a99: 12, de100mais: 4 },
    { uf: 'Amazonas', total: 359, ate4: 5, de5a9: 39, de10a19: 125, de20a29: 78, de30a49: 65, de50a99: 21, de100mais: 26 },
    { uf: 'Roraima', total: 60, ate4: 0, de5a9: 6, de10a19: 28, de20a29: 11, de30a49: 7, de50a99: 8, de100mais: 0 },
    { uf: 'Pará', total: 742, ate4: 4, de5a9: 71, de10a19: 241, de20a29: 175, de30a49: 144, de50a99: 77, de100mais: 30 },
    { uf: 'Amapá', total: 72, ate4: 0, de5a9: 7, de10a19: 25, de20a29: 16, de30a49: 15, de50a99: 0, de100mais: 0 },
    { uf: 'Tocantins', total: 317, ate4: 3, de5a9: 29, de10a19: 118, de20a29: 86, de30a49: 52, de50a99: 26, de100mais: 3 },
    { uf: 'Maranhão', total: 531, ate4: 11, de5a9: 43, de10a19: 180, de20a29: 130, de30a49: 94, de50a99: 50, de100mais: 23 },
    { uf: 'Piauí', total: 376, ate4: 10, de5a9: 66, de10a19: 135, de20a29: 83, de30a49: 45, de50a99: 31, de100mais: 6 },
    { uf: 'Ceará', total: 1162, ate4: 27, de5a9: 193, de10a19: 412, de20a29: 266, de30a49: 140, de50a99: 78, de100mais: 46 },
    { uf: 'Rio Grande do Norte', total: 669, ate4: 12, de5a9: 99, de10a19: 232, de20a29: 135, de30a49: 106, de50a99: 42, de100mais: 43 },
    { uf: 'Paraíba', total: 381, ate4: 4, de5a9: 44, de10a19: 125, de20a29: 88, de30a49: 58, de50a99: 42, de100mais: 20 },
    { uf: 'Pernambuco', total: 978, ate4: 21, de5a9: 106, de10a19: 311, de20a29: 237, de30a49: 167, de50a99: 76, de100mais: 60 },
    { uf: 'Alagoas', total: 449, ate4: 4, de5a9: 72, de10a19: 153, de20a29: 103, de30a49: 51, de50a99: 40, de100mais: 26 },
    { uf: 'Sergipe', total: 285, ate4: 3, de5a9: 18, de10a19: 96, de20a29: 76, de30a49: 43, de50a99: 32, de100mais: 17 },
    { uf: 'Bahia', total: 2552, ate4: 52, de5a9: 313, de10a19: 915, de20a29: 552, de30a49: 433, de50a99: 189, de100mais: 98 },
    { uf: 'Minas Gerais', total: 3867, ate4: 79, de5a9: 479, de10a19: 1278, de20a29: 845, de30a49: 661, de50a99: 406, de100mais: 119 },
    { uf: 'Espírito Santo', total: 688, ate4: 10, de5a9: 57, de10a19: 226, de20a29: 142, de30a49: 148, de50a99: 69, de100mais: 36 },
    { uf: 'Rio de Janeiro', total: 2680, ate4: 75, de5a9: 443, de10a19: 808, de20a29: 460, de30a49: 431, de50a99: 304, de100mais: 159 },
    { uf: 'São Paulo', total: 5858, ate4: 97, de5a9: 490, de10a19: 1721, de20a29: 1235, de30a49: 1211, de50a99: 762, de100mais: 342 },
    { uf: 'Paraná', total: 1760, ate4: 32, de5a9: 186, de10a19: 471, de20a29: 360, de30a49: 355, de50a99: 248, de100mais: 108 },
    { uf: 'Santa Catarina', total: 1782, ate4: 68, de5a9: 253, de10a19: 572, de20a29: 310, de30a49: 259, de50a99: 221, de100mais: 99 },
    { uf: 'Rio Grande do Sul', total: 1915, ate4: 62, de5a9: 235, de10a19: 559, de20a29: 391, de30a49: 346, de50a99: 224, de100mais: 98 },
    { uf: 'Mato Grosso do Sul', total: 710, ate4: 21, de5a9: 77, de10a19: 244, de20a29: 146, de30a49: 139, de50a99: 64, de100mais: 19 },
    { uf: 'Mato Grosso', total: 953, ate4: 17, de5a9: 83, de10a19: 349, de20a29: 234, de30a49: 164, de50a99: 86, de100mais: 20 },
    { uf: 'Goiás', total: 1457, ate4: 24, de5a9: 154, de10a19: 495, de20a29: 346, de30a49: 263, de50a99: 103, de100mais: 72 },
    { uf: 'Distrito Federal', total: 279, ate4: 4, de5a9: 10, de10a19: 64, de20a29: 60, de30a49: 40, de50a99: 53, de100mais: 48 },
  ]

  for (const d of t2Data) {
    await prisma.estabPorGrupoUH.create({ data: d })
  }
  console.log('✅ Tabela 2 - Estab por Grupo UH')

  // ====== TABELA 3 - UH e Leitos por UF ======
  const t3Data = [
    { uf: 'Brasil', uhTotal: 1011254, uhAdaptadas: 22543, leitosTotal: 2407892, leitosSimples: 1031200, leitosDuplos: 1376692 },
    { uf: 'Rondônia', uhTotal: 8591, uhAdaptadas: 206, leitosTotal: 19548, leitosSimples: 7732, leitosDuplos: 11816 },
    { uf: 'Acre', uhTotal: 3085, uhAdaptadas: 90, leitosTotal: 6927, leitosSimples: 2693, leitosDuplos: 4234 },
    { uf: 'Amazonas', uhTotal: 12416, uhAdaptadas: 295, leitosTotal: 29020, leitosSimples: 9910, leitosDuplos: 19110 },
    { uf: 'Roraima', uhTotal: 1505, uhAdaptadas: 20, leitosTotal: 3407, leitosSimples: 1233, leitosDuplos: 2174 },
    { uf: 'Pará', uhTotal: 23281, uhAdaptadas: 469, leitosTotal: 53611, leitosSimples: 19559, leitosDuplos: 34052 },
    { uf: 'Amapá', uhTotal: 2098, uhAdaptadas: 52, leitosTotal: 4551, leitosSimples: 1341, leitosDuplos: 3210 },
    { uf: 'Tocantins', uhTotal: 7818, uhAdaptadas: 120, leitosTotal: 17210, leitosSimples: 8358, leitosDuplos: 8852 },
    { uf: 'Maranhão', uhTotal: 16109, uhAdaptadas: 284, leitosTotal: 36292, leitosSimples: 14092, leitosDuplos: 22200 },
    { uf: 'Piauí', uhTotal: 8802, uhAdaptadas: 308, leitosTotal: 20819, leitosSimples: 8925, leitosDuplos: 11894 },
    { uf: 'Ceará', uhTotal: 31983, uhAdaptadas: 645, leitosTotal: 81043, leitosSimples: 32439, leitosDuplos: 48604 },
    { uf: 'Rio Grande do Norte', uhTotal: 20845, uhAdaptadas: 649, leitosTotal: 52807, leitosSimples: 20743, leitosDuplos: 32064 },
    { uf: 'Paraíba', uhTotal: 12186, uhAdaptadas: 377, leitosTotal: 27856, leitosSimples: 12000, leitosDuplos: 15856 },
    { uf: 'Pernambuco', uhTotal: 32076, uhAdaptadas: 584, leitosTotal: 77450, leitosSimples: 35268, leitosDuplos: 42182 },
    { uf: 'Alagoas', uhTotal: 13665, uhAdaptadas: 490, leitosTotal: 31974, leitosSimples: 12756, leitosDuplos: 19218 },
    { uf: 'Sergipe', uhTotal: 9340, uhAdaptadas: 272, leitosTotal: 21719, leitosSimples: 9061, leitosDuplos: 12658 },
    { uf: 'Bahia', uhTotal: 74539, uhAdaptadas: 1193, leitosTotal: 188861, leitosSimples: 86789, leitosDuplos: 102072 },
    { uf: 'Minas Gerais', uhTotal: 111565, uhAdaptadas: 2666, leitosTotal: 255131, leitosSimples: 114425, leitosDuplos: 140706 },
    { uf: 'Espírito Santo', uhTotal: 23410, uhAdaptadas: 443, leitosTotal: 54727, leitosSimples: 25637, leitosDuplos: 29090 },
    { uf: 'Rio de Janeiro', uhTotal: 92340, uhAdaptadas: 2414, leitosTotal: 221121, leitosSimples: 88203, leitosDuplos: 132918 },
    { uf: 'São Paulo', uhTotal: 215674, uhAdaptadas: 4633, leitosTotal: 507412, leitosSimples: 206502, leitosDuplos: 300910 },
    { uf: 'Paraná', uhTotal: 63257, uhAdaptadas: 1287, leitosTotal: 144694, leitosSimples: 64420, leitosDuplos: 80274 },
    { uf: 'Santa Catarina', uhTotal: 56573, uhAdaptadas: 1005, leitosTotal: 146837, leitosSimples: 70313, leitosDuplos: 76524 },
    { uf: 'Rio Grande do Sul', uhTotal: 61365, uhAdaptadas: 1311, leitosTotal: 143286, leitosSimples: 59926, leitosDuplos: 83360 },
    { uf: 'Mato Grosso do Sul', uhTotal: 19363, uhAdaptadas: 511, leitosTotal: 47426, leitosSimples: 23912, leitosDuplos: 23514 },
    { uf: 'Mato Grosso', uhTotal: 25146, uhAdaptadas: 585, leitosTotal: 57814, leitosSimples: 28304, leitosDuplos: 29510 },
    { uf: 'Goiás', uhTotal: 46224, uhAdaptadas: 1155, leitosTotal: 116925, leitosSimples: 51639, leitosDuplos: 65286 },
    { uf: 'Distrito Federal', uhTotal: 17998, uhAdaptadas: 479, leitosTotal: 39424, leitosSimples: 15020, leitosDuplos: 24404 },
  ]

  for (const d of t3Data) {
    await prisma.uHLeitosUF.create({ data: d })
  }
  console.log('✅ Tabela 3 - UH e Leitos UF')

  // ====== TABELA 4 - Capitais ======
  const t4Data = [
    { capital: 'Porto Velho', estabelecimentos: 94, uhTotal: 2979, uhAdaptadas: 72, leitosTotal: 6828, leitosSimples: 2382, leitosDuplos: 4446 },
    { capital: 'Rio Branco', estabelecimentos: 49, uhTotal: 1742, uhAdaptadas: 59, leitosTotal: 3814, leitosSimples: 1388, leitosDuplos: 2426 },
    { capital: 'Manaus', estabelecimentos: 164, uhTotal: 8449, uhAdaptadas: 237, leitosTotal: 18561, leitosSimples: 5807, leitosDuplos: 12754 },
    { capital: 'Boa Vista', estabelecimentos: 39, uhTotal: 1118, uhAdaptadas: 7, leitosTotal: 2431, leitosSimples: 865, leitosDuplos: 1566 },
    { capital: 'Belém', estabelecimentos: 141, uhTotal: 6874, uhAdaptadas: 222, leitosTotal: 15101, leitosSimples: 4839, leitosDuplos: 10262 },
    { capital: 'Macapá', estabelecimentos: 36, uhTotal: 1364, uhAdaptadas: 41, leitosTotal: 2910, leitosSimples: 928, leitosDuplos: 1982 },
    { capital: 'Palmas', estabelecimentos: 72, uhTotal: 2528, uhAdaptadas: 58, leitosTotal: 5468, leitosSimples: 2628, leitosDuplos: 2840 },
    { capital: 'São Luís', estabelecimentos: 123, uhTotal: 5694, uhAdaptadas: 106, leitosTotal: 12443, leitosSimples: 4595, leitosDuplos: 7848 },
    { capital: 'Teresina', estabelecimentos: 118, uhTotal: 3703, uhAdaptadas: 198, leitosTotal: 8110, leitosSimples: 2706, leitosDuplos: 5404 },
    { capital: 'Fortaleza', estabelecimentos: 323, uhTotal: 13144, uhAdaptadas: 202, leitosTotal: 30733, leitosSimples: 12863, leitosDuplos: 17870 },
    { capital: 'Natal', estabelecimentos: 224, uhTotal: 11085, uhAdaptadas: 366, leitosTotal: 28370, leitosSimples: 11056, leitosDuplos: 17314 },
    { capital: 'João Pessoa', estabelecimentos: 125, uhTotal: 5673, uhAdaptadas: 184, leitosTotal: 12410, leitosSimples: 5398, leitosDuplos: 7012 },
    { capital: 'Recife', estabelecimentos: 165, uhTotal: 8425, uhAdaptadas: 140, leitosTotal: 18929, leitosSimples: 8541, leitosDuplos: 10388 },
    { capital: 'Maceió', estabelecimentos: 157, uhTotal: 7707, uhAdaptadas: 324, leitosTotal: 17674, leitosSimples: 6970, leitosDuplos: 10704 },
    { capital: 'Aracaju', estabelecimentos: 125, uhTotal: 5797, uhAdaptadas: 199, leitosTotal: 13287, leitosSimples: 5523, leitosDuplos: 7764 },
    { capital: 'Salvador', estabelecimentos: 363, uhTotal: 16319, uhAdaptadas: 207, leitosTotal: 35104, leitosSimples: 11264, leitosDuplos: 23840 },
    { capital: 'Belo Horizonte', estabelecimentos: 334, uhTotal: 17429, uhAdaptadas: 446, leitosTotal: 35440, leitosSimples: 12676, leitosDuplos: 22764 },
    { capital: 'Vitória', estabelecimentos: 45, uhTotal: 3860, uhAdaptadas: 81, leitosTotal: 8010, leitosSimples: 3372, leitosDuplos: 4638 },
    { capital: 'Rio de Janeiro', estabelecimentos: 546, uhTotal: 38244, uhAdaptadas: 835, leitosTotal: 83070, leitosSimples: 33108, leitosDuplos: 49962 },
    { capital: 'São Paulo', estabelecimentos: 1125, uhTotal: 61068, uhAdaptadas: 779, leitosTotal: 124794, leitosSimples: 36822, leitosDuplos: 87972 },
    { capital: 'Curitiba', estabelecimentos: 237, uhTotal: 12512, uhAdaptadas: 257, leitosTotal: 25891, leitosSimples: 10997, leitosDuplos: 14894 },
    { capital: 'Florianópolis', estabelecimentos: 311, uhTotal: 11242, uhAdaptadas: 170, leitosTotal: 30844, leitosSimples: 15686, leitosDuplos: 15158 },
    { capital: 'Porto Alegre', estabelecimentos: 199, uhTotal: 11031, uhAdaptadas: 177, leitosTotal: 22492, leitosSimples: 8408, leitosDuplos: 14084 },
    { capital: 'Campo Grande', estabelecimentos: 129, uhTotal: 4744, uhAdaptadas: 123, leitosTotal: 10786, leitosSimples: 4408, leitosDuplos: 6378 },
    { capital: 'Cuiabá', estabelecimentos: 94, uhTotal: 4283, uhAdaptadas: 93, leitosTotal: 9374, leitosSimples: 4462, leitosDuplos: 4912 },
    { capital: 'Goiânia', estabelecimentos: 174, uhTotal: 8420, uhAdaptadas: 163, leitosTotal: 17054, leitosSimples: 7380, leitosDuplos: 9674 },
    { capital: 'Brasília', estabelecimentos: 279, uhTotal: 17998, uhAdaptadas: 479, leitosTotal: 39424, leitosSimples: 15020, leitosDuplos: 24404 },
  ]

  for (const d of t4Data) {
    await prisma.capitais.create({ data: d })
  }
  console.log('✅ Tabela 4 - Capitais')

  // ====== TABELA 6 - Categorias ======
  const t6Data = [
    { uf: 'Brasil', total: 17011, luxo: 666, superior: 1699, turistico: 6284, economico: 5626, simples: 2736 },
    { uf: 'Rondônia', total: 162, luxo: 0, superior: 15, turistico: 52, economico: 54, simples: 0 },
    { uf: 'Acre', total: 65, luxo: 0, superior: 5, turistico: 25, economico: 26, simples: 9 },
    { uf: 'Amazonas', total: 154, luxo: 8, superior: 15, turistico: 45, economico: 61, simples: 25 },
    { uf: 'Roraima', total: 35, luxo: 0, superior: 3, turistico: 7, economico: 14, simples: 11 },
    { uf: 'Pará', total: 381, luxo: 8, superior: 30, turistico: 125, economico: 147, simples: 71 },
    { uf: 'Amapá', total: 49, luxo: 0, superior: 3, turistico: 14, economico: 23, simples: 0 },
    { uf: 'Tocantins', total: 134, luxo: 7, superior: 8, turistico: 58, economico: 41, simples: 20 },
    { uf: 'Maranhão', total: 246, luxo: 9, superior: 23, turistico: 79, economico: 91, simples: 44 },
    { uf: 'Piauí', total: 161, luxo: 8, superior: 15, turistico: 58, economico: 53, simples: 27 },
    { uf: 'Ceará', total: 544, luxo: 16, superior: 45, turistico: 235, economico: 172, simples: 76 },
    { uf: 'Rio Grande do Norte', total: 361, luxo: 19, superior: 39, turistico: 154, economico: 80, simples: 69 },
    { uf: 'Paraíba', total: 191, luxo: 6, superior: 17, turistico: 64, economico: 60, simples: 44 },
    { uf: 'Pernambuco', total: 609, luxo: 25, superior: 54, turistico: 227, economico: 197, simples: 106 },
    { uf: 'Alagoas', total: 256, luxo: 10, superior: 19, turistico: 99, economico: 94, simples: 34 },
    { uf: 'Sergipe', total: 157, luxo: 6, superior: 12, turistico: 53, economico: 52, simples: 34 },
    { uf: 'Bahia', total: 1264, luxo: 48, superior: 120, turistico: 503, economico: 384, simples: 209 },
    { uf: 'Minas Gerais', total: 2134, luxo: 83, superior: 214, turistico: 766, economico: 686, simples: 385 },
    { uf: 'Espírito Santo', total: 358, luxo: 10, superior: 27, turistico: 137, economico: 133, simples: 51 },
    { uf: 'Rio de Janeiro', total: 1630, luxo: 61, superior: 181, turistico: 692, economico: 472, simples: 224 },
    { uf: 'São Paulo', total: 3522, luxo: 134, superior: 358, turistico: 1206, economico: 1184, simples: 640 },
    { uf: 'Paraná', total: 963, luxo: 48, superior: 107, turistico: 304, economico: 368, simples: 136 },
    { uf: 'Santa Catarina', total: 947, luxo: 28, superior: 131, turistico: 422, economico: 294, simples: 72 },
    { uf: 'Rio Grande do Sul', total: 1035, luxo: 51, superior: 126, turistico: 404, economico: 336, simples: 118 },
    { uf: 'Mato Grosso do Sul', total: 368, luxo: 17, superior: 24, turistico: 138, economico: 131, simples: 58 },
    { uf: 'Mato Grosso', total: 453, luxo: 15, superior: 36, turistico: 170, economico: 170, simples: 62 },
    { uf: 'Goiás', total: 656, luxo: 31, superior: 55, turistico: 207, economico: 244, simples: 119 },
    { uf: 'Distrito Federal', total: 176, luxo: 12, superior: 17, turistico: 40, economico: 59, simples: 48 },
  ]

  for (const d of t6Data) {
    await prisma.estabPorCategoria.create({ data: d })
  }
  console.log('✅ Tabela 6 - Categorias')

  // ====== TABELA 7 - Características ======
  const t7Data = [
    { uf: 'Brasil', total: 17011, independentes: 15687, cadeiaNacional: 1048, cadeiaInternacional: 276 },
    { uf: 'Rondônia', total: 162, independentes: 153, cadeiaNacional: 9, cadeiaInternacional: 0 },
    { uf: 'Acre', total: 65, independentes: 60, cadeiaNacional: 0, cadeiaInternacional: 0 },
    { uf: 'Amazonas', total: 154, independentes: 142, cadeiaNacional: 8, cadeiaInternacional: 4 },
    { uf: 'Roraima', total: 35, independentes: 35, cadeiaNacional: 0, cadeiaInternacional: 0 },
    { uf: 'Pará', total: 381, independentes: 354, cadeiaNacional: 21, cadeiaInternacional: 6 },
    { uf: 'Amapá', total: 49, independentes: 46, cadeiaNacional: 0, cadeiaInternacional: 0 },
    { uf: 'Tocantins', total: 134, independentes: 129, cadeiaNacional: 5, cadeiaInternacional: 0 },
    { uf: 'Maranhão', total: 246, independentes: 228, cadeiaNacional: 15, cadeiaInternacional: 3 },
    { uf: 'Piauí', total: 161, independentes: 136, cadeiaNacional: 0, cadeiaInternacional: 0 },
    { uf: 'Ceará', total: 544, independentes: 510, cadeiaNacional: 28, cadeiaInternacional: 6 },
    { uf: 'Rio Grande do Norte', total: 361, independentes: 328, cadeiaNacional: 29, cadeiaInternacional: 4 },
    { uf: 'Paraíba', total: 191, independentes: 164, cadeiaNacional: 22, cadeiaInternacional: 5 },
    { uf: 'Pernambuco', total: 609, independentes: 556, cadeiaNacional: 42, cadeiaInternacional: 11 },
    { uf: 'Alagoas', total: 256, independentes: 233, cadeiaNacional: 16, cadeiaInternacional: 7 },
    { uf: 'Sergipe', total: 157, independentes: 147, cadeiaNacional: 7, cadeiaInternacional: 3 },
    { uf: 'Bahia', total: 1264, independentes: 1173, cadeiaNacional: 74, cadeiaInternacional: 17 },
    { uf: 'Minas Gerais', total: 2134, independentes: 2001, cadeiaNacional: 117, cadeiaInternacional: 16 },
    { uf: 'Espírito Santo', total: 358, independentes: 339, cadeiaNacional: 11, cadeiaInternacional: 8 },
    { uf: 'Rio de Janeiro', total: 1630, independentes: 1491, cadeiaNacional: 98, cadeiaInternacional: 41 },
    { uf: 'São Paulo', total: 3522, independentes: 3243, cadeiaNacional: 204, cadeiaInternacional: 75 },
    { uf: 'Paraná', total: 963, independentes: 859, cadeiaNacional: 80, cadeiaInternacional: 24 },
    { uf: 'Santa Catarina', total: 947, independentes: 866, cadeiaNacional: 64, cadeiaInternacional: 17 },
    { uf: 'Rio Grande do Sul', total: 1035, independentes: 939, cadeiaNacional: 80, cadeiaInternacional: 16 },
    { uf: 'Mato Grosso do Sul', total: 368, independentes: 348, cadeiaNacional: 16, cadeiaInternacional: 4 },
    { uf: 'Mato Grosso', total: 453, independentes: 429, cadeiaNacional: 21, cadeiaInternacional: 3 },
    { uf: 'Goiás', total: 656, independentes: 618, cadeiaNacional: 0, cadeiaInternacional: 0 },
    { uf: 'Distrito Federal', total: 176, independentes: 160, cadeiaNacional: 0, cadeiaInternacional: 0 },
  ]

  for (const d of t7Data) {
    await prisma.estabPorCaracteristica.create({ data: d })
  }
  console.log('✅ Tabela 7 - Características')

  // ====== TABELA 10 - Localização ======
  const t10Data = [
    { uf: 'Brasil', total: 17033, urbanaCentro: 7272, urbanaFora: 6085, orlaMaritima: 2194, zonaRural: 1482 },
    { uf: 'Rondônia', total: 162, urbanaCentro: 74, urbanaFora: 78, orlaMaritima: 0, zonaRural: 10 },
    { uf: 'Acre', total: 65, urbanaCentro: 41, urbanaFora: 23, orlaMaritima: 0, zonaRural: 0 },
    { uf: 'Amazonas', total: 154, urbanaCentro: 86, urbanaFora: 46, orlaMaritima: 0, zonaRural: 0 },
    { uf: 'Roraima', total: 35, urbanaCentro: 12, urbanaFora: 0, orlaMaritima: 0, zonaRural: 0 },
    { uf: 'Pará', total: 381, urbanaCentro: 227, urbanaFora: 123, orlaMaritima: 19, zonaRural: 12 },
    { uf: 'Amapá', total: 49, urbanaCentro: 29, urbanaFora: 0, orlaMaritima: 0, zonaRural: 0 },
    { uf: 'Tocantins', total: 134, urbanaCentro: 80, urbanaFora: 46, orlaMaritima: 0, zonaRural: 0 },
    { uf: 'Maranhão', total: 246, urbanaCentro: 111, urbanaFora: 99, orlaMaritima: 26, zonaRural: 10 },
    { uf: 'Piauí', total: 161, urbanaCentro: 52, urbanaFora: 91, orlaMaritima: 7, zonaRural: 11 },
    { uf: 'Ceará', total: 544, urbanaCentro: 139, urbanaFora: 168, orlaMaritima: 194, zonaRural: 43 },
    { uf: 'Rio Grande do Norte', total: 361, urbanaCentro: 90, urbanaFora: 95, orlaMaritima: 153, zonaRural: 23 },
    { uf: 'Paraíba', total: 191, urbanaCentro: 56, urbanaFora: 53, orlaMaritima: 69, zonaRural: 13 },
    { uf: 'Pernambuco', total: 609, urbanaCentro: 177, urbanaFora: 234, orlaMaritima: 156, zonaRural: 42 },
    { uf: 'Alagoas', total: 256, urbanaCentro: 50, urbanaFora: 83, orlaMaritima: 102, zonaRural: 21 },
    { uf: 'Sergipe', total: 157, urbanaCentro: 39, urbanaFora: 56, orlaMaritima: 47, zonaRural: 15 },
    { uf: 'Bahia', total: 1266, urbanaCentro: 523, urbanaFora: 326, orlaMaritima: 355, zonaRural: 62 },
    { uf: 'Minas Gerais', total: 2134, urbanaCentro: 1085, urbanaFora: 759, orlaMaritima: 0, zonaRural: 290 },
    { uf: 'Espírito Santo', total: 358, urbanaCentro: 147, urbanaFora: 97, orlaMaritima: 78, zonaRural: 36 },
    { uf: 'Rio de Janeiro', total: 1631, urbanaCentro: 546, urbanaFora: 568, orlaMaritima: 397, zonaRural: 120 },
    { uf: 'São Paulo', total: 3529, urbanaCentro: 1465, urbanaFora: 1400, orlaMaritima: 271, zonaRural: 393 },
    { uf: 'Paraná', total: 965, urbanaCentro: 510, urbanaFora: 355, orlaMaritima: 24, zonaRural: 76 },
    { uf: 'Santa Catarina', total: 952, urbanaCentro: 386, urbanaFora: 262, orlaMaritima: 254, zonaRural: 50 },
    { uf: 'Rio Grande do Sul', total: 1037, urbanaCentro: 516, urbanaFora: 423, orlaMaritima: 36, zonaRural: 62 },
    { uf: 'Mato Grosso do Sul', total: 368, urbanaCentro: 191, urbanaFora: 140, orlaMaritima: 0, zonaRural: 37 },
    { uf: 'Mato Grosso', total: 454, urbanaCentro: 244, urbanaFora: 161, orlaMaritima: 0, zonaRural: 49 },
    { uf: 'Goiás', total: 658, urbanaCentro: 295, urbanaFora: 296, orlaMaritima: 0, zonaRural: 67 },
    { uf: 'Distrito Federal', total: 176, urbanaCentro: 101, urbanaFora: 65, orlaMaritima: 0, zonaRural: 10 },
  ]

  for (const d of t10Data) {
    await prisma.estabPorLocalizacao.create({ data: d })
  }
  console.log('✅ Tabela 10 - Localização')

  // ====== QUIZ CATEGORIES ======
  const cats = await Promise.all([
    prisma.quizCategory.create({ data: { name: 'Hospedagem no Brasil', description: 'Dados gerais sobre estabelecimentos de hospedagem no país', icon: 'Building2', color: '#10b981', order: 1 } }),
    prisma.quizCategory.create({ data: { name: 'Tipos de Estabelecimentos', description: 'Hotéis, pousadas, motéis e demais tipos', icon: 'Hotel', color: '#f59e0b', order: 2 } }),
    prisma.quizCategory.create({ data: { name: 'Capacidade e Leitos', description: 'Unidades habitacionais e capacidade de hospedagem', icon: 'Bed', color: '#06b6d4', order: 3 } }),
    prisma.quizCategory.create({ data: { name: 'Categorias e Classificação', description: 'Luxo, superior, turístico, econômico e simples', icon: 'Star', color: '#8b5cf6', order: 4 } }),
    prisma.quizCategory.create({ data: { name: 'Redes e Cadeias', description: 'Estabelecimentos independentes e cadeias hoteleiras', icon: 'Link', color: '#ec4899', order: 5 } }),
    prisma.quizCategory.create({ data: { name: 'Localização Geográfica', description: 'Distribuição por zona urbana, orla marítima e rural', icon: 'MapPin', color: '#22c55e', order: 6 } }),
  ])
  console.log('✅ Quiz Categories')

  // ====== QUIZ QUESTIONS ======
  const questions = [
    // Category 1 - Hospedagem no Brasil
    { categoryId: cats[0].id, question: 'Quantos estabelecimentos de hospedagem o Brasil possuía em 2016?', optionA: '21.500', optionB: '31.299', optionC: '41.000', optionD: '25.800', correctAnswer: 'B', explanation: 'Segundo a Pesquisa de Serviços de Hospedagem do IBGE 2016, o Brasil possuía 31.299 estabelecimentos de hospedagem.', difficulty: 'easy', order: 1 },
    { categoryId: cats[0].id, question: 'Qual região possuía o maior número de estabelecimentos de hospedagem em 2016?', optionA: 'Nordeste', optionB: 'Sudeste', optionC: 'Sul', optionD: 'Norte', correctAnswer: 'B', explanation: 'O Sudeste liderava com São Paulo (5.858), Rio de Janeiro (2.680) e Minas Gerais (3.867), totalizando a maior concentração do país.', difficulty: 'easy', order: 2 },
    { categoryId: cats[0].id, question: 'Qual estado tinha menos estabelecimentos de hospedagem em 2016?', optionA: 'Acre', optionB: 'Roraima', optionC: 'Amapá', optionD: 'Tocantins', correctAnswer: 'B', explanation: 'Roraima tinha apenas 60 estabelecimentos de hospedagem, a menor quantidade entre todos os estados.', difficulty: 'medium', order: 3 },
    { categoryId: cats[0].id, question: 'Em 2016, o Brasil possuía quantos leitos no total?', optionA: '1.507.892', optionB: '2.407.892', optionC: '3.000.000', optionD: '1.800.000', correctAnswer: 'B', explanation: 'O Brasil possuía 2.407.892 leitos em estabelecimentos de hospedagem segundo o IBGE 2016.', difficulty: 'medium', order: 4 },
    { categoryId: cats[0].id, question: 'Quantas unidades habitacionais adaptadas existiam no Brasil em 2016?', optionA: '45.543', optionB: '12.000', optionC: '22.543', optionD: '8.300', correctAnswer: 'C', explanation: 'O Brasil possuía 22.543 unidades habitacionais adaptadas para pessoas com deficiência em 2016.', difficulty: 'hard', order: 5 },

    // Category 2 - Tipos
    { categoryId: cats[1].id, question: 'Qual tipo de estabelecimento era o mais comum no Brasil em 2016?', optionA: 'Pousadas', optionB: 'Hotéis', optionC: 'Motéis', optionD: 'Hostels', correctAnswer: 'B', explanation: 'Os hotéis eram o tipo mais comum com 15.005 estabelecimentos, representando quase metade do total.', difficulty: 'easy', order: 1 },
    { categoryId: cats[1].id, question: 'Quantos hostels/albergues turísticos existiam no Brasil em 2016?', optionA: '480', optionB: '320', optionC: '1.200', optionD: '75', correctAnswer: 'A', explanation: 'Havia 480 hostels/albergues turísticos registrados no Brasil em 2016.', difficulty: 'medium', order: 2 },
    { categoryId: cats[1].id, question: 'O estado da Bahia possuía mais pousadas do que hotéis em 2016?', optionA: 'Sim, 1.275 pousadas contra 972 hotéis', optionB: 'Não, hotéis eram maioria', optionC: 'Empataram em número', optionD: 'Não havia pousadas na Bahia', correctAnswer: 'A', explanation: 'Na Bahia, pousadas (1.275) superavam hotéis (972), refletindo a forte vocação turística do estado.', difficulty: 'medium', order: 3 },
    { categoryId: cats[1].id, question: 'Qual estado possuía mais apart-hotéis/flats em 2016?', optionA: 'São Paulo', optionB: 'Rio de Janeiro', optionC: 'Minas Gerais', optionD: 'Bahia', correctAnswer: 'A', explanation: 'São Paulo liderava com 135 apart-hotéis/flats, seguido pelo Rio de Janeiro com 33.', difficulty: 'hard', order: 4 },
    { categoryId: cats[1].id, question: 'Quantos motéis existiam no Brasil em 2016?', optionA: '2.100', optionB: '4.460', optionC: '3.500', optionD: '1.800', correctAnswer: 'B', explanation: 'O Brasil possuía 4.460 motéis em 2016, sendo o terceiro tipo mais comum de estabelecimento.', difficulty: 'medium', order: 5 },

    // Category 3 - Capacidade e Leitos
    { categoryId: cats[2].id, question: 'Quantas unidades habitacionais o Brasil possuía em 2016?', optionA: '500.000', optionB: '1.011.254', optionC: '750.000', optionD: '2.000.000', correctAnswer: 'B', explanation: 'O Brasil possuía 1.011.254 unidades habitacionais em estabelecimentos de hospedagem em 2016.', difficulty: 'easy', order: 1 },
    { categoryId: cats[2].id, question: 'Qual capital possuía mais leitos em 2016?', optionA: 'Rio de Janeiro', optionB: 'São Paulo', optionC: 'Salvador', optionD: 'Brasília', correctAnswer: 'B', explanation: 'São Paulo possuía 124.794 leitos, seguido pelo Rio de Janeiro com 83.070.', difficulty: 'easy', order: 2 },
    { categoryId: cats[2].id, question: 'No Brasil, leitos duplos eram mais numerosos que leitos simples?', optionA: 'Sim, 1.376.692 contra 1.031.200', optionB: 'Não, leitos simples eram mais', optionC: 'Eram iguais', optionD: 'Não há dados de leitos simples', correctAnswer: 'A', explanation: 'Leitos duplos (1.376.692) superavam leitos simples (1.031.200), mostrando preferência por acomodações para casais.', difficulty: 'medium', order: 3 },
    { categoryId: cats[2].id, question: 'Quantos estabelecimentos com 100 ou mais UHs existiam no Brasil?', optionA: '500', optionB: '1.526', optionC: '3.000', optionD: '800', correctAnswer: 'B', explanation: '1.526 estabelecimentos possuíam 100 ou mais unidades habitacionais em 2016.', difficulty: 'hard', order: 4 },
    { categoryId: cats[2].id, question: 'Qual estado tinha mais unidades habitacionais em 2016?', optionA: 'Rio de Janeiro', optionB: 'Minas Gerais', optionC: 'São Paulo', optionD: 'Bahia', correctAnswer: 'C', explanation: 'São Paulo liderava com 215.674 unidades habitacionais, seguido por Minas Gerais com 111.565.', difficulty: 'easy', order: 5 },

    // Category 4 - Categorias
    { categoryId: cats[3].id, question: 'Qual era a categoria mais comum entre os estabelecimentos com 5+ funcionários?', optionA: 'Luxo', optionB: 'Econômico', optionC: 'Turístico', optionD: 'Simples', correctAnswer: 'C', explanation: 'A categoria turístico/médio conforto era a mais comum com 6.284 estabelecimentos.', difficulty: 'easy', order: 1 },
    { categoryId: cats[3].id, question: 'Quantos hotéis de luxo existiam no Brasil em 2016?', optionA: '666', optionB: '1.200', optionC: '350', optionD: '89', correctAnswer: 'A', explanation: 'Havia 666 estabelecimentos de categoria luxo no Brasil em 2016.', difficulty: 'medium', order: 2 },
    { categoryId: cats[3].id, question: 'Qual estado possuía mais hotéis de luxo em 2016?', optionA: 'Rio de Janeiro', optionB: 'São Paulo', optionC: 'Bahia', optionD: 'Minas Gerais', correctAnswer: 'B', explanation: 'São Paulo liderava com 134 estabelecimentos de luxo, seguido por Rio de Janeiro (61) e Minas Gerais (83).', difficulty: 'medium', order: 3 },
    { categoryId: cats[3].id, question: 'Na categoria econômico, qual estado liderava em número de estabelecimentos?', optionA: 'Bahia', optionB: 'São Paulo', optionC: 'Minas Gerais', optionD: 'Rio de Janeiro', correctAnswer: 'B', explanation: 'São Paulo liderava na categoria econômico com 1.184 estabelecimentos, seguido por Minas Gerais com 686.', difficulty: 'hard', order: 4 },
    { categoryId: cats[3].id, question: 'Estabelecimentos de categoria simples representavam quantos do total?', optionA: '1.500', optionB: '5.626', optionC: '2.736', optionD: '4.000', correctAnswer: 'C', explanation: '2.736 estabelecimentos eram classificados como categoria simples em 2016.', difficulty: 'medium', order: 5 },

    // Category 5 - Redes e Cadeias
    { categoryId: cats[4].id, question: 'Qual porcentagem dos estabelecimentos era independente em 2016?', optionA: '50%', optionB: '72%', optionC: '92%', optionD: '85%', correctAnswer: 'C', explanation: '15.687 de 17.011 estabelecimentos eram independentes, representando cerca de 92% do total.', difficulty: 'medium', order: 1 },
    { categoryId: cats[4].id, question: 'Quantos estabelecimentos integravam cadeias internacionais de hotéis?', optionA: '276', optionB: '500', optionC: '1.048', optionD: '150', correctAnswer: 'A', explanation: '276 estabelecimentos integravam cadeias internacionais de hotéis em 2016.', difficulty: 'easy', order: 2 },
    { categoryId: cats[4].id, question: 'Qual estado possuía mais estabelecimentos de cadeias internacionais?', optionA: 'Rio de Janeiro', optionB: 'São Paulo', optionC: 'Bahia', optionD: 'Minas Gerais', correctAnswer: 'B', explanation: 'São Paulo liderava com 75 estabelecimentos de cadeias internacionais, seguido por Rio de Janeiro com 41.', difficulty: 'hard', order: 3 },
    { categoryId: cats[4].id, question: 'Quantos estabelecimentos faziam parte de cadeias nacionais?', optionA: '2.500', optionB: '500', optionC: '1.048', optionD: '3.200', correctAnswer: 'C', explanation: '1.048 estabelecimentos integravam cadeias nacionais de hotéis em 2016.', difficulty: 'medium', order: 4 },
    { categoryId: cats[4].id, question: 'Em Roraima, todos os estabelecimentos eram independentes?', optionA: 'Sim, 100% independentes', optionB: 'Não, havia cadeias nacionais', optionC: 'Não, havia cadeias internacionais', optionD: 'Havia tanto nacionais quanto internacionais', correctAnswer: 'A', explanation: 'Roraima possuía 35 estabelecimentos, todos independentes, sem nenhuma cadeia nacional ou internacional.', difficulty: 'hard', order: 5 },

    // Category 6 - Localização
    { categoryId: cats[5].id, question: 'A maioria dos estabelecimentos estava localizada em qual zona?', optionA: 'Zona urbana/centro', optionB: 'Zona urbana/fora do centro', optionC: 'Orla marítima', optionD: 'Zona rural', correctAnswer: 'A', explanation: '7.272 estabelecimentos estavam na zona urbana/centro da cidade, a localização mais comum.', difficulty: 'easy', order: 1 },
    { categoryId: cats[5].id, question: 'Quantos estabelecimentos estavam localizados em orla marítima/praia/ilha?', optionA: '500', optionB: '2.194', optionC: '4.000', optionD: '1.000', correctAnswer: 'B', explanation: '2.194 estabelecimentos estavam localizados em orla marítima/praia/ilha, concentrados principalmente no Nordeste.', difficulty: 'medium', order: 2 },
    { categoryId: cats[5].id, question: 'Qual estado tinha mais estabelecimentos em zona rural/reserva ambiental?', optionA: 'Minas Gerais', optionB: 'São Paulo', optionC: 'Goiás', optionD: 'Mato Grosso', correctAnswer: 'B', explanation: 'São Paulo liderava com 393 estabelecimentos em zona rural, seguido por Minas Gerais com 290.', difficulty: 'hard', order: 3 },
    { categoryId: cats[5].id, question: 'No Ceará, qual localização era mais comum para estabelecimentos?', optionA: 'Urbana/centro', optionB: 'Urbana/fora do centro', optionC: 'Orla marítima', optionD: 'Zona rural', correctAnswer: 'C', explanation: 'No Ceará, 194 estabelecimentos estavam em orla marítima, seguido por urbana/fora do centro (168) e urbana/centro (139).', difficulty: 'hard', order: 4 },
    { categoryId: cats[5].id, question: 'Minas Gerais tinha estabelecimentos em orla marítima em 2016?', optionA: 'Sim, mais de 100', optionB: 'Sim, poucos', optionC: 'Não, zero estabelecimentos', optionD: 'Sim, cerca de 50', correctAnswer: 'C', explanation: 'Minas Gerais, por ser um estado sem litoral, tinha zero estabelecimentos em orla marítima/praia/ilha.', difficulty: 'easy', order: 5 },
  ]

  for (const q of questions) {
    await prisma.quizQuestion.create({ data: q })
  }
  console.log('✅ Quiz Questions (30)')

  // ====== CURIOSITIES ======
  const curiosities = [
    { title: 'São Paulo: O Gigante da Hospedagem', content: 'São Paulo possuía 5.858 estabelecimentos de hospedagem em 2016 — quase 19% de todo o Brasil. Só a capital paulista tinha mais leitos (124.794) que muitos estados inteiros.', category: 'Hospedagem', icon: 'Trophy', source: 'IBGE PSH 2016', order: 1 },
    { title: '92% dos Hotéis são Independentes', content: 'Dos 17.011 estabelecimentos com 5+ funcionários, 15.687 eram independentes. Apenas 276 integravam cadeias internacionais — mostrando que o mercado brasileiro é dominado por negócios locais.', category: 'Redes', icon: 'Store', source: 'IBGE PSH 2016', order: 2 },
    { title: 'O Paradoxo da Bahia', content: 'A Bahia possuía mais pousadas (1.275) do que hotéis (972), um padrão único entre os grandes estados. Isso reflete a forte vocação para turismo de experiência e hospedagem mais aconchegante.', category: 'Tipos', icon: 'Lightbulb', source: 'IBGE PSH 2016', order: 3 },
    { title: 'Roraima: O Menor Mercado', content: 'Com apenas 60 estabelecimentos de hospedagem e todos independentes, Roraima era o estado com menor infraestrutura hoteleira do Brasil em 2016.', category: 'Hospedagem', icon: 'MapPin', source: 'IBGE PSH 2016', order: 4 },
    { title: '1 Milhão de Quartos', content: 'O Brasil possuía 1.011.254 unidades habitacionais em hospedagem — mais de 1 milhão de quartos! Colocados em fila, dariam a volta na Terra mais de 6 vezes.', category: 'Capacidade', icon: 'Bed', source: 'IBGE PSH 2016', order: 5 },
    { title: 'O Nordeste é Praia', content: 'Dos 2.194 estabelecimentos em orla marítima no Brasil, a grande maioria estava no Nordeste. Ceará (194), Rio Grande do Norte (153) e Bahia (355) lideravam em hospedagem à beira-mar.', category: 'Localização', icon: 'Waves', source: 'IBGE PSH 2016', order: 6 },
    { title: 'Luxo é para Poucos', content: 'Apenas 666 estabelecimentos (3,9%) eram classificados como luxo. São Paulo concentrava 134 deles — 20% de toda a oferta de luxo do país.', category: 'Categorias', icon: 'Crown', source: 'IBGE PSH 2016', order: 7 },
    { title: 'Motéis: O Terceiro Tipo Mais Comum', content: 'Com 4.460 estabelecimentos, motéis eram o terceiro tipo mais comum no Brasil. São Paulo liderava com 918 motéis — quase 21% do total nacional.', category: 'Tipos', icon: 'Car', source: 'IBGE PSH 2016', order: 8 },
    { title: '2,4 Milhões de Leitos', content: 'O Brasil oferecia 2.407.892 leitos em 2016. Se todos fossem ocupados simultaneamente, seria como se a população de Natal (RN) estivesse hospedada!', category: 'Capacidade', icon: 'Calculator', source: 'IBGE PSH 2016', order: 9 },
    { title: 'Só 2,2% de Quartos Adaptados', content: 'Das 1.011.254 unidades habitacionais, apenas 22.543 (2,2%) eram adaptadas para pessoas com deficiência — um desafio enorme para a acessibilidade no turismo brasileiro.', category: 'Capacidade', icon: 'Accessibility', source: 'IBGE PSH 2016', order: 10 },
    { title: 'Brasília: Campeã de Grandes Hotéis', content: 'O Distrito Federal tinha 48 estabelecimentos com 100+ UHs em 279 totais (17,2%) — a maior proporção de grandes hotéis entre todos os estados.', category: 'Capacidade', icon: 'Building', source: 'IBGE PSH 2016', order: 11 },
    { title: 'Sem Praia, mas com Rural', content: 'Estados sem litoral como Minas Gerais (290), São Paulo (393) e Goiás (67) compensavam com estabelecimentos em zona rural e reservas ambientais, oferecendo turismo ecológico.', category: 'Localização', icon: 'TreePine', source: 'IBGE PSH 2016', order: 12 },
    { title: 'Fortaleza: Capital da Hospedagem no NE', content: 'Com 323 estabelecimentos e 30.733 leitos, Fortaleza era a capital nordestina com maior infraestrutura hoteleira em 2016.', category: 'Capitais', icon: 'Sun', source: 'IBGE PSH 2016', order: 13 },
    { title: 'Hostels: Fenômeno Urbano', content: 'Dos 480 hostels do Brasil, 130 estavam no Rio de Janeiro e 85 em São Paulo — as duas cidades mais visitadas por turistas internacionais.', category: 'Tipos', icon: 'Users', source: 'IBGE PSH 2016', order: 14 },
    { title: 'Leitos Duplos Dominam', content: 'Leitos duplos (1.376.692) superavam os simples (1.031.200) em todo o Brasil — uma proporção de 57% vs 43%, mostrando foco em casais e famílias.', category: 'Capacidade', icon: 'Heart', source: 'IBGE PSH 2016', order: 15 },
    { title: 'Santa Catarina: Diversidade', content: 'SC tinha 71 apart-hotéis, 657 pousadas e 798 hotéis — uma das distribuições mais equilibradas entre tipos, refletindo turismo diversificado.', category: 'Tipos', icon: 'Scale', source: 'IBGE PSH 2016', order: 16 },
    { title: 'A Cadena Hoteleira Paulista', content: 'São Paulo concentrava 204 dos 1.048 estabelecimentos de cadeias nacionais (19,5%) e 75 dos 276 de cadeias internacionais (27,2%).', category: 'Redes', icon: 'Network', source: 'IBGE PSH 2016', order: 17 },
    { title: 'Pequenos Predominam', content: 'Dos 31.299 estabelecimentos, apenas 4.830 (15,4%) tinham 50 ou mais unidades habitacionais. A maioria era de pequeno porte com 10 a 29 UHs.', category: 'Capacidade', icon: 'BarChart3', source: 'IBGE PSH 2016', order: 18 },
    { title: 'Natal: Capital Adaptada', content: 'Natal (RN) possuía 366 unidades habitacionais adaptadas — a maior proporção entre as capitais nordestinas, mostrando compromisso com acessibilidade.', category: 'Capitais', icon: 'ShieldCheck', source: 'IBGE PSH 2016', order: 19 },
    { title: 'Turístico: A Categoria Média', content: '6.284 estabelecimentos eram classificados como turístico/médio conforto — a categoria mais comum, representando 37% do total com 5+ funcionários.', category: 'Categorias', icon: 'Star', source: 'IBGE PSH 2016', order: 20 },
  ]

  for (const c of curiosities) {
    await prisma.curiosity.create({ data: c })
  }
  console.log('✅ Curiosities (20)')

  // ====== SAMPLE QUIZ ATTEMPTS ======
  const attempts = [
    { userId: maria.id, categoryId: cats[0].id, score: 4, totalQuestions: 5, timeTaken: 120, answers: JSON.stringify([{q:'q1',a:'B'},{q:'q2',a:'B'},{q:'q3',a:'A'},{q:'q4',a:'B'},{q:'q5',a:'C'}]) },
    { userId: joao.id, categoryId: cats[0].id, score: 3, totalQuestions: 5, timeTaken: 180, answers: JSON.stringify([{q:'q1',a:'A'},{q:'q2',a:'B'},{q:'q3',a:'B'},{q:'q4',a:'C'},{q:'q5',a:'C'}]) },
    { userId: ana.id, categoryId: cats[1].id, score: 5, totalQuestions: 5, timeTaken: 90, answers: JSON.stringify([{q:'q1',a:'B'},{q:'q2',a:'A'},{q:'q3',a:'A'},{q:'q4',a:'A'},{q:'q5',a:'B'}]) },
    { userId: carlos.id, categoryId: cats[2].id, score: 3, totalQuestions: 5, timeTaken: 150, answers: JSON.stringify([{q:'q1',a:'B'},{q:'q2',a:'A'},{q:'q3',a:'C'},{q:'q4',a:'B'},{q:'q5',a:'C'}]) },
    { userId: maria.id, categoryId: cats[3].id, score: 4, totalQuestions: 5, timeTaken: 100, answers: JSON.stringify([{q:'q1',a:'C'},{q:'q2',a:'A'},{q:'q3',a:'B'},{q:'q4',a:'B'},{q:'q5',a:'C'}]) },
    { userId: joao.id, categoryId: cats[4].id, score: 2, totalQuestions: 5, timeTaken: 200, answers: JSON.stringify([{q:'q1',a:'B'},{q:'q2',a:'A'},{q:'q3',a:'A'},{q:'q4',a:'A'},{q:'q5',a:'B'}]) },
    { userId: ana.id, categoryId: cats[5].id, score: 5, totalQuestions: 5, timeTaken: 80, answers: JSON.stringify([{q:'q1',a:'A'},{q:'q2',a:'B'},{q:'q3',a:'B'},{q:'q4',a:'C'},{q:'q5',a:'C'}]) },
    { userId: carlos.id, categoryId: cats[0].id, score: 4, totalQuestions: 5, timeTaken: 110, answers: JSON.stringify([{q:'q1',a:'B'},{q:'q2',a:'B'},{q:'q3',a:'B'},{q:'q4',a:'B'},{q:'q5',a:'C'}]) },
  ]

  for (const a of attempts) {
    await prisma.quizAttempt.create({ data: a })
  }
  console.log('✅ Sample Quiz Attempts (8)')

  console.log('🎉 Seed complete!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })

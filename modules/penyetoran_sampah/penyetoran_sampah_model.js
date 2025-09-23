const { STRING, UUIDV4, DECIMAL, DATE, INTEGER } = require("sequelize")
const sequelize = require("../../config/database")

const PenyetoranSampahModel = sequelize.define("penyetoran_sampah", {
  id: {
    type: STRING,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  idJadwalJemput: {
    type: STRING,
    allowNull: true,
  },
  idUser: {
    type: STRING,
    allowNull: false,
  },
  idProdukSampah: {
    type: STRING,
    allowNull: false,
  },
  berat: {
    type: DECIMAL(5,2),
    allowNull: false,
  },
  harga: {
    type: INTEGER,
    allowNull: false,
  },
  // TODO: remove, use createdAt
  tanggal_setor: {
      type: DATE,
      allowNull: true,
  },
}, {
  freezeTableName: true,
})

module.exports = PenyetoranSampahModel
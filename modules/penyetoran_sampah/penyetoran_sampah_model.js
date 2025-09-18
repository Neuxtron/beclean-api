const { STRING, UUIDV4, DECIMAL, DATE } = require("sequelize")
const sequelize = require("../../config/database")
// const JadwalJemputModel = require("../jadwal_jemput/jadwal_jemput_model")
// const ProdukSampahModel = require("../produk_sampah/produk_sampah_model")

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
    allowNull: true,
  },
  idProdukSampah: {
    type: STRING,
    allowNull: false,
  },
  berat: {
    type: DECIMAL(5,2),
    allowNull: false,
  },
  tanggal_setor: {
      type: DATE,
      allowNull: true,
  },
}, {
  freezeTableName: true,
})

// DetailJadwalModel.belongsTo(JadwalJemputModel, { as: "jadwal_jemput", foreignKey: "idJadwalJemput", onDelete: "RESTRICT" })
// DetailJadwalModel.belongsTo(ProdukSampahModel, { as: "produk_sampah", foreignKey: "idProdukSampah", onDelete: "CASCADE" })

module.exports = PenyetoranSampahModel
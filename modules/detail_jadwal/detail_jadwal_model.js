const { STRING, UUIDV4, DECIMAL } = require("sequelize")
const sequelize = require("../../config/database")
const JadwalJemputModel = require("../jadwal_jemput/jadwal_jemput_model")
const ProdukSampahModel = require("../produk_sampah/produk_sampah_model")

const DetailJadwalModel = sequelize.define("detail_jadwal", {
  id: {
    type: STRING,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  idJadwalJemput: {
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
}, {
  freezeTableName: true,
})

// DetailJadwalModel.belongsTo(JadwalJemputModel, { as: "jadwal_jemput", foreignKey: "idJadwalJemput", onDelete: "RESTRICT" })
// DetailJadwalModel.belongsTo(ProdukSampahModel, { as: "produk_sampah", foreignKey: "idProdukSampah", onDelete: "CASCADE" })

module.exports = DetailJadwalModel
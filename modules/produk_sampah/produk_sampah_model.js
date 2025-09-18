const { STRING, UUIDV4, INTEGER } = require("sequelize")
const sequelize = require("../../config/database")
// const DetailJadwalModel = require("../detail_jadwal/detail_jadwal_model")

const ProdukSampahModel = sequelize.define("produk_sampah", {
  id: {
    type: STRING,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  nama: {
    type: STRING,
    allowNull: false,
  },
  harga: {
    type: INTEGER,
    allowNull: false,
  },
  icon: {
    type: STRING,
    allowNull: false,
  },
}, {
  freezeTableName: true,
})

// ProdukSampahModel.hasMany(DetailJadwalModel, { as: "detail_jadwal", foreignKey: "idProdukSampah", onDelete: "CASCADE" })

module.exports = ProdukSampahModel
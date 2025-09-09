const DetailJadwalModel = require("../detail_jadwal/detail_jadwal_model")
const ProdukSampahModel = require("../produk_sampah/produk_sampah_model")
const JadwalJemputModel = require("../jadwal_jemput/jadwal_jemput_model")

function defineAssociations() {
  DetailJadwalModel.belongsTo(JadwalJemputModel, { 
    as: "jadwal_jemput", 
    foreignKey: "idJadwalJemput", 
    onDelete: "RESTRICT" 
  })

  DetailJadwalModel.belongsTo(ProdukSampahModel, { 
    as: "produk_sampah", 
    foreignKey: "idProdukSampah", 
    onDelete: "CASCADE" 
  })

  ProdukSampahModel.hasMany(DetailJadwalModel, { 
    as: "detail_jadwal", 
    foreignKey: "idProdukSampah", 
    onDelete: "CASCADE" 
  })

  JadwalJemputModel.hasMany(DetailJadwalModel, { 
    as: "detail_jadwal", 
    foreignKey: "idJadwalJemput", 
    onDelete: "RESTRICT" 
  })
}

module.exports = { defineAssociations }
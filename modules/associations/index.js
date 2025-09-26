const ProdukSampahModel = require("../produk_sampah/produk_sampah_model")
const JadwalJemputModel = require("../jadwal_jemput/jadwal_jemput_model")
const UserModel = require('../user/user_model')
const PenyetoranSampahModel = require("../penyetoran_sampah/penyetoran_sampah_model")

function defineAssociations() {
  PenyetoranSampahModel.belongsTo(JadwalJemputModel, { 
    as: "jadwal_jemput", 
    foreignKey: "idJadwalJemput", 
    onDelete: "RESTRICT" 
  })

  PenyetoranSampahModel.belongsTo(ProdukSampahModel, { 
    as: "produk_sampah", 
    foreignKey: "idProdukSampah", 
    onDelete: "CASCADE" 
  })

  PenyetoranSampahModel.belongsTo(UserModel, { 
    as: "user", 
    foreignKey: "idUser", 
    onDelete: "CASCADE" 
  })

  ProdukSampahModel.hasMany(PenyetoranSampahModel, { 
    as: "penyetoran_sampah", 
    foreignKey: "idProdukSampah", 
    onDelete: "CASCADE" 
  })

  JadwalJemputModel.hasMany(PenyetoranSampahModel, { 
    as: "penyetoran_sampah", 
    foreignKey: "idJadwalJemput", 
    onDelete: "CASCADE" 
  })

  UserModel.hasMany(PenyetoranSampahModel, { 
    as: "penyetoran_sampah", 
    foreignKey: "idUser", 
    onDelete: "CASCADE" 
  })
}

module.exports = { defineAssociations }
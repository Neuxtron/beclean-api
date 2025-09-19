const log = require("../../utils/log")
const { Op } = require('sequelize');
const ProdukSampahModel = require("../produk_sampah/produk_sampah_model")
const UserModel = require("../user/user_model")
const PenyetoranSampahModel = require("./penyetoran_sampah_model")

    class SetorSampahController {
    //semua data sampah yang di setor langsung
    static async allSetorSampah(req, res) {
        try {
        const setorSampah = await PenyetoranSampahModel.findAll({
          where: {idJadwalJemput : {[Op.is]: null}}
        })
        return res.status(200).json({
            status: true,
            message: "Berhasil mengambil penyetoran sampah secara langsung",
            data: setorSampah,
        })
        } catch (error) {
        log.error(error.message)
        return res.status(500).json({
            status: false,
            message: "Terjadi kesalahan, silahkan coba lagi",
            data: null,
        })
        }
    }

    static async allSetorByIdUser(req, res) {
    try {
        const { idUser: id } = req
        
        const detailSetor = await UserModel.findByPk(id, {
        include: [
           {
              model: PenyetoranSampahModel, as: "penyetoran_sampah",
              include: [{
                model: ProdukSampahModel, as: "produk_sampah" 
              }]
            },
        ]
        })
        
        return res.status(200).json({
        status: true,
        message: "Berhasil mengambil penyetoran sampah secara langsung",
        data: detailSetor,
        })
    } catch (error) {
        log.error(error.message)
        return res.status(500).json({
        status: false,
        message: "Terjadi kesalahan, silahkan coba lagi",
        data: null,
        })
    }
    }

    static async addSetorSampah(req, res) {
    try {
      const data = req.body
      const setorSampah = await PenyetoranSampahModel.create(data)
      return res.status(201).json({
        status: true,
        message: "Berhasil menambahkan penyetoran sampah secara langsung",
        data: setorSampah,
      })
    } catch (error) {
      log.error(error.message)
      return res.status(500).json({
        status: false,
        message: "Terjadi kesalahan, silahkan coba lagi",
        data: null,
      })
    }
  }

  static async editSetorSampah(req, res) {
    try {
      const { id } = req.params
      const data = req.body
      if (data.id) delete data.id
      
      const setorSampah = await PenyetoranSampahModel.findByPk(id)

      if (setorSampah === null) {
        return res.status(404).json({
          status: false,
          message: "Penyetoran sampah tidak ditemukan",
          data: null,
        })
      }

      await setorSampah.update(data)
      return res.status(200).json({
        status: true,
        message: "Berhasil memperbarui penyetoran sampah secara langsung",
        data: setorSampah,
      })
    } catch (error) {
      log.error(error.message)
      return res.status(500).json({
        status: false,
        message: "Terjadi kesalahan, silahkan coba lagi",
        data: null,
      })
    }
  }

  static async removeSetorSampah(req, res) {
    try {
      const { id } = req.params
      const setorSampah = await PenyetoranSampahModel.findByPk(id)

      if (setorSampah === null) {
        return res.status(404).json({
          status: false,
          message: "Penyetoran sampah tidak ditemukan",
          data: null,
        })
      }

      await setorSampah.destroy()
      return res.status(200).json({
        status: true,
        message: "Berhasil menghapus penyetoran sampah secara langsung",
        data: null,
      })
    } catch (error) {
      log.error(error.message)
      return res.status(500).json({
        status: false,
        message: "Terjadi kesalahan, silahkan coba lagi",
        data: null,
      })
    }
  }

}

module.exports = SetorSampahController
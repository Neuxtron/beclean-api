const log = require("../../utils/log")
const RekeningModel = require("./rekening_model")

class RekeningController {
  static async myRekening(req, res) {
    try {
      const { idUser } = req
      const rekening = await RekeningModel.findAll({ where: { idUser } })
      return res.status(200).json({
        status: true,
        message: "Berhasil mengambil data rekening / E-Wallet",
        data: rekening,
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
  
  static async addRekening(req, res) {
    try {
      const { idUser } = req
      const data = req.body

      const rekening = await RekeningModel.create({ ...data, idUser })
      return res.status(201).json({
        status: true,
        message: "Berhasil menambahkan rekening / E-Wallet",
        data: rekening,
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
  
  static async editRekening(req, res) {
    try {
      const { id } = req.params
      const data = req.body
      const rekening = await RekeningModel.findByPk(id)
      await rekening.update(data)
      return res.status(200).json({
        status: true,
        message: "Berhasil update rekening / E-Wallet",
        data: rekening,
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

  static async removeRekening(req, res) {
    try {
      const { id } = req.params
      await RekeningModel.destroy({ where: { id } })
      return res.status(200).json({
        status: true,
        message: "Berhasil menghapus rekening / E-Wallet",
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

module.exports = RekeningController
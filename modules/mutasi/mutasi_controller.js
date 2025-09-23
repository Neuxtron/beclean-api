const log = require("../../utils/log")
const UserModel = require("../user/user_model")
const MutasiModel = require("./mutasi_model")
const MutasiService = require("./mutasi_service")

class MutasiController {
  static async myMutasi(req, res) {
    try {
      const { idUser } = req
      const mutasi = await MutasiModel.findAll({
        where: { idUser },
        order: [["createdAt", "DESC"]]
      })

      return res.status(200).json({
        status: true,
        message: "Berhasil mengambil riwayat mutasi",
        data: mutasi,
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

  static async withdraw(req, res) {
    try {
      const { idUser } = req
      const { jumlah, rekeningId } = req.body
      const user = await UserModel.findByPk(idUser)

      if (user.saldo < jumlah) {
        return res.status(403).json({
          status: false,
          message: "Saldo Anda tidak mencukupi",
          data: null,
        })
      }

      // TODO: for production, wait for xendit success response
      await MutasiService.xenditDisbursement(user, rekeningId, jumlah)
      return res.status(200).json({
      status: true,
        message: "Dana sedang dikirim",
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

module.exports = MutasiController
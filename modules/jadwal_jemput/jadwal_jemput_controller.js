const log = require("../../utils/log")
const JadwalJemputModel = require("./jadwal_jemput_model")

class JadwalJemputController {
  static async myJadwal(req, res) {
    try {
      const { idUser } = req
      const jadwal = await JadwalJemputModel.findAll({ where: { idUser } })
      return res.status(200).json({
        status: true,
        message: "Berhasil mengambil jadwal penjemputan sampah",
        data: jadwal,
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

  static async addJadwal(req, res) {
    try {
      const data = req.body
      const jadwal = await JadwalJemputModel.create(data)
      return res.status(201).json({
        status: true,
        message: "Berhasil menambahkan jadwal penjemputan sampah",
        data: jadwal,
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

  static async addManyJadwal(req, res) {
    try {
      const { jadwal: jadwalData } = req.body
      const jadwals = await JadwalJemputModel.bulkCreate(jadwalData)
      return res.status(201).json({
        status: true,
        message: "Berhasil menambahkan jadwal penjemputan sampah",
        data: jadwals,
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

  static async editJadwal(req, res) {
    try {
      const { id } = req.params
      const data = req.body
      if (data.id) delete data.id
      
      const jadwal = await JadwalJemputModel.findByPk(id)

      if (jadwal === null) {
        return res.status(404).json({
          status: false,
          message: "Jadwal tidak ditemukan",
          data: null,
        })
      }

      await jadwal.update(data)
      return res.status(200).json({
        status: true,
        message: "Berhasil memperbarui jadwal penjemputan sampah",
        data: jadwal,
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

  static async removeJadwal(req, res) {
    try {
      const { id } = req.params
      const jadwal = await JadwalJemputModel.findByPk(id)

      if (jadwal === null) {
        return res.status(404).json({
          status: false,
          message: "Jadwal tidak ditemukan",
          data: null,
        })
      }

      await jadwal.destroy()
      return res.status(200).json({
        status: true,
        message: "Berhasil menghapus jadwal penjemputan sampah",
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

module.exports = JadwalJemputController
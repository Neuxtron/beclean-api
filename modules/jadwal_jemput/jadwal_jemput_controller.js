const log = require("../../utils/log")
const { Op } = require("sequelize")
const PenyetoranSampahModel = require("../penyetoran_sampah/penyetoran_sampah_model")
const ProdukSampahModel = require("../produk_sampah/produk_sampah_model")
const JadwalJemputModel = require("./jadwal_jemput_model")
const UserModel = require("../user/user_model")
const DriverModel = require("../driver/driver_model")
const JadwalJemputService = require("./jadwal_jemput_service")

class JadwalJemputController {
  static async myJadwal(req, res) {
    try {
      const { idUser } = req
      const role = req.query.role ?? "user"
      
      const jadwal = await JadwalJemputService.getJadwalByRole(role, idUser)
      let setoran = await JadwalJemputService.getSetoranByRole(role, idUser)
      setoran = JadwalJemputService.parseSetoranSampah(setoran, jadwal)
      return res.status(200).json({
        status: true,
        message: "Berhasil mengambil jadwal penjemputan sampah",
        data: setoran,
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

  static async getTodayJadwal(req, res) {
    try {
      const today = new Date()
      const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate())
      const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)

      const jadwal = await JadwalJemputModel.findAll({
        where: {
          jadwal: {
            [Op.gte]: startOfDay,
            [Op.lt]: endOfDay
          }
        },
        include: [
          {
            model: UserModel, 
            as: "user"
          },
          {
            model: DriverModel, 
            as: "driver"
          },
          {
            model: PenyetoranSampahModel, 
            as: "penyetoran_sampah",
            include: [{
              model: ProdukSampahModel, 
              as: "produk_sampah" 
            }]
          }
        ],
        order: [['jadwal', 'ASC']] // urutkan berdasarkan jadwal
      })

      return res.status(200).json({
        status: true,
        message: "Berhasil mengambil jadwal penjemputan sampah hari ini",
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

  // semua penjemputan sampah beserta produk sampah dan berat
  static async allJadwal(req, res) {
    try {
      const jadwal = await JadwalJemputModel.findAll({
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
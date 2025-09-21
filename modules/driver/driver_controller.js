const log = require("../../utils/log")
const DriverModel = require("./driver_model")

class DriverController {
  static async allDrivers(req, res) {
    try {
      const drivers = await DriverModel.findAll()
      return res.status(200).json({
        status: true,
        message: "Berhasil mengambil data driver",
        data: drivers,
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

  static async addDriver(req, res) {
    try {
      const data = req.body
      const driver = await DriverModel.create(data)
      return res.status(201).json({
        status: true,
        message: "Berhasil menambahkan driver",
        data: driver,
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

  static async editDriver(req, res) {
    try {
      const { id } = req.params
      const data = req.body
      if (data.id) delete data.id

      const driver = await DriverModel.findByPk(id)

      if (driver === null) {
        return res.status(404).json({
          status: false,
          message: "Driver tidak ditemukan",
          data: null,
        })
      }
      
      await driver.update(data)

      return res.status(200).json({
        status: true,
        message: "Berhasil memperbarui driver",
        data: driver,
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

  static async removeDriver(req, res) {
    try {
      const { id } = req.params
      const count = await DriverModel.destroy({ where: { id } })

      if (count === 0) {
        return res.status(404).json({
          status: false,
          message: "Driver tidak ditemukan",
          data: null,
        })
      }

      return res.status(200).json({
        status: true,
        message: "Berhasil menghapus driver",
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

  static async profile(req, res) {
    try {
      const { idUser: id } = req
      let driver = await DriverModel.findByPk(id)
      res.status(200).json({
        status: true,
        message: "Berhasil mengambil profil",
        data: driver,
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

  // TODO: ubah password driver
}

module.exports = DriverController
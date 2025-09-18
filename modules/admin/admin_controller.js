const log = require("../../utils/log")
const AdminModel = require("./admin_model")
const AdminService = require("./admin_service")
const bcrypt = require("bcrypt")
const saltRounds = parseInt(process.env.SALTROUNDS)

class AdminController {
  static async register(req, res) {
    try {
      const data = req.body
      
      const emailExists = await AdminService.getByEmail(data.email)
      if (emailExists) {
        return res.status(409).json({
          status: false,
          message: "Email sudah terdaftar",
          data: null,
        })
      }
      
      let admin = await AdminModel.create(data)
      admin = await AdminService.createToken(admin.id)

      return res.status(201).json({
        status: true,
        message: "Berhasil mendaftarkan admin/operator",
        data: admin,
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

  static async login(req, res) {
    try {
      const { email, password } = req.body

      let admin = await AdminService.getByEmail(email)
      if (admin === null) {
        return res.status(401).json({
          status: false,
          message: "Email belum terdaftar",
          data: null,
        })
      }

      const validation = bcrypt.compareSync(password, admin.password)
      if (!validation) {
        return res.status(401).json({
          status: false,
          message: "Password yang Anda masukkan salah",
          data: null,
        })
      }

      admin = await AdminService.createToken(admin.id)
      return res.status(200).json({
        status: true,
        message: "Berhasil login",
        data: admin,
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

  static async logout(req, res) {
    try {
      const { idAdmin: id } = req
      await AdminModel.update({ token: null }, { where: { id } })
      res.status(200).json({
        status: true,
        message: "Berhasil logout",
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
      const { idAdmin: id } = req
      let admin = await AdminModel.findByPk(id)
      res.status(200).json({
        status: true,
        message: "Berhasil mengambil profil",
        data: admin,
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

  static async updateProfile(req, res) {
    try {
      const { idAdmin } = req
      const data = req.body
      if (data.password) delete data.password
      let admin = await AdminModel.findByPk(idAdmin)

      const existingEmail = await AdminService.getByEmail(data.email)
      if (data.email !== admin.email && existingEmail) {
        return res.status(409).json({
          status: false,
          message: "Email sudah terdaftar",
          data: null,
        })
      }

      await admin.update(data)
      admin = await AdminModel.findByPk(admin.id)

      return res.status(200).json({
        status: true,
        message: "Berhasil update profil",
        data: admin,
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

  static async updatePassword(req, res) {
    try {
      const { idAdmin } = req
      const { passwordLama, passwordBaru } = req.body
      const admin = await AdminModel.findByPk(idAdmin)

      if (!admin) {
        return res.status(404).json({
          status: false,
          message: "User not found",
          data: null,
        })
      }

      const validation = bcrypt.compareSync(passwordLama, admin.password)
      if (!validation) {
        return res.status(401).json({
          status: false,
          message: "Password lama salah",
          data: null,
        })
      }

      const password = bcrypt.hashSync(passwordBaru, saltRounds)
      await admin.update({ password })

      return res.status(200).json({
        status: true,
        message: "Password berhasil diubah",
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

module.exports = AdminController
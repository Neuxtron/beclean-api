const log = require("../../utils/log")
const UserModel = require("./user_model")
const UserService = require("./user_service")
const bcrypt = require("bcrypt")

class UserController {
  static async register(req, res) {
    try {
      const data = req.body
      
      const emailExists = await UserService.getByEmail(data.email)
      if (emailExists) {
        return res.status(409).json({
          status: false,
          message: "Email sudah terdaftar",
          data: null,
        })
      }
      
      let user = await UserModel.create(data)
      user = await UserService.createToken(user.id)

      return res.status(201).json({
        status: true,
        message: "Berhasil mendaftarkan user",
        data: user,
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

      let user = await UserService.getByEmail(email)
      if (user === null) {
        return res.status(401).json({
          status: false,
          message: "Email belum terdaftar",
          data: null,
        })
      }

      const validation = bcrypt.compareSync(password, user.password)
      if (!validation) {
        return res.status(401).json({
          status: false,
          message: "Password yang Anda masukkan salah",
          data: null,
        })
      }

      user = await UserService.createToken(user.id)
      return res.status(200).json({
        status: true,
        message: "Berhasil login",
        data: user,
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
      const { idUser: id } = req
      await UserModel.update({ token: null }, { where: { id } })
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
      const { idUser: id } = req
      let user = await UserModel.findByPk(id)
      res.status(200).json({
        status: true,
        message: "Berhasil mengambil profil",
        data: user,
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

module.exports = UserController
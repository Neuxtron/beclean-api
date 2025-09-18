const AdminModel = require("./admin_model")
const jwt = require("jsonwebtoken")
const secret = process.env.SECRET

class AdminService {
  static async getByEmail(email) {
    const existingAdmin = await AdminModel.findOne({
      where: { email }
    })
    return existingAdmin
  }

  static async createToken(id) {
    const admin = await AdminModel.findByPk(id)
    const token = jwt.sign({ id }, secret)
    return admin.update({ token })
  }
}

module.exports = AdminService
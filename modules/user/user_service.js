const DriverModel = require("../driver/driver_model")
const UserModel = require("./user_model")
const jwt = require("jsonwebtoken")
const secret = process.env.SECRET

class UserService {
  static async getByEmail(email) {
    let existingUser = await UserModel.findOne({
      where: { email }
    })
    if (!existingUser) {
      existingUser = await DriverModel.findOne({
        where: { email }
      })
    }
    return existingUser
  }

  static async createToken(id) {
    let user = await UserModel.findByPk(id, {
      include: ["rekening"]
    })
    if (!user) {
      user = await DriverModel.findByPk(id)
    }
    const token = jwt.sign({ id }, secret)
    return user.update({ token })
  }

  static async getRole(id) {
    let role = null
    const user = await UserModel.findByPk(id)
    if (user) {
      role = "user"
    } else {
      const driver = await DriverModel.findByPk(id)
      if (driver) role = "driver"
    }
    return role
  }
}

module.exports = UserService
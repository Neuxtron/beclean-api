const { STRING, UUIDV4, ENUM } = require("sequelize")
const sequelize = require("../../config/database")
const UserModel = require("../user/user_model")
const { supportedBanks, supportedEWallets } = require("../../utils/get_jenis_rekening")

const RekeningModel = sequelize.define("rekening", {
  id: {
    type: STRING,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  idUser: {
    type: STRING,
    allowNull: false,
  },
  merchant: {
    type: ENUM(
      ...supportedBanks,
      ...supportedEWallets
    ),
    allowNull: false,
  },
  nomor: {
    type: STRING,
    allowNull: false,
  },
}, {
  freezeTableName: true,
})

RekeningModel.belongsTo(UserModel, { as: "user", foreignKey: "idUser", onDelete: "CASCADE" })

module.exports = RekeningModel
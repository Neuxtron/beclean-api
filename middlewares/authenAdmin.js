const jwt = require("jsonwebtoken");
const log = require("../utils/log");
const AdminModel = require("../modules/admin/admin_model"); // arahkan ke model admin
const secret = process.env.SECRET;

async function authenAdmin(req, res, next) {
  try {
    const bearer = req.headers.authorization;
    if (!bearer) throw new jwt.JsonWebTokenError("No headers found");

    const token = bearer.slice(7);
    const admin = await AdminModel.findOne({ where: { token } });
    if (!admin) throw new jwt.JsonWebTokenError("Admin not found");

    const decode = jwt.verify(token, secret);
    req.idAdmin = decode.id;
    req.role = admin.role;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      log.info(error.message);
      return res.status(401).json({
        status: false,
        message: "Anda belum login",
        data: null,
      });
    }

    log.error(error.message);
    res.status(500).json({
      status: false,
      message: "Terjadi kesalahan, silahkan coba lagi",
      data: null,
    });
  }
}

module.exports = authenAdmin;

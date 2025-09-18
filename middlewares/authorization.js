function authorization(roles = []) {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.role)) {
        return res.status(403).json({
          status: false,
          message: "Anda tidak memiliki akses",
          data: null,
        });
      }
      next();
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Terjadi kesalahan, silahkan coba lagi",
        data: null,
      });
    }
  };
}

// bikin fungsi khusus biar route lebih rapi
const isAdmin = authorization(["admin"]);
const isOperator = authorization(["operator"]);
const isAdminOrOperator = authorization(["admin", "operator"]);

module.exports = {
  authorization,
  isAdmin,
  isOperator,
  isAdminOrOperator,
};

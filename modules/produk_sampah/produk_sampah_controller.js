const log = require("../../utils/log")
const ProdukSampahModel = require("./produk_sampah_model")

class ProdukSampahController {
    static async allProduk(req, res) {
    try {
      const produk = await ProdukSampahModel.findAll()
      return res.status(200).json({
        status: true,
        message: "Berhasil mengambil data Produk",
        data: produk,
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

    static async addProduk(req, res) {
    try {
        const data = req.body
        const produk = await ProdukSampahModel.create(data)
        return res.status(201).json({
        status: true,
        message: "Berhasil menambahkan produk",
        data: produk,
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

    static async editProduk(req, res) {
    try {
      const { id } = req.params
      const data = req.body
      if (data.id) delete data.id

      const produk = await ProdukSampahModel.findByPk(id)

      if (produk === null) {
        return res.status(404).json({
          status: false,
          message: "Produk tidak ditemukan",
          data: null,
        })
      }
      
      await produk.update(data)

      return res.status(200).json({
        status: true,
        message: "Berhasil memperbarui produk",
        data: produk,
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

  static async removeProduk(req, res) {
    try {
      const { id } = req.params
      const count = await ProdukSampahModel.destroy({ where: { id } })

      if (count === 0) {
        return res.status(404).json({
          status: false,
          message: "Produk tidak ditemukan",
          data: null,
        })
      }

      return res.status(200).json({
        status: true,
        message: "Berhasil menghapus produk",
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

module.exports = ProdukSampahController
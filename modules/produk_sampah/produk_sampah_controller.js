const log = require("../../utils/log")
const getUrl = require("../../utils/get_url")
const ProdukSampahModel = require("./produk_sampah_model")
const fs = require('fs')
const path = require('path')
const { Op } = require("sequelize");
const ProdukSampahService = require("./produk_sampah_service")
const UserModel = require("../user/user_model")

class ProdukSampahController {
  static async allProduk(req, res) {
    try {
      let produk = await ProdukSampahModel.findAll()
      produk = produk.map((item) => item.get())

      const url = getUrl(req)
      produk = ProdukSampahService.parseIcon(produk, url)
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
      const existingProduk = await ProdukSampahModel.findOne({ where: { nama: data.nama } });
      if (existingProduk) {
      return res.status(400).json({
        status: false,
        message: "Nama produk sudah digunakan",
        data: null,
        });
      }
      if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" })
      const file = req.files.file
      const fileSize = file.data.length
      const ext = path.extname(file.name)
      const fileName = Date.now() + file.md5 + ext
      if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" })
      file.mv(`./public/icon/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message })
        try {
            const produkData = {
                ...data,
                icon: fileName
            }
            const produk = await ProdukSampahModel.create(produkData)
            return res.status(201).json({
                status: true,
                message: "Berhasil menambahkan produk",
                data: produk,
            })
        } catch (error) {
            log.error(error.message)
            return res.status(500).json({
                status: false,
                message: "Terjadi kesalahan saat menyimpan data",
                data: null,
            })
        }
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
      const { id } = req.params;
      const data = req.body;
      if (data.id) delete data.id;
      const produk = await ProdukSampahModel.findByPk(id);

      if (produk === null) {
        return res.status(404).json({
          status: false,
          message: "Produk tidak ditemukan",
          data: null,
        });
      }

      if (data.nama) {
      const existingProduk = await ProdukSampahModel.findOne({
        where: { nama: data.nama, id: { [Op.ne]: id } }
      });
      if (existingProduk) {
        return res.status(400).json({
          status: false,
          message: "Nama produk sudah digunakan",
          data: null,
        });
      }
    }

      if (req.files !== null && req.files.file) {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        const fileName = file.md5 + ext;

        if (fileSize > 5000000) {
          return res.status(422).json({ msg: "Image must be less than 5 MB" });
        }

        if (produk.icon) {
        const oldFile = `./public/icon/${produk.icon.split("/").pop()}`;
        if (fs.existsSync(oldFile)) fs.unlinkSync(oldFile);
        }

        await file.mv(`./public/icon/${fileName}`);

        if (fileName) {
          data.icon = fileName;
        }
      }
      await produk.update(data);
      return res.status(200).json({
        status: true,
        message: "Berhasil memperbarui produk",
        data: produk,
      });
    } catch (error) {
      log.error(error.message);
      return res.status(500).json({
        status: false,
        message: "Terjadi kesalahan, silahkan coba lagi",
        data: null,
      });
    }
  }

  static async removeProduk(req, res) {
    try {
      const { id } = req.params;

      const produk = await ProdukSampahModel.findByPk(id);
      if (!produk) {
        return res.status(404).json({
          status: false,
          message: "Produk tidak ditemukan",
          data: null,
        });
      }
      if (produk.icon) {
        const oldFile = `./public/icon/${produk.icon.split("/").pop()}`;
        if (fs.existsSync(oldFile)) {
          fs.unlinkSync(oldFile);
        }
      }
      await produk.destroy();
      return res.status(200).json({
        status: true,
        message: "Berhasil menghapus produk",
        data: null,
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({
        status: false,
        message: "Terjadi kesalahan, silakan coba lagi",
        data: null,
      });
    }
  }

  static async getForOperator(req, res) {
    try {
      const users = await UserModel.findAll()
      let produk = await ProdukSampahModel.findAll()
      produk = produk.map((item) => item.get())

      const url = getUrl(req)
      produk = ProdukSampahService.parseIcon(produk, url)
      return res.status(200).json({
        status: true,
        message: "Berhasil mengambil data user dan produk",
        data: { users, produk },
      });
    } catch (error) {
      log.error(error.message);
      return res.status(500).json({
        status: false,
        message: "Terjadi kesalahan, silakan coba lagi",
        data: null,
      });
    }
  }
}

module.exports = ProdukSampahController
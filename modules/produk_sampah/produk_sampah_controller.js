const log = require("../../utils/log")
const ProdukSampahModel = require("./produk_sampah_model")
const fs = require('fs')
const path = require('path')

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
      if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" })
      
      const data = req.body
      const file = req.files.file
      const fileSize = file.data.length
      const ext = path.extname(file.name)
      const fileName = file.md5 + ext
      const icon = `${req.protocol}://${req.get("host")}/public/icon/${fileName}`
      const allowedType = ['.png', '.jpg', '.jpeg', '.gif', '.webp']
      if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Image" })
      if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" })
      file.mv(`./public/icon/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message })
        try {
            const produkData = {
                ...data,
                icon: icon
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

      let fileName = "";
      if (req.files === null || !req.files.file) {
        fileName = produk.icon ? produk.icon.split("/").pop() : "";
      } else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        const fileName = file.md5 + ext;
        const icon = `${req.protocol}://${req.get("host")}/public/icon/${fileName}`;
        const allowedType = [".png", ".jpg", ".jpeg", ".gif", ".webp"];

        if (!allowedType.includes(ext.toLowerCase())) {
          return res.status(422).json({ msg: "Invalid Image" });
        }
        if (fileSize > 5000000) {
          return res.status(422).json({ msg: "Image must be less than 5 MB" });
        }

        if (produk.icon) {
        const oldFile = `./public/icon/${produk.icon.split("/").pop()}`;
        if (fs.existsSync(oldFile)) fs.unlinkSync(oldFile);
        }

        await file.mv(`./public/icon/${fileName}`);

        if (fileName) {
        data.icon = icon;
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

}

module.exports = ProdukSampahController
const log = require("../../utils/log")
const { Op } = require('sequelize');
const PenyetoranSampahModel = require("./penyetoran_sampah_model")
const ProdukSampahModel = require("../produk_sampah/produk_sampah_model")
const JadwalJemputModel = require("../jadwal_jemput/jadwal_jemput_model");
const MutasiModel = require("../mutasi/mutasi_model");
const UserModel = require("../user/user_model");

    class DetailJadwalController{
    //semua data sampah yang di jemput
    static async allDetailJadwal(req, res) {
        try {
        const detailJadwal = await PenyetoranSampahModel.findAll({
          where: {idUser: {[Op.is]: null}},
           include: [
           {
              model: ProdukSampahModel, as: "produk_sampah",
            },
        ]
        })
        return res.status(200).json({
            status: true,
            message: "Berhasil mengambil detail jadwal penjemputan sampah",
            data: detailJadwal,
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

    static async detailJadwalByIdJemput(req, res) {
    try {
        const { id } = req.params
        
        const detailJadwal = await JadwalJemputModel.findByPk(id, {
        include: [
           {
              model: PenyetoranSampahModel, as: "penyetoran_sampah",
              include: [{
                model: ProdukSampahModel, as: "produk_sampah" 
              }]
            },
        ]
        })
        
        return res.status(200).json({
        status: true,
        message: "Berhasil mengambil detail jadwal penjemputan sampah",
        data: detailJadwal,
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

    static async addDetailJadwal(req, res) {
    try {
      const data = req.body
      const { idUser, idProdukSampah, berat } = data

      const produk = await ProdukSampahModel.findByPk(idProdukSampah)
      const user = await UserModel.findByPk(idUser)
      const harga = produk.harga * berat
      data.harga = harga
      
      const detailJadwal = await PenyetoranSampahModel.create(data)
      // IDEA: konfirmasi admin/operator
      await user.increment({ saldo: harga })
      await MutasiModel.create({
        idUser,
        judul: "Penjemputan Sampah",
        jumlah: harga,
        status: "selesai"
      })
      return res.status(201).json({
        status: true,
        message: "Berhasil menambahkan detail jadwal penjemputan sampah",
        data: detailJadwal,
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

  static async addMany(req, res) {
    try {
      let { setoran: setoranRaw } = req.body
      const setoranData = []
      const promises = setoranRaw.map(async (item) => {
        const idProdukSampah = item.idProdukSampah
        const produk = await ProdukSampahModel.findByPk(idProdukSampah)
        const harga = item.berat * produk.harga
        setoranData.push({ ...item, harga })
      })
      await Promise.allSettled(promises)
      const setoran = await PenyetoranSampahModel.bulkCreate(setoranData)
      return res.status(201).json({
        status: true,
        message: "Berhasil menambahkan data penginputan sampah",
        data: setoran,
      })
    } catch (error) {
      log.error(error)
      return res.status(500).json({
        status: false,
        message: "Terjadi kesalahan, silahkan coba lagi",
        data: null,
      })
    }
  }

  static async editDetailJadwal(req, res) {
    try {
      const { id } = req.params
      const data = req.body
      if (data.id) delete data.id
      
      const detailJadwal = await PenyetoranSampahModel.findByPk(id)

      if (detailJadwal === null) {
        return res.status(404).json({
          status: false,
          message: "Detail jadwal tidak ditemukan",
          data: null,
        })
      }

      await detailJadwal.update(data)
      return res.status(200).json({
        status: true,
        message: "Berhasil memperbarui detail jadwal penjemputan sampah",
        data: detailJadwal,
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

  static async removeDetailJadwal(req, res) {
    try {
      const { id } = req.params
      const detailJadwal = await PenyetoranSampahModel.findByPk(id)

      if (detailJadwal === null) {
        return res.status(404).json({
          status: false,
          message: "Detail jadwal tidak ditemukan",
          data: null,
        })
      }

      await detailJadwal.destroy()
      return res.status(200).json({
        status: true,
        message: "Berhasil menghapus detail jadwal penjemputan sampah",
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

module.exports = DetailJadwalController
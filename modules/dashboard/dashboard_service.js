const { Op } = require("sequelize");
const ProdukSampahModel = require("../produk_sampah/produk_sampah_model");
const JadwalJemputModel = require("../jadwal_jemput/jadwal_jemput_model");

class DashboardService {
  static getMonthRange() {
    const bulanIni = new Date();
    const firstDay = new Date(bulanIni.getFullYear(), bulanIni.getMonth(), 1);
    const lastDay = new Date(bulanIni.getFullYear(), bulanIni.getMonth() + 1, 0);
    return { firstDay, lastDay }
  }

  static getTodayRange() {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    return { startOfDay, endOfDay }
  }

  static getTotalPenjemputan = async () => {
    const { firstDay, lastDay } = this.getMonthRange()
    const allPenjemputan = await JadwalJemputModel.findAll({
      include: ["penyetoran_sampah"],
      where: {
        jadwal: { [Op.between]: [firstDay, lastDay] }
      }
    })
    const totalPenjemputan = allPenjemputan.filter((jadwal) => {
      return jadwal.penyetoran_sampah.length > 0;
    })
    return totalPenjemputan.length
  }

  static async getProdukWeight(url) {
    let produk = await ProdukSampahModel.findAll({
      include: ["penyetoran_sampah"]
    })
    produk = produk.map((item) => {
      item = item.get()
      const weights = item.penyetoran_sampah.map((setoran) => parseFloat(setoran.berat))
      const total = weights.length > 0 ? weights.reduce((v, e) => v + e) : 0
      delete item.penyetoran_sampah
      return { ...item, total }
    })
    produk = this.parseIcon(produk, url)
    return produk
  }

  static async getRecentPenjemmputan() {
    let penjemputan = await JadwalJemputModel.findAll({
      order: [["jadwal", "DESC"]],
      include: ["penyetoran_sampah", "user", "driver"]
    })
    penjemputan = penjemputan.filter((item) => item.penyetoran_sampah.length > 0)
    penjemputan = penjemputan.slice(0, 5).map((item) => {
      item = item.get()
      const listHarga = item.penyetoran_sampah.map((e) => e.harga)
      const harga = listHarga.reduce((v, e) => v + e)
      return { ...item, harga }
    })
    return penjemputan
  }

  static async getRecentAktivitas() {
    let penjemputan = await JadwalJemputModel.findAll({
      order: [["jadwal", "DESC"]],
      include: ["user", "driver", "penyetoran_sampah"]
    })
    penjemputan = penjemputan.slice(0, 5)
    return penjemputan
  }

  static getJadwalHariIni = async () => {
    const { startOfDay, endOfDay } = this.getTodayRange()
    let jadwal = await JadwalJemputModel.findAll({
      order: [["jadwal", "DESC"]],
      include: ["user", "driver", "penyetoran_sampah"],
      where: {
        jadwal: {
          [Op.between]: [startOfDay, endOfDay]
        }
      }
    })

    jadwal = jadwal.slice(0, 5)
    return jadwal
  }

  static async parseIcon(listProduk, url) {
    return listProduk.map((produk) => {
      const icon = `${url}/public/icon/${produk.icon}`
      return { ...produk, icon }
    })
  }
}

module.exports = DashboardService
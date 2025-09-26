const { Op } = require("sequelize");
const ProdukSampahModel = require("../produk_sampah/produk_sampah_model");
const JadwalJemputModel = require("../jadwal_jemput/jadwal_jemput_model");

class DashboardService {
  static getTodayRange() {
    const bulanIni = new Date();
    const firstDay = new Date(bulanIni.getFullYear(), bulanIni.getMonth(), 1);
    const lastDay = new Date(bulanIni.getFullYear(), bulanIni.getMonth() + 1, 0);
    return { firstDay, lastDay }
  }

  static getTotalPenjemputan = async () => {
    const { firstDay, lastDay } = this.getTodayRange()
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

  static async getProdukWeight() {
    let produk = await ProdukSampahModel.findAll({
      include: ["penyetoran_sampah"]
    })
    produk = produk.map((item) => {
      item = item.get()
      const weights = item.penyetoran_sampah.map((setoran) => setoran.berat)
      const total = weights.length > 0 ? weights.reduce((v, e) => v + e) : 0
      delete item.penyetoran_sampah
      return { ...item, total }
    })
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
}

module.exports = DashboardService
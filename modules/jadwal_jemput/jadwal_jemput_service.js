const PenyetoranSampahModel = require("../penyetoran_sampah/penyetoran_sampah_model")
const JadwalJemputModel = require("./jadwal_jemput_model")

class JadwalJemputService {
  static parseSetoranSampah = (setoran, jadwal) => {
    const setoranNew = []

    setoran.forEach((item) => {
      const jumlah = item.produk_sampah.harga * item.berat

      let existingIndex = setoranNew.findIndex((itemNew) => {
        // const sameDay = this.isSameDay(item.jadwal_jemput.jadwal, itemNew.tanggal)
        // const sameUser = item.idUser === itemNew.idUser
        const sameJadwal = item.idJadwal === itemNew.idJadwal
        return sameJadwal
      })

      if (existingIndex === -1) {
        return setoranNew.push({
          tanggal: item.jadwal_jemput.jadwal,
          idUser: item.idUser,
          user: item.user,
          idJadwal: item.idJadwalJemput,
          details: {
            tipe: item.idJadwalJemput ? "Penjemputan" : "Penyetoran",
            jumlah,
            berat: parseFloat(item.berat)
          }
        })
      }

      setoranNew[existingIndex].details.jumlah += jumlah
      setoranNew[existingIndex].details.berat += parseFloat(item.berat)
    })

    jadwal.forEach((item) => {
      const existingIndex = setoranNew.findIndex((itemNew) => {
        const sameJadwal = item.id === itemNew.idJadwal
        return sameJadwal
      })

      if (existingIndex === -1) {
        setoranNew.push({
          tanggal: item.jadwal,
          idUser: item.idUser,
          user: item.user,
          idJadwal: item.id,
          details: null
        })
      }
    })

    return setoranNew
  }

  static isSameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
          d1.getMonth() === d2.getMonth() &&
          d1.getDate() === d2.getDate();
  }

  static async getJadwalByRole(role, idUser) {
    if (role === "user") {
      return await JadwalJemputModel.findAll({
        where: { idUser },
        include: ["user"]
      })
    }

    return await JadwalJemputModel.findAll({
      where: { idDriver: idUser },
      include: ["user"]
    })
  }

  static async getSetoranByRole(role, idUser) {
    if (role === "user") {
      return await PenyetoranSampahModel.findAll({
        where: { idUser },
        include: ["produk_sampah", "user", "jadwal_jemput"]
      })
    }

    return await PenyetoranSampahModel.findAll({
      include: [
        "produk_sampah",
        "user",
        {
          association: "jadwal_jemput",
          where: { idDriver: idUser }
        }
      ]
    })
  }
}

module.exports = JadwalJemputService
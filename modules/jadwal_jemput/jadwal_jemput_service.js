class JadwalJemputService {
  static parseSetoranSampah = (setoran, jadwal) => {
    const setoranNew = []

    setoran.forEach((item) => {
      const jumlah = item.produk_sampah.harga * item.berat

      const existingIndex = setoranNew.findIndex((itemNew) => {
        return this.isSameDay(item.createdAt, itemNew.tanggal)
      })

      if (existingIndex === -1) {
        return setoranNew.push({
          tanggal: item.createdAt,
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
      setoranNew.push({
        tanggal: item.jadwal,
        details: null
      })
    })

    return setoranNew
  }

  static isSameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
          d1.getMonth() === d2.getMonth() &&
          d1.getDate() === d2.getDate();
  }
}

module.exports = JadwalJemputService
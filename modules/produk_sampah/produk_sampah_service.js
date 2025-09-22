class ProdukSampahService {
  static parseIcon(produk, url) {
    return produk.map((item) => {
      const icon = `${url}/public/icon/${item.icon}`
      return { ...item, icon }
    })
  }
}

module.exports = ProdukSampahService
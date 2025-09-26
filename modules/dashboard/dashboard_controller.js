const log = require("../../utils/log")
const { Op, fn, col,     } = require("sequelize");
const PenyetoranSampahModel = require("../penyetoran_sampah/penyetoran_sampah_model");
const JadwalJemputModel = require("../jadwal_jemput/jadwal_jemput_model");
const ProdukSampahModel = require("../produk_sampah/produk_sampah_model");
const UserModel = require("../user/user_model");
const DriverModel = require("../driver/driver_model");
const DashboardService = require("./dashboard_service");
const getUrl = require("../../utils/get_url");

class DashboardController {
  // Total semua sampah bulan ini
  static async getTotalSampahBulanIni(req, res) {
    try {
        const bulanIni = new Date();
        const firstDay = new Date(bulanIni.getFullYear(), bulanIni.getMonth(), 1);
        const lastDay = new Date(bulanIni.getFullYear(), bulanIni.getMonth() + 1, 0);

        const total = await PenyetoranSampahModel.sum("berat", {
        include: [
            {
            model: JadwalJemputModel,
            as: "jadwal_jemput",
            attributes: [],  
            },
        ],
        where: {
            [Op.or]: [
            // setor langsung
            {
                tanggal_setor: {
                [Op.between]: [firstDay, lastDay],
                },
            },
            // setor via jemput
            {
                "$jadwal_jemput.jadwal$": {
                [Op.between]: [firstDay, lastDay],
                },
            },
            ],
        },
        });

        return res.status(200).json({
        status: true,
        message: "Berhasil mengambil total sampah bulan ini",
        data: total || 0,
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

  // Jumlah masing-masing produk sampah yang dijemput bulan ini
  static async getJumlahProdukSampahBulanIni(req, res) {
    try {
        const bulanIni = new Date();
        const firstDay = new Date(bulanIni.getFullYear(), bulanIni.getMonth(), 1);
        const lastDay = new Date(bulanIni.getFullYear(), bulanIni.getMonth() + 1, 0);

        const total = await PenyetoranSampahModel.findAll({
        attributes: [
            "idProdukSampah",
            [fn("SUM", col("berat")), "total_berat"],
        ],
        include: [
            {
            model: JadwalJemputModel,
            as: "jadwal_jemput",
            attributes: [],
            },
            {
            model: ProdukSampahModel,
            as: "produk_sampah",
            attributes: ["nama", "icon"],
            },
        ],
        where: {
            [Op.or]: [
            {
                tanggal_setor: {
                [Op.between]: [firstDay, lastDay],
                },
            },
            {
                "$jadwal_jemput.jadwal$": {
                [Op.between]: [firstDay, lastDay],
                },
            },
            ],
        },
        group: [
            "idProdukSampah",
        ],
        });

       return res.status(200).json({
        status: true,
        message: "Berhasil mengambil jumlah sampah perproduk bulan ini",
        data: total || 0,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
  }


  // 5 penjemputan terakhir
  static async getLimaPenjemputanTerakhir(req, res) {
    try {
      const data = await JadwalJemputModel.findAll({
        limit: 5,
        // Mengurutkan data berdasarkan kolom jadwal
        order: [["jadwal", "DESC"]],
        include: [
          { model: UserModel, as: "user", attributes: ["id", "nama"] },
          { model: DriverModel, as: "driver", attributes: ["id", "nama"] },
          {
            model: PenyetoranSampahModel,
            as: "penyetoran_sampah",
            attributes: ["berat"],
            include: [
              {
                model: ProdukSampahModel,
                as: "produk_sampah",
                attributes: ["nama", "icon"],
              },
            ]
          },
          
        ],
      });

      res.json({
        success: true,
        data,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async dashboardAdmin(req, res) {
    try {
      const url = getUrl(req)
      const totalPenjemputan = await DashboardService.getTotalPenjemputan()
      const produk = await DashboardService.getProdukWeight(url)
      const recentPenjemputan = await DashboardService.getRecentPenjemmputan()
      return res.status(200).json({
        status: true,
        message: "Berhasil mengambil data dashboard admin",
        data: {
          totalPenjemputan,
          produk,
          recentPenjemputan,
        },
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

module.exports = DashboardController;

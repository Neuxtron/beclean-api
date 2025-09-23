const { v4 } = require("uuid")
const RekeningModel = require("../rekening/rekening_model")
const MutasiModel = require("./mutasi_model")

class MutasiService {
  static xenditDisbursement = async (user, rekId, jumlah) => {
    const baseUrl = process.env.XENDIT_HOST_URL
    const key = process.env.XENDIT_API_KEY

    const rekening = await RekeningModel.findByPk(rekId)
    const body = this.buildXenditDisbursementBody(user, rekening, jumlah)
    
    const response = await fetch(`${baseUrl}/disbursements`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${btoa(`${key}:`)}`
      },
      body: JSON.stringify(body)
    })

    if (response.status !== 200) {
      console.error(await response.text())
      throw Error("Xendit error")
    }

    await user.decrement({ saldo: jumlah })
    await MutasiModel.create({
      idUser: user.id,
      judul: "Tarik Tunai",
      jumlah: -jumlah,
      // TODO: for production, wait for xendit success response
      status: "selesai"
    })
  }

  static buildXenditDisbursementBody(user, rekening, jumlah) {
    return {
      external_id: v4(),
      amount: jumlah,
      bank_code: rekening.merchant,
      account_holder_name: user.nama,
      account_number: rekening.nomor,
      description: `Penarikan dana untuk ${user.nama}`
    }
  }
}

module.exports = MutasiService
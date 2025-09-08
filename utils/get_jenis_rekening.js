export const supportedBanks = [
  "MANDIRI_VIRTUAL_ACCOUNT",
  "BCA_VIRTUAL_ACCOUNT",
  "BRI_VIRTUAL_ACCOUNT",
  "BNI_VIRTUAL_ACCOUNT"
]
export const supportedEWallets = [
  "GOPAY",
  "SHOPEEPAY",
  "DANA"
]

export const IS_BANK = "bank"
export const IS_E_WALLET = "ewallet"

export default function getJenisRekening(merchant) {
  if (supportedBanks.includes(merchant)) return  IS_BANK
  if (supportedEWallets.includes(merchant)) return IS_E_WALLET
  return null
}
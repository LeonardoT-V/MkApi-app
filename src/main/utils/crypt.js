import AES from 'crypto-js/aes'
import encUtf8 from 'crypto-js/enc-utf8'

const CRYPTO_KEY = 'mK@PI:K3y'

export function encrypt({ value }) {
  const crypted = AES.encrypt(value, CRYPTO_KEY).toString()
  return crypted
}

export function decrypt({ value }) {
  const crypted = AES.decrypt(value, CRYPTO_KEY)
  const originalText = crypted.toString(encUtf8)
  return originalText
}

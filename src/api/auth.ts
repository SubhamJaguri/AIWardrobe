import CryptoJS from 'crypto-js';
import { public_key } from './constant';

export function getAuthenticationHead(secretKey: string) {
  const unixTime = Math.floor(Date.now() / 1000);
  const oneTimeCode = CryptoJS.PBKDF2(secretKey, String(unixTime), { keySize: 32/4, iterations: 128 }).toString();

  return {
    public_key: public_key,
    timestamp: unixTime,
    one_time_code: oneTimeCode,
  };
}
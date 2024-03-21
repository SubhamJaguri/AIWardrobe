import CryptoJS from 'crypto-js';


const public_key="c6d063b1379af3c99297c06904be77d0";

export function getAuthenticationHead(secretKey ) {
  const unixTime = Math.floor(Date.now() / 1000);
  const oneTimeCode = CryptoJS.PBKDF2(secretKey, String(unixTime), { keySize: 32/4, iterations: 128 }).toString();

  return {
    public_key: public_key,
    timestamp: unixTime,
    one_time_code: oneTimeCode,
  };
}
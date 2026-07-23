// src/composables/useFormatter.js
import { ref } from 'vue';

// State ditaruh diluar  agar menjadi globaldan tidak di fatch berulang kali
const exchangeRates = ref({
  IDR: 1,
  USD: 0.000059, //angka cadangan (fallback) jika internet putus (1 Rp = ~0.000059 USD)
  JPY: 0.0093, //angka cadangan (1 Rp = ~0.0093)
});

const isLoadingRates = ref(false);

export function useFormatter() {
  // Array data mata uang
  const currencies = [
    {
      code: 'IDR',
      label: 'IDR (Rp)',
    },
    {
      code: 'USD',
      label: 'USD ($)',
    },
    {
      code: 'JPY',
      label: 'JPY (￥)',
    },
  ];

  // fungsi untuk mengambil mata uang terupdate dari internet
  const fetchRates = async () => {
    // Jika sedang loading atau sudah pernah fetch sebelumnya , stop (biar hemat kuota API)
    if (isLoadingRates.value || exchangeRates.value.USD !== 0.000059) return;

    isLoadingRates.value = true;
    try {
      // Mengambil data kurs dunia dengan mata uang dasar IDR (Rupiah)
      const response = await fetch('https://open.er-api.com/v6/latest/IDR');
      const data = await response.json();

      if (data && data.rates) {
        exchangeRates.value = {
          IDR: 1,
          USD: data.rates.USD, // Nilai 1 Rupiah dalam USD
          JPY: data.rates.JPY, // NIlai 1 Rupiah dalam JPY
        };
        console.log('Kurs mata uang berhasil diperbaharui secara real-time');
      }
    } catch (error) {
      console.log(
        'Gagal mengambil data terbaru, menggunakan data cadangan',
        error,
      );
    } finally {
      isLoadingRates.value = false;
    }
  };

  //  @param {number} value - Nilai angka murni Rupiah dari database
  //  @param {string} currencyType - 'IDR', 'USD', atau 'JPY'

  const formatCurrency = (value, currencyType = 'IDR') => {
    const amount = value || 0;

    // Pastikan currencyType hanya berupa IDR, USD, JPY
    // jika ada data aneh atau sampah paksa kembali ke IDR
    const validCurrencies = ['IDR', 'USD', 'JPY'];
    if (!validCurrencies.includes(currencyType)) {
      currencyType = 'IDR';
    }

    const locales = { IDR: 'id-ID', USD: 'en-US', JPY: 'ja-JP' };
    const maxDecimals = { IDR: 0, USD: 2, JPY: 0 };

    const locale = locales[currencyType] || 'id-ID';
    const maxDecimal =
      maxDecimals[currencyType] !== undefined ? maxDecimals[currencyType] : 0;

    // Ambil date pengali dari hasil API
    const rate = exchangeRates.value[currencyType] || 1;

    // Logika baru karena base-nya IDR, nominal rupiah tinggal dikalikan dengan rate target
    // Contoh: 17000 IDR * 0.000059 (rate USD asli) = $1.00
    const convertedValue = currencyType === 'IDR' ? amount : amount * rate;

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyType,
      minimumFractionDigits: 0,
      maximumFractionDigits: maxDecimal,
    }).format(convertedValue);
  };

  const getPercentage = (card) => {
    if (!card || !card.price || !card.currentFunds) return 0;
    const percentage = (card.currentFunds / card.price) * 100;
    return percentage % 1 === 0
      ? percentage
      : parseFloat(percentage.toFixed(1));
  };

  // Fungsi untuk mendapatkan angka mentah hasil konversi (tanpa simbol mata uang)
  const convertCurrency = (value, currencyType = 'IDR') => {
    const amount = value || 0;
    const rate = exchangeRates.value[currencyType] || 1;
    return currencyType === 'IDR' ? amount : amount * rate;
  };

  return {
    formatCurrency,
    getPercentage,
    fetchRates, //Kita keluarkan fungsinya agar bisa dipicu di onMounted
    isLoadingRates,
    currencies,
    convertCurrency,
  };
}

// Kode lawas start ora nganggo data real mata uang sekarang
// export function useFormatter() {
//   // 1.FOrmat rupiah (murni angka -> IDR 10.000.000)
//   const formatCurrency = (value) => {
//     if (!value) return '0';
//     return new Intl.NumberFormat('id-ID').format(value);
//   };

//   //   fungsi hitung persentase
//   const getPercentage = (card) => {
//     if (!card || !card.price || !card.currentFunds) return 0;

//     const percentage = (card.currentFunds / card.price) * 100;

//     // Jika bulat kembalikan apa adanya jika desimal batasi 1 angka di belakang koma
//     return percentage % 1 === 0
//       ? percentage
//       : parseFloat(percentage.toFixed(1));
//   };
//   //   Kembalikan fungsi agar bisa di-destructurisasi di komponen lain
//   return {
//     formatCurrency,
//     getPercentage,
//   };
// }
// Kode lawas end

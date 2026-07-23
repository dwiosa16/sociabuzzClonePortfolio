import { createI18n } from 'vue-i18n';

const messages = {
  id: {
    navbar: {
      supporter: 'Masuk Sebagai Supporter',
      creator: 'Masuk Sebagai Kreator',
    },
    profile: {
      supportBtn: 'Beri Dukungan',
      emptyData: 'Belum ada data untuk periode ini',
    },
    pesanDukungan: {
      pesan: 'Pesan',
      topTeratas: 'Pendukung Teratas',
    },
    navbarHome: {
      registerKreator: 'Daftar Kreator',
      masukKreator: 'Masuk Kreator',
      masukSupporter: 'Masuk Supporter',
      masukPembeli: 'Masuk Pembeli',
    },
  },
  en: {
    navbar: {
      supporter: 'Sign in Supporter',
      creator: 'Sign in Creator',
    },
    profile: {
      supportBtn: 'Give Support',
      emptyData: 'No data available for this period',
    },
    pesanDukungan: {
      pesan: 'Message',
      topTeratas: 'Top Supporters',
    },
    navbarHome: {
      registerKreator: 'Sign Up Creator',
      masukKreator: 'Login Creator',
      masukSupporter: 'Login Supporter',
      masukPembeli: 'Login Buyer',
    },
  },
};

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('bahasa') || 'id',
  fallbackLocale: 'en',
  messages,
});

export default i18n;

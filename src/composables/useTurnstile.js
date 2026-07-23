import { ref, onMounted, onUnmounted } from 'vue';

export function useTurnstile() {
  const turnstileContainer = ref(null);
  const turnstileToken = ref('');
  let turnstileWidgetId = null;

  //   Fungsi internal untuk merender widget asli Cloudflare Turnstile
  const renderTurnstileWidget = () => {
    if (window.turnstile && turnstileContainer.value) {
      turnstileWidgetId = window.turnstile.render(turnstileContainer.value, {
        // Menggunakan Sitkey testing bawaan Cloudflare (Bisa berjalan di localhost)
        sitekey: import.meta.env.VITE_TURNSTILE_SITEKEY,
        callback: (token) => {
          turnstileToken.value = token; // Meyimpan token verifikasi yang sukses
        },
        'error-callback': () => {
          console.error('Gagal memuat verifikasi Cloudflare.');
        },
      });
    }
  };

  onMounted(() => {
    if (!document.getElementById('cloudflare-turnstile-script')) {
      const script = document.createElement('script');
      script.id = 'cloudflare-turnstile-script';
      script.src =
        'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      script.onload = () => {
        renderTurnstileWidget();
      };
    } else if (window.turnstile) {
      renderTurnstileWidget();
    }
  });

  //   Hapus widget secara bersih saat user pindah halaman agar tidak bocor memorinya
  onUnmounted(() => {
    if (window.turnstile && turnstileWidgetId !== null) {
      window.turnstile.remove(turnstileWidgetId);
    }
  });

  //   Fungsi tambahan untuk mereset captcha (misal jika login gagal dan ingin coba lagi)
  const resetTurnstile = () => {
    if (window.turnstile && turnstileWidgetId !== null) {
      window.turnstile.reset(turnstileWidgetId);
      turnstileToken.value = '';
    }
  };

  return {
    turnstileContainer,
    turnstileToken,
    resetTurnstile,
  };
}

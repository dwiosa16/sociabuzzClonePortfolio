// src/composables/useSupportModal.js
import { ref, reactive } from 'vue';

// Global State (Berbagi data antar komponen)
const isOpen = ref(false);
const modalTitle = ref('Kontribusi Dukungan');
const apiUrl = ref('');
const method = ref('POST');
const wishlists = ref([]);
const isLoading = ref(false);

// Struktur Data Form Pengiriman
const form = reactive({
  target_id: '',
  nominal: '',
  pesan: '',
  nama_pengirim: '',
  is_anonim: false,
  email_pengirim: '',
  wishlist_id: null,
});

export function useSupportModal() {
  // Fungsi utama untuk memicu modal muncul dari tombol mana saja
  const openModal = (config) => {
    apiUrl.value = config.apiUrl || '';
    method.value = config.method || 'POST';
    modalTitle.value = config.title || 'Kontribusi Dukungan';
    wishlists.value = config.wishlists || []; // Menerima array [ { id, title, price } ] milikmu

    // Reset isian form lama biar bersih
    form.target_id = config.targetId || '';
    form.nominal = '';
    form.pesan = '';
    form.nama_pengirim = '';
    form.is_anonim = false;
    form.email_pengirim = '';

    // LOGIK AUTO-CHECK:
    // Jika diklik dari tombol "Pilih" di kartu wishlist, langsung centang ID-nya.
    // Jika diklik dari tombol "Beri Dukungan" umum, set null karena opsional.
    if (config.selectedWishlistId) {
      form.wishlist_id = config.selectedWishlistId;
    } else {
      form.wishlist_id = null;
    }

    isOpen.value = true;
  };

  const closeModal = () => {
    isOpen.value = false;
  };

  // Fungsi submit untuk menembak API backend Laravel kamu
  const submitForm = async () => {
    isLoading.value = true;
    try {
      // Mapping payload agar format data rapi sebelum dikirim
      const payload = {
        target_id: form.target_id,
        nominal: Number(form.nominal), // Convert ke integer murni untuk database
        pesan: form.pesan,
        nama_pengirim: form.nama_pengirim,
        is_anonim: form.is_anonim,
        email_pengirim: form.email_pengirim,
        wishlist_id: form.wishlist_id,
      };

      const response = await fetch(apiUrl.value, {
        method: method.value,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || 'Terjadi kesalahan pada server Laravel.',
        );
      }

      alert('Dukungan berhasil diproses! Mengalihkan ke halaman pembayaran...');

      // Jika backend Laravel merespons dengan link Midtrans/Xendit/Tripay
      if (result.redirect_url) {
        window.location.href = result.redirect_url;
      }

      closeModal();
    } catch (error) {
      console.error(error);
      alert(error.message || 'Gagal terhubung ke server backend.');
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isOpen,
    modalTitle,
    wishlists,
    form,
    isLoading,
    openModal,
    closeModal,
    submitForm,
  };
}

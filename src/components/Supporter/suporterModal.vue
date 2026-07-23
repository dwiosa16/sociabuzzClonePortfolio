<template>
  <div
    v-if="isOpen"
    class="bg-opacity-60 fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4"
  >
    <div
      class="custom-scrollbar relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
    >
      <button
        type="button"
        @click="closeModal"
        class="absolute top-4 right-4 text-2xl font-bold text-gray-400 hover:text-gray-600"
      >
        &times;
      </button>

      <form
        @submit.prevent="submitForm"
        class="space-y-5 text-left text-gray-800"
      >
        <div>
          <label class="mb-2 block text-sm font-bold">Nominal</label>
          <div class="flex gap-2">
            <div class="relative">
              <select
                v-model="selectedCurrency"
                class="appearance-none rounded-xl border bg-white px-4 py-3 pr-8 text-sm font-medium focus:ring-1 focus:ring-green-500 focus:outline-none"
              >
                <option
                  v-for="currency in currencies"
                  :key="currency.code"
                  :value="currency.code"
                >
                  {{ currency.label }}
                </option>
              </select>
              <span
                class="pointer-events-none absolute top-3.5 right-3 text-xs text-gray-500"
                >▼</span
              >
            </div>
            <input
              type="number"
              step="any"
              v-model="form.nominal"
              class="w-full rounded-xl border p-3 text-sm focus:ring-1 focus:ring-green-500 focus:outline-none"
              placeholder="Masukkan nominal..."
              required
            />
          </div>

          <div class="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              v-for="amount in [10000, 25000, 50000, 100000, 200000]"
              :key="amount"
              @click="setNominalValue(amount)"
              class="rounded-full border px-4 py-2 text-xs font-semibold tracking-wide text-gray-700 transition hover:bg-gray-50 active:scale-95"
            >
              {{ formatCurrency(amount, selectedCurrency) }}
            </button>
          </div>
        </div>

        <div>
          <label class="block text-sm font-bold">Kontribusi ke wishlist</label>
          <span class="mb-2 block text-xs text-gray-400"
            >Tidak wajib diisi. Hanya isi jika ingin kontribusi.</span
          >

          <div class="space-y-3 rounded-2xl border bg-white p-4">
            <div v-if="wishlists.length > 0">
              <label
                v-for="item in wishlists"
                :key="item.id"
                class="flex cursor-pointer items-center gap-3 p-1 text-sm font-medium select-none"
              >
                <input
                  type="radio"
                  name="wishlist_option"
                  :value="item.id"
                  v-model="form.wishlist_id"
                  class="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span
                  >{{ item.title }} (
                  {{ formatCurrency(item.price, selectedCurrency) }})</span
                >
              </label>
            </div>
            <p v-else class="text-xs text-gray-400">
              Tidak ada wishlist aktif dari kreator ini.
            </p>
          </div>
        </div>

        <div>
          <label class="mb-2 block text-sm font-bold">Pesan</label>
          <textarea
            v-model="form.pesan"
            rows="3"
            maxlength="250"
            class="w-full resize-none rounded-xl border p-3 text-sm focus:ring-1 focus:ring-green-500 focus:outline-none"
            placeholder="Tulis pesan dukunganmu..."
          ></textarea>
          <span class="mt-1 block text-right text-xs text-gray-400">
            {{ form.pesan ? form.pesan.length : 0 }} / 250
          </span>
        </div>

        <div>
          <label class="mb-2 block text-sm font-bold">Nama Anda</label>
          <input
            type="text"
            v-model="form.nama_pengirim"
            class="w-full rounded-xl border p-3 text-sm focus:ring-1 focus:ring-green-500 focus:outline-none"
            required
          />
          <label
            class="mt-2 inline-flex cursor-pointer items-center text-xs text-gray-600"
          >
            <input
              type="checkbox"
              v-model="form.is_anonim"
              class="mr-2 rounded text-green-600 focus:ring-green-500"
            />
            Anonim
          </label>
        </div>

        <div>
          <label class="mb-2 block text-sm font-bold">Email Anda</label>
          <input
            type="email"
            v-model="form.email_pengirim"
            class="w-full rounded-xl border p-3 text-sm focus:ring-1 focus:ring-green-500 focus:outline-none"
            required
          />
          <label
            class="mt-2 inline-flex cursor-pointer items-center text-xs text-gray-600"
          >
            <input
              type="checkbox"
              class="mr-2 rounded text-green-600 focus:ring-green-500"
            />
            Sembunyikan email saya dari {{ modalTitle.replace('Dukung ', '') }}
          </label>
        </div>

        <div class="space-y-3 border-t pt-2 text-xs text-gray-600">
          <label class="flex cursor-pointer items-start">
            <input
              type="checkbox"
              class="mt-0.5 mr-3 rounded text-green-600 focus:ring-green-500"
              required
            />
            <span>
              Dengan ini saya menyatakan transaksi ini: murni dukungan saya
              untuk <strong>{{ modalTitle.replace('Dukung ', '') }}</strong
              >, tidak dapat dikembalikan, bukan untuk transaksi komersial,
              bukan untuk aktivitas ilegal apa pun, tidak melanggar ketentuan
              SociaBuzz.
            </span>
          </label>

          <label class="flex cursor-pointer items-center">
            <input
              type="checkbox"
              class="mr-3 rounded text-green-600 focus:ring-green-500"
              required
            />
            <span>Saya berusia 18 tahun atau lebih</span>
          </label>
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="flex w-full items-center justify-center gap-2 rounded-full bg-[#7cd11a] py-3.5 text-sm font-bold text-white transition duration-200 hover:bg-[#6db814] disabled:bg-gray-300"
        >
          <span>{{
            isLoading ? 'Memproses...' : 'Pilih metode pembayaran'
          }}</span>
          <span v-if="!isLoading">&rarr;</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useSupportModal } from '../../composables/useSupportModal';
import { useFormatter } from '../../composables/useFormatter';
import { useWishlist } from '../../composables/useWishlist';

const { formatCurrency, currencies, convertCurrency } = useFormatter();

const { isOpen, modalTitle, form, isLoading, closeModal, submitForm } =
  useSupportModal();

const selectedCurrency = ref('IDR');
// Fungsi untuk memasukan nilai konversi ke dalam form input
const setNominalValue = (baseAmount) => {
  const converted = convertCurrency(baseAmount, selectedCurrency.value);

  // Kalau USD kita izinkan angka dibelakang koma
  // Kalau JPY/IDR kita bulatkan jadi angka utuh
  if (selectedCurrency.value === 'USD') {
    form.nominal = Number(converted.toFixed(2));
  } else {
    form.nominal = Math.round(converted);
  }
};

// Untuk Mereset nilai uang
watch(selectedCurrency, () => {
  // Kosongkan nilai nominal setiap mata uang diganti
  form.nominal = '';
});

const { wishlistItems: wishlists } = useWishlist();
</script>

<style scoped>
/* Scrollbar tipis estetik */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 9999px;
}
</style>

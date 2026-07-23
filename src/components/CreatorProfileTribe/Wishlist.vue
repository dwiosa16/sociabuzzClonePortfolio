<template>
  <div
    class="flex w-full flex-col items-center justify-start bg-[#fcfcf9] pt-10 pb-10 dark:bg-linear-to-b dark:from-neutral-900 dark:to-neutral-950"
  >
    <div
      class="mx-auto flex w-full flex-col items-center px-10 pb-10 text-white"
    >
      <div class="mb-4 flex justify-end px-4">
        <label class="mr-2 self-center text-sm font-bold text-gray-700"
          >Mata Uang:</label
        >
        <select
          v-model="selectedCurrency"
          class="rounded border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-amber-600 focus:outline-none dark:bg-amber-950 dark:text-white"
        >
          <option
            v-for="currency in currencies"
            :key="currency.code"
            :value="currency.code"
          >
            {{ currency.label }}
          </option>
        </select>
      </div>
      <h2
        class="mb-10 text-center text-2xl font-black text-gray-900 md:text-3xl dark:text-white"
      >
        Wishlist
      </h2>
      <!-- <div
        id="wishlist-grid"
        class="grid w-full max-w-6xl grid-cols-1 justify-items-center gap-6 bg-red-500 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:gap-10"
        :style="{
          gridTemplateColumns:
            windowWidth >= 1024
              ? 'repeat(3, minmax(0,1fr))'
              : windowWidth >= 768
                ? 'repeat(2, minmax(0,1fr))'
                : 'repeat(1, minmax(0,1fr))',
        }"
      > -->
      <TransitionGroup
        id="wishlist-grid"
        name="socia-flip"
        class="grid w-full max-w-6xl grid-cols-1 justify-items-center gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:gap-10"
        tag="div"
      >
        <!-- lg:max-[340px] flex w-full max-w-md justify-center transition-all duration-500 ease-in-out md:max-w-sm -->
        <div v-for="card in wishlistItems" :key="card.id" class="">
          <div
            class="card-support flex h-full w-full flex-col justify-between rounded-2xl border border-gray-200 bg-white p-3 text-left shadow-sm"
          >
            <div>
              <h3
                class="text-xs leading-tight font-black text-gray-900 lg:text-lg"
              >
                {{ card.title }}
              </h3>
              <p class="mt-1 text-xs font-bold text-gray-500">
                {{ formatCurrency(card.price, selectedCurrency) }}
              </p>
            </div>
            <div class="mt-6 mb-2 flex items-end justify-between">
              <p class="text-[10px] font-bold text-gray-400">
                {{ formatCurrency(card.currentFunds, selectedCurrency) }} ({{
                  getPercentage(card)
                }}%)
              </p>
            </div>
            <div
              class="relative h-3 w-full overflow-hidden rounded-full border border-gray-200 bg-gray-100 dark:border-neutral-200 dark:bg-neutral-800"
            >
              <div
                class="h-full rounded-full bg-[#7ed321] transition-all duration-1000 ease-in-out"
                :style="{ width: isMounted ? getPercentage(card) + '%' : '0%' }"
              ></div>
              <div class="progress-pattern absolute inset-0 opacity-40"></div>
            </div>
            <button
              @click="handleSelectWishlist(card)"
              class="mt-5 w-full cursor-pointer rounded-full bg-[#7ed321] py-2.5 text-sm font-black text-white transition-all hover:bg-[#70bd1e] active:scale-95"
            >
              Pilih
            </button>
          </div>
        </div>
      </TransitionGroup>
      <!-- </div> -->
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useSupportModal } from '../../composables/useSupportModal';
import { useFormatter } from '../../composables/useFormatter';
import { useWishlist } from '../../composables/useWishlist';

const { openModal } = useSupportModal();

// Ambil data lewat distructuring
const { wishlistItems } = useWishlist();

// Ambil fungsi formatCurrency, getPercentage di useFormatter
const { formatCurrency, getPercentage, fetchRates, currencies } =
  useFormatter();

const isMounted = ref(false);
// Dropdown Tukar mata uang IDR, USD, JPY
const selectedCurrency = ref(
  localStorage.getItem('wishlist_currency') || 'IDR',
);

watch(selectedCurrency, (newCurrency) => {
  localStorage.setItem('wishlist_currency', newCurrency);
});

onMounted(async () => {
  isMounted.value = true;

  // Pemicu pemanggilan data kurs internet saat halaman dibuka
  await fetchRates();
});

// Ubah Mata uang melalui composables

// // Ubah Mata Uang
// const formatCurrency = (value) => {
//   if (!value) return '0';
//   return new Intl.NumberFormat('id-ID').format(value);
// };

// // Hitung persenan
// const getPercentage = (card) => {
//   if (!card.price || !card.currentFunds) return 0;
//   const percentage = (card.currentFunds / card.price) * 100;
//   return percentage % 1 === 0 ? percentage : parseFloat(percentage.toFixed(1));
// };

// const windowWidth = ref(
//   typeof window !== 'undefined' ? window.innerWidth : 1024,
// );

// const updateWidth = () => {
//   windowWidth.value = window.innerWidth;
// };

// onMounted(() => {
//   window.addEventListener('resize', updateWidth);

//   setTimeout(() => {
//     isMounted.value = true;
//   }, 100);
// });

onUnmounted(() => {
  // window.removeEventListener('resize', updateWidth);
});

const handleSelectWishlist = (card) => {
  openModal({
    apiUrl: '/api/v1/donations',
    method: 'POST',
    title: 'Dukung Chill Gaming | Osa Kun',
    targetId: 'osa_kun_123',
    wishlists: wishlistItems.value,
    selectedWishlistId: card.id,
  });
};

// Coding Lawas Start
// // Siapkan data array object dengan ID unik untuk dijadikan :key
// const wishlistItems = ref([
//   { id: 'pc', title: 'Upgrade PC', price: '10,000,000' },
//   { id: 'bertani', title: 'Bertani/Berkebun', price: '5,000,000' },
//   { id: 'robux', title: 'Beli Robux', price: '100,000' },
//   //   { id: 'streaming', title: 'Alat Streaming', price: '2,500,000' },
// ]);
// // Fungsi tes untuk menghapus kartu agar ruang kosongnya langsung diisi oleh kartu lain
// const pilihCard = (id) => {
//   wishlistItems.value = wishlistItems.value.filter((item) => item.id !== id);
// };

// const windowWidth = ref(window.innerWidth);

// const updateWidth = () => {
//   windowWidth.value = window.innerWidth;
// };

// onMounted(() => {
//   window.addEventListener('resize', updateWidth);
// });

// onUnmounted(() => {
//   window.removeEventListener('resize', updateWidth);
// });
// Coding Lawas End
</script>

<style>
/* Aktif Otomatis hanya saat layout grid bergeser mengisi ruang kosong */
.socia-flip-move {
  transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
}
/* Animasi menghilang halus khusus untuk kartu yang keluar dari grid */
.socia-flip-leave-active {
  position: absolute;
  width: 100%;
  transform: scale(0.9);
  transition: all 0.4s ease;
  max-width: 340px;
}

.socia-flip-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

@keyframes dropdownFade {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-dropdown-fade {
  animation: dropdownFade 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>

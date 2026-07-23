<template>
  <div
    class="w-full border-b border-gray-100 bg-[#fdfdfb] pt-12 pb-12 text-center dark:border-amber-500/50 dark:bg-linear-to-b dark:from-neutral-950 dark:to-neutral-900"
  >
    <div class="mx-auto max-w-4xl px-4">
      <div
        class="mx-auto mb-6 h-32 w-32 overflow-hidden rounded-full border border-gray-200 shadow-sm md:h-40 md:w-40"
      >
        <img
          class="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400"
          alt="Avatar Osa Kun"
        />
      </div>

      <h1
        class="mb-6 text-2xl font-black tracking-tight text-gray-900 md:text-4xl dark:text-white"
      >
        Chill Gaming | Osa Kun
      </h1>

      <button
        @click="handleSupport"
        class="text-md mx-auto w-full max-w-xs cursor-pointer rounded-full bg-[#7ed321] py-3 font-black text-white shadow-sm transition-all hover:bg-[#70bd1e] active:scale-95"
      >
        {{ $t('profile.supportBtn') }}
        <!-- Beri Dukungan -->
      </button>
    </div>
  </div>
</template>

<script setup>
import { useSupportModal } from '../../composables/useSupportModal';
// import Wishlist from './Wishlist.vue';
import { useWishlist } from '../../composables/useWishlist';
const { openModal } = useSupportModal();

const { wishlistItems } = useWishlist();

// const wishlistItems = [
//   {
//     id: 'pc',
//     title: 'Upgrade PC',
//     price: '10000000',
//   },
//   {
//     id: 'bertani',
//     title: 'Bertani/Berkebun',
//     price: '5000000',
//   },
//   {
//     id: 'robux',
//     title: 'Beli Robux',
//     price: '100000',
//   },
// ];

const handleSupport = () => {
  openModal({
    apiUrl: '/api/v1/donations',
    method: 'POST',
    title: 'Dukung Chill Gaming | Osa Kun',
    targetId: 'osa_kun_123',
    wishlists: wishlistItems,
  });
};
</script>

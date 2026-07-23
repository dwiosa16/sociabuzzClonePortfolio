<template>
  <!-- Pesan Beri Dukungan -->
  <section
    class="flex w-full flex-col items-center justify-start bg-[#fcfcf9] pt-10 pb-10 dark:bg-linear-to-b dark:from-neutral-900 dark:to-neutral-950"
  >
    <div class="mx-auto w-full max-w-3xl px-4 pt-10 pb-16">
      <div class="items-left flex max-w-full flex-col md:mx-0">
        <h2
          class="mb-6 text-left text-xl font-black tracking-tight text-gray-900 md:text-2xl dark:text-white"
        >
          {{ $t('pesanDukungan.pesan') }}
        </h2>

        <button
          @click="handleSupport"
          class="mb-10 w-full cursor-pointer rounded-full bg-[#7ed321] py-3.5 text-sm font-black tracking-wide text-white shadow-xs transition-colors hover:bg-[#70bd1e] sm:text-base"
        >
          <!-- Beri Dukungan -->
          {{ $t('profile.supportBtn') }}
        </button>

        <div class="m-auto flex w-full max-w-3xl justify-center">
          <p
            class="inline-block w-full rounded-xl border border-gray-200 bg-[#f4f4f0]/60 px-4 py-3 text-center text-[12px] font-medium text-gray-500"
          >
            <a href="#" class="font-bold text-blue-500 hover:underline"
              >Laporkan di sini</a
            >
            jika konten melanggar
            <a href="#" class="font-bold text-blue-500 hover:underline"
              >Ketentuan Penggunaan</a
            >
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useSupportModal } from '../../composables/useSupportModal';
import { useWishlist } from '../../composables/useWishlist';

const { openModal } = useSupportModal();

const { wishlistItems } = useWishlist();

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

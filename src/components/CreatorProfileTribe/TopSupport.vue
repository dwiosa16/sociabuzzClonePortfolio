<template>
  <!-- Top Support -->
  <section
    class="flex w-full flex-col items-center justify-start bg-[#fcfcf9] pt-10 pb-10 dark:border dark:border-t-amber-500/50 dark:border-b-amber-500/50 dark:bg-linear-to-b dark:from-neutral-950 dark:to-neutral-900"
  >
    <div class="mx-auto w-full max-w-3xl place-self-auto px-4 pt-10 pb-16">
      <div class="mx-auto flex w-full flex-col rounded-sm md:mx-0">
        <h2
          class="mb-4 text-xl font-black tracking-tight text-gray-900 md:text-2xl dark:text-white"
        >
          {{ $t('pesanDukungan.topTeratas') }}
        </h2>

        <div class="relative mb-6 w-full">
          <select
            class="text-dark w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-white px-4 py-2.5 pr-8 text-base focus:outline-hidden"
          >
            <option>Sejak awal</option>
            <option>Bulan ini</option>
          </select>
          <span
            class="pointer-events-none absolute top-3.5 right-4 mb-30 h-3 w-3 rotate-45 border-r-2 border-b-2 text-[9px] text-gray-400"
          ></span>
        </div>

        <p
          class="mt-2 mb-10 text-center text-sm tracking-wide text-black dark:text-white"
        >
          <!-- Belum ada data untuk periode ini -->
          {{ $t('profile.emptyData') }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup></script>

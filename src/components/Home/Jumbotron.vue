<template>
  <!-- Container pembungkus -->
  <div
    class="hero-container flex min-h-[70vh] flex-col items-center justify-center bg-[#eef5f3] px-4 py-16 text-center"
  >
    <div class="mb-6 flex items-center gap-2 select-none">
      <span class="text-4xl font-extrabold tracking-tight">
        <span class="text-[#2d4739]">Socia</span
        ><span class="text-[#00a2e8]">Buzz</span>
      </span>
    </div>

    <h1
      class="mb-8 max-w-2xl text-4xl leading-tight font-black text-[#222222] md:text-5xl"
    >
      Monetization tools <br />
      for creators
    </h1>

    <div class="mb-12 flex w-full max-w-xs flex-col items-center gap-4">
      <button
        @click="goToRegister"
        class="w-full cursor-pointer rounded-full bg-[#7cb316] px-6 py-3 text-lg font-bold text-white shadow-md transition-colors duration-200 hover:bg-[#669410]"
      >
        Sign Up Creator
      </button>
      <button
        @click="goToLogin"
        class="mt-1 cursor-pointer text-sm font-medium text-[#333333] hover:underline"
      >
        Login Creator
      </button>
      <a href="#" class="text-xs text-[#666666] hover:underline"
        >Login Pengguna Lainnya</a
      >
    </div>
    <p
      class="fonet-medium max-w-2xl px-2 text-base leading-relaxed text-[#333333] md:text-lg"
    >
      +150,000 kreator di Indonesia dan seluruh dunia menggunakan
      <span class="font-bold">SociaBuzz</span> untuk menghasilkan uang dari
      passion mereka
    </p>
    <!-- Akhir container pembungkus -->
  </div>
</template>

<script setup></script>

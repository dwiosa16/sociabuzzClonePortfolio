<template>
  <div
    class="mx-auto my-6 w-full max-w-md rounded-3xl border border-gray-100 bg-white p-8 text-gray-900 shadow-sm"
  >
    <div class="mb-8 text-center">
      <h1 class="mb-2 text-2xl font-bold text-gray-900">Sign In</h1>
      <p class="mb-4 text-sm text-gray-500">Login Sebagai {{ roleName }}</p>

      <div class="item-center flex justify-center gap-2 text-3xl font-bold">
        <span class="font-semibold tracking-tight text-emerald-500 lowercase"
          >socia<span class="font-bold text-sky-500">buzz</span></span
        >
      </div>
    </div>

    <button
      @click="handleGoogleLogin"
      type="button"
      class="relative mb-6 flex w-full cursor-pointer items-center justify-center rounded-full border border-gray-300 px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
    >
      <svg class="absolute left-4 h-5 w-5" viewBox="0 0 24 24">
        <path
          fill="#EA4335"
          d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.256-3.133C18.331 2.11 15.545 1 12.24 1 6.133 1 1.173 5.927 1.173 12s4.96 11 11.067 11c6.37 0 10.596-4.437 10.596-10.778 0-.724-.077-1.277-.174-1.937H12.24z"
        />
      </svg>
      <span class="text-sm text-gray-600">Login dengan Google</span>
    </button>

    <div class="relative mb-6 flex items-center py-2">
      <div class="grow border-t border-gray-200"></div>
      <span class="mx-4 shrink text-sm text-gray-400">or</span>
      <div class="grow border-t border-gray-200"></div>
    </div>

    <form @submit.prevent="handleManualLogin" class="space-y-5 text-left">
      <div>
        <label class="mb-2 block text-sm font-bold text-gray-900" for="email"
          >Email</label
        >
        <input
          v-model="email"
          id="email"
          type="email"
          required
          class="focus:ring-emeald-400 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:outline-none"
        />
      </div>
      <div>
        <label class="mb-2 block text-sm font-bold text-gray-900" for="password"
          >Password</label
        >
        <input
          v-model="password"
          id="password"
          type="password"
          required
          class="focus:ring-emeald-400 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:outline-none"
        />
        <div class="mt-2">
          <a
            href="#"
            class="text-sm text-gray-400 underline hover:text-gray-600"
            >Forgot password?</a
          >
        </div>
      </div>
      <!-- Cloudeflare -->
      <div
        class="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3 text-xs text-gray-500"
      >
        <div class="flex items-center gap-3">
          <div
            class="h-5 w-5 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent"
          ></div>
          <div class="text-left">
            <p class="font-medium text-gray-700">Melakukan verifikasi...</p>
            <a href="#" class="text-[11px] text-gray-400 underline"
              >Pemecahan masalah</a
            >
          </div>
        </div>
        <div class="text-right">
          <p class="text-[10px] font-bold text-gray-700">CLOUDFLARE</p>
          <p class="text-[9px] text-gray-400">Privasi • Bantuan</p>
        </div>
      </div>
      <button
        type="submit"
        class="mt-6 w-full cursor-pointer rounded-full bg-[#A3E635] px-4 py-3 text-lg font-bold text-white shadow-sm transition-colors hover:bg-[#8FCE27]"
      >
        Sign In
      </button>
    </form>
  </div>
  <div class="mt-2 space-y-6 text-center text-sm">
    <p class="text-gray-500">
      Belum pernah daftar?
      <RouterLink
        :to="{
          path: '/register',
          query: { role: route.query.role },
        }"
        class="ml-1 font-bold text-gray-900 hover:underline"
      >
        Daftar di sini</RouterLink
      >
    </p>

    <div class="my-4 border-t border-gray-100"></div>
    <div
      class="rounded-2xl border border-gray-100 bg-gray-50 p-4 transition-all hover:bg-gray-100/70"
    >
      <p class="text-xs text-gray-600 sm:text-sm">
        Jika Anda Klien / pengguna jasa, loginnya
        <RouterLink
          :to="{ path: '/login', query: { role: 'pembeli' } }"
          class="ml-1 font-bold text-gray-900 underline-offset-2 hover:underline"
          >di sini</RouterLink
        >
      </p>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// Menangkap data yang dikirim dari LoginView
defineProps({
  roleName: String,
});

// State untuk form input
const email = ref('');
const password = ref('');

// Fungsi handle login
const handleGoogleLogin = () => {
  alert('Menghubungkan ke API Google Auth untuk Pembeli...');
};

const handleManualLogin = () => {
  alert(`Login Pembeli dikirim! Email: ${email.value}`);
  // Disini nanti tempatnya axios.post('/api/login/pembeli, {email: email.value, password: password.value} ')
};
</script>

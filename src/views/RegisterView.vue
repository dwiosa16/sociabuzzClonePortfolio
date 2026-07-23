<template>
  <div
    class="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4"
  >
    <div
      class="mx-auto my-6 w-full max-w-md rounded-3xl border border-gray-100 bg-white p-8 text-gray-900 shadow-sm"
    >
      <div class="mb-8 text-center">
        <h1 class="mb-2 text-2xl font-bold text-gray-900">Sign Up</h1>
        <p class="mb-4 text-sm text-gray-500">Daftar Sebagai {{ roleName }}</p>

        <div class="item-center flex justify-center gap-2 text-3xl font-bold">
          <span class="font-semibold tracking-tight text-emerald-500 lowercase">
            socia<span class="font-bold text-sky-500">buzz</span>
          </span>
        </div>
      </div>

      <button
        @click="handleGoogleRegister"
        type="button"
        class="relative mb-6 flex w-full cursor-pointer items-center justify-center rounded-full border border-gray-300 px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
      >
        <svg class="absolute left-4 h-5 w-5" viewBox="0 0 24 24">
          <path
            fill="#EA4335"
            d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.256-3.133C18.331 2.11 15.545 1 12.24 1 6.133 1 1.173 5.927 1.173 12s4.96 11 11.067 11c6.37 0 10.596-4.437 10.596-10.778 0-.724-.077-1.277-.174-1.937H12.24z"
          />
        </svg>
        <span class="text-sm text-gray-600">Daftar dengan Google</span>
      </button>

      <div class="relative mb-6 flex items-center py-2">
        <div class="grow border-t border-gray-200"></div>
        <span class="mx-4 shrink text-sm text-gray-400">or</span>
        <div class="grow border-t border-gray-200"></div>
      </div>

      <form @submit.prevent="handleManualRegister" class="space-y-5 text-left">
        <div>
          <label class="mb-2 block text-sm font-bold text-gray-900"
            >Nama Lengkap</label
          >
          <input
            v-model="name"
            type="text"
            required
            class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-emerald-400 focus:outline-none"
          />
        </div>

        <div>
          <label class="mb-2 block text-sm font-bold text-gray-900"
            >Email</label
          >
          <input
            v-model="email"
            type="email"
            required
            class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-emerald-400 focus:outline-none"
          />
        </div>

        <div>
          <label class="mb-2 block text-sm font-bold text-gray-900"
            >Password</label
          >
          <div class="relative mt-1">
            <input
              v-model="password"
              :type="passwordType"
              required
              class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-emerald-400 focus:outline-none"
            />
            <button
              type="button"
              @click="togglePassword"
              class="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-4 text-gray-400 hover:text-gray-600"
            >
              <!-- Icon Mata Terbuka -->
              <svg
                v-if="isPasswordVisible"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-5 w-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              <!-- Icon Mata Tertutup -->
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-5 w-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 1-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            </button>
          </div>
        </div>

        <div>
          <label class="mb-2 block text-sm font-bold text-gray-900"
            >Konfirmasi Password</label
          >
          <div class="relative mt-1">
            <input
              v-model="passwordConfirmation"
              :type="confirmType"
              required
              class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-emerald-400 focus:outline-none"
            />

            <button
              type="button"
              @click="toggleConfirm"
              class="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-4 text-gray-400 hover:text-gray-600"
            >
              <!-- Icon Mata Terbuka -->
              <svg
                v-if="isConfirmVisible"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-5 w-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              <!-- Icon Mata Tertutup -->
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-5 w-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 1-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            </button>
          </div>
        </div>

        <button
          type="submit"
          class="mt-6 w-full cursor-pointer rounded-full bg-[#A3E635] px-4 py-3 text-lg font-bold text-white shadow-sm transition-colors hover:bg-[#8FCE27]"
        >
          Daftar Sekarang
        </button>
      </form>
    </div>

    <div class="mt-2 mb-20 text-center text-sm">
      <p class="text-gray-500">
        Sudah punya akun?
        <RouterLink
          :to="{ path: '/login', query: { role: currentRole } }"
          class="ml-1 font-bold text-gray-900 hover:underline"
        >
          Login di sini
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTogglePassword } from '../composables/useTogglePassword';

// Instansiasi pertama untuk Password utama (di-distructure menggunakan alias) "ikon mata"
const {
  inputType: passwordType,
  isVisible: isPasswordVisible,
  toggleVisibility: togglePassword,
} = useTogglePassword();

// Instansiasi kedua untuk konfirmasi Password
const {
  inputType: confirmType,
  isVisible: isConfirmVisible,
  toggleVisibility: toggleConfirm,
} = useTogglePassword();

const route = useRoute();
const router = useRouter();

// State Form Data
const name = ref('');
const email = ref('');
const password = ref('');
const passwordConfirmation = ref('');

// 1. MEMBACA ROLE DARI URL (?role=creator)
const currentRole = computed(() => route.query.role || 'supporter');

// 2. MENGUBAH TEKS JUDUL BIAR SESUAI ROLE
const roleName = computed(() => {
  switch (currentRole.value) {
    case 'creator':
      return 'Kreator';
    case 'admin':
      return 'Admin';
    case 'pembeli':
      return 'Pembeli';
    default:
      return 'Suporter';
  }
});

const handleGoogleRegister = () => {
  alert(`Daftar Google sebagai Oauth ${currentRole.value}`);
};

const handleManualRegister = () => {
  if (password.value !== passwordConfirmation.value) {
    alert('Password konfirmasi tidak cocok!');
    return;
  }

  // Data siap dikirim ke API Backend Laravel-mu nanti
  const payload = {
    name: name.value,
    email: email.value,
    password: password.value,
    password_confirmation: passwordConfirmation.value,
    role: currentRole.value, // Otomatis mengirim 'creator' ke backend
  };

  alert(`Data Register ${payload.role} Siap Dikirim ke API Backend!`);
  console.log('Payload API:', payload);
};
</script>

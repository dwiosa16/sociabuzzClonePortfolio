<template>
  <nav
    :class="
      isScrolled
        ? 'nav-glass border-gray-200/50 shadow-sm dark:border-amber-600/50 dark:shadow-md'
        : 'border-transparent bg-transparent shadow-none'
    "
    id="navbar"
    class="sticky top-0 z-50 flex w-full items-center justify-between border-b border-gray-200 px-4 py-3 transition-all duration-300 md:px-10"
  >
    <div class="flex cursor-pointer items-center gap-1">
      <div
        class="flex flex-col items-center justify-center text-xl font-black tracking-tighter"
      >
        <span class="leading-none text-[#7ed321]">S</span>
        <span class="-mt-1 leading-none text-[#2d78f4]">B</span>
      </div>
      <div class="ml-1 flex h-6 w-6 rotate-12 flex-col justify-between">
        <div class="h-2.5 w-full rounded-full bg-[#7ed321]"></div>
        <div class="-mt-1 h-2.5 w-full rounded-full bg-[#2d78f4]"></div>
      </div>
    </div>

    <div
      class="relative flex items-center gap-4 text-sm text-gray-700 dark:text-gray-200"
    >
      <div class="hidden items-center gap-4 md:flex">
        <RouterLink
          v-for="(menu, index) in currentMenu"
          :key="index"
          :to="menu.to"
          class="font-bold transition-colors hover:text-[#7ed321]"
        >
          {{ $t(menu.labelKey) }}
        </RouterLink>
      </div>
      <!-- <button @click.prevent="toggleBahasa"></button> Kalau mau pakai yang biasa-->
      <div class="relative" ref="dropdownRef">
        <button @click.prevent="toggleDropdown" type="button">
          <label
            for="ubah-bahasa"
            class="group relative flex cursor-pointer items-center gap-2"
          >
            <span
              class="-group-hover:transition-colors flex items-center gap-1 rounded border border-gray-300 bg-slate-800 px-1 py-0.5 text-[7px] text-white group-hover:bg-[#7ed321] group-hover:text-white"
              >A
              <span
                class="rounded-4 bg-white px-0.5 text-slate-950 group-hover:text-[#7ed321]"
                >&#25991;</span
              >
            </span>
            <span
              class="flex items-center gap-1 text-sm font-medium text-gray-700 uppercase group-hover:text-[#7ed321] dark:text-slate-200"
            >
              {{ locale }}
              <svg
                class="h-5.5 w-5.5 transition-transform duration-200"
                :class="{ 'rotate-180': isDropdownOpen }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </span>
          </label>
        </button>

        <div
          v-if="isDropdownOpen"
          class="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-offset-4 dark:bg-slate-800 dark:ring-slate-700"
        >
          <div class="border-b border-gray-100 p-2 dark:border-slate-700">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari bahasa..."
              class="w-full rounded border border-gray-300 bg-gray-50 px-3 py-1.5 text-sm focus:border-[#7ed321] focus:ring-1 focus:ring-[#7ed321] focus:outline-none dark:border-slate-600 dark:bg-slate-900 dark:text-white"
            />
          </div>

          <ul
            class="<tbody> max-h-60 overflow-y-auto py-1 text-sm text-gray-700 dark:text-slate-200"
          >
            <li v-for="lang in filteredLanguages" :key="lang.code">
              <button
                @click="selectLanguage(lang.code)"
                type="button"
                class="flex w-full items-center justify-between px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-slate-700"
                :class="{
                  'bg-slate-100 font-semibold text-[#7ed321] dark:bg-slate-900':
                    locale === lang.code,
                }"
              >
                <span>{{ lang.name }}</span>
                <svg
                  v-if="locale === lang.code"
                  class="h-4 w-4 text-[#7ed321]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </button>
            </li>
            <li
              v-if="filteredLanguages.length === 0"
              class="px-4 py-3 text-center text-xs text-gray-400 dark:text-slate-500"
            >
              Bahasa Tidak Ditemukan
            </li>
          </ul>
        </div>
      </div>

      <div class="hidden items-center select-auto md:flex">
        <button
          @click="toggleDarkMode"
          class="relative flex h-7 w-14 cursor-pointer items-center justify-between rounded-full bg-gray-100 p-1 transition-colors duration-200 dark:bg-gray-700"
        >
          <div
            class="absolute left-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] shadow-md transition-transform duration-300 ease-in-out"
            :class="{ 'translate-x-7': isDarkMode }"
          >
            {{ isDarkMode ? '🌙' : '☀️' }}
          </div>
        </button>
      </div>

      <button
        @click="isMenuOpen = !isMenuOpen"
        class="hamburger-btn flex cursor-pointer items-center gap-1.5 font-bold text-gray-700 transition-colors select-none hover:text-[#7ed321] md:hidden dark:text-slate-200"
      >
        <svg
          class="h-5 w-5"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 6h16"
            class="origin-center transition-all duration-300 ease-in-out"
            :class="{
              '-rotate-45 transform-[translateY(6px)]': isMenuOpen,
            }"
          ></path>
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 12h16"
            class="transition-all duration-300 ease-in-out"
            :class="{ 'scale-x-0 opacity-0': isMenuOpen }"
          ></path>
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 18h16"
            class="origin-center transition-all duration-300 ease-in-out"
            :class="{
              'rotate-45 transform-[translateY(-6px)]': isMenuOpen,
            }"
          ></path>
        </svg>
        <span class="text-base text-slate-900 dark:text-slate-200"></span>
      </button>

      <div
        v-if="isMenuOpen"
        ref="menuRef"
        class="animate-drop-fade absolute top-full right-0 z-50 mt-3 w-52 rounded-2xl border border-gray-100 bg-white p-2 text-gray-800 shadow-lg md:hidden dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
      >
        <RouterLink
          v-for="(menu, index) in currentMenu"
          :key="index"
          :to="menu.to"
          class="flex items-center gap-3 rounded-xl p-3 text-sm font-bold transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
          ><span
            ><img
              src="/src/assets/icon/cobalt.svg"
              alt=""
              class="h-5 w-5 pt-1 transition-all duration-300 dark:invert"
          /></span>
          {{ $t(menu.labelKey) }}
        </RouterLink>
        <div class="my-1 border-t border-gray-100 dark:border-gray-700"></div>
        <div
          class="flex items-center justify-between rounded-xl p-3 text-sm font-bold"
        >
          <div class="flex items-center gap-3 select-none">
            {{ isDarkMode ? '🌓 Gelap' : '🌞 Terang' }}
          </div>

          <button
            @click="toggleDarkMode"
            class="relative flex h-7 w-14 cursor-pointer items-center justify-between rounded-full bg-gray-100 p-1 transition-colors duration-200 dark:bg-gray-700"
          >
            <div
              class="absolute left-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] shadow-md transition-transform duration-300 ease-in-out"
              :class="{ 'translate-x-7': isDarkMode }"
            >
              {{ isDarkMode ? '🌙' : '☀️' }}
            </div>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useBahasa } from '../composables/useLanguage';
import { useNavbarMenu } from '../composables/useNavbarMenu';

const { currentMenu } = useNavbarMenu();
// Deklarasi props untuk menerima array menu dari luar
// defineProps({
//   menuItems: {
//     type: Array,
//     required: true,
//     default: () => [],
//   },
// });

const {
  locale,
  isDropdownOpen,
  searchQuery,
  toggleDropdown,
  selectLanguage,
  filteredLanguages,
} = useBahasa();

// 2. State & Refs Navbar
const isScrolled = ref(false);
const isMenuOpen = ref(false);
const isDarkMode = ref(false);
const dropdownRef = ref(null);
const menuRef = ref(null);

// 3. Fungsi Logika
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.classList.toggle('dark', isDarkMode.value);
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
};

const handleClickOutside = (event) => {
  // Tutup Dropdown Bahasa
  if (
    isDropdownOpen.value &&
    dropdownRef.value &&
    !dropdownRef.value.contains(event.target)
  ) {
    isDropdownOpen.value = false;
  }
  // Tutup Mobile Menu
  if (
    isMenuOpen.value &&
    menuRef.value &&
    !menuRef.value.contains(event.target)
  ) {
    if (!event.target.closest('.hamburger-btn')) {
      isMenuOpen.value = false;
    }
  }
};

// 4. Lifecycle Hooks
onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 10;
  });
  document.addEventListener('click', handleClickOutside);

  // Load Theme
  const savedTheme = localStorage.getItem('theme');
  if (
    savedTheme === 'dark' ||
    (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    isDarkMode.value = true;
    document.documentElement.classList.add('dark');
  }
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

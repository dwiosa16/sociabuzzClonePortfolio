<template>
  <div
    class="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4"
  >
    <LoginForm />

    <!-- Logika Lama -->
    <!-- <component :is="activeComponent" :roleName="roleName" /> -->
  </div>

  <Footer />
</template>

<script setup>
import Footer from '../components/Footer.vue';
import LoginForm from '../components/Login/LoginForm.vue';

// import { useRoute } from 'vue-router';
// import { computed } from 'vue';
// Import Semua komponen login berdasarkan masing-masing role
// import loginCreator from '../components/Creator/loginCreator.vue';
// import loginSupporter from '../components/Supporter/loginSupporter.vue';
// import loginAdmin from '../components/Admin/loginAdmin.vue';
// import loginPembeli from '../components/Pembeli/loginPembeli.vue';

// const route = useRoute();

// // deteksi role dari URL (?role...)
// const currentRole = computed(() => route.query.role || 'supporter');

// // Logika untuk menentukan text judul (Opsional, biar dinamis)
// const roleName = computed(() => {
//   switch (currentRole.value) {
//     case 'creator':
//       return 'Kreator';
//     case 'admin':
//       return 'Admin';
//     case 'pembeli':
//       return 'Pembeli';
//     default:
//       return 'Suporter';
//   }
// });

// // Logika utama: Mengembalikan komponen yang sesuai dengan role di URL
// const activeComponent = computed(() => {
//   if (currentRole.value === 'creator') {
//     return loginCreator;
//   } else if (currentRole.value === 'admin') {
//     return loginAdmin;
//   } else if (currentRole.value === 'pembeli') {
//     return loginPembeli;
//   } else {
//     return loginSupporter;
//   }
// });
</script>

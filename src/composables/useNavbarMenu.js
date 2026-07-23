import { computed } from 'vue';
import { useRoute } from 'vue-router';

export function useNavbarMenu() {
  const route = useRoute();

  // Konfigurasi data menu JSON Berdasarkan nama router (route.name)
  const menuConfig = {
    home: [
      {
        to: '/register?role=supporter',
        labelKey: 'navbarHome.registerKreator',
      },
      {
        to: '/login?role=creator',
        labelKey: 'navbarHome.masukKreator',
      },
      {
        to: '/login?role=supporter',
        labelKey: 'navbarHome.masukSupporter',
      },
      {
        to: '/login?role=pembeli',
        labelKey: 'navbarHome.masukPembeli',
      },
    ],
    'creator-profil-tribe': [
      { to: '/login?role=supporter', labelKey: 'navbar.supporter' },
      { to: '/login?role=creator', labelKey: 'navbar.creator' },
    ],
  };

  const currentMenu = computed(() => {
    const routeName = route?.name || 'home';
    return menuConfig[routeName] || menuConfig['home'];
  });
  return {
    currentMenu,
  };
}

// export function useNavbarMenu() {
//   const homeMenu = [
//     { label: 'navbarHome.registerKreator', to: '#' },
//     { label: 'navbarHome.masukKreator', to: '/login?role=creator' },
//     { label: 'navbarHome.masukSupporter', to: '/login?role=supporter' },
//     { label: 'navbarHome.masukPembeli', to: '/login?role=pembeli' },
//   ];

//   //   Menu untuk halaman CreatorProfileTribeView.vue
//   const creatorMenu = [
//     {
//       label: 'navbar.supporter',
//       to: '/login?role=supporter',
//     },
//     {
//       label: 'navbar.creator',
//       to: '/login?role=creator',
//     },
//   ];
//   return {
//     homeMenu,
//     creatorMenu,
//   };
// }

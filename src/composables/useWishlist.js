import { ref } from 'vue';

const wishlistItems = ref([
  {
    id: 'pc',
    title: 'Upgrade PC',
    price: 10000000,
    currentFunds: 1270000000,
  },
  {
    id: 'bertani',
    title: 'Bertani/Berkebun',
    price: 5000000,
    currentFunds: 0,
  },
  {
    id: 'robux',
    title: 'Beli Robux',
    price: 100000,
    currentFunds: 0,
  },
]);

export function useWishlist() {
  // Buat fungsi tambahan
  return {
    wishlistItems,
  };
}

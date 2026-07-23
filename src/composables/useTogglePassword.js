import { ref, computed } from 'vue';

export function useTogglePassword() {
  const isVisible = ref(false);

  //   Otomatis berubah antara 'password' dan 'text'
  const inputType = computed(() => (isVisible.value ? 'text' : 'password'));

  const toggleVisibility = () => {
    isVisible.value = !isVisible.value;
  };

  return {
    isVisible,
    inputType,
    toggleVisibility,
  };
}

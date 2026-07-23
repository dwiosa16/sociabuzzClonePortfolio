import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

export function useBahasa() {
  const { locale } = useI18n();
  const isDropdownOpen = ref(false);
  const searchQuery = ref('');

  const languages = ref([
    {
      code: 'is',
      name: 'Icelandic',
    },
    {
      code: 'id',
      name: 'Indonesian',
    },
    {
      code: 'en',
      name: 'English',
    },
    {
      code: 'ga',
      name: 'Irish',
    },
    {
      code: 'it',
      name: 'Italian',
    },
  ]);

  const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
  };

  const selectLanguage = (langCode) => {
    locale.value = langCode;
    localStorage.setItem('bahasa', langCode);
    isDropdownOpen.value = false;
    searchQuery.value = '';
  };

  const filteredLanguages = computed(() => {
    return languages.value.filter((lang) =>
      lang.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
    );
  });

  return {
    locale,
    isDropdownOpen,
    searchQuery,
    languages,
    toggleDropdown,
    selectLanguage,
    filteredLanguages,
  };
}

<template>
  <main>
    <RouterView />
    <suporterModal />
  </main>
</template>

<script setup>
import suporterModal from './components/Supporter/suporterModal.vue';
</script>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
}
.progress-pattern {
  background-image: linear-gradient(
    45deg,
    rgba(0, 0, 0, 0.05) 25%,
    transparent 25%,
    transparent 50%,
    rgba(0, 0, 0, 0.05) 50%,
    rgba(0, 0, 0, 0.05) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1rem 1rem;
}
</style>

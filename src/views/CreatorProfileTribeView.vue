<template>
  <Navbar />
  <Jumbotron />

  <Wishlist />

  <TopSupport />

  <PesanDukungan />

  <Footer />
</template>

<script setup>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

import Wishlist from '../components/CreatorProfileTribe/Wishlist.vue';
import Jumbotron from '../components/CreatorProfileTribe/Jumbotron.vue';
import TopSupport from '../components/CreatorProfileTribe/TopSupport.vue';
import PesanDukungan from '../components/CreatorProfileTribe/PesanDukungan.vue';
</script>

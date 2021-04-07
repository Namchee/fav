<template>
  <div class="flex flex-col items-start">
    <Navigation />
    <main class="w-full flex-1">
      <nuxt />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

import Navigation from '@/components/Navigation.vue';
import Footer from '@/components/Footer.vue';

export default defineComponent({
  components: {
    Navigation,
    Footer,
  },
});
</script>

<template>
  <div
    class="h-screen
      flex flex-col items-start"
  >
    <Navigation />
    <main
      class="w-full
        flex-1
        px-6
        md:px-8
        lg:px-0"
    >
      <nuxt />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Navigation from '@/components/Navigation.vue';
import Footer from '@/components/Footer.vue';

export default defineComponent({
  components: {
    Navigation,
    Footer,
  },
});
</script>

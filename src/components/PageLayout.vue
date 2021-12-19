<template>
  <div
    class="min-h-screen
      flex flex-col items-start"
  >
    <NavigationVue />
    <main
      class="w-full
        flex-1
        px-6
        md:px-8
        lg:px-0"
    >
      <slot />
    </main>
    <FooterVue />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import NavigationVue from './Navigation.vue';
import FooterVue from './Footer.vue';

export default defineComponent({
  components: {
    NavigationVue,
    FooterVue,
  },
});
</script>

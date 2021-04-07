<template>
  <nav class="w-full max-w-4xl
    px-6
    py-8
    md:px-8
    lg:px-0
    mx-auto
    flex justify-between items-center">
    <header>
      <Logo class="w-16 h-auto" />
    </header>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Logo from './../assets/icons/logo.svg';

export default defineComponent({
  components: {
    Logo,
  },
});
</script>

<style lang="postcss" scoped>

</style>

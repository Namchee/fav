<template>
  <main
    class="min-h-screen
      w-full mx-auto max-w-5xl
      px-6
      grid place-items-center
      text-content"
  >
    <div class="flex flex-col items-center ">
      <Logo class="w-12 h-auto mb-8" />
      <h1
        class="text-4xl md:text-5xl
          font-bold
          tracking-tighter
          leading-relaxed
          md:leading-normal"
      >
        Page Not Found
      </h1>
      <p class="text-content-light text-center mb-12 text-lg md:text-xl">
        Sorry, the page you are looking for does not exist
      </p>
      <router-link
        to="/"
        class="font-bold
          text-lg
          text-primary
          transition-colors
          hover:text-primary-dark
          focus:(text-primary-dark)
          active:text-primary-dark"
      >
        Back To Home
      </router-link>
    </div>
  </main>
</template>

<script setup lang="ts">
import Logo from '@/assets/icons/logo.svg?component';
import { useHead } from '@vueuse/head';

useHead({
  title: 'Page Not Found — Fav',
});
</script>

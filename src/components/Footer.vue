<template>
  <footer
    class="w-full mx-auto max-w-5xl
      flex flex-col items-center
      md:(flex-row justify-between)
      border-t border-content-shade border-opacity-25
      p-8
      text-sm
      text-content-light"
  >
    <p class="text-center md:text-left">
      Inspired by
      <a
        class="font-bold
          text-primary
          transition-colors
          hover:text-primary-dark
          focus:(text-primary-dark)
          active:text-primary-dark"
        href="https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs"
        target="_blank"
        rel="noreferrer noopener"
        aria-label="EvilMartians Writeup"
      >this blogpost</a>
      written by
      <a
        class="font-bold
          text-primary
          transition-colors
          hover:text-primary-dark
          focus:(text-primary-dark)
          active:text-primary-dark"
        href="https://evilmartians.com/"
        target="_blank"
        rel="noreferrer noopener"
        aria-label="EvilMartians Website"
      >Evil Martians</a>
    </p>

    <p class="mt-4 md:mt-0">
      Made in 2021 by
      <a
        class="font-bold
          text-primary
          transition-colors
          hover:text-primary-dark
          focus:(text-primary-dark)
          active:text-primary-dark"
        href="https://github.com/Namchee"
        target="_blank"
        rel="noreferrer noopener"
      >Namchee</a>
    </p>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>


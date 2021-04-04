<template>
  <footer class="w-full">
    <div class="
      flex flex-col items-center md:flex-row md:justify-between
      w-full
      max-w-4xl
      mx-auto
      border-t border-gray-200
      p-8
      lg:px-2
      text-sm
      text-gray-700">
      <p>
        Inspired by <a
          class="link"
          href="https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs" target="_blank">
            this blogpost
          </a>
        written by
        <a
          class="link"
          href="https://evilmartians.com/"
          target="_blank">
          Evil Martians
        </a>
      </p>

      <p class="mt-4 md:mt-0">
        Made in 2021 by
        <a class="link" href="https://github.com/Namchee" target="_blank">
          Namchee
        </a>
      </p>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style lang="postcss" scoped>
.link {
  @apply font-bold text-indigo-400 transition-colors hover:text-indigo-500;
}
</style>

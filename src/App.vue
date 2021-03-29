<template>
  <div class="min-h-screen flex flex-col items-start">
    <navigation />
    <main class="mx-auto w-full max-w-4xl">
      <h1 class="font-bold
        text-5xl text-gray-800
        tracking-tight py-12 pb-16">
        Modern favicons for 2021 websites.
      </h1>

      <div class="app">
        <div class="space-y-8">
          <div>
            <p class="form__header mb-2">
              Step 1: Upload your files
            </p>

            <UploadButton />
          </div>

          <div>
            <p class="form__header">
              Step 2: Choose your favicons flavor
            </p>
          </div>

          <div>
            <p class="form__header">
              Step 3: Generate!
            </p>
          </div>
        </div>

        <div class="preview">
          <preview-box />
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navigation from './components/Navigation.vue';
import PreviewBox from './components/PreviewBox.vue';
import UploadButton from './components/UploadButton.vue';

export default defineComponent({
  components: {
    Navigation,
    PreviewBox,
    UploadButton,
  },
});
</script>

<style lang="postcss" scoped>
.app {
  display: grid;
  grid-template-columns: 55% 45%;
  column-gap: 2rem;
}

.form__header {
  @apply text-gray-400 text-xl leading-loose;
}
</style>

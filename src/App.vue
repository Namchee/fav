<template>
  <div class="min-h-screen flex flex-col items-start">
    <navigation />
    <main class="mx-auto w-full max-w-4xl">
      <div class="py-12">
        <h1 class="font-semibold
          text-5xl text-gray-800
          tracking-tight
          leading-normal">
          Modern favicons for modern websites.
        </h1>

        <h2 class="text-2xl text-gray-500 tracking-tight leading-normal">
          Generate compact favicon set for your 2021 websites.
        </h2>
      </div>

      <div class="app py-8">
        <div class="space-y-8">
          <div>
            <p class="form__header mb-2">
              Step 1: Upload an image
            </p>

            <UploadBox />
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
          <preview-box @file-change="onImageUpload" />
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import Navigation from './components/Navigation.vue';
import PreviewBox from './components/PreviewBox.vue';
import UploadBox from './components/UploadBox.vue';

export default defineComponent({
  components: {
    Navigation,
    PreviewBox,
    UploadBox,
  },

  setup() {
    const file = ref('');

    const onImageUpload = (value: string) => {
      file.value = value;
    };

    return {
      onImageUpload,
    };
  },
});
</script>

<style lang="postcss" scoped>
.app {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 12rem;
}

.form__header {
  @apply text-gray-500 text-lg leading-loose;
}
</style>

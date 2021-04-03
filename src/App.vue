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
            <p class="form__header">
              Step 1: Upload an image
            </p>

            <UploadBox @file-change="handleFileUpload" />
          </div>

          <div>
            <p class="form__header">
              Step 2: Choose your favicons flavor
            </p>

            <div class="grid grid-cols-2">
              <p>
                Cock
              </p>
              <p>
                Sucker
              </p>
              <p>
                Ass
              </p>
              <p>
                Kisser
              </p>
            </div>
          </div>

          <div>
            <p class="form__header">
              Step 3: Generate!
            </p>
          </div>
        </div>

        <div class="grid place-items-center">
          <preview-box :value="imageBlob" />
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';

import Navigation from './components/Navigation.vue';
import PreviewBox from './components/PreviewBox.vue';
import UploadBox from './components/UploadBox.vue';

import { toBase64 } from './utils';

export default defineComponent({
  components: {
    Navigation,
    PreviewBox,
    UploadBox,
  },

  setup() {
    const file: Ref<File | null> = ref(null);
    const fileError: Ref<string> = ref('');
    const imageBlob: Ref<string> = ref('');

    const handleFileUpload = async (val: File | null) => {
      file.value = val;

      if (!val) {
        imageBlob.value = '';
      } else {
        const encodedFile = await toBase64(val);

        imageBlob.value = encodedFile as string;
      }
    };

    const handleSubmit = () => {
      fileError.value = 'Rqeuire';
    };

    return {
      handleFileUpload,
      handleSubmit,
      imageBlob,
    };
  },
});
</script>

<style lang="postcss" scoped>
.app {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 8rem;
}

.form__header {
  @apply text-gray-500 text-lg leading-loose mb-2;
}
</style>

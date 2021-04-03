<template>
  <div class="min-h-screen flex flex-col items-start">
    <navigation />
    <main class="mx-auto w-full max-w-4xl mb-8">
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

            <UploadBox
              @file-change="handleFileUpload"
              :error="fileError" />
          </div>

          <div>
            <p class="form__header">
              Step 2: Choose your favicons flavor
            </p>

            <div class="space-y-2">
              <PlatformBox
                v-for="platform in platforms"
                :key="platform.value"
                :id="platform.value"
                :value="platform.value"
                :disabled="platform.value === 'legacy'"
                v-model="selectedPlatforms">
                <template v-slot:icon>
                  <component
                    :is="platform.icon"
                    class="w-8 h-8 stroke-current" />
                </template>
                <template v-slot:title>
                  <p class="font-bold text-lg">
                    {{ platform.name }}
                  </p>
                </template>
                <template v-slot:description>
                  <p class="italic text-sm">
                    {{ platform.description }}
                  </p>
                </template>
              </PlatformBox>
            </div>

            <p v-if="platformError"
              class="font-bold text-red-700 italic mt-2">
              {{ platformError }}
            </p>
          </div>

          <div>
            <p class="form__header">
              Step 3: Generate!
            </p>

            <button class="bg-indigo-700
              text-white
              rounded-md
              px-4 py-2
              text-lg
              tracking-wide
              transition-colors
              hover:bg-indigo-800
              focus:outline-none
              focus:ring-2 focus:ring-indigo-300"
              @click="generateIcons">
              Generate
            </button>
          </div>
        </div>

        <div>
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
import PlatformBox from './components/PlatformBox.vue';
import GlobeIcon from './assets/icons/globe.svg';
import AtomIcon from './assets/icons/atom.svg';
import AndroidIcon from './assets/icons/android.svg';
import AppleIcon from './assets/icons/apple.svg';

import { toBase64 } from './utils';

export default defineComponent({
  components: {
    Navigation,
    PreviewBox,
    UploadBox,
    PlatformBox,
    GlobeIcon,
    AtomIcon,
    AndroidIcon,
    AppleIcon,
  },

  setup() {
    const file: Ref<File | null> = ref(null);
    const imageBlob: Ref<string> = ref('');

    const selectedPlatforms: Ref<string[]> = ref(['legacy']);

    const fileError: Ref<string> = ref('');
    const platformError: Ref<string> = ref('');

    const handleFileUpload = async (val: File | null) => {
      file.value = val;

      if (!val) {
        imageBlob.value = '';
      } else {
        const encodedFile = await toBase64(val);

        imageBlob.value = encodedFile as string;
      }
    };

    const generateIcons = () => {
      if (!file.value) {
        fileError.value = 'This field is required';
      }

      if (!selectedPlatforms.value.length) {
        platformError.value = 'These fields are required';
      }

      if (file.value || selectedPlatforms.value) {
        return;
      }
    };

    const platforms = [
      {
        name: 'Legacy',
        description: 'Supported by almost all browsers',
        icon: 'GlobeIcon',
        value: 'legacy',
      },
      {
        name: 'Modern',
        description: 'Brings modern favicon features',
        icon: 'AtomIcon',
        value: 'modern',
      },
      {
        name: 'Android',
        description: 'Bring your favicons to Android devices',
        icon: 'AndroidIcon',
        value: 'android',
      },
      {
        name: 'Apple',
        description: 'Bring your favicons to Apple devices',
        icon: 'AppleIcon',
        value: 'apple',
      },
    ];

    return {
      handleFileUpload,
      generateIcons,
      imageBlob,
      selectedPlatforms,
      platforms,
      fileError,
      platformError,
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

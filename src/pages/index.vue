<template>
  <div class="max-w-4xl mx-auto py-6">
    <div class="lg:leading-normal py-12">
      <h1
        class="font-semibold
          text-4xl text-gray-800
          tracking-tight
          leading-tight
          lg:text-5xl
          lg:leading-normal"
      >
        Modern favicons for modern websites.
      </h1>

      <h2 class="text-lg text-gray-500 tracking-tight lg:text-2xl">
        Generate compact favicon set for your 2021 websites.
      </h2>
    </div>

    <div class="app py-8">
      <div class="space-y-10">
        <div ref="upload">
          <p class="form__header">
            Step 1: Upload an image
          </p>

          <UploadBox
            :error="fileError"
            @file-change="handleFileUpload"
          />
        </div>

        <div ref="platformSelector">
          <p class="form__header">
            Step 2: Choose your favicons flavor
          </p>

          <div class="space-y-2">
            <PlatformBox
              v-for="platform in platforms"
              :id="platform.value"
              :key="platform.value"
              v-model:platforms="selectedPlatforms"
              :value="platform.value"
              :disabled="platform.value === 'legacy'"
            >
              <template #icon>
                <component
                  :is="platform.icon"
                  class="w-8 h-8 stroke-current"
                />
              </template>
              <template #title>
                <p class="font-bold text-lg">
                  {{ platform.name }}
                </p>
              </template>
              <template #description>
                <p class="italic text-sm">
                  {{ platform.description }}
                </p>
              </template>
            </PlatformBox>
          </div>

          <p
            v-if="platformError"
            class="font-bold text-red-700 italic mt-2"
          >
            {{ platformError }}
          </p>
        </div>

        <div>
          <p class="form__header">
            Step 3: Generate!
          </p>

          <button
            class="text-white
              rounded-md
              px-4 py-2
              text-lg
              tracking-wide
              transition-colors
              focus:outline-none
              focus:ring-2 focus:ring-indigo-300"
            :class="generatorClass"
            :disabled="isProcessing"
            :aria-disabled="isProcessing"
            @click="generateIcons"
          >
            <template v-if="isProcessing">
              <div class="flex items-center">
                <LoadingIcon class="w-5 h-5 animate-spin" />
                <span class="ml-3">
                  Processing
                </span>
              </div>
            </template>
            <template v-else>
              Generate
            </template>
          </button>
        </div>
      </div>

      <div>
        <preview-box :value="imageBlob" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from '@nuxtjs/composition-api';

import PreviewBox from '@/components/PreviewBox.vue';
import UploadBox from '@/components/UploadBox.vue';
import PlatformBox from '@/components/PlatformBox.vue';

import GlobeIcon from '@/assets/icons/globe.svg?inline';
import AtomIcon from '@/assets/icons/atom.svg?inline';
import AndroidIcon from '@/assets/icons/android.svg?inline';
import AppleIcon from '@/assets/icons/apple.svg?inline';
import LoadingIcon from '@/assets/icons/loading.svg?inline';

import { generateFavicons, getFilenameWithoutExtension } from '@/utils';

export default defineComponent({
  components: {
    PreviewBox,
    UploadBox,
    PlatformBox,
    GlobeIcon,
    AtomIcon,
    AndroidIcon,
    AppleIcon,
    LoadingIcon,
  },

  setup() {
    const file: Ref<File | null> = ref(null);
    const imageBlob: Ref<string> = ref('');

    const selectedPlatforms: Ref<string[]> = ref(['legacy']);

    const fileError: Ref<string> = ref('');
    const platformError: Ref<string> = ref('');

    const upload: Ref<HTMLElement | null> = ref(null);
    const platformSelector: Ref<HTMLElement | null> = ref(null);

    const isProcessing = ref(false);
    const generatorClass = computed(() => {
      return {
        'hover:bg-indigo-800': !isProcessing.value,
        'bg-indigo-700': !isProcessing.value,
        'bg-indigo-500': isProcessing.value,
        'cursor-not-allowed': isProcessing.value,
      };
    });

    const handleFileUpload = (val: File | null) => {
      file.value = val;

      if (!val) {
        imageBlob.value = '';
      } else {
        imageBlob.value = URL.createObjectURL(val);
      }
    };

    const generateIcons = async () => {
      if (isProcessing.value) {
        return;
      }

      if (!file.value) {
        fileError.value = 'This field is required';
      }

      if (!selectedPlatforms.value.length) {
        platformError.value = 'These fields are required';
      }

      if (!file.value || !selectedPlatforms.value.length) {
        if (upload.value) {
          upload.value.scrollIntoView();
        } else if (platformSelector.value) {
          platformSelector.value.scrollIntoView();
        }

        return;
      }

      isProcessing.value = true;

      const blobZip = await generateFavicons(
        file.value,
        selectedPlatforms.value,
      );

      // eslint-disable-next-line max-len
      const filename = `${new Date().getTime()}-${getFilenameWithoutExtension(file.value.name)}.zip`;

      const dummyElem = document.createElement('a');
      dummyElem.style.display = 'none';

      const url = URL.createObjectURL(blobZip);

      dummyElem.href = url;
      dummyElem.download = filename;
      dummyElem.click();

      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 200);

      isProcessing.value = false;
    };

    const platforms = [
      {
        name: 'Legacy',
        description: 'Supported by classic to modern browsers',
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
      isProcessing,
      generatorClass,
      upload,
    };
  },
});
</script>

<style lang="postcss" scoped>
.form__header {
  @apply text-gray-500 text-lg leading-loose mb-2;
}

@screen md {
  .app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 4rem;
  }
}

@screen lg {
  .app {
    column-gap: 8rem;
  }
}
</style>

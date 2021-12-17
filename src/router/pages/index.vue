<template>
  <PageLayout>
    <div class="max-w-4xl mx-auto py-6">
      <div class="lg:leading-normal py-12">
        <h1
          class="font-semibold
            text-4xl
            text-content
            tracking-tighter leading-tight
            lg:text-5xl
            lg:leading-normal"
        >
          Embrace favicons the modern way
        </h1>

        <h2
          class="text-lg
            text-content-light
            tracking-tight
            lg:text-2xl"
        >
          Generate compact favicon set for your next websites,
          within few clicks
        </h2>
      </div>

      <div class="app py-8">
        <div class="space-y-8">
          <section ref="upload">
            <p
              class="text-content-light leading-loose mb-2 text-lg"
            >
              Step 1: Upload your base favicon
            </p>

            <UploadBox
              :error="fileError"
              @file-change="handleFileUpload"
            />
          </section>

          <section ref="platformSelector">
            <p class="text-content-light leading-loose mb-2 text-lg">
              Step 2: Pick your favicon flavors
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
          </section>

          <section>
            <p class="text-content-light leading-loose mb-2 text-lg">
              Step 3: Generate!
            </p>

            <div class="space-y-2">
              <label
                for="template"
                class="flex items-center space-x-2 cursor-pointer inline"
              >
                <input
                  id="template"
                  v-model="includeTemplate"
                  type="checkbox"
                  class="rounded
                    w-4 h-4
                    cursor-pointer
                    text-primary
                    focus:(outline-none ring-2 ring-primary ring-opacity-50)"
                >
                <p>Include HTML template</p>
              </label>

              <label
                for="aspect-ratio"
                class="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  id="aspect-ratio"
                  v-model="aspectRatio"
                  type="checkbox"
                  class="rounded
                    w-4 h-4
                    text-primary
                    focus:(outline-none ring-2 ring-primary ring-opacity-50)"
                >
                <p>Keep image aspect ratio</p>
              </label>
            </div>
          </section>

          <Button
            theme="primary"
            class="text-lg
              w-32 h-12
              tracking-wide"
            :loading="isProcessing"
            @click="generateIcons"
          >
            <template v-if="isProcessing">
              Processing
            </template>
            <template v-else>
              Generate
            </template>
          </Button>
        </div>

        <div>
          <preview-box :value="imageBlob" />
        </div>
      </div>
    </div>
  </PageLayout>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';

import PreviewBox from '@/components/PreviewBox.vue';
import UploadBox from '@/components/UploadBox.vue';
import PlatformBox from '@/components/PlatformBox.vue';

import GlobeIcon from '@/assets/icons/globe.svg?component';
import AtomIcon from '@/assets/icons/atom.svg?component';
import AndroidIcon from '@/assets/icons/android.svg?component';
import AppleIcon from '@/assets/icons/apple.svg?component';
import LoadingIcon from '@/assets/icons/loading.svg?component';

import { getFilenameWithoutExtension, createArchive } from '@/scripts/file';
import { createImageBlobs } from '@/scripts/resizer';
import { IconKey } from '@/scripts/types';
import PageLayout from '@/components/PageLayout.vue';
import { useHead } from '@vueuse/head';

import Button from '@/components/Button.vue';

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
    PageLayout,
    Button,
  },

  setup() {
    const file: Ref<File | null> = ref(null);
    const imageBlob: Ref<string> = ref('');

    const selectedPlatforms: Ref<string[]> = ref(['legacy']);

    const fileError: Ref<string> = ref('');
    const platformError: Ref<string> = ref('');

    const upload: Ref<HTMLElement | null> = ref(null);
    const platformSelector: Ref<HTMLElement | null> = ref(null);

    const includeTemplate = ref(false);
    const aspectRatio = ref(true);

    const isProcessing = ref(false);

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

      const imageBlobs = await createImageBlobs(
        file.value,
        selectedPlatforms.value as IconKey[],
        aspectRatio.value,
      );
      const archive = await createArchive(
        selectedPlatforms.value as IconKey[],
        imageBlobs,
        includeTemplate.value,
      );

      // eslint-disable-next-line max-len
      const filename = `${new Date().getTime()}-${getFilenameWithoutExtension(file.value.name)}.zip`;

      const dummyElem = document.createElement('a');
      dummyElem.style.display = 'none';

      const url = URL.createObjectURL(archive);

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

    useHead({
      title: 'Fav — Modern Favicon Generator',
      meta: [
        {
          name: 'description',
          content:
            'Generate compact favicon set for your websites within few clicks.',
        },
        {
          name: 'og:title',
          content: 'Fav — Modern Favicon Generator',
        },
        {
          name: 'og:description',
          content:
            'Generate compact favicon set for your websites within few clicks.',
        },
        {
          name: 'og:url',
          content: 'https://fav.namchee.dev/',
        },
        {
          name: 'twitter:description',
          content:
            'Generate compact favicon set for your websites within few clicks.',
        },
      ],
    });

    return {
      handleFileUpload,
      generateIcons,
      imageBlob,
      selectedPlatforms,
      platforms,
      fileError,
      platformError,
      isProcessing,
      upload,
      includeTemplate,
      aspectRatio,
    };
  },
});
</script>

<style lang="postcss" scoped>
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

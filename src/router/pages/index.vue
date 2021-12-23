<template>
  <PageLayout>
    <div class="py-6">
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

      <div class="grid md:grid-cols-2 gap-8 md:gap-16 py-8">
        <div class="space-y-8">
          <section ref="upload">
            <p
              class="text-content-light leading-loose mb-2 text-lg"
            >
              Step 1: Upload your base favicon
            </p>

            <UploadBox
              @error="handleFileError"
              @file-change="handleFileUpload"
            />

            <p
              v-if="error.file"
              class="text-danger mt-2"
            >
              {{ error.file }}
            </p>
          </section>

          <section ref="platformSelector">
            <p class="text-content-light leading-loose mb-2 text-lg">
              Step 2: Pick your favicon flavors
            </p>

            <div class="grid lg:grid-cols-2 md:auto-rows-fr gap-2">
              <PlatformBox
                v-for="platform in platforms"
                :key="platform.value"
                v-model:platforms="form.platforms"
                :value="platform.value"
                :disabled="platform.value === 'legacy'"
                :title="platform.name"
                :description="platform.description"
              />
            </div>

            <p
              v-if="error.platform"
              class="text-danger mt-2"
            >
              {{ error.platform }}
            </p>
          </section>

          <section>
            <p class="text-content-light leading-loose mb-2 text-lg">
              Step 3: Generate!
            </p>

            <div class="inline-flex flex-col space-y-2">
              <label
                for="template"
                class="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  id="template"
                  v-model="form.template"
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
                  v-model="form.aspectRatio"
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
            :loading="loading"
            @click="generateIcons"
          >
            Generate
          </Button>
        </div>

        <div>
          <preview-box :value="preview" />
        </div>
      </div>
    </div>
  </PageLayout>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, Ref, ref } from 'vue';

import { useHead } from '@vueuse/head';

import PageLayout from '@/components/PageLayout.vue';

import Button from '@/components/Button.vue';
import PreviewBox from '@/components/PreviewBox.vue';
import UploadBox from '@/components/UploadBox.vue';
import PlatformBox from '@/components/PlatformBox.vue';

import { createArchive } from '@/scripts/archive';
import { createImageFiles } from '@/scripts/image';

import { triggerDownload } from '@/utils';

import { PLATFORM_LIST } from '@/constant/platform';

import type { FormValue } from '@/types';

export default defineComponent({
  components: {
    PreviewBox,
    UploadBox,
    PlatformBox,
    PageLayout,
    Button,
  },

  setup() {
    const form = reactive<FormValue>({
      file: null,
      platforms: ['legacy'],
      template: false,
      aspectRatio: true,
    });

    const error = reactive<Record<string, string> >({
      file: '',
      platforms: '',
    });

    const upload: Ref<HTMLElement | null> = ref(null);
    const platforms: Ref<HTMLElement | null> = ref(null);

    const loading = ref(false);

    const preview = computed(() => {
      return form.file ? URL.createObjectURL(form.file) : '';
    });

    const handleFileError = (val: string) => {
      error.file = val;
      form.file = null;
    };
    const handleFileUpload = (val: File | null) => form.file = val;

    /* Validator functions */
    const validateFile = () => {
      if (!form.file) {
        error.file = 'Please upload a valid base icon';
      }
    };

    const validatePlatform = () => {
      if (!form.platforms || !form.platforms.length) {
        error.platforms = 'Please select at least one of the favicon features';
      }

      const platforms = PLATFORM_LIST.map((p) => p.value);

      if (form.platforms.some((p) => !platforms.includes(p))) {
        error.platforms = 'Favicon features cannot be filled with other values';
      }
    };

    const generateIcons = async () => {
      if (loading.value) {
        return;
      }

      validateFile();
      validatePlatform();

      if (error.file) {
        upload.value?.scrollIntoView();
        return;
      }

      if (error.platforms) {
        platforms.value?.scrollIntoView();
        return;
      }

      loading.value = true;

      const imageBlobs = await createImageFiles(
        form.file as File,
        form.platforms,
        form.aspectRatio,
      );
      const archive = await createArchive(
        form.platforms,
        imageBlobs,
        form.template,
      );

      triggerDownload(archive, (form.file as File).name);

      loading.value = false;
    };

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
      form,
      error,
      handleFileError,
      handleFileUpload,
      generateIcons,
      preview,
      platforms: PLATFORM_LIST,
      loading,
      upload,
    };
  },
});
</script>

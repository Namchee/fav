<template>
  <PageLayout>
    <div class="py-6">
      <div class="lg:leading-normal py-12">
        <h1 class="font-semibold
            text-4xl
            text-content
            leading-tight
            lg:text-5xl
            lg:leading-normal">
          Embrace favicons the modern way
        </h1>

        <h2 class="text-lg
            text-content-light
            tracking-tight
            lg:text-2xl">
          Generate compact favicon set for your next websites,
          within few clicks
        </h2>
      </div>

      <div class="grid md:grid-cols-2 gap-8 md:gap-16 py-8">
        <div class="space-y-8">
          <section ref="upload">
            <p class="text-content-light leading-loose mb-2 text-lg">
              Step 1: Upload your base favicon
            </p>

            <UploadBox @error="handleFileError" @file-change="handleFileUpload" />

            <p v-if="error.file" class="text-danger mt-2">
              {{ error.file }}
            </p>
          </section>

          <section ref="platformSelector">
            <p class="text-content-light leading-loose mb-2 text-lg">
              Step 2: Pick your favicon flavors
            </p>

            <div class="grid lg:grid-cols-2 md:auto-rows-fr gap-2">
              <PlatformBox v-for="platform in platforms" :key="platform.value" v-model:platforms="form.platforms"
                :value="platform.value" :disabled="platform.value === 'legacy'" :title="platform.name"
                :description="platform.description" />
            </div>

            <p v-if="error.platform" class="text-danger mt-2">
              {{ error.platform }}
            </p>
          </section>

          <section>
            <p class="text-content-light leading-loose mb-2 text-lg">
              Step 3: Generate!
            </p>

            <div class="inline-flex flex-col space-y-2">
              <label for="template" class="flex items-center space-x-2 cursor-pointer">
                <input id="template" v-model="form.template" type="checkbox" class="rounded
                    w-4 h-4
                    cursor-pointer
                    text-primary
                    focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">

                <div class="flex items-center space-x-[6px]">
                  <p>
                    Include HTML template
                  </p>

                  <TooltipProvider>
                    <TooltipRoot>
                      <TooltipTrigger
                        class="opacity-50 inline-flex h-4 w-4 items-center justify-center outline-none focus:shadow-[0_0_0_2px] cursor-help focus:shadow-black">
                        <Help />
                      </TooltipTrigger>
                      <TooltipPortal>
                        <TooltipContent
                          class="text-xs text-center leading-snug max-w-xs data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade select-none rounded-[4px] bg-black text-white px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
                          :side-offset="5">
                          When checked, Fav will provide an HTML template that contains headers that matches the generated favicon.
                          <TooltipArrow class="fill-shade" size="8" />
                        </TooltipContent>
                      </TooltipPortal>
                    </TooltipRoot>
                  </TooltipProvider>
                </div>
              </label>

              <label for="aspect-ratio" class="flex items-center space-x-2 cursor-pointer">
                <input id="aspect-ratio" v-model="form.ratio" type="checkbox" class="rounded
                    w-4 h-4
                    text-primary
                    focus:outline-none
                    focus:ring-2
                    focus:ring-primary
                    focus:ring-opacity-50">
                <div class="flex items-center space-x-[6px]">
                  <p>
                    Keep image aspect ratio
                  </p>
                </div>
              </label>
            </div>
          </section>

          <Button theme="primary" class="text-lg
              w-32 h-12" :loading="loading" @click="generateIcons">
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

import { TooltipArrow, TooltipContent, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger } from 'radix-vue';

import { useHead } from '@vueuse/head';

import PageLayout from '@/components/PageLayout.vue';

import Button from '@/components/Button.vue';
import PreviewBox from '@/components/PreviewBox.vue';
import UploadBox from '@/components/UploadBox.vue';
import PlatformBox from '@/components/PlatformBox.vue';
import Help from '@/assets/icons/help.svg?component';

import { createArchive, triggerDownload } from '@/scripts/archive';
import { createFiles } from '@/scripts/file';

import { PLATFORM_LIST } from '@/constant/platform';

import type { FormValue } from '@/types';

export default defineComponent({
  components: {
    PreviewBox,
    UploadBox,
    PlatformBox,
    PageLayout,
    Button,
    Help,
    TooltipArrow,
    TooltipContent,
    TooltipPortal,
    TooltipProvider,
    TooltipRoot,
    TooltipTrigger,
  },

  setup() {
    const form = reactive<FormValue>({
      file: null,
      platforms: ['legacy'],
      template: false,
      ratio: true,
    });

    const error = reactive<Record<string, string>>({
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

      const files = await createFiles(
        form.file as File,
        form.platforms,
        { template: form.template, ratio: form.ratio },
      );
      const archive = await createArchive(files);

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

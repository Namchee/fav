<template>
  <div>
    <template v-if="currentFile">
      <div
        class="flex justify-between
        rounded-md p-3 pl-6 border border-gray-200"
      >
        <div class="text-gray-500 flex justify-center">
          <FileIcon class="w-5 h-auto mr-3" />
          <p
            class="font-extrabold tracking-tight
              overflow-hidden
              overflow-ellipsis
              leading-loose
              file__name"
          >
            {{ currentFile.name }}
          </p>
        </div>

        <button
          class="p-2 rounded-full transition-colors hover:bg-gray-100"
          @click="deleteFile"
        >
          <CloseIcon class="w-4 h-auto text-gray-600" />
        </button>
      </div>
    </template>
    <template v-else>
      <label
        for="image-file"
        class="cursor-pointer block h-48
          focus:outline-none
          focus:ring-1 focus:ring-gray-300"
        tabindex="0"
        @dragenter="isDragging = true"
        @dragleave="isDragging = false"
        @dragover.prevent
        @drop="onFileDrop($event)"
      >
        <div
          class="border-2 border-gray-200 border-dashed
            grid place-items-center
            rounded-md p-8
            transition-colors
            hover:bg-gray-50
            hover:border-gray-300
            h-full"
          :class="{ 'bg-gray-50': isDragging, 'border-gray-300': isDragging }"
        >
          <template v-if="isDragging">
            <FileIcon class="w-12 lg:w-16 h-auto text-gray-400" />
            <p class="leading-normal text-gray-400 text-lg font-bold">
              Drop your image now
            </p>
          </template>
          <template v-else>
            <UploadIcon class="w-12 lg:w-16 h-auto text-gray-400" />
            <p class="leading-normal text-gray-400 mt-6 lg:mt-2 text-lg">
              <span class="text-indigo-400 font-bold">
                Upload a file
              </span>
              or drag and drop
            </p>
            <p class="text-center italic text-sm text-gray-400">
              Accepts .png, .jpeg, .ico, and .svg file (max 1 MB)
            </p>
          </template>
        </div>
      </label>
      <input
        id="image-file"
        ref="fileInput"
        type="file"
        class="hidden"
        accept="image/png,
          image/jpeg,
          image/x-icon,
          image/vnd-microsoft-icon,
          image/svg+xml"
        @change="onFileChange"
      >
      <p
        v-if="error || validationError"
        class="font-bold text-red-700 italic mt-2"
      >
        {{ error || validationError }}
      </p>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, watch } from '@nuxtjs/composition-api';

import UploadIcon from '@/assets/icons/upload.svg?inline';
import FileIcon from '@/assets/icons/file.svg?inline';
import CloseIcon from '@/assets/icons/close.svg?inline';

export default defineComponent({
  components: {
    UploadIcon,
    FileIcon,
    CloseIcon,
  },

  props: {
    error: {
      type: String,
      required: false,
      default: '',
    },
  },

  emits: [
    'file-change',
  ],

  setup(_, { emit }) {
    const currentFile: Ref<File | null> = ref(null);
    const fileInput: Ref<HTMLInputElement | null> = ref(null);

    const validationError: Ref<string> = ref('');

    const isDragging = ref(false);

    const isSupported = (currentFile: File): boolean => {
      return [
        'image/png',
        'image/jpeg',
        'image/x-icon',
        'image/vnd-microsoft-icon',
        'image/svg+xml',
      ].includes(currentFile.type);
    };

    const deleteFile = () => {
      currentFile.value = null;
    };

    const doesFileFit = (file: File) => {
      return file.size / 1024 / 1024 <= 1;
    };

    const onFileChange = () => {
      if (fileInput.value && fileInput.value.files) {
        const file = fileInput.value.files[0];

        if (!doesFileFit(file)) {
          validationError.value = 'Image size is too large (max 1 MB)';
          return;
        }

        currentFile.value = file;
      }
    };

    const onFileDrop = (event: DragEvent) => {
      event.preventDefault();

      let file: File;

      if (
        event.dataTransfer?.items &&
        event.dataTransfer.items[0].kind === 'file'
      ) {
        file = event.dataTransfer.items[0].getAsFile() as File;
      } else {
        file = event.dataTransfer?.files[0] as File;
      }

      isDragging.value = false;

      if (!doesFileFit(file)) {
        validationError.value = 'Image size is too large (max 1 MB)';
        return;
      }

      currentFile.value = file;
    };

    watch(currentFile, (value) => {
      if (value) {
        if (isSupported(value)) {
          emit('file-change', value);
        } else {
          currentFile.value = null;
          validationError.value =
            'Only .png, .jpeg, .ico, and .svg files are allowed';
        }
      } else {
        emit('file-change', null);
      }
    });

    return {
      currentFile,
      fileInput,
      onFileChange,
      deleteFile,
      isDragging,
      onFileDrop,
      validationError,
    };
  },
});
</script>

<style lang="postcss" scoped>
.file__name {
  width: 12rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

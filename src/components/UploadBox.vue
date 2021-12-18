<template>
  <template v-if="currentFile">
    <div
      class="flex justify-between
        rounded-md
        p-3 pl-6
        border border-content-shade border-opacity-40"
    >
      <div class="text-gray-500 flex justify-center">
        <ImageIcon class="w-5 h-auto mr-3" />
        <p
          class="font-bold
            tracking-tight
            leading-loose
            truncate"
        >
          {{ currentFile.name }}
        </p>
      </div>

      <button
        class="p-2
          rounded-full
          transition-colors hover:bg-gray-100"
        @click="deleteFile"
      >
        <CloseIcon class="w-4 h-auto text-gray-600" />
      </button>
    </div>
  </template>
  <template v-else>
    <label
      for="image-file"
      class="cursor-pointer
        block
        h-56
        focus:outline-none focus:ring-1 focus:ring-gray-300"
      tabindex="0"
      @dragenter="isDragging = true"
      @dragleave="isDragging = false"
      @dragover.prevent
      @drop="onFileDrop($event)"
    >
      <div :class="dropBoxClass">
        <template v-if="isDragging">
          <FileIcon
            class="w-12 lg:w-16 h-auto
            text-content-shade
            opacity-75"
          />
          <p
            class="leading-normal
            text-content-shade
            text-lg
            font-bold"
          >
            Drop your image now
          </p>
        </template>
        <template v-else>
          <UploadIcon
            class="w-12 lg:w-18 h-auto
              text-content-shade
              opacity-75"
          />
          <p class="text-center text-content-shade mt-6 lg:mt-4 text-lg">
            <span
              class="text-primary-light
                text-opacity-80
                font-bold"
            >
              Upload a file
            </span>
            or drag and drop
            <span class="block text-sm text-content-shade italic">
              Accepts .png, .jpeg, .ico, and .svg file (max 4 MB)
            </span>
          </p>
        </template>
      </div>
    </label>
    <input
      id="image-file"
      ref="fileInput"
      type="file"
      class="hidden"
      :accept="ACCEPTED_FILES"
      @change="onFileChange"
    >
    <p
      v-show="error"
      class="font-bold text-danger italic mt-2"
    >
      {{ error }}
    </p>
  </template>
</template>

<script lang="ts">
import { computed, defineComponent, ref, Ref, watch } from 'vue';

import { ACCEPTED_FILES, FILE_SIZE } from '@/constant/file';

import UploadIcon from '@/assets/icons/upload.svg?component';
import ImageIcon from '@/assets/icons/image.svg?component';
import FileIcon from '@/assets/icons/file.svg?component';
import CloseIcon from '@/assets/icons/close.svg?component';

export default defineComponent({
  components: {
    UploadIcon,
    ImageIcon,
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

    const dropBoxClass = computed(() => {
      const dragClass = isDragging.value ? `bg-content-shade
        bg-opacity-10
        border-content-shade
        border-opacity-60` : '';

      return `border-2 border-content-shade border-opacity-50 border-dashed
        grid place-items-center
        rounded-md p-8
        transition-colors
        hover:(bg-content-shade
          bg-opacity-10
          border-content-shade
          border-opacity-60)
        h-full
        ${dragClass}`;
    });

    const isSupported = (currentFile: File): boolean => {
      return [
        'image/png',
        'image/jpeg',
        'image/x-icon',
        'image/vnd-microsoft-icon',
        'image/svg+xml',
      ].includes(currentFile.type);
    };

    const deleteFile = () => currentFile.value = null;

    const isFit = ({ size }: File) => size <= FILE_SIZE;

    const onFileChange = () => {
      if (fileInput.value && fileInput.value.files) {
        const file = fileInput.value.files[0];

        if (!isFit(file)) {
          validationError.value = 'Image size is too large (max 4 MB)';
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

      if (!isFit(file)) {
        validationError.value = 'Image size is too large (max 1 MB)';
        return;
      }

      validationError.value = '';
      currentFile.value = file;
    };

    watch(currentFile, (value) => {
      if (value) {
        if (isSupported(value)) {
          validationError.value = '';
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
      dropBoxClass,
      ACCEPTED_FILES,
    };
  },
});
</script>

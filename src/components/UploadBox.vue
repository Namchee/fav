<template>
  <template v-if="fileName">
    <div
      class="flex justify-between
        rounded-md
        p-3 pl-6
        border border-content-shade border-opacity-40"
    >
      <div class="text-content-light flex justify-center space-x-2">
        <ImageIcon class="w-5 h-auto" />
        <p
          class="font-bold
            tracking-tight
            leading-loose
            truncate"
        >
          {{ fileName }}
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
        focus:(outline-none ring-2 ring-opacity-50 ring-content-shade)"
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
          <p
            class="text-center
            text-content-shade
            mt-6 lg:mt-4
            text-lg leading-relaxed"
          >
            <span
              class="text-primary-light
                text-opacity-80
                font-bold"
            >
              Upload a file
            </span>
            or drag and drop
            <span class="block text-sm text-content-shade italic">
              PNG, JPEG, ICO, WEBP, BMP, and SVG file up to 10 MB
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
      v-show="fileError"
      class="font-bold text-danger italic mt-2"
    >
      {{ fileError }}
    </p>
  </template>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

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
    fileError: {
      type: String,
      required: false,
      default: '',
    },
  },

  emits: [
    'file-change',
    'update:file-error',
  ],

  setup(_, { emit }) {
    const fileName = ref('');
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
    const isFit = ({ size }: File) => size <= FILE_SIZE;

    const updateFile = (file: File) => {
      fileName.value = file.name;
      emit('file-change', file);
    };
    const deleteFile = () => {
      fileName.value = '';
      emit('file-change', null);
    };

    const onFileChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.item(0);

      if (!file) {
        deleteFile();
        return;
      }

      if (!isFit(file) || !isSupported(file)) {
        emit('update:file-error', !isFit(file) ?
          'Icon size is too large (max 10 MB)' :
          'Unsupported file type',
        );
        deleteFile();
        return;
      }

      updateFile(file);
    };

    const onFileDrop = (event: DragEvent) => {
      event.preventDefault();
      isDragging.value = false;

      const file = event.dataTransfer?.files[0];

      if (!file) {
        deleteFile();
        return;
      }

      if (!isFit(file) || !isSupported(file)) {
        emit('update:file-error', !isFit(file) ?
          'Icon size is too large (max 10 MB)' :
          'Unsupported file type',
        );
        deleteFile();
        return;
      }

      updateFile(file);
    };

    return {
      fileName,
      onFileChange,
      deleteFile,
      isDragging,
      onFileDrop,
      dropBoxClass,
      ACCEPTED_FILES,
    };
  },
});
</script>

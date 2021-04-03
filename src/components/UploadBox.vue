<template>
  <div>
    <template v-if="currentFile">
      <div class="flex justify-between
        rounded-md p-3 pl-6 border border-gray-200">
        <div class="text-gray-500 flex justify-center">
          <FileIcon class="w-5 h-auto mr-3" />
          <p class="font-extrabold tracking-tight
            overflow-hidden
            overflow-ellipsis
            leading-loose
            file__name">
            {{ currentFile.name }}
          </p>
        </div>

        <button
          @click="deleteFile"
          class="p-2 rounded-full transition-colors hover:bg-gray-100">
          <CloseIcon class="w-4 h-auto text-gray-600" />
        </button>
      </div>
    </template>
    <template v-else>
      <label
        tabindex="0"
        @dragenter="isDragging = true"
        @dragleave="isDragging = false"
        @dragover.prevent
        @drop="onFileDrop($event)"
        for="image-file"
        class="cursor-pointer block h-48
          focus:outline-none
          focus:ring-1 focus:ring-gray-300">
        <div class="border-2 border-gray-200 border-dashed
          grid place-items-center
          rounded-md p-8
          transition-colors
          hover:bg-gray-50
          hover:border-gray-300
          h-full"
          :class="{ 'bg-gray-50': isDragging, 'border-gray-300': isDragging }">
          <template v-if="isDragging">
            <FileIcon class="w-16 h-auto text-gray-400" />
            <p class="leading-normal text-gray-400 text-lg font-bold">
              Drop your image now
            </p>
          </template>
          <template v-else>
            <UploadIcon class="w-16 h-auto text-gray-400" />
            <p class="leading-normal text-gray-400 mt-2 text-lg">
              <span class="text-indigo-400 font-bold">
                Upload a file
              </span>
              or drag and drop
            </p>
            <p class="italic text-sm text-gray-400">
              Accepts .png, .jpeg, .ico, and .svg (max 192 KB)
            </p>
          </template>
      </div>
      </label>
      <input
        type="file"
        class="hidden"
        id="image-file"
        ref="fileInput"
        accept="image/png, image/jpeg, image/vnd.microsoft.icon, image/svg+xml"
        @change="onFileChange"
      />
      <p v-if="error || validationError"
        class="font-bold text-red-700 italic mt-2">
        {{ error || validationError }}
      </p>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, watch } from 'vue';
import UploadIcon from './../assets/icons/upload.svg';
import FileIcon from './../assets/icons/file.svg';
import CloseIcon from './../assets/icons/close.svg';

export default defineComponent({
  emits: [
    'fileChange',
  ],

  props: {
    error: {
      type: String,
      required: false,
      default: '',
    },
  },

  components: {
    UploadIcon,
    FileIcon,
    CloseIcon,
  },

  setup(_, { emit }) {
    const currentFile: Ref<File | null> = ref(null);
    const fileInput: Ref<HTMLInputElement | null> = ref(null);

    const validationError: Ref<string> = ref('');

    const isDragging = ref(false);

    const isImageFile = (currentFile: File): boolean => {
      return [
        'image/png',
        'image/jpeg',
        'image/vnd.microsoft.icon',
        'image/x-icon',
        'image/svg+xml',
      ].includes(currentFile.type);
    };

    const deleteFile = () => {
      currentFile.value = null;
    };

    const onFileChange = () => {
      if (fileInput.value && fileInput.value.files) {
        currentFile.value = fileInput.value.files[0];
      }
    };

    const onFileDrop = (event: DragEvent) => {
      event.preventDefault();

      if (event.dataTransfer?.items &&
        event.dataTransfer.items[0].kind === 'file') {
        currentFile.value = event.dataTransfer.items[0].getAsFile();
      } else {
        currentFile.value = event.dataTransfer?.files[0] as File;
      }

      isDragging.value = false;
    };

    watch(currentFile, (value) => {
      if (value) {
        if (isImageFile(value)) {
          emit('fileChange', value);
        } else {
          currentFile.value = null;
          validationError.value =
            'Only .png, .jpeg, .svg, and .ico file are allowed';
        }
      } else {
        emit('fileChange', null);
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

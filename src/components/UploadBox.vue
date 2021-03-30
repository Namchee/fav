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
      <label for="image-file" class="cursor-pointer">
        <div class="border-2 border-gray-200 border-dashed
          grid place-items-center
          rounded-md p-8
          transition-colors
          hover:bg-gray-50
          hover:border-gray-300">
          <UploadIcon class="w-16 h-auto text-gray-400" />
          <p class="leading-normal text-gray-400 mt-2 text-lg">
            <span class="text-indigo-400 font-bold">
              Upload a file
            </span>
            or drag and drop
          </p>
          <p class="italic text-sm text-gray-400">
            Accepts .png, .jpeg, .ico, and .svg
          </p>
      </div>
      </label>
      <input
        type="file"
        class="hidden"
        id="image-file"
        ref="fileInput"
        @change="onFileChange"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, watch } from 'vue';
import UploadIcon from './../assets/icons/upload.svg';
import FileIcon from './../assets/icons/file.svg';
import CloseIcon from './../assets/icons/close.svg';

export default defineComponent({
  components: {
    UploadIcon,
    FileIcon,
    CloseIcon,
  },

  setup(_, { emit }) {
    const currentFile: Ref<File | null> = ref(null);
    const fileInput: Ref<HTMLInputElement | null> = ref(null);

    const deleteFile = () => {
      currentFile.value = null;
    };

    const onFileChange = () => {
      if (fileInput.value && fileInput.value.files) {
        currentFile.value = fileInput.value.files[0];
      }
    };

    watch(currentFile, (value) => {
      if (value) {
        emit('file-change', value);
      }
    });

    return {
      currentFile,
      fileInput,
      onFileChange,
      deleteFile,
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

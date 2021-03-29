<template>
  <div>
    <label
      class="inline-flex items-center justify-center
        bg-blue-500
        text-white
        cursor-pointer
        hover:bg-blue-600
        transition-colors
        rounded-md
        px-4 py-2"
      for="file-upload">
      <UploadIcon class="upload__icon" />
      <span class="ml-2">
        Upload
      </span>
    </label>
    <input
      type="file"
      id="file-upload"
      class="hidden"
      accept="image/png, image/jpg, image/svg+xml">
    <p class="text-gray-400 text-sm leading-loose">
      Accepts png, jpg, and svg
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UploadIcon from './../assets/icons/upload.svg';

export default defineComponent({
  components: {
    UploadIcon,
  },
});
</script>

<style lang="postcss" scoped>
.upload__icon {
  width: 1rem;
  height: auto;
}
</style>

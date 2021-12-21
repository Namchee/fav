<template>
  <div class="rounded-md mt-8 md:mt-0 preview__box">
    <template v-if="value === ''">
      <div
        class="w-full h-full
          flex flex-col justify-center
          p-12 text-center text-content-shade"
      >
        <p class="text-4xl leading-loose mb-2">
          ¯\_(ツ)_/¯
        </p>

        <p class="text-xl tracking-wide">
          Nothing to see here
        </p>
      </div>
    </template>
    <template v-else>
      <img
        :src="value"
        title="Favicon"
        class="w-4/5 h-4/5 object-contain"
      >
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    value: {
      type: String,
      default: '',
    },
  },
});
</script>

<style lang="postcss" scoped>
.preview__box {
  aspect-ratio: 1;
  box-shadow: 0 0 2.5px rgba(0, 0, 0, 0.2);
  transition: box-shadow 150ms ease-out;
  overflow: hidden;

  height: auto;
  margin-left: auto;
  display: grid;
  place-items: center;
  position: sticky;
  top: 25%;
}

.preview__box:hover {
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.225);
}
</style>

<template>
  <div class="rounded-md preview__box">
    <template v-if="value === ''">
      <div class="h-full
        flex flex-col justify-center
        p-12 text-center text-gray-300">
        <p class=" text-5xl leading-loose mb-2">
          ¯\_(ツ)_/¯
        </p>

        <p class="text-xl tracking-wide">
          Nothing to see here
        </p>
      </div>
    </template>
    <template v-else>
      <img :src="value" title="Favicon" />
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
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);

  width: 20rem;
  height: auto;
  display: grid;
  place-items: center;
  position: sticky;
  top: 25%;
  margin: auto;
}
</style>

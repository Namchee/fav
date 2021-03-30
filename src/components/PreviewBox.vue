<template>
  <div class="w-full h-full preview__box rounded-md">
    <template v-if="val === ''">
      <div class="h-full
        flex flex-col justify-center
        p-12 text-center text-gray-300">
        <p class=" text-5xl leading-loose mb-2">
          ¯\_(ツ)_/¯
        </p>

        <p class="text-xl tracking-wide">
          Nothing is uploaded
        </p>
      </div>
    </template>
    <template v-else>
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

  setup(props) {
    return {
      val: props.value,
    };
  },
});
</script>

<style lang="postcss" scoped>
.preview__box {
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);

  min-width: 16rem;
  min-height: auto;
}
</style>

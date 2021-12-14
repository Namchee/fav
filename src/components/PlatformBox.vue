<template>
  <div>
    <label
      tabindex="0"
      :for="id"
      class="flex items-center
        rounded-xl
        py-4 px-6
        cursor-pointer
        transition-colors
        hover:bg-gray-50 focus:bg-gray-50
        focus:outline-none
        focus:ring-1 focus:ring-gray-200"
      :class="{
        'bg-gray-100': checked,
        'hover:bg-gray-100': checked,
        'focus:bg-gray-100': checked
      }"
    >
      <input
        :id="id"
        ref="checkbox"
        tabindex="-1"
        type="checkbox"
        class="rounded
          w-4 h-4
          cursor-pointer
          focus:outline-none
          focus:ring-2 focus:ring-indigo-500"
        :class="checkboxClass"
        :value="value"
        :checked="checked"
        :disabled="disabled"
        @change="handleChecked"
      >

      <div class="ml-4 flex items-center">
        <slot name="icon" />
        <div class="ml-3">
          <slot name="title" />
          <slot name="description" />
        </div>
      </div>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  model: {
    prop: 'platforms',
    event: 'updatePlatforms',
  },

  props: {
    id: {
      type: String,
      required: true,
    },

    platforms: {
      type: Array,
      required: true,
    },

    value: {
      type: String,
      required: true,
    },

    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  setup(props, { emit }) {
    const checked = computed(() => props.platforms.includes(props.value));

    const checkboxClass = computed(() => {
      return {
        'text-indigo-700': !props.disabled,
        'text-indigo-400': props.disabled,
      };
    });

    const handleChecked = () => {
      const newVal = [...props.platforms];

      if (checked.value) {
        newVal.splice(newVal.indexOf(props.value), 1);
      } else {
        newVal.push(props.value);
      }

      emit('updatePlatforms', newVal);
    };

    return {
      checked,
      checkboxClass,
      handleChecked,
    };
  },
});
</script>


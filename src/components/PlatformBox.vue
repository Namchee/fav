<template>
  <label
    tabindex="0"
    :for="value"
    class="flex items-center
      rounded-xl
      py-4 px-6
      cursor-pointer
      transition-colors
      hover:(bg-content-shade bg-opacity-10)
      focus:(bg-content-shade bg-opacity-15
        outline-none
        ring-2 ring-opacity-30 ring-content-shade)"
    :class="{
      'bg-content-shade bg-opacity-15': checked,
      'hover:(bg-content-shade bg-opacity-15)': checked,
      'focus:(bg-content-shade bg-opacity-15)': checked
    }"
  >
    <input
      :id="value"
      ref="checkbox"
      tabindex="-1"
      type="checkbox"
      class="rounded
        w-4 h-4
        focus:(outline-none ring-2 ring-primary ring-opacity-50)"
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
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  model: {
    prop: 'platforms',
  },

  props: {
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

  emits: ['update:platforms'],

  setup(props, { emit }) {
    const checked = computed(() => props.platforms.includes(props.value));

    const checkboxClass = computed(() => {
      return {
        'text-primary': !props.disabled,
        'text-primary-light text-opacity-70': props.disabled,
      };
    });

    const handleChecked = () => {
      const newVal = [...props.platforms];

      if (checked.value) {
        newVal.splice(newVal.indexOf(props.value), 1);
      } else {
        newVal.push(props.value);
      }

      emit('update:platforms', newVal);
    };

    return {
      checked,
      checkboxClass,
      handleChecked,
    };
  },
});
</script>


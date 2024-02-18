<template>
  <label
    :tabindex="disabled ? -1 : 0"
    :for="value"
    class="rounded-xl
      px-6 py-4
      cursor-pointer
      transition-all
      bg-opacity-10
      hover:bg-opacity-10
      border
      focus:(outline-none bg-opacity-10 ring-3 focus:ring-opacity-30)"
    :class="labelClass"
  >
    <div class="flex justify-between items-center">
      <p
        class="font-bold
        text-content
        text-2xl
        leading-relaxed"
        :class="titleClass"
      >
        {{ title }}
      </p>
      <input
        :id="value"
        ref="checkbox"
        tabindex="-1"
        type="checkbox"
        class="rounded-full w-5 h-5 pointer-events-none"
        :class="checkboxClass"
        :value="value"
        :checked="checked"
        :disabled="disabled"
        @change="handleChecked"
      >
    </div>

    <p
      class="mt-1"
      :class="descriptionClass"
    >
      {{ description }}
    </p>
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

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
  },

  emits: ['update:platforms'],

  setup(props, { emit }) {
    const checked = computed(() => props.platforms.includes(props.value));

    const checkboxClass = computed(() => {
      return {
        'text-primary': !props.disabled,
        'text-primary-light text-opacity-60': props.disabled,
        'hidden': !checked.value,
      };
    });

    const labelClass = computed(() => {
      return {
        'bg-primary-light': checked.value,
        'hover:bg-primary-light': checked.value,
        'focus:bg-primary-light': checked.value,
        'focus:ring-primary': checked.value,
        'hover:bg-content-shade': !checked.value,
        'focus:bg-content-shade': !checked.value,
        'focus:ring-content-shade': !checked.value,
        'border-primary': checked.value,
        'border-opacity-30': checked.value,
      };
    });

    const titleClass = computed(() => {
      return {
        'text-primary-dark': checked.value,
      };
    });

    const descriptionClass = computed(() => {
      return {
        'text-content-light': !checked.value,
        'text-primary-light': checked.value,
        'text-opacity-80': checked.value,
      };
    });

    const handleChecked = () => {
      const newVal = [...props.platforms];

      if (checked.value) {
        newVal.splice(newVal.indexOf(props.value), 1);
      } else {
        newVal.push(props.value);
      }

      emit('update:platforms', newVal.sort());
    };

    return {
      checked,
      checkboxClass,
      labelClass,
      titleClass,
      descriptionClass,
      handleChecked,
    };
  },
});
</script>


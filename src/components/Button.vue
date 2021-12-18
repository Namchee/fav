<template>
  <button
    :disabled="disabled || loading"
    :aria-disabled="disabled || loading"
    :aria-label="label"
    :class="className"
  >
    <template v-if="loading">
      <LoadingIcon
        class="w-5.5 h-5.5
          animate-spin
          text-content-white
          h-full"
      />
    </template>
    <template v-else>
      <slot />
    </template>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

import LoadingIcon from '@/assets/icons/loading.svg?component';

type ThemeKey = 'primary';

const activeThemes: Record<ThemeKey, string> = {
  primary: `flex justify-center items-center
    text-content-white
    bg-primary
    rounded-md
    transition-color
    transition-shadow
    hover:bg-primary-dark
    active:bg-primary-dark
    focus:bg-primary-dark
    active:(outline-none ring ring-4 ring-primary-light ring-opacity-50)
    focus:(outline-none ring ring-4 ring-primary-light ring-opacity-50)`,
};

const disabledThemes: Record<ThemeKey, string> = {
  primary: `flex justify-center items-center
    space-x-2
    text-content-white
    bg-primary-light
    rounded-md
    cursor-not-allowed`,
};

export default defineComponent({
  components: {
    LoadingIcon,
  },

  props: {
    theme: {
      type: String,
      required: true,
      validator: (val: string) => {
        return Object.keys(activeThemes).includes(val);
      },
    },

    type: {
      type: String,
      default: 'button',
      validator: (val: string) => {
        return ['button', 'submit', 'reset'].includes(val);
      },
    },

    loading: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    label: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const className = computed(() => {
      return props.disabled || props.loading ?
        disabledThemes[props.theme as ThemeKey] :
        activeThemes[props.theme as ThemeKey];
    });

    return {
      className,
    };
  },
});
</script>

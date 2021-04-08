<template>
  <nav
    class="w-full
      max-w-4xl
      px-6 py-8
      md:px-8 md:py-12
      lg:px-0
      mx-auto
      flex justify-between items-center"
  >
    <header>
      <nuxt-link to="/">
        <Logo class="w-16 h-auto" role="banner" />
      </nuxt-link>
    </header>

    <div>
      <ul class="flex items-center">
        <li
          v-for="link in links"
          :key="link.href"
        >
          <nuxt-link
            :to="link.href"
            class="text-lg
              text-gray-500
              transition-colors
              p-4
              lg:px-8
              hover:text-black"
          >
            {{ link.name }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

import Logo from '@/assets/icons/logo.svg?inline';

export default defineComponent({
  components: {
    Logo,
  },

  setup() {
    const links = [
      {
        name: 'Home',
        href: '/',
      },
      {
        name: 'About',
        href: '/about',
      },
    ];

    return {
      links,
    };
  },
});
</script>

<style lang="postcss" scoped>
.nuxt-link-exact-active {
  @apply font-bold text-indigo-500;

  transition: font-weight 150ms linear;
}
</style>

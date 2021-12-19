<template>
  <div
    class="w-full
      max-w-5xl
      px-6
      lg:px-8
      h-28
      mx-auto
      flex justify-between items-center"
  >
    <header>
      <router-link
        to="/"
        aria-label="Fav"
      >
        <Logo
          class="w-12 h-auto"
          role="banner"
        />
      </router-link>
    </header>

    <nav>
      <ul class="flex items-center">
        <li
          v-for="link in links"
          :key="link.href"
        >
          <router-link
            :to="link.href"
            class="text-lg
              text-gray-500
              transition-colors
              p-4
              lg:px-8
              hover:text-black"
          >
            {{ link.name }}
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Logo from '@/assets/icons/logo.svg?component';

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
.router-link-exact-active {
  @apply font-bold text-indigo-500;

  transition: font-weight 150ms linear;
}
</style>

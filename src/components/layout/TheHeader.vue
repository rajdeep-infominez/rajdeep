<script setup lang="ts">
/* ==================================================
   The Header Component
   ================================================== */

import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
];

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <header 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-base"
    :class="[
      isScrolled 
        ? 'bg-dark-900/80 backdrop-blur-lg border-b border-white/5' 
        : 'bg-transparent'
    ]"
  >
    <div class="content-wrapper py-4 px-6 flex items-center justify-between">
      <!-- Logo -->
      <router-link 
        to="/" 
        class="text-xl font-display font-semibold text-white hover:text-accent-primary transition-colors"
      >
        <span class="gradient-text">Motion</span>Gallery
      </router-link>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center gap-8">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="text-sm text-white/60 hover:text-white transition-colors relative group"
          :class="{ 'text-white': route.path === item.path }"
        >
          {{ item.name }}
          <span 
            class="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-primary transition-all duration-fast group-hover:w-full"
            :class="{ 'w-full': route.path === item.path }"
          />
        </router-link>
      </nav>

      <!-- Mobile Menu Button -->
      <button 
        class="md:hidden p-2 text-white/60 hover:text-white"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        aria-label="Toggle menu"
      >
        <svg 
          class="w-6 h-6 transition-transform duration-fast"
          :class="{ 'rotate-90': isMobileMenuOpen }"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            v-if="!isMobileMenuOpen"
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M4 6h16M4 12h16M4 18h16"
          />
          <path 
            v-else
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <transition name="mobile-menu">
      <div 
        v-if="isMobileMenuOpen"
        class="md:hidden bg-dark-800/95 backdrop-blur-lg border-t border-white/5"
      >
        <nav class="py-4 px-6 flex flex-col gap-4">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="text-lg text-white/60 hover:text-white transition-colors py-2"
            :class="{ 'text-white': route.path === item.path }"
            @click="isMobileMenuOpen = false"
          >
            {{ item.name }}
          </router-link>
        </nav>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all var(--motion-duration-fast) var(--motion-ease-smooth);
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

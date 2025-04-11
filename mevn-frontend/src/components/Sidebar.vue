<template>
  <transition name="slide">
    <aside
        v-show="isOpen"
        class="fixed md:static w-64 z-40 md:z-auto h-full bg-white shadow-lg md:shadow-none"
    >
      <div class="p-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold mb-6 text-gray-700">PWMD</h2>
          <button class="md:hidden mb-6" @click="$emit('toggle-sidebar')">
            <svg
                v-if="!isOpen"
                class="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
              <!-- Hamburger -->
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16" />
            </svg>

            <svg
                v-else
                class="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
              <!-- Cross -->
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav class="space-y-2">
          <RouterLink
              v-for="link in links"
              :key="link.name"
              :to="link.href"
              class="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-200 text-gray-700"
          >
            <component :is="link.icon" class="w-5 h-5" />
            {{ link.name }}
          </RouterLink>
        </nav>
      </div>
    </aside>
  </transition>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { Home, FileText, Users } from 'lucide-vue-next'
defineProps({ isOpen: Boolean })

const links = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Posts', href: '/posts', icon: FileText },
  { name: 'Users', href: '/users', icon: Users },
]
</script>

<style scoped>
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(-100%);
}
</style>

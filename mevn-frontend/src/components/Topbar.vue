<!-- src/components/Topbar.vue -->
<template>
  <header class="bg-[#272b35] dark:bg-dark-clr flex justify-between items-center px-4 py-4 shadow md:shadow-none">
    <div class="flex items-center">
      <button class="md:hidden mr-2" @click="toggleSidebar">
        <svg v-if="!props.sidebarOpen" class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
        <svg v-else class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <div class="flex items-center space-x-2 mr-4">
      <!-- Theme toggle -->
      <button
          id="theme-toggle"
          class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm p-2"
          title="Dark/Light Mode"
      >
        <!-- Icons -->
      </button>

      <!-- Notifications -->
      <i class="fa fa-bell text-dark-text dark:text-gray-400 cursor-pointer" />

      <!-- Profile Dropdown -->
      <ProfileDropdown />
    </div>
  </header>
</template>

<script setup>
import ProfileDropdown from './ProfileDropdown.vue'

const props = defineProps({
  sidebarOpen: Boolean,
  toggleSidebar: Function,
})
</script>

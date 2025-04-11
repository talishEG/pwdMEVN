<template>
  <header class="bg-white shadow px-4 md:px-6 py-5 flex justify-between items-center relative">
    <!-- Toggle Sidebar Button -->
    <button class="md:hidden" @click="$emit('toggle-sidebar')">
      <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    </button>

    <!-- Title -->
    <h1 class="text-lg md:text-xl font-semibold text-gray-800">
      Population Welfare Dept
    </h1>

    <!-- User Icon -->
    <div class="relative" @click.stop="toggleUserMenu">
      <div class="cursor-pointer text-gray-500 text-xl mr-4">👤</div>

      <div
          v-if="userMenuOpen"
          class="absolute right-0 mt-5 bg-white shadow w-40 z-50"
      >
        <a href="#" class="block px-4 py-2 hover:bg-gray-100">Profile</a>
        <button class="block px-4 py-2 hover:bg-gray-100" @click.prevent="logout">Logout</button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Router from "@/router/index.js";
import { useRouter, RouterLink } from 'vue-router'
import {Toast} from "@/utils/toast.js";
const router = useRouter()
const userMenuOpen = ref(false)
const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value
}

// Click outside to close dropdown
const handleClickOutside = (event) => {
  const container = document.querySelector('header')
  if (container && !container.contains(event.target)) {
    userMenuOpen.value = false
  }
}
const logout = (event) => {
  Toast.fire({
    icon: "success",
    title: "You Are Logged Out Successfully!",
  })

  router.push({ name: 'Login' })
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

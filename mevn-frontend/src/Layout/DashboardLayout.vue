<template>
  <div class="flex h-screen bg-gray-100 overflow-hidden">
    <!-- Sidebar -->
    <Sidebar :isOpen="sidebarOpen" @toggle="sidebarOpen = !sidebarOpen" @toggle-sidebar="toggleSidebar" />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <Topbar @toggle-sidebar="toggleSidebar" />

      <main class="flex-1 overflow-y-auto p-4 md:p-6 content sm-gutter full-height">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue'
import Topbar from '../components/Topbar.vue'
import { ref } from 'vue'

const sidebarOpen = ref(true)
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}
</script>

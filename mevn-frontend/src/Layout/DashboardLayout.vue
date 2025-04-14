<!-- src/layouts/DashboardLayout.vue -->
<template>
  <div class="flex h-screen bg-gray-100 overflow-hidden">
    <!-- Sidebar -->
    <Sidebar :sidebar-open="sidebarOpen" :toggle-sidebar="toggleSidebar" />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <Topbar :sidebar-open="sidebarOpen" :toggle-sidebar="toggleSidebar" />

      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto p-4 md:p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Topbar from '@/components/Topbar.vue'
import Sidebar from '@/components/Sidebar.vue'


const sidebarOpen = ref(false)
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}
</script>

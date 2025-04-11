<template>
  <div class="flex h-screen bg-gray-100 overflow-hidden">
    <!-- Sidebar -->
    <transition name="slide">
      <aside
          v-show="sidebarOpen"
          class="fixed md:static w-64 z-40 md:z-auto h-full bg-white shadow-lg md:shadow-none"
      >
        <div class="p-4">
          <div class="flex items-center justify-between">
            <img
                class="w-[45px] h-[45px] sm:w-[70px] sm:h-[70px] ml-3"
                src="https://e-pwd-staging.pitb.gov.pk/assets/img/head-logo.png"
                alt="logo"
            />
            <button class="md:hidden" @click="toggleSidebar">
              <SidebarToggleIcon :open="sidebarOpen" />
            </button>
          </div>
          <nav class="space-y-2 mt-4">
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

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="header bg-white dark:bg-dark-clr flex justify-between items-center px-4 py-4">
        <div class="flex items-center">
        </div>

        <div class="flex items-center space-x-2 mr-4">
          <!-- Theme toggle -->
          <button
              id="theme-toggle"
              class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm p-2"
              title="Dark/Light Mode"
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon-tabler icon-tabler-brightness-up dark:hidden h-5 w-5"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="12" cy="12" r="3" />
              <path d="M12 5v-2M17 7l1.4-1.4M19 12h2M17 17l1.4 1.4M12 19v2M7 17l-1.4 1.4M5 12H3M7 7L5.6 5.6" />
            </svg>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon-tabler icon-tabler-moon-stars hidden dark:inline h-5 w-5"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 3a7.5 7.5 0 0 0 7.92 12.45a9 9 0 1 1 -8.31 -12.45z" />
              <path d="M17 4a2 2 0 1 0 0 4a2 2 0 1 0 0 -4z" />
              <path d="M19 11h2m-1 -1v2" />
            </svg>
          </button>

          <!-- Notification -->
          <i class="fa fa-bell text-dark-text dark:text-gray-400 cursor-pointer" />

          <!-- User Menu -->
          <div class="relative">
            <button
                @click.prevent="toggleUserMenu"
                class="flex text-sm  border-transparent rounded-full focus:outline-none"
            >
              <img
                  alt="Super Admin"
                  src="https://ui-avatars.com/api/?name=S+A&color=7F9CF5&background=EBF4FF"
                  class="rounded-full h-8 w-8 object-cover"
              />
            </button>

            <div class="fixed inset-0 z-40" v-if="userMenuOpen" @click="toggleUserMenu" />

            <div v-if="userMenuOpen" class="absolute z-50 mt-4 right-0 w-48 bg-white rounded-md shadow-lg">
              <div class="rounded-full">
                <div class="px-4 py-3 text-xs text-gray-400 border-b border-gray-100">Super Admin</div>
                <RouterLink to="/" class="block px-4 py-2 text-sm hover:bg-gray-100">Profile</RouterLink>
                <RouterLink to="/" class="block px-4 py-2 text-sm hover:bg-gray-100">Users</RouterLink>
                <RouterLink to="/" class="block px-4 py-2 text-sm hover:bg-gray-100">Roles</RouterLink>
                <RouterLink to="/" class="block px-4 py-2 text-sm hover:bg-gray-100">Permissions</RouterLink>
                <button
                    @click="logout"
                    class="border-t border-gray-100 block w-full text-left px-4 py-3 text-sm hover:bg-gray-100"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto p-4 md:p-6 content sm-gutter">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { Home, FileText, Users } from 'lucide-vue-next'

const sidebarOpen = ref(true)
const toggleSidebar = () => (sidebarOpen.value = !sidebarOpen.value)

const userMenuOpen = ref(false)
const toggleUserMenu = () => (userMenuOpen.value = !userMenuOpen.value)

const router = useRouter()
const logout = () => {
  router.push({ name: 'Login' })
}

const handleClickOutside = (e) => {
  const header = document.querySelector('header')
  if (header && !header.contains(e.target)) userMenuOpen.value = false
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))

const links = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Posts', href: '/posts', icon: FileText },
  { name: 'Users', href: '/users', icon: Users },
]

const SidebarToggleIcon = {
  props: ['open'],
  template: `
    <svg v-if="!open" class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
    </svg>
    <svg v-else class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
    </svg>
  `,
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>

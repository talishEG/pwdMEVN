<template>
  <aside
      :class="[
      'fixed md:relative md:translate-x-0 z-40 w-64 bg-[#2f3542] text-white h-screen transform transition-transform duration-300 ease-in-out',
      props.sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    ]"
  >
    <div class="mySideBar flex items-center justify-between px-4 py-3 border-b border-gray-600">
      <img
          class="w-10 h-10"
          src="https://e-pwd-staging.pitb.gov.pk/assets/img/head-logo.png"
          alt="PWMD Logo"
      />
      <span class="text-lg font-bold ml-2">PWMD</span>
      <button class="md:hidden text-white" @click="toggleSidebar">
        <svg v-if="!props.sidebarOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <nav class="overflow-y-auto transparent-scrollbar h-[calc(100%-80px)]">
      <div v-for="link in sidebarLinks" :key="link.label">
        <!-- Parent with children -->
        <div v-if="link.children">
          <div
              class="flex items-center justify-between px-8 py-4 cursor-pointer transition-colors hover:bg-gray-700"
              @click="toggleDropdown(link.label)"
          >
            <div class="flex items-center gap-3">
              <component :is="Icons[link.icon]" class="w-5 h-5" />
              <span :class="['transition-colors', isOpen(link.label) ? 'text-white' : 'text-[#929aac] hover:text-white']">
                {{ link.label }}
              </span>
            </div>
            <span class="text-sm">{{ isOpen(link.label) ? '▾' : '▸' }}</span>
          </div>

          <transition name="dropdown">
            <div v-if="isOpen(link.label)" class="ml-8">
              <RouterLink
                  v-for="child in link.children"
                  :key="child.meta.label"
                  :to="child.path"
                  class="block px-8 py-3 text-sm rounded transition-colors"
                  :class="[
                  $route.path === child.path
                    ? 'text-white'
                    : 'text-[#929aac] hover:text-white'
                ]"
              >
                {{ child.meta.label }}
              </RouterLink>
            </div>
          </transition>
        </div>

        <!-- Direct parent link -->
        <RouterLink
            v-else
            :to="link.href"
            class="flex items-center gap-3 px-8 py-4 transition-colors"
            :class="{ 'text-white': $route.path === link.href, 'hover:text-white': true }"
        >
          <component :is="Icons[link.icon]" class="w-5 h-5" />
          <span
              :class="[
              'transition-colors',
              $route.path === link.href ? 'text-white' : 'text-[#929aac]',
              'hover:text-white'
            ]"
          >
            {{ link.label }}
          </span>
        </RouterLink>
      </div>
    </nav>
  </aside>

  <div
      v-if="props.sidebarOpen"
      class="fixed inset-0 z-30 bg-opacity-30 md:hidden"
      @click="toggleSidebar"
  ></div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { computed, ref, onMounted } from 'vue'
import * as Icons from 'lucide-vue-next'

const props = defineProps({
  sidebarOpen: Boolean,
  toggleSidebar: Function,
})

const router = useRouter()
const openDropdown = ref(null)

const toggleDropdown = (label) => {
  openDropdown.value = openDropdown.value === label ? null : label
}

const isOpen = (label) => openDropdown.value === label

const routes = router.options.routes

const sidebarLinks = computed(() => {
  const parents = {}
  const children = {}

  for (const route of routes) {
    if (route.meta?.showInSidebar) {
      if (route.meta.parent) {
        if (!children[route.meta.parent]) children[route.meta.parent] = []
        children[route.meta.parent].push(route)
      } else {
        parents[route.meta.label] = {
          label: route.meta.label,
          href: route.path,
          icon: route.meta.icon,
          children: children[route.meta.label] || null
        }
      }
    }
  }

  for (const parentLabel in children) {
    if (!parents[parentLabel]) {
      parents[parentLabel] = {
        label: parentLabel,
        href: null,
        icon: 'Folder',
        children: children[parentLabel]
      }
    }
  }

  return Object.values(parents)
})

// Auto-expand dropdown if child route is active
onMounted(() => {
  const currentPath = router.currentRoute.value.path
  for (const link of sidebarLinks.value) {
    if (link.children?.some(child => child.path === currentPath)) {
      openDropdown.value = link.label
    }
  }
})
</script>

<style scoped>
.transparent-scrollbar::-webkit-scrollbar {
  width: 8px;
}
.transparent-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.transparent-scrollbar::-webkit-scrollbar-thumb {
  background-color: #0b0b0b;
  border-radius: 8px;
}
.transparent-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #0b0b0b transparent;
}

.mySideBar {
  background-color: #272b35;
  border-bottom: 0px;
  clear: both;
  z-index: 10;
  position: relative;
  user-select: none;
  border-right: 1px solid #2f3542;
}
</style>

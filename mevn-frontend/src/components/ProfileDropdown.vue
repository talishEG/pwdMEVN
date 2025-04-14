<!-- src/components/ProfileDropdown.vue -->
<template>
  <div class="relative">
    <button
        @click.prevent="toggleUserMenu"
        class="cursor-pointer flex text-sm border-transparent rounded-full focus:outline-none"
    >
      <img
          alt="Super Admin"
          src="https://ui-avatars.com/api/?name=S+A&color=7F9CF5&background=EBF4FF"
          class="rounded-full h-8 w-8 object-cover"
      />
    </button>

    <div class="fixed inset-0 z-40" v-if="userMenuOpen" @click="toggleUserMenu" />

    <div v-if="userMenuOpen" class="absolute z-50 mt-4 right-0 w-48 bg-white rounded-md shadow-lg">
      <div>
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
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const userMenuOpen = ref(false)
const toggleUserMenu = () => (userMenuOpen.value = !userMenuOpen.value)

const router = useRouter()
const logout = () => {
  router.push({ name: 'Login' })
}
</script>

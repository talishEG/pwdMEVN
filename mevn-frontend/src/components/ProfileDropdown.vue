<template>
  <div class="relative" ref="dropdownRef">
    <button @click.stop="toggleDropdown" class="flex items-center gap-2 px-3 py-1 rounded">
      <img src="https://i.pravatar.cc/30" class="rounded-full w-8 h-8" alt="pravatar" />
      <span>John Doe</span>
    </button>
    <div
        v-if="open"
        class="absolute right-0 mt-2 bg-white border rounded shadow w-40 z-10"
    >
      <a href="#" class="block px-4 py-2 hover:bg-gray-100">Profile</a>
      <a href="#" class="block px-4 py-2 hover:bg-gray-100">Logout</a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const open = ref(false)
const dropdownRef = ref(null)

const toggleDropdown = () => {
  open.value = !open.value
}

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    open.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

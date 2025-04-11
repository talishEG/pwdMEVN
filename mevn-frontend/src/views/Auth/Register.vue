<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Create an Account</h2>

      <form @submit.prevent="register">
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2" for="name">Name</label>
          <input
              v-model="name"
              type="text"
              id="name"
              class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2" for="email">Email</label>
          <input
              v-model="email"
              type="email"
              id="email"
              class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2" for="password">Password</label>
          <div class="relative">
            <input
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                id="password"
                class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
            <button
                type="button"
                class="absolute inset-y-0 right-3 flex items-center text-gray-500"
                @click="showPassword = !showPassword"
            >
              <span v-if="showPassword">🙈</span>
              <span v-else>👁️</span>
            </button>
          </div>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2" for="confirm-password">Confirm Password</label>
          <input
              :type="showPassword ? 'text' : 'password'"
              v-model="confirmPassword"
              id="confirm-password"
              class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
          />
        </div>

        <button
            type="submit"
            class="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-xl"
        >
          Register
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-gray-600">
        Already have an account?
        <RouterLink to="/login" class="text-blue-500 hover:underline">Login</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
import {RouterLink} from "vue-router";
const register = () => {
  if (password.value !== confirmPassword.value) {
    alert("Passwords don't match!")
    return
  }

  // Simulate registration logic or connect to backend
  console.log('Registering user:', {
    name: name.value,
    email: email.value,
    password: password.value,
  })
}
</script>

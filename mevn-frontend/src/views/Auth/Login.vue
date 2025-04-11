<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>

      <form @submit.prevent="login">
        <!-- Email -->
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2" for="email">Email</label>
          <input
              v-model="email"
              @focus="emailTouched = true"
              type="email"
              id="email"
              class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              :class="{ 'border-red-500': emailError }"
          />
          <p v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</p>
        </div>

        <!-- Password -->
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2" for="password">Password</label>
          <div class="relative">
            <input
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                @focus="passwordTouched = true"
                id="password"
                class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                :class="{ 'border-red-500': passwordError }"
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
          <p v-if="passwordError" class="text-red-500 text-sm mt-1">{{ passwordError }}</p>
        </div>

        <!-- Remember + Forgot -->
        <div class="flex justify-between items-center mb-4">
          <label class="flex items-center">
            <input type="checkbox" class="mr-2" v-model="rememberMe" />
            <span class="text-sm text-gray-600">Remember me</span>
          </label>
          <a href="#" class="text-sm text-blue-500 hover:underline">Forgot password?</a>
        </div>

        <!-- Submit -->
        <button
            type="submit"
            class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl"
        >
          Login
        </button>
      </form>

      <!-- Footer -->
      <p class="mt-6 text-center text-sm text-gray-600">
        Don't have an account?
        <RouterLink to="/register" class="text-blue-500 hover:underline">Sign up</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { Toast } from "@/utils/toast"
import Swal from "sweetalert2"

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)

const emailTouched = ref(false)
const passwordTouched = ref(false)

const router = useRouter()

// Validation logic
const emailError = computed(() => {
  if (!emailTouched.value) return null
  if (!email.value) return 'Email is required'
  const pattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
  return pattern.test(email.value) ? null : 'Please enter a valid email'
})

const passwordError = computed(() => {
  if (!passwordTouched.value) return null
  if (!password.value) return 'Password is required'
  if (password.value.length < 6) return 'Password must be at least 6 characters'
  return null
})

const login = () => {
  emailTouched.value = true
  passwordTouched.value = true

  if (emailError.value || passwordError.value) {
    Swal.fire({
      icon: 'error',
      title: 'Validation Error',
      text: emailError.value || passwordError.value
    })
    return
  }

  console.log('Logging in with:', {
    email: email.value,
    password: password.value,
    remember: rememberMe.value,
  })

  Toast.fire({
    icon: "success",
    title: "You Are Logged In Successfully!",
  })

  router.push({ name: 'Home' })
}
</script>


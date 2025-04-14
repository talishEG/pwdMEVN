<template>
  <DashboardLayout>
    <div class="p-4">
      <h2 class="text-2xl font-bold mb-4">Register Student</h2>
      <form @submit.prevent="submitForm" class="space-y-4">
        <input
            v-model="student.name"
            placeholder="Name"
            required
            class="w-full px-4 py-2 border rounded-md"
        />
        <input
            v-model="student.email"
            placeholder="Email"
            required
            type="email"
            class="w-full px-4 py-2 border rounded-md"
        />
        <input
            v-model="student.age"
            placeholder="Age"
            required
            type="number"
            class="w-full px-4 py-2 border rounded-md"
        />
        <input
            v-model="student.course"
            placeholder="Course"
            required
            class="w-full px-4 py-2 border rounded-md"
        />
        <button
            type="submit"
            class="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/studentApi";
import { Toast } from "@/utils/toast";
import { useRouter } from 'vue-router'
import DashboardLayout from '@/Layout/DashboardLayout.vue'
const router = useRouter()
const student = ref({
  name: "",
  email: "",
  age: null,
  course: ""
});


const submitForm = async () => {
  await api.createStudent({ ...student.value });
  student.value = { name: "", email: "", age: null, course: "" };
  await router.push({ name: 'StudentsAll' })
  await Toast.fire({
    icon: "success",
    title: "Student registered successfully",
  });
};
</script>

<style scoped>
/* Custom styles (if needed) */
</style>

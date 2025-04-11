<template>
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

    <h3 class="text-xl font-semibold mt-6">Registered Students</h3>

    <!-- Table of students -->
    <div class="overflow-x-auto mt-4">
      <table class="min-w-full table-auto border-collapse">
        <thead class="bg-gray-200">
        <tr>
          <th class="px-4 py-2 border-b text-left">Name</th>
          <th class="px-4 py-2 border-b text-left">Email</th>
          <th class="px-4 py-2 border-b text-left">Age</th>
          <th class="px-4 py-2 border-b text-left">Course</th>
          <th class="px-4 py-2 border-b text-left">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="s in students" :key="s._id" class="odd:bg-gray-100">
          <td class="px-4 py-2 border-b">{{ s.name }}</td>
          <td class="px-4 py-2 border-b">{{ s.email }}</td>
          <td class="px-4 py-2 border-b">{{ s.age }}</td>
          <td class="px-4 py-2 border-b">{{ s.course }}</td>
          <td class="px-4 py-2 border-b">
            <button
                @click="deleteStudent(s._id)"
                class="text-red-500 hover:text-red-700"
            >
              ❌ Delete
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../../services/studentApi";
import { Toast } from "../../utils/toast";
import Swal from "sweetalert2";

const student = ref({
  name: "",
  email: "",
  age: null,
  course: ""
});

const students = ref([]);

const fetchStudents = async () => {
  const res = await api.getStudents();
  students.value = res.data;
};

const submitForm = async () => {
  await api.createStudent({ ...student.value });
  await fetchStudents();
  student.value = { name: "", email: "", age: null, course: "" };
  Toast.fire({
    icon: "success",
    title: "Student registered successfully",
  });
};

const deleteStudent = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This record will be deleted and you won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      await api.deleteStudent(id);
      await fetchStudents();
      Toast.fire({
        icon: "success",
        title: "Student deleted successfully",
      });
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Failed to delete student",
      });
    }
  }
};

onMounted(fetchStudents);
</script>

<style scoped>
/* Custom styles (if needed) */
</style>

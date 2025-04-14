<template>
  <DashboardLayout>
    <div class="p-4">
      <h2 class="text-2xl font-bold mb-4">Students Listing</h2>
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
        <div class="mt-4 flex justify-center items-center space-x-2">
          <button
              @click="changePage(currentPage - 1)"
              :disabled="currentPage === 1"
              :class="[
                'px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50',
                currentPage !== 1 ? 'cursor-pointer' : 'cursor-not-allowed'
              ]"
          >
            Prev
          </button>

          <span>Page {{ currentPage }} of {{ lastPage }}</span>

          <button
              @click="changePage(currentPage + 1)"
              :disabled="currentPage === lastPage"
              :class="[
                'px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50',
                currentPage !== lastPage ? 'cursor-pointer' : 'cursor-not-allowed'
              ]"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/studentApi";
import { Toast } from "@/utils/toast";
import Swal from "sweetalert2";
import DashboardLayout from '@/Layout/DashboardLayout.vue'


const students = ref([]);
const currentPage = ref(1);
const lastPage = ref(1);
const fetchStudents = async (page = 1) => {
  const res = await api.getStudents(page, 10);
  console.log(res);
  students.value = res.data.data;
  currentPage.value = res.data.page;
  lastPage.value = res.data.lastPage;
};

const changePage = (page) => {
  if (page >= 1 && page <= lastPage.value) {
    fetchStudents(page);
  }
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

</style>

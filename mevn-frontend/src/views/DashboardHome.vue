<template>
  <DashboardLayout>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
          v-for="card in dashboards"
          :key="card.title"
          class="bg-white shadow rounded p-6 flex flex-col items-center justify-center text-center hover:shadow-md transition"
      >
        <div :class="`w-16 h-16 rounded-full flex items-center justify-center mb-4 text-white ${card.color}`">
          <component :is="card.icon" class="w-6 h-6" />
        </div>
        <h3 class="text-lg font-semibold">{{ card.title }}</h3>
        <p class="text-sm text-gray-500">Dashboard</p>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from '@/Layout/DashboardLayout.vue'
import { LayoutGrid, FileText, PhoneCall, Calendar, BarChart3 } from 'lucide-vue-next'

const dashboards = [
  { title: 'SBCC', icon: LayoutGrid, color: 'bg-rose-400' },
  { title: 'Inventory', icon: FileText, color: 'bg-orange-400' },
  { title: 'Complaints', icon: PhoneCall, color: 'bg-blue-400' },
  { title: 'Franchising', icon: LayoutGrid, color: 'bg-pink-500' },
  { title: 'EREG', icon: BarChart3, color: 'bg-emerald-500' },
  { title: 'BAS', icon: Calendar, color: 'bg-green-400' },
]
</script>

<template>
  <main class="theme w-full">
    <Sidebar class="w-full">
      <router-view />
    </Sidebar>
  </main>
</template>

<script setup lang="ts">
  import Sidebar from '@/components/Sidebar.vue';
  import router from '@/router';
  import { onMounted } from 'vue';

  onMounted(() => {
    const jwtToken = localStorage.getItem('token');
    if (!jwtToken) {
      router.push('/login');
    }
  });
</script>

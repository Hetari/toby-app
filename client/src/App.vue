<template>
  <main class="theme w-full">
    <Sidebar class="w-full">
      <router-view />
    </Sidebar>
  </main>
</template>

<script setup lang="ts">
  import Sidebar from '@/components/Sidebar.vue';
  import { onMounted } from 'vue';
  import store from './store';

  onMounted(() => {
    store.checkAuth();
  });
</script>

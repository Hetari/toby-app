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
  import axios from 'axios';
  import store from '@/store';

  onMounted(() => {
    const jwtToken = localStorage.getItem('token');

    axios
      .post(store.backend.url + store.backend.api + '/is-logged-in/')
      .then((response) => {})
      .catch((error) => {
        localStorage.clear();
        router.push('/login');
      });
  });
</script>

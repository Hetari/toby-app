<template>
  <div>Home</div>
</template>

<script setup lang="ts">
  import router from '@/router';
  import { onMounted } from 'vue';
  import axios from 'axios';
  import store from '@/store';

  onMounted(() => {
    const jwtToken = localStorage.getItem('token');

    axios.defaults.baseURL = store.backend.url + store.backend.api;

    axios
      .post(
        store.backend.url + store.backend.api + '/is-logged-in/',
        {},
        {
          headers: { authorization: `Bearer ${jwtToken}` },
        }
      )
      .then((response) => {
        if (!response.data.success) {
          localStorage.removeItem('token');
          router.push('/login');
        }
      })
      .catch(() => {
        localStorage.removeItem('token');
        router.push('/login');
      });
  });
</script>

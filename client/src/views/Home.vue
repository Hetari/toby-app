<template>
  <div>Home</div>
</template>

<script setup lang="ts">
  import router from '@/router';
  import store from '@/store';

  if (store.isLogin) {
    router.push('/login');
  }
</script>

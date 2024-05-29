<template>
  <div>
    <a
      href="#"
      class="w-full flex items-center justify-center py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
      <img
        class="max-w-[20px]"
        :src="url"
        :alt="alt" />
    </a>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    url: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
  });
</script>

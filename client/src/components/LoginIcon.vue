<template>
  <div>
    <a
      href="#"
      class="bg-white dark:bg-neutral-800 w-full flex items-center justify-center py-2 rounded-md shadow-sm text-sm font-medium text-gray-700">
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

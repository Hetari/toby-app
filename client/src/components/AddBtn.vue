<template>
  <button
    type="button"
    class="relative w-full flex justify-center items-center px-5 py-2.5 font-medium tracking-wide capitalize bg-gray-200 dark:bg-black rounded-md group transition duration-300 transform active:scale-95 ease-in-out">
    <svg
      v-if="icon"
      class="fill-black dark:fill-white"
      xmlns="http://www.w3.org/2000/svg"
      enable-background="new 0 0 24 24"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#FFFFFF">
      <g>
        <rect
          fill="none"
          height="24"
          width="24"></rect>
      </g>
      <g>
        <g>
          <path d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z"></path>
        </g>
      </g>
    </svg>
    <span class="pl-2 mx-1">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
  defineProps({
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: Boolean,
      default: true,
    },
  });
</script>

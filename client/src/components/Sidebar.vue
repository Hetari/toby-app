<template>
  <section class="sidebar flex-1">
    <div
      class="fixed flex flex-col top-0 left-0 w-[15%] h-full bg-slate-100 dark:bg-black">
      <div
        class="flex items-center justify-center h-20 border-b border-gray-300 dark:border-gray-700">
        <SearchInput />
      </div>
      <div class="overflow-y-auto overflow-x-hidden flex-grow">
        <ul class="flex flex-col py-4 space-y-1">
          <SidebarItem
            label="Dashboard"
            icon="home" />

          <SidebarItem
            label="Logout"
            icon="logout" />
        </ul>
      </div>
    </div>

    <aside class="fixed flex flex-col top-0 left-64 h-full w-[85%]">
      <slot />
    </aside>
  </section>
</template>

<script setup lang="ts">
  import { SidebarItem, SearchInput } from './index.ts';
</script>

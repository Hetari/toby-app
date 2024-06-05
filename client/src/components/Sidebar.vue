<template>
  <section class="sidebar flex-1">
    <div
      v-if="jwt"
      class="fixed flex flex-col top-0 left-0 w-[15%] h-full bg-slate-100 dark:bg-black">
      <div
        class="flex items-center justify-center h-20 border-b border-gray-300 dark:border-gray-700">
        <SearchInput />
      </div>
      <div class="overflow-y-auto overflow-x-hidden flex-grow">
        <ul class="flex flex-col py-4 space-y-1">
          <RouterLink to="/">
            <SidebarItem
              label="Tabs"
              icon="link" />
          </RouterLink>

          <RouterLink to="/tags">
            <SidebarItem
              label="Tags"
              icon="tag" />
          </RouterLink>

          <RouterLink to="/collections">
            <SidebarItem
              class="border-b border-gray-300 dark:border-gray-700"
              label="Collections"
              icon="collection" />
          </RouterLink>

          <RouterLink to="/login">
            <SidebarItem
              @click="logout"
              label="Logout"
              icon="logout" />
          </RouterLink>
        </ul>
      </div>
    </div>

    <aside
      class="fixed flex flex-col top-[2.5%] left-[17%] h-full w-[85%]"
      :class="{ '!w-[100%] !left-0': !jwt }">
      <slot />
    </aside>
  </section>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { SidebarItem, SearchInput } from './index.ts';
  import { onMounted, Ref, ref } from 'vue';
  let jwt: Ref<string | null> = ref('');

  onMounted(() => {
    jwt.value = localStorage.getItem('token');
  });

  const logout = () => {
    localStorage.removeItem('token');
  };
</script>

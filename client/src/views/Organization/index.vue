<template>
  <section>
    <div
      v-if="items.length == 0"
      class="relative h-40">
      <p class="text-center text-red-500 font-bold text-xl">
        There is no organizations
      </p>

      <router-link
        to="/organizations/add"
        class="text-white bg-black py-2 px-4 rounded absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        Add
      </router-link>
    </div>
    <div v-else>
      <div class="flex flex-1 justify-between w-[90%] my-5">
        <h1>Organizations</h1>
        <router-link to="/organizations/add">
          <button class="text-white bg-black py-2 px-4 rounded">Add</button>
        </router-link>
      </div>

      <table class="text-sm text-left rtl:text-right w-[90%]">
        <thead class="text-xs uppercase bg-zinc-100 dark:bg-black">
          <tr>
            <th
              scope="col"
              class="px-6 py-3">
              title
            </th>

            <th
              scope="col"
              class="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in items"
            :key="item.id"
            class="odd:bg-zinc-50 odd:dark:bg-zinc-900 even:bg-zinc-100 even:dark:bg-zinc-800 border-b dark:border-zinc-700">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-zinc-900 whitespace-nowrap dark:text-white">
              {{ item.title }}
            </th>
            <td class="px-6 py-4 flex justify-between">
              <p
                @click="deleteOrg(item.id)"
                class="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer">
                Delete
              </p>
              <router-link :to="`/organizations/edit/${item.id}`">
                <p
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">
                  Edit
                </p>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { onBeforeMount, ref } from 'vue';
  import axios from 'axios';
  import store from '@/store';
  import { RouterLink } from 'vue-router';
  import router from '@/router';

  const items: any = ref([]);
  const jwtToken = localStorage.getItem('token');

  onBeforeMount(() => {
    store.checkAuth();

    axios
      .get(store.backend.url + store.backend.api + '/organization', {
        headers: { authorization: `Bearer ${jwtToken}` },
      })
      .then((response) => {
        items.value = response.data.data;
      });
  });
  const deleteOrg = (id: number) => {
    axios
      .delete(
        store.backend.url + store.backend.api + '/organization/delete/' + id,
        {
          headers: { authorization: `Bearer ${jwtToken}` },
        }
      )
      .then(() => {
        router.go(0);
      });
  };
</script>

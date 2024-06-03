<template>
  <section class="mt-10 space-y-5">
    <div>
      <table class="text-sm text-left rtl:text-right w-[90%]">
        <thead class="text-xs uppercase bg-zinc-50 dark:bg-black">
          <tr>
            <th
              scope="col"
              class="px-6 py-3">
              title
            </th>
            <th
              scope="col"
              class="px-6 py-3">
              url
            </th>
            <th
              scope="col"
              class="px-6 py-3">
              collection
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
            class="odd:bg-white odd:dark:bg-zinc-900 even:bg-zinc-50 even:dark:bg-zinc-800 border-b dark:border-zinc-700">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-zinc-900 whitespace-nowrap dark:text-white">
              {{ item.title }}"
            </th>
            <td class="px-6 py-4">{{ item.url }}</td>
            <td class="px-6 py-4">{{ item.Collection.title }}</td>
            <td class="px-6 py-4 flex justify-between">
              <p
                class="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer">
                Delete
              </p>
              <p
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">
                Edit
              </p>
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

  const items: any = ref([]);
  const jwtToken = localStorage.getItem('token');

  onBeforeMount(() => {
    axios
      .get(store.backend.url + store.backend.api + '/tab', {
        headers: { authorization: `Bearer ${jwtToken}` },
      })
      .then((response) => {
        items.value = response.data.data;
      });
  });
</script>

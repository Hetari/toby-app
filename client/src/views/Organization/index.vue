<template>
  <div
    v-if="items.length == 0"
    class="relative h-40">
    <p class="text-center text-red-500 font-bold text-xl">
      You don't create any organization
    </p>

    <router-link
      to="/organizations/add"
      class="text-white bg-black py-2 px-4 rounded absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      Create one
    </router-link>
  </div>

  <section class="w-[90%] flex justify-between items-center my-5">
    Join with others?
    <div class="w-fit">
      <form
        @submit.prevent="joinHandle"
        class="flex gap-5">
        <input
          v-model="code"
          id="code"
          name="code"
          type="text"
          class="px-4 py-2.5 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 dark:bg-zinc-900 appearance-none relative block focus:outline-none sm:text-sm theme"
          placeholder="Enter code here" />
        <button
          class="text-black dark:text-white bg-gray-200 dark:bg-zinc-900 py-2 px-4 rounded">
          Join
        </button>
      </form>
    </div>
  </section>
  <section>
    <div
      v-if="items.length !== 0"
      class="flex flex-1 justify-between w-[90%] my-5">
      <h1>Organizations</h1>
      <router-link to="/organizations/add">
        <button class="text-white bg-black py-2 px-4 rounded">Add</button>
      </router-link>
    </div>

    <section class="space-y-10">
      <div v-if="items.length !== 0">
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
                join code
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

              <th
                scope="row"
                @click="copy(item.joinCode)"
                class="cursor-pointer px-6 py-4 font-medium text-zinc-900 whitespace-nowrap dark:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  color="#000000"
                  fill="none">
                  <path
                    d="M7.99805 16H11.998M7.99805 11H15.998"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round" />
                  <path
                    d="M7.5 3.5C5.9442 3.54667 5.01661 3.71984 4.37477 4.36227C3.49609 5.24177 3.49609 6.6573 3.49609 9.48836L3.49609 15.9944C3.49609 18.8255 3.49609 20.241 4.37477 21.1205C5.25345 22 6.66767 22 9.49609 22L14.4961 22C17.3245 22 18.7387 22 19.6174 21.1205C20.4961 20.241 20.4961 18.8255 20.4961 15.9944V9.48836C20.4961 6.6573 20.4961 5.24177 19.6174 4.36228C18.9756 3.71984 18.048 3.54667 16.4922 3.5"
                    stroke="currentColor"
                    stroke-width="1.5" />
                  <path
                    d="M7.49609 3.75C7.49609 2.7835 8.2796 2 9.24609 2H14.7461C15.7126 2 16.4961 2.7835 16.4961 3.75C16.4961 4.7165 15.7126 5.5 14.7461 5.5H9.24609C8.2796 5.5 7.49609 4.7165 7.49609 3.75Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linejoin="round" />
                </svg>
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

      <div v-if="memberOf.length !== 0">
        <table class="text-sm text-left rtl:text-right w-[90%]">
          <thead class="text-xs uppercase bg-zinc-100 dark:bg-black">
            <tr>
              <th
                scope="col"
                class="px-6 py-3">
                Member in
              </th>
              <th
                scope="col"
                class="px-6 py-3">
                join date
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
              v-for="item in memberOf"
              :key="item.id"
              class="odd:bg-zinc-50 odd:dark:bg-zinc-900 even:bg-zinc-100 even:dark:bg-zinc-800 border-b dark:border-zinc-700">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-zinc-900 whitespace-nowrap dark:text-white">
                {{ item.Organization.title }}
              </th>

              <th
                scope="row"
                @click="copy(item.joinCode)"
                class="cursor-pointer px-6 py-4 font-medium text-zinc-900 whitespace-nowrap dark:text-white">
                {{ new Date(item.createdAt).toLocaleDateString() }}
              </th>
              <td class="px-6 py-4 flex justify-between">
                <p
                  @click="leaveOrg(item.Organization.id)"
                  class="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer">
                  Leave
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
  import { onBeforeMount, ref } from 'vue';
  import axios from 'axios';
  import store from '@/store';
  import { RouterLink } from 'vue-router';
  import router from '@/router';
  import { useToast } from 'vue-toastification';

  let code = defineModel();

  const items: any = ref([]);
  const memberOf: any = ref([]);
  const jwtToken = localStorage.getItem('token');

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    useToast().info('Copied to clipboard');
  };

  const joinHandle = () => {
    if (code.value === '') {
      useToast().error('Please enter a code');
      return;
    }
    axios
      .post(
        store.backend.url +
          store.backend.api +
          '/organization/join/' +
          code.value,
        {},
        {
          headers: { authorization: `Bearer ${jwtToken}` },
        }
      )
      .then(() => {
        router.go(0);
      });
  };

  onBeforeMount(() => {
    store.checkAuth();

    axios
      .get(store.backend.url + store.backend.api + '/organization', {
        headers: { authorization: `Bearer ${jwtToken}` },
      })
      .then((response) => {
        items.value = response.data.data.owner;
        memberOf.value = response.data.data.member;
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

  const leaveOrg = (id: number) => {
    axios
      .delete(
        store.backend.url + store.backend.api + '/organization/leave/' + id,
        {
          headers: { authorization: `Bearer ${jwtToken}` },
        }
      )
      .then(() => {
        router.go(0);
      });
  };
</script>

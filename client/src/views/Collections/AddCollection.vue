<template>
  <div class="flex h-screen">
    <div class="m-auto">
      <div class="mt-5 bg-gray-200 dark:bg-black rounded-lg shadow">
        <div class="flex py-5 pl-5 overflow-hidden space-x-1">
          <svg
            class="stroke-black dark:stroke-white inline align-text-top bg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none">
            <path
              d="M8.64298 3.14559L6.93816 3.93362C4.31272 5.14719 3 5.75397 3 6.75C3 7.74603 4.31272 8.35281 6.93817 9.56638L8.64298 10.3544C10.2952 11.1181 11.1214 11.5 12 11.5C12.8786 11.5 13.7048 11.1181 15.357 10.3544L17.0618 9.56638C19.6873 8.35281 21 7.74603 21 6.75C21 5.75397 19.6873 5.14719 17.0618 3.93362L15.357 3.14559C13.7048 2.38186 12.8786 2 12 2C11.1214 2 10.2952 2.38186 8.64298 3.14559Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M20.788 11.0972C20.9293 11.2959 21 11.5031 21 11.7309C21 12.7127 19.6873 13.3109 17.0618 14.5072L15.357 15.284C13.7048 16.0368 12.8786 16.4133 12 16.4133C11.1214 16.4133 10.2952 16.0368 8.64298 15.284L6.93817 14.5072C4.31272 13.3109 3 12.7127 3 11.7309C3 11.5031 3.07067 11.2959 3.212 11.0972"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M20.3767 16.2661C20.7922 16.5971 21 16.927 21 17.3176C21 18.2995 19.6873 18.8976 17.0618 20.0939L15.357 20.8707C13.7048 21.6236 12.8786 22 12 22C11.1214 22 10.2952 21.6236 8.64298 20.8707L6.93817 20.0939C4.31272 18.8976 3 18.2995 3 17.3176C3 16.927 3.20778 16.5971 3.62334 16.2661"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
          <h1 class="inline text-2xl font-semibold leading-none">Collection</h1>
        </div>

        <div class="px-5 pb-5 flex">
          <div class="flex-grow w-96 pr-2">
            <InputComponent
              label=""
              id="collection-title"
              name="collection-title"
              type="text"
              placeholder="Collection Title"
              @input="emitTitle" />
          </div>
        </div>
        <!-- TODO: add the space select here -->
      </div>
      <div class="mt-5">
        <AddBtn
          label="Create New Collection"
          @click="createCollection" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import InputComponent from '@/components/InputComponent.vue';
  import AddBtn from '@/components/AddBtn.vue';
  import { reactive } from 'vue';
  import axios from 'axios';
  import store from '@/store';
  import router from '@/router';

  const jwtToken = localStorage.getItem('token');

  const form = reactive({
    title: '',
  });

  const emitTitle = (data: string) => {
    form.title = data;
  };

  const createCollection = () => {
    axios
      .post(
        store.backend.url + store.backend.api + '/collection/create',
        form,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          alert('Collection created successfully');
          router.go(0);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
</script>

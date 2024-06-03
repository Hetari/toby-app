<template>
  <!-- component -->
  <div class="flex h-screen">
    <div class="m-auto">
      <div class="mt-5 bg-gray-200 dark:bg-black rounded-lg shadow">
        <div class="flex py-5 pl-5 overflow-hidden">
          <svg
            class="stroke-black dark:stroke-white inline align-text-top bg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none">
            <path
              d="M5.82338 12L4.27922 10.4558C2.57359 8.75022 2.57359 5.98485 4.27922 4.27922C5.98485 2.57359 8.75022 2.57359 10.4558 4.27922L19.7208 13.5442C21.4264 15.2498 21.4264 18.0152 19.7208 19.7208C18.0152 21.4264 15.2498 21.4264 13.5442 19.7208L10.0698 16.2464C9.00379 15.1804 9.00379 13.4521 10.0698 12.386C11.1358 11.32 12.8642 11.32 13.9302 12.386L15.8604 14.3162"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>

          <h1 class="inline text-2xl font-semibold leading-none">Tab</h1>
        </div>

        <div class="px-5 pb-5 flex">
          <div class="flex-grow w-1/4 pr-2">
            <InputComponent
              label=""
              id="site-title"
              name="site-title"
              type="text"
              placeholder="Site Title"
              @input="emitTitle" />
          </div>
          <div class="flex-grow">
            <InputComponent
              label=""
              id="site-url"
              name="site-url"
              type="text"
              placeholder="Site Url"
              @input="emitUrl" />
          </div>
        </div>

        <div class="px-5 pb-5">
          <label
            for="countries"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Select an option</label
          >
          <select
            @change="emitCollection"
            id="countries"
            class="theme text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3">
            <option
              selected
              disabled>
              Choose a collection
            </option>

            <option
              v-for="item in items"
              :key="item.id"
              :value="item.id">
              {{ item.title }}
            </option>
          </select>
        </div>
      </div>
      <div class="mt-5">
        <AddBtn @click="createTab" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import router from '@/router';
  import { ref, Ref, onBeforeMount, onMounted, reactive } from 'vue';
  import axios from 'axios';
  import store from '@/store';
  import InputComponent from '@/components/InputComponent.vue';
  import AddBtn from '@/components/AddBtn.vue';

  const jwtToken = localStorage.getItem('token');

  const form = reactive({
    title: '',
    url: '',
    collection: '',
  });

  let items: Ref<
    {
      id: number;
      title: string;
      created_at: string;
      updated_at: string;
      userId: number;
    }[]
  > = ref([]);

  const emitTitle = (data: string) => {
    form.title = data;
  };

  const emitUrl = (data: string) => {
    form.url = data;
  };

  const emitCollection = (e: any) => {
    if (e && e.target) {
      form.collection = e.target.value;
    }
  };

  // create tab
  const createTab = () => {
    if (!form.title || !form.url || !form.collection) {
      alert('Please fill in all fields');
      return;
    }

    axios
      .post(store.backend.url + store.backend.api + '/tab/create', form, {
        headers: { authorization: `Bearer ${jwtToken}` },
      })
      .then((response) => {
        if (response.data.success) {
          alert('Tab created successfully');
          // router.push('/tabs');
        }
      })
      .then(() => {
        router.go(0);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onBeforeMount(() => {
    axios
      .get(store.backend.url + store.backend.api + '/collection', {
        headers: { authorization: `Bearer ${jwtToken}` },
      })
      .then((response) => {
        items.value = response.data.data;
      });
  });

  onMounted(() => {
    // axios.defaults.baseURL = store.backend.url + store.backend.api;
    // axios
    //   .post(
    //     store.backend.url + store.backend.api + '/is-logged-in/',
    //     {},
    //     {
    //       headers: { authorization: `Bearer ${jwtToken}` },
    //     }
    //   )
    //   .then((response) => {
    //     if (!response.data.success) {
    //       localStorage.removeItem('token');
    //       router.push('/login');
    //     }
    //   })
    //   .catch(() => {
    //     localStorage.removeItem('token');
    //     router.push('/login');
    //   });
  });
</script>

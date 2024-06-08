<template>
  <div class="flex h-screen">
    <div class="m-auto">
      <div class="mt-5 bg-gray-200 dark:bg-black rounded-lg shadow">
        <div class="flex gap-2 py-5 pl-5 overflow-hidden">
          <svg
            class="stroke-black dark:stroke-white inline align-text-top bg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none">
            <path
              d="M3 17.9808V12.7075C3 9.07416 3 7.25748 4.09835 6.12874C5.1967 5 6.96447 5 10.5 5C14.0355 5 15.8033 5 16.9017 6.12874C18 7.25748 18 9.07416 18 12.7075V17.9808C18 20.2867 18 21.4396 17.2755 21.8523C15.8724 22.6514 13.2405 19.9852 11.9906 19.1824C11.2657 18.7168 10.9033 18.484 10.5 18.484C10.0967 18.484 9.73425 18.7168 9.00938 19.1824C7.7595 19.9852 5.12763 22.6514 3.72454 21.8523C3 21.4396 3 20.2867 3 17.9808Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M9 2H11C15.714 2 18.0711 2 19.5355 3.46447C21 4.92893 21 7.28595 21 12V18"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>

          <h1 class="inline text-2xl font-semibold leading-none">Tag</h1>
        </div>

        <div class="px-5 pb-5 flex w-full">
          <EditInputComponent
            label=""
            :oldVal="form.title"
            id="site-title"
            name="site-title"
            type="text"
            placeholder="Site Title"
            @input="emitTitle" />
        </div>
      </div>
      <div class="mt-5">
        <AddBtn
          :icon="false"
          label="Update Tag"
          @click="updateTag" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import router from '@/router';
  import { ref, onBeforeMount, reactive } from 'vue';
  import axios from 'axios';
  import store from '@/store';
  import EditInputComponent from '@/components/EditInputComponent.vue';
  import AddBtn from '@/components/AddBtn.vue';

  const jwtToken = localStorage.getItem('token');
  const id = ref('');

  const form = reactive({
    title: '',
  });

  const emitTitle = (data: string) => {
    form.title = data;
  };

  onBeforeMount(() => {
    id.value = router.currentRoute.value.params.id as string;

    axios
      .get(store.backend.url + store.backend.api + '/tag/' + id.value, {
        headers: { authorization: `Bearer ${jwtToken}` },
      })
      .then((response) => {
        // console.log(response.data.data);
        form.title = response.data.data[0].title;
      });
  });

  const updateTag = () => {
    axios
      .put(store.backend.url + store.backend.api + '/tag/' + id.value, form, {
        headers: { authorization: `Bearer ${jwtToken}` },
      })
      .then(() => {
        router.push('/tags');
      });
  };
</script>

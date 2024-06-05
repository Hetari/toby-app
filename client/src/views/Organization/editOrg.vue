<template>
  <div class="flex h-screen">
    <div class="m-auto">
      <div class="mt-5 bg-gray-200 dark:bg-black rounded-lg shadow">
        <div class="flex py-5 pl-5 overflow-hidden gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            class="stroke-black dark:stroke-white inline align-text-top bg"
            fill="none">
            <path
              d="M20.774 18C21.5233 18 22.1193 17.5285 22.6545 16.8691C23.7499 15.5194 21.9513 14.4408 21.2654 13.9126C20.568 13.3756 19.7894 13.0714 19 13M18 11C19.3807 11 20.5 9.88071 20.5 8.5C20.5 7.11929 19.3807 6 18 6"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round" />
            <path
              d="M3.22596 18C2.47666 18 1.88067 17.5285 1.34555 16.8691C0.250089 15.5194 2.04867 14.4408 2.73465 13.9126C3.43197 13.3756 4.21058 13.0714 5 13M5.5 11C4.11929 11 3 9.88071 3 8.5C3 7.11929 4.11929 6 5.5 6"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round" />
            <path
              d="M8.0838 15.1112C7.06203 15.743 4.38299 17.0331 6.0147 18.6474C6.81178 19.436 7.69952 20 8.81563 20H15.1844C16.3005 20 17.1882 19.436 17.9853 18.6474C19.617 17.0331 16.938 15.743 15.9162 15.1112C13.5201 13.6296 10.4799 13.6296 8.0838 15.1112Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M15.5 7.5C15.5 9.433 13.933 11 12 11C10.067 11 8.5 9.433 8.5 7.5C8.5 5.567 10.067 4 12 4C13.933 4 15.5 5.567 15.5 7.5Z"
              stroke="currentColor"
              stroke-width="1.5" />
          </svg>
          <h1 class="inline text-2xl font-semibold leading-none">
            Organization
          </h1>
        </div>

        <div class="px-5 pb-5 flex">
          <div class="flex-grow w-96 pr-2">
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
      </div>
      <div class="mt-5">
        <AddBtn
          :icon="false"
          label="Update Org"
          @click="updateOrg" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import router from '@/router';
  import { ref, Ref, onBeforeMount, reactive } from 'vue';
  import axios from 'axios';
  import store from '@/store';
  import EditInputComponent from '@/components/EditInputComponent.vue';
  import AddBtn from '@/components/AddBtn.vue';

  const jwtToken = localStorage.getItem('token');
  const id = ref('');

  const form = reactive({
    title: '',
  });

  let items: Ref<any[]> = ref([]);

  const emitTitle = (data: string) => {
    form.title = data;
  };

  onBeforeMount(() => {
    id.value = router.currentRoute.value.params.id as string;
    axios
      .get(store.backend.url + store.backend.api + '/organization', {
        headers: { authorization: `Bearer ${jwtToken}` },
      })
      .then((response) => {
        items.value = response.data.data;
      });

    axios
      .get(
        store.backend.url + store.backend.api + '/organization/' + id.value,
        {
          headers: { authorization: `Bearer ${jwtToken}` },
        }
      )
      .then((response) => {
        form.title = response.data.data[0].title;
      });
  });

  const updateOrg = () => {
    axios
      .put(
        store.backend.url + store.backend.api + '/organization/' + id.value,
        form,
        {
          headers: { authorization: `Bearer ${jwtToken}` },
        }
      )
      .then((response) => {
        // console.log(response.data);
        router.push('/organizations');
      });
  };
</script>

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

        <div class="px-5 pb-5 flex items-center">
          <div class="flex-grow w-96 pr-2">
            <EditInputComponent
              :oldVal="form.title"
              label=""
              id="collection-title"
              name="collection-title"
              type="text"
              placeholder="Collection Title"
              @input="emitTitle" />
          </div>

          <svg
            @click="form.isStared = !form.isStared"
            class="cursor-pointer fill-none hover:fill-black hover:dark:fill-white"
            :class="{
              'fill-black stroke-black dark:fill-white dark:stroke-white':
                form.isStared,
            }"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none">
            <path
              d="M13.7276 3.44418L15.4874 6.99288C15.7274 7.48687 16.3673 7.9607 16.9073 8.05143L20.0969 8.58575C22.1367 8.92853 22.6167 10.4206 21.1468 11.8925L18.6671 14.3927C18.2471 14.8161 18.0172 15.6327 18.1471 16.2175L18.8571 19.3125C19.417 21.7623 18.1271 22.71 15.9774 21.4296L12.9877 19.6452C12.4478 19.3226 11.5579 19.3226 11.0079 19.6452L8.01827 21.4296C5.8785 22.71 4.57865 21.7522 5.13859 19.3125L5.84851 16.2175C5.97849 15.6327 5.74852 14.8161 5.32856 14.3927L2.84884 11.8925C1.389 10.4206 1.85895 8.92853 3.89872 8.58575L7.08837 8.05143C7.61831 7.9607 8.25824 7.48687 8.49821 6.99288L10.258 3.44418C11.2179 1.51861 12.7777 1.51861 13.7276 3.44418Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </div>
        <div class="px-5 pb-5">
          <label
            for="countries"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Select an option</label
          >
          <select
            ref="select"
            @change="emitTag"
            id="countries"
            class="theme text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3">
            <option
              selected
              disabled>
              Choose tag
            </option>

            <option
              v-for="item in items"
              :key="item.id"
              :value="item.id">
              {{ item.title }}
            </option>
          </select>
        </div>

        <!-- TODO: add the space select here -->
      </div>
      <div class="mt-5">
        <AddBtn
          :icon="false"
          label="Edit  Collection"
          @click="editCollection" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import EditInputComponent from '@/components/EditInputComponent.vue';
  import AddBtn from '@/components/AddBtn.vue';
  import { onBeforeMount, reactive, Ref, ref } from 'vue';
  import axios from 'axios';
  import store from '@/store';
  import router from '@/router';
  import { useToast } from 'vue-toastification';

  const jwtToken = localStorage.getItem('token');
  const id = ref('');
  const items: Ref<any[]> = ref([]);
  const select: any = ref(null);

  const form = reactive({
    title: '',
    isStared: false,
    tag: '',
  });

  const emitTitle = (data: string) => {
    form.title = data;
  };

  const emitTag = (e: any) => {
    if (e && e.target) {
      form.tag = e.target.value;
    }
  };

  onBeforeMount(() => {
    id.value = router.currentRoute.value.params.id as string;

    axios
      .get(store.backend.url + store.backend.api + '/tag', {
        headers: { authorization: `Bearer ${jwtToken}` },
      })
      .then((response) => {
        // console.log(response.data.data);
        items.value = response.data.data;
      });

    axios
      .get(store.backend.url + store.backend.api + '/collection/' + id.value, {
        headers: { authorization: `Bearer ${jwtToken}` },
      })
      .then((response) => {
        form.title = response.data.data[0].title;
        form.isStared = response.data.data[0].isStared;

        form.tag = select.value.value = response.data.data[0].tags[0].id;
      });
  });
  const editCollection = () => {
    axios
      .patch(
        store.backend.url + store.backend.api + '/collection/' + id.value,
        form,
        {
          headers: { authorization: `Bearer ${jwtToken}` },
        }
      )
      .then((response) => {
        if (response.data.success) {
          useToast().success('Collection updated successfully');
          router.push('/collections');
        }
      })
      .catch((error) => {
        useToast().error(error.message);
      });
  };
</script>

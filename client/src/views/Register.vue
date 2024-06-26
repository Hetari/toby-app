<template>
  <section
    class="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold">
        Create new account
      </h2>
      <p class="text-center">
        do you have an account?
        <RouterLink
          class="text-blue-600 dark:text-blue-400"
          to="/login"
          >Login here
        </RouterLink>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div
        class="bg-zinc-50 dark:bg-black py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form
          @submit.prevent="login"
          enctype="multipart/form-data"
          class="space-y-6"
          action="#"
          method="POST">
          <div>
            <InputComponent
              label="username"
              id="login-username"
              name="login-username"
              type="text"
              errorMessage="Please enter a valid username"
              placeholder="Enter your username"
              @input="emitUsername" />
          </div>

          <div>
            <InputComponent
              label="Email address"
              id="login-email"
              name="login-email"
              type="email"
              errorMessage="Please enter a valid email"
              placeholder="Enter your email address"
              @input="emitEmail" />
          </div>

          <div>
            <InputComponent
              errorMessage="Please enter a valid password"
              label="Password"
              id="login-password"
              name="login-password"
              type="password"
              placeholder="Enter your password"
              @input="emitPassword" />
          </div>

          <div>
            <div class="font-[sans-serif] max-w-md mx-auto">
              <label class="text-base text-gray-500 font-semibold mb-2 block"
                >Upload Progile</label
              >
              <input
                ref="profileFile"
                name="profile"
                type="file"
                class="w-full text-gray-400 font-semibold text-sm bg-white dark:bg-black file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-200 dark:file:bg-zinc-800 file:text-gray-500 rounded" />
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                * PNG, JPG SVG, WEBP, and GIF are Allowed.
              </p>
            </div>
          </div>
          <div class="group-invalid:cursor-not-allowed">
            <button
              type="submit"
              class="text-white group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 group-invalid:pointer-events-none">
              Register
            </button>
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div
                class="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span
                class="px-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-500">
                Or register with
              </span>
            </div>
          </div>
          <div class="mt-6 grid grid-cols-1 gap-4">
            <LoginIcon
              @click="googleAuthHandler"
              url="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/"
              alt="Goggle" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import InputComponent from '@/components/FormInputComponent.vue';
  import LoginIcon from '@/components/LoginIcon.vue';
  import store from '@/store';
  import axios from 'axios';
  import router from '../router/index.ts';
  import { reactive, Ref, ref } from 'vue';
  import { useToast } from 'vue-toastification';
  import { onMounted } from 'vue';

  onMounted(() => {
    const jwtToken = localStorage.getItem('token');
    if (jwtToken) {
      router.push('/');
    }
  });

  const profileFile: Ref<any> = ref(null);
  const form = reactive({
    email: '',
    password: '',
    username: '',
  });

  const emitEmail = (data: string) => {
    form.email = data;
  };

  const emitPassword = (data: string) => {
    form.password = data;
  };

  const emitUsername = (data: string) => {
    form.username = data;
  };

  const googleAuthHandler = (e: Event) => {
    e.preventDefault();

    const requestUrl = store.backend.url + store.backend.api + '/auth/google/';

    window.open(requestUrl, '_self');
  };

  const login = (e: Event) => {
    e.preventDefault();

    if (form.username && form.email && form.password) {
      const formData = new FormData();

      formData.append('username', form.username);
      formData.append('email', form.email);
      formData.append('password', form.password);

      if (profileFile.value && profileFile.value.files[0]) {
        formData.append('profile', profileFile.value.files[0]);
      }

      axios
        .post(
          store.backend.url + store.backend.api + '/auth/register/',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((response) => {
          if (response.data.success) {
            const token = response.data.token;
            localStorage.setItem('token', token);
            useToast().success('Registration Successful');
            router.push('/');
          }
        })
        .catch(() => {
          useToast().error('Registration Failed');
        });
    } else {
      useToast().error('Email, username and password are required');
    }
  };
</script>

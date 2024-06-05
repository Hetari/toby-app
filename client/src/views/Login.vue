<template>
  <section
    class="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold">
        Sign in to your account
      </h2>
      <p class="text-center">
        didn't have an account?
        <RouterLink
          class="text-blue-600 dark:text-blue-400"
          to="/register"
          >Create account</RouterLink
        >
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div
        class="bg-zinc-50 dark:bg-black py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form
          @submit.prevent="login"
          class="space-y-6 group"
          novalidate
          action="#"
          method="POST">
          <div>
            <InputComponent
              label="Email address"
              id="login-email"
              name="login-email"
              type="email"
              placeholder="Enter your email address"
              @input="emitEmail"
              errorMessage="Please enter a valid email address" />
          </div>

          <div>
            <InputComponent
              label="Password"
              id="login-password"
              name="login-password"
              type="password"
              errorMessage="Please enter a valid password"
              placeholder="Enter your password"
              @input="emitPassword" />
          </div>
          <div class="group-invalid:cursor-not-allowed">
            <button
              type="submit"
              class="text-white group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 group-invalid:pointer-events-none">
              Sign in
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
                Or continue with
              </span>
            </div>
          </div>
          <div class="mt-6 grid grid-cols-1 gap-4">
            <LoginIcon
              @click="googleAuthHandler"
              url="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/"
              alt="Goggle" />

            <!-- <LoginIcon
              url="https://ucarecdn.com/95eebb9c-85cf-4d12-942f-3c40d7044dc6/"
              alt="Linkedin" />

            <LoginIcon
              url="https://ucarecdn.com/be5b0ffd-85e8-4639-83a6-5162dfa15a16/"
              alt="Github" />

            <LoginIcon
              url="https://ucarecdn.com/6f56c0f1-c9c0-4d72-b44d-51a79ff38ea9/"
              alt="Facebook" />

            <LoginIcon
              url="https://ucarecdn.com/82d7ca0a-c380-44c4-ba24-658723e2ab07/"
              alt="twitter" />

            <LoginIcon
              url="https://ucarecdn.com/3277d952-8e21-4aad-a2b7-d484dad531fb/"
              alt="apple" /> -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { useToast } from 'vue-toastification';
  import InputComponent from '@/components/FormInputComponent.vue';
  import LoginIcon from '@/components/LoginIcon.vue';
  import store from '@/store';
  import axios from 'axios';
  import router from '../router/index.ts';
  import { reactive } from 'vue';

  import { onMounted } from 'vue';

  onMounted(() => {
    const searchParams = new URLSearchParams(window.location.search);

    const token = searchParams.get('token');

    const jwtToken = token || localStorage.getItem('token');
    if (jwtToken) {
      localStorage.setItem('token', jwtToken);
      router.push('/');
    }
  });

  const form = reactive({
    email: '',
    password: '',
  });

  const emitEmail = (data: string) => {
    form.email = data;
  };

  const emitPassword = (data: string) => {
    form.password = data;
  };

  const googleAuthHandler = (e: Event) => {
    e.preventDefault();
    const requestUrl = store.backend.url + store.backend.api + '/auth/google/';
    window.open(requestUrl, '_self');
  };

  const login = (e: Event) => {
    e.preventDefault();

    if (form.email && form.password) {
      axios
        .post(store.backend.url + store.backend.api + '/auth/login/', form)
        .then((response) => {
          if (response.data && response.data.success) {
            const token = response.data.token;

            localStorage.setItem('token', token);

            useToast().success('Login successful');

            router.push('/');
          }
        })
        .catch(() => {
          useToast().error('Login failed');
        });
    } else {
      useToast().error('fields can not be empty');
    }
  };
</script>

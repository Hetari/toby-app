<template>
  <section
    class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign in to your account
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600 max-w">
        Or
        <a
          href="#"
          class="font-medium text-blue-600 hover:text-blue-500">
          create an account
        </a>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form
          class="space-y-6"
          action="#"
          method="POST">
          <div>
            <InputComponent
              label="Email address"
              id="login-email"
              name="login-email"
              type="email"
              placeholder="Enter your email address" />
          </div>

          <div>
            <InputComponent
              label="Password"
              id="login-password"
              name="login-password"
              type="password"
              placeholder="Enter your password" />
          </div>

          <!-- TODO:
          <div class="flex items-center justify-between">
              <div class="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
              <label
                for="remember_me"
                class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div> -->

          <!-- <div class="text-sm">
              <a
                href="#"
                class="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div> 
          </div>
        -->

          <div>
            <button
              type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign in
            </button>
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-gray-100 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <div class="mt-6 grid grid-cols-6 gap-4">
            <LoginIcon
              url="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/"
              alt="Goggle" />

            <LoginIcon
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
              alt="apple" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import InputComponent from '@/components/InputComponent.vue';
  import LoginIcon from '@/components/LoginIcon.vue';
</script>

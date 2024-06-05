<template>
  <label
    :for="id"
    class="text-base text-gray-500 font-semibold mb-2 block">
    {{ label }}
  </label>
  <div class="mt-1">
    <input
      v-model="data"
      :id="id"
      :name="name"
      :type="type"
      :autocomplete="id"
      required
      class="input border invalid:[&:not(:placeholder-shown)]:border-red-500"
      :placeholder="placeholder"
      :pattern="getPattern(type)" />
    <span
      class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
  import { watch } from 'vue';

  defineProps({
    label: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    emitVal: {
      type: String,
      required: false,
    },
    errorMessage: {
      type: String,
    },
  });

  let data = defineModel();
  const emit = defineEmits(['input']);

  const getPattern = (type: string) => {
    if (type === 'email') {
      return '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$';
    } else if (type === 'password') {
      return '.{7,}';
    }
    return '.*';
  };

  watch(data, (newVal) => {
    emit('input', newVal);
  });
</script>

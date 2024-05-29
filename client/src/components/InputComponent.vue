<template>
  <label
    for="email"
    class="block text-sm font-medium text-gray-700">
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
      class="input"
      :placeholder="placeholder" />
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
  });

  let data = defineModel();
  const emit = defineEmits(['input']);
  watch(data, (newVal) => {
    emit('input', newVal);
  });
</script>

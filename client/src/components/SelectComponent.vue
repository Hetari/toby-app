<template>
  <Combobox v-model="selectedPerson">
    <div class="relative mt-1 z-50">
      <div
        class="relative w-full cursor-default overflow-hidden rounded-lg text-left shadow-md focus:outline-none sm:text-sm">
        <ComboboxInput
          class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 focus:ring-0 theme"
          :displayValue="(person) => person.name"
          @change="query = $event.target.value" />

        <ComboboxButton
          class="absolute inset-y-0 right-0 flex items-center px-2">
          <!-- Up Down Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none">
            <path
              d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
              stroke="currentColor"
              stroke-width="1.5" />
            <path
              d="M9 8V16M9 8C8.20516 8 7 10 7 10M9 8C9.78225 8 11 10 11 10M15 16V8M15 16C14.2178 16 13 14 13 14M15 16C15.7822 16 17 14 17 14"
              stroke="currentColor"
              stroke-width="1.55"
              stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </ComboboxButton>
      </div>

      <TransitionRoot
        leave=" transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        @after-leave="query = ''">
        <ComboboxOptions
          class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md dark:bg-black bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
          <div
            v-if="filteredPeople.length === 0 && query !== ''"
            class="relative cursor-default select-none px-4 py-2 text-gray-700">
            Nothing found.
          </div>

          <ComboboxOption
            v-for="person in filteredPeople"
            as="template"
            :key="person.id"
            :value="person"
            v-slot="{ selected, active }">
            <li
              class="relative cursor-default select-none py-2 pl-10 pr-4"
              :class="{
                'bg-teal-600 dark:text-white': active,
                '': !active,
              }">
              <span
                class="block truncate"
                :class="{ 'font-medium': selected, 'font-normal': !selected }">
                {{ person.name }}
              </span>
              <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3"
                :class="{ 'text-white': active, 'text-teal-600': !active }">
                <!-- Check Icon -->
                <div
                  aria-hidden="true"
                  class="size-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="none">
                    <path
                      d="M5 14.5C5 14.5 6.5 14.5 8.5 18C8.5 18 14.0588 8.83333 19 7"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round" />
                  </svg>
                </div>
              </span>
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </TransitionRoot>
    </div>
  </Combobox>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import {
    Combobox,
    ComboboxInput,
    ComboboxButton,
    ComboboxOptions,
    ComboboxOption,
    TransitionRoot,
  } from '@headlessui/vue';

  const people = [
    { id: 0, name: 'Durward Reynolds' },
    { id: 1, name: 'Kenton Towne' },
    { id: 2, name: 'Therese Wunsch' },
    { id: 3, name: 'Benedict Kessler' },
    { id: 4, name: 'Katelyn Rohan' },
  ];

  const query = ref('');
  const selectedPerson = ref(people[0]);

  const filteredPeople = computed(() =>
    query.value === ''
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.value.toLowerCase());
        })
  );

  onMounted(() => {});
</script>

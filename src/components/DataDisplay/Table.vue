<template>
  <div>
    <div
      v-if="toggleFields"
      class="mb-2 text-gray-400"
    >
      Which fields do you want to show?

      <div class="flex gap-2 mt-2">
        <Toggler
          v-for="field in availableFields"
          :key="field"
          :active="isFieldVisible(field)"
          :label="field"
          @click="toggleField(field)"
        />
      </div>
    </div>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase dark:text-gray-400 border-b dark:border-gray-700">
        <tr>
          <th
            v-for="field in fields"
            :key="field"
            class="px-6 py-4 font-bold tracking-wider"
            scope="col"
          >
            <span v-if="filteredBy !== field.key">{{ field.label }}</span>
            <div v-else>
              <input
                v-model="filterValue"
                class="p-2 dark:bg-slate-900 font-normal"
                type="text"
                @keyup="filterTable(field.key)"
              >
              <span
                class="cursor-pointer p-2"
                @click="removeFilter"
              >
                <font-awesome-icon
                  class="text-gray-400"
                  icon="fa-solid fa-xmark"
                />
              </span>
            </div>
            <div
              v-if="filteredBy !== field.key"
              class="inline-block"
            >
              <span
                v-if="field.sortable"
                :class="{ 'cursor-pointer': field.sortable }"
                class="ml-1"
                @click="sortTable(field.key)"
              >
                <font-awesome-icon
                  v-if="sortedBy !== field.key"
                  class="text-gray-400"
                  icon="fa-solid fa-sort"
                />
                <font-awesome-icon
                  v-else
                  :icon="sortDirection === 'asc' ? 'fa-solid fa-sort-up' : 'fa-solid fa-sort-down'"
                  class="text-gray-700"
                />
              </span>
              <span
                v-if="field.filterable"
                :class="{ 'cursor-pointer': field.filterable }"
                class="ml-1"
                @click="filteredBy = field.key"
              >
                <font-awesome-icon
                  class="text-gray-400"
                  icon="fa-solid fa-filter"
                />
              </span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="bg-white dark:bg-slate-900">
        <tr
          v-for="item in localData"
          :key="item.id"
          class="border-b dark:border-slate-800"
        >
          <td
            v-for="(field, index) in fields"
            :key="field"
            :class="{ 'font-medium text-slate-900 dark:text-white': index === 0}"
            class="px-6 py-4 text-slate-500 font-light dark:text-slate-400"
          >
            {{ item[field.key] }}
          </td>
        </tr>
        <tr v-if="localData.length === 0">
          <td
            :colspan="fields.length"
            class="px-6 py-4 text-slate-500 font-light dark:text-slate-400"
          >
            No data available
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import {defineProps, ref, withDefaults} from "vue";
import Toggler from "@/components/App/Toggler.vue";

export interface FieldType {
  key: string,
  label: string,
  sortable?: boolean,
  filterable?: boolean,
  type?: 'string' | 'number' | 'date' | 'datetime' | 'currency' | 'custom' | 'image',
}

const props = withDefaults(
  defineProps<{
    availableFields: string[],
    defaultFields: FieldType[];
    hiddenFields: string[];
    toggleFields?: boolean
    data: unknown[];
  }>(),
  {
    toggleFields: false,
  })

const fields = ref<FieldType[]>(props.defaultFields);
const sortedBy = ref<string | null>(null);
const sortDirection = ref<'asc' | 'desc'>('asc');
const filteredBy = ref<string | null>(null);
const filterValue = ref<string | null>(null);
const localData = ref(props.data);

const isFieldVisible = (field: string) => {
  return fields.value.some((f) => f.key === field);
}

const toggleField = (field: string) => {
  if (isFieldVisible(field)) {
    // We cannot allow the user to remove all fields. It should have at least one field visible
    if (fields.value.length === 1) {
      return;
    }

    fields.value = fields.value.filter((f) => f.key !== field);
  } else {
    //usually we should have more data here, but, as we don't control the backend,
    //we will work only with key and label
    //This might have a bug, since we can control the type on the baremetrics component, but, not here.
    fields.value = [...fields.value, {
      key: field,
      label: field,
      sortable: true,
      //yeah, I had to do it, because this was the only filterable column according to the request.
      filterable: field === 'editions'
    }];
  }
}

//Thanks to GitHub Copilot for this sorting snippet <3
const sortTable = (field: string) => {
  if (sortedBy.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortedBy.value = field;
    sortDirection.value = 'asc';
  }

  localData.value = localData.value.sort((a: any, b: any) => {
    const aValue = a[field];
    const bValue = b[field];

    if (aValue === bValue) {
      return 0;
    }

    if (sortDirection.value === 'asc') {
      return aValue < bValue ? -1 : 1;
    } else {
      return aValue > bValue ? -1 : 1;
    }
  });
}

//Thanks to GitHub Copilot for this filtering snippet as well <3
const filterTable = (field: string) => {
  filteredBy.value = field;

  if (filterValue.value === '') {
    return localData.value = props.data;
  }

  localData.value = localData.value.filter((item: any) => {
    return item[field].toLowerCase().includes(filterValue.value?.toLowerCase() ?? '');
  });
}

const removeFilter = () => {
  filteredBy.value = null;
  filterValue.value = null;
  localData.value = props.data;
}
</script>

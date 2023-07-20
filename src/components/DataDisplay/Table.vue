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
            {{ field.label }}
          </th>
        </tr>
      </thead>
      <tbody class="bg-white dark:bg-slate-900">
        <tr
          v-for="item in data"
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
    toggleFields?: boolean
    data: unknown[];
  }>(),
  {
    toggleFields: false,
  })

const fields = ref<FieldType[]>(props.defaultFields);

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
    }];
  }
}
</script>

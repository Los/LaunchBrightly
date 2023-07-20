<template>
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
</template>

<script lang="ts" setup>
import {defineProps} from "vue/dist/vue";

export interface FieldType {
  key: string,
  label: string,
  sortable?: boolean,
  filterable?: boolean,
  type?: 'string' | 'number' | 'date' | 'datetime' | 'currency' | 'custom' | 'image',
}

defineProps<{
  fields: FieldType[];
  data: unknown[];
}>()
</script>

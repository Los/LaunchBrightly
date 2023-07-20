<template>
  <button
    :class="{
      'bg-green-600 text-white hover:bg-green-800': active,
      'bg-gray-300 text-gray-500 hover:bg-gray-400 hover:text-white dark:bg-slate-600 dark:text-gray-200 dark:hover:bg-slate-700': !active
    }"
    class="px-4 py-2 rounded "
    @click="$emit('click')"
  >
    {{ label }}
  </button>
</template>

<script lang="ts" setup>
import {defineEmits, defineProps, withDefaults} from "vue"

withDefaults(
  defineProps<{
    active: boolean,
    label: string
  }>(),
  {
    active: false
  }
)

defineEmits(["click"])
</script>

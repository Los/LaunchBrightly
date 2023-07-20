<template>
  <button
    class="!w-[34px] !h-[34px] rounded-lg text-small text-gray-600 dark:text-slate-400 dark:hover:bg-slate-800 hover:bg-gray-100"
    @click="$emit('click')"
  >
    <font-awesome-icon
      v-if="(icon && iconPosition === 'left') || loading"
      :icon="loading ? 'fa-solid fa-spinner fa-spin' : icon"
    />
    <slot v-if="!iconOnly" />
    <font-awesome-icon
      v-if="icon && iconPosition === 'right' && !loading"
      :icon="loading ? 'fa-solid fa-spinner fa-spin' : icon"
    />
  </button>
</template>

<script lang="ts" setup>
import {defineEmits, defineProps, withDefaults} from "vue"

withDefaults(
  defineProps<{
    type?: "ghost",
    size?: "small",
    icon?: string,
    iconPosition?: "left" | "right",
    loading?: boolean,
    disabled?: boolean,
    iconOnly?: boolean
  }>(),
  {
    iconPosition: "left",
    icon: "",
    iconOnly: false,
    loading: false,
    disabled: false
  }
)

defineEmits(["click"])
</script>

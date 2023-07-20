<template>
  <button
    :class="{
      '!w-[34px] !h-[34px]': iconOnly && size === 'small',
      'rounded-lg text-small': size === 'small',
      'text-gray-100 hover:bg-gray-800': type === 'ghost',
    }"
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
    type?: "primary" | "secondary" | "subtle" | "ghost",
    size?: "huge" | "large" | "medium" | "small",
    icon?: string,
    iconPosition?: "left" | "right",
    loading?: boolean,
    disabled?: boolean,
    iconOnly?: boolean
  }>(),
  {
    type: "primary",
    size: "medium",
    iconPosition: "left",
    icon: "",
    iconOnly: false,
    loading: false,
    disabled: false
  }
)

defineEmits(["click"])
</script>

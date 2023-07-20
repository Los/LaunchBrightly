<template>
  <AppButton
    :icon="isDarkMode ? 'fa-solid fa-moon' : 'fa-solid fa-sun'"
    icon-only
    size="small"
    type="ghost"
    @click="toggleDarkMode"
  />
</template>

<script lang="ts" setup>
import AppButton from "@/components/App/Button.vue";
import {useDarkMode} from "@/composables/darkMode";

const toggleDarkMode = useDarkMode().toggleDark;
const isDarkMode = useDarkMode().isDark;
</script>

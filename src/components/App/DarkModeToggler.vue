<template>
  <AppButton
    :class="[isDarkMode ? '!text-yellow-300' : '!text-violet-800']"
    :icon="isDarkMode ? 'fa-solid fa-sun' : 'fa-solid fa-moon'"
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

<template>
  <header
    class="py-5 w-full bg-white dark:bg-slate-950 text-white text-center text-sm font-light sticky top-0 shadow-sm"
  >
    <div class="flex items-center pr-4 app-container">
      <div class="flex-auto relative text-slate-900 dark:text-slate-400">
        You can find the source code for this project at
        <a
          href="https://github.com/Los/LaunchBrightly"
          target="_blank"
        >GitHub</a>
      </div>
      <div class="flex-none">
        <DarkModeToggler />
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import DarkModeToggler from "@/components/App/DarkModeToggler.vue";
</script>

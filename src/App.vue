<template>
  <div class="bg-gray-100 dark:bg-slate-800 w-screen h-full pb-8">
    <LayoutHeader />
    <div class="app-container">
      <AppIntroduction class="mt-8" />
      <TableBaremetrics class="mt-8" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import LayoutHeader from '@/components/Layout/Header.vue';
import AppIntroduction from '@/components/App/Introduction.vue';
import TableBaremetrics from '@/components/Tables/Baremetrics.vue';
</script>

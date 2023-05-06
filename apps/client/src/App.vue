<template>
  <v-app>
    <v-main class="pa-6 d-flex justify-center align-center">
      <AnimalsTable class="pb-5" />
      <v-footer :app="true" :border="true" class="bg-indigo-lighten-1 text-center d-flex flex-column pa-4">
        <div class="mt-2">
          {{ new Date().getFullYear() }} — <strong>Radek Śliwa</strong>
        </div>
      </v-footer>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import AnimalsTable from './components/AnimalsTable.vue';
</script>

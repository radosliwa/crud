<template>
  <v-app>
    <v-toolbar
      dark
      prominent
      image="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
      class="bg-indigo d-flex"
    >
      <v-toolbar-title>
        <h1 class="text-h4">CRUD for a list - technical assessment</h1>
      </v-toolbar-title>
    </v-toolbar>
    <v-main class="pa-6 d-flex justify-center">
      <TableContainer />
      <v-footer
        :app="true"
        :border="true"
        class="bg-blue-darken-3 text-center d-flex flex-column pa-4"
      >
        <div class="mt-2">
          {{ new Date().getFullYear() }} — <strong>Radek Śliwa</strong>
        </div>
      </v-footer>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import TableContainer from "@/components/TableContainer.vue";
</script>

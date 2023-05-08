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
      <TableContainer
        :animals="animals"
        :loading="isLoading"
        @select-item="handleSelectItem"
        @delete-item="handleDeleteItem"
        @save="handleSave"
      />
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
import { storeToRefs } from "pinia";
import { computed, onMounted } from "vue";
import { useAnimalsStore } from "./store";
import { Animal } from "./types";

const store = useAnimalsStore();

const { getAnimals, isLoading } = storeToRefs(store);

const animals = computed(() => getAnimals.value);

onMounted(async () => {
  await store.FETCH_ANIMALS(true);
});

const handleSelectItem = async (item: Animal) => {
  const { _id, name, selected } = item;
  const id = _id || "";
  await store.UPDATE_ANIMAL(id, name, selected);
};

const handleDeleteItem = async (item: Animal) => {
  const { _id } = item;
  const id = _id || "";
  await store.DELETE_ANIMAL(id);
};

const handleSave = async (payload: { item: Animal; isEditMode: boolean }) => {
  await store.SAVE_CHANGES(payload);
};
</script>

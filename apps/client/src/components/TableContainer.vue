<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div class="container">
    <v-data-table
      v-if="!loading"
      :headers="headers"
      :items="animals"
      :sort-by="[{ key: 'name', order: 'asc' }]"
      class="elevation-1 mt-10 pb-4"
      style="max-width: 600px"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Animals CRUD</v-toolbar-title>
          <v-divider inset vertical class="mr-3"></v-divider>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ props }">
              <v-btn color="primary" dark class="pr-4" v-bind="props">
                New Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        autofocus
                        v-model="editedItem.name"
                        label="Animal name"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="resetDialogState"
                >
                  Cancel
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="save">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="resetDialogState"
                  >Cancel</v-btn
                >
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item="{ item }">
        <tr
          :class="selectedId === item.value._id ? 'active-row' : ''"
          @click="selectItem(item.value)"
        >
          <td>{{ item.value.name }}</td>
          <td class="text-right">
            <v-icon small class="mr-2" @click.stop="editItem(item.value)">
              mdi-pencil
            </v-icon>
            <v-icon small @click.stop="deleteItem(item.value)">
              mdi-delete
            </v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
    <v-overlay
      v-if="loading"
      :model-value="loading"
      class="align-center justify-center"
    >
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, watchEffect } from "vue";
import { VDataTable } from "vuetify/labs/VDataTable";
import { Animal } from "@/types";
import { headers } from "@/data";

interface Props {
  animals: Animal[];
  loading: boolean;
}

interface Emits {
  (e: "select-item", item: Animal): void;
  (e: "delete-item", item: Animal): void;
  (e: "save", payload: { item: Animal; isEditMode: boolean }): void;
}

const emit = defineEmits<Emits>();

const props = defineProps<Props>();

const selectedId = ref("");

watchEffect(() => {
  selectedId.value = props.animals.find(({ selected }) => selected)?._id || "";
});

/** refs for modals */
const dialog = ref(false);
const dialogDelete = ref(false);
const editedIndex = ref(-1);
const editedItem = ref<Animal>({
  _id: "",
  name: "",
  selected: false,
});

const formTitle = computed(() =>
  editedIndex.value === -1 ? "New Item" : "Edit Item"
);

const editItem = (item: Animal) => {
  editedIndex.value = props.animals.findIndex(({ _id }) => _id === item._id);
  editedItem.value = item;
  dialog.value = true;
};

const selectItem = async (item: Animal) => {
  selectedId.value = selectedId.value === item._id ? "" : item._id || "";
  emit("select-item", item);
};

const deleteItem = async (item: Animal) => {
  editedItem.value = item;
  dialogDelete.value = true;
};

const deleteItemConfirm = async () => {
  emit("delete-item", editedItem.value);
  resetDialogState();
};

const resetDialogState = () => {
  setTimeout(() => {
    dialog.value = false;
    dialogDelete.value = false;
    editedIndex.value = -1;
    editedItem.value = {
      name: "",
      _id: "",
      selected: false,
    };
  }, 300);
};

const save = async () => {
  const isEditMode = formTitle.value === "Edit Item";
  emit("save", {
    item: editedItem.value,
    isEditMode,
  });

  resetDialogState();
};

watch(dialog, (v) => !v && resetDialogState());
watch(dialogDelete, (v) => !v && resetDialogState());
</script>

<style>
.container {
  height: calc(100vh + 60px);
}

.v-application .v-theme--dark tr,
.v-application .v-theme--dark tr td {
  cursor: pointer;
  transition: all 0.3s linear !important;
}

.v-application .v-theme--dark tr.active-row,
.v-application .v-theme--dark tr.active-row td {
  background: rgb(var(--v-theme-secondary)) !important;
}

.v-application .v-theme--dark tr:hover,
.v-application .v-theme--dark tr td:hover {
  color: #fff;
}
</style>

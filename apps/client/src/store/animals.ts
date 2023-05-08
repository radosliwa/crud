import { defineStore } from "pinia";
import fetch from "@/utils/fetch";
import { Animal, AnimalsState } from "@/types";

export const useAnimalsStore = defineStore("animals", {
  state: (): AnimalsState => ({
    animals: [],
    loading: false,
  }),
  getters: {
    isLoading(): boolean {
      return this.loading;
    },
    getAnimals(): Animal[] {
      return this.animals;
    },
  },
  actions: {
    async FETCH_ANIMALS(enableLoader = false): Promise<void> {
      if (enableLoader) this.loading = true;
      try {
        this.animals = await fetch<Animal[]>("/animals");
      } catch (error) {
        console.error("Error fetching animals:", error);
      } finally {
        if (enableLoader) {
          setTimeout(() => {
            this.loading = false;
          }, 200);
        }
      }
    },

    async CREATE_ANIMAL(name: string): Promise<void> {
      // Get the count of animals with the same name or copies
      const existingAnimalCount = this.animals.filter((animal) =>
        animal.name.match(new RegExp(`^${name}\\(\\d+\\)$`, "i"))
      ).length;

      if (existingAnimalCount) {
        // Update the new name to "animal(number of copy)"
        name = `${name}(${existingAnimalCount + 1})`;
      }

      try {
        await fetch<Animal>("/animals", "POST", { name });
        this.FETCH_ANIMALS(true);
      } catch (error) {
        console.error("Error creating animal:", error);
      }
    },

    async UPDATE_ANIMAL(
      id: string,
      name: string,
      selected = false
    ): Promise<void> {
      try {
        await fetch<Animal>(`/animals/${id}`, "PUT", { name, selected });
        this.FETCH_ANIMALS();
      } catch (error) {
        console.error("Error updating animal:", error);
      }
    },

    async DELETE_ANIMAL(id: string): Promise<void> {
      try {
        await fetch<Animal>(`/animals/${id}`, "DELETE");
        this.FETCH_ANIMALS(true);
      } catch (error) {
        console.error("Error deleting animal:", error);
      }
    },

    async SAVE_CHANGES(payload: {
      item: Animal;
      isEditMode: boolean;
    }): Promise<void> {
      const { isEditMode, item } = payload;
      let name = item.name;

      const existingAnimals = this.animals.filter(
        (animal) =>
          animal.name.match(new RegExp(`^${name}(_copy)*$`, "i")) ||
          animal.name === name
      );

      const existingAnimalCount = existingAnimals.length;

      if (existingAnimalCount) {
        const copySuffix = "_copy".repeat(
          Number(
            `${isEditMode ? existingAnimalCount - 1 : existingAnimalCount}`
          )
        );
        name = `${name}${copySuffix}`;
      }

      // @TODO - figure out a way to do that in Vuetify
      if (name.length > 20) {
        name = `${name.slice(0, 20)}...`;
      }

      if (isEditMode) {
        const id = item._id || "";
        await this.UPDATE_ANIMAL(id, name, item.selected);
        return;
      }
      await this.CREATE_ANIMAL(name);
    },
  },
});

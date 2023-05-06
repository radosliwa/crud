import { defineStore } from "pinia";
import fetch from "@/utils/fetch";

interface Animal {
  _id?: string;
  name: string;
  selected?: boolean;
  createdAt?: Date;
}

interface AnimalsState {
  animals: Animal[];
  loading: boolean;
}

export const useAnimalsStore = defineStore("animals", {
  state: (): AnimalsState => ({
    animals: [],
    loading: false,
  }),
  getters: {
    isLoading(): boolean {
      return this.animals.length === 0 || this.loading;
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
          }, 300);
        }
      }
    },

    async CREATE_ANIMAL(name: string): Promise<void> {
      try {
        await fetch<Animal>("/animals", "POST", { name });
        await this.FETCH_ANIMALS(true);
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
        await this.FETCH_ANIMALS();
      } catch (error) {
        console.error("Error updating animal:", error);
      }
    },

    async DELETE_ANIMAL(id: string): Promise<void> {
      try {
        await fetch<Animal>(`/animals/${id}`, "DELETE");
        await this.FETCH_ANIMALS(true);
      } catch (error) {
        console.error("Error deleting animal:", error);
      }
    },
  },
});

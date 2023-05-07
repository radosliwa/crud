import { describe, it, vi, expect, MockedFunction } from "vitest";
import { useAnimalsStore } from "@/store/animals";
import fetch from "@/utils/fetch";
import { Pinia, createPinia, setActivePinia } from "pinia";

vi.mock("@/utils/fetch", () => ({
  default: vi.fn(),
}));

describe("useAnimalsStore state and getters", () => {
  let pinia: Pinia | null | undefined;
  let store: ReturnType<typeof useAnimalsStore>;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    store = useAnimalsStore(pinia);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("isLoading should react properly to loading flag and animals array content", () => {
    store.loading = true;
    expect(store.isLoading).toBe(true);
    store.loading = false;
    expect(store.isLoading).toBe(false);
  });

  it("getAnimals should return the animals array from the state", () => {
    const animals = [
      { _id: "1", name: "Dog", selected: false },
      { _id: "2", name: "Cat", selected: false },
    ];
    store.animals = animals;

    expect(store.getAnimals).toEqual(animals);
  });

  it("should call FETCH_ANIMALS after each CRUD operation", async () => {
    const fetchAnimalsSpy = vi.spyOn(store, "FETCH_ANIMALS");

    // CREATE
    (fetch as MockedFunction<typeof fetch>).mockResolvedValueOnce({});
    await store.CREATE_ANIMAL("123", "Dog");
    expect(fetchAnimalsSpy).toHaveBeenCalled();

    // UPDATE
    (fetch as MockedFunction<typeof fetch>).mockResolvedValueOnce({});
    await store.UPDATE_ANIMAL("123", "Dog", false);
    expect(fetchAnimalsSpy).toHaveBeenCalled();

    // DELETE
    (fetch as MockedFunction<typeof fetch>).mockResolvedValueOnce({});
    await store.DELETE_ANIMAL("123");
    expect(fetchAnimalsSpy).toHaveBeenCalled();
  });
});

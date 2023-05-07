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

export type { Animal, AnimalsState };

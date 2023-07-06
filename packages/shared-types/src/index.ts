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

interface Header {
  title: string;
  key: string;
  sortable?: boolean;
  align?: "start" | "end";
}

export type { Animal, AnimalsState, Header };

export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface APIResource {
  url: string;
}

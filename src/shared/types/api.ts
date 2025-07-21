export interface ApiResponse<T> {
  count: number;
  results: T[];
}

export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface APIResource {
  url: string;
}

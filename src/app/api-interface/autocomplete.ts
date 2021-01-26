export interface QueryParameter {
  /** The autocomplete search query. */
  query?: string;
  /** The autocomplete number of items returned */
  limit?: number;
}

/**
 * Each entry of an AutocompleteXxxArray looks like this.
 * To avoid writing long generics for that as well, we just manually define
 * the interface here.
 */
export interface Entry {
  id: number;
  /** Name of the category found by an auto-complete search. */
  name: string;
}

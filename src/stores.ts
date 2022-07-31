import { writable } from "svelte/store";

export const tokenUrl = writable(localStorage.tokenUrl || "");
tokenUrl.subscribe((value) => (localStorage.tokenUrl = value));

export const subtitleList = writable(
  localStorage.subtitleList ? JSON.parse(localStorage.subtitleList) : []
);
subtitleList.subscribe(
  (value) => (localStorage.subtitleList = JSON.stringify(value))
);

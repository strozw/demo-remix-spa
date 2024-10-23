import type { AppType } from "@demo-remix-spa/notes-api";
import { throwIfHttpError } from "fetch-extras";
import { hc } from "hono/client";

console.log(import.meta.env.VITE_NOTES_API_URL);

export const buildClient = (...args: Parameters<typeof hc>) =>
  hc<AppType>(...args);

export const notesApiClient = buildClient(import.meta.env.VITE_NOTES_API_URL, {
  fetch: async (...params: Parameters<typeof fetch>) =>
    await throwIfHttpError(fetch(...params)),
});

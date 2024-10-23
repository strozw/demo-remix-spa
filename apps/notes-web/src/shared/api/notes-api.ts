import type { AppType } from "@demo-remix-spa/notes-api";
import { throwIfHttpError } from "fetch-extras";
import { hc } from "hono/client";

const client = hc<AppType>("http://localhost:3000");

export type Client = typeof client;

export const buildClient = (...args: Parameters<typeof hc>): Client =>
  hc<AppType>(...args);

export const notesApiClient = buildClient("http://localhost:3000", {
  fetch: async (...params: Parameters<typeof fetch>) =>
    await throwIfHttpError(fetch(...params)),
});

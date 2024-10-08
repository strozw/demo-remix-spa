import type { AppType } from "@demo-remix-spa/notes-api";
import { hc } from "hono/client";

const client = hc<AppType>("");

export type Client = typeof client;

export const buildClient = (...args: Parameters<typeof hc>): Client =>
  hc<AppType>(...args);

export const notesApiClient = buildClient("http://localhost:4000");


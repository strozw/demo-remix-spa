import { buildClient } from "@demo-remix-spa/notes-api-client";

export const notesApiClient = buildClient("http://localhost:4000");

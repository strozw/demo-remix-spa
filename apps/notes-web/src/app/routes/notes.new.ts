import { redirect } from "@remix-run/react";
import { $path } from "remix-routes";
import { notesApiClient } from "src/shared/api/notes-api";
import { defineClientAction } from "src/shared/lib/remix";

export const clientAction = defineClientAction(async () => {
  const res = await notesApiClient.notes.$post({ json: {} });

  const data = await res.json();

  return redirect($path("/notes/:noteId", { noteId: data.id }));
});

export type NotesClientAction = typeof clientAction;

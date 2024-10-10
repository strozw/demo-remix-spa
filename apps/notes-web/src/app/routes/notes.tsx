import { redirect } from "@remix-run/react";
import { $path } from "remix-routes";
import { notesApiClient } from "src/shared/api/notes-api";

export const clientAction = async () => {
  console.log("notes");

  await notesApiClient.notes.$post({ json: {} });

  return redirect($path("/notes/:noteId", { noteId: 1 }));
};

export type NotesClientAction = typeof clientAction;

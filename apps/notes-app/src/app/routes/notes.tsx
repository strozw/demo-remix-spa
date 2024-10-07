import { redirect } from "@remix-run/react";
import { $path } from "remix-routes";
import { notesApiClient } from "src/lib/notes-api";
import { defineUseAction } from "src/lib/utils/remix";

export const clientAction = async () => {
  console.log("notes");

  // await notesApiClient.notes.$post({ json: { } })

  return redirect($path("/notes/:noteId", { noteId: 1 }));
};

export const useNotesAction = defineUseAction<typeof clientAction>(
  $path("/notes")
);

import { redirect } from "@remix-run/react";
import { $params, $path } from "remix-routes";
import { notesApiClient } from "src/shared/api/notes-api";
import { defineClientAction } from "src/shared/lib/remix";

export const clientAction = defineClientAction(async ({ params }) => {
  const { noteId } = $params("/notes/:noteId/destroy", params);

  const retrieveRes = await notesApiClient.notes[":id"].$get({
    param: { id: noteId },
  });

  const note = await retrieveRes.json();

  if ("error" in note) {
    throw new Error(`Note with ID ${noteId} could not be found`);
  }

  await notesApiClient.notes[":id"].$delete({
    param: { id: noteId },
  });

  return redirect(
    note.folderId
      ? $path("/folders/:folderId/notes", {
          folderId: note.folderId,
        })
      : $path("/folders/:folderId/notes", {
          folderId: "uncategorized",
        })
  );
});

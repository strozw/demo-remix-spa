import { $params } from "remix-routes";
import { notesApiClient } from "src/shared/api/notes-api";
import { defineClientAction } from "src/shared/lib/remix";

export const clientAction = defineClientAction(async ({ params }) => {
  const { folderId } = $params("/folders/:folderId", params);

  const res = await notesApiClient.folders[":id"].$delete({
    param: { id: folderId },
  });

  return await res.json();
});

export type FolderDetailClientAction = typeof clientAction;

import type { ClientActionFunctionArgs } from "@remix-run/react";
import { notesApiClient } from "src/shared/api/notes-api";
// import { defineClientLoader } from "src/shared/lib/remix";

// export const clientLoader = defineClientLoader(async () => {
//   const res = await notesApiClient.folders.$get();

//   const folders = await res.json();

//   return { folders };
// });

// export type FoldersClientLoader = typeof clientLoader;

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const data = await request.formData();

  const res = await notesApiClient.folders.$post({
    json: {
      name: String(data.get("name") ?? "none"),
    },
  });

  return await res.json();
};

export type FoldersClientAction = typeof clientAction;

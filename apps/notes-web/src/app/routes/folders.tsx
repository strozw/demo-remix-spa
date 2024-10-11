import type { ClientActionFunctionArgs } from "@remix-run/react";
import { notesApiClient } from "src/shared/api/notes-api";

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const data = await request.formData();

  switch (request.method.toLowerCase()) {
    case "post": {
      const res = await notesApiClient.folders.$post({
        json: {
          name: String(data.get("name") ?? "none"),
        },
      });

      return await res.json();
    }
  }
};

export type FoldersClientAction = typeof clientAction;

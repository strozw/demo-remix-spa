import { Title } from "@demo-remix-spa/ui";
import type { MetaFunction } from "@remix-run/node";
import { Await, useLoaderData, useRouteError } from "@remix-run/react";
import { $params } from "remix-routes";
import { NotesTable } from "src/features/notes-table";
import { notesApiClient } from "src/shared/api/notes-api";
import { defineClientLoader } from "src/shared/lib/remix";

export const clientLoader = defineClientLoader(({ params }) => {
  const { folderId } = $params("/folders/:folderId/notes", params);

  const isUncategorized = folderId === "uncategorized";

  return {
    folder: isUncategorized
      ? null
      : notesApiClient.folders[":id"]
          .$get({
            param: {
              id: folderId,
            },
          })
          .then((res) => res.json()),
    notes: notesApiClient.notes
      .$get({
        query: {
          folderId,
        },
      })
      .then((res) => res.json()),
  };
});

export const meta: MetaFunction = () => {
  return [{ title: "Demo Remix SPA | Uncategorized Notes" }];
};

export default function FolderNotesPage() {
  const data = useLoaderData<typeof clientLoader>();

  return (
    <div className="font-sans p-4">
      <Title order={2}>
        <Await resolve={data?.folder}>
          {(folder) => <>{folder?.name || "Uncategorized"} Notes</>}
        </Await>
      </Title>

      <Await resolve={data.notes}>
        {(notes) => (
          <NotesTable
            data={notes.map((note) => ({
              ...note,
              createdAt: String(new Date(note.createdAt)),
            }))}
          />
        )}
      </Await>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  const isErrorInstance = error instanceof Error;

  return (
    <div className="font-sans p-4">
      <Title order={2}>Error</Title>
      <p>{isErrorInstance ? error.message : ""}</p>

      <pre>{JSON.stringify(error)}</pre>
    </div>
  );
}

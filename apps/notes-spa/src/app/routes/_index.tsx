import { Title } from "@demo-remix-spa/ui";
import type { MetaFunction } from "@remix-run/node";
import { Await, defer, useLoaderData } from "@remix-run/react";
import { NotesTable } from "src/features/notes-table";
import { notesApiClient } from "src/shared/api/notes-api";
import { defineClientLoader } from "src/shared/lib/remix";

export const clientLoader = defineClientLoader(() => {
  return defer({
    notes: notesApiClient.notes
      .$get({
        query: {},
      })
      .then((res) => res.json()),
  });
});

export const meta: MetaFunction = () => {
  return [
    { title: "Demo Remix SPA" },
    { name: "description", content: "Welcome to Demo Remix (SPA Mode)!" },
  ];
};

export default function Index() {
  const data = useLoaderData<typeof clientLoader>();

  return (
    <div className="font-sans p-4">
      <Title order={2}>All Notes</Title>

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

import {
  Button,
  Group,
  NativeSelect,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@demo-remix-spa/ui";
import { IconNotes, IconRecycle, IconTrash } from "@demo-remix-spa/ui/icons";
import {
  Await,
  redirect,
  useFetcher,
  useLoaderData,
  useParams,
} from "@remix-run/react";
import { useCallback, useRef } from "react";
import { $params, $path } from "remix-routes";
import { notesApiClient } from "src/shared/api/notes-api";
import { defineClientAction, defineClientLoader } from "src/shared/lib/remix";
import { useRootLoaderData } from "src/shared/model/remix";

export const clientLoader = defineClientLoader(async ({ params }) => {
  const { noteId } = $params("/notes/:noteId", params);

  const res = await notesApiClient.notes[":id"].$get({
    param: { id: noteId },
  });

  return await res.json();
});

type NotesDetailClientLoader = typeof clientLoader;

export const clientAction = defineClientAction(async ({ request, params }) => {
  const { noteId } = $params("/notes/:noteId", params);

  const updates = Object.fromEntries(await request.formData());

  switch (request.method.toLowerCase()) {
    case "put": {
      const res = await notesApiClient.notes[":id"].$put({
        param: { id: noteId },
        json: {
          title: String(updates.title) ?? "",
          folderId: String(updates.folderId) ?? "",
          content: String(updates.content) ?? "",
        },
      });

      return await res.json();
    }

    case "delete": {
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
          : $path("/folders/uncategorized/notes")
      );
    }
  }
});

export default function NotesDetailPage() {
  const params = useParams();

  const { noteId } = $params("/notes/:noteId", params);

  const rootData = useRootLoaderData();

  const fetcher = useFetcher();

  const notesDetailData = useLoaderData<NotesDetailClientLoader>();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleEditorChange = useCallback((value: string) => {
    if (textareaRef.current) {
      textareaRef.current.value = value;
    }
  }, []);

  if ("error" in notesDetailData) {
    throw new Error(notesDetailData.error);
  }

  return (
    <Stack gap={"sm"}>
      <Title order={2} size="h5">
        <Group gap="xs">
          <IconNotes />
          <Text fw="inherit">#{noteId}</Text>
        </Group>
      </Title>

      <fetcher.Form method="put">
        <Stack gap="sm">
          <TextInput
            autoFocus={true}
            label="Title"
            name="title"
            defaultValue={notesDetailData.title}
          />

          <Await resolve={rootData?.folders}>
            {(folders) => (
              <NativeSelect
                label="Folder"
                name="folderId"
                defaultValue={notesDetailData.folderId ?? ""}
                data={[
                  { value: "", label: "Uncategorzied" },
                  ...(folders ?? []).map((folder) => ({
                    label: folder.name,
                    value: folder.id,
                  })),
                ]}
              />
            )}
          </Await>

          <Textarea
            label="Content"
            name="content"
            defaultValue={notesDetailData.content}
            content={notesDetailData.content}
            styles={{
              input: {
                minHeight: "200px",
              },
            }}
          />

          <Button type="submit">
            <Group gap="sm">
              <IconRecycle />
              <span> Save</span>
            </Group>
          </Button>
        </Stack>
      </fetcher.Form>

      <fetcher.Form method="delete">
        <Stack>
          <Button type="submit" color="red">
            <Group gap="sm">
              <IconTrash />
              <span>Delete</span>
            </Group>
          </Button>
        </Stack>
      </fetcher.Form>
    </Stack>
  );
}

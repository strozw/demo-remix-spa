import {
  Button,
  Editor,
  Group,
  Input,
  NativeSelect,
  Stack,
  Text,
  TextInput,
  Title,
  VisuallyHidden,
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
      await notesApiClient.notes[":id"].$delete({
        param: { id: noteId },
      });

      return redirect($path("/notes/:noteId", { noteId }));
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

          <Input.Wrapper>
            <Input.Label>Content</Input.Label>
            <Editor
              onChange={handleEditorChange}
              content={notesDetailData.content}
            />
          </Input.Wrapper>

          <VisuallyHidden>
            <textarea ref={textareaRef} name="content" />
          </VisuallyHidden>

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

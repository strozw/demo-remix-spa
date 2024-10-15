import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
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
  Form,
  json,
  useActionData,
  useFetcher,
  useLoaderData,
  useParams,
} from "@remix-run/react";
import { $params, $path } from "remix-routes";
import { NoteDeleteButton } from "src/features/note-delete-button";
import { notesApiClient } from "src/shared/api/notes-api";
import { defineClientAction, defineClientLoader } from "src/shared/lib/remix";
import { useRootLoaderData } from "src/shared/model/remix";
import { z } from "zod";

const updateSchema = z.object({
  title: z.string(),
  folderId: z
    .string()
    .nullable()
    .optional()
    .transform((value) => String(value || "")),
  content: z
    .string()
    .optional()
    .transform((value) => String(value || "")),
});

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

  const formData = await request.formData();

  const submission = parseWithZod(formData, { schema: updateSchema });

  if (submission.status !== "success") {
    return json(submission.reply());
  }

  try {
    await notesApiClient.notes[":id"].$put({
      param: { id: noteId },
      json: submission.value,
    });
  } catch (error) {
    return submission.reply({
      formErrors: ["updated failed"],
    });
  }

  return json(submission.reply());
});

type NotesDetailClientAction = typeof clientAction;

export default function NotesDetailPage() {
  const params = useParams();

  const { noteId } = $params("/notes/:noteId", params);

  const rootData = useRootLoaderData();

  const notesDetailData = useLoaderData<NotesDetailClientLoader>();

  const updateLastResult = useActionData<NotesDetailClientAction>();

  if ("error" in notesDetailData) {
    throw new Error(notesDetailData.error);
  }

  const [form, fields] = useForm({
    // Sync the result of last submission
    lastResult: updateLastResult,

    defaultValue: {
      title: notesDetailData.title,
      folderId: notesDetailData.folderId,
      content: notesDetailData.content,
    },

    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: updateSchema });
    },

    // Validate the form on blur event triggered
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <Stack gap={"sm"}>
      <Title order={2} size="h5">
        <Group gap="xs">
          <IconNotes />
          <Text fw="inherit">#{noteId}</Text>
        </Group>
      </Title>

      <Form method="put" id={form.id} onSubmit={form.onSubmit} noValidate>
        <Stack gap="sm">
          <TextInput
            autoFocus={true}
            label="Title"
            key={fields.title.key}
            name={fields.title.name}
            defaultValue={fields.title.initialValue}
            error={fields.title.errors}
          />

          <Await resolve={rootData?.folders}>
            {(folders) => (
              <NativeSelect
                label="Folder"
                key={fields.folderId.key}
                name={fields.folderId.name}
                defaultValue={fields.folderId.initialValue}
                error={fields.folderId.errors}
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
            key={fields.content.key}
            name={fields.content.name}
            defaultValue={fields.content.initialValue}
            error={fields.content.errors}
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
      </Form>

      <NoteDeleteButton noteId={noteId} />
    </Stack>
  );
}

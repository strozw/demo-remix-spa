import { getInputProps, getTextareaProps, useForm } from "@conform-to/react";
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
import { IconNotes, IconRecycle } from "@demo-remix-spa/ui/icons";
import {
  Await,
  json,
  useFetcher,
  useLoaderData,
  useParams,
} from "@remix-run/react";
import { useEffect } from "react";
import { $params, $path } from "remix-routes";
import { NoteDeleteButton } from "src/features/note-delete-button";
import { notesApiClient } from "src/shared/api/notes-api";
import usePrevious from "src/shared/lib/react";
import { defineClientAction, defineClientLoader } from "src/shared/lib/remix";
import { useRootLoaderData } from "src/shared/model/remix";
import { z } from "zod";

const updateSchema = z.object({
  title: z
    .string()
    .optional()
    .transform((value) => String(value || "")),
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

  const prevNoteId = usePrevious(noteId);

  const rootData = useRootLoaderData();

  const notesDetailData = useLoaderData<NotesDetailClientLoader>();

  const fetcher = useFetcher<NotesDetailClientAction>();

  if ("error" in notesDetailData) {
    throw new Error(notesDetailData.error);
  }

  const [form, fields] = useForm({
    // Sync the result of last submission
    lastResult: fetcher.data,

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

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    // NOTE: When creating a note in this view, this component will not be remounted. Therefore, if prevNoteId is not equal to noteId, reset the form.
    if (prevNoteId && prevNoteId !== noteId) {
      form.reset();
    }
  }, [prevNoteId, noteId]);

  return (
    <Stack gap={"sm"}>
      <Group gap="xs">
        <Title order={2} size="h5">
          <Group gap="xs">
            <IconNotes />
            <Text fw="inherit">#{noteId}</Text>
          </Group>
        </Title>
      </Group>

      <Stack gap="xl">
        <fetcher.Form
          method="put"
          action={$path("/notes/:noteId", { noteId })}
          onSubmit={form.onSubmit}
          id={form.id}
          noValidate
        >
          <Stack gap="sm">
            <TextInput
              autoFocus={true}
              label="Title"
              {...getInputProps(fields.title, { type: "text" })}
              error={fields.title.errors}
            />

            <Await resolve={rootData?.folders}>
              {(folders) => (
                <NativeSelect
                  label="Folder"
                  key={fields.folderId.key}
                  name={fields.folderId.name}
                  // defaultValue={notesDetailData.folderId ?? ""}
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
              {...getTextareaProps(fields.content)}
              // defaultValue={notesDetailData.content}
              error={fields.content.errors}
              styles={{
                input: {
                  minHeight: "200px",
                },
              }}
            />

            <Button
              type="submit"
              disabled={!form.valid || !form.dirty || form.status === "success"}
              loading={fetcher.state === "submitting"}
            >
              <Group gap="sm">
                <IconRecycle />
                <span> Save</span>
              </Group>
            </Button>
          </Stack>
        </fetcher.Form>

        <NoteDeleteButton noteId={noteId} />
      </Stack>
    </Stack>
  );
}

import { Button, Group, Stack } from "@demo-remix-spa/ui";
import { IconTrash } from "@demo-remix-spa/ui/icons";
import { useFetcher } from "@remix-run/react";
import { $path } from "remix-routes";

export const NoteDeleteButton = ({ noteId }: { noteId: string }) => {
  const fetcher = useFetcher();

  return (
    <fetcher.Form
      method="delete"
      action={$path("/notes/:noteId/destroy", { noteId })}
    >
      <Stack>
        <Button
          type="submit"
          color="red"
          loading={fetcher.state === "submitting"}
        >
          <Group gap="sm">
            <IconTrash />
            <span>Delete</span>
          </Group>
        </Button>
      </Stack>
    </fetcher.Form>
  );
};

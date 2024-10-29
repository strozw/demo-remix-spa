import { Button, Group } from "@demo-remix-spa/ui";
import { IconTextPlus } from "@demo-remix-spa/ui/icons";
import { useFetcher } from "@remix-run/react";
import { $path } from "remix-routes";

export const NoteCreationButton = () => {
  const fetcher = useFetcher();

  const isSubmitting = fetcher.state === "submitting";

  return (
    <fetcher.Form method="post" action={$path("/notes/new")}>
      <Button
        type="submit"
        color="blue"
        disabled={isSubmitting}
        loading={isSubmitting}
        size="xs"
      >
        <Group gap="0">
          <IconTextPlus />
          <span>New Note</span>
        </Group>
      </Button>
    </fetcher.Form>
  );
};

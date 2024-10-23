import { Button, Group } from "@demo-remix-spa/ui";
import { IconTextPlus } from "@demo-remix-spa/ui/icons";
import { useFetcher } from "@remix-run/react";
import { $path } from "remix-routes";

export const NoteCreationButton = () => {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="post" action={$path("/notes/new")}>
      <Button
        type="submit"
        color="blue"
        loading={fetcher.state === "submitting"}
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

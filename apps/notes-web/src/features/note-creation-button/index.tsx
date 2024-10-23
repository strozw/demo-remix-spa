import { ActionIcon, Tooltip } from "@demo-remix-spa/ui";
import { IconPlus } from "@demo-remix-spa/ui/icons";
import { useFetcher } from "@remix-run/react";
import { $path } from "remix-routes";

export const NoteCreationButton = () => {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="post" action={$path("/notes/new")}>
      <Tooltip label="Create Note" withArrow position="right">
        <ActionIcon type="submit" aria-label="Create Note">
          <IconPlus />
        </ActionIcon>
      </Tooltip>
    </fetcher.Form>
  );
};

import { ActionIcon, Tooltip } from "@demo-remix-spa/ui";
import { IconTrash } from "@demo-remix-spa/ui/icons";
import { useFetcher } from "@remix-run/react";
import { $path } from "remix-routes";

export const FolderDeleteButton = ({ folderId }: { folderId: string }) => {
  const fetcher = useFetcher();

  return (
    <fetcher.Form
      method="delete"
      action={$path("/folders/:folderId", { folderId })}
    >
      <Tooltip label="Delete Folder" withArrow position="right">
        <ActionIcon type="submit" color="red" size="xs">
          <IconTrash />
        </ActionIcon>
      </Tooltip>
    </fetcher.Form>
  );
};

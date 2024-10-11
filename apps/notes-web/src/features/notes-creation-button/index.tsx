import { ActionIcon, Tooltip } from "@demo-remix-spa/ui";
import { IconPlus } from "@demo-remix-spa/ui/icons";
import { Form } from "@remix-run/react";
import { $path } from "remix-routes";

export const NotesCreationButton = () => {
  return (
    <Form
      method="post"
      action={$path("/notes")}
    >
      <Tooltip label="Create Note" withArrow position="right">
        <ActionIcon type="submit">
          <IconPlus />
        </ActionIcon>
      </Tooltip>
    </Form>
  );
};

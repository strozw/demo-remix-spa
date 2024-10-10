import { ActionIcon, Tooltip } from "@demo-remix-spa/ui";
import { IconPlus } from "@demo-remix-spa/ui/icons";
import { Form } from "@remix-run/react";
import { useNotesActionFetcher } from "src/shared/model/remix";

export const NotesCreationButton = () => {
  const { submit } = useNotesActionFetcher();

  return (
    <Form
      method="post"
      onSubmit={(event) => {
        event.preventDefault();

        submit(event.currentTarget);
      }}
    >
      <Tooltip label="Create Note" withArrow position="right">
        <ActionIcon type="submit">
          <IconPlus />
        </ActionIcon>
      </Tooltip>
    </Form>
  );
};

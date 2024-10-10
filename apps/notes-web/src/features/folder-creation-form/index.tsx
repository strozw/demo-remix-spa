import { Button, Stack, TextInput } from "@demo-remix-spa/ui";
import { Form } from "@remix-run/react";
import { useFoldersActionFetcher } from "src/shared/model/remix";

export const FolderCreationForm = ({ onSubmit }: { onSubmit?: () => void }) => {
  const { submit } = useFoldersActionFetcher();

  return (
    <Form
      method="post"
      onSubmit={(event) => {
        event.preventDefault();

        submit(event.currentTarget);

        onSubmit?.();
      }}
    >
      <Stack gap="xs">
        <TextInput
          label="Folder Name"
          placeholder="Folder Name"
          size="xs"
          name="name"
        />

        <Button type="submit">Create Folder</Button>
      </Stack>
    </Form>
  );
};

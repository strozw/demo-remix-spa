import type { FoldersClientAction } from "@/app/routes/folders_.new";
import { Button, Stack, TextInput } from "@demo-remix-spa/ui";
import { useFetcher } from "@remix-run/react";
import { $path } from "remix-routes";

export const FolderCreationForm = ({ onSubmit }: { onSubmit?: () => void }) => {
  const fetcher = useFetcher<FoldersClientAction>();

  return (
    <fetcher.Form
      method="post"
      action={$path("/folders/new")}
      onSubmit={(event) => {
        event.preventDefault();

        fetcher.submit(event.currentTarget);

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

        <Button type="submit" loading={fetcher.state === "submitting"}>
          Create Folder
        </Button>
      </Stack>
    </fetcher.Form>
  );
};

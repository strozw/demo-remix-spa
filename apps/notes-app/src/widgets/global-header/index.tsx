import { Group, Text, Title } from "@demo-remix-spa/ui";
import { IconNotes } from "@demo-remix-spa/ui/icons";
import { Link } from "@remix-run/react";
import { NotesCreationButton } from "../../features/notes-creation-button";

export function GlobalHeader() {
  return (
    <>
      <Title order={1} size="h5">
        <Link to="/" style={{ color: "inherit" }}>
          <Group gap="xs">
            <IconNotes />
            <Text fw="inherit">Demo Notes App</Text>
          </Group>
        </Link>
      </Title>

      <Group align="flex-end" style={{ marginLeft: "auto" }}>
        <NotesCreationButton />
      </Group>
    </>
  );
}

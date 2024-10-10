import {
  ActionIcon,
  Group,
  NavLink,
  Popover,
  Stack,
  Text,
  Title,
  Tooltip,
  useDisclosure,
} from "@demo-remix-spa/ui";
import { IconFolder, IconPlus } from "@demo-remix-spa/ui/icons";
import { Await, Link } from "@remix-run/react";
import { $path } from "remix-routes";
import { useRootLoaderData } from "src/shared/model/remix";
import { FolderCreationForm } from "../folder-creation-form";

export const FolderList = () => {
  const rootData = useRootLoaderData();

  const [opened, { close, open }] = useDisclosure(false);

  return (
    <div>
      <Stack gap="xs">
        <Title size="h6">
          <Group className={""} justify="space-between">
            <span>Folders</span>

            <Popover
              width={300}
              trapFocus
              position="bottom"
              withArrow
              shadow="md"
              closeOnEscape={true}
              opened={opened}
            >
              <Popover.Target>
                <Tooltip label="Create Folder" withArrow position="right">
                  <ActionIcon
                    type="submit"
                    variant="outline"
                    size="xs"
                    color="blue"
                    onClick={() => {
                      if (opened) {
                        close();
                      } else {
                        open();
                      }
                    }}
                  >
                    <IconPlus />
                  </ActionIcon>
                </Tooltip>
              </Popover.Target>

              <Popover.Dropdown>
                <FolderCreationForm onSubmit={close} />
              </Popover.Dropdown>
            </Popover>
          </Group>
        </Title>

        <Stack gap="xs">
          <NavLink
            component={Link}
            to={$path("/folders/uncategorized/notes")}
            label={
              <Group>
                <IconFolder /><Text>Uncategorized</Text>
              </Group>
            }
          />

          <Await resolve={rootData?.folders}>
            {(folders) =>
              folders?.map?.((folder) => (
                <NavLink
                  key={folder.id}
                  component={Link}
                  to={$path("/folders/:folderId/notes", {
                    folderId: folder.id,
                  })}
                  label={
                    <Group>
                      <IconFolder /><Text>{folder.name}</Text>
                    </Group>
                  }
                />
              ))
            }
          </Await>
        </Stack>
      </Stack>
    </div>
  );
};

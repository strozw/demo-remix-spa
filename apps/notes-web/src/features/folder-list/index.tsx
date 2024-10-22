import type { RootClientLoader } from "@/app/root";
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
import { Await, Link, useRouteLoaderData } from "@remix-run/react";
import { $path, $routeId } from "remix-routes";
import { FolderCreationForm } from "../folder-creation-form";
import { FolderDeleteButton } from "../folder-delete-button";

export const FolderList = () => {
  const rootData = useRouteLoaderData<RootClientLoader>($routeId("root"));

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
          <Group>
            <NavLink
              w={"calc(100% - 3em)"}
              component={Link}
              to={$path("/folders/uncategorized/notes")}
              label={
                <Group>
                  <IconFolder />
                  <Text>Uncategorized</Text>
                </Group>
              }
            />
          </Group>

          <Await resolve={rootData?.folders}>
            {(folders) =>
              folders?.map?.((folder) => (
                <Group justify="center" key={folder.id}>
                  <NavLink
                    w={"calc(100% - 3em)"}
                    component={Link}
                    to={$path("/folders/:folderId/notes", {
                      folderId: folder.id,
                    })}
                    label={
                      <Group w="auto">
                        <IconFolder />
                        <Text>{folder.name}</Text>
                      </Group>
                    }
                  />
                  <Group
                    w="auto"
                    align="flex-end"
                    style={{ marginLeft: "auto" }}
                  >
                    <FolderDeleteButton folderId={folder.id} />
                  </Group>
                </Group>
              ))
            }
          </Await>
        </Stack>
      </Stack>
    </div>
  );
};

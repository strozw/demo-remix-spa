import {
  type ClientLoaderFunction,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { createHead } from "remix-island";

import "./global.css";

import {
  AppSidebarLayout,
  Group,
  Navbar,
  Text,
  Title,
  UiProvider,
} from "@demo-remix-spa/ui";
import { IconNotes } from "@demo-remix-spa/ui/icons";
import { FolderList } from "src/features/folder-list";
import { NotesCreationButton } from "src/features/notes-creation-button";

export const clientLoader: ClientLoaderFunction = () => {
  return { message: "root" };
};

export const Head = createHead(() => (
  <>
    <Meta />
    <Links />
  </>
));

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head />
      <UiProvider>
        {children}
        <ScrollRestoration />
      </UiProvider>
      <Scripts />
    </>
  );
}

export default function App() {
  return (
    <AppSidebarLayout
      header={
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
      }
      sidebar={
        <Navbar>
          <FolderList />
        </Navbar>
      }
    >
      <Outlet />
    </AppSidebarLayout>
  );
}

export function HydrateFallback() {
  return <p>Loading...</p>;
}

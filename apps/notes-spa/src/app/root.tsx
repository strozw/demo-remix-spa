import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  defer,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import { createHead } from "remix-island";
import { GlobalHeader } from "../widgets/global-header";
import { Sidebar } from "../widgets/sidebar";

import "./global.css";
import { Button, Container, Group, Title } from "@demo-remix-spa/ui";
import { useMemo } from "react";
import { notesApiClient } from "src/shared/api/notes-api";
import { defineClientLoader } from "src/shared/lib/remix";
import { AppSidebarLayout } from "src/shared/ui/app-sidebar-layout";
import { AppShell } from "./app-shell";
import errorStyle from "./error.module.css";

export const clientLoader = defineClientLoader(async ({ request }) => {
  return defer({
    folders: notesApiClient.folders.$get().then((res) => res.json()),
  });
});

export type RootClientLoader = typeof clientLoader;

/**
 * 開発時に、script や style を挿入するブラウザ拡張機能を利用している環境で hydration についての waning がでるため、
 * その回避策として、`remix-island` を利用している。
 *
 * @see {@url https://remix.run/docs/en/main/guides/gotchas#browser-extensions-injecting-code}
 * @see {@url https://github.com/Xiphe/remix-island}
 */
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
      <AppShell>
        {children}
        <ScrollRestoration />
      </AppShell>
      <Scripts />
    </>
  );
}

export default function Root() {
  return (
    <AppSidebarLayout header={<GlobalHeader />} sidebar={<Sidebar />}>
      <Outlet />
    </AppSidebarLayout>
  );
}

export function HydrateFallback() {
  return <p>Loading...</p>;
}

export function ErrorBoundary() {
  const error = useRouteError();
  const isErrorInstance = error instanceof Error;

  const title = useMemo(
    () =>
      isRouteErrorResponse(error)
        ? `${error.status} ${error.statusText}`
        : isErrorInstance
          ? error.message
          : "Unknown Error",
    [isErrorInstance, error],
  );

  return (
    <Layout>
      <Container className={errorStyle.root} my="lg">
        <Title className={errorStyle.title}>{title}</Title>
        <Group justify="center">
          <Button variant="subtle" size="md" component={Link} to="/">
            Take me back to home page
          </Button>
        </Group>
      </Container>
    </Layout>
  );
}

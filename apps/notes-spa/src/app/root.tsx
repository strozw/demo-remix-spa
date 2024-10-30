import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  defer,
} from "@remix-run/react";
import { createHead } from "remix-island";
import { GlobalHeader } from "../widgets/global-header";
import { Sidebar } from "../widgets/sidebar";

import "./global.css";
import { notesApiClient } from "src/shared/api/notes-api";
import { defineClientLoader } from "src/shared/lib/remix";
import { AppSidebarLayout } from "src/shared/ui/app-sidebar-layout";
import { AppShell } from "./app-shell";

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

export default function App() {
  return (
    <AppSidebarLayout header={<GlobalHeader />} sidebar={<Sidebar />}>
      <Outlet />
    </AppSidebarLayout>
  );
}

export function HydrateFallback() {
  return <p>Loading...</p>;
}

import { AppSidebarLayout, UiProvider } from "@demo-remix-spa/ui";
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

export const clientLoader = defineClientLoader(async ({ request }) => {
  return defer({
    folders: notesApiClient.folders.$get().then((res) => res.json()),
  });
});

export type RootClientLoader = typeof clientLoader;

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
    <AppSidebarLayout header={<GlobalHeader />} sidebar={<Sidebar />}>
      <Outlet />
    </AppSidebarLayout>
  );
}

export function HydrateFallback() {
  return <p>Loading...</p>;
}

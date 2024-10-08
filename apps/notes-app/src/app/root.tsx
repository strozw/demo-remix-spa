import { AppSidebarLayout, UiProvider } from "@demo-remix-spa/ui";
import {
  type ClientLoaderFunction,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { createHead } from "remix-island";
import { GlobalHeader } from "../widgets/global-header";
import { Sidebar } from "../widgets/sidebar";

import "./global.css";

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
    <AppSidebarLayout header={<GlobalHeader />} sidebar={<Sidebar />}>
      <Outlet />
    </AppSidebarLayout>
  );
}

export function HydrateFallback() {
  return <p>Loading...</p>;
}

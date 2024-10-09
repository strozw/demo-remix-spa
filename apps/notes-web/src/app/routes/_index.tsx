import type { MetaFunction } from "@remix-run/node";
import { type ClientLoaderFunction, Link } from "@remix-run/react";
import { $path } from "remix-routes";
import { useTestLoaderData, useTestLoaderFetch } from "./test";
import { Title } from "@demo-remix-spa/ui";

export const clientLoader: ClientLoaderFunction = () => {
  return { message: "index" };
};

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix SPA" },
    { name: "description", content: "Welcome to Remix (SPA Mode)!" },
  ];
};

export default function Index() {
  const testData = useTestLoaderFetch();
  const testData2 = useTestLoaderData();

  return (
    <div className="font-sans p-4">
      <Title order={2}>Welcome to Remix (SPA Mode)</Title>

      <ul className="list-disc mt-4 pl-6 space-y-2">
        <li>
          <Link
            className="text-blue-700 underline visited:text-purple-900"
            to={$path("/about")}
          >
            About
          </Link>
        </li>
        <li>
          <a
            className="text-blue-700 underline visited:text-purple-900"
            target="_blank"
            href="https://remix.run/guides/spa-mode"
            rel="noreferrer"
          >
            SPA Mode Guide
          </a>
        </li>
        <li>
          <a
            className="text-blue-700 underline visited:text-purple-900"
            target="_blank"
            href="https://remix.run/docs"
            rel="noreferrer"
          >
            Remix Docs
          </a>
        </li>
      </ul>

      <div>{testData?.message}</div>

      <div>{testData2?.message}</div>
    </div>
  );
}

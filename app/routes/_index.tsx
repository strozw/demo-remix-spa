import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { $path } from "remix-routes";
import { useTestLoaderData, useTestLoaderFetch } from "./test";

export const clientLoader = () => {
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

  console.log({ testData });

  console.log({ testData2 });

  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">Welcome to Remix (SPA Mode)</h1>
      <div>{testData?.message}</div>
      <div>{testData2?.message}</div>
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
    </div>
  );
}

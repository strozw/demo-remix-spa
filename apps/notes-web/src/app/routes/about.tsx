import {
  type ClientLoaderFunction,
  Link,
  Outlet,
  useRouteLoaderData,
} from "@remix-run/react";
import { $path, $routeId } from "remix-routes";
import { useTestLoaderFetch } from "./test";

export const clientLoader: ClientLoaderFunction = async () => {
  return "";
};

export default function AboutPage() {
  const rootData = useRouteLoaderData("root");
  const data = useRouteLoaderData($routeId("routes/about.data"));

  const testData = useTestLoaderFetch();

  console.log({ rootData, data, testData });

  return (
    <div>
      <h1>About</h1>

      <div>{testData?.message}</div>

      <ul className="list-disc mt-4 pl-6 space-y-2">
        <li>
          <Link
            className="text-blue-700 underline visited:text-purple-900"
            to={$path("/about")}
          >
            about
          </Link>
        </li>
        <li>
          <Link
            className="text-blue-700 underline visited:text-purple-900"
            to={$path("/about/child")}
          >
            about/child
          </Link>
        </li>
      </ul>

      <div>
        <Outlet />
      </div>
    </div>
  );
}

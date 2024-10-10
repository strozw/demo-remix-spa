import { type ClientLoaderFunction, Link, Outlet } from "@remix-run/react";
import { $path } from "remix-routes";

export const clientLoader: ClientLoaderFunction = async () => {
  return "";
};

export default function AboutPage() {
  return (
    <div>
      <h1>About</h1>

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

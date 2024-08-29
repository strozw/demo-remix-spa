import { Outlet, useRouteLoaderData } from "@remix-run/react";
import { defineClientLoader } from "@remix-run/react/dist/single-fetch";
import { $routeId } from "remix-routes";

export const clientLoader = defineClientLoader(async () => {
  return "";
});

export default function AboutPage() {
  const rootData = useRouteLoaderData("root");
  const data = useRouteLoaderData($routeId("routes/about.data"));

  console.log({ rootData, data });

  return (
    <div>
      <h1>About</h1>

      <div>
        <Outlet />
      </div>
    </div>
  );
}

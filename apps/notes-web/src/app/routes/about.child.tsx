import { useRouteLoaderData } from "@remix-run/react";

export default function AboutPage() {
  const rootData = useRouteLoaderData("root");

  console.log({ rootData });

  return (
    <div>
      <h1>Child</h1>
    </div>
  );
}

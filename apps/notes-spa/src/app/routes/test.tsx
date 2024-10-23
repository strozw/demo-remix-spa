import { useRouteLoaderData } from "@remix-run/react";
import { $path, $routeId } from "remix-routes";
import { wait } from "remix-utils/timers";
import {
  defineClientLoader,
  defineUseLoaderFetcher,
} from "src/shared/lib/remix";

export const clientLoader = defineClientLoader(async () => {
  await wait(2000);

  console.log("aaaaaaaaaaaaaaaaaaaaaaa");

  return { message: "Test" };
});

export const useTestLoaderFetch = defineUseLoaderFetcher<typeof clientLoader>(
  $path("/test"),
);

export const useTestLoaderData = () => {
  return useRouteLoaderData<typeof clientLoader>($routeId("routes/test"));
};

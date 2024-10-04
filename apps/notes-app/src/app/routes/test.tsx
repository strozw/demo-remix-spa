import {
  type ClientLoaderFunction,
  useFetcher,
  useRouteLoaderData,
} from "@remix-run/react";
import { useEffect, useRef } from "react";
import { $path, $routeId } from "remix-routes";
import { wait } from "remix-utils/timers";

const defineClientLoader = <T extends ClientLoaderFunction>(loader: T) =>
  loader;

export const clientLoader = defineClientLoader(async () => {
  await wait(2000);

  return { message: "Test" };
});

export const useTestLoaderFetch = () => {
  const isFirstRef = useRef(true);

  const fetcher = useFetcher<typeof clientLoader>({ key: "test" });

  useEffect(() => {
    if (isFirstRef.current) {
      fetcher.load($path("/test"));

      isFirstRef.current = false;
    }
  }, [fetcher.load]);

  return fetcher.data;
};

export const useTestLoaderData = () => {
  return useRouteLoaderData<typeof clientLoader>($routeId("routes/test"));
};

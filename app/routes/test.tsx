import { useFetcher, useRouteLoaderData } from "@remix-run/react";
import {
  defineClientAction,
  defineClientLoader,
} from "@remix-run/react/dist/single-fetch";
import { useEffect, useRef } from "react";
import { $path, $routeId } from "remix-routes";
import { wait } from "remix-utils/timers";

export const clientLoader = defineClientLoader(async () => {
  await wait(2000);

  return { message: "hogeee" };
});

export const clientAction = defineClientAction(async () => {});

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

export default function () {
  return "test";
}

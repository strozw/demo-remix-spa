import { useRouteLoaderData } from "@remix-run/react";
import { $path, $routeId } from "remix-routes";
import type { RootClientLoader } from "src/app/root";
import type { FoldersClientAction } from "src/app/routes/folders";
import { defineUseActionFetcher } from "../lib/remix";

export const useRootLoaderData = () =>
  useRouteLoaderData<RootClientLoader>($routeId("root"));

export const useFoldersActionFetcher =
  defineUseActionFetcher<FoldersClientAction>($path("/folders"));

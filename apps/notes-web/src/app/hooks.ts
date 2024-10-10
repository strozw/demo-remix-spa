import { $path } from "remix-routes";
import { defineUseLoaderFetcher } from "src/shared/lib/remix";
import type { RootClientLoader } from "./root";

export const useRootLoader = defineUseLoaderFetcher<RootClientLoader>($path("/"));

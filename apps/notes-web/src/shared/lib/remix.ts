import {
  type ClientActionFunction,
  type ClientLoaderFunction,
  useFetcher,
} from "@remix-run/react";
import { useCallback, useEffect, useRef } from "react";

export const defineClientLoader = <T extends ClientLoaderFunction>(loader: T) =>
  loader;

export const defineClientAction = <T extends ClientActionFunction>(action: T) =>
  action;

export const defineUseLoaderFetcher =
  <T extends ClientLoaderFunction>(path: string) =>
  ({
    fetchOnMount,
    ...options
  }: { key?: string; fetchOnMount?: boolean } = {}) => {
    const isFirstRef = useRef(true);

    const { load, state, data } = useFetcher<T>(options);

    console.log({ state, data });

    const finalLoad = useCallback(() => load(path), [load, path]);

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
      // if (fetchOnMount && isFirstRef.current) {
      if (state === "idle" && data === undefined) {
        isFirstRef.current = false;

        finalLoad();
      }
    }, []);

    return { state, data, load: finalLoad };
  };

export const defineUseActionFetcher =
  <T extends ClientActionFunction>(path: string) =>
  (options: { key?: string } = {}) => {
    const { submit, ...rest } = useFetcher<T>(options);

    return {
      submit: useCallback(
        (...params: Parameters<typeof submit>) =>
          submit(params[0], {
            ...params[1],
            action: path,
          }),
        [submit, path],
      ),
      ...rest,
    };
  };

import {
	type ClientActionFunction,
	type ClientLoaderFunction,
	useFetcher,
} from "@remix-run/react";
import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

export const defineUseLoader =
	<T extends ClientLoaderFunction>(path: string) =>
	(options: { key?: string } = {}) => {
		const isFirstRef = useRef(true);

		const { load, state, data } = useFetcher<T>(options);

		const finalLoad = useCallback(() => load(path), [load, path]);

		// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
		useEffect(() => {
			console.log({ state, isFirstRef: isFirstRef.current });
			console.log("aaaaaaaaaaaaaaaaaaa");

			if (isFirstRef.current) {
				isFirstRef.current = false;

				finalLoad();
			}
		}, []);

		return { state, data };
	};

export const defineUseAction =
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

import type {
  ClientActionFunction,
  ClientLoaderFunction,
} from "@remix-run/react";

export const defineClientLoader = <T extends ClientLoaderFunction>(loader: T) =>
  loader;

export const defineClientAction = <T extends ClientActionFunction>(action: T) =>
  action;

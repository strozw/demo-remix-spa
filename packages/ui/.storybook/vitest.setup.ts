import { setProjectAnnotations } from "@storybook/react";
import { beforeAll } from "vitest";
import * as previewAnnotations from "./preview";

globalThis.__vitest_browser__ = false;

const annotations = setProjectAnnotations([previewAnnotations]);

// Run Storybook's beforeAll hook
beforeAll(annotations.beforeAll);

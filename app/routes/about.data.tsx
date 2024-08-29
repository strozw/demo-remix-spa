import { defineClientLoader } from "@remix-run/react/dist/single-fetch";

export const clientLoader = defineClientLoader(({ request }) => {
  return { message: "test" };
});

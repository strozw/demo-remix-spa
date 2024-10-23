import { RemixBrowser } from "@remix-run/react";
import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";

startTransition(() => {
  const rootDom = document.getElementById("root");

  if (!rootDom) {
    throw new Error("Container DOM is nothing");
  }

  hydrateRoot(
    rootDom,
    <StrictMode>
      <RemixBrowser />
    </StrictMode>,
  );
});

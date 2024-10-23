import { UiProvider } from "@demo-remix-spa/ui";
import type { PropsWithChildren } from "react";

export const AppShell = ({ children }: PropsWithChildren) => {
  return <UiProvider>{children}</UiProvider>;
};

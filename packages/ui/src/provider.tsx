import { MantineProvider } from "@mantine/core";
import type { PropsWithChildren } from "react";

import "./styles.css";

export const UiProvider = ({ children }: PropsWithChildren) => {
  return <MantineProvider>{children}</MantineProvider>;
};

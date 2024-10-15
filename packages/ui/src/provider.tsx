import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import type { PropsWithChildren } from "react";

import "./styles.css";

export const UiProvider = ({ children }: PropsWithChildren) => {
  return (
    <MantineProvider>
      <Notifications />

      {children}
    </MantineProvider>
  );
};

import { type PropsWithChildren, useMemo } from "react";

import { Stack } from "@mantine/core";
import styles from "./navbar.module.css";

export const Navbar = ({ children }: PropsWithChildren) => {
  const finalChildren = useMemo(() => {
    const finalChildren = Array.isArray(children) ? children : [children];

    return finalChildren.map((child, index) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
      <div key={`child${index}`} className={styles.section}>
        {child}
      </div>
    ));
  }, [children]);

  return (
    <Stack component="nav" gap="sm">
      {finalChildren}
    </Stack>
  );
};

import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { PropsWithChildren } from "react";

export const Shell = AppShell;

interface AppSidebarLayout
  extends PropsWithChildren<{
    header: React.ReactNode;
    sidebar: React.ReactNode;
  }> {}

export const AppSidebarLayout = ({
  children,
  header,
  sidebar,
}: AppSidebarLayout) => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();

  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger
            opened={mobileOpened}
            onClick={toggleMobile}
            hiddenFrom="sm"
            size="sm"
          />
          <Burger
            opened={desktopOpened}
            onClick={toggleDesktop}
            visibleFrom="sm"
            size="sm"
          />
          {header}
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">{sidebar}</AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

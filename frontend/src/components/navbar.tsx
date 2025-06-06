"use client";

import { Link, redirect, usePathname } from "@/src/i18n/routing";
import {
  ActionIcon,
  Burger,
  Button,
  Drawer,
  Grid,
  Group,
  Paper,
  Stack,
  Title,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { navData } from "../lib/data"; 
import { useDisclosure, useHeadroom } from "@mantine/hooks";
import { IconMoon } from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";

export default function Navbar() {
  const pinned = useHeadroom({ fixedAt: 120 });
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const session = useContext(AuthContext);
  const [opened, { close, toggle }] = useDisclosure(false);
  const t = useTranslations("navbar");

  return (
    <nav>
      <Paper
        withBorder
        radius="none"
        w="100%"
        style={{
          position: "fixed",
          padding: "var(--mantine-spacing-xs)",
          zIndex: 1000000,
          transform: `translate3d(0, ${pinned ? 0 : "-110px"}, 0)`,
          transition: "transform 400ms ease",
          backgroundColor: "var(--mantine-color-body)",
        }}
      >
        <Grid
          align="center"
          display={
            session
              ? { lg: "block", xs: "none", base: "none" }
              : { sm: "block", xs: "none", base: "none" }
          }
        >
          <Grid.Col span={{ lg: 2, sm: 3 }}>
            <Title order={2}>BlogSpring</Title>
          </Grid.Col>
          <Grid.Col span={{ lg: 6, sm: 6 }}>
            <Group justify="flex-start">
              {navData.map((e, i) => (
                <Button
                  variant="default"
                  component={Link}
                  href={e.link}
                  key={i}
                >
                  {t(e.name)}
                </Button>
              ))}
              {session && (
                <Button variant="default" component={Link} href="/profile">
                  {t("profile")}
                </Button>
              )}
            </Group>
          </Grid.Col>
          <Grid.Col span={{ lg: 4, sm: 3 }}>
            <Group justify="flex-end">
              <Button
                variant="default"
                onClick={() => {
                  router.push(`/${locale === "tr" ? "en" : "tr"}${pathname}`);
                }}
              >
                {locale.toLocaleUpperCase()}
              </Button>
              {session ? (
                <Button
                  variant="default"
                  onClick={() => {
                    localStorage.removeItem("userId");
                    location.reload();
                    return false;
                  }}
                >
                  {t("logout")}
                </Button>
              ) : (
                <Button variant="default" component={Link} href="/login">
                  {t("login")}
                </Button>
              )}
              <ActionIcon
                onClick={() =>
                  setColorScheme(
                    computedColorScheme === "light" ? "dark" : "light"
                  )
                }
                variant="default"
                size="input-sm"
              >
                <IconMoon stroke={1.5} />
              </ActionIcon>
            </Group>
          </Grid.Col>
        </Grid>
        <Grid
          align="center"
          display={
            session
              ? { lg: "none", xs: "block", base: "block" }
              : { sm: "none", xs: "block", base: "block" }
          }
        >
          <Grid.Col span={2}>
            <Burger
              opened={opened}
              onClick={toggle}
              aria-label="Toggle navigation"
            />
          </Grid.Col>
          <Grid.Col pl="xl" span={10}>
            <Title order={2}>BlogSpring</Title>
          </Grid.Col>
        </Grid>
        <Drawer
          opened={opened}
          onClose={close}
          size="xs"
          title={t("menu")}
          overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
          display={
            session
              ? { lg: "none", xs: "block", base: "block" }
              : { sm: "none", xs: "block", base: "block" }
          }
        >
          <Stack p="md" h="90vh" justify="space-between">
            <Stack>
              {navData.map((e, i) => (
                <Button
                  variant="default"
                  onClick={close}
                  component={Link}
                  href={e.link}
                  key={i}
                >
                  {t(e.name)}
                </Button>
              ))}
              {session && (
                <Button
                  variant="default"
                  onClick={close}
                  component={Link}
                  href="/profile"
                >
                  {t("profile")}
                </Button>
              )}
            </Stack>
            <Group justify="space-between">
              <ActionIcon
                onClick={() =>
                  setColorScheme(
                    computedColorScheme === "light" ? "dark" : "light"
                  )
                }
                variant="default"
                size="input-sm"
              >
                <IconMoon stroke={1.5} />
              </ActionIcon>
              {session ? (
                <Button
                  variant="default"
                  onClick={() => {
                    localStorage.removeItem("userId");
                    location.reload();
                    return false;
                  }}
                >
                  {t("logout")}
                </Button>
              ) : (
                <Button
                  variant="default"
                  onClick={close}
                  component={Link}
                  href="/login"
                >
                  {t("login")}
                </Button>
              )}
            </Group>
          </Stack>
        </Drawer>
      </Paper>
    </nav>
  );
}

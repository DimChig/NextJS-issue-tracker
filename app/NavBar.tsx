"use client";

import { Avatar, Box, Container, Flex, Text } from "@radix-ui/themes";
import classnames from "classnames";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DropdownMenu } from "radix-ui";
import { AiFillBug } from "react-icons/ai";

const NavBar = ({ session }: { session: Session | null }) => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus session={session} />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];
  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classnames({
              "nav-link": true,
              "!text-zinc-900": link.href == currentPath,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = ({ session }: { session: Session | null }) => {
  if (!session || !session.user) {
    return (
      <Link href={"/api/auth/signin"} className="nav-link">
        Sign In
      </Link>
    );
  }
  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Avatar
            src={session.user.image!}
            fallback={"?"}
            size="2"
            radius="full"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
            <DropdownMenu.Label className="text-center py-1">
              <Text size="3" className="text-zinc-600 text-sm">
                {session.user.email!}
              </Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item className="DropdownMenuItem" asChild>
              <Link href="/api/auth/signout">Log out</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;

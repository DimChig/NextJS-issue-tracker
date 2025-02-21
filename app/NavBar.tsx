"use client";

import { Box } from "@radix-ui/themes";
import classnames from "classnames";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

const NavBar = ({ session }: { session: Session | null }) => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className={classnames({
                "text-zinc-900": link.href == currentPath,
                "text-zinc-400": link.href != currentPath,
                "hover:text-zinc-800 transition-colors": true,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {session && <Link href={"/api/auth/signout"}>Sign Out</Link>}
        {!session && <Link href={"/api/auth/signin"}>Sign In</Link>}
      </Box>
    </nav>
  );
};

export default NavBar;

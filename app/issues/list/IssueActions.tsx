import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusFilter from "./IssueStatusFilter";
import { Status } from "@prisma/client";

const IssueActions = () => {
  return (
    <Flex mb="5" justify="between">
      <IssueStatusFilter />
      <Button asChild>
        <Link href="/issues/new">New issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;

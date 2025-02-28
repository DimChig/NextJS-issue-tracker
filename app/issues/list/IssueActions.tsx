import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "./IssueStatusFilter";

const IssueActions = () => {
  return (
    <Flex justify="between">
      <IssueStatusFilter />
      <Button asChild>
        <Link href="/issues/new">New issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;

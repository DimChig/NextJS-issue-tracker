import Pagination from "@/app/components/Pagination";
import prisma from "@/lib/prisma";
import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames, IssueQuerySearchParams } from "./IssueTable";
import { Metadata } from "next";

interface Props {
  searchParams: IssueQuerySearchParams;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const searchParamsObject = await searchParams;

  const statues = Object.values(Status);
  const status = statues.includes(searchParamsObject.status)
    ? searchParamsObject.status
    : undefined;

  const whereObject = {
    status: status,
  };

  const orderByObject =
    searchParamsObject.orderBy &&
    columnNames.includes(searchParamsObject.orderBy)
      ? {
          [searchParamsObject.orderBy]: "asc",
        }
      : undefined;

  const page = parseInt(searchParamsObject.page) || 1;
  const pageSize = 5;

  const issues = await prisma.issue.findMany({
    where: whereObject,
    orderBy: orderByObject,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where: whereObject });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParamsObject={searchParamsObject} issues={issues} />
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};

export default IssuesPage;

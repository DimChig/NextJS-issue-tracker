import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/lib/prisma";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const { id } = await params; // No need to await params

  const issueId = parseInt(id);

  // Check if issueId is a valid number (not NaN)
  if (isNaN(issueId)) notFound();

  const issue = await prisma.issue.findUnique({
    where: {
      id: issueId,
    },
  });

  if (!issue) notFound();

  return (
    <div>
      <Heading as="h2">{issue.title}</Heading>
      <Flex className="space-x-3 place-items-center" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.description}</Text>
      </Flex>
      <Card>
        <p>{issue.createdAt.toDateString()}</p>
      </Card>
    </div>
  );
};

export default IssueDetailPage;

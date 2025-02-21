import React from "react";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import IssueForm from "../../_components/IssueFormClient";

const EditIssuePage = async (props: { params: Promise<{ id: string }> }) => {
  const { id: issueId } = await props.params;
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(issueId) },
  });
  if (!issue) notFound();
  return <IssueForm issue={issue} />;
};

export default EditIssuePage;

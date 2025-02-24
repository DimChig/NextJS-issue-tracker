import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

type Params = Promise<{ id: string }>;

export async function PATCH(
  request: NextRequest,
  segmentData: { params: Params }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { message: "You must be logged in." },
      { status: 401 }
    );

  const params = await segmentData.params;
  const issueId = params.id;

  const body = await request.json();

  const validation = issueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(issueId),
    },
  });
  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  segmentData: { params: Params }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { message: "You must be logged in." },
      { status: 401 }
    );

  const params = await segmentData.params;
  const issueId = parseInt(params.id);

  const issue = await prisma.issue.findUnique({
    where: {
      id: issueId,
    },
  });
  if (!issue) NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  await prisma.issue.delete({
    where: {
      id: issue?.id,
    },
  });
  return NextResponse.json({});
}

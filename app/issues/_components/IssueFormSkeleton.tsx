import { Skeleton } from "@/app/components";
import { Box } from "@radix-ui/themes";
import React from "react";

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton height="2rem" className="mb-1" />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default IssueFormSkeleton;

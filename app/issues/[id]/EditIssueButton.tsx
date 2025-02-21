import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button asChild>
      <Link href={`/issues/edit/${issueId}`}>
        <Pencil2Icon />
        Edit Issue
      </Link>
    </Button>
  );
};

export default EditIssueButton;

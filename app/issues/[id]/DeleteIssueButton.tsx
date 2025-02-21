"use client";

import { Button } from "@radix-ui/themes";
import { AlertDialog } from "radix-ui";
import "@/app/style.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "@/app/components";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isDeleting, setDeleting] = useState(false);

  const deleteIssue = async () => {
    try {
      setDeleting(true);
      await axios.delete("/api/issues/" + issueId);
      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      setDeleting(false);
      setError("" + error);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
          <div>
            <Button color="red" className="w-full" disabled={isDeleting}>
              Delete Issue
              {isDeleting && <Spinner />}
            </Button>
          </div>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="AlertDialogOverlay" />
          <AlertDialog.Content className="AlertDialogContent">
            <AlertDialog.Title className="AlertDialogTitle">
              Are you absolutely sure?
            </AlertDialog.Title>
            <AlertDialog.Description className="AlertDialogDescription">
              This action cannot be undone. This will permanently delete the
              issue
            </AlertDialog.Description>
            <div
              style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}
            >
              <AlertDialog.Cancel asChild>
                <button className="Button mauve">Cancel</button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <button className="Button red" onClick={deleteIssue}>
                  Delete Issue
                </button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>

      <AlertDialog.Root open={error.length > 0}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="AlertDialogOverlay" />
          <AlertDialog.Content className="AlertDialogContent">
            <AlertDialog.Title className="AlertDialogTitle">
              Error: {error}
            </AlertDialog.Title>
            <AlertDialog.Description className="AlertDialogDescription">
              This issue could not be deleted.
            </AlertDialog.Description>
            <button className="Button mauve" onClick={() => setError("")}>
              OK
            </button>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;

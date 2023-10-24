"use client";
import { useRef } from "react";
// @ts-expect-error
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getMetadata } from "@/app/actions";

export default function Settings() {
  const formRef = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();

  return (
    <form action={getMetadata} ref={formRef}>
      <AlertDialog>
        <AlertDialogTrigger
          className="text-zinc-600 dark:text-zinc-400 border-zinc-600 dark:border-zinc-400"
          asChild
        >
          <Button
            aria-controls="configure-source-modal"
            aria-haspopup="true"
            className=""
            variant="outline"
          >
            Configure Source
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Configure Source</AlertDialogTitle>
            <AlertDialogDescription>
              <form>
                <label className="block mb-4">
                  <span className="text-gray-700 dark:text-gray-200">
                    Hasura GraphQL Endpoint
                  </span>
                  <Input
                    aria-required="true"
                    className="mt-1 block w-full"
                    placeholder="Enter GraphQL endpoint"
                    required
                    type="text"
                  />
                </label>
                <label className="block mb-4">
                  <span className="text-gray-700 dark:text-gray-200">
                    Admin Password
                  </span>
                  <Input
                    aria-required="true"
                    className="mt-1 block w-full"
                    placeholder="Enter admin password"
                    required
                    type="password"
                  />
                </label>
              </form>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => formRef?.current?.submit()}
              disabled={pending}
            >
              Save
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  );
}

"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateMetadata } from "@/app/actions";
import { useFormStatus } from "react-dom";
import React from "react";

// window.location typescript
declare global {
  interface Location {
    search: string;
  }
  interface Window {
    location: Location;
  }
}

export default function Header() {
  const { pending } = useFormStatus();

  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isSearching, startTransition] = React.useTransition();

  const handleSearch = (term: string) => {
    let params = new URLSearchParams(window.location.search);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-bold text-2xl">Database Event Explorer</h1>
        <div className="flex gap-2">
          <form action={updateMetadata}>
            <Button type="submit" disabled={pending}>
              Update Metadata
            </Button>
          </form>
        </div>
      </div>
      <form className="mb-4">
        <div className="relative">
          <svg
            className=" absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500 dark:text-zinc-400"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <Input
            className="pl-8 w-full"
            placeholder="Search tables and triggers..."
            type="search"
            defaultValue={searchParams.get("search") || ""}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {/* spinner */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            {isSearching && (
              <svg
                className="animate-spin h-5 w-5 text-zinc-500 dark:text-zinc-400"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m12 6v6l4 2" />
              </svg>
            )}
          </div>
        </div>
      </form>
    </>
  );
}

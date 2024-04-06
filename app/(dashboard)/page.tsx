"use client";

import UserAuthenticator from "@/components/auth/UserAuthenticator";
import NewNFAButton from "@/components/auth/NewNFAButton";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";

const DashboardPage = () => {
  const nfas = useQuery(api.nfa.readNfa);

  return (
    <div className="h-full w-full flex flex-col items-center p-4 gap-8">
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-3xl">
          Documents
          </h2>
        View and manage all of your documents.
        </div>
        <NewNFAButton />
      </div>
      <div
        className="w-full flex-1 flex flex-col justify-start items-center rounded-lg border border-dullOutline h-8"
        style={{
          boxShadow:
            "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)",
        }}
      >
        <div className="w-full grid sm:grid-cols-[1fr_150px_150px_150px] grid-cols-[1fr_120px] overflow-y-auto">
          <div className="w-full h-[44px] bg-lightGray text-secondaryBlack flex items-center justify-start px-6 border-b border-dullOutline font-medium text-[12px]">
            Name
          </div>
          <div className="w-full h-[44px] bg-lightGray text-secondaryBlack sm:flex hidden items-center justify-center px-6 border-b border-dullOutline font-medium text-[12px]">
            Date Submitted
          </div>
          <div className="w-full h-[44px] bg-lightGray text-secondaryBlack sm:flex hidden items-center justify-center px-6 border-b border-dullOutline font-medium text-[12px]">
            Status
          </div>
          <div className="w-full h-[44px] bg-lightGray text-secondaryBlack flex items-center justify-center px-6 border-b border-dullOutline font-medium text-[12px]">
            Actions
          </div>
        </div>
        {nfas && (
          <div className="flex flex-col w-full h-full justify-start items-center overflow-y-auto flex-1">
            {nfas.length === 0 ? (
              <div className="flex flex-col justify-center items-center h-full font-medium gap-6">
                You don&apos;t have any projects.
                <Button variant={"outline"}>hehe</Button>
              </div>
            ) : (
              <div className="w-full">
                {nfas.toReversed().map((nfa, index) => (
                  <div className="w-full" key={index}>
                    <div className="w-full grid sm:grid-cols-[1fr_100px_140px_120px] grid-cols-[1fr_120px] hover:bg-lightGray">
                      <div className="w-full h-[120px] text-secondaryBlack sm:flex hidden items-center justify-center px-6 border-b border-dullOutline font-medium text-sm">
                        {nfa.userEmail}
                      </div>
                      <div className="w-full h-[120px] text-secondaryBlack sm:flex hidden items-center justify-center px-6 border-b border-dullOutline font-medium text-sm">{`${new Date(nfa._creationTime as unknown as Date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`}</div>
                      <div className="w-full h-[120px] text-secondaryBlack flex gap-4 items-center justify-end pr-4 border-b border-dullOutline font-medium text-sm">
                        <Button variant="destructive">hehe</Button>
                <Button variant="secondary">Secondary</Button>

                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <UserAuthenticator />
    </div>
  );
};

export default DashboardPage;

"use client";

import UserAuthenticator from "@/components/auth/UserAuthenticator";
import NewNFAButton from "@/components/auth/NewNFAButton";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useEffect, useState } from "react";
import { updateNfaHOD } from "@/convex/nfa";
const DashboardPage = () => {
  const nfas = useQuery(api.nfa.readNfa);
  const reqNoDetails = useMutation(api.nfa.getNfaDetails);
  const createUserifNot = useMutation(api.users.createUserifNot);

  const [documentId, setDocumentId] = useState<any>();
  const updateNfaHOD = useMutation(api.nfa.updateNfaHOD);
const [userDetails,setUserDetails] = useState<any>();
  const newtempfunc = async (reqNo:number) => {

    const details = await reqNoDetails({ reqNo: Number(reqNo) });
    details && setDocumentId(details._id);
  };

  const handleSignature = async (nfa: any) => {
    await newtempfunc(nfa.reqNo);
    const newReqNo = updateNfaHOD({
      id: documentId,
    });
    fetch('/api/send',{method:'POST'})
  };

  const getUserDetails = async () => {
    const userDetails = await createUserifNot();
    setUserDetails(userDetails);
  };

  useEffect(()=>{
    getUserDetails();
  },[])
  return (
    <div className="h-full w-full flex flex-col items-center p-4 gap-8">
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-3xl">Documents</h2>
          View and manage all of your documents.
        </div>
        <div className="flex gap-4 items-center">
          <NewNFAButton />
          <UserAuthenticator />
        </div>
      </div>
      <div className="w-fit mx-auto flex flex-col justify-start items-center rounded-lg border border-dullOutline">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-center">ReqNo</TableHead>
              <TableHead className="text-center">Date Submitted</TableHead>
              <TableHead className="text-center">Type</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {nfas &&
              nfas.map((nfa) => (
                <TableRow key={nfa._id} className="text-center">
                  <TableCell className="font-medium">{nfa.reqNo}</TableCell>
                  <TableCell>
                    {`${new Date(nfa._creationTime).toLocaleDateString(
                      "en-IN",
                      {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                      }
                    )}`}
                  </TableCell>
                  <TableCell>
                    {nfa.type == "nfapa"
                      ? "Professional Allowance"
                      : nfa.type == "nfapur"
                        ? "Purchase"
                        : nfa.type == "nfabillsr"
                          ? "Forwarding Bills for SRCD"
                          : ""}
                  </TableCell>
                  <TableCell>{nfa.status}</TableCell>
                  <TableCell className="text-right flex gap-2">
                    <Link
                      href={`${nfa.type == "nfapa" ? "/nfapa/" : nfa.type == "nfapur" ? "/nfapur/" : nfa.type == "nfabillsr" ? "/nfabillsr/" : ""}${nfa.reqNo}`}
                    >
                      <Button variant={"secondary"}>View</Button>
                    </Link>
                   {userDetails && userDetails.designation == "HOD" && nfa.status != "approved" && <Button
                      variant={"pretty"}
                      onClick={() => {
                        handleSignature(nfa);
                      }}
                    >
                      Sign
                    </Button>}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DashboardPage;

"use client";

import NfapaTable from "@/components/NfapaTable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useEffect, useState } from "react";

const CreateNfapa = ({ params }: { params: { reqNo: number } }) => {
  const createUserifNot = useMutation(api.users.createUserifNot);
const reqNoDetails = useMutation(api.nfa.getNfaDetails);

const [status,setStatus] = useState("draft");

  const [userDetails, setUserDetails] = useState<any>(null);
  const getUserDetails = async () => {
    const userDetails = await createUserifNot();
    const reqnodetails2 = await reqNoDetails({reqNo:Number(params.reqNo)})
    setUserDetails(userDetails);
    reqnodetails2&& setStatus(reqnodetails2.status);
  };

  useEffect(() => {
    getUserDetails();
  }, []);


  return (
    <div className="h-full w-full flex flex-col items-center p-4 gap-8">
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-3xl">
            Submit new Professional Allowance
          </h2>
          View and manage all of your documents.
        </div>
        <div>
            <span className="font-bold">Status:</span>{` ${status}`}
        </div>
      </div>
      <div className="w-full flex flex-col gap-5">
        <div className="w-full flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="Name"
                value={userDetails && userDetails.name}
                disabled
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="designation">Designation</Label>
              <Input
                type="text"
                id="designation"
                placeholder="Designation"
                value={userDetails && userDetails.designation}
                disabled
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="psrn">PSRN</Label>
              <Input
                type="text"
                id="psrn"
                placeholder="PSRN"
                value={userDetails && userDetails.psrn}
                disabled
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="entitlement">Entitlement Limit</Label>
              <Input
                type="text"
                id="entitlement"
                placeholder="Entitlement Limit"
                value={userDetails && userDetails.entitlementLimit}
                disabled
              />
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div className="w-full w-max-[1100px]">
        <NfapaTable params={params}/>
      </div>
    </div>
  );
};

export default CreateNfapa;

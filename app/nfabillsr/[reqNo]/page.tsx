"use client";

import Nfabillsr from "@/components/Nfabillsr";
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
      <Nfabillsr params={params} />
  
    </div>
  );
};

export default CreateNfapa;

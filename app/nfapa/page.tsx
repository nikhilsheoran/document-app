"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useEffect, useState } from "react";

const CreateNfapa = () => {

    const createUserifNot = useMutation(api.users.createUserifNot);
useEffect(()=>{
    const userDetails = createUserifNot();
    console.log(userDetails)
},[])
  return (
    <div className="h-full w-full flex flex-col items-center p-4 gap-8">
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-3xl">
            Submit new Professional Allowance
          </h2>
          View and manage all of your documents.
        </div>
      </div>
      <div className="w-full flex flex-col gap-5">
        <div className="w-full flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input type="text" id="name" placeholder="Name" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="designation">Designation</Label>
              <Input type="text" id="designation" placeholder="Designation" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="psrn">PSRN</Label>
              <Input type="text" id="psrn" placeholder="PSRN" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="entitlement">Entitlement Limit</Label>
              <Input
                type="text"
                id="entitlement"
                placeholder="Entitlement Limit"
              />
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default CreateNfapa;

"use client";

import Nfabillsr from "@/components/Nfabillsr";



const CreateNfapa = ({ params }: { params: { reqNo: number } }) => {

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
    
      <Nfabillsr params={params} />
    </div>
  );
};

export default CreateNfapa;

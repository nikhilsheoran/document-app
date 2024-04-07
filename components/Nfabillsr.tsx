"use client";

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
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";

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
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const Nfabillsr = ({ params }: { params: { reqNo: number } }) => {
  const createNfa = useMutation(api.nfa.createNfa);
  const [status, setStatus] = useState("draft");

  function inWords(num: string): string {
    const a: string[] = [
      "",
      "one ",
      "two ",
      "three ",
      "four ",
      "five ",
      "six ",
      "seven ",
      "eight ",
      "nine ",
      "ten ",
      "eleven ",
      "twelve ",
      "thirteen ",
      "fourteen ",
      "fifteen ",
      "sixteen ",
      "seventeen ",
      "eighteen ",
      "nineteen ",
    ];

    const b: string[] = [
      "",
      "",
      "twenty",
      "thirty",
      "forty",
      "fifty",
      "sixty",
      "seventy",
      "eighty",
      "ninety",
    ];

    if ((num = num.toString()).length > 9) return "overflow";
    const n = ("000000000" + num)
      .substr(-9)
      .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return "";
    let str = "";
    str +=
      n[1] !== "00"
        ? (a[Number(n[1])] ||
            b[parseInt(n[1][0])] + " " + a[parseInt(n[1][1])]) + "crore "
        : "";
    str +=
      n[2] !== "00"
        ? (a[Number(n[2])] ||
            b[parseInt(n[2][0])] + " " + a[parseInt(n[2][1])]) + "lakh "
        : "";
    str +=
      n[3] !== "00"
        ? (a[Number(n[3])] ||
            b[parseInt(n[3][0])] + " " + a[parseInt(n[3][1])]) + "thousand "
        : "";
    str +=
      n[4] !== "0"
        ? (a[Number(n[4])] ||
            b[parseInt(n[4][0])] + " " + a[parseInt(n[4][1])]) + "hundred "
        : "";
    str +=
      n[5] !== "00"
        ? (str !== "" ? "and " : "") +
          (a[Number(n[5])] ||
            b[parseInt(n[5][0])] + " " + a[parseInt(n[5][1])]) +
          "only "
        : "";
    return str.trim();
  }
  const { toast } = useToast();
  const getLatestUserNfa = useQuery(api.nfa.getLatestUserNfa);

  const [rows, setRows] = useState([
    {
      srNo: 1,
      partyName: "",
      poNo: 0,
      billNo: "",
      billAmt: 0,
      advance: 0,
    },
  ]);
  const [extraDetails, setExtraDetails] = useState({
    rows: rows,
    projectTitle: "",
    agencyName: "",
    remarks: "",
    budgetHead: "",
    budgetedAmount: 0,
    billAmount: 0,
    balance: 0,
  });
  const reqNoDetails = useMutation(api.nfa.getNfaDetails);
  const [documentId, setDocumentId] = useState<any>();
  const createUserifNot = useMutation(api.users.createUserifNot);

  const [userDetails, setUserDetails] = useState<any>(null);
  const getUserDetails = async () => {
    const userDetails = await createUserifNot();
    setUserDetails(userDetails);
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  const handleExtraDetailsChange = (
    detail:
      | "budgetedAmount"
      | "billAmount"
      | "balance"
      | "budgetHead"
      | "remarks"
      | "agencyName"
      | "projectTitle",
    e: any
  ) => {
    const newDatatoupdate = { ...extraDetails };
    if (
      detail == "budgetedAmount" ||
      detail == "billAmount" ||
      detail == "balance"
    ) {
      newDatatoupdate[detail] = Number(e.target.value);
    } else {
      newDatatoupdate[detail] = e.target.value;
    }
    // const newDatatoupdate = detail == 'budgetedAmount' || detail == 'billAmount' || detail == 'balance' ? {...extraDetails,detail:Number(e.target.value)} as any : {...extraDetails,detail:e.target.value} as any
    console.log(newDatatoupdate);
    setExtraDetails(newDatatoupdate);
  };
  const handleInputChange = (srNo: number, e: any) => {
    const updatedRows = [...rows]; // Copy the original rows array

    // Find the index of the row with the provided srNo
    const rowIndex = updatedRows.findIndex((row) => row.srNo === srNo);
    // Update the corresponding property of the row
    const valueToUse =
      e.target.name == "advance" ||e.target.name == "poNo" ||
      e.target.name == "billAmt"
        ? Number(e.target.value)
        : e.target.value;
    updatedRows[rowIndex] = {
      ...updatedRows[rowIndex],
      [e.target.name]: valueToUse,
    };

    // Check if the last row has all properties (except srNo) defined
    const lastRow = updatedRows[updatedRows.length - 1];
    const anyFieldDefined = Object.values(lastRow)
      .slice(1)
      .some((value) => value != "");

    // If all properties (except srNo) are defined, add a new row with all fields undefined
    if (anyFieldDefined) {
      updatedRows.push({
        srNo: lastRow.srNo + 1,
        partyName: "",
        poNo: 0,
        billNo: "",
        billAmt: 0,
        advance: 0,
      });
    }

    // Update the state with the modified rows array
    setRows(updatedRows);
  };

  const handleSave = () => {
    console.log(extraDetails,"save karna se pahle")
    const newReqNo = createNfa({
      // userEmail: string;
      id: documentId,
      type: "nfabillsr",
      reqNo: Number(params.reqNo),
      status: "draft",
      details: { ...extraDetails, rows:rows.slice(0,-1) },
    });
    setTimeout(() => {
      const newReqNo = getLatestUserNfa;
      !params.reqNo && (window.location.href = window.location.href + `/${newReqNo}`);
    }, 1000);
  };
  const handleSubmit = () => {
    const newReqNo = createNfa({
      // userEmail: string;
      id: documentId,
      type: "nfabillsr",
      reqNo: Number(params.reqNo),
      status: "in progress",
      details: { ...extraDetails, rows:rows.slice(0,-1) },
    });
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };

  const newtempfunc = async () => {
    const details = await reqNoDetails({ reqNo: Number(params.reqNo) });
    details && setDocumentId(details._id);
    details && setStatus(details?.status);
    details?.details.rows && setRows(details?.details.rows as any);
    details?.details.rows && setExtraDetails(details?.details as any);
  };
  useEffect(() => {
    newtempfunc();
  }, []);
  return (
    <>
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
              <Label htmlFor="projectTitle">Project Title</Label>
              <Input
                type="text"
                id="projectTitle"
                value={extraDetails.projectTitle}
                onChange={(e) => {
                  handleExtraDetailsChange("projectTitle", e);
                }}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="agencyName">Agency Name</Label>
              <Input
                type="text"
                id="agencyName"
                value={extraDetails.agencyName}
                onChange={(e) => {
                  handleExtraDetailsChange("agencyName", e);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full w-max-[1100px]">
        <div className="w-full flex flex-col gap-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] text-center">Serial</TableHead>
                <TableHead className="text-center">Name of Party</TableHead>
                <TableHead className="text-center">PO No.</TableHead>
                <TableHead className="text-center">Bill No.</TableHead>
                <TableHead className="text-center">Bill Amount</TableHead>
                <TableHead className="text-center">Advance Paid</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.srNo}>
                  <TableCell className="font-medium">
                    <Input value={row.srNo} name="srNo" disabled />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={row.partyName}
                      name="partyName"
                      placeholder="New Entry"
                      onChange={(e) => {
                        handleInputChange(row.srNo, e);
                      }}
                      disabled={status != "draft"}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={row.poNo}
                      name="poNo"
                      onChange={(e) => {
                        handleInputChange(row.srNo, e);
                      }}
                      disabled={status != "draft"}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Input
                      value={row.billNo}
                      name="billNo"
                      onChange={(e) => {
                        handleInputChange(row.srNo, e);
                      }}
                      disabled={status != "draft"}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Input
                      value={row.billAmt}
                      name="billAmt"
                      onChange={(e) => {
                        handleInputChange(row.srNo, e);
                      }}
                      disabled={status != "draft"}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Input
                      value={row.advance}
                      name="advance"
                      onChange={(e) => {
                        handleInputChange(row.srNo, e);
                      }}
                      disabled={status != "draft"}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={6} className="text-right"></TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <div className="w-full flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="remarks">Remarks</Label>
                <Input
                  type="text"
                  id="remarks"
                  value={extraDetails.remarks}
                  onChange={(e) => {
                    handleExtraDetailsChange("remarks", e);
                  }}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="budgetHead">Budget Head</Label>
                <Input
                  type="text"
                  id="budgetHead"
                  value={extraDetails.budgetHead}
                  onChange={(e) => {
                    handleExtraDetailsChange("budgetHead", e);
                  }}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="budgetedAmount">Budgeted Amount</Label>
                <Input
                  type="text"
                  id="budgetedAmount"
                  placeholder="Budgeted Amount"
                  value={extraDetails.budgetedAmount}
                  onChange={(e) => {
                    handleExtraDetailsChange("budgetedAmount", e);
                  }}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="billAmount">Total Bill Amount</Label>
                <Input
                  type="text"
                  id="billAmount"
                  value={rows.reduce(
                    (total, row) => total + (+row.billAmt || 0),
                    0
                  )}
                  disabled
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="balance">Balance Today</Label>
                <Input
                  type="text"
                  id="balance"
                  value={extraDetails.balance}
                  onChange={(e) => {
                    handleExtraDetailsChange("balance", e);
                  }}
                />
              </div>
            </div>
          </div>
          {status == "draft" && (
            <div className="w-full flex items-center justify-end gap-2">
              <Button
                variant={"secondary"}
                onClick={() => {
                  handleSave();
                }}
              >
                Save
              </Button>
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button variant={"pretty"}>Submit for Approval</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSubmit}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Nfabillsr;

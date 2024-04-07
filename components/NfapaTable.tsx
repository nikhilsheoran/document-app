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

const NfapaTable = ({ params }: { params: { reqNo: number } }) => {
  const createNfa = useMutation(api.nfa.createNfa);
  const [status,setStatus] = useState("draft");

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
      description: "",
      cashMemo: "",
      date: "",
      conferenceTravelAmt: 0,
      otherTravelAmount: 0,
    },
  ]);
  const reqNoDetails = useMutation(api.nfa.getNfaDetails);
  const [documentId,setDocumentId] = useState<any>();

  const handleInputChange = (srNo: number, e: any) => {
    const updatedRows = [...rows]; // Copy the original rows array

    // Find the index of the row with the provided srNo
    const rowIndex = updatedRows.findIndex((row) => row.srNo === srNo);
    // Update the corresponding property of the row
    const valueToUse =
      e.target.name == "conferenceTravelAmt" ||
      e.target.name == "otherTravelAmount"
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
        description: "",
        cashMemo: "",
        date: "",
        conferenceTravelAmt: 0,
        otherTravelAmount: 0,
      });
    }

    // Update the state with the modified rows array
    setRows(updatedRows);
  };


  const handleSave = () => {
    const newReqNo = createNfa({
      // userEmail: string;
      id:documentId,
      type: "nfapa",
      reqNo: Number(params.reqNo),
      status: "draft",
      details: {
        rows: rows.slice(0, -1),
        total: rows.reduce(
          (total, row) =>
            total +
            (+row.conferenceTravelAmt || 0) +
            (+row.otherTravelAmount || 0),
          0
        ),
        amtInWords: inWords(
          `${rows.reduce((total, row) => total + (+row.conferenceTravelAmt || 0) + (+row.otherTravelAmount || 0), 0)}`
        ),
      },
    });
    setTimeout(() => {
      const newReqNo = getLatestUserNfa;
      !params.reqNo && (window.location.href = window.location.href + `/${newReqNo}`);
    }, 100);
  };
  const handleSubmit = () => {
    const newReqNo = createNfa({
        // userEmail: string;
        id:documentId,
        type: "nfapa",
        reqNo: Number(params.reqNo),
        status: "in progress",
        details: {
          rows: rows.slice(0, -1),
          total: rows.reduce(
            (total, row) =>
              total +
              (+row.conferenceTravelAmt || 0) +
              (+row.otherTravelAmount || 0),
            0
          ),
          amtInWords: inWords(
            `${rows.reduce((total, row) => total + (+row.conferenceTravelAmt || 0) + (+row.otherTravelAmount || 0), 0)}`
          ),
        },
      });
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
  };

  const newtempfunc = async() =>{
    const details = await reqNoDetails({reqNo:Number(params.reqNo)})
    details && setDocumentId(details._id);
    details && setStatus(details?.status);
    details?.details.rows && setRows(details?.details.rows as any);
  }
  useEffect(() => {
newtempfunc()

  }, []);
  return (
    <div className="w-full flex flex-col gap-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center">Serial</TableHead>
            <TableHead className="text-center">Description of Item</TableHead>
            <TableHead className="text-center">Cash Memo/Invoice No.</TableHead>
            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-center">
              Conference/Workshop Travel Amount
            </TableHead>
            <TableHead className="text-center">Other Amount</TableHead>
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
                  value={row.description}
                  name="description"
                  placeholder="New Entry"
                  onChange={(e) => {
                    handleInputChange(row.srNo, e);
                  }}
                  disabled={status != "draft"}
                />
              </TableCell>
              <TableCell>
                <Input
                  value={row.cashMemo}
                  name="cashMemo"
                  onChange={(e) => {
                    handleInputChange(row.srNo, e);
                  }}
                  disabled={status != "draft"}
                />
              </TableCell>
              <TableCell className="text-right">
                <Input
                  value={row.date}
                  name="date"
                  onChange={(e) => {
                    handleInputChange(row.srNo, e);
                  }}
                  disabled={status != "draft"}
                />
              </TableCell>
              <TableCell className="text-right">
                <Input
                  value={row.conferenceTravelAmt}
                  name="conferenceTravelAmt"
                  onChange={(e) => {
                    handleInputChange(row.srNo, e);
                  }}
                  disabled={status != "draft"}
                />
              </TableCell>
              <TableCell className="text-right">
                <Input
                  value={row.otherTravelAmount}
                  name="otherTravelAmount"
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
            <TableCell colSpan={6} className="text-right">
              Total -
              {` ₹${rows.reduce((total, row) => total + (+row.conferenceTravelAmt || 0) + (+row.otherTravelAmount || 0), 0)} `}
              (
              {inWords(
                `${rows.reduce((total, row) => total + (+row.conferenceTravelAmt || 0) + (+row.otherTravelAmount || 0), 0)}`
              )}
              )
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
     {status == "draft" && <div className="w-full flex items-center justify-end gap-2">
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
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
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
      </div>}
    </div>
  );
};

export default NfapaTable;

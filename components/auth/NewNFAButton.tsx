import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { Button } from "@/components/ui/button";
  import { Plus } from "@untitled-ui/icons-react";
import Link from "next/link";

const newNFAButton = () => {
    return ( <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="pretty" size={"sm"} className="flex items-center gap-2">
            <Plus />
            Request NFA
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Choose type of NFA</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/nfapa">
          <DropdownMenuItem>Professional Allowance</DropdownMenuItem>
          </Link><Link href="/nfabillsr">
          <DropdownMenuItem>Forwarding Bills for SRCD</DropdownMenuItem>
          </Link><Link href="/nfapur">
          <DropdownMenuItem>Purchase</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu> );
}
 
export default newNFAButton;
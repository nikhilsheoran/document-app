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
          <Button variant="pretty" className="flex items-center gap-2">
            <Plus />
            Request NFA
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Choose type of NFA</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/nfapa">
          <DropdownMenuItem>Professional Allowance</DropdownMenuItem>
          </Link>
          <DropdownMenuItem>Forwarding Bills for SRCD</DropdownMenuItem>
          <DropdownMenuItem>Purchase</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> );
}
 
export default newNFAButton;
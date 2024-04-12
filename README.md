# Document Approval Web Application

This project is a web application for document approval, specifically Non-Financial Advances (NFAs). The database schema consists of two tables, `nfa` and `users`.

## NFA Table

The `nfa` table stores information related to Non-Financial Advances, including details such as agency name, budget details, amounts, dates, remarks, and more. It has the following fields:

- `details` (object): An object containing various details related to the NFA.
 - `agencyName` (string, optional): The name of the agency.
 - `amountSpent` (float64, optional): The amount spent.
 - `amtInWords` (string, optional): The amount in words.
 - `balance` (float64, optional): The remaining balance.
 - `billAmount` (float64, optional): The bill amount.
 - `budgetCode` (string, optional): The budget code.
 - `budgetHead` (string, optional): The budget head.
 - `budgetedAmount` (float64, optional): The budgeted amount.
 - `date` (string, optional): The date.
 - `grandTotal` (float64, optional): The grand total.
 - `gst` (float64, optional): The GST amount.
 - `nfaNo` (float64, optional): The NFA number.
 - `projectTitle` (string, optional): The project title.
 - `remarks` (string, optional): Remarks related to the NFA.
 - `requisitionAmount` (float64, optional): The requisition amount.
 - `rows` (array of objects): An array containing details of individual items or expenses.
   - `advance` (float64, optional): The advance amount.
   - `billAmt` (float64, optional): The bill amount.
   - `billNo` (string, optional): The bill number.
   - `cashMemo` (string, optional): The cash memo.
   - `conferenceTravelAmt` (float64, optional): The conference travel amount.
   - `date` (string, optional): The date.
   - `description` (string, optional): The description.
   - `otherTravelAmount` (float64, optional): The other travel amount.
   - `partyName` (string, optional): The party name.
   - `poNo` (float64, optional): The purchase order number.
   - `srNo` (float64): The serial number.
 - `sanctionedAmount` (float64, optional): The sanctioned amount.
 - `subTotal` (float64, optional): The subtotal amount.
 - `total` (float64, optional): The total amount.
- `reqNo` (float64): The requisition number.
- `status` (string): The status of the NFA.
- `type` (string, optional): The type of NFA.
- `userEmail` (string): The email of the user who created the NFA.

## Users Table

The `users` table stores information about users of the application. It has the following fields:

- `designation` (string): The designation of the user.
- `entitlementLimit` (float64): The entitlement limit for the user.
- `name` (string): The name of the user.
- `psrn` (string): The PSRN (Permanent Staff Record Number) of the user.
- `tokenIdentifier` (string): The token identifier for the user.
- `userEmail` (string): The email of the user.

This database schema is designed to store and manage Non-Financial Advances, along with user information. The `nfa` table holds detailed information about each NFA, including financial details, budget information, and individual item/expense details. The `users` table maintains user-specific data such as designation, entitlement limit, and authentication details.
# Document Approval Web Application Database Schema

## Overview

This project defines a database schema for a document approval web application. It consists of two main tables: `nfa` and `users`. Let's dive into each of them.

---

### Table: `nfa` (Non-Financial Approval)

The `nfa` table stores information related to non-financial approvals. Here are the complete details for each field:

1. **`details`** (Optional Object):
    - `agencyName`: The name of the approving agency.
    - `amountSpent`: The amount spent (if applicable).
    - `amtInWords`: The amount in words (if applicable).
    - `balance`: The remaining balance.
    - `billAmount`: The bill amount.
    - `budgetCode`: The budget code.
    - `budgetHead`: The budget head.
    - `budgetedAmount`: The budgeted amount.
    - `date`: The date of approval.
    - `grandTotal`: The grand total.
    - `gst`: The Goods and Services Tax (GST) amount.
    - `nfaNo`: The non-financial approval number.
    - `projectTitle`: The title of the project.
    - `remarks`: Any additional remarks.
    - `requisitionAmount`: The requested amount.
    - `rows`: An array of individual approval rows, each containing:
        - `advance`: Advance amount.
        - `billAmt`: Bill amount.
        - `billNo`: Bill number.
        - `cashMemo`: Cash memo details.
        - `conferenceTravelAmt`: Amount related to conference travel.
        - `date`: Date of the approval row.
        - `description`: Description of the approval item.
        - `otherTravelAmount`: Amount related to other travel.
        - `partyName`: Name of the party involved.
        - `poNo`: Purchase order number.
        - `srNo`: Serial number.
    - `sanctionedAmount`: The sanctioned approval amount.
    - `subTotal`: Subtotal of all approval amounts.
    - `total`: Total approval amount.

2. **Other Fields**:
    - `reqNo`: Request number.
    - `status`: Approval status.
    - `type`: Type of approval.
    - `userEmail`: User's email address.

### Table: `users`

The `users` table contains information about users interacting with the application. Here are the complete details for each field:

1. `designation`: The user's job title or designation.
2. `entitlementLimit`: The user's entitlement limit.
3. `name`: User's full name.
4. `psrn`: User's unique identifier (e.g., employee ID).
5. `tokenIdentifier`: A token identifier (if applicable).
6. `userEmail`: User's email address.

---

## Getting Started

To use these schemas, follow these steps:

1. Clone this repository or navigate to the appropriate folder.
2. Refer to the README file for each table to understand its purpose and how to use the SQL scripts.

Feel free to customize and adapt these schemas to your specific requirements!

---

*Note: This README provides a high-level overview. For detailed SQL scripts and additional information, explore the actual files in the repository.*

---

!GitHub Repository

View Repository

Feel free to modify and enhance this README as needed for your project. Good luck with your document approval web application! 🚀

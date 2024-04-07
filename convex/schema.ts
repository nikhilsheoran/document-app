import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    tokenIdentifier: v.string(),
    designation: v.string(),
    psrn: v.string(),
    userEmail: v.string(),
    entitlementLimit: v.number(),
  }).index("by_token", ["tokenIdentifier"]),

  nfa: defineTable({
    reqNo:v.number(),
    userEmail: v.string(),
    type: v.optional(v.string()),
    status:v.string(),
    details: v.optional(v.union(
      v.object({
        rows: v.array(v.object({
          srNo: v.number(),
          description: v.string(),
          cashMemo: v.string(),
          date: v.string(),
          conferenceTravelAmt: v.number(),
          otherTravelAmount: v.number(),
        })),
        total: v.number(),
        amtInWords: v.string(),
      }),
      v.object({
        rows: v.array(v.object({
          srNo: v.number(),
          partyName: v.string(),
          poNo: v.number(),
          billNo: v.string(),
          billAmt: v.number(),
          advance: v.number(),
        })),
        projectTitle: v.string(),
        agencyName: v.string(),
        remarks: v.string(),
        budgetHead: v.string(),
        budgetedAmount: v.optional(v.number()),
        billAmount: v.number(),
        balance: v.optional(v.number()),
      }),
      v.object({
        rows: v.array(v.object({
          srNo: v.number(),
          description: v.string(),
          qtyRequired: v.number(),
          unitRate: v.number(),
          totalCost: v.number(),
        })),
        subTotal: v.number(),
        gst: v.number(),
        grandTotal: v.number(),
        budgetHead: v.string(),
        budgetCode: v.string(),
        sanctionedAmount: v.optional(v.number()),
        amountSpent: v.number(),
        requisitionAmount: v.number(),
        nfaNo:v.number(),
        date:v.string(),
      })
    )),
  }),
});

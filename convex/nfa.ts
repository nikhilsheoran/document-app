import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createNfa = mutation({
  args: {
    reqNo: v.number(),
    userEmail: v.string(),
    type: v.string(),
    details: v.union(
      v.array(
        v.object({
          rows: v.object({
            srNo: v.number(),
            description: v.string(),
            cashMemo: v.string(),
            date: v.string(),
            conferenceTravelAmt: v.number(),
            otherTravelAmount: v.number(),
          }),
          total: v.number(),
          amtInWords: v.string(),
        })
      ),
      v.array(
        v.object({
          rows: v.object({
            srNo: v.number(),
            partyName: v.string(),
            poNo: v.number(),
            billNo: v.string(),
            billAmt: v.number(),
            advance: v.number(),
          }),
          projectTitle: v.string(),
          agencyName: v.string(),
          remarks: v.string(),
          budgetHead: v.string(),
          budgetedAmount: v.optional(v.number()),
          billAmount: v.number(),
          balance: v.optional(v.number()),
        })
      ),
      v.array(
        v.object({
          rows: v.object({
            srNo: v.number(),
            description: v.string(),
            qtyRequired: v.number(),
            unitRate: v.number(),
            totalCost: v.number(),
          }),
          subTotal: v.number(),
          gst: v.number(),
          grandTotal: v.number(),
          budgetHead: v.string(),
          budgetCode: v.string(),
          sanctionedAmount: v.optional(v.number()),
          amountSpent: v.number(),
          requisitionAmount: v.number(),
        })
      )
    ),
  },
  handler: async (ctx, args) => {
    const lastNfaReq = await ctx.db.query("nfa").order("desc").first();
    const lastReqNo = lastNfaReq ? lastNfaReq.reqNo : 0;
    const nfaId = await ctx.db.insert("nfa", { ...args, reqNo: lastReqNo + 1 });
    return nfaId;
  },
});

export const readNfa = query({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    const designation = (
      await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("userEmail"), identity!.email))
        .unique()
    )?.designation;

    const nfas =
      designation === "Faculty"
        ? await ctx.db
            .query("nfa")
            .filter((q) => q.eq(q.field("userEmail"), identity!.email))
            .order("desc")
            .collect()
        : await ctx.db.query("nfa").order("desc").collect();
    return nfas;
  },
});

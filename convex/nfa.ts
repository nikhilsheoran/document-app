import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createNfa = mutation({
  args: {
    reqNo: v.optional(v.number()),
    // userEmail: v.string(),
    id: v.optional(v.id("nfa")),
    status: v.optional(v.string()),
    type: v.optional(v.string()),
    details: v.optional(v.union(
      v.object({
        rows: v.array(
          v.object({
            srNo: v.number(),
            description: v.string(),
            cashMemo: v.string(),
            date: v.string(),
            conferenceTravelAmt: v.number(),
            otherTravelAmount: v.number(),
          })
        ),
        total: v.number(),
        amtInWords: v.string(),
      }),
      v.object({
        rows: v.array(
          v.object({
            srNo: v.number(),
            partyName: v.string(),
            poNo: v.number(),
            billNo: v.string(),
            billAmt: v.number(),
            advance: v.number(),
          })
        ),
        projectTitle: v.string(),
        agencyName: v.string(),
        remarks: v.string(),
        budgetHead: v.string(),
        budgetedAmount: v.optional(v.number()),
        billAmount: v.number(),
        balance: v.optional(v.number()),
      }),
      v.object({
        rows: v.array(
          v.object({
            srNo: v.number(),
            description: v.string(),
            qtyRequired: v.number(),
            unitRate: v.number(),
            totalCost: v.number(),
          })
        ),
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
  },
  handler: async (ctx, args) => {
    const lastNfaReq = await ctx.db.query("nfa").order("desc").first();
    const lastReqNo = lastNfaReq ? lastNfaReq.reqNo : 0;

    const preExistingNfaId = args.reqNo
      ? await ctx.db
          .query("nfa")
          .filter((q) => q.eq(q.field("reqNo"), args.reqNo))
          .unique
      : 0;

    // const requiredId= preExistingNfaId;

    const identity = await ctx.auth.getUserIdentity();
    const userEmail = identity!.email!;
    const { id, ...newObj } = args;

    const nfaId = args.reqNo
      ? args.id && await ctx.db.patch(
          args.id,
          { ...newObj, reqNo:args.reqNo, userEmail: userEmail }
        )
      : await ctx.db.insert("nfa", {
          ...args,
          reqNo: lastReqNo + 1,
          userEmail: userEmail as any,
        } as any);
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
        : await ctx.db.query("nfa").filter((q) => q.neq(q.field("status"), "draft")).order("desc").collect();
    return nfas;
  },
});
export const getLatestUserNfa = query({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    const nfa = (
      await ctx.db
        .query("nfa")
        .filter((q) => q.eq(q.field("userEmail"), identity!.email))
        .order("desc")
        .first()
    )?.reqNo;
    return nfa ? nfa : 0 + 1;
  },
});

export const getNfaDetails = mutation({
  args: { reqNo: v.number() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    const nfa = await ctx.db
      .query("nfa")
      .filter((q) => q.eq(q.field("reqNo"), args.reqNo))
      .unique();
    return nfa;
  },
});

export const updateNfaHOD = mutation({
  args: {
    id: v.optional(v.id("nfa")),
  },
  handler: async (ctx, args) => {
    const nfaId = args.id && await ctx.db.patch(
          args.id,
          { status:"approved" }
        )
    return nfaId;
  },
});
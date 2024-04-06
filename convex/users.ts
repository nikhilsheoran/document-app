import { mutation } from "./_generated/server";

export const createUserifNot = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }

    // Check if we've already stored this identity before.
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();
    if (user !== null) {
      // If we've seen this identity before but the name has changed, patch the value.
      if (user.name !== identity.name) {
        await ctx.db.patch(user._id, { name: identity.name });
      }
      return user._id;
    }

    const lastPSRN = (
      await ctx.db
        .query("users")
        .withIndex("by_creation_time")
        .order("desc")
        .first()
    )?.psrn;
    const newPSRN = lastPSRN
      ? "G" + ("00" + (parseInt(lastPSRN.substr(1)) + 1)).slice(-3)
      : "G001";

    // If it's a new identity, create a new `User`.
    return await ctx.db.insert("users", {
      name: identity.name!,
      designation: "Faculty",
      userEmail: identity.email!,
      entitlementLimit: 25000,
      psrn: newPSRN,
      tokenIdentifier: identity.tokenIdentifier,
    });
  },
});

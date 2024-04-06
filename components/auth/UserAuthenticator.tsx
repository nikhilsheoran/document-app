"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
const UserAuthenticator = () => {
  const createUserifNot = useMutation(api.users.createUserifNot);

  useEffect(() => {
    createUserifNot();
  }, []);
  

  return <UserButton />;
};

export default UserAuthenticator;

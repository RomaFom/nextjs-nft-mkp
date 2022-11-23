"use client";
import React from "react";

import Toast from "@/app/components/ToastContainer/Toast";
import UserProvider from "@/app/providers/UserProvider/UserProvider";

type Props = {
  children: React.ReactNode;
};
const Provider: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Toast />
      <UserProvider>{children}</UserProvider>
    </>
  );
};
export default Provider;

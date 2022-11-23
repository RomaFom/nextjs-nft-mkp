"use client";
import "@/styles/globals.css";

import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import NavBar from "@/app/components/NavBar/NavBar";
import Toast from "@/app/components/ToastContainer/Toast";
import {
  IUserState,
  UserContext,
} from "@/app/providers/UserProvider/UserProvider";
import { IUserDataResponse } from "@/utils/api/types";
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cookie, setCookie, removeCookie] = useCookies(["tokenData"]);
  const router = useRouter();
  const [ctxUser, setCtxUser] = useState<IUserState | null>(null);

  const handleLogout = useCallback(() => {
    removeCookie("tokenData");
    setCtxUser(null);
    router.push("/");
  }, []);

  const userValues = {
    user: ctxUser,
    setUser: setCtxUser,
    clearUser: handleLogout,
  };

  useEffect(() => {
    if (!cookie.tokenData) {
      router.push("/");
    } else {
      fetch("/api/auth/get-user", {
        method: "GET",
        headers: {
          Authorization: cookie.tokenData,
        },
      })
        .then((res) => res.json())
        .then((data: IUserDataResponse) => {
          if (data.status >= 400 || !data.data) {
            handleLogout();
            return;
          }
          const newUser = {
            ...data.data,
            token: cookie.tokenData,
          };
          setCtxUser(newUser);
        });
    }
  }, [cookie]);
  return (
    // eslint-disable-next-line jsx-a11y/html-has-lang
    <html>
      <head />
      <body>
        <Toast />
        <UserContext.Provider value={userValues}>
          <NavBar />
          <main className="pt-20 px-3 h-full">{children}</main>
        </UserContext.Provider>
      </body>
    </html>
  );
}

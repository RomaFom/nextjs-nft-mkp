"use client";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import {
  IUserState,
  UserContext,
} from "@/app/providers/UserProvider/UserContext";
import { IUserDataResponse } from "@/utils/api/types";

type Props = {
  children: React.ReactNode;
};
const UserProvider: React.FC<Props> = ({ children }) => {
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
    <>
      <UserContext.Provider value={userValues}>{children}</UserContext.Provider>
    </>
  );
};
export default UserProvider;

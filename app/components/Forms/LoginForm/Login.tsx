"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import cn from "classnames";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";

import Button from "@/app/components/Button/Button";
import {
  ILoginForm,
  loginSchema,
} from "@/app/components/Forms/LoginForm/types";
import InputWrapper from "@/app/components/InputWrapper";
import { useUser } from "@/app/providers/UserProvider/UserContext";
import { IUserDataResponse, IUserResponse } from "@/utils/api/types";
import { basicError } from "@/utils/notifications/notificationsCenter";
const Login: React.FC = () => {
  const [cookie, setCookie] = useCookies(["tokenData"]);
  const router = useRouter();
  const { user, setUser } = useUser();
  console.log("user", user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  const onSubmit = async (values: ILoginForm): Promise<void> => {
    try {
      const res: IUserResponse = await (
        await fetch("/api/auth/login", {
          method: "POST",
          body: JSON.stringify(values),
        })
      ).json();
      if (res.status >= 400 || !res.data?.token) {
        basicError(res.error?.message || "Something went wrong");
        return;
      }

      setCookie("tokenData", res.data.token, {
        path: "/",
        maxAge: 3600,
        sameSite: true,
      });

      const userDataResponse: IUserDataResponse = await (
        await fetch("/api/auth/get-user", {
          method: "GET",
          headers: {
            Authorization: res.data.token || "",
          },
        })
      ).json();

      if (userDataResponse.status >= 400 || !userDataResponse.data) {
        basicError(res.error?.message || "Something went wrong");
        return;
      }

      const newUser = {
        ...userDataResponse.data,
        token: res.data.token,
      };

      setUser(newUser);
    } catch (err) {
      console.log("error", err);
    }
  };

  if (user) {
    return null;
  }

  return (
    <form className="pt-20" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col mx-auto xs:w-10/12 md:w-1/2 lg:w-1/3 gap-y-3.5">
        <InputWrapper labelId={"username"} labelText={"Username"}>
          <input
            className={cn(errors.username && "invalid")}
            autoComplete={"off"}
            {...register("username")}
          />
        </InputWrapper>
        <InputWrapper labelId={"password"} labelText={"Password"}>
          <input
            className={cn(errors.password && "invalid")}
            autoComplete={"off"}
            type={"password"}
            {...register("password")}
          />
        </InputWrapper>
        <span className="flex justify-center pt-2nex">
          <Button type="submit">Login</Button>
        </span>
      </div>
    </form>
  );
};
export default Login;

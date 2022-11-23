import React, { Suspense } from "react";

import MainFeed from "@/app/components/Feed/MainFeed";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default async function Page() {
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore  */}
        <MainFeed />
      </Suspense>
      <p className="text-2xl underline">HELLO</p>
    </>
  );
}

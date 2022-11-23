import "@/styles/globals.css";

import React from "react";

import NavBar from "@/app/components/NavBar/NavBar";
import Provider from "@/app/providers/Provider";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // eslint-disable-next-line jsx-a11y/html-has-lang
    <html>
      <head />
      <body>
        <Provider>
          <NavBar />
          <main className="pt-20 px-3 h-full">{children}</main>
        </Provider>
      </body>
    </html>
  );
}

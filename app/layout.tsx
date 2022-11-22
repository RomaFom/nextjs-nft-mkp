import "../styles/globals.css";

import React from "react";

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
      <body>{children}</body>
    </html>
  );
}

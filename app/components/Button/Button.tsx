"use client";
import React from "react";

import styles from "./Button.module.scss";
type Props = {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
};
const Button: React.FC<Props> = ({
  children,
  disabled,
  onClick,
  type = "button",
  className,
}) => {
  return (
    <span className={styles.appBtn}>
      <button
        className={className}
        type={type}
        disabled={disabled}
        onClick={() => {
          if (onClick) {
            onClick();
          }
        }}
      >
        {children}
      </button>
    </span>
  );
};
export default Button;

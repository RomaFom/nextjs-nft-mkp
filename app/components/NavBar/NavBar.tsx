"use client";
import cn from "classnames";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";

import { useUser } from "@/app/providers/UserProvider/UserContext";

import styles from "./NavBar.module.scss";

const NavBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, setUser, clearUser } = useUser();
  return (
    <header className={menuOpen ? styles.open : ""}>
      <nav className={cn(styles.navbar)}>
        {menuOpen ? (
          <AiOutlineClose
            className={cn(styles.burger)}
            onClick={() => {
              setMenuOpen(false);
            }}
          />
        ) : (
          <AiOutlineMenu
            className={cn(styles.burger)}
            onClick={() => {
              setMenuOpen(true);
            }}
          />
        )}
        <button className={cn(styles.burgerBtn, styles.button)}>
          <Link href={"/"}>Home</Link>
        </button>
        <div className={styles.dropdowns}>
          <div className={styles.dropdown}>
            <button className={styles.button}>
              NFT&apos;s <BsChevronDown />
            </button>
            <div className={styles.dropdownMenu}>
              <button>My NFT&apos;s</button>
              <button>Listed NFT&apos;s</button>
            </div>
          </div>

          {!user && (
            <>
              <div className={styles.dropdown}>
                <button className={styles.button}>
                  <Link href={"/login"}>Login</Link>
                </button>
              </div>

              <div className={styles.dropdown}>
                <button className={styles.button}>
                  <Link href={"/sign-up"}>Sign Up</Link>
                </button>
              </div>
            </>
          )}

          {user && (
            <div className={styles.dropdown}>
              <button className={styles.button} onClick={clearUser}>
                LOGOUT
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
export default NavBar;

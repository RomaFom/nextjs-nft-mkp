import { useWeb3 } from '@3rdweb/hooks';
import cn from 'classnames';
import Link from 'next/link';
import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { BsChevronDown } from 'react-icons/bs';

import { useUser } from '@/ignoreFolder/providers/UserProvider/UserContext';
import { cropAddress } from '@/utils/helpers/address';

import styles from './NavBar.module.scss';

const NavBar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { address, connectWallet } = useWeb3();
    const { user, clearUser } = useUser();
    return (
        <header className={menuOpen ? styles.open : ''}>
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
                <button
                    className={cn(styles.burgerBtn, styles.button)}
                    type={'button'}
                >
                    <Link href={'/'}>Home</Link>
                </button>
                <div className={styles.dropdowns}>
                    <div className={styles.dropdown}>
                        <button className={styles.button} type={'button'}>
                            NFT&apos;s <BsChevronDown />
                        </button>
                        <div className={styles.dropdownMenu}>
                            <button type={'button'}>My NFT&apos;s</button>
                            <button type={'button'}>Listed NFT&apos;s</button>
                        </div>
                    </div>

                    {!user && (
                        <>
                            <div className={styles.dropdown}>
                                <button
                                    className={styles.button}
                                    type={'button'}
                                >
                                    <Link href={'/login'}>Login</Link>
                                </button>
                            </div>

                            <div className={styles.dropdown}>
                                <button
                                    className={styles.button}
                                    type={'button'}
                                >
                                    <Link href={'/sign-up'}>Sign Up</Link>
                                </button>
                            </div>
                        </>
                    )}

                    {user && (
                        <div className={styles.dropdown}>
                            <button
                                className={styles.button}
                                onClick={clearUser}
                                type={'button'}
                            >
                                LOGOUT
                            </button>
                        </div>
                    )}

                    <button
                        className={
                            'rounded-md border-sky-700 border-2 px-3 py-1 right-0'
                        }
                        onClick={async () => {
                            if (!address) {
                                await connectWallet('injected');
                            }
                        }}
                        type={'button'}
                    >
                        {address ? cropAddress(address, 8) : 'Connect Wallet'}
                    </button>
                </div>
            </nav>
        </header>
    );
};
export default NavBar;

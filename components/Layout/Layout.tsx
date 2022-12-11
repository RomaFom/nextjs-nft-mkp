import React from 'react';
import NavBar from '@/components/NavBar/NavBar';

type Props = {
    children: React.ReactNode;
};
const Layout: React.FC<Props> = ({ children }) => (
    <>
        <NavBar />
        <main className="pt-20 px-3 h-full">{children}</main>
    </>
);
export default Layout;

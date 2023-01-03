import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { IUserState } from '@/providers/UserProvider/UserContext';
import { UserContext } from '@/providers/UserProvider/UserContext';

type Props = {
    children: React.ReactNode;
};
const UserProvider: React.FC<Props> = ({ children }) => {
    const [cookie, setCookie, removeCookie] = useCookies(['tokenData']);
    const router = useRouter();
    const [ctxUser, setCtxUser] = useState<IUserState | null>(null);

    const handleLogout = useCallback(() => {
        removeCookie('tokenData');
        setCtxUser(null);
        router.push('/');
    }, [removeCookie]);

    const handleLogin = useCallback(async () => {
        try {
            if (cookie.tokenData) {
                const { tokenData } = cookie;
                const { data }: AxiosResponse = await axios.get(
                    '/api/auth/get-user',
                    {
                        headers: {
                            Authorization: tokenData,
                        },
                    },
                );

                const newUser = {
                    ...data.data.user,
                    token: tokenData,
                };

                setCtxUser(newUser);
            }
        } catch (err) {
            handleLogout();
        }
    }, [cookie, handleLogout]);

    const userValues = {
        user: ctxUser,
        setUser: setCtxUser,
        clearUser: handleLogout,
    };

    useLayoutEffect(() => {
        handleLogin();
    }, [cookie.tokenData]);

    return (
        <>
            <UserContext.Provider value={userValues}>
                {children}
            </UserContext.Provider>
        </>
    );
};
export default UserProvider;

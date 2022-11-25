import { createContext, useContext } from 'react';

export interface IUserState {
    id: number;
    username: string;
    token: string;
}

type UserContextType = {
    user: IUserState | null;
    setUser: (user: IUserState | null) => void;
    clearUser: () => void;
};
const UserContextDefaultValues: UserContextType = {
    user: null,
    setUser: () => null,
    clearUser: () => null,
};

export const UserContext = createContext<UserContextType>(
    UserContextDefaultValues,
);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useUser = () => useContext(UserContext);

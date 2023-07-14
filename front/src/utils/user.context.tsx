import React, { useEffect } from "react";
import { Users } from "../services/users/users";
import { User } from "../dto";
import axios, { CancelToken, Canceler } from "axios";

interface UserContextProps {
    user: {
        data?: User;
        setUserData: () => void;
    };
}

const initialContext: UserContextProps = {
    user: {
        setUserData: async () => { },
    },
};

export const UserContext = React.createContext<UserContextProps>(initialContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = React.useState<User | undefined>(undefined);

    async function setUserData(token?: CancelToken) {
        const userId = localStorage.getItem("userId");
        if (userId) {
            const data = await Users.getById(userId, token);
            if (data) {
                setUser(data);
            }
        }
    }

    useEffect(() => {
        const cancelTokenSource = axios.CancelToken.source();
        setUserData(cancelTokenSource.token);
        return () => cancelTokenSource.cancel();
    }, []);

    return (
        <UserContext.Provider
            value={{
                user: {
                    data: user,
                    setUserData,
                },
            }}
        >
            {children}
        </UserContext.Provider>
    );
};


export function useUserContext() {
    return React.useContext(UserContext);
}

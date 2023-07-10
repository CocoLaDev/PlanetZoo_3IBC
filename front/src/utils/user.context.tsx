import React, { useEffect } from "react";
import { Users } from "../services/users/users";
import { User } from "../dto";

interface UserContextProps {
    user: {
        data?: User;
        setUserData: () => void;
    };
}

const initialContext: UserContextProps = {
    user: {
        setUserData: async() => { },
    },
};

export const UserContext = React.createContext<UserContextProps>(initialContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = React.useState<User | undefined>(undefined);

    async function setUserData() {
        const userId = localStorage.getItem("userId");
        if (userId) {
            const data = await Users.getById(userId);
            if (data) {
                setUser(data);
            }
        }
    }

    useEffect(() => {
        setUserData();
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

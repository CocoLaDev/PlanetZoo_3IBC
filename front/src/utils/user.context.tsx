import React from "react";

interface UserData {
    id: string;
    username: string;
    password: string;
}

interface UserContextProps {
    user: {
        data?: UserData;
        token?: string;
        isAuthenticated: boolean;
    };
}

const initialContext: UserContextProps = {
    user: {
        isAuthenticated: false,
    },
};

export const UserContext = React.createContext<UserContextProps>(initialContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = React.useState<UserData | undefined>(undefined);

    return (
        <UserContext.Provider
            value={{
                user: {
                    data: user,
                    isAuthenticated: true,
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

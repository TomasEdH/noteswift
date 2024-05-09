import React, { useEffect, useState } from "react";
import { type UserContextType, type User } from "./types";
import {apiUrl} from './consts'

export const UserContext = React.createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if(!user) {
            fetch(`${apiUrl}/profile`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            }).then((res) => res.json())
            .then((data) => {
                setUser(data);
            })
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
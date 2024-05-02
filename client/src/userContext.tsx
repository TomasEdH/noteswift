import React, { useEffect, useState } from "react";
import { type UserContextType, type User } from "./types";

export const UserContext = React.createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    console.log('user', user);
    useEffect(() => {
        if(!user) {
            const getUser = async () => {
                try {
                    const res = await fetch("http://localhost:1235/profile", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                    });
                    const data = await res.json();
                    setUser(data);
                    console.log('data contexto', data);
                } catch (err) {
                    console.log(err);
                }
            };
            getUser();
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
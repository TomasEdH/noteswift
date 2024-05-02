import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "./userContext";
import { UserContextType } from "./types";

export default function Login() {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { user, setUser } = useContext(UserContext) as UserContextType;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:1235/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });
            const data = await res.json();
            setUser(data);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <button type="submit">Send</button>
        </form>
        {user && JSON.stringify(user)}
        </>
    )
}
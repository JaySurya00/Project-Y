'use client'
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import useRequest from "../hooks/use-request";


const UserContext = createContext({});

export default function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            await getUser();
        };
        fetchUser();
    }, []);

    const getUser = async () => {
        try {
            const res = await axios.get('/api/users/currentuser');
            const user = res.data;
            setUser(user);
        }
        catch (error) {
            console.error("Failed to fetch user", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    const signout = async () => {
        try {
            await axios.post('/api/users/signout');
            setUser(null);
        } catch (error) {
            console.error("Failed to sign out", error);
        }
    };

    return (
        <UserContext.Provider value={{ user, loading, signout, getUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    return useContext(UserContext);
}

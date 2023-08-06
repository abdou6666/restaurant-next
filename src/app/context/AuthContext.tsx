"use client"
import React, { ReactNode, createContext, useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import { getCookie } from 'cookies-next';


type User = {
    id: number;
    firstName: string;
    lastName: string;
    city: string;
    email: string;
    phone: string;
}

interface State {
    loading: boolean;
    error: string | null;
    data: User | null;
}
interface AuthState extends State {
    setAuthState: React.Dispatch<React.SetStateAction<State>>
}

export const AuthenticationContext = createContext<AuthState>({
    loading: false,
    error: null,
    data: null,
    setAuthState: () => { }
})

export default function AuthContext({ children }: { children: ReactNode }) {
    const [authState, setAuthState] = useState<State>({
        loading: false,
        data: null,
        error: null
    })
    const fetchUser = async () => {
        try {
            setAuthState({
                data: null,
                error: null,
                loading: true
            })
            const jwt = getCookie('jwt')
            if (!jwt) {
                return setAuthState({
                    data: null,
                    error: null,
                    loading: false
                });
            }

            const res = await axios.post('http://localhost:3000/api/auth/me', {}, {
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            })

            axios.defaults.headers.common.Authorization = `Bearer ${jwt}`;

            setAuthState({
                data: res.data,
                loading: false,
                error: null
            })
        } catch (error: any) {
            setAuthState({
                data: null,
                error: error.response.data.errorMessage,
                loading: false
            })
        }
    }
    useEffect(() => {
        fetchUser();
    }, [])

    return (
        <AuthenticationContext.Provider value={{ ...authState, setAuthState }} >
            {children}
        </AuthenticationContext.Provider>
    )
}

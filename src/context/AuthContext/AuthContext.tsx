import React, { createContext, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import { AuthContextProviderProps, AuthContextType, UserTokenPayload } from '../../modules/Interfaces/AuthInterfaces';


export const Authcontext = createContext<AuthContextType | null>(null);
export default function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [loginData, setLoginData] = useState<UserTokenPayload | null>(null);
    const [role, setRole] = useState<string>('');
    const saveLoginData = () => {
        const encodedToken: string | null = localStorage.getItem('token');
        if (encodedToken) {
            try {
                const decodedToken = jwtDecode<UserTokenPayload>(encodedToken);
                if (decodedToken) {
                    setLoginData(decodedToken);
                    setRole(decodedToken.userGroup);
                    
                    
                }

            } catch (error) {
                console.error("Invalid token", error);
            }
        }
    }
    useEffect(() => {
        if (localStorage.getItem('token')) saveLoginData();
    },[])
    return (
        <Authcontext.Provider value={{ loginData, saveLoginData , role }}>
            {children}
        </Authcontext.Provider>
    );
}

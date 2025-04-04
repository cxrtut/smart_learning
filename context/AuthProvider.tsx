import { View, ActivityIndicator } from 'react-native';
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import React, { createContext, ReactNode, useContext, useEffect, useState, } from "react";


const AuthContext = createContext<{
    session: Session | null;
    user: Session['user'] | null;
    isAuthenticated: boolean;
    username: string;
    setUsername?: React.Dispatch<React.SetStateAction<string>>;
}>({
    session: null,
    user: null,
    isAuthenticated: false,
    username: '',
    setUsername: () => {}
});

export default function AuthProvider({children}: {children: ReactNode}) {
    const [session, setSession] = useState<Session | null>(null)
    const [isReady, setIsReady] = useState(false)
    const [username, setUsername] = useState('')

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setIsReady(true)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

    }, [])

    if (!isReady) {
        return (
            <>
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size='large' color='purple' />
                </View>
            </>
        )
    }

    return (
        <AuthContext.Provider value={{session, user: session?.user ?? null, isAuthenticated: !!session?.user, username, setUsername}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);
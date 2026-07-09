// contexts/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

interface AuthContextType {
    user: User | null;
    userData: UserData | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    userData: null,
    loading: true,
});

interface UserData {
    name: string;
    email: string;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setLoading(true);

            try {
                if (!currentUser) {
                    setUser(null);
                    setUserData(null);
                    return;
                }

                const token = await currentUser?.getIdToken();
                await fetch("/api/session",{
                    method: "POST",
                    headers: {
                        "Content-Type":"application/json",
                    },
                    body: JSON.stringify({
                        idToken: token,
                    }),
                })

                setUser(currentUser);
                const userDocRef = doc(db, "users", currentUser.uid);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    const data = userDocSnap.data() as UserData;
                    setUserData({
                        name: data.name || currentUser.displayName || "Creator",
                        email: currentUser.email || "",
                    });
                }
            } catch (error) {
                console.error(error);
                setUserData(null);
            } finally {
                setLoading(false);
            }
        });
        return () => unsubscribe(); // cleanup on unmount
    }, []);

    return (
        <AuthContext.Provider value={{ user, userData, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

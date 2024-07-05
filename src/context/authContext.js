"use client";

import { auth } from "@/config/firebase";
import { createContext, useState, useEffect, useContext } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoding, setIsLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
                setIsLoading(false);
            }
        })

        return unsub
    }, []);

    const login = async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password)
    }

    const signup = async (email, password, username) => {
        await createUserWithEmailAndPassword(auth, email, password).then(() => {
            updateProfile(currentUser, { displayName: username });
        });
    }

    const logout = async () => {
        await signOut(auth);
    }

    return (
        <AuthContext.Provider value={{ currentUser, login, signup, logout }}>
            {!isLoding && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}


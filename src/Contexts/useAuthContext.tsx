import { createContext, useContext, useEffect, useState } from "react";

import { auth, provider, userCredentialType, userType } from "../firebase";

export type AuthContextType = {
    currentUser: null | userType;
    signup: (email: string, password: string) => Promise<userCredentialType>;
    login: (email: string, password: string) => Promise<userCredentialType>;
    logout: () => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    signupWithGoogle: () => Promise<userCredentialType>;
    verifyEmail: () => Promise<void> | null;
} | null;

const AuthContext = createContext<AuthContextType>(null);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const [currentUser, setCurrentUser] = useState<userType | null>(null);
    const [loading, setLoading] = useState(true);

    const signup = (email: string, password: string) =>
        auth.createUserWithEmailAndPassword(email, password);

    const signupWithGoogle = () => auth.signInWithPopup(provider);

    const login = (email: string, password: string) =>
        auth.signInWithEmailAndPassword(email, password);

    const logout = () => auth.signOut();

    const forgotPassword = (email: string) =>
        auth.sendPasswordResetEmail(email);

    const verifyEmail = () =>
        currentUser && currentUser.sendEmailVerification();

    useEffect(() => {
        return auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });
    }, []);

    const value = {
        currentUser,
        signup,
        login,
        logout,
        forgotPassword,
        signupWithGoogle,
        verifyEmail,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

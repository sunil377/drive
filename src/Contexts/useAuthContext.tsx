import { createContext, useContext, useEffect, useState } from "react";
import { Auth, userType } from "../lib/firebase";

const AuthContext = createContext<AuthContextType>(null);

export const useAuth = () => {
    const user = useContext(AuthContext);
    return user && user.currentUser;
};

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const [currentUser, setCurrentUser] = useState<userType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        return Auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });
    }, []);

    const value = {
        currentUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// TYPE=======================================

export type AuthContextType = {
    currentUser: null | userType;
} | null;

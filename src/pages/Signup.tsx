import { FormEvent, useState } from "react";

import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../Contexts/useAuthContext";
import { useInputChange } from "../hooks/useInputChange";
import { Auth } from "../lib/firebase";

export default function Signup() {
    const email = useInputChange();
    const password = useInputChange();
    const confirmPassword = useInputChange();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const contextValue = useAuth();
    const history = useHistory();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (
            email.value.trim() &&
            password.value.trim() &&
            confirmPassword.value.trim() &&
            contextValue
        ) {
            if (password.value !== confirmPassword.value) {
                setLoading(false);
                return setError("Password don't match");
            }

            try {
                await Auth.createUserWithEmailAndPassword(
                    email.value,
                    password.value
                );
                history.push("/");
            } catch ({ message }) {
                setError(message);
                setLoading(false);
            }
        }
    };

    return (
        <div className="container mt-24 flex justify-center items-center">
            <div className="w-full max-w-xs sm:max-w-md mx-auto shadow-lg p-6 bg-white rounded-xl">
                {error && (
                    <h1 className="text-white text-center bg-red-400 rounded-md p-2 mb-2 font-semibold">
                        {error}
                    </h1>
                )}
                <form
                    className="flex flex-col space-y-3 w-full"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="email"
                        aria-label="enter email"
                        placeholder="Enter Email"
                        {...email}
                        autoFocus={true}
                        required
                        className="py-2 px-4 w-full border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                    />
                    <input
                        type="password"
                        {...password}
                        required
                        aria-label="enter password"
                        placeholder="Enter Password"
                        className="py-2 px-4 w-full border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                    />
                    <input
                        type="password"
                        aria-label="enter confirm password"
                        placeholder="Enter Confirm Password"
                        {...confirmPassword}
                        className="py-2 px-4 w-full border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                    />
                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full text-lg font-bold bg-blue-600 text-white px-3 py-2 rounded-md border border-transparent hover:border-blue-600 hover:text-blue-600 hover:bg-white"
                    >
                        Signup
                    </button>
                    <hr />
                    <div className="text-center">
                        <span className="text-sm font-light mr-2">
                            Already have a Account
                        </span>
                        <Link
                            to="/login"
                            className="text-blue-600 hover:text-blue-900"
                        >
                            Log In
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

import { FormEvent, useState } from "react";

import { useAuth } from "../Contexts/useAuthContext";
import { useInputChange } from "../hooks/useInputChange";
import { Auth } from "../lib/firebase";

const ForgotPassword = () => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const contextValue = useAuth();
    const email = useInputChange();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (contextValue && email.value.trim() !== "") {
            setLoading(true);
            try {
                await Auth.sendPasswordResetEmail(email.value);
                setMessage("check your email inbox for further instruction");
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
    };
    return (
        <div className="container">
            <div className="flex flex-col items-center justify-center mt-24 shadow-lg bg-white max-w-xs sm:max-w-md mx-auto rounded-lg p-6 space-y-2">
                {error && (
                    <div className="bg-red-400 w-full text-center rounded-md px-4 py-2 text-white">
                        {error}
                    </div>
                )}
                {message && (
                    <div className="bg-green-400 w-full text-center rounded-md px-4 py-2 text-white">
                        {message}
                    </div>
                )}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col space-y-4 w-full"
                >
                    <input
                        type="email"
                        aria-label="Enter Email"
                        placeholder="Enter Email"
                        required
                        autoFocus={true}
                        {...email}
                        className="border w-full rounded-md  bg-white border-gray-300 py-2 px-4  outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                    />

                    <button
                        disabled={loading}
                        type="submit"
                        className="bg-green-400 text-white rounded-md py-2 px-4 hover:bg-white hover:text-green-400 border border-transparent hover:border-green-400"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;

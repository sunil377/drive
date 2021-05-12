import { useState } from "react";
import { useAuth } from "../Contexts/useAuthContext";

export default function Profile() {
    const contextValue = useAuth();
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleVerifyEmail = async () => {
        setLoading(true);
        setError("");
        setMessage("");
        if (contextValue) {
            try {
                await contextValue.currentUser?.sendEmailVerification();
                setMessage("Check your Email inbox for further instructions");
            } catch ({ message }) {
                setError(message);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="container">
            <div className="flex flex-col items-center justify-center mt-24 bg-white  max-w-xs sm:max-w-md mx-auto shadow-lg rounded-lg p-6 space-y-2">
                <h1 className="text-lg">
                    <strong>Profile</strong>
                </h1>
                {error && (
                    <div className="bg-red-400 text-white py-2 px-4 rounded-md">
                        {error}
                    </div>
                )}
                {message && (
                    <div className="bg-green-400 text-white py-2 px-4 rounded-md">
                        {message}
                    </div>
                )}

                <div className="">
                    <strong className="text-blue-600"> Email: </strong>
                    {contextValue?.currentUser?.email}
                </div>

                {contextValue?.currentUser?.emailVerified ? (
                    <strong>Email verified</strong>
                ) : (
                    <button
                        disabled={loading}
                        className="bg-blue-600 px-4 py-2 text-white rounded-md hover:bg-white hover:text-blue-600 border border-transparent hover:border-blue-600"
                        onClick={handleVerifyEmail}
                    >
                        Verify Email
                    </button>
                )}
            </div>
        </div>
    );
}

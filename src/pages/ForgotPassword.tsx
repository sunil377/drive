import { FormEvent, useState } from "react";

import { useAuth } from "../Contexts/useAuthContext";
import { useInputChange } from "../hooks/useInputChange";
import { Auth } from "../lib/firebase";
import { alertStyle, btnStyleSuccess, cardStyle, inputStyle } from "../styles/style";

const ForgotPassword = () => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const currentUser = useAuth();
    const email = useInputChange();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (currentUser && email.value.trim() !== "") {
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
        <div className="container mt-24">
            <div className={cardStyle}>
                {error && (
                    <h1 className={alertStyle()} >
                        { error}
                    </h1>
                )}
                {message && (
                    <h1 className={alertStyle("bg-green-400")}>
                        {message}
                    </h1>
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
                        className={inputStyle}
                    />

                    <button
                        disabled={loading}
                        type="submit"
                        className={btnStyleSuccess + " w-full"}
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div >
    );
};

export default ForgotPassword;

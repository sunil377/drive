import { FormEvent, useState } from "react";

import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../Contexts/useAuthContext";
import { useInputChange } from "../hooks/useInputChange";
import { Auth } from "../lib/firebase";
import { alertStyle, btnStylePrimary, cardStyle, inputStyle, linkStyle } from "../styles/style";

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
            <div className={cardStyle}>
                {error && (
                    <h1 className={alertStyle()}>
                        {error}
                    </h1>
                )}
                <form
                    className="flex flex-col space-y-3"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="email"
                        aria-label="enter email"
                        placeholder="Enter Email"
                        {...email}
                        autoFocus={true}
                        required
                        className={inputStyle}
                    />
                    <input
                        type="password"
                        {...password}
                        required
                        aria-label="enter password"
                        placeholder="Enter Password"
                        className={inputStyle}
                    />
                    <input
                        type="password"
                        aria-label="enter confirm password"
                        placeholder="Enter Confirm Password"
                        {...confirmPassword}
                        className={inputStyle}
                    />
                    <button
                        disabled={loading}
                        type="submit"
                        className={btnStylePrimary}
                    >
                        Signup
                    </button>
                </form>

                <div className="text-center">
                    <span className="text-sm font-light">
                        Already have a Account
                        </span>
                    <Link
                        to="/login"
                        className={linkStyle}
                    >
                        Log In
                        </Link>
                </div>
            </div>
        </div>
    );
}

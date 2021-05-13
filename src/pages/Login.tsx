import { FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import GoogleSignInComponent from "../Components/Auth/GoogleSignInComponent";
import { useInputChange } from "../hooks/useInputChange";
import { Auth } from "../lib/firebase";
import { inputStyle, linkStyle, btnStylePrimary, btnStyleSuccess, alertStyle, cardStyle } from "../styles/style";

export default function Login() {
    const email = useInputChange();
    const password = useInputChange();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const history = useHistory();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        if (email.value.trim() && password.value.trim()) {
            try {
                await Auth.signInWithEmailAndPassword(
                    email.value,
                    password.value
                );
                history.push("/");
            } catch ({ message }) {
                console.log(message);
                setError(message);
                setLoading(false);
            }
        }
    };

    return (
        <div className="container flex justify-center items-center mt-24">
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
                        className={inputStyle}
                        {...email}
                        autoFocus
                        required
                    />

                    <input
                        type="password"
                        aria-label="enter password"
                        placeholder="Enter Password"
                        className={inputStyle}
                        {...password}
                        required
                    />
                    <button
                        type="submit"
                        className={btnStylePrimary}
                        disabled={loading}
                    >
                        Log In
                    </button>
                </form>
                <div className="text-center">
                    <Link
                        to="/forgotpassword"
                        className={linkStyle + " text-sm"}
                    >
                        Forgotten Password ?
                    </Link>
                </div>
                <hr />
                <Link
                    to="/signup"
                    className={btnStyleSuccess + " mx-auto"}
                >
                    Create New Account
                </Link>
            </div>
        </div>
    );
}

import { FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import GoogleSignInComponent from "../Components/Auth/GoogleSignInComponent";
import { useInputChange } from "../hooks/useInputChange";
import { Auth } from "../lib/firebase";

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
        <div className="container flex justify-center items-center  w-full mt-24">
            <div className="max-w-xs sm:max-w-md w-full shadow-xl bg-white flex space-y-3 flex-col p-6 rounded-xl mx-auto">
                {error && (
                    <h1 className="text-white text-center bg-red-400 rounded-md p-2 font-semibold">
                        {error}
                    </h1>
                )}
                <form
                    className="flex flex-col w-full space-y-3"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="email"
                        aria-label="enter email"
                        placeholder="Enter Email"
                        className="border w-full rounded-md bg-white  border-gray-300 py-2 px-4  outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                        {...email}
                        autoFocus
                        required
                    />

                    <input
                        type="password"
                        aria-label="enter password"
                        placeholder="Enter Password"
                        className="border w-full rounded-md  bg-white border-gray-300 py-2 px-4  outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                        {...password}
                        required
                    />
                    <button
                        type="submit"
                        className="border w-full border-transparent rounded-md  py-2 mx-auto  text-white bg-blue-600 hover:text-blue-600 hover:bg-white hover:border-blue-600 font-bold text-lg "
                        disabled={loading}
                    >
                        Log In
                    </button>
                </form>
                <div className="text-center">
                    <Link
                        to="/forgotpassword"
                        className="text-sm text-blue-500 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 border border-transparent rounded-md p-2 hover:text-blue-900"
                    >
                        Forgotten Password ?
                    </Link>
                </div>
                <hr />
                <Link
                    to="/signup"
                    className="bg-green-400 rounded-md py-2 px-4  text-white font-bold hover:bg-white hover:border-green-400 hover:text-green-500 border border-transparent mx-auto"
                >
                    Create New Account
                </Link>
            </div>
        </div>
    );
}

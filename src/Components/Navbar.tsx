import { NavLink, useHistory } from "react-router-dom";
import { useAuth } from "../Contexts/useAuthContext";
import { Auth } from "../lib/firebase";
import { navBtnStyle } from "../styles/style"

export default function Navbar() {
    const currentUser = useAuth();
    const history = useHistory();

    const handleClick = async () => {
        if (currentUser) {
            try {
                await Auth.signOut();
                history.push("/login");
            } catch ({ message }) {
                alert(message);
            }
        }
    };

    return (
        <div className="bg-gray-50 shadow-md">
            <div className="container mx-auto">
                <div className="flex justify-between p-2 w-full">
                    <NavLink
                        to="/"
                        className={navBtnStyle}
                    >
                        <strong>Google Drive Clone</strong>
                    </NavLink>

                    <div className="flex space-x-4 ">
                        {currentUser ? (
                            <>
                                <NavLink
                                    to="/profile"
                                    className={navBtnStyle}
                                >
                                    Profile
                                </NavLink>

                                <button
                                    onClick={handleClick}
                                    className={navBtnStyle}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink
                                    to="/signup"
                                    className={navBtnStyle}
                                >
                                    Sign Up
                                </NavLink>
                                <NavLink
                                    to="/login"
                                    className={navBtnStyle}
                                >
                                    Log In
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

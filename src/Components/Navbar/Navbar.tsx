import { NavLink, useHistory } from "react-router-dom";
import { useAuth } from "../../Contexts/useAuthContext";
import { Auth } from "../../lib/firebase";

export default function Navbar() {
    const contextValue = useAuth();
    const history = useHistory();

    const handleClick = async () => {
        if (contextValue?.currentUser) {
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
            <div className="container mx-auto ">
                <div className="flex justify-between p-2 w-full">
                    <NavLink
                        to="/"
                        className="py-2 px-4 rounded-md hover:bg-blue-600 hover:text-white"
                    >
                        <strong>Google Drive Clone</strong>
                    </NavLink>

                    <div className="flex space-x-4 ">
                        {contextValue?.currentUser ? (
                            <>
                                <NavLink
                                    to="/profile"
                                    className="py-2 px-2 rounded-md hover:bg-blue-600 hover:text-white"
                                >
                                    Profile
                                </NavLink>

                                <button
                                    onClick={handleClick}
                                    className="py-2 px-2 rounded-md hover:bg-blue-600 hover:text-white"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink
                                    to="/signup"
                                    className="py-2 px-2 rounded-md hover:bg-blue-600 hover:text-white"
                                >
                                    Sign Up
                                </NavLink>
                                <NavLink
                                    to="/login"
                                    className="py-2 rounded-md hover:bg-blue-600 hover:text-white px-2"
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

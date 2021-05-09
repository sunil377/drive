import { lazy, Suspense } from "react";
import { AuthProvider } from "../Contexts/useAuthContext";

//component

import Navbar from "./Navbar/Navbar";

//route

import Footer from "./Footer/Footer";
import { ErrorBoundary } from "../ErrorBoundary/ErrorBoundary";
import { SpinnerComponent } from "./Spinner/SpinnerComponent";
import PublicRoute from "./Auth/PublicRoute";
import PrivateRoute from "./Auth/PrivateRoute";
import Signup from "./Auth/Signup";
import { Switch } from "react-router";

// lazy loading

const Login = lazy(() => import("./Auth/Login"));
const ForgotPassword = lazy(() => import("./Auth/ForgotPassword"));
const Profile = lazy(() => import("./Auth/Profile"));

const Dashboard = lazy(() => import("./Drive/Dashboard"));

const App = () => {
    return (
        <AuthProvider>
            <>
                <Navbar />
                <ErrorBoundary>
                    <Suspense fallback={<SpinnerComponent />}>
                        <Switch>
                            <PublicRoute path="/login" component={Login} />
                            <PublicRoute path="/signup" component={Signup} />
                            <PublicRoute
                                path="/forgotpassword"
                                component={ForgotPassword}
                            />
                            <PrivateRoute
                                path="/profile"
                                exact
                                component={Profile}
                            />
                            <PrivateRoute
                                path="/folders/:id"
                                exact
                                component={Dashboard}
                            />
                            <PrivateRoute
                                path="/"
                                exact
                                component={Dashboard}
                            />
                        </Switch>
                    </Suspense>
                </ErrorBoundary>
                <Footer />
            </>
        </AuthProvider>
    );
};

export default App;

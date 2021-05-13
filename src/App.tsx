import { lazy, Suspense } from "react";
import { AuthProvider } from "./Contexts/useAuthContext";

//component

import Navbar from "./Components/Navbar";

//route

import { ErrorBoundary } from "./Components/ErrorBoundary";
import PublicRoute from "./Components/Auth/PublicRoute";
import PrivateRoute from "./Components/Auth/PrivateRoute";
import { Switch } from "react-router";
import Signup from "./pages/Signup";

// lazy loading

const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Profile = lazy(() => import("./pages/Profile"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

export default function App() {
    return (
        <AuthProvider>
            <ErrorBoundary>
                <Navbar />
                <Suspense fallback={<div>loading...</div>}>
                    <Switch>
                        <PublicRoute path="/login" component={Login} />
                        <PublicRoute path="/signup" component={Signup} />
                        <PrivateRoute
                            path="/profile"
                            exact
                            component={Profile}
                        />
                        <PublicRoute
                            path="/forgotpassword"
                            component={ForgotPassword}
                        />
                        <PrivateRoute
                            path="/folders/:id"
                            exact
                            component={Dashboard}
                        />
                        <PrivateRoute path="/" exact component={Dashboard} />
                    </Switch>
                </Suspense>
            </ErrorBoundary>
        </AuthProvider>
    );
}

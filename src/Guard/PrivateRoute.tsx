import { FC } from "react";
import { Redirect, Route, RouteComponentProps } from "react-router-dom";
import { useAuth } from "../Contexts/useAuthContext";

export default function PrivateRoute({ component: Component, ...rest }: {
    component: FC<RouteComponentProps>;
    path: string;
    exact?: boolean;
}) {
    const contextUser = useAuth();
    return (
        <Route
            {...rest}
            render={(props) => {
                return contextUser?.currentUser?.email ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/signup" />
                );
            }}
        />
    );
};


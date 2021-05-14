import { FC } from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import { useAuth } from "../Contexts/useAuthContext";

export default function PublicRoute({ component: Component, ...rest }: {
    component: FC<RouteComponentProps>;
    path: string;
}) {
    const contextValue = useAuth();

    return (
        <Route
            {...rest}
            render={(props) => {
                return contextValue?.currentUser?.email ? (
                    <Redirect to="/" />
                ) : (
                    <Component {...props} />
                );
            }}
        />
    );
};


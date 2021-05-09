import { FC } from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import { useAuth } from "../../Contexts/useAuthContext";

const PublicRoute: FC<{
    component: FC<RouteComponentProps>;
    path: string;
}> = ({ component: Component, ...rest }) => {
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

export default PublicRoute;

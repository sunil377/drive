import { FC } from "react";
import { Redirect, Route, RouteComponentProps } from "react-router-dom";
import { useAuth } from "../../Contexts/useAuthContext";

const PrivateRoute: FC<{
    component: FC<RouteComponentProps>;
    path: string;
    exact?: boolean;
}> = ({ component: Component, ...rest }) => {
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

export default PrivateRoute;

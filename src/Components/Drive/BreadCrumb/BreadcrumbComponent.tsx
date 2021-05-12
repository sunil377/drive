import { FC } from "react";
import { Link, useLocation } from "react-router-dom";

export const BreadcrumbComponent: BreadcrumbType = ({ currentFolderId }) => {
    const { state, pathname } =
        useLocation<null | { id: string; name: string }[]>();
    return (
        <div>
            <Link to="/">Root</Link>
            {state &&
                state.map((val) => (
                    <Link
                        key={val.id}
                        className="text-capitalize text-truncate"
                        to={{
                            pathname: `/folders/${val.id}`,
                            state: state.slice(
                                0,
                                state.findIndex((v) => v.id === val.id) + 1
                            ),
                        }}
                    >
                        {val.name}
                    </Link>
                ))}
        </div>
    );
};

type BreadcrumbType = FC<{
    currentFolderId: string | null;
}>;

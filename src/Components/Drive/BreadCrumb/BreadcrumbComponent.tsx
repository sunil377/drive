import { FC } from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export const BreadcrumbComponent: BreadcrumbType = ({ currentFolderId }) => {
    const { state, pathname } = useLocation<
        null | { id: string; name: string }[]
    >();
    return (
        <Breadcrumb>
            <Breadcrumb.Item
                active={pathname === "/"}
                linkAs={Link}
                linkProps={{
                    to: "/",
                }}
            >
                Root
            </Breadcrumb.Item>
            {state &&
                state.map((val) => (
                    <Breadcrumb.Item
                        active={val.id === currentFolderId}
                        key={val.id}
                        className="text-capitalize text-truncate"
                        style={
                            val.id != currentFolderId
                                ? { maxWidth: "150px" }
                                : {}
                        }
                        linkAs={Link}
                        linkProps={{
                            to: {
                                pathname: `/folders/${val.id}`,
                                state: state.slice(
                                    0,
                                    state.findIndex((v) => v.id === val.id) + 1
                                ),
                            },
                        }}
                    >
                        {val.name}
                    </Breadcrumb.Item>
                ))}
        </Breadcrumb>
    );
};

type BreadcrumbType = FC<{
    currentFolderId: string | null;
}>;

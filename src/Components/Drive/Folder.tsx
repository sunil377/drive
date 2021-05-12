import { Link, useLocation } from "react-router-dom";

const Folder = ({ id, name }: folderType) => {
    const { state } = useLocation<null | string[]>();

    const style = { maxWidth: "180px" };

    return (
        <Link
            to={{
                pathname: `/folders/${id}`,
                state: state ? [...state, { id, name }] : [{ id, name }],
            }}
            className="text-truncate text-capitalize"
            style={style}
        >
            folder icon {name}
        </Link>
    );
};

export default Folder;

export type folderType = {
    id: string;
    name: string;
};

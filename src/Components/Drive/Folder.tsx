import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const Folder = ({ id, name }: folderType) => {
    const { state } = useLocation<null | string[]>();

    const style = { maxWidth: "180px" };

    return (
        <Button
            as={Link}
            to={{
                pathname: `/folders/${id}`,
                state: state ? [...state, { id, name }] : [{ id, name }],
            }}
            variant="outline-secondary m-2"
            className="text-truncate text-capitalize"
            style={style}
        >
            <FontAwesomeIcon icon={faFolder} /> {name}
        </Button>
    );
};

export default Folder;

export type folderType = {
    id: string;
    name: string;
};

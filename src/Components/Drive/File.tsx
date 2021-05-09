import { useEffect, useState } from "react";
import { Col, Image as ImageComponent, Spinner } from "react-bootstrap";
import { SpinnerComponent } from "../Spinner/SpinnerComponent";

const File = ({ name, url }: fileType) => {
    const [loading, setLoading] = useState(true);
    const [pic, setPic] = useState<JSX.Element | null>(null);

    useEffect(() => {
        const i = new Image();

        const handle = () => {
            setLoading(false);
            setPic(<ImageComponent fluid src={url} alt={name} />);
            i.removeEventListener("load", handle);
        };

        i.addEventListener("load", handle);
        i.src = url;
    }, []);

    return (
        <Col xs={4} md={3}>
            <div
                style={{
                    maxHeight: "250px",
                    overflow: "hidden",
                    marginBottom: "1rem",
                }}
            >
                {loading ? <SpinnerComponent /> : pic}
            </div>
        </Col>
    );
};

export type fileType = {
    url: string;
    name: string;
};

export default File;

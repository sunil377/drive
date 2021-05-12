import { useEffect, useState } from "react";
const File = ({ name, url }: fileType) => {
    const [loading, setLoading] = useState(true);
    const [pic, setPic] = useState<JSX.Element | null>(null);

    useEffect(() => {
        const i = new Image();

        const handle = () => {
            setLoading(false);
            setPic(<img src={url} alt={name} />);
            i.removeEventListener("load", handle);
        };

        i.addEventListener("load", handle);
        i.src = url;
    }, []);

    return (
        <div
            style={{
                maxHeight: "250px",
                overflow: "hidden",
                marginBottom: "1rem",
            }}
        >
            {loading ? <div>loading...</div> : pic}
        </div>
    );
};

export type fileType = {
    url: string;
    name: string;
};

export default File;

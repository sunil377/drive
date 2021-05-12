import { createPortal } from "react-dom";
import { useAuth } from "../../../Contexts/useAuthContext";
import { ChangeEvent, lazy, useState } from "react";
import { upLoadTask } from "../../../lib/firebase";

const ToastComponent = lazy(() => import("../ToastComponent"));

const AddFile = ({ currentPath }: { currentPath: string[] }) => {
    const [uploadFiles, setUploadFiles] = useState<uploadFileType[]>([]);
    const contextValue = useAuth();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        import("../../Api/File/createFile").then((de) => {
            if (
                event.target.files &&
                event.target.files.length > 0 &&
                contextValue?.currentUser
            ) {
                de.createFile({
                    fileList: event.target.files,
                    currentPath,
                    currentUser: contextValue.currentUser,
                    setUploadFiles,
                });
            }
        });
    };

    return (
        <>
            {uploadFiles.length > 0 &&
                uploadFiles.map((e, i) =>
                    createPortal(
                        <ToastComponent
                            file={e}
                            index={i}
                            setUploadFiles={setUploadFiles}
                        />,
                        document.body
                    )
                )}

            <input
                type="file"
                id="file"
                className="upload"
                onChange={handleChange}
                accept="image/*"
            />
            <label htmlFor="file" className="btn btn-outline-success">
                <span className="sr-only">add Image</span>
                file upload
            </label>
        </>
    );
};

export type uploadFileType = {
    id: string;
    rate: number;
    name: string;
    failed: boolean;
    paused: boolean;
    upLoadTask: upLoadTask;
};
export default AddFile;

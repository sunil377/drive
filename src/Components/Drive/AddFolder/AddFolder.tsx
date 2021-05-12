import { FormEvent, useState, FC, useRef, Suspense, lazy } from "react";
import { useAuth } from "../../../Contexts/useAuthContext";

import { useInputChange } from "../../../hooks/useInputChange";

const ModalComponent = lazy(() => import("../../Modal/ModalComponent"));

const AddFolder: AddFolderType = ({ currentFolderId, currentPath }) => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const folderRef = useRef<HTMLInputElement>(null);
    const contextValue = useAuth();

    const folderName = useInputChange();

    const handleModalShow = () => {
        setShowModal(true);
        setTimeout(() => {
            folderRef.current && folderRef.current.focus();
        }, 0);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setError("");
    };

    const handleModalSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        import("../../Api/Folder/createFolder").then((de) => {
            if (contextValue?.currentUser) {
                const { uid } = contextValue.currentUser;
                de.createFolder(
                    folderName.value,
                    currentPath,
                    uid,
                    currentFolderId
                )
                    .then(handleModalClose)
                    .catch(setError)
                    .finally(() => setLoading(false));
            }
        });
    };

    return (
        <>
            <button onClick={handleModalShow}>
                <span className="sr-only">open Modal for Adding Folder</span>
                add folder
            </button>

            {showModal && (
                <ModalComponent
                    onSubmit={handleModalSubmit}
                    onCancel={handleModalClose}
                    loading={loading}
                >
                    <>
                        <label htmlFor="folderName">Folder Name: </label>
                        <input
                            id="folderName"
                            type="text"
                            required
                            ref={folderRef}
                            {...folderName}
                            autoFocus={true}
                        />
                    </>
                </ModalComponent>
            )}
        </>
    );
};

export default AddFolder;

type AddFolderType = FC<{
    currentFolderId: string | null;
    currentPath: string[];
}>;

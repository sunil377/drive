import { FormEvent, useState, FC, useRef } from "react";

import { useAuth } from "../Contexts/useAuthContext";
import { useInputChange } from "../hooks/useInputChange";
import { database } from "../lib/firebase";
import { alertStyle, btnStylePrimary, btnStyleSuccess, cardStyle, inputStyle } from "../styles/style";

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


        if (contextValue?.currentUser) {
            const { uid } = contextValue.currentUser;
            database.folders
                .where("path", "==", currentPath)
                .where("userId", "==", uid)
                .where("name", "==", folderName.value)
                .get()
                .then(({ docs }) =>
                    docs.forEach((doc) => {
                        if (doc.exists) {
                            throw new Error(`*${folderName.value} folder name  already exists`);
                        }
                    })
                )
                .then(() => {
                    database.folders
                        .add({
                            name: folderName.value,
                            userId: uid,
                            parentId: currentFolderId,
                            path: currentPath,
                            createdAt: database.getCurrentTimeStamp(),
                        })
                        .then(handleModalClose)
                        .catch(setError);
                })
                .catch(setError)
                .finally(() => setLoading(false));

        }

    };

    return (
        <>
            <button onClick={handleModalShow}>
                <span className="sr-only">open Modal for Adding Folder</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
            </button>

            {showModal && (
                <div className="w-full fixed mx-auto h-screen top-0 left-0 right-0 flex items-center justify-center bg-gray-600 bg-opacity-40">
                    <form onSubmit={handleModalSubmit} className={cardStyle}>
                        {
                            error && <h1 className={alertStyle()}>{error}</h1>
                        }
                        <input
                            type="text"
                            aria-label="Enter Folder Name"
                            placeholder="Enter Folder Name"
                            required
                            ref={folderRef}
                            {...folderName}
                            autoFocus={true}
                            className={inputStyle}
                        />
                        <button type="submit" disabled={loading} className={btnStylePrimary}>
                            Add Folder
                          </button>
                        <button onClick={handleModalClose} className={btnStyleSuccess}>Cancel</button>
                    </form>
                </div>
            )}
        </>
    );
};

export default AddFolder;

type AddFolderType = FC<{
    currentFolderId: string | null;
    currentPath: string[];
}>;

import { FormEvent, useState, FC, useRef, Suspense, lazy } from "react";
import { Button, Form } from "react-bootstrap";
import { useAuth } from "../../../Contexts/useAuthContext";
import { InvalidFeedbackComponent } from "../../InvalidFeedback/InvalidFeedbackComponent";
import { useInputChange } from "../../../hooks/useInputChange";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";

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
            <Button variant="outline-success mx-2" onClick={handleModalShow}>
                <span className="sr-only">open Modal for Adding Folder</span>
                <FontAwesomeIcon icon={faFolderPlus} />
            </Button>

            {showModal && (
                <ModalComponent
                    onSubmit={handleModalSubmit}
                    onCancel={handleModalClose}
                    loading={loading}
                >
                    <Form.Group>
                        <Form.Label htmlFor="folderName">
                            Folder Name:{" "}
                        </Form.Label>
                        <Form.Control
                            id="folderName"
                            type="text"
                            required
                            ref={folderRef}
                            isInvalid={error != ""}
                            {...folderName}
                            autoFocus={true}
                        />
                        <InvalidFeedbackComponent error={error} />
                    </Form.Group>
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

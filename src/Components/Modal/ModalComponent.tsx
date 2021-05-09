import { FC, FormEvent } from "react";
import { Modal, Form, Button } from "react-bootstrap";

type modalType = FC<{
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    onCancel: () => void;
    loading: boolean;
}>;

const ModalComponent: modalType = (props) => {
    return (
        <Modal show={true}>
            <Form onSubmit={props.onSubmit}>
                <Modal.Body>{props.children}</Modal.Body>
                <Modal.Footer>
                    <Button
                        type="submit"
                        variant="outline-success"
                        disabled={props.loading}
                    >
                        Add Folder
                    </Button>
                    <Button variant="outline-danger" onClick={props.onCancel}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default ModalComponent;

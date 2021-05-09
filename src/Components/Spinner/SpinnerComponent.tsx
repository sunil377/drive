import { Spinner } from "react-bootstrap";

export const SpinnerComponent = () => (
    <div className="d-flex justify-content-center align-items-center w-100">
        <Spinner role="status" animation="border" variant="primary">
            <span className="sr-only">loading...</span>
        </Spinner>
    </div>
);

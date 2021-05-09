import { Form } from "react-bootstrap";

export const InvalidFeedbackComponent = ({ error }: { error: string }) => {
    return (
        <Form.Control.Feedback type="invalid" className="text-capitalize">
            {error}
        </Form.Control.Feedback>
    );
};

import { FormEvent, useState } from "react";
import {
    Card,
    Form,
    Button,
    FormControl,
    FormGroup,
    FormLabel,
    Alert,
} from "react-bootstrap";
import { useAuth } from "../../Contexts/useAuthContext";
import { useInputChange } from "../../hooks/useInputChange";
import ContainerComponent from "./ContainerComponent";

const ForgotPassword = () => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const contextValue = useAuth();
    const email = useInputChange();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (contextValue && email.value.trim() !== "") {
            setLoading(true);
            try {
                await contextValue.forgotPassword(email.value);
                setMessage("check your email inbox for further instruction");
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
    };
    return (
        <ContainerComponent>
            <Card className="w-100" style={{ maxWidth: "400px" }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Forgot Password</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <FormLabel htmlFor="email">Email:</FormLabel>
                            <FormControl
                                type="email"
                                required
                                autoFocus={true}
                                {...email}
                            />
                        </FormGroup>
                        <Button
                            disabled={loading}
                            type="submit"
                            className="w-100 btn-lg"
                        >
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </ContainerComponent>
    );
};

export default ForgotPassword;

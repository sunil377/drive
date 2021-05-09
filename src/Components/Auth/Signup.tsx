import { FormEvent, useState } from "react";
import {
    Form,
    FormControl,
    FormGroup,
    FormLabel,
    Button,
    Card,
    Alert,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../Contexts/useAuthContext";
import { useInputChange } from "../../hooks/useInputChange";
import ContainerComponent from "./ContainerComponent";
import GoogleSignInComponent from "./GoogleSignInComponent";

const Signup = () => {
    const email = useInputChange();
    const password = useInputChange();
    const confirmPassword = useInputChange();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const contextValue = useAuth();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (
            email.value.trim() &&
            password.value.trim() &&
            confirmPassword.value.trim() &&
            contextValue
        ) {
            if (password.value !== confirmPassword.value) {
            	setLoading(false);
                return setError("Password don't match");
            }
            try {
                await contextValue.signup(email.value, password.value);
            } catch ({ message }) {
                setError(message);
                setLoading(false);
            }
        }
    };

    return (
        <ContainerComponent>
            <Card className="w-100" style={{ maxWidth: "400px" }}>
                <Card.Body>
                    <h2 className="text-center mt-2"> Sign Up </h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <FormLabel htmlFor="email">Email:</FormLabel>
                            <FormControl
                                id="email"
                                type="email"
                                {...email}
                                autoFocus={true}
                                required
                            ></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel htmlFor="password">Password:</FormLabel>
                            <FormControl
                                id="password"
                                type="password"
                                {...password}
                                required
                            ></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel htmlFor="confirm-password">
                                Confirm Password:
                            </FormLabel>
                            <FormControl
                                id="confirm-password"
                                type="password"
                                {...confirmPassword}
                                required
                            ></FormControl>
                        </FormGroup>
                        <Button
                            disabled={loading}
                            className="w-100 btn-lg"
                            type="submit"
                        >
                            Signup
                        </Button>
                    </Form>
                    <hr />
                    <div className="text-center m-2">
                        <GoogleSignInComponent />
                        <hr />
                        <span>
                            Already have a account{" "}
                            <Link to="/login">Log In </Link>
                        </span>
                    </div>
                </Card.Body>
            </Card>
        </ContainerComponent>
    );
};

export default Signup;

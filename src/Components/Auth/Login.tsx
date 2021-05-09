import { FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../Contexts/useAuthContext";

import { Alert, Button, Card, Form, InputGroup } from "react-bootstrap";
import ContainerComponent from "./ContainerComponent";
import GoogleSignInComponent from "./GoogleSignInComponent";
import { useInputChange } from "../../hooks/useInputChange";

const Login = () => {
    const email = useInputChange();
    const password = useInputChange();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const contextValue = useAuth();
    const history = useHistory();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        if (contextValue && email.value.trim() && password.value.trim()) {
            try {
                await contextValue.login(email.value, password.value);
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
                    <h2 className="text-center">Log In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label htmlFor="email">Email:</Form.Label>
                            <Form.Control
                                type="email"
                                id="email"
                                required
                                autoFocus={true}
                                {...email}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="password">
                                Password:
                            </Form.Label>

                            <Form.Control
                                id="password"
                                type="password"
                                required
                                {...password}
                            />
                        </Form.Group>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-100 btn-lg"
                        >
                            LogIn
                        </Button>
                    </Form>
                    <div className="mt-2 text-center">
                        <Link to="/forgotpassword">Forgotten Password ?</Link>
                    </div>
                    <hr />
                    <div className="mt-2 text-center">
                        <GoogleSignInComponent />
                        <hr />
                        <h4>
                            <Link to="/signup">Create New Account</Link>
                        </h4>
                    </div>
                </Card.Body>
            </Card>
        </ContainerComponent>
    );
};

export default Login;

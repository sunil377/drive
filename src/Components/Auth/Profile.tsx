import { useState } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import { useAuth } from "../../Contexts/useAuthContext";
import ContainerComponent from "./ContainerComponent";

const Profile = () => {
    const contextValue = useAuth();
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleVerifyEmail = async () => {
        setLoading(true);
        setError("");
        setMessage("");
        if (contextValue) {
            try {
                await contextValue.verifyEmail();
                setMessage("Check your Email inbox for further instructions");
            } catch ({ message }) {
                setError(message);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <ContainerComponent>
            <Card className="w-100" style={{ maxWidth: "400px" }}>
                <Card.Body className="text-center">
                    <h1>Profile</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <hr />
                    <div className="m2-4">
                        <strong className="text-primary"> Email: </strong>
                        {contextValue?.currentUser?.email}
                    </div>

                    {contextValue?.currentUser?.emailVerified ? (
                        <strong>Email verified</strong>
                    ) : (
                        <Button
                            variant="link"
                            disabled={loading}
                            onClick={handleVerifyEmail}
                        >
                            Verify Email
                        </Button>
                    )}
                </Card.Body>
            </Card>
        </ContainerComponent>
    );
};

export default Profile;

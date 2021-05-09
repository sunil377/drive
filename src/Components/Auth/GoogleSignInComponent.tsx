import { Button } from "react-bootstrap";
import { useState } from "react";
import { useAuth } from "../../Contexts/useAuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const GoogleSignInComponent = () => {
    const contextValue = useAuth();
    const [loading, setLoading] = useState(false);

    const handleGoogleSignUp = async () => {
        setLoading(true);
        try {
            await contextValue?.signupWithGoogle();
        } catch ({ message }) {
            alert(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button variant="outline-dark border-0" disabled={loading}>
            <FontAwesomeIcon
                icon={faGoogle}
                onClick={handleGoogleSignUp}
                size="2x"
            />
        </Button>
    );
};

export default GoogleSignInComponent;

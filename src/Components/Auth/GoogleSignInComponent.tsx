import { useState } from "react";
import { useHistory } from "react-router";
import { Auth, provider } from "../../lib/firebase";

const GoogleSignInComponent = () => {
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleGoogleSignUp = async () => {
        setLoading(true);
        try {
            await Auth.signInWithPopup(provider);
            history.push("/");
        } catch ({ message }) {
            alert(message);
        } finally {
            setLoading(false);
        }
    };

    return <button disabled={loading}>google icon</button>;
};

export default GoogleSignInComponent;

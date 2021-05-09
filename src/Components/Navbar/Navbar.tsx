import { FC } from "react";
import { Container, Button, Navbar, Nav } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import { useAuth } from "../../Contexts/useAuthContext";

const NavbarComponent: FC = () => {
    const contextValue = useAuth();
    const history = useHistory();

    const handleClick = async () => {
        if (contextValue?.currentUser) {
            try {
                await contextValue.logout();
                history.push("/login");
                return;
            } catch ({ message }) {
                alert(message);
            }
        }
    };

    return (
        <Container fluid>
            <Navbar bg="light">
                <Navbar.Brand as={NavLink} to="/">
                    Google Drive Clone
                </Navbar.Brand>
                <Nav className="ml-auto">
                    {contextValue && contextValue.currentUser ? (
                        <>
                            <Nav.Item>
                                <Nav.Link
                                    as={NavLink}
                                    to="/profile"
                                    className="mx-2"
                                >
                                    Profile
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item as={Button} onClick={handleClick}>
                                Logout
                            </Nav.Item>
                        </>
                    ) : (
                        <>
                            <Nav.Item>
                                <Nav.Link as={NavLink} to="/signup">
                                    SignUp
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={NavLink} to="/login">
                                    LogIn
                                </Nav.Link>
                            </Nav.Item>
                        </>
                    )}
                </Nav>
            </Navbar>
        </Container>
    );
};

export default NavbarComponent;

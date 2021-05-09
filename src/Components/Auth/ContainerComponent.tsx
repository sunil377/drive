import { Container } from "react-bootstrap";

const ContainerComponent = ({ children }: { children: JSX.Element }) => {
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "90vh" }}
        >
            {children}
        </Container>
    );
};

export default ContainerComponent;

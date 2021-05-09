import { FC } from "react";
import { Container } from "react-bootstrap";

const Footer: FC = () => {
    return (
        <Container
            fluid
            className="bg-light"
            style={{ position: "fixed", bottom: "0" }}
        >
            <p
                className="lead text-center my-0 text-capitalize"
                style={{ fontSize: "0.8rem" }}
            >
                made with love by sunil panwar
            </p>
        </Container>
    );
};

export default Footer;

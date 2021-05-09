import { Component } from "react";
import { Alert, Container } from "react-bootstrap";

export class ErrorBoundary extends Component {
    state = {
        hasError: false,
    };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        return this.state.hasError ? (
            <Container>
                <Alert variant="danger"> something error happen </Alert>
            </Container>
        ) : (
            this.props.children
        );
    }
}

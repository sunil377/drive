import { render } from "react-dom";
import App from "./Components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";

render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("root")
);

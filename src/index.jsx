import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.css";

render(
    <BrowserRouter>
        <h1>hello</h1>
    </BrowserRouter>,
    document.getElementById("root")
);

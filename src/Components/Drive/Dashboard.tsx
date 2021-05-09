import { lazy } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useFolder } from "../../hooks/useFolder";
import AddFile from "./AddFile/AddFile";
import AddFolder from "./AddFolder/AddFolder";
import { BreadcrumbComponent } from "./BreadCrumb/BreadcrumbComponent";

const Folder = lazy(() => import("./Folder"));
const File = lazy(() => import("./File"));

const Dashboard = () => {
    const { folders, selectedFolder, currentPath, files } = useFolder();

    return (
        <Container className="mb-2">
            <Row>
                <Col xs={9}>
                    <BreadcrumbComponent currentFolderId={selectedFolder} />
                </Col>
                <Col
                    xs={3}
                    className="d-flex justify-content-end align-items-start"
                >
                    <AddFile currentPath={currentPath} />
                    <AddFolder
                        currentFolderId={selectedFolder}
                        currentPath={currentPath}
                    />
                </Col>
            </Row>

            {folders.length > 0 &&
                folders.map(({ name, id }) => (
                    <Folder name={name} id={id} key={id} />
                ))}

            {folders.length > 0 && files.length > 0 && <hr />}

            <Row>
                {files.length > 0 &&
                    files.map(({ id, name, url }) => (
                        <File name={name} key={id} url={url} />
                    ))}
            </Row>
        </Container>
    );
};

export default Dashboard;

import { lazy } from "react";
import { useFolder } from "../../hooks/useFolder";
import AddFile from "./AddFile/AddFile";
import AddFolder from "./AddFolder/AddFolder";
import { BreadcrumbComponent } from "./BreadCrumb/BreadcrumbComponent";

const Folder = lazy(() => import("./Folder"));
const File = lazy(() => import("./File"));

const Dashboard = () => {
    const { folders, selectedFolder, currentPath, files } = useFolder();

    return (
        <>
            <BreadcrumbComponent currentFolderId={selectedFolder} />

            <AddFile currentPath={currentPath} />
            <AddFolder
                currentFolderId={selectedFolder}
                currentPath={currentPath}
            />

            {folders.length > 0 &&
                folders.map(({ name, id }) => (
                    <Folder name={name} id={id} key={id} />
                ))}

            {folders.length > 0 && files.length > 0 && <hr />}

            {files.length > 0 &&
                files.map(({ id, name, url }) => (
                    <File name={name} key={id} url={url} />
                ))}
        </>
    );
};

export default Dashboard;

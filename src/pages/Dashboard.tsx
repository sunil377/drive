import { useState, ChangeEvent } from "react";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";

import { upLoadTask } from "../lib/firebase";
import { useFolder } from "../hooks/useFolder";
import { useAuth } from "../Contexts/useAuthContext";

import AddFolder from "../Components/AddFolder";
import ProgressBar from "../Components/ProgressBar";

import handleCreateFile from "../helper/handleCreateFile";
import { folderIcon, uploadFileIcon } from "../asset/svg";
import style from "../styles/style";


export default function Dashboard(): JSX.Element {
    const { folders, selectedFolder, currentPath, files, error } = useFolder();
    const { state, pathname } = useLocation<null | { id: string; name: string; }[]>();
    const currentUser = useAuth();

    const [uploadFiles, setUploadFiles] = useState<uploadFileType[]>([]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        if (event.target.files &&
            event.target.files.length > 0 &&
            currentUser) {
            handleCreateFile({
                fileList: event.target.files,
                currentPath,
                currentUser,
                setUploadFiles,
            });
        }
    };

    return (
        <div className="container mx-auto mt-10">
            <div className="bg-gray-50 shadow-lg flex w-full justify-between items-center px-6 py-3 rounded-md">
                {/* BreadCrumb*/}
                <div className="flex">
                    <Link to="/" onClick={(e) => pathname === "/" && e.preventDefault()} className={
                        pathname === "/" ? "cursor-text" : " text-blue-400 hover:text-blue-800 "
                    } >Root</Link>

                    {state &&
                        state.map((val) => {
                            const active = val.id === selectedFolder;
                            const linkClass = active ? "cursor-text" : " text-blue-400 hover:text-blue-800"
                            const divClass = active ? "" : " truncate w-32 "
                            const to = {
                                pathname: `/folders/${val.id}`,
                                state: state.slice(
                                    0,
                                    state.findIndex((v) => v.id === val.id) + 1
                                ),
                            }
                            return (
                                <div key={val.id} className={divClass}>
                                    <span className="mx-2">&#10093;</span>
                                    <Link
                                        onClick={(e) => active && e.preventDefault()}
                                        className={linkClass}
                                        to={to}
                                    >
                                        {val.name}
                                    </Link>
                                </div>
                            );
                        })}
                </div>

                {/*  svg  icon  */}
                <div className="flex flex-shrink-0">
                    <input
                        type="file"
                        id="file"
                        className="w-0 h-0 upload"
                        onChange={handleChange}
                        accept="image/*" />
                    <label htmlFor="file" className="cursor-pointer mr-2">
                        <span className="sr-only">add Image</span>
                        {uploadFileIcon}
                    </label>
                    <AddFolder
                        currentFolderId={selectedFolder}
                        currentPath={currentPath} />
                </div>
            </div>

            {/* Folders */}

            {folders.length > 0 &&
                <div className="bg-white rounded-md flex flex-wrap p-6 shadow-md border-t">
                    {folders.map(({ name, id }) => {
                        const to = {
                            pathname: `/folders/${id}`,
                            state: state ? [...state, { id, name }] : [{ id, name }],
                        }
                        return (
                            <Link
                                to={to}
                                key={id}
                                className={style.folder}
                                style={{ maxWidth: "200px" }}
                            >
                                {folderIcon}
                                <span className="truncate">{name}</span>
                            </Link>
                        );
                    })}
                </div>
            }

            {/* Files */}

            {files.length > 0 ?
                <div className="grid grid-cols-4 md:grid-cols-6 p-6 bg-white mt-10 rounded-md gap-2">
                    {files.map(({ id, name, url }) => (
                        <img src={url} alt={name} key={id} />
                    ))}
                </div>
                : <div className="p-6 bg-white mt-10 rounded-md"> <h1>No File Added </h1></div>}

            {/* progress bar container */}

            {uploadFiles.length > 0 &&
                <div className="fixed w-full max-w-xs right-0 bottom-0 bg-white shadow-md rounded-md p-5 flex-col space-y-2">
                    {uploadFiles.map((e) => <ProgressBar
                        file={e}
                        key={e.id}
                        setUploadFiles={setUploadFiles} />
                    )}
                </div>
            }
        </div>
    );
}

export interface uploadFileType {
    id: string;
    rate: number;
    name: string;
    failed: boolean;
    paused: boolean;
    upLoadTask: upLoadTask;
};
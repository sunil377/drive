import { useState, ChangeEvent } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { upLoadTask } from "../lib/firebase";
import { useFolder } from "../hooks/useFolder";
import { useAuth } from "../Contexts/useAuthContext";

import AddFolder from "../Components/AddFolder";
import ProgressBar from "../Components/ProgressBar";

import handleCreateFile from "../helper/handleCreateFile";


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

            {/* BreadCrumb*/}

            <div className="bg-white shadow-lg flex w-full justify-between items-center px-6 py-3 rounded-md">
                <div className="flex-grow flex">
                    <Link to="/">Root</Link>
                    {state &&
                        state.map((val) => (
                            <div key={val.id}>
                                <span className="border border-blue-600 transform mx-2"></span>
                                <Link
                                    className="truncate"
                                    to={{
                                        pathname: `/folders/${val.id}`,
                                        state: state.slice(
                                            0,
                                            state.findIndex((v) => v.id === val.id) + 1
                                        ),
                                    }}
                                >
                                    {val.name}
                                </Link>
                            </div>
                        ))}
                </div>
                <div className="flex flex-shrink-0">
                    <input
                        type="file"
                        id="file"
                        className="w-0 h-0 upload"
                        onChange={handleChange}
                        accept="image/*" />
                    <label htmlFor="file" className="cursor-pointer mr-2">
                        <span className="sr-only">add Image</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                    </label>
                    <AddFolder
                        currentFolderId={selectedFolder}
                        currentPath={currentPath} />
                </div>
            </div>

            {/* Folders */}

            {folders.length > 0 &&
                <div className="bg-white mt-10 rounded-md grid grid-cols-4 gap-2 md:grid-cols-6 xl:grid-cols-8 p-6 shadow-md">
                    {folders.map(({ name, id }) => {
                        return (
                            <Link
                                to={{
                                    pathname: `/folders/${id}`,
                                    state: state ? [...state, { id, name }] : [{ id, name }],
                                }}
                                key={id}
                                className="flex text-gray-800 border-2 border-gray-800 rounded-md px-2 py-2 hover:bg-gray-800 hover:text-white"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                                </svg>
                                <span className="truncate">{name}</span>
                            </Link>
                        );
                    })}
                </div>
            }

            {/* Files */}

            {files.length > 0 &&
                <div className="grid grid-cols-4 md:grid-cols-6 p-6 bg-white mt-10 rounded-md gap-2">
                    {files.map(({ id, name, url }) => (
                        <img src={url} alt={name} key={id} />
                    ))}
                </div>
            }

            {/* progress bar container */}

            {uploadFiles.length > 0 &&
                <div className="fixed w-full max-w-xs right-0 bottom-0 bg-white shadow-md rounded-md p-5 flex-col space-y-2">

                    {uploadFiles.map((e, i) => <ProgressBar
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


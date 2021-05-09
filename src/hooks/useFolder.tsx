import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuth } from "../Contexts/useAuthContext";
import { database } from "../firebase";

export const useFolder = () => {
    const [folders, setFolders] = useState<folderType[]>([]);
    const [selectedFolder, setSelectedFolder] = useState<selectedFolderType>(
        null
    );
    const [currentPath, setCurrentPath] = useState<currentPathType>([]);
    const [files, setFiles] = useState<fileType[]>([]);

    const contextValue = useAuth();
    const { id: currentId } = useParams<{ id: string }>();

    useEffect(() => {
        setFiles([]);
        setFolders([]);
        setSelectedFolder(currentId ?? null);
    }, [currentId]);

    useEffect(() => {
        if (!currentId) {
            setCurrentPath([]);
        } else {
            const i = currentPath.findIndex((val: string) => val === currentId);
            const newPath =
                i > -1
                    ? currentPath.slice(0, i + 1)
                    : [...currentPath, currentId];
            setCurrentPath(newPath);
        }
    }, [currentId]);

    useEffect(() => {
        if (contextValue && contextValue.currentUser) {
            return database.folders
                .where("userId", "==", contextValue.currentUser.uid)
                .where("parentId", "==", selectedFolder)
                .orderBy("createdAt", "desc")
                .onSnapshot(
                    ({ docs }) => {
                        const f = docs.map((doc) => {
                            const h = doc.data();
                            setCurrentPath(h.path);
                            const data: folderType = {
                                id: doc.id,
                                name: h.name,
                                parentId: h.parentId,
                                userId: h.userId,
                                path: h.path,
                                createdAt: h.createdAt,
                            };
                            return data;
                        });
                        setFolders(f);
                    },
                    (err) => {
                        console.log(err);
                    }
                );
        }
    }, [selectedFolder, contextValue && contextValue.currentUser]);

    useEffect(() => {
        if (contextValue && contextValue.currentUser) {
            return database.files
                .where("userId", "==", contextValue.currentUser.uid)
                .where("path", "==", currentPath)
                .orderBy("createdAt", "desc")
                .onSnapshot(
                    ({ docs }) => {
                        const f = docs.map((doc) => {
                            const data = doc.data();
                            return {
                                id: doc.id,
                                name: data.name,
                                url: data.url,
                                path: data.path,
                                type: data.type,
                                userId: data.userId,
                            };
                        });
                        setFiles(f);
                    },
                    (err) => {
                        console.log(err);
                    }
                );
        }
    }, [currentPath, contextValue && contextValue.currentUser]);

    return {
        folders,
        selectedFolder,
        currentPath,
        files,
    };
};

export type folderType = {
    id: string;
    name: string;
    parentId: string | null;
    userId: string;
    path: [string];
    createdAt: string;
};

export type selectedFolderType = string | null;
export type currentPathType = string[];

export type fileType = {
    id: string;
    name: string;
    url: string;
    path: [string];
    type: string;
    userId: string;
};

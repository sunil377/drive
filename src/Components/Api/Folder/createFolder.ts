import { database } from "../../../lib/firebase";

export const createFolder = (
    name: string,
    path: string[],
    uid: string,
    currentFolderId: string | null
) => {
    return new Promise((res, rej) => {
        database.folders
            .where("path", "==", path)
            .where("userId", "==", uid)
            .where("name", "==", name)
            .get()
            .then(({ docs }) =>
                docs.forEach((doc) => {
                    if (doc.exists) {
                        throw `*${name} folder name  already exists`;
                    }
                })
            )
            .then(() => {
                database.folders
                    .add({
                        name: name,
                        userId: uid,
                        parentId: currentFolderId,
                        path: path,
                        createdAt: database.getCurrentTimeStamp(),
                    })
                    .then(res)
                    .catch(rej);
            })
            .catch(rej);
    });
};

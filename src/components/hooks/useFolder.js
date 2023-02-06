import { useEffect, useReducer } from "react";
import { database } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";

const ACTION = {
    SELECT_FOLDER: "select-folder",
    UPDATE_FOLDER: "update-folder",
    SET_CHILD_FOLDERS: "set-child-folders",
    SET_CHILD_FILES: "set-child-files",
};

export const ROOT_FOLDER = { name: "Root", id: null, path: [] };

function reducer(state, { type, payload }) {
    switch (type) {
        case ACTION.SELECT_FOLDER:
            return {
                folderId: payload.folderId,
                folder: payload.folder,
                childFolders: [],
                childFile: [],
            };
        case ACTION.UPDATE_FOLDER:
            return {
                ...state,
                folder: payload.folder,
            };
        case ACTION.SET_CHILD_FOLDERS:
            // console.log("helo", payload.childFolders);
            return {
                ...state,
                childFolders: payload.childFolders,
            };
        case ACTION.SET_CHILD_FILES:
            // console.log("helo", payload.childFolders);
            return {
                ...state,
                childFiles: payload.childFiles,
            };
        default:
            return state;
    }
}

export function useFolder(folderId = null, folder = null) {
    // if it is left empty the default value will be UNDEFINED and
    // FIREBASE dosent like UNDEFINED so it will give error with UNDEFINED
    // but work fine with  NULL
    const { currentUser } = useAuth();
    const [state, dispatch] = useReducer(reducer, {
        folderId,
        folder,
        childFolders: [],
        childFiles: [],
    });
    useEffect(() => {
        dispatch({
            type: ACTION.SELECT_FOLDER,
            payload: {
                folderId,
                folder,
            },
        });
    }, [folderId, folder]);

    useEffect(() => {
        if (folderId == null) {
            return dispatch({
                type: ACTION.UPDATE_FOLDER,
                payload: { folder: ROOT_FOLDER },
            });
        }
        database.folders
            .doc(folderId)
            .get()
            .then((doc) => {
                // const formattedDoc = {
                //     id: doc.id,
                //     ...doc.data(),
                // };
                dispatch({
                    type: ACTION.UPDATE_FOLDER,
                    payload: { folder: database.formatDoc(doc) },
                });
            })
            .catch((e) => {
                console.error(e);
                dispatch({
                    type: ACTION.UPDATE_FOLDER,
                    payload: { folder: ROOT_FOLDER },
                });
            });
    }, [folderId]);

    useEffect(() => {
        const cleanup = database.folders
            .where("parentId", "==", folderId)
            .where("userId", "==", currentUser.uid)
            .orderBy("createdAt")
            .onSnapshot((snapshot) => {
                dispatch({
                    type: ACTION.SET_CHILD_FOLDERS,
                    payload: {
                        // childFolders: snapshot.doc.map((each) =>
                        //     database.formatDoc(each)
                        // ),
                        childFolders: snapshot.docs.map(database.formatDoc), // ye maybe wrong hei
                    },
                });
            });
        return cleanup;
    }, [folderId, currentUser]);

    useEffect(() => {
        const cleanup = database.files
            .where("folderId", "==", folderId)
            .where("userId", "==", currentUser.uid)
            // .orderBy("createdAt")
            .onSnapshot((snapshot) => {
                dispatch({
                    type: ACTION.SET_CHILD_FILES,
                    payload: {
                        // childFolders: snapshot.doc.map((each) =>
                        //     database.formatDoc(each)
                        // ),
                        childFiles: snapshot.docs.map(database.formatDoc), // ye maybe wrong hei
                    },
                });
            });
        return cleanup;
    }, [folderId, currentUser]);
    // console.log("state", state);
    return state;
}

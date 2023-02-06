import React from "react";
import Navbar from "./Navbar";
import { Container } from "react-bootstrap";
import AddFolderButton from "./google-drive/AddFolderButton";
import AddFileButton from "./google-drive/AddFileButton";
import Folder from "./google-drive/Folder";
import File from "./google-drive/File";
import FolderBreadcrums from "./google-drive/FolderBreadcrums";

import { useFolder } from "./hooks/useFolder";

import { useParams } from "react-router-dom";

const Dashboard = () => {
    const { folderId } = useParams();
    const { folder, childFolders, childFiles } = useFolder(folderId);
    // console.log(childFolders);
    // console.log(childFiles);
    if (childFolders == null || childFiles == null) {
        return <div>Loading</div>;
    }
    // console.log(childFolders);
    return (
        <>
            <Navbar />
            <Container fluid>
                <div className="d-flex align-items-center">
                    <FolderBreadcrums currentFolder={folder} />
                    <AddFileButton currentFolder={folder} />
                    <AddFolderButton currentFolder={folder} />
                </div>
                {/* {folder && <Folder folder={folder} />} */}
                {childFolders.length > 0 && (
                    <div className="d-flex flex-wrap">
                        {childFolders.map((childFolder) => {
                            return (
                                <div
                                    key={childFolder.id}
                                    stype={{ maxWidth: "250px" }}
                                    className="p-2"
                                >
                                    <Folder folder={childFolder} />
                                </div>
                            );
                        })}
                    </div>
                )}
                {childFiles.length > 0 && childFolders.length > 0 && <hr />}
                {childFiles.length > 0 && (
                    <div className="d-flex flex-wrap">
                        {childFiles.map((childFile) => {
                            return (
                                <div
                                    key={childFile.id}
                                    stype={{ maxWidth: "250px" }}
                                    className="p-2"
                                >
                                    <File file={childFile} />
                                </div>
                            );
                        })}
                    </div>
                )}
            </Container>
        </>
    );
};

export default Dashboard;

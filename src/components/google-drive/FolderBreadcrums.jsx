import React from "react";
import { Breadcrumb, BreadcrumbItem } from "react-bootstrap";
import { ROOT_FOLDER } from "../hooks/useFolder";
import { Link } from "react-router-dom";

const FolderBreadcrums = ({ currentFolder }) => {
    let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
    if (currentFolder) path = [...path, ...currentFolder.path];
    // console.log(currentFolder.path);

    return (
        <Breadcrumb
            className="flex-grow-1 m-0"
            listProps={{ className: "bg-white p-0 m-0" }}
        >
            {[...path].map((folder, index) => {
                return (
                    <Breadcrumb.Item
                        key={folder.id}
                        className="text-truncate d-inline-block"
                        linkAs={Link}
                        linkProps={{
                            to: folder.id ? `/folder/${folder.id}` : "/",
                        }}
                        style={{ maxWidth: "200px" }}
                    >
                        {folder.name}
                    </Breadcrumb.Item>
                );
            })}
            {currentFolder && (
                <Breadcrumb.Item
                    className="text-truncate d-inline-block"
                    style={{ maxWidth: "200px" }}
                    active
                >
                    {currentFolder.name}
                </Breadcrumb.Item>
            )}
        </Breadcrumb>
    );
};

export default FolderBreadcrums;

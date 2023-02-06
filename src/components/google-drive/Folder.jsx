import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";

const Folder = ({ folder }) => {
    return (
        <>
            <Button
                to={`/folder/${folder.id}`}
                className="btn btn-primary"
                variant="outline-dark"
                as={Link}
            >
                <FontAwesomeIcon icon={faFolder} />
                {folder.name}
            </Button>
        </>
    );
};

export default Folder;

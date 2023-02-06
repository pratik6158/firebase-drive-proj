import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";

const Profile = () => {
    const { logout, currentUser } = useAuth();
    const [error, setError] = useState("");
    const navigateTo = useNavigate();
    const [loading, setLoading] = useState(false);
    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            setError("");
            setLoading(true);
            await logout();
            navigateTo("/login");
        } catch (error) {
            setError("Failed to Logout");
            console.log(error);
        }
        setLoading(false);
    };
    if (loading) {
        return <div>Loading</div>;
    }
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email:</strong>
                    {/* {console.log(JSON.stringify(currentUser))} */}
                    {currentUser.email}
                    <Link
                        to="/update-profile"
                        className="btn btn-primary w-100 mt-3"
                    >
                        Update Profile
                    </Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>
                    Log Out
                </Button>
            </div>
        </>
    );
};

export default Profile;

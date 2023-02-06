import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { Link } from "react-router-dom";
import CenteredContainer from "./CenteredContainer.jsx";

const Signup = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { signup, currentUser } = useAuth();
    async function handleSubmit(e) {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Password do not match");
        }
        try {
            setError("");
            setLoading(true);
            console.log(emailRef.current.value, passwordRef.current.value);
            signup(emailRef.current.value, passwordRef.current.value);
        } catch {
            setError("Failed to Create Account");
        }
        setLoading(false);
    }
    if (loading) {
        return <div>Loading</div>;
    }
    return (
        <CenteredContainer>
            <Card>
                <Card.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {currentUser && currentUser.email}
                    <h2 className="text-center mb-4">Sign Up</h2>
                    <Form>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                ref={emailRef}
                                required
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                ref={passwordRef}
                                required
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password-Confirm</Form.Label>
                            <Form.Control
                                type="password"
                                ref={passwordConfirmRef}
                                required
                            ></Form.Control>
                        </Form.Group>
                        <Button
                            type="submit"
                            onClick={handleSubmit}
                            className="w-100"
                        >
                            Sign Up
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account?
                <Link to="/login">Login</Link>
            </div>
        </CenteredContainer>
    );
};

export default Signup;

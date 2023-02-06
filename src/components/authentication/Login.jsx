import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import CenteredContainer from "./CenteredContainer.jsx";
const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigateTo = useNavigate();

    const { login, currentUser } = useAuth();
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError("");
            setLoading(true);
            console.log(emailRef.current.value, passwordRef.current.value);
            await login(emailRef.current.value, passwordRef.current.value);
            navigateTo("/user");
        } catch (error) {
            setError("Failed to login");
            console.log(error);
            navigateTo("/login");
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
                    <h2 className="text-center mb-4">Login</h2>
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

                        <Button
                            type="Login"
                            onClick={handleSubmit}
                            className="w-100"
                        >
                            Login
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Create a new account?
                <Link to="/signup">Sign-up</Link>
            </div>
            <div className="w-100 text-center mt-2">
                <Link to="/forgot-password">Forgot Password</Link>
            </div>
        </CenteredContainer>
    );
};

export default Login;

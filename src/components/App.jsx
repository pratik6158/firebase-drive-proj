import React from "react";
import Signup from "./authentication/Signup";
import Profile from "./authentication/Profile";
import Login from "./authentication/Login";
import ForgotPassword from "./authentication/ForgotPassword";
import PrivateRoute from "./authentication/PrivateRoute";
import UpdateProfile from "./authentication/UpdateProfile";
import InvalidPath from "./InvalidPath";
import Dashboard from "./Dashboard";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    {/* Drive Route */}
                    <Route element={<PrivateRoute />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route
                            exact
                            path="/folder/:folderId"
                            element={<Dashboard />}
                        />
                    </Route>
                    {/* AUTH ROUTE */}
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />
                    {/* PRIVATE ROUTE */}
                    <Route element={<PrivateRoute />}>
                        <Route path="/user" element={<Profile />} />
                        <Route
                            path="/update-profile"
                            element={<UpdateProfile />}
                        />
                    </Route>
                    <Route path="*" element={<InvalidPath />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;

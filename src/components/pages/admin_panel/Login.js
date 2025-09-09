// src/pages/Login.jsx
import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Alert,
  InputGroup,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import InnerBanner from '../../InnerBanner';
import axios from "axios";
import Header from "../../Header";
import Footer from "../../Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ success: null, message: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // const res = await axios.post("http://localhost:5000/api/auth/login", {
      const res = await axios.post("https://prvaas-demo-production.up.railway.app/api/auth/login", {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setStatus({ success: true, message: res.data.message });

        // Navigate to home after short delay
        setTimeout(() => {
          navigate("/admin_panel/Dashboard");
        }, 1500);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "❌ Login failed!";
      setStatus({ success: false, message: msg });
    }
  };

  return (
    <>
    <Header />
      <InnerBanner />
      <div className="login-bg">
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
          <div className="login-card">
            <h2 className="text-center login-title">Login</h2>

            {status.message && (
              <Alert variant={status.success ? "success" : "danger"}>
                {status.message}
              </Alert>
            )}

            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaUser /></InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder="Type your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaLock /></InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="Type your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </InputGroup>
              </Form.Group>

              <div className="text-end mb-3">
                <span className="forgot-password">Forgot password?</span>
              </div>

              <Button type="submit" className="login-btn w-100">
                LOGIN
              </Button>
            </Form>

            <div className="text-center mt-4">Don't have an account?</div>
            <div className="signup-link text-center mt-2">
              <Link to="/admin_panel/signup" className="text-decoration-none">SIGN UP</Link>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Login;

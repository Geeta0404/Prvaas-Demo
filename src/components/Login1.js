import React, { useState } from "react";
import { useNavigate, useLocation ,Link } from "react-router-dom";
import { Container, Form, Button, Alert, Row, Col, InputGroup, } from "react-bootstrap";
import { FaUser, FaLock, FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa";
import InnerBanner from './InnerBanner';
import Signup from './Signup';



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.redirectTo || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@example.com" && password === "admin123") {
      localStorage.setItem("user", "true");
      navigate(redirectTo);
    } else {
      setShowError(true);
    }
  };

  return (
    <>
      <InnerBanner />
      <div className="login-bg">
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
          <div className="login-card">
            <h2 className="text-center login-title">Login</h2>

            {showError && <Alert variant="danger">Invalid credentials</Alert>}

            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaUser /></InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Type your username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-2">
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

            {/* <div className="text-center mt-4">Or Sign Up Using</div>
            <div className="d-flex justify-content-center gap-3 mt-3">
              <div className="social-icon fb"><FaFacebookF /></div>
              <div className="social-icon tw"><FaTwitter /></div>
              <div className="social-icon gl"><FaGoogle /></div>
            </div> */}

            <div className="text-center mt-4"> Don't have an account? </div>
            <div className="signup-link text-center mt-2"> <Link to="/signup" className="text-decoration-none">SIGN UP</Link></div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Login;

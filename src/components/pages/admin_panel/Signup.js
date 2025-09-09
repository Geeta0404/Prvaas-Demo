// src/pages/SignUp.jsx
import React, { useState } from "react";
import { Container, Form, Button, Alert, Row, Col, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import InnerBanner from "../../InnerBanner";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaLock,
  FaRegCommentDots,
} from "react-icons/fa";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    message: "",
  });

  const [status, setStatus] = useState({ success: null, message: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setStatus({ success: false, message: "❌ Passwords do not match!" });
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name: formData.fullName,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password,
        message: formData.message,
      });

      alert(res.data.message);
      setStatus({ success: true, message: "" });

      setFormData({
        fullName: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
        message: "",
      });

      setTimeout(() => {
        navigate("/admin_panel/login");
      }, 1500);
    } catch (error) {
      const msg = error.response?.data?.message || "❌ Registration failed!";
      setStatus({ success: false, message: msg });
    }
  };

  return (
    <>
      <InnerBanner />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh", padding: "20px" }}
      >
        <Container
          style={{
            maxWidth: "700px",
            backgroundColor: "#fff",
            padding: "40px",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          <h2 className="text-center mb-4">Sign Up</h2>

          {status.message && !status.success && (
            <Alert variant="danger">{status.message}</Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FaUser /></InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FaEnvelope /></InputGroup.Text>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Mobile Number</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FaPhoneAlt /></InputGroup.Text>
                    <Form.Control
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="9876543210"
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FaLock /></InputGroup.Text>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter password"
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FaLock /></InputGroup.Text>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-type password"
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group className="mb-4">
                  <Form.Label>Message</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FaRegCommentDots /></InputGroup.Text>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write a message or note"
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            {/* ✅ Corrected button - no <Link> inside */}
            <Button type="submit" className="login-btn w-100 btn btn-primary">
              SIGN UP
            </Button>
          </Form>

          <div className="text-center mt-4">Already have an account?</div>
          <div className="text-center">
            <Link to="/admin_panel/login">LOGIN</Link>
          </div>
        </Container>
      </div>
    </>
  );
};

export default SignUp;

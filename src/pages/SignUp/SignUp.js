import React, { useState } from "react";
import axios from "axios";
import { APIURL } from "../../utils/api";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import {
  Image,
  Button,
  Container,
  Row,
  Col,
  Form,
  Card,
} from "react-bootstrap";
import card from "../../assets/images/card4.svg";
import Logo from "../../assets/images/logo.avif";
import "./signup.css";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [err, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_-]{2,15}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const mobileRegex = /^\d{10}$/;

    if (!usernameRegex.test(username)) {
      enqueueSnackbar("Invalid username.", { variant: "warning" });
      return;
    }

    if (!mobileRegex.test(mobile)) {
      enqueueSnackbar("Invalid mobile number.", { variant: "warning" });
      return;
    }

    if (!passwordRegex.test(password)) {
      enqueueSnackbar("Invalid password.", { variant: "warning" });
      return;
    }

    try {
      await axios.post(`${APIURL}/signup`, {
        username,
        password,
        email,
        mobileNumber: mobile,
      });
      setError("");
      enqueueSnackbar("Account Created Successfully 🎉", {
        variant: "success",
      });
      navigate(`/`);
    } catch (error) {
      const errorMessage = error.response?.data?.error || "An error occurred";
      setError(errorMessage);
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  return (
    <Container fluid className="signup-container">
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col xs={12} sm={6} md={6} lg={5} className="text-center mb-4 mb-md-0">
          <Image src={card} alt="Card Image" className="card-image img-fluid" />
        </Col>
        <Col xs={12} md={6} lg={6}>
          <Card className="signup-card p-4">
            <Card.Header className="bg-white border-0 text-center">
              <Image src={Logo} alt="Logo" className="logo-image mb-3" />
              <h1 className="welcome-title mb-2">
                <span className="text-gradient-left">Create</span>{" "}
                <span className="text-gradient-right">Account</span>
              </h1>
              <p className="subtitle mb-4">
                Unlock endless possibilities today!
              </p>
            </Card.Header>
            <Card.Body>
              {err && <p className="error-message text-danger">{err}</p>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="Enter your username"
                    className="input-field"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                    className="input-field"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                    placeholder="Enter your mobile number"
                    className="input-field"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    className="input-field"
                  />
                </Form.Group>
                <Button type="submit" className="btn signup-btn w-100">
                  Sign Up
                </Button>
              </Form>
              <div className="mt-4 text-center">
                <p className="signup-text">
                  Already have an account?{" "}
                  <a href="/" className="signup-link">
                    Login
                  </a>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpForm;

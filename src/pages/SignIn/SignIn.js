import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { Image, Button, Container, Row, Col, Card } from "react-bootstrap";
import { APIURL } from "../../utils/api";
import Logo from "../../assets/images/logo.avif";
import card from "../../assets/images/card3.svg";
import "./signin.css";

const LoginForm = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${APIURL}/signin`, {
        password,
        email,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      enqueueSnackbar("Login Successful 🎉", { variant: "success" });
      navigate(`/getEmployeeData/employees`);
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.error || "An error occurred";
        console.log("errorMessage: ", errorMessage);
        setError(errorMessage);
        enqueueSnackbar(errorMessage, { variant: "error" });
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <Container fluid className="login-container">
      <Row className="justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Col xs={12} md={6} lg={4} className="mb-4 mb-lg-0 text-center">
          <Image src={card} alt="Card Image" className="card-image" />
        </Col>
        <Col xs={12} md={6} lg={5} className="text-center">
          <Card className="login-card">
            <Card.Header className="bg-transparent border-0 text-center">
              <Image src={Logo} alt="Logo" className="logo-image mb-3" />
              <h1 className="welcome-title mb-2">
                <span className="text-gradient-left">Welcome</span> <span className="text-gradient-right">Back!</span>
              </h1>
              <h2 className="subtitle mb-4">Please log in to access your account</h2>
            </Card.Header>
            <Card.Body>
              {error && <p className="error-message">{error}</p>}
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control input-field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="btn login-btn w-100">Login</Button>
                <div className="mt-4">
                  <p className="signup-text">
                    Don’t have an account? <a href="/signup" className="text-decoration-none signup-link">Sign Up</a>
                  </p>
                </div>
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;

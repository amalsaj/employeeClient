import React, { useState } from "react";
import axios from "axios";
import { APIURL } from "../../utils/api";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { Image, Button, Container, Row, Col, Card } from "react-bootstrap";
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

    // Check username validity
    if (!usernameRegex.test(username)) {
      const errorMessage =
        "Your username should start with a letter and be 3 to 16 characters long, allowing letters, numbers, underscores, and hyphens.";
      enqueueSnackbar(errorMessage, { variant: "warning" });
      return;
    }

    // Check mobile number validity
    if (!mobileRegex.test(mobile)) {
      const errorMessage = "Please enter a valid 10-digit mobile number.";
      enqueueSnackbar(errorMessage, { variant: "warning" });
      return; // Exit the function if validation fails
    }

    if (!passwordRegex.test(password)) {
      const errorMessage =
        "Your password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.";
      enqueueSnackbar(errorMessage, { variant: "warning" });
      return; // Exit the function if validation fails
    }

    try {
      const response = await axios.post(`${APIURL}/signup`, {
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
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.error || "An error occurred";
        setError(errorMessage);
        enqueueSnackbar(`${errorMessage}`, { variant: "error" });
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <Container fluid className="signup-container">
      <Row
        className="align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <Col xs={12} md={4} lg={4} className="text-center">
          <Image src={card} alt="Card Image" className="card-image" />
        </Col>
        <Col xs={12} md={8} lg={6} className="text-center">
          <Card className="signup-card p-4">
            <Card.Header className="bg-white border-0 text-center">
              <Image src={Logo} alt="Logo" className="logo-image mb-3" />
              <h1 className="welcome-title mb-2">
                <span className="text-gradient-left">Create</span>{" "}
                <span className="text-gradient-right">Account</span>
              </h1>
              <h2 className="subtitle mb-4">
                Join us today to unlock endless possibilities!
              </h2>
            </Card.Header>
            <Card.Body>
              {err && <p className="error-message">{err}</p>}
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                  <label htmlFor="username" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="form-control input-field"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control input-field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="mobile" className="form-label">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    id="mobile"
                    className="form-control input-field"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="btn signup-btn w-100">
                  Sign Up
                </Button>
              </form>
              <div className="mt-4">
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

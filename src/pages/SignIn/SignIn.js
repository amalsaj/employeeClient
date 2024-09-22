import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Image, Button, Container, Row, Col, Card } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
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
      showToastMessage();
      setTimeout(() => {
        navigate(`/getEmployeeData`);
      }, 1000);
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data || "An error occurred";
        setError(errorMessage);
        toast.warning(errorMessage, {
          position: "bottom-right",
          autoClose: 2000,
          pauseOnHover: true,
          hideProgressBar: false,
          draggable: true,
          progress: undefined,
        });
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  const showToastMessage = () => {
    toast.success("Login Successfully", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <Container fluid>
      <Row style={{ height: "100vh" }}>
        <Col xs={12} md={4} lg={4} className="centered-image">
          <div className="center" style={{ height: "100%" }}>
            <Image
              src={card}
              alt="Card Image"
              style={{
                width: "100%",
                maxWidth: "200px",
                height: "auto",
              }}
              rounded
            />
          </div>
        </Col>

        <Col xs={12} md={8} lg={8} className="text-center">
          <div className="align-content-center">
            <Card className="body_card m-5">
              <Card.Header className="bg-white">
                <Image
                  src={Logo}
                  alt="Logo"
                  style={{
                    width: "100%",
                    maxWidth: "50px",
                    height: "auto",
                  }}
                  roundedCircle
                />

                <h1 className="mt-1">
                  <span
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #246BCE, #1E5799, #143961, #0B274E, black)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Hello
                  </span>{" "}
                  <span
                    style={{
                      backgroundImage:
                        "linear-gradient(to left, black, #0B274E, #143961, #1E5799, #246BCE)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Again!
                  </span>
                </h1>
                <h1 className="text-secondary title mt-3">
                  Please Log In to Access Your Account <br></br>and Continue
                  Using Our Services
                </h1>
              </Card.Header>
              <Card.Body>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="justify-content-center d-flex align-items-center mt-2">
                    <Button type="submit" className="btn loginSign">
                      Login
                    </Button>
                  </div>
                  <ToastContainer />
                  <div className="justify-content-center d-flex align-items-center mt-5">
                    <h1 className="text-secondary title">
                      Doesn't have an account yet?{" "}
                      <a href="/signup" className=" text-decoration-none">
                        Sign Up
                      </a>{" "}
                    </h1>
                  </div>
                </form>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;

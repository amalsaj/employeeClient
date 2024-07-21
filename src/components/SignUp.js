import React, { useState } from "react";
import axios from "axios";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import Logo from "../Images/logo.avif";
import { Image, Button, Container, Row, Col, Card } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import card from "../Images/card4.svg";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setError] = useState("");

  const showToastMessage = () => {
    toast.success("Account Created Successfully", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://employeeserver-979i.onrender.com/signup",
        {
          username,
          password,
        }
      );
      console.log(response.data);
      setError("");
      showToastMessage();
      setTimeout(() => {
        navigate(`/`);
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
        console.log(`${err}`);
      }
    }
  };

  return (
    <Container fluid>
      <Row style={{ height: "100vh" }}>
        <Col className="centeredImage" xs={12} md={4} lg={4}>
          <div className="m-4 mt-5 text-white">
            <h1 className="fw-bold">
              Join Us and <br></br> Unlock Endless <br></br>Possibilities!
            </h1>
            <h1 className="titleStyle">
              Welcome! We're excited to have you on board.<br></br>Let's embark
              on this amazing journey together!
            </h1>
          </div>

          <div className="center">
            <Image
              className="mt-5 img-fluid xs-img"
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
          <Card className=" m-5 bodyCard">
            <Card.Header className="bg-white">
              <Image
                xs={1}
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
                  Get
                </span>{" "}
                <span
                  style={{
                    backgroundImage:
                      "linear-gradient(to left, black, #0B274E, #143961, #1E5799, #246BCE)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Started
                </span>
              </h1>
            </Card.Header>
            <Card.Body className="bg-white">
              <form onSubmit={handleSubmit} autocomplete="off">
                <div className="form-group">
                  <label className="mb-2" htmlFor="username">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group mt-3">
                  <label className="mb-2" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="d-flex justify-content-center  mt-4">
                  <Button type="submit" className="btn loginSign">
                    Create Account
                  </Button>
                  <ToastContainer />
                </div>
                <div className="justify-content-center d-flex align-items-center mt-5">
                  <h1 className="text-secondary titleStyle">
                    Already had an Account?{" "}
                    <a href="/" className=" text-decoration-none">
                      Login
                    </a>{" "}
                  </h1>
                </div>
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpForm;

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

    try {
      const response = await axios.post(`${APIURL}/signup`, {
        username,
        password,
        email,
        mobileNumber: mobile,
      });
      console.log(response.data);
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
                    Name
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
                <div className="form-group">
                  <label className="mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="mb-2" htmlFor="username">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
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

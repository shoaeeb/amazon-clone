import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { login } from "../actions/userActions";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Row className="justify-content-md-center">
      <Col xs={12} md={6}>
        <div className="form-container">
          <h1>Welcome Back</h1>
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler} autoComplete="on">
          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              autoComplete="username"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="my-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              autoComplete="current-password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Sign In
          </Button>
          </Form>
          <Row className="py-3">
            <Col className="text-center">
              New Customer? <Link to="/register">Create Account</Link>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default LoginScreen;

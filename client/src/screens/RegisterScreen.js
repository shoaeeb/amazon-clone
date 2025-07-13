import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { register } from "../actions/userActions";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <Row className="justify-content-md-center">
      <Col xs={12} md={6}>
        <div className="form-container">
          <h1>Create Account</h1>
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler} autoComplete="on">
          <Form.Group className="my-2" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              autoComplete="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              autoComplete="email"
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
              autoComplete="new-password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="my-2" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              autoComplete="new-password"
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Register
          </Button>
          </Form>
          <Row className="py-3">
            <Col className="text-center">
              Already have an account? <Link to="/login">Sign In</Link>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default RegisterScreen;

import React, { useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { NavLink, useNavigate } from "react-router-dom";

import { Card, Button, Form } from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import signInWithGoogle from "../functions/singInWithGoogle";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      navigate("/user");
    }
  })

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/user");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        if (errorCode === "auth/invalid-email") {
          informUser("Neplatný e-mail", "error");
        }
        if (errorCode === "auth/invalid-login-credentials") {
          informUser("Neplatné heslo", "error");
        }

        switch (errorCode) {
          case "auth/invalid-email":
            toast.error("Neplatný e-mail");
            break;
          case "auth/invalid-login-credentials":
            toast.success("Neplatné heslo");
            break;
          default:
            informUser(errorCode, "error");
        }
      });
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        theme="light"
      />
      <Card>
        <Card.Body>
          <Card.Title>Přihlásit se</Card.Title>

          <Button variant="primary" onClick={signInWithGoogle} style={{ marginBottom: "20px" }}>
              Přihlášit se pomocí Googlu
            </Button> 
            <br />

          <div>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ marginBottom: "20px" }}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Heslo"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <div style={{ marginTop: "20px" }}>
                <Button variant="primary" type="submit" onClick={onLogin}>
                  Login
                </Button>
              </div>
            </Form>

            <p className="text-sm text-gray-600 text-center">
              Nemáte ještě účet? <NavLink to="/signup">Registrovat se</NavLink>
            </p>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default Login;

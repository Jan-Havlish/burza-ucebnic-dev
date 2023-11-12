import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { Form, Button } from "react-bootstrap";
import { useUser } from "../components/UserContext";
import singInWithGoogle from "../functions/singInWithGoogle";

const Signup = () => {
  const navigate = useNavigate();

  const user = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Nový stav pro jméno
  const [showSingInWithEmail, setShowSingInWithEmail] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/user");
      }
    })
  })

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Aktualizujte uživatelský profil s jménem
      await updateProfile(user, { displayName: name });

      console.log(user);
      navigate("/login");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h1 style={{ marginBottom: "20px" }}>Registrovat se</h1>

        <Button
          variant="primary"
          style={{ marginBottom: "20px" }}
          onClick={() => singInWithGoogle()}
        >
          Registrovat se pomocí Googlu
        </Button>
        <br />
        <Button
          variant="primary"
          style={{ marginBottom: "20px" }}
          onClick={() => setShowSingInWithEmail(!showSingInWithEmail)}
        >
          Registrovat se pomocí e-mailu
        </Button>
        {showSingInWithEmail && (
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Control
                type="text"
                placeholder="Tvé jméno"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group
              controlId="formBasicEmail"
              style={{ marginTop: "20px", marginBottom: "20px" }}
            >
              <Form.Control
                type="email"
                placeholder="Tvůj e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Heslo"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              style={{ marginTop: "20px", marginBottom: "20px" }}
            >
              Za registrovat se
            </Button>
          </Form>
        )}

        <p>
          Máte již účet? <NavLink to="/login">Přihlásit se</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;

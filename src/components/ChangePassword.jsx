import React from "react";
import { useUser } from "../components/UserContext";
import { Card, Button, Form } from "react-bootstrap";
import { useState } from "react";
import {
  reauthenticateWithCredential,
  updatePassword,
  EmailAuthProvider,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword = () => {
  const user = useUser(); // získání uživatele

  if (!user) {
    return <>Je třeba se přihlásit</>;
  }

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  console.log(user);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Reauthenticate uživatele
      await reauthenticateWithCredential(
        user,
        EmailAuthProvider.credential(user.email, password),
      );

      // aktulizovat heslo
      await updatePassword(user, newPassword);

      console.log("Password updated successfully");
    } catch (error) {
      toast.error(error.code);
      console.log(error, error.code);
    }
  };

  return (
    <Card>
      <ToastContainer // kontejner pro upozornění
        position="top-center"
        autoClose={5000}
        hideProgressBar
        theme="light"
      />
      <Card.Body>
        <Card.Title>Změna hesla</Card.Title>
        <Form>
          <Form.Group controlId="oldPassword">
            <Form.Label>Heslo</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Zadajte vaše heslo"
            />
          </Form.Group>
          <Form.Group controlId="newPassword">
            <Form.Label>Nove heslo</Form.Label>
            <Form.Control
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Zadajte nové heslo"
            />
          </Form.Group>
          <Button
            variant="primary"
            onClick={handleSubmit}
            style={{ marginTop: "20px" }}
          >
            Změnit heslo
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ChangePassword;

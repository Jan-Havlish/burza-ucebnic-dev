import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

import { Link } from "react-router-dom";
import { useUser } from "../components/UserContext";
import { Card, Button } from "react-bootstrap";

import ChangePassword from "../components/ChangePassword";

const User = () => {
  const user = useUser();

  if (!user) {
    return <>Je třeba se přihlásit</>;
  }

  console.log(user);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [isUsingGoogle, setIsUsingGoogle] = useState(false);

  {/*TODO možnost stáhnout svá data*/}
  {/*TODO možnost smazat svůj účet*/}
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUsingGoogle(user.providerData[0].providerId === "google.com");
      }
    });
  })
  return (
    <>
      {user && (
        <div>
          <Card style={{ marginTop: "20px" }}>
            <Card.Body>
              <Card.Title>Vítejte, {user.displayName}</Card.Title>
              <Card.Text>
                <Button
                  as={Link}
                  to="/add_school_book"
                  variant="primary"
                  style={{
                    marginBottom: "20px",
                    marginTop: "20px",
                    marginRight: "20px",
                  }}
                >
                  Přidat učebnici
                </Button>
                <Button
                  as={Link}
                  to="/logout"
                  variant="secondary"
                  style={{ marginRight: "20px" }}
                >
                  Odhlásit se
                </Button>

                  {user.providerData[0].providerId === "google.com" && (
                    "Je použité Google"
                  )}

                  { !isUsingGoogle && <Button
                  onClick={() => setShowChangePassword(!showChangePassword)}
                  variant="secondary"
                >
                  Změnit heslo
                </Button>

                  }
                
              </Card.Text>
              {showChangePassword && <ChangePassword />}
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
};

export default User;

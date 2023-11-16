import React from "react";
import Conversation from "./Conversation";
import { Card } from "react-bootstrap";

const MessageWindow = (props) => {
  console.log(props, "props");
  return (
    <Card style={{ marginTop: "20px" }}>
      <Card.Body>
        <Card.Title>Konverzace s {props.owner}</Card.Title>
        <Conversation
          conversationID={props.BookID}
          bookOwner={props.owner}
          bookOwnerEmail={props.ownerEmail}
        />
      </Card.Body>
    </Card>
  );
};

export default MessageWindow;

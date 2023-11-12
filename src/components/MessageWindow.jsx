import React from 'react'
import Conversation from './Conversation';
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const MessageWindow = (props) => {
  return (
    <Card style={{ marginTop: "20px" }}>
      <Card.Body>
        <Card.Title>Konverzace s {props.owner}</Card.Title>
        <Conversation conversationID={props.BookID} bookOwner={props.owner}/>
      </Card.Body>
    </Card>
  )
}

export default MessageWindow
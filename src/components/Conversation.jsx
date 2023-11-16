import { useState, useEffect } from "react";
import { collection, doc, addDoc } from "firebase/firestore";
import { projectFirestore } from "../firebase/config";
import { Card, Dropdown } from "react-bootstrap";
import "./Conversation.css";
import { useUser } from "./UserContext";
import { Link } from "react-router-dom";

import getMessagesFromConversation from "../functions/getMessagesFromConversation";
import compareByTimeStamp from "../functions/compareByTimeStamp";

const Conversation = (props) => {
  const user = useUser(); // získání uživatele

  if (!user) {
    // není-li přihlášen, tak je vyzván
    return (
      <p className="text-warning">
        Musíte se <Link to="/login">přihlásit</Link>, abyste mohli kontaktovat
        vlastníka učebnice.
      </p>
    );
  }

  const conversationID = props.conversationID;
  const [messages, setMessages] = useState([]);
  const [addressee, setAddressee] = useState(
    user.email === props.bookOwnerEmail ? null : props.bookOwnerEmail,
  );

  const [availableAuthors, setAvailableAuthors] = useState([]);

  const handleSelect = (eventKey) => {
    // nastavení adresáta
    console.log(eventKey, "handleSelect");
    setAddressee(eventKey);
  };

  const findAllAuthors = async () => {
    // ve všech zprávách najde všechny autory zpráv
    messages.forEach((message) => {
      if (!availableAuthors.includes(message.autor)) {
        setAvailableAuthors((availableAuthors) => [
          ...availableAuthors,
          message.autor,
        ]);
      }
    });

    setAvailableAuthors(
      (
        availableAuthors, // aby byl každý autor byl v listu jen jednou
      ) =>
        Array.from(new Set(availableAuthors)).filter(
          (author) => author !== user.email,
        ),
    );
  };

  const addInnerDocument = async (collection_name, docID, data) => {
    // do určité kolekce uvnitř dokumentu vloží data
    try {
      const docRef = doc(projectFirestore, collection_name, docID);
      console.log("mám refdoc");
      const colRef = collection(docRef, "messages");
      console.log("mám colRef");
      addDoc(colRef, data);
    } catch (error) {
      console.error("Chyba při přidávání dokumentu:", error);
    }
  };

  const saveNotificationToFirestore = async (data) => {
    // uloží každou odeslnou zprávu do kolekce, ze které půjde zprávy odeslat
    try {
      const docRef = await addDoc(
        collection(projectFirestore, "notifications"),
        data,
      );
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    // získání zpráv a nastavení jména uživatele
    getMessagesFromConversation(
      conversationID,
      setMessages,
      compareByTimeStamp,
    );
    setUserName(user.email);
  }, []);

  useEffect(() => {
    // získá všechny autory, aktulizuje se s každou příchozí zprávou
    findAllAuthors();
    console.log(availableAuthors, "availableAuthors");
  }, [messages]);

  const [messageToSend, setMessageToSend] = useState("");
  const [userName, setUserName] = useState("");

  const SendMessage = (e) => {
    // vloží dokument s zprávou a notifikací
    e.preventDefault();
    console.log(messageToSend, userName);
    addInnerDocument("konverzace", conversationID, {
      autor: userName,
      message: messageToSend,
      timeStamp: Date.now(),
      addressee: addressee,
    });

    saveNotificationToFirestore({
      autor: userName,
      message: messageToSend,
      timeStamp: Date.now(),
      addressee: addressee,
      waitingForSend: true,
    });

    setMessageToSend("");
  };

  return (
    <div>
      <br />
      {/* TODO oprava - když je přihlášený nevlastník knihy nezobrazují se mu zprávy od vlastníka */}
      {/* TODO přidat informaci, od kterých uživatelů jsou nezodpovězené zprávy */}
      {addressee} Adresát <br />
      {}
      {props.bookOwner === user.displayName && ( // volba adresáta pro vlastníka učebnice
        <>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="addressee-dropdown">
              {addressee ? `Adresát: ${addressee}` : "Vyberte adresáta"}
              {/* TODO aby se nezobrazovaly e-mailové adresy, ale jména */}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {availableAuthors.map((autor) => (
                <Dropdown.Item
                  key={autor}
                  onClick={(event) =>
                    handleSelect(event.currentTarget.textContent)
                  }
                >
                  {autor}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>{" "}
          <br />
        </>
      )}
      <form onSubmit={SendMessage}>
        {" "}
        // zadání a odeslání zprávy
        <input
          type="text"
          value={messageToSend}
          onChange={(e) => setMessageToSend(e.target.value)}
          placeholder="Ab"
        />
        <button type="submit" key={"send"}>
          Send
        </button>
      </form>
      <div className="conversation">
        {messages &&
          messages.map((message) =>
            (message.addressee === addressee &&
              (message.autor === userName || message.autor === user.email)) ||
            message.autor === addressee ? (
              <div
                key={message.timeStamp}
                className={
                  message.autor === userName ? "yourMessage" : "otherMessage"
                } // roztřízení podle autora zprávy
              >
                {addressee} ":" {message.addressee} <br /> {userName} ":" //
                debugovací výpisy
                {message.autor}
                {console.log(
                  message.autor,
                  "message.autor",
                  userName,
                  "userName",
                  addressee,
                  "addressee",
                )}
                <Card key={message.timeStamp}>
                  <Card.Body>
                    <Card.Title>{message.message}</Card.Title>
                    Adresát: {message.addressee}
                    <br />
                    Autor: {message.autor}
                  </Card.Body>
                </Card>
              </div>
            ) : (
              <div>
                {console.log(message.addressee === addressee)}{" "}
                {console.log(message.autor === userName)}
                "baf"
              </div>
            ),
          )}
      </div>
      {messages && console.log(messages)}
    </div>
  );
};

export default Conversation;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import getDocumentById from "../functions/getDocumentById";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiMessage, BiMessageX } from "react-icons/bi";
import MessageWindow from "./MessageWindow";

const SpecificSchoolBook = () => {
  const { kategorie, BookID } = useParams();
  const [book, setBook] = useState(null);
  const [showMessageWindow, setShowMessageWindow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getDocumentById(kategorie, BookID);
      setBook(result);
    };

    fetchData();
  }, [kategorie, BookID]);

  return (
    <Container>
      <Row>
        <Col>
          <p>
            {"~"} / <Link to="/ucebnice">učebnice</Link> /{" "}
            <Link to={`/ucebnice/${kategorie}`}>{kategorie}</Link> /{" "}
            {book && (
              <>
                {book.title} [{book.owner}]
              </>
            )}
          </p>
        </Col>
      </Row>

      {book && (
        <Row>
          <Col>
            {book.stillAvilable ? (
              <>
                <Card className="text-center">
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Za {book.priceRange} KČ
                    </Card.Subtitle>
                    <Card.Text>Prodává: {book.owner}</Card.Text>
                    <Card.Img
                      variant="bottom"
                      src={book.img}
                      alt={book.title}
                    />
                  </Card.Body>
                </Card>

                <Card style={{ marginBottom: "20px", marginTop: "20px" }}>
                  <Card.Body>
                    <Card.Title>Popis stavu učebnice od vlastníka:</Card.Title>
                    <Card.Text>{book.description}</Card.Text>
                  </Card.Body>
                </Card>

                <Card>
                  <Card.Body>
                    <Card.Title
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      Jestli Vás zaujala učebnice, tak můžete kontaktovat
                      prodejce:
                      <Button
                        variant="primary"
                        onClick={() => {
                          setShowMessageWindow(!showMessageWindow);
                        }}
                      >
                        {showMessageWindow ? <BiMessageX /> : <BiMessage />}
                      </Button>
                    </Card.Title>
                  </Card.Body>
                </Card>
                {showMessageWindow && (
                  <MessageWindow
                    BookID={BookID}
                    owner={book.owner}
                    ownerEmail={book.ownerEmail}
                    kategorie={kategorie}
                  />
                )}
              </>
            ) : (
              "Not available"
            )}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default SpecificSchoolBook;

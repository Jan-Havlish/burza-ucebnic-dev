import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

import { projectFirestore } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

import ShowBooks from "../components/ShowBooks";

const UcebniceVyber = () => {

  const { kategorie, BookID } = useParams();
  const [numberOfBooks, setNumberOfBooks] = useState(10);
  const [books, setBooks] = useState([]);

const getDocuments = (collection_name) => {
  if (!collection_name) {
    console.log("no collection name");
    return;
  }
  const booksRef = collection(projectFirestore, collection_name);
  onSnapshot(booksRef, (snapshot) => {
    let updatedBooks = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      const book = { ...data, id: doc.id, kategorie: kategorie };
      updatedBooks.push(book);
    });

    setBooks(updatedBooks);
  });
};
  
  useEffect(() => {
    getDocuments(kategorie);
  }, []);

  return (
    <Container>
      <Row>
          <Col>
            {"~"} / <Link to="/ucebnice">učebnice</Link> / {kategorie}
          </Col>
        </Row>
      {console.log(books)}
      <ShowBooks books={books} />
    </Container>
  );
};

export default UcebniceVyber;

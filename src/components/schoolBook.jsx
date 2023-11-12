import React from "react";
import { Card, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./schoolBook.css";

const SchoolBook = (props) => {
  const { title, owner, priceRange, kategorie, id, shortMode, unReadComments, isMyBook } =
    props;

  const isDefaultMode = !shortMode;

  const bookHeight = isDefaultMode ? "24rem" : "11rem";

  return (
    <Card
      style={{
        width: "18rem",
        height: bookHeight,
        margin: "20px",
        padding: "20px",
      }}
    >
      {isDefaultMode && (
        <Card.Img
          variant="top"
          src={props.img}
          alt={title}
          className="image-container"
        />
      )}
      <Card.Body>
        <Card.Title>{title}</Card.Title>

        {unReadComments ? (isMyBook && <p className="text-danger">nezodpovězené komentáře</p>) : <br />}

        {isDefaultMode && (
          <>
            <Card.Subtitle className="mb-2 text-muted">{owner}</Card.Subtitle>
            <Card.Text>{priceRange}</Card.Text>
          </>
        )}
        <Button
          as={NavLink}
          to={`/ucebnice/${kategorie}/${id}`}
          variant="primary"
        >
          Zobrazit detail
        </Button>
      </Card.Body>
    </Card>
  );
};

export default SchoolBook;

import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

import { kategorie } from "../data/kategore";

import { Link } from "react-router-dom";

const DostupneKategorieUcebnic = () => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <p>{"~"} / učebnice</p>
          </Col>
        </Row>
      </Container>
      <Container
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Row
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {kategorie.map((kategorie) => {
            return (
              <Card
                style={{
                  width: "18rem",
                  height: "18rem",
                  margin: "20px",
                  padding: "20px",
                }}
                key={kategorie}
              >
                {kategorie}
                <Link to={`/ucebnice/${kategorie}`}>
                  <Card.Img variant="top" src={""} alt={kategorie} />
                </Link>
              </Card>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default DostupneKategorieUcebnic;

import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";

const Styles = styled.div`
  .preview {
  }
`;
const ArticlePreview = (props) => {
  return (
    <Styles>
      <Row>
        <Col className="col-12">
          <Card className="mt-5 px-5">
            <h1>{props.article.title}</h1>
            <p>{props.article.description}</p>
          </Card>
        </Col>
      </Row>
    </Styles>
  );
};

export default ArticlePreview;

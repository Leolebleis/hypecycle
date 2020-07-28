import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";

const Styles = styled.div`
  .card {
    background-color: transparent;
    border-radius: 0;
    border-color: rgb(214, 78, 138);
  }

  code {
    font-size: 20px;
  }
`;
const ArticlePreview = (props) => {
  return (
    <Styles>
      <Row>
        <Col className="col-12">
          <Card className="mt-5 px-5 hvr-sweep-to-right">
            <code>{props.article.title}</code>
            <p>{props.article.description}</p>
          </Card>
        </Col>
      </Row>
    </Styles>
  );
};

export default ArticlePreview;

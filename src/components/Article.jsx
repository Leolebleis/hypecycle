import React from "react";
import ReactMarkdown from "react-markdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import markdownFormat from "../utils/markdownFormat";
import styled from "styled-components";
import analytics from "../analytics";

analytics.page();

const Styles = styled.div`
  img {
    border: 2px solid rgb(214, 78, 138);
  }

  code {
    font-size: 20px;
  }
`;

const Article = (props) => {
  const article = props.article;

  return (
    <Styles>
      <Row className="justify-content-between mb-3">
        <Col>
          <code>{article.title}</code>
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          <i>{article.updatedAt}</i>
        </Col>
      </Row>
      <Row>
        <i className="col">{article.description}</i>
      </Row>
      <br />
      <ReactMarkdown value="" source={markdownFormat(article.content)} />
    </Styles>
  );
};

export default Article;

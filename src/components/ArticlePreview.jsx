import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Styles = styled.div`
  .card {
    background-color: transparent;
    border-radius: 0;
    border-color: rgb(214, 78, 138);
  }

  .hashtag {
    color: grey;
    font-size: 15px;
  }

  code {
    font-size: 20px;
  }

  p {
    margin: 0;
  }

  .description {
    margin-top: 1rem;
  }
`;

const ArticlePreview = (props) => {
  const article = props.article;
  return (
    <Styles>
      <Row>
        <Col className="col-12">
          <Link to={`${article.path}`}>
            <Card className="mt-5 px-5 hvr-sweep-to-right">
              <Row className="justify-content-between">
                <Col>
                  <code>{article.title}</code>
                </Col>
                <Col className="d-flex justify-content-end align-items-center">
                  <p>{article.updatedAt}</p>
                </Col>
              </Row>
              <p>
                {article.hashtags.map((hashtag) => (
                  <span className="hashtag">
                    <i>#{hashtag} </i>
                  </span>
                ))}
              </p>
              <p className="description">{article.description}</p>
            </Card>
          </Link>
        </Col>
      </Row>
    </Styles>
  );
};

export default ArticlePreview;

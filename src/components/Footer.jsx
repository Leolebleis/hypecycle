import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";
import { IconContext } from "react-icons";

import styled from "styled-components";

const Styles = styled.div`
  a {
    color: lightgray;

    &:hover {
      color: white;
    }
  }

  .icon {
    color: rgb(214, 78, 138);
  }
`;

export default () => {
  return (
    <footer className="my-4">
      <Styles>
        <Container>
          <hr />

          <Row className="justify-content-between h-100">
            <Col className="col-auto my-auto">
              <div>
                <a
                  href="https://leolebleis.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Made with </span>
                  <span className="icon">
                    <IconContext.Provider value={{ size: "1em" }}>
                      <AiFillHeart />
                    </IconContext.Provider>
                  </span>
                  <span> by Leo Le Bleis.</span>
                  <span className="ml-2 icon">
                    <IconContext.Provider value={{ size: "1em" }}>
                      <FiExternalLink />
                    </IconContext.Provider>
                  </span>
                </a>
              </div>
            </Col>
            <Col className="col-auto flex-row-reverse my-auto">
              <a
                href="https://github.com/Leolebleis/hypecycle/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconContext.Provider value={{ size: "2em" }}>
                  <FaGithub />
                </IconContext.Provider>
              </a>
            </Col>
          </Row>
        </Container>
      </Styles>
    </footer>
  );
};

import React, { useEffect, useState } from 'react'
import Article from "./components/Article"
import Home from "./components/Home"
import MarkdownEditor from "./components/MarkdownEditor"
import Layout from "./components/Layout"
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import api from "./utils/api"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {

  let [articles, setArticles] = useState([]);
  let [showLoginModal, setShowLoginModal] = useState(false)
  let [showArticleModal, setShowArticleModal] = useState(false)

  useEffect(() => {
    (async () => {
      let articles = await api.getAll()
        .then(articles => articles.sort((a, b) => {
          const firstDate = b.data.updatedAt.split("/")
          const secondDate = a.data.updatedAt.split("/")
          const aDate = new Date(firstDate[2], firstDate[1] - 1, firstDate[0])
          const bDate = new Date(secondDate[2], secondDate[1] - 1, secondDate[0])
          return aDate - bDate
        }).map(article => {
          console.log("article", article)
          return {
            ...article.data,
            timestamp: article.ts
          }
        }));
      setArticles(articles)
      console.log("articles", articles);
    })()
  }, [])

  let handleShowLogin = () => setShowLoginModal(true)

  let handleCloseLogin = () => setShowLoginModal(false)

  let submitLogin = async (event) => {
    event.preventDefault();
    setShowLoginModal(false);

    const credentials = {
      "user": event.target[0].value,
      "password": event.target[1].value
    }

    await api.login(credentials)
      .then(response => {
        if (response.status === 200) {
          console.log("successful", response)
          setShowArticleModal(true)
        } else {
          console.log("error", response)
        }
      })
  }

  let handleCloseArticleModal = () => setShowArticleModal(false)

  return (
    <Layout>
      <Router>
        <Container>
          <Link to="/">
            <Row className="justify-content-between">
              <Col>
                <h1>Hypecycle;</h1>
              </Col>
              <Col className="d-flex justify-content-end align-items-center">
                <Button onClick={() => handleShowLogin()}>Login</Button>
              </Col>
            </Row>
          </Link>

          <Switch>
            <Route exact path="/">
              <Home articles={articles} />
            </Route>

            {articles.map(article =>
              <Route path={`/${article.path}`} key={article.path}>
                <Article article={article} />
              </Route>
            )}
          </Switch>
        </Container>
      </Router>

      <Modal style={{ color: "black" }} show={showLoginModal} onHide={handleCloseLogin} >
        <Modal.Header>
          Login to post articles
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={event => submitLogin(event)}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" autoComplete="username" placeholder="Enter your username" />
            </Form.Group>

            <Form.Group controlId="password" >
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" autoComplete="current-password" placeholder="Enter your password" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>

          </Form>
        </Modal.Body>
      </Modal>

      <Modal
        dialogClassName="modal-90w"
        style={{ color: "black" }}
        show={showArticleModal}
        onHide={handleCloseArticleModal} >
        <MarkdownEditor />
      </Modal>
    </Layout>
  );
}


export default App;

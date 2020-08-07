import React, { useEffect, useState } from 'react'
import Article from "./components/Article"
import Home from "./components/Home"
import MarkdownEditor from "./components/MarkdownEditor"
import Layout from "./components/Layout"
import Footer from "./components/Footer"
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
  let [activeUser, setActiveUser] = useState()

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
        if (response.name === "NotFound") {
          console.log("error", response)
        } else {
          setShowArticleModal(true)
          setActiveUser(response.data)
        }
      })
  }

  let handleCloseArticleModal = () => setShowArticleModal(false)

  return (
    <>
      <Layout>
        <Router>
          <Container>
            <Row className="justify-content-between h-100 mt-4">
              <Link to="/">

                <Col className="col-auto my-auto">
                  <h1>Hypecycle;</h1>
                </Col>
              </Link>

              <Col className="col-auto my-auto justify-content-end align-items-center">
                <Button onClick={() => handleShowLogin()}>Login</Button>
              </Col>
            </Row>

            <hr />

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
                <Form.Control type="text" autoComplete="username" placeHolder="Enter your username" />
              </Form.Group>

              <Form.Group controlId="password" >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" autoComplete="current-password" placeHolder="Enter your password" />
              </Form.Group>

              <Button type="submit" >
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
          <MarkdownEditor user={activeUser} />
        </Modal>
      </Layout>
      <Footer />
    </>
  );
}


export default App;

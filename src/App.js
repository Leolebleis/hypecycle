import React, { useEffect, useState } from 'react'
import Article from "./components/Article"
import Home from "./components/Home"
import Layout from "./components/Layout"
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
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

  useEffect(() => {
    (async () => {
      await api.login({
        user: "termiduck",
        password: "password"
      });
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
                <Button>Login</Button>
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
    </Layout>
  );
}


export default App;

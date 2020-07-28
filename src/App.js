import React, { useEffect, useState } from 'react';
import Article from "./components/Article"
import Home from "./components/Home"
import Container from "react-bootstrap/Container";
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
      let articles = await api.getAll()
        .then(articles => articles.map(article => {
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
    <Router>
      <Container>
        <Link to="/">
          <h1>Hypecycle;</h1>
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
  );
}


export default App;

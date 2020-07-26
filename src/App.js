import React, { useEffect, useState } from 'react';
import ArticlePreview from "./components/ArticlePreview";
import Container from "react-bootstrap/Container";
import { getArticles } from "./API"

function App() {

  let [articles, setArticles] = useState([]);

  useEffect(() => {
    (async () => {
      const articles = await getArticles();
      setArticles(articles)
      console.log(articles);
    })()
  }, [])

  return (
    <>
      <Container>
        {articles.map(article =>
          <ArticlePreview article={article} key={article.title} />
        )}
      </Container>
    </>
  );
}

export default App;

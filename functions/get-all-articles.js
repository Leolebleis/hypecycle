const faunadb = require('faunadb')
const q = faunadb.query

exports.handler = (event, context) => {
  console.log("Function get-all-articles invoked")

  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
  })

  return client.query(q.Paginate(q.Match(q.Index('all_articles'))))
    .then((response) => {
      const articlesRef = response.data
      console.log("Articles", articlesRef)
      console.log(`${articlesRef.length} articles found`)

      const getAllArticlesDataQuery = articlesRef.map(ref => q.Get(ref))

      return client.query(getAllArticlesDataQuery)
        .then(async response => {
          console.log("response", response)
          return {
            statusCode: 200,
            body: JSON.stringify(response)
          }
        })
    }).catch(error => {
      console.log('error', error)
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      }
    })
}

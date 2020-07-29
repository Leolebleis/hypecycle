const faunadb = require("faunadb")
const q = faunadb.query

// This is in solid need of encryption and salting
exports.handler = async (event, context) => {
  console.log("Function 'login' invoked")

  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
  })
  console.log("event.body", event.body)

  const credentials = JSON.parse(event.body)

  return client.query(q.Paginate(q.Match(q.Index('login'), credentials.user, credentials.password)))
    .then(response => {
      console.log("login sucessful", response.data)

      if (response.data.length !== 0) {
        return {
          statusCode: 200,
          body: JSON.stringify(response)
        }
      } else {
        return {
          statusCode: 401,
          body: "Wrong credentials"
        }
      }
    }).catch(error => {
      console.log("login error", error)
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      }
    })


}
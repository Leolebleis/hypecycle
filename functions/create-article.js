const faunadb = require("faunadb")
const q = faunadb.query

exports.handler = async (event, context) => {
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
  })

  const authError = {
    statusCode: 401,
    body: "Could not identify user"
  }

  const payload = JSON.parse(event.body)

  const article = { data: payload.article }
  const loggedInUser = payload.user
  console.log("Function 'create-article' invoked. Payload:", payload)

  if (!loggedInUser || !loggedInUser.user || !loggedInUser.password || !loggedInUser.salt)
    return authError

  return await client.query(q.Get(q.Match(q.Index('login'), loggedInUser.user, loggedInUser.password)))
    .then(async response => {
      console.log("Wow", response)
      if (response.data.salt === loggedInUser.salt) {
        return await client.query(q.Create(q.Ref('classes/articles'), article))
          .then(response => {
            console.log("success", response)
            return {
              statusCode: 200,
              body: JSON.stringify(response)
            }
          }).catch(error => {
            console.log("error", error)
            return {
              statusCode: 400,
              body: JSON.stringify(error)
            }
          })
      } else {
        return authError
      }
    })


}


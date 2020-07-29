const FUNCTIONS_PATH = ".netlify/functions/"

const getAll = async () => {
  const response = await fetch(FUNCTIONS_PATH + "get-all-articles");
  return response.json()
}

const login = async (credentials) => {
  const response = fetch(FUNCTIONS_PATH + "login", {
    body: JSON.stringify(credentials),
    method: "POST"
  });
  return response
}

const createArticle = async (article) => {
  const response = fetch(FUNCTIONS_PATH + "create-article", {
    body: JSON.stringify(article),
    method: "POST"
  });

  return response;
}

export default {
  getAll: getAll,
  login: login,
  createArticle: createArticle
}

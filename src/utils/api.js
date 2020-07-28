const FUNCTIONS_PATH = ".netlify/functions/"

const getAll = async () => {
  const response = await fetch(FUNCTIONS_PATH + "get-all-articles");
  return response.json()
}

export default {
  getAll: getAll,
}

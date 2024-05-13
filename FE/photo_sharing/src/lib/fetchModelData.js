/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */
function fetchModel(params) {
  // Default options are marked with *
  const base_url = "http://127.0.0.1:8081/api";
  const url = base_url + params;
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP error, status = " + response.status);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

export { fetchModel };
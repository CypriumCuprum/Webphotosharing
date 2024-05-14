/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */
import { databaseURL } from "../helpers/config";
function fetchModel(params) {
  // Default options are marked with *
  const url = databaseURL + params;
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
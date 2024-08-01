const axios = require('axios');

/**
 * Function to fetch data from a specified API URL
 * @param {string} apiUrl - The URL of the API endpoint
 * @param {object} options - Additional options (e.g., pagination, caching)
 * @returns {Promise<object|null>} - Resolves with fetched data or null on error
 */
async function fetchData(apiUrl, options = {}) {
  const { maxRetries = 3, retryDelay = 1000, useCache = false } = options;
  let retries = 0;

  try {
    let response;
    
    // Implement caching logic if enabled
    if (useCache) {
      const cachedData = fetchFromCache(apiUrl);
      if (cachedData) {
        console.log("Using cached data for", apiUrl);
        return cachedData;
      }
    }

    // Retry logic with exponential backoff
    do {
      try {
        response = await axios.get(apiUrl);
        break; // Exit loop on successful response
      } catch (error) {
        console.error(`Error fetching data from ${apiUrl}:`, error.message);
        retries++;
        await wait(retryDelay * retries); // Exponential backoff
      }
    } while (retries < maxRetries);

    if (!response) {
      console.error(`Failed to fetch data from ${apiUrl} after ${maxRetries} retries`);
      return null;
    }

    // Cache fetched data if enabled
    if (useCache) {
      cacheData(apiUrl, response.data);
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

/**
 * Function to simulate a wait or delay using setTimeout
 * @param {number} ms - The delay in milliseconds
 * @returns {Promise<void>}
 */
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Placeholder function for caching fetched data
 * @param {string} key - Cache key (e.g., API URL)
 * @param {object} data - Data to be cached
 */
function cacheData(key, data) {
  // Implement caching mechanism (e.g., using Redis, localStorage)
  console.log("Caching data for", key);
  // Example: localStorage.setItem(key, JSON.stringify(data));
}

/**
 * Placeholder function for fetching cached data
 * @param {string} key - Cache key (e.g., API URL)
 * @returns {object|null} - Cached data or null if not found
 */
function fetchFromCache(key) {
  // Implement cache retrieval logic
  // Example: const cachedData = localStorage.getItem(key);
  // return cachedData ? JSON.parse(cachedData) : null;
  return null; // Placeholder for demo
}

module.exports = fetchData;

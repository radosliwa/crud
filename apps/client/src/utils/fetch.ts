const baseURL =
  (import.meta.env.VITE_ENDPOINT as string) || "http://localhost:5000/api";
const MAX_RETRIES = 5;
const RETRY_INTERVAL = 1000; // 3 seconds

const fetchAPI = async <T = unknown>(
  endpoint: string = "",
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data?: T,
  retries: number = MAX_RETRIES
): Promise<T> => {
  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  };

  try {
    const response = await fetch(baseURL + endpoint, config);
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    // Delete scenario
    if (!response.body && response.status === 204) return "Item deleted" as T;
    const parsed = await response.json();
    return parsed;
  } catch (error) {
    if (retries === 0) {
      throw error;
    }
    console.log(`Retry attempt: ${MAX_RETRIES - retries + 1}`);
    await new Promise((resolve) => setTimeout(resolve, RETRY_INTERVAL));
    return fetchAPI(endpoint, method, data, retries - 1);
  }
};

export default fetchAPI;

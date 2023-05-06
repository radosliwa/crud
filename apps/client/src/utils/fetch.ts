// @TODO env
const baseURL = "http://localhost:5000/api";

const fetchAPI = async <T = unknown>(
  endpoint: string = "",
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data?: T
): Promise<T> => {
  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  };

  const response = await fetch(baseURL + endpoint, config);
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  // delete sceanrio
  if (!response.body && response.status === 204) return "Item deleted" as T;

  const parsed = await response.json();
  return parsed;
};

export default fetchAPI;

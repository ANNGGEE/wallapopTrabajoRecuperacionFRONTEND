const API = "http://localhost:8080/api";

export function apiFetch(url, options = {}) {

  const token = localStorage.getItem("token");

  return fetch(url, {
    ...options,

    headers: {
      ...(options.body && {
        "Content-Type": "application/json"
      }),

      ...(token && {
        "Authorization": `Bearer ${token}`
      }),

      ...(options.headers || {})
    }
  });

} 

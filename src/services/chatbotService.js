import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

// Persistent session id per browser
function getSessionId() {
  let id = localStorage.getItem("millebot_session");
  if (!id) {
    id = "sess_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem("millebot_session", id);
  }
  return id;
}

const client = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
  timeout: 30000,
});

export async function sendMessage(message) {
  const { data } = await client.post("/chat/", {
    message,
    session_id: getSessionId(),
  });
  return data; // { id, message, response, timestamp, session_id }
}

export async function fetchHistory() {
  const { data } = await client.get("/chat/history/", {
    params: { session_id: getSessionId() },
  });
  return data;
}

import axios from "axios";

const API_BASE = "http://localhost:8000";

export async function fetchArticles() {
  const res = await axios.get(`${API_BASE}/articles`);
  return res.data;
}

export async function updateArticle(id, payload) {
  await axios.put(`${API_BASE}/articles/${id}`, payload);
}

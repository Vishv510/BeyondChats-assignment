
import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000", // FastAPI
});

export const fetchArticles = () => API.get("/articles");

export const optimizeArticle = (id) =>
  API.post(`/articles/${id}/optimize`); // triggers Node

export const fetchArticleById = (id) =>
  API.get(`/articles/${id}`);

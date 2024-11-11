import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.NEXTAUTH_URL,
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

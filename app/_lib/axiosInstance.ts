import axios from "axios";
// import cacheAdapter from "axios-cache-adapter";

export const instance = axios.create({
  baseURL: process.env.NEXTAUTH_URL,
  timeout: 10000,
  headers: { "X-Custom-Header": "foobar" },
  withCredentials: true, // Send cookies with every request
  // adapter: cacheAdapter.setupCache({
  //   maxAge: 3600 * 24, // 1 day
  // }),
});

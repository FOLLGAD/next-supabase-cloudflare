import { env } from "~/env";

export const getURL = () => {
  let url = env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000/";
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Make sure to including trailing `/`.
  url = url.endsWith("/") ? url : `${url}/`;
  url = url.concat("auth/callback");
  return url;
};

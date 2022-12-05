import type { LoaderFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { authenticator } from "~/services/auth0.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  console.log("user", user);
  if (user) {
    return redirect("/");
  }
  return authenticator.authenticate("auth0", request);
};

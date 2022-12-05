import type { LoaderFunction } from "@remix-run/cloudflare";
import { authenticator } from "~/services/auth0.server";

export const loader: LoaderFunction = ({ request }) => {
  return authenticator.authenticate("auth0", request, {
    successRedirect: "/",
    failureRedirect: "/home",
  });
};

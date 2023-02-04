import type { ActionFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { destroySession, getSession } from "~/services/auth0.server";

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const logoutURL = new URL(AUTH0_LOGOUT_URL);

  logoutURL.searchParams.set("client_id", AUTH0_CLIENT_ID);
  logoutURL.searchParams.set("returnTo", AUTH0_RETURN_TO_URL);

  return redirect('/', {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};

import { createCookieSessionStorage } from "@remix-run/cloudflare";
import { Authenticator } from "remix-auth";
import { Auth0Strategy } from "remix-auth-auth0";
import { FindOrCreateUser } from "~/controllers/UserController.server";

export type User = {
  id: string;
  email: string;
  name: string;
};
if (!AUTH0_DOMAIN || !AUTH0_CLIENT_ID || !AUTH0_CLIENT_SECRET) {
  throw new Error("Missing Auth0 configuration");
}

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session_remix",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [AUTH0_CLIENT_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

export const authenticator = new Authenticator(sessionStorage);

export const isAuthenticated = async (request: Request) => {
  return authenticator.isAuthenticated(request, {
    failureRedirect: "/home",
  });
};

export const getAuthenticatedUser = async (request: Request) => {
  return (await (isAuthenticated(request) as unknown)) as User;
};

const auth0Strategy = new Auth0Strategy(
  {
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    clientSecret: AUTH0_CLIENT_SECRET,
    callbackURL: AUTH0_CALLBACK_URL,
  },
  async ({ refreshToken, extraParams, profile }) => {
    const user = await FindOrCreateUser({
      email: profile.emails[0].value,
      name: profile.name.givenName,
      password: profile.provider,
    });

    return user;
  }
);

authenticator.use(auth0Strategy);

export const { getSession, commitSession, destroySession } = sessionStorage;

import { LoaderFunction } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { authenticator, getAuthenticatedUser } from "~/services/auth0.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getAuthenticatedUser(request);

  return {
    authenticated: user,
  };
};

export default function Index() {
  const { authenticated } = useLoaderData();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      {authenticated ? (
        <>
          <h1 className="">Welcome to Remix</h1>
          <p>{JSON.stringify(authenticated, null, 2)}</p>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
        </>
      )}
    </div>
  );
}

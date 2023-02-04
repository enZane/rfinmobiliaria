import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Cta, Header, Hero } from "~/components/layout";
import { authenticator } from "~/services/auth0.server";

export async function loader({ request }: LoaderArgs) {
  const user = await authenticator.isAuthenticated(request);
  if (user) {
    return json({ user });
  }
  return json({ user: null });
}

export default function Index() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <>
      <Header auth={Boolean(user)}></Header>
      <Hero />
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-16 px-6 sm:py-24 lg:px-8">
          <div className="text-center">
            <h2 className="mt-1 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Más de 30 años de experiencia
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-2xl text-gray-500">
              Apoyando a las familias duranguenses a encontrar la casa de sus
              sueños.
            </p>
          </div>
        </div>
      </div>

      <Cta />
    </>
  );
}

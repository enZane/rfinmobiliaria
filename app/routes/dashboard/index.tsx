import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ChevronRightIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/20/solid/index.js";
import { authenticator } from "~/services/auth0.server";
import { json, LoaderArgs } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { GetAllHouses } from "~/controllers/HouseController.server";

export async function loader({ request }: LoaderArgs) {
  const user = await authenticator.isAuthenticated(request);

  const houses = await GetAllHouses({
    orderBy: "createdAt",
    limit: 4,
  });

  return json({ user, houses });
}

export default function Example() {
  const { user, houses } = useLoaderData<typeof loader>();

  return (
    <main className="flex-1">
      {/* Page title & actions */}
      <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="min-w-0 flex-1">
          <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
            Bienvenido {user.name}!
          </h1>
        </div>
      </div>

      <main className="prose prose-lg max-w-none mx-auto py-6 sm:px-6 lg:px-8">
        <h2>Últimas propiedades agregadas</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4 py-4 sm:px-6 lg:px-8">
          {houses.map((house) => (
            <Link
              to={`/dashboard/propiedades/${house.id}`}
              key={house.id}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {house.name}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {house.description.description}
                </p>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Dirección
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {house.address}
                    </dd>
                  </div>
                </dl>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </main>
  );
}

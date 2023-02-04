import Avatar from "boring-avatars";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { GetAllHouses } from "~/controllers/HouseController.server";

export async function loader() {
  const houses = await GetAllHouses();
  return { houses };
}

export default function Example() {
  const { houses } = useLoaderData<typeof loader>();

  return (
    <div className="flex bg-white min-h-screen">
      <div className="flex min-w-0 flex-1 flex-col md:flex-row">
        <aside className="max-w-[24rem]  border-r border-gray-200 order-first flex flex-col">
          <div className="px-6 pt-6 pb-4">
            <h2 className="text-lg font-medium text-gray-900">Casas</h2>
            <p className="mt-1 text-sm text-gray-600">
              Lista de las casas activas
            </p>
            <Link className="mt-6 flex items-center space-x-4 hover:bg-gray-50" to="/dashboard/propiedades">
              <PlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              <span>Agregar nueva casa</span>
            </Link>
          </div>
          {/* Directory list */}
          <nav
            className="min-h-0 flex-1 overflow-y-auto"
            aria-label="Directory"
          >
            <ul className="relative z-0 divide-y divide-gray-200">
              {houses.map((house) => (
                <Link key={house.id} to={`/dashboard/propiedades/${house.id}`}>
                  <li key={house.name}>
                    <div className="relative flex items-center space-x-3 px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500 hover:bg-gray-50">
                      <div className="flex-shrink-0">
                        <Avatar
                          size={40}
                          name={house.name}
                          variant="marble"
                          colors={[
                            "#264653",
                            "#2a9d8f",
                            "#e9c46a",
                            "#f4a261",
                            "#e76f51",
                          ]}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <a href="#" className="focus:outline-none">
                          {/* Extend touch target to entire panel */}
                          <span
                            className="absolute inset-0"
                            aria-hidden="true"
                          />
                          <p className="text-sm font-medium text-gray-900">
                            {house.name}
                          </p>
                          <p className="truncate text-sm text-gray-500">
                            {house.address}
                          </p>
                        </a>
                      </div>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          </nav>
        </aside>
        <Outlet />
      </div>
    </div>
  );
}

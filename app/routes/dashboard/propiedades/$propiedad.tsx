import type { LoaderArgs, ActionArgs } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { Form, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import {
  DeleteHouseById,
  GetHouseById,
} from "~/controllers/HouseController.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const property = await GetHouseById(params.propiedad as string);
  if (!property) {
    return redirect("/dashboard/propiedades");
  }
  return { property };
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const id = formData.get("id") as string;

  try {
    await DeleteHouseById(id);

    return redirect("/dashboard/propiedades/");
  } catch (error) {
    console.log(error);
  }
};

export default function Property() {
  const {
    property: {
      id,
      name,
      address,
      description,
      price,
      type,
      user: { name: userName },
    },
  } = useLoaderData<typeof loader>();

  const priceFormatted = Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(price);

  const [edit, setEdit] = useState(false);

  return (
    <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
      <article>
        <header>
          <div className="bg-white shadow flex justify-between">
            <div className="px-4 py-5 sm:px-6">
              <h1 className="text-3xl font-bold leading-tight text-gray-900">
                {name}
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {type} -{" "}
                <span className="font-bold text-green-600">
                  {price ? `${priceFormatted}` : "Precio no disponible"}
                </span>
              </p>
            </div>
            <div className="flex">
              <Form method="post" className="px-4 py-5 sm:px-6">
                <input type="hidden" name="id" value={id} />
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Eliminar propiedad
                </button>
              </Form>
              <div className="px-4 py-5 sm:px-6">
                <button
                  type="button"
                  onClick={() => setEdit(!edit)}
                  className="items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {edit ? "Cancelar" : "Editar propiedad"}
                </button>
              </div>
            </div>
          </div>
        </header>
        {/* Description list */}
        <Form  className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8" action="/dashboard/propiedades/edit" method="post" onSubmit={() => setEdit(false)}>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Nombre</dt>
              {edit ? (
                <input
                  type="text"
                  name="name"
                  defaultValue={name}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              ) : (
                <dd className="mt-1 text-sm text-gray-900">{name}</dd>
              )}
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Dirección</dt>
              {edit ? (
                <input
                  type="text"
                  name="address"
                  defaultValue={address}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              ) : (
                <dd className="mt-1 text-sm text-gray-900">{address}</dd>
              )}
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Precio</dt>
              {edit ? (
                <input
                  type="text"
                  name="price"
                  defaultValue={price}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              ) : (
                <dd className="mt-1 text-sm text-gray-900">{priceFormatted}</dd>
              )}
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Tipo</dt>
              {edit ? (
                <select
                  id="type"
                  name="type"
                  defaultValue={type}
                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-black border-2 rounded-md py-2 px-3"
                >
                  <option>Departamento</option>
                  <option>Casa</option>
                  <option>Local</option>
                  <option>Oficina</option>
                </select>
              ) : (
                <dd className="mt-1 text-sm text-gray-900">{type}</dd>
              )}
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Propietario</dt>
              {edit ? (
                <input
                  type="text"
                  name="user"
                  defaultValue={userName}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              ) : (
                <dd className="mt-1 text-sm text-gray-900">{userName}</dd>
              )}
            </div>
            <div className="sm:col-span-full">
              <dt className="text-sm font-medium text-gray-500">Descripción</dt>
              {edit ? (
                <textarea
                  name="description"
                  defaultValue={description.description}
                  rows={5}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              ) : (
                <dd className="mt-1 text-sm text-gray-900">
                  {description.description}
                </dd>
              )}
            </div>
          </dl>
          {edit && (
            <>
              <input type="hidden" name="houseId" value={id} />
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Guardar cambios
                </button>
              </div>
            </>
          )}
        </Form>
      </article>
    </main>
  );
}

import { LinksFunction } from "@remix-run/cloudflare";
import { Form } from "@remix-run/react";
import { useEffect, useState } from "react";

export const links: LinksFunction = () => {
  return [
    {
      rel: "preconnect",
      type: "text/javascript",
      href: "https://upload-widget.cloudinary.com/global/all.js",
    },
  ];
};

export default function CreateOrSearchProperty() {
  const [photos, setPhotos] = useState<string[]>([]);
  useEffect(() => {
    // Cloudinary upload widget
    const uploadWidget = cloudinary.createUploadWidget(
      {
        cloudName: "dqjcbwjmb",
        uploadPreset: "febxbupa",
        folder: "RF",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setPhotos((prev) => [...prev, result.info.public_id]);
        }
      }
    );

    const uploadButton = document.getElementById("upload");
    uploadButton?.addEventListener("click", () => {
      uploadWidget.open();
    });

    return () => {
      uploadButton?.removeEventListener("click", () => {
        uploadWidget.open();
      });
    };
  }, []);

  return (
    <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
      <div className="mx-auto max-w-2xl py-16 px-4 text-center sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tighsm:text-4xl">
          <span className="block">Agregar una propiedad</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-indigo-800">
          O busca una propiedad existente en el menu de la izquierda
        </p>
        <Form method="post" action="/dashboard/propiedades/create">
          <div className="mt-12">
            {/* Botón para subir imagenes con cloudinary */}
            <div
              id="upload"
              className="flex flex-col items-center w-full mb-4 justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
            >
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M14 14h20v20H14V14z"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 14h.01M12 18h.01M12 22h.01M12 26h.01M12 30h.01M12 34h.01M16 14h.01M16 18h.01M16 22h.01M16 26h.01M16 30h.01M16 34h.01M20 14h.01M20 18h.01M20 22h.01M20 26h.01M20 30h.01M20 34h.01M28 14h.01M28 18h.01M28 22h.01M28 26h.01M28 30h.01M28 34h.01M32 14h.01M32 18h.01M32 22h.01M32 26h.01M32 30h.01M32 34h.01M36 14h.01M36 18h.01M36 22h.01M36 26h.01M36 30h.01M36 34h.01"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="photos"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>Subir una imagen</span>
                </label>
                <input hidden value={JSON.stringify(photos)} name="photos" />
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
            </div>
            <div className="grid grid-cols-3 gap-8">
              <div className="col-span-3">
                <label htmlFor="name" className="block text-sm font-medium ">
                  Nombre de la propiedad
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-black border-2 rounded-md py-2 px-3"
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label htmlFor="address" className="block text-sm font-medium ">
                  Dirección
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-black border-2 rounded-md py-2 px-3"
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium "
                >
                  Descripción
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-black border-2 rounded-md py-2 px-3"
                    defaultValue={""}
                  />
                </div>
              </div>
              <div className="col-span-2">
                <label htmlFor="price" className="block text-sm font-medium ">
                  Precio
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="price"
                    id="price"
                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-black border-2 rounded-md py-2 px-3"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium ">
                  Tipo
                </label>
                <div className="mt-1">
                  <select
                    id="type"
                    name="type"
                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-black border-2 rounded-md py-2 px-3"
                  >
                    <option>Departamento</option>
                    <option>Casa</option>
                    <option>Local</option>
                    <option>Oficina</option>
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="highlight"
                  className="block text-sm font-medium "
                >
                  Destacado
                </label>
                <div className="mt-1">
                  <input
                    type="checkbox"
                    name="highlight"
                    id="highlight"
                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-black border-2 rounded-md"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="col-span-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Agregar propiedad
              </button>
            </div>
          </div>
        </Form>
      </div>
    </main>
  );
}

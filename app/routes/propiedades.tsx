import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { LoaderArgs } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { Header } from "~/components/layout";
import { GetAllHouses } from "~/controllers/HouseController.server";
import { authenticator } from "~/services/auth0.server";

export async function loader({ request }: LoaderArgs) {
  const houses = await GetAllHouses();
  const sortedHouses = houses.sort((a, b) => {
    if (a.highLight && !b.highLight) return -1;
    if (!a.highLight && b.highLight) return 1;
    return 0;
  });

  const user = await authenticator.isAuthenticated(request);

  return { houses: sortedHouses, user };
}

export default function Propiedades() {
  const { houses, user } = useLoaderData<typeof loader>();
  const priceFormatter = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  });

  const cld = new Cloudinary({
    cloud: {
      cloudName: "dqjcbwjmb",
    },
  });

  const getPhoto = (photos: string) => {
    const parsedPhotos = JSON.parse(photos);
    return parsedPhotos ? parsedPhotos[0] : "RF/rflogo_j8nk40";
  };

  return (
    <>
      <Header auth={Boolean(user)}></Header>
      <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
        <div className="border-b border-gray-200 pt-24 pb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Propiedades
          </h1>
        </div>

        <section
          aria-labelledby="product-heading"
          className="mt-6 col-span-2 lg:col-span-2 lg:mt-0 xl:col-span-2"
        >
          <h2 id="product-heading" className="sr-only">
            Products
          </h2>
          <div className="pt-12 pb-24 grid-cols-1 gap-2 lg:grid lg:grid-cols-3 lg:gap-2 xl:grid-cols-3">
            {houses.map((house) => (
              <Link
                to={`/propiedades/${house.id}`}
                key={house.name}
                className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
              >
                <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
                  <AdvancedImage
                    cldImg={cld
                      .image(getPhoto(house.description.photos))
                      .resize(thumbnail().width(1000).height(900))}
                    className="h-full w-full object-scale-down object-center sm:h-full sm:w-full"
                  />
                </div>
                <div className="flex flex-1 flex-col space-y-2 p-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {house.name}
                  </h3>
                  <div className="flex flex-1 flex-col justify-end">
                    <p className="text-base font-medium text-green-700">
                      {priceFormatter.format(house.price)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

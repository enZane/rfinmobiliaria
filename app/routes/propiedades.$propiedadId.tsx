import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { cartoonify } from "@cloudinary/url-gen/actions/effect";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { json, LoaderArgs, redirect } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Header } from "~/components/layout";
import { GetHouseById } from "~/controllers/HouseController.server";
import { authenticator } from "~/services/auth0.server";
import Cal from "@calcom/embed-react";

export async function loader({ request, params }: LoaderArgs) {
  const user = await authenticator.isAuthenticated(request);
  const { propiedadId } = params;

  if (!propiedadId) throw new Error("No property id");

  const house = await GetHouseById(propiedadId);

  if (!house) return redirect("/propiedades");

  return json({ user, house });
}

export default function Propiedad() {
  const { user, house } = useLoaderData<typeof loader>();

  const priceFormatter = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  });

  const cld = new Cloudinary({
    cloud: {
      cloudName: "dqjcbwjmb",
    },
  });

  const images = JSON.parse(house.description.photos);

  return (
    <>
      <Header auth={Boolean(user)} />
      <main className="prose max-w-2xl mx-4 lg:max-w-7xl lg:mx-8 py-6 px-24 min-h-screen bg-white grid grid-cols-1">
        <h1 className="mb-1">{house.name}</h1>
        <h3 className="text-green-700 mt-0">
          {priceFormatter.format(house.price)}
        </h3>
        {images && <section className="grid grid-cols-3 gap-4 self-center">
          <div className="col-span-2">
            <AdvancedImage
              cldImg={cld.image(images ? images[0] : "RF/rflogo_j8nk40").resize(
                thumbnail()
                  .width(800)
                  .height(600)
                  .gravity("auto")
              )}
              className="w-full"
            />
          </div>
          <div className="col-span-1">
            <div className="grid grid-cols-2 gap-4">
              {images.map((image) => (
                <AdvancedImage
                  cldImg={cld
                    .image(image || "RF/rflogo_j8nk40")
                    .effect(cartoonify())}
                  className="w-full"
                />
              ))}
            </div>
          </div>
        </section>}
        <section className="mt-4">
          <h2 className="text-2xl font-bold">Descripción</h2>
          <p className="px-4">{house.description.description}</p>
        </section>
        <section className="mt-4">
          <h1>Agenda tu cita</h1>
          <Cal calLink="ezequiel-fxk8sa/cita" />
        </section>
      </main>
    </>
  );
}

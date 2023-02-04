import {
  LifebuoyIcon,
  NewspaperIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Header } from "~/components/layout";
import { authenticator } from "~/services/auth0.server";

const supportLinks = [
  {
    name: "Ventas",
    description:
      "Gestionamos la venta de tus inmuebles, con un equipo de profesionales que te ayudarán a encontrar el comprador ideal para tu propiedad.",
    icon: PhoneIcon,
  },
  {
    name: "Remodelaciones",
    href: "#",
    description:
      "Contamos con un equipo de profesionales que te ayudarán a remodelar tu inmueble, para que puedas venderlo a un mejor precio.",
    icon: LifebuoyIcon,
  },
  {
    name: "Tramies",
    href: "#",
    description:
      "Nuestro equipo de abogados te ayudará a gestionar cualquier tipo de trámite legal que necesites.",
    icon: NewspaperIcon,
  },
];

export async function loader({ request }: LoaderArgs) {
  const user = await authenticator.isAuthenticated(request);
  if (user) {
    return json({ user });
  }
  return json({ user: null });
}
export default function Nosotros() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <>
      <Header auth={Boolean(user)} />
      <div className="overflow-hidden bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl space-y-8 px-6 lg:px-8">
          <div className="mx-auto max-w-prose text-base lg:max-w-none">
            <h2 className="text-lg font-semibold text-indigo-600">
              Más de 20 años de experiencia
            </h2>
            <p className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
              Inmobiliaria R&F
            </p>
          </div>
          <div className="relative z-10 mx-auto max-w-prose text-base lg:mx-0 lg:max-w-5xl lg:pr-72">
            <p className="text-lg text-gray-500">
              En Inmobiliaria R&F contamos con más de 20 años de experiencia en
              el mercado inmobiliario local, brindando servicios de compra,
              venta y alquiler de propiedades en la ciudad de Durango.
            </p>
          </div>
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-8">
            <div className="relative z-10">
              <div className="prose prose-indigo mx-auto text-gray-500 lg:max-w-none">
                <p>
                  Nuestro objetivo es brindar a nuestros clientes un servicio de
                  calidad y una atención personalizada, para ayudarles a
                  encontrar la propiedad ideal para satisfacer sus necesidades y
                  requerimientos. Contamos con un equipo de profesionales
                  altamente capacitados y con una amplia experiencia en el
                  mercado, que están siempre dispuestos a brindar el mejor
                  servicio.
                </p>
                <h3>Nuestros valores</h3>
                <ul>
                  <li>
                    Brindar a nuestros clientes un servicio de calidad y una
                    atención personalizada.
                  </li>
                  <li>
                    Siempre nos comprometemos a actuar con integridad y
                    transparencia.
                  </li>
                  <li>
                    Contribuir al desarrollo sostenible de la comunidad a través
                    de la promoción y el fomento del desarrollo inmobiliario
                    sostenible y responsable.
                  </li>
                </ul>
                <h3>Siempre dispuestos a ayudar</h3>
                <p>
                  ¡No dude en contactarnos para obtener más información sobre
                  nuestros servicios y propiedades disponibles!
                </p>
              </div>
            </div>
            <div className="relative mx-auto mt-12 max-w-prose text-base lg:mt-0 lg:max-w-none">
              <svg
                className="absolute top-0 right-0 -mt-20 -mr-20 lg:top-auto lg:right-auto lg:bottom-1/2 lg:left-1/2 lg:mt-0 lg:mr-0 xl:top-0 xl:right-0 xl:-mt-20 xl:-mr-20"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="bedc54bc-7371-44a2-a2bc-dc68d819ae60"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width={404}
                  height={384}
                  fill="url(#bedc54bc-7371-44a2-a2bc-dc68d819ae60)"
                />
              </svg>
              <blockquote className="relative rounded-lg bg-white shadow-lg">
                <div className="rounded-t-lg px-6 py-8 sm:px-10 sm:pt-10 sm:pb-8">
                  <div className="relative mt-8 text-lg font-medium text-gray-700">
                    <svg
                      className="absolute top-0 left-0 h-8 w-8 -translate-x-3 -translate-y-2 transform text-gray-200"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                    >
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p className="relative">
                      Nuestra prioridad es siempre dar lo mejor a nuestros
                      clientes, es por eso que me aseguro de tener un equipo
                      altamente capacitado y un servicio de calidad, para que
                      nuestros clientes puedan encontrar la propiedad que mejor
                      se adapte a sus necesidades
                    </p>
                  </div>
                </div>
                <cite className="relative flex items-center rounded-b-lg bg-indigo-600 py-5 px-6 not-italic sm:mt-10 sm:items-start sm:py-5 sm:pl-12 sm:pr-10">
                  <span className="relative ml-4 font-semibold leading-6 text-indigo-300  sm:pl-1">
                    <span className="font-semibold text-white sm:inline">
                      Ana Isabel Rocha Zamora
                    </span>{" "}
                    <span className="sm:inline">
                      Fundadora de Inmobiliaria R&F
                    </span>
                  </span>
                </cite>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white">
        {/* Header */}
        <div className="relative bg-gray-800 pb-32">
          <div className="absolute inset-0">
            <img
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&&sat=-100"
              alt=""
            />
            <div
              className="absolute inset-0 bg-gray-800 mix-blend-multiply"
              aria-hidden="true"
            />
          </div>
          <div className="relative mx-auto max-w-7xl py-24 px-6 sm:py-32 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Nuestros servicios
            </h1>
          </div>
        </div>

        {/* Overlapping cards */}
        <section
          className="relative z-10 mx-auto -mt-32 max-w-7xl px-6 pb-32 lg:px-8"
          aria-labelledby="contact-heading"
        >
          <h2 className="sr-only" id="contact-heading">
            Contact us
          </h2>
          <div className="grid grid-cols-1 gap-y-20 lg:grid-cols-3 lg:gap-y-0 lg:gap-x-8">
            {supportLinks.map((link) => (
              <div
                key={link.name}
                className="flex flex-col rounded-2xl bg-white shadow-xl"
              >
                <div className="relative flex-1 px-6 pt-16 pb-8 md:px-8">
                  <div className="absolute top-0 inline-block -translate-y-1/2 transform rounded-xl bg-indigo-600 p-5 shadow-lg">
                    <link.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">
                    {link.name}
                  </h3>
                  <p className="mt-4 text-base text-gray-500">
                    {link.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

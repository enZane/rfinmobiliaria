import { Icon } from "@iconify/react";
import { Link } from "@remix-run/react";

const navLinks = [
  {
    to: "/nosotros",
    label: "Nosotros",
  },
  {
    to: "/propiedades",
    label: "Propiedades",
  },
  {
    to: "/contacto",
    label: "Contacto",
  },
];

export default function Header({ auth = true }: { auth: boolean }) {
  return (
    <nav className="flex sticky top-0 w-full bg-white shadow z-[100]">
      <a
        href="/"
        className="flex items-center basis-[50%] border-r  px-8 py-10 border-gray-200"
      >
        <Icon className="w-8 h-8 mr-2" icon="majesticons:home" />
        <span className=" text-gray-700 text-[1.5rem] font-semibold">
          R&F Inmobiliaria
        </span>
      </a>
      <div className="flex items-center justify-center border-r border-gray-200 basis-[33%]">
        {auth && (
          <Link
            to={'/dashboard'}
            className="px-4 py-2 font-semibold text-gray-700 hover:text-gray-900 text-[1.2rem]"
          >
            Admin
          </Link>
        )}
        {navLinks.map((link) => (
          <a
            key={link.to}
            href={link.to}
            className="px-4 py-2 font-semibold text-gray-700 hover:text-gray-900 text-[1.2rem]"
          >
            {link.label}
          </a>
        ))}
      </div>
      <div className="flex items-center justify-center flex-grow">
        <a href="https://www.facebook.com/BienesRaicesRyF" className="mr-4">
          <Icon className="w-8 h-8" icon="logos:instagram-icon" />
        </a>
        <a href="https://wa.me/+526182136736" className="mr-4">
          <Icon className="w-8 h-8" icon="cib:whatsapp" />
        </a>
      </div>
    </nav>
  );
}

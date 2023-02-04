import { Link } from "@remix-run/react";

export default function Cta() {
  return (
    <section className="p-8">
      <h3 className="text-[2rem] font-bold mb-8">¿Cómo podemos ayudarte?</h3>
      <div className="flex w-full flex-col flex-1 md:flex-row justify-around my-8 gap-8">
        <article className="bg-black text-white p-4 rounded-lg flex flex-col gap-12 items-center justify-center">
          <span className="text-[1.75rem] font-bold mb-4">
            ¿Estás buscando una casa?
          </span>
          {/* On hover this, move the inside divs */}
          <div className="relative aspect-[1/6] w-4/5 max-h-[20rem] group">
            <div className="absolute w-full h-full transition-all duration-500 ease-in-out transform group-hover:translate-x-[-8rem] group-hover:translate-y-[8px] group-hover:rotate-[-10deg] ">
              <img
                className="w-full h-full object-cover "
                src="https://images.unsplash.com/photo-1558661091-5cc1b64d0dc5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                alt="Casa"
              />
            </div>
            <div className="absolute w-full h-full transition-all duration-500 ease-in-out transform group-hover:translate-x-[8rem] group-hover:translate-y-[8px] group-hover:rotate-[10deg]">
              <img
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1624303914335-9cdb04a30efc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80"
                alt="Casa"
              />
            </div>
            <div className="absolute w-full h-full transition-all duration-500 ease-in-out transform  group-hover:translate-y-[-16px]">
              <img
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1624303907355-427943d2d891?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                alt="Casa"
              />
            </div>
          </div>
          <Link
            to="/propiedades"
            className="bg-white text-black px-2 py-4 rounded-lg font-bold text-2xl transition-all duration-300 ease-in-out hover:bg-black hover:text-white"
          >
            Mira las opciones que tenemos
          </Link>
        </article>
        <article className="bg-black text-white p-4 rounded-lg flex flex-col gap-12 items-center justify-center">
          <span className="text-[1.75rem] font-bold mb-4">
            ¿Estás vendiendo una casa?
          </span>

          <a
            href="https://wa.me/+526182136736"
            className="bg-white text-black px-2 py-4 rounded-lg font-bold text-2xl transition-all duration-300 ease-in-out hover:bg-black hover:text-white"
          >
            Contáctanos
          </a>
        </article>
      </div>
    </section>
  );
}

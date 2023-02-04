const image =
  "https://images.unsplash.com/photo-1558661091-5cc1b64d0dc5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80";

export default function Hero() {
  return (
    <div className="flex gap-4 h-[40rem] relative">
      <div className="basis-1/2 px-8 py-12 flex-basis-[calc(100% / 6 * 3)]">
        <section className="text-left ml-12 pt-4">
          <h1 className="text-5xl font-bold mb-12 leading-[1.5]">
            <p>RF Inmobiliaria</p>
            <p className="text-4xl font-light text-gray-700">
              Asesoria para tu patrimonio
            </p>
          </h1>
          <p className="text-2xl font-light text-gray-600">
            Empresa dedicada a la venta de inmuebles en la ciudad de Durango,
            Durango.
          </p>
        </section>
      </div>
      <img
        src={image}
        alt="hero"
        className="hidden md:block object-cover basis-1/2 w-auto h-full clip-path-hero-image"
      />
    </div>
  );
}

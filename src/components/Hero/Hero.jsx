import React from "react";

function Hero() {
  return (
    <section className="">
      <div className="mx-auto max-w-screen-xl px-4 py-24 lg:flex lg:h-screen ">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            AI Course Generator
            <strong className="font-extrabold text-primary sm:block">
              {" "}
              Custom Learning Paths, Powered by AI{" "}
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
            illo tenetur fuga ducimus numquam ea!
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-secondary focus:outline-none focus:ring active:bg-primary sm:w-auto"
              href="#"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

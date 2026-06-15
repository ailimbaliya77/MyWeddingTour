import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative bg-[#f8f6f3] pt-28 pb-24">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div>

          {/* small badge */}
          <div className="inline-flex items-center bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-sm font-medium mb-6">
            Rated 4.8/5 by 2,000+ guests
          </div>

          {/* heading */}
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
  Experience the <span className="text-orange-500">Magic</span> of
  <br />
  Indian Weddings
</h1>

          {/* description */}
          <p className="text-gray-600 mt-6 text-lg max-w-lg">
            As a foreign guest, attend real Indian wedding celebrations.
            Immerse yourself in vibrant ceremonies, grand feasts and
            centuries-old traditions.
          </p>

          {/* buttons */}
          <div className="flex flex-wrap gap-4 mt-8">

            <Link
              to="/weddings"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Explore Weddings
            </Link>

            <Link
              to="/how-it-works"
              className="flex items-center gap-2 text-gray-700 font-semibold hover:text-orange-500 transition"
            >
              How it Works →
            </Link>

          </div>

          {/* user avatars */}
          <div className="flex items-center gap-4 mt-10">

            <div className="flex -space-x-3">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://randomuser.me/api/portraits/women/68.jpg"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            </div>

            <p className="text-sm text-gray-600">
              2,000+ happy guests <br />
              from 45+ countries
            </p>

          </div>

        </div>

        {/* RIGHT SIDE IMAGES */}
        <div className="relative flex justify-center">

          {/* main image */}
          <img
            src="https://images.unsplash.com/photo-1606800052052-a08af7148866"
            className="rounded-2xl shadow-xl w-[420px]"
          />

          {/* floating small image */}
          <img
            src="https://images.unsplash.com/photo-1605379399642-870262d3d051"
            className="absolute -bottom-10 -left-8 w-40 rounded-xl shadow-lg border-4 border-white"
          />

          {/* badge */}
          <div className="absolute -top-6 right-6 bg-white shadow-md px-4 py-2 rounded-lg text-sm font-semibold">
            500+ <br /> Weddings Hosted
          </div>

        </div>

      </div>

    </section>
  );
}
import { Link } from "react-router-dom";
import { useWeddings } from "../hooks/useWeddings";

const CuratedCollections = () => {

  const { weddings, loading } = useWeddings();

  if (loading) {
    return (
      <section className="py-20 text-center">
        <p>Loading weddings...</p>
      </section>
    );
  }

  const curated = Array.isArray(weddings) ? weddings.slice(0, 6) : []

  Array.isArray(weddings) ? weddings.slice(0, 6) : []
  return (
    <section className="py-20 bg-[#F8F5F2]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800">
              Curated Collections
            </h2>
            <p className="text-gray-500 ">
              Discover the best way to experiance local traditions, from grand weddings to intimate cultural events
            </p>
          </div>

          <Link
            to="/weddings"
            className="text-orange-500 font-medium hover:underline"
          >
            View All Categories →
          </Link>
        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-3 gap-8">

          {curated.map((wedding) => (

            <Link
              to={`/weddings/${wedding._id}`}
              key={wedding._id}
              className="group"
            >

              <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden">

                <div className="relative">

                  <img
                    src={wedding.image}
                    alt={wedding.title}
                    className="h-60 w-full object-cover group-hover:scale-105 transition"
                  />

                  <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
                    Featured
                  </span>

                </div>

                <div className="p-6">

                  <h3 className="text-lg font-semibold text-gray-800">
                    {wedding.title}
                  </h3>

                  <p className="text-gray-500 text-sm mt-2">
                    {wedding.description}
                  </p>

                  <button className="mt-4 text-orange-500 font-medium">
                    Explore →
                  </button>

                </div>

              </div>

            </Link>

          ))}

        </div>

      </div>
    </section>
  );
};

export default CuratedCollections;
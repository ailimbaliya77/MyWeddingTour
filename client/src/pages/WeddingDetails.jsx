import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const WeddingDetails = () => {
  const { weddingId } = useParams();
  const [wedding, setWedding] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/wedding/691e7f9ff1f417f97e27d93b`)
      .then(res => res.json())
      .then(data => {
        setWedding(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [weddingId]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg text-gray-600">Loading wedding…</p>
      </div>
    );
  }

  if (!wedding) {
    return <p className="text-center mt-20">Wedding not found</p>;
  }

  return (
    <div className="bg-white">

      {/* HERO SECTION */}
      <section className="relative h-[80vh] bg-gradient-to-br from-rose-100 via-teal-100 to-indigo-100 flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800">
            {wedding.bride.firstName} & {wedding.groom.firstName}
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            You’re invited to celebrate our wedding
          </p>

          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <PrimaryCTA label="Attend Wedding" />
            <SecondaryCTA label="RSVP" />
          </div>
        </div>
      </section>

      {/* ABOUT COUPLE */}
      <Section title="Meet the Couple">
        <p className="text-gray-700 text-lg text-center max-w-3xl mx-auto">
          {wedding.story || "A beautiful journey leading to a forever."}
        </p>
      </Section>

      {/* EVENTS */}
      <Section title="Wedding Events">
        <div className="grid md:grid-cols-2 gap-6">
          {wedding.events.map((event, i) => (
            <div
              key={i}
              className="border rounded-2xl p-6 shadow-sm bg-slate-50"
            >
              <h3 className="text-xl font-bold">{event.title}</h3>
              <p className="text-gray-600 mt-1">
                {event.startDate} • {event.startTime}
              </p>
              <p className="text-gray-600">
                {event.location?.city}, {event.location?.country}
              </p>
              <p className="mt-2 text-gray-700">
                {event.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* GALLERY */}
      <Section title="Gallery">
        {wedding.gallery?.length ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {wedding.gallery.map((img, i) => (
              <img
                key={i}
                src={img}
                className="rounded-xl h-40 w-full object-cover"
                alt="Wedding"
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No photos yet</p>
        )}
      </Section>

      {/* LOCATION */}
      <Section title="Wedding Location">
        <p className="text-center text-lg text-gray-700">
          {wedding.events?.[0]?.location?.city},{" "}
          {wedding.events?.[0]?.location?.country}
        </p>
      </Section>

      {/* FINAL CTA */}
      <section className="bg-gradient-to-br from-teal-600 to-indigo-600 text-white py-20 text-center px-6">
        <h2 className="text-4xl font-extrabold">
          Celebrate with {wedding.bride.firstName} & {wedding.groom.firstName}
        </h2>

        <p className="mt-4 text-lg opacity-90">
          Be part of our wedding experience
        </p>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <PrimaryCTA label="Attend Wedding" />
          <SecondaryCTA label="Send Gift" />
          <SecondaryCTA label="Share Wedding" />
        </div>
      </section>

    </div>
  );
};

/* ---------- UI COMPONENTS ---------- */

const Section = ({ title, children }) => (
  <section className="py-20 px-6">
    <h2 className="text-3xl font-bold text-center mb-10">{title}</h2>
    <div className="max-w-6xl mx-auto">{children}</div>
  </section>
);

const PrimaryCTA = ({ label }) => (
  <button className="px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold text-lg transition">
    {label}
  </button>
);

const SecondaryCTA = ({ label }) => (
  <button className="px-8 py-4 border border-white text-white rounded-xl font-semibold text-lg hover:bg-white hover:text-gray-800 transition">
    {label}
  </button>
);

export default WeddingDetails;

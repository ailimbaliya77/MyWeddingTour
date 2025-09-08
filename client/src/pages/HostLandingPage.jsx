import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import bgImage from "../assets/brebeach-wedding.webp"; 
import bgimage2 from "../assets/wedding-portrait-770x515.jpg"; 

const HostLandingPage = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false); // 🔑 Replace with your real auth
  const [showLogin, setShowLogin] = useState(false);

  const handleRegisterClick = () => {
    if (!isLoggedIn) {
      setShowLogin(true); // show login popup
    } else {
      navigate("/host/register/step1"); // navigate to registration page
    }
  };

  // called after successful login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
    navigate("/host/register/step1");
  };

  return (
    <div className="w-full">
      {/* Hero Section with Background */}
      <div
        className="relative h-[80vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-2xl px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-snug mb-6">
            Open up your wedding to travelers and let them celebrate with you
            and your family
          </h1>
          <button
            onClick= {handleRegisterClick}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition"
          >
            Register your wedding
          </button>
        </div>
      </div>

      {/* Login Modal */}
      <Login
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">
            Why do our couples love hosting travelers at their weddings?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
              <h3 className="text-xl font-bold mb-3 text-indigo-600">
                Build Connections with International Travelers
              </h3>
              <p className="text-gray-600">
                Share your culture and traditions while meeting people from
                around the world.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
              <h3 className="text-xl font-bold mb-3 text-indigo-600">
                Showcase Your Culture
              </h3>
              <p className="text-gray-600">
                Give guests an unforgettable experience of your wedding rituals
                and traditions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
              <h3 className="text-xl font-bold mb-3 text-indigo-600">
                Get Contribution to Your Wedding Expenses
              </h3>
              <p className="text-gray-600">
                Guests can contribute, helping you cover wedding costs while
                making memories.
              </p>
            </div>
          </div>
        </div>
      </section>

        {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
  <div className="max-w-4xl mx-auto px-6 space-y-8">
    <h2 className="text-3xl font-bold text-center">
      How Hosting Works
    </h2>

    {/* Step 1 */}
    <div>
      <h3 className="text-2xl font-semibold mb-2">
        1. Register your wedding
      </h3>
      <p className="text-gray-700 mb-2">
        Start by creating your listing. Add your wedding details. Make sure you include essential and exciting hints about your wedding that might interest your future guests.
      </p>
      <p className="text-gray-700 mb-2">
        Please note that we will reveal exact location / host details only to people who book your wedding. Our team will contact you to confirm your listing and publish it on our site. Listing your wedding on MyWeddingTour is free of charge.
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-2">
        <li>Listing your wedding is free.</li>
        <li>The exact location of your wedding and your details will only be revealed to people who book through our secure site.</li>
        <li>Before publishing, we’ll contact you to confirm all details.</li>
        <li>You may have a third-party register on your behalf, but we reserve the right to contact the couple directly as needed.</li>
      </ul>
      <p className="text-gray-700">
        Registration takes about 10 minutes. We will ask about your story and wedding events, and you can upload a photo or video to enrich your listing.
      </p>
    </div>

    {/* Step 2 */}
    <div>
      <h3 className="text-2xl font-semibold mb-2">
        2. Guests find your listing and book
      </h3>
      <p className="text-gray-700">
        You’ll get notified via email once a booking is made, including guest details. We encourage you to make contact with your guests prior to the wedding.
      </p>
    </div>

    {/* Step 3 */}
    <div>
      <h3 className="text-2xl font-semibold mb-2">
        3. Celebrate with your guests
      </h3>
      <p className="text-gray-700">
        Greet your guests and share your culture and traditions while enjoying every moment of this life-changing experience.
      </p>
    </div>

    {/* Step 4 */}
    <div>
      <h3 className="text-2xl font-semibold mb-2">
        4. Receive your wedding gift
      </h3>
      <p className="text-gray-700">
        Contributions from travelers are collected at the time of booking and transferred to you a few days after your wedding.
      </p>
    </div>
  </div>
</section>

{/* Final Call to Action Poster */}
<section
  className="relative h-[60vh] flex items-center justify-center bg-cover bg-center"
  style={{ backgroundImage: `url(${bgimage2})` }} 
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black bg-opacity-40"></div>

  {/* Content */}
  <div className="relative z-10 text-center px-6">
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
      Get ready to meet your guests
    </h2>
    <button
      onClick={handleRegisterClick}
      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition"
    >
      Register your wedding
    </button>
  </div>
</section>

{/* Note Below Poster */}
<div className="bg-white text-center py-6">
  <p className="text-gray-700">
    Your listing is free either having MyWeddingTour guests or not at your wedding.
  </p>
</div>
  </div>
  );
};

export default HostLandingPage;

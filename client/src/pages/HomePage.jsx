import React, {useState, useEffect} from 'react'
import Hero from '../components/Hero';
import TestimonialCard from '../components/TestimonialCard';
import { Link } from 'react-router-dom';
import { RiNumber1 } from "react-icons/ri";
import { RiNumber2 } from "react-icons/ri";
import { RiNumber3 } from "react-icons/ri";


function HomePage()  {
  const [, setImagesLoaded] = useState(false);

  useEffect(() => {
    // Mark images as loaded after component mounts
    setImagesLoaded(true);
  }, []);
  
  const testimonials = [
    {
      id: 1,
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      name: 'Sarah Johnson',
      location: 'USA',
      quote: 'Attending an Indian wedding through MyWeddingTour was the most immersive cultural experience I\'ve ever had. The colors, music, and hospitality were incredible!'
    },
    {
      id: 2,
      image: "https://randomuser.me/api/portraits/men/54.jpg",
      name: 'Carlos Rodriguez',
      location: 'Spain',
      quote: 'I was welcomed like family at the wedding. The ceremonies were fascinating and the food was amazing. Definitely a once-in-a-lifetime experience!'
    },
    {
      id: 3,
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      name: 'Yuki Tanaka',
      location: 'Japan',
      quote: 'Everything was perfectly organized from start to finish. I learned so much about Indian wedding traditions and made wonderful new friends.'
    }
  ];

  return (
    <div>
      <Hero />
      <br />
      {/* Featured Weddings Section */}
      <section className="py-10 sm:py-16 bg-white-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-gray-800">BEYOND TOURISM – A TRUE CULTURAL CONNECTION</h2>
          <br />
          <p className="bg-white text-black font-roboto text-[18px] leading-[1.5] tracking-[0.4px] antialiased">Travel often shows you places, but a wedding shows you people – their values, their stories, their traditions. Indian weddings are a window into the soul of the culture, where love and heritage are celebrated together in grand style.
          Dress the part, enjoy the feast, and lose yourself in the rhythm of music and dance. Each ritual you witness is a lesson in history, each interaction a bond with the community. It’s not just about seeing India – it’s about living it.</p>
          <br />
          <p className="bg-white text-black font-roboto text-[18px] leading-[1.5] tracking-[0.4px] antialiased">A traditional Indian wedding is nothing short of a festival – a fusion of rituals, music, dance, and food that lasts for days. It’s where culture becomes an experience, and guests are welcomed as family.

          Step into this celebration and let the colors, flavors, and sounds of India embrace you. From the joy of the wedding procession to the intimacy of sacred rituals, you’ll find yourself immersed in a cultural journey that leaves you inspired, connected, and transformed.</p>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-gray-800">How It Works</h2>
          <p className="text-gray-600 text-center mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base">Experience authentic Indian wedding celebrations in just a few simple steps</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-search text-red-600 text-2xl sm:text-3xl"><RiNumber1 /></i>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800">1. Browse & Select</h3>
              <p className="text-gray-600 text-sm sm:text-base">Explore upcoming weddings and choose one that matches your travel dates and interests.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-ticket-alt text-red-600 text-2xl sm:text-3xl"><RiNumber2 /></i>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800">2. Book Your Experience</h3>
              <p className="text-gray-600 text-sm sm:text-base">Secure your spot at the wedding with our various attendance packages.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-heart text-red-600 text-2xl sm:text-3xl"><RiNumber3 /></i>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800">3. Celebrate & Enjoy</h3>
              <p className="text-gray-600 text-sm sm:text-base">Attend the wedding as a special guest and immerse yourself in the celebrations.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-gray-800">Guest Testimonials</h2>
          <p className="text-gray-600 text-center mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base">Hear from travelers who have experienced the magic of Indian weddings through MyWeddingTour</p>
          
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map(testimonial => (
              <TestimonialCard 
                key={testimonial.id}
                image={testimonial.image}
                name={testimonial.name}
                location={testimonial.location}
                quote={testimonial.quote}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-10 sm:py-16 bg-red-300 text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Ready to Experience an Indian Wedding?</h2>
          <p className="text-base sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto">Join us for a cultural experience like no other. Create an account now to get started!</p>
          <Link 
            to="/Login" 
            className="bg-purple-500 hover:bg-red-600 text-black font-bold px-6 sm:px-8 py-3 sm:py-4 rounded text-sm sm:text-lg inline-block transition"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage

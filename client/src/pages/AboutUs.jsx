import React from 'react'

function AboutUs()  {
  return (
    <div>
      {/* Our Story */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0 lg:pr-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-6 text-gray-800">Our Story</h2>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">MyWeddingTour began in 2025 with a simple idea: to share the rich cultural experience of Indian weddings with travelers from around the world. Our founder, Priya Sharma, recognized that while many tourists experienced India's landmarks and cuisine, few had the opportunity to witness one of the country's most spectacular cultural events—a traditional Indian wedding.</p>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">After arranging for international friends to attend her cousin's wedding in Jaipur, Priya saw how profoundly the experience affected them. Guests were moved by the warmth, traditions, colors, and celebrations that make Indian weddings so special. This inspired her to create a platform that could facilitate these cultural exchanges on a larger scale.</p>
            <p className="text-gray-600 text-sm sm:text-base">Today, MyWeddingTour works with wedding hosts across India who are eager to share their celebrations with international guests. We've helped travelers from over 30 countries experience the magic of Indian weddings, fostering cross-cultural understanding and creating unforgettable memories.</p>
          </div>
          
          <div className="w-full lg:w-1/2">
            <img src="/images/about-story.jpg" alt="MyWeddingTour Story" className="rounded-lg shadow-lg w-full h-auto" />
          </div>
        </div>
      </div>
      
      {/* Our Mission */}
      <div className="bg-gray-100 py-10 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-6 text-gray-800">Our Mission</h2>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-8 md:mb-12 text-gray-600">
            To foster cultural exchange and understanding by connecting international travelers with authentic Indian wedding experiences, while supporting local communities and preserving traditions.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <div className="text-red-600 text-3xl sm:text-4xl mb-3 md:mb-4">
                <i className="fas fa-hands-helping"></i>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 md:mb-3 text-gray-800">Cultural Exchange</h3>
              <p className="text-gray-600 text-sm sm:text-base">We create meaningful connections between cultures through shared celebration and mutual respect.</p>
            </div>
            
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <div className="text-red-600 text-3xl sm:text-4xl mb-3 md:mb-4">
                <i className="fas fa-heart"></i>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 md:mb-3 text-gray-800">Authentic Experiences</h3>
              <p className="text-gray-600 text-sm sm:text-base">We ensure every wedding experience is genuine, respectful, and beneficial to all involved.</p>
            </div>
            
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <div className="text-red-600 text-3xl sm:text-4xl mb-3 md:mb-4">
                <i className="fas fa-globe-asia"></i>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 md:mb-3 text-gray-800">Community Support</h3>
              <p className="text-gray-600 text-sm sm:text-base">We partner with local artisans, guides, and businesses to support the communities that welcome our guests.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Values */}
      <div className="bg-gray-100 py-10 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 md:mb-12 text-gray-800">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left">
              <div className="bg-purple-800 p-3 rounded-full mb-3 sm:mb-0 sm:mr-4">
                <i className="fas fa-heart text-red-600 text-xl"></i>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800">Respect for Traditions</h3>
                <p className="text-gray-600 text-sm sm:text-base">We honor the cultural significance of wedding traditions and ensure our presence enhances rather than disrupts these sacred celebrations.</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left">
              <div className="bg-purple-800 p-3 rounded-full mb-3 sm:mb-0 sm:mr-4">
                <i className="fas fa-handshake text-red-600 text-xl"></i>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800">Authentic Connections</h3>
                <p className="text-gray-600 text-sm sm:text-base">We believe in fostering genuine relationships between our guests and wedding hosts, creating meaningful cultural exchanges.</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left">
              <div className="bg-purple-800 p-3 rounded-full mb-3 sm:mb-0 sm:mr-4">
                <i className="fas fa-globe text-red-600 text-xl"></i>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800">Global Understanding</h3>
                <p className="text-gray-600 text-sm sm:text-base">We work to increase cross-cultural understanding and appreciation through shared celebration experiences.</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left">
              <div className="bg-purple-800 p-3 rounded-full mb-3 sm:mb-0 sm:mr-4">
                <i className="fas fa-gem text-red-600 text-xl"></i>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800">Quality Experience</h3>
                <p className="text-gray-600 text-sm sm:text-base">We are committed to providing exceptional service and unforgettable experiences for both our guests and host families.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
  )
}

export default AboutUs

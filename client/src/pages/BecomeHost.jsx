import { Heart, Users, Globe, DollarSign, ArrowRight, Star, Calendar, MapPin, Camera } from 'lucide-react';
import img1 from '../assets/brebeach-wedding.webp';

function BecomeHost () {
  

  const testimonials = [
    {
      
      quote: "We loved welcoming travelers into our wedding! Sharing our special moments with people from different countries made our celebration even more unique. It felt like our big day had become a memory for many families across the world.",
      benefit: "🌍 CREATE MEMORIES THAT LAST A LIFETIME"
    },
    { 
      quote: "Having international guests dance to our wedding music and enjoy our rituals was so heartwarming. It gave us pride in our traditions and joy to see them experiencing it with so much excitement.",
      benefit: "🎶 SHARE YOUR FESTIVITIES WITH THE WORLD"
    },
    {
      quote: "We never imagined that guests from abroad could become such close friends. Even after the wedding, we stayed in touch, and now we have places to visit across the globe. Hosting truly connected our worlds.",
      benefit: "💖 TURN STRANGERS INTO FRIENDS"
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Register your wedding",
      description: "Start by creating your listing. Add your wedding details and exciting hints about your wedding that might interest your future guests.",
      icon: <Calendar className="w-6 h-6" />
    },
    {
      number: "2", 
      title: "Get verified",
      description: "Our team will contact you to confirm your listing and publish it on our site. Listing your wedding is completely free of charge.",
      icon: <Star className="w-6 h-6" />
    },
    {
      number: "3",
      title: "Welcome guests",
      description: "Connect with travelers from around the world who want to experience authentic Indian wedding celebrations.",
      icon: <Users className="w-6 h-6" />
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
     style={{ backgroundImage: `url(${img1})`}}>

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/40"></div>

  {/* Hero Section */}
  <section className="relative z-10 max-w-3xl mx-auto px-6 text-left bg-white/70 p-8 rounded-lg shadow-lg">
    
    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-snug mb-6">
      Open up your wedding to travelers
    </h1>

    <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
      Let international guests celebrate with you and your family while experiencing authentic Indian wedding traditions
    </p>

    <div className="flex flex-col sm:flex-row gap-4">
      <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-md">
        Host Your Event
      </button>
    </div>
  </section>
</div>


      {/* Benefits Section */}
      <section id="testimonials" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Why do our couples love hosting travelers?
          </h2>
          <p className="text-gray-600 text-center mb-16 text-lg">
            Discover the amazing benefits our couples have experienced
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-rose-100"
              >
                <div className="flex items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800">{testimonial.benefit}</h3>
                </div>
                
                <blockquote className="text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center">
                  <div className="ml-3">
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            How hosting works
          </h2>
          <p className="text-gray-600 text-center mb-16 text-lg">
            Simple steps to share your special day with the world
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-rose-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-2xl font-bold">{step.number}</span>
                </div>
                
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 h-48 flex flex-col justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex justify-center mb-4">
                    <div className="text-rose-500">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gradient-to-r from-rose-500 to-purple-600 rounded-3xl p-8 md:p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Important Details
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-white/90">Listing your wedding is completely <strong>free of charge</strong></p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-white/90">Exact location and host details are only revealed to <strong>confirmed guests</strong></p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-white/90">Our team verifies all listings before publication</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-white/90">Registration takes about <strong>10 minutes</strong></p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-white/90">Upload photos and videos to enrich your listing</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-white/90">Nominate a ceremony guide to help your guests</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="register" className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to share your special day?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Join hundreds of couples who have opened their hearts and weddings to travelers from around the world
          </p>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-rose-100">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-left mb-6 md:mb-0">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">It's easy to get started</h3>
                <p className="text-gray-600">Registration takes about 10 minutes in 5 simple steps</p>
              </div>
              <button className="bg-gradient-to-r from-rose-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center">
                Register Your Wedding
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BecomeHost;
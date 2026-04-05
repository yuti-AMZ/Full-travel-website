import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const TourismLandingPage = () => {

 
  const destinations = [
    {
      name: "Lalibela",
      type: "History",
      image: "/image/lalibela.jpg",
    },
    {
      name: "Simien Mountains",
      type: "Adventure",
      image: "/image/Simien Mountains, Ethiopia.jpg",
    },
    {
      name: "Omo Valley",
      type: "Culture",
      image: "/image/omo.jpg",
    },
  ];


  const features = [
    {
      title: "Expert Guides",
      desc: "Local experts who know hidden gems.",
    },
    {
      title: "Unique Stays",
      desc: "Eco-lodges and luxury campsites.",
    },
    {
      title: "Photo Tours",
      desc: "Capture stunning landscapes.",
    },
    {
      title: "Safe Travels",
      desc: "24/7 support during your journey.",
    },
  ];

  
  const videoLink = "https://youtu.be/GHNXKWi2yDU?si=k9vGTPVxq6R3misy";

  return (
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-green-500/30 font-['Inter']">

   
      <nav className="flex items-center justify-between px-8 py-6 border-b border-zinc-100 backdrop-blur-md sticky top-0 z-50 bg-white/80">
        <span className="text-xl font-extrabold tracking-tight">
          Discover Ethiopia
        </span>

        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost" className="text-zinc-500 hover:text-zinc-900">
              Log in
            </Button>
          </Link>

          <Link to="/signup">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-6 rounded-full font-bold">
              Plan Your Trip
            </Button>
          </Link>
        </div>
      </nav>

     
      <header className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/image/home-hero.jpg"
            alt="Ethiopia landscape"
            className="w-full h-full object-cover brightness-50"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1508264165352-cb2ecb3f9bfc?q=80&w=800&auto=format&fit=crop";
            }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-8 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1]">
            Experience the{" "}
            <span className="text-green-500">Timeless Beauty</span>
            <br />
            of Ethiopia
          </h1>

          <p className="text-lg text-zinc-200 max-w-2xl mx-auto mb-10">
            From the rock-hewn churches of Lalibela to the peaks of the Simien Mountains.
            Journey through 3,000 years of history and untouched nature.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button className="bg-green-600 text-white hover:bg-green-700 h-14 px-10 rounded-full font-bold text-lg">
                Explore Destinations
              </Button>
            </Link>

          
            <a href={videoLink} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="bg-white/10 border-white/40 text-white hover:bg-white hover:text-black h-14 px-10 rounded-full font-bold text-lg"
              >
                Watch Video
              </Button>
            </a>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-8 py-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-6xl md:text-8xl font-black mb-4">
              Top Destinations
            </h2>
            <p className="text-zinc-500">
              Handpicked places for your first journey.
            </p>
          </div>

          <Button variant="link" className="text-green-600 font-bold p-0">
            View all →
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinations.map((place, index) => (
            <Card
              key={index}
              className="group overflow-hidden rounded-3xl shadow-xl cursor-pointer"
            >
              <CardContent className="p-0 relative h-100">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-xs font-bold text-green-400 uppercase mb-1">
                    {place.type}
                  </p>
                  <h3 className="text-2xl font-bold">{place.name}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

     
      <section className="bg-zinc-50 py-24">
        <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-8">

          {features.map((item, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition">
              <CardContent>
                <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                <p className="text-zinc-500 text-sm">{item.desc}</p>
              </CardContent>
            </Card>
          ))}

        </div>
      </section>

     
      <footer className="border-t py-12 text-center text-zinc-500 text-sm">
        <div className="text-green-700 text-xl font-bold">
          Discover Ethiopia
        </div>
        <p>&copy; 2026 Discover Ethiopia</p>
      </footer>
    </div>
  );
};

export default TourismLandingPage;
import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { 
  User, 
  LogOut, 
  Settings, 
  Menu, 
  Search, 
  Star, 
  MapPin, 
  Navigation,
  Sun,
  Moon
} from 'lucide-react';

const WelcomePage = () => {
  const navigate = useNavigate();
  
  // Theme and Auth States
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('All');

  // Toggle Theme Logic
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, you'd add/remove 'dark' from document.documentElement
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const allPlaces = [
    { id: 1, title: 'Lalibela', region: 'Amhara', rating: '4.9', img: '/image/lalibela.jpg', desc: '12th-century rock-hewn churches carved from living stone.' },
    { id: 2, title: 'Simien Mountains', region: 'Amhara', rating: '5.0', img: '/image/Simien Mountains, Ethiopia.jpg', desc: 'Roof of Africa—dramatic escarpments and endemic wildlife.' },
    { id: 3, title: 'Danakil Depression', region: 'Afar', rating: '4.8', img: '/image/denakil.jpg', desc: 'The hottest place on earth with surreal neon-colored landscapes.' },
    { id: 4, title: 'Entoto Park', region: 'Addis Ababa', rating: '4.7', img: '/image/entonto.jpg', desc: 'Lush greenery and panoramic views of the capital.' },
    { id: 5, title: 'Bale Mountains', region: 'Oromia', rating: '4.9', img: '/image/Bale Mountains.jpg', desc: 'Home to the Ethiopian wolf and stunning alpine scenery.' }
  ];

  const filteredPlaces = useMemo(() => {
    return selectedRegion === 'All' 
      ? allPlaces 
      : allPlaces.filter(place => place.region === selectedRegion);
  }, [allPlaces, selectedRegion]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/'); 
  };

  const navLinks = [
    { name: "HOME", path: "/welcome" },
    { name: "DESTINATIONS", path: "/destinations" },
    { name: "ABOUT", path: "/about" },
    { name: "PACKAGES", path: "/packages" },
    { name: "CONTACT", path: "/contact" },
  ];

  // Apply dark class to a wrapper div for this demo
  const themeClass = isDarkMode ? "dark bg-zinc-950 text-white" : "bg-white text-zinc-900";

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${themeClass}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 w-full border-b backdrop-blur-md transition-colors ${
        isDarkMode ? "bg-zinc-950/80 border-zinc-800" : "bg-white/80 border-zinc-100"
      }`}>
        <div className="container flex h-20 items-center justify-between px-4 md:px-8 mx-auto">
          <div className="text-xl md:text-2xl font-black tracking-tighter text-green-600 cursor-pointer" onClick={() => navigate('/welcome')}>
            DISCOVER ETHIOPIA
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`transition-colors duration-200 ${isDarkMode ? "text-zinc-400 hover:text-green-400" : "text-zinc-600 hover:text-green-600"}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Theme Toggle Button */}
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
              {isDarkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-zinc-600" />}
            </Button>

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className={`rounded-full border ${isDarkMode ? "border-zinc-800 bg-zinc-900" : "border-zinc-200"}`}>
                    <User className={`h-5 w-5 ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className={`w-56 ${isDarkMode ? "bg-zinc-900 border-zinc-800 text-white" : ""}`}>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className={isDarkMode ? "bg-zinc-800" : ""} />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <Settings className="mr-2 h-4 w-4" /> Edit Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className={isDarkMode ? "bg-zinc-800" : ""} />
                  <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => navigate('/login')} variant="ghost" className="text-sm font-bold">Login</Button>
            )}

            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon"><Menu className="h-6 w-6" /></Button>
                </SheetTrigger>
                <SheetContent side="right" className={isDarkMode ? "bg-zinc-950 border-zinc-800 text-white" : ""}>
                  <SheetHeader><SheetTitle className="text-left text-green-600 font-black">MENU</SheetTitle></SheetHeader>
                  <nav className="flex flex-col gap-6 mt-10">
                    {navLinks.map((link) => (
                      <Link key={link.name} to={link.path} className="text-xl font-bold border-b border-zinc-100 pb-2">{link.name}</Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
          <img className="absolute inset-0 w-full h-full object-cover brightness-[0.4]" src="/image/home-hero.jpg" alt="Hero" />
          <div className="relative z-10 container px-6 text-center text-white">
            <h1 className="text-4xl md:text-7xl font-black mb-6 leading-[1.1]">Discover the Timeless <br/><span className="text-green-400">Beauty of Ethiopia</span></h1>
            {/* <div className={`flex w-full max-w-md mx-auto items-center space-x-2 p-1.5 rounded-full shadow-2xl ${isDarkMode ? "bg-zinc-900 border border-zinc-800" : "bg-white"}`}>
              <Input type="text" placeholder="Search destinations..." className="border-none focus-visible:ring-0 rounded-full text-zinc-900 dark:text-white flex-1 pl-4 bg-transparent" />
              <Button className="rounded-full bg-green-600 px-6"><Search className="h-4 w-4" /></Button>
            </div> */}
          </div>
        </section>

        {/* Explore Section - Unified Background */}
        <section className={`py-16 md:py-24 transition-colors ${isDarkMode ? "bg-zinc-950" : "bg-zinc-50"}`}>
          <div className="container max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-black mb-6 flex items-center gap-2">
                  <MapPin className="text-green-500" /> Discover Regions
                </h2>
                <div className="flex flex-wrap gap-3">
                  {['All', 'Addis Ababa', 'Amhara', 'Oromia', 'Tigray', 'Afar'].map((region) => (
                    <Button 
                      key={region} 
                      variant={selectedRegion === region ? "default" : "outline"}
                      onClick={() => setSelectedRegion(region)}
                      className={`rounded-full px-6 transition-all ${
                        selectedRegion === region 
                        ? "bg-green-600 hover:bg-green-700 text-white" 
                        : isDarkMode ? "border-zinc-800 text-zinc-400 hover:border-zinc-500" : "border-zinc-200 text-zinc-600"
                      }`}
                    >
                      {region}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPlaces.map((place) => (
                <Card 
                  key={place.id} 
                  className={`overflow-hidden border-none transition-all duration-300 rounded-2xl shadow-lg hover:shadow-2xl ${
                    isDarkMode ? "bg-zinc-900 hover:bg-zinc-800/80" : "bg-white"
                  }`}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img src={place.img} alt={place.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                    <Badge className="absolute top-4 left-4 bg-green-600/90 text-white border-none backdrop-blur-sm">{place.region}</Badge>
                  </div>
                  <CardHeader className="p-5 pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl font-bold">{place.title}</CardTitle>
                      <span className="flex items-center text-green-500 font-bold text-sm">
                        <Star className="h-3 w-3 fill-current mr-1" /> {place.rating}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="px-5 pb-4">
                    <p className={`text-sm line-clamp-2 ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}>{place.desc}</p>
                  </CardContent>
                  <CardFooter className={`px-5 py-4 border-t flex justify-between items-center ${isDarkMode ? "border-zinc-800" : "border-zinc-50"}`}>
                    <Button variant="link" className="text-green-500 p-0 h-auto font-bold" onClick={() => navigate('/destinations')}>Details</Button>
                    <Navigation className="h-4 w-4 text-zinc-500" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Lower Info Panels */}
        <section className={`py-20 transition-colors ${isDarkMode ? "bg-zinc-900" : "bg-white"}`}>
          <div className="container max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <InfoCard isDarkMode={isDarkMode} title="Local Expertise" desc="Curated tours by native guides." link="/about" label="Learn More" />
            <InfoCard isDarkMode={isDarkMode} title="Tailored Trips" desc="Packages for every traveler type." link="/packages" label="Explore" />
            <InfoCard isDarkMode={isDarkMode} title="Visual Story" desc="High-def gallery of our landscapes." link="/gallery" label="View" />
          </div>
        </section>
      </main>

      <footer className={`py-16 border-t transition-colors ${isDarkMode ? "bg-zinc-950 border-zinc-800" : "bg-white border-zinc-100"}`}>
        <div className="container px-6 text-center mx-auto space-y-4">
          <div className="text-green-600 text-2xl font-black">DISCOVER ETHIOPIA</div>
          <p className={`text-xs md:text-sm font-medium ${isDarkMode ? "text-zinc-500" : "text-zinc-400"}`}>
            © 2026 Alif Innovators. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

const InfoCard = ({ title, desc, link, label, isDarkMode }) => (
  <Card className={`flex flex-col h-full border transition-colors rounded-xl shadow-sm ${
    isDarkMode ? "bg-zinc-950 border-zinc-800" : "bg-zinc-50 border-zinc-100"
  }`}>
    <CardHeader><CardTitle className="text-lg font-bold">{title}</CardTitle></CardHeader>
    <CardContent className="grow"><p className={`text-sm leading-relaxed ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}>{desc}</p></CardContent>
    <CardFooter>
      <Button variant="link" asChild className="p-0 text-green-500 font-bold"><Link to={link}>{label} →</Link></Button>
    </CardFooter>
  </Card>
);

export default WelcomePage;
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Moon, 
  Sun, 
  User, 
  LogOut, 
  Settings, 
  Menu,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const team = [
  { name: "Hayat Z", role: "Founder & Product Lead", img: "/image/women profile.jpg" },
  { name: "Hayat M", role: "Content & Storyteller", img: "/image/women profile.jpg" },
  { name: "Rahmi", role: "Community Manager", img: "/image/women profile.jpg" },
  { name: "abebe", role: "Experience Designer", img: "/image/men profile.jpg" },
  { name: "kebede", role: "Operations", img: "/image/men profile.jpg" },
  { name: "abdi", role: "Media & Partnerships", img: "/image/men profile.jpg" },
];

const navLinks = [
  { name: "Home", path: "/welcome" },
  { name: "Destinations", path: "/destinations" },
  { name: "About", path: "/about" },
  { name: "Packages", path: "/packages" },
  { name: "Contact", path: "/contact" },
];

export default function AboutPage() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const handleLogout = () => setIsLoggedIn(false);

  const themeClass = isDarkMode ? "dark bg-zinc-950 text-white" : "bg-white text-zinc-900";

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${themeClass}`}>
      
      {/* --- SHARED HEADER --- */}
      <header className={`sticky top-0 z-50 w-full border-b backdrop-blur-md transition-colors ${
        isDarkMode ? "bg-zinc-950/80 border-zinc-800" : "bg-white/80 border-zinc-100"
      }`}>
        <div className="container flex h-20 items-center justify-between px-4 md:px-8 mx-auto">
          <div className="text-xl md:text-2xl font-black tracking-tighter text-green-600 cursor-pointer" onClick={() => navigate('/welcome')}>
            DISCOVER ETHIOPIA
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold uppercase tracking-wide">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`transition-colors duration-200 ${
                  isDarkMode ? "text-zinc-400 hover:text-green-400" : "text-zinc-600 hover:text-green-600"
                } ${link.path === "/about" ? "text-green-600" : ""}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
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
                <DropdownMenuContent align="end" className={`w-56 rounded-2xl ${isDarkMode ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white"}`}>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className={isDarkMode ? "bg-zinc-800" : ""} />
                  <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" /> Edit Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className={isDarkMode ? "bg-zinc-800" : ""} />
                  <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={handleLogout}>
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
                  <Button variant="ghost" size="icon" className={isDarkMode ? "text-white" : "text-zinc-900"}><Menu className="h-6 w-6" /></Button>
                </SheetTrigger>
                <SheetContent side="right" className={isDarkMode ? "bg-zinc-950 border-zinc-800 text-white" : "bg-white"}>
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
        {/* Hero Section */}
        <section className={`py-20 transition-colors ${isDarkMode ? "bg-zinc-900" : "bg-green-50"}`}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center px-6">
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight tracking-tighter">Unveiling the Timeless Beauty of Ethiopia</h2>
              <p className={`text-lg leading-relaxed mb-8 ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                Our mission is to guide you through the ancient history, vibrant culture, and breathtaking landscapes of the Horn of Africa. We design responsible, immersive journeys that support local communities and protect natural heritage.
              </p>
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 h-14 rounded-full font-bold text-lg" onClick={() => navigate('/destinations')}>
                Explore Our Story
              </Button>
            </div>
            <div className="flex-1 relative">
              <div className="absolute -inset-4 bg-green-600/20 rounded-[2.5rem] blur-2xl"></div>
              <img
                src="/image/home-heroo.jpg"
                alt="Ethiopia landscape"
                className="relative rounded-4xl shadow-2xl object-cover w-full h-100"
                onError={e => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1508264165352-cb2ecb3f9bfc?q=80&w=800&auto=format&fit=crop'; }}
              />
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className={`py-24 transition-colors ${isDarkMode ? "bg-zinc-950" : "bg-white"}`}>
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-black tracking-tighter mb-4">Meet the Creators</h3>
              <div className="h-1 w-20 bg-green-600 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
              {team.map(member => (
                <div className={`group flex flex-col items-center p-8 rounded-4xl transition-all duration-300 ${
                  isDarkMode ? "bg-zinc-900 border border-zinc-800 hover:border-green-600/50" : "bg-zinc-50 border border-zinc-100 hover:shadow-xl"
                }`} key={member.name}>
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-green-600 rounded-full scale-0 group-hover:scale-110 transition-transform duration-300 opacity-20"></div>
                    <img
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg relative z-10"
                      src={member.img}
                      alt={member.name}
                      onError={e => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=200&auto=format&fit=facearea'; }}
                    />
                  </div>
                  <h4 className="text-lg font-black text-center mb-1">{member.name}</h4>
                  <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest text-center">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className={`py-20 transition-colors ${isDarkMode ? "bg-zinc-900/50" : "bg-green-50"}`}>
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h3 className="text-3xl font-black mb-6 tracking-tight">Start Your Journey</h3>
            <p className={`text-lg mb-10 ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}>
              Ready to explore Ethiopia? Send us a message or request a tailored itinerary.
            </p>
            <div className={`grid md:grid-cols-3 gap-8 text-left p-10 rounded-[2.5rem] shadow-xl ${isDarkMode ? "bg-zinc-900 border border-zinc-800" : "bg-white"}`}>
              <div className="flex flex-col gap-2">
                <Mail className="text-green-600 h-6 w-6 mb-2" />
                <span className="font-black uppercase text-xs tracking-widest text-zinc-400">Email</span>
                <span className="font-bold text-sm">hello@ethiopia.com</span>
              </div>
              <div className="flex flex-col gap-2">
                <Phone className="text-green-600 h-6 w-6 mb-2" />
                <span className="font-black uppercase text-xs tracking-widest text-zinc-400">Phone</span>
                <span className="font-bold text-sm">+251 935 615 567</span>
              </div>
              <div className="flex flex-col gap-2">
                <MapPin className="text-green-600 h-6 w-6 mb-2" />
                <span className="font-black uppercase text-xs tracking-widest text-zinc-400">Office</span>
                <span className="font-bold text-sm">Bole, Addis Ababa</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`py-16 border-t transition-colors ${isDarkMode ? "bg-zinc-950 border-zinc-900" : "bg-white border-zinc-50"}`}>
        <div className="container px-6 text-center mx-auto">
          <div className="text-green-600 text-xl font-black mb-2 uppercase tracking-tighter">DISCOVER ETHIOPIA</div>
          <p className="text-xs text-zinc-500 font-medium">© 2026 Alif Innovators. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
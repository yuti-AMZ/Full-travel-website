import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  ExternalLink, 
  ChevronRight,
  Moon,
  Sun,
  User,
  LogOut,
  Settings,
  Menu
} from 'lucide-react';

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

// Data from your content
const destinationsData = [
  {
    id: 1,
    name: "Lalibela",
    slug: "lalibela",
    region: "Amhara",
    theme: "history",
    image: "/image/lalibela.jpg",
    description: "Explore the 12th-century rock-hewn churches carved from living stone.",
    details: "Lalibela is a world heritage site famous for its monolithic churches carved out of rock. It remains a major site of pilgrimage for Ethiopian Orthodox Christians."
  },
  {
    id: 2,
    name: "Simien Mountains",
    slug: "simien-mountains",
    region: "Amhara",
    theme: "trekking",
    image: "/image/Simien Mountains, Ethiopia.jpg",
    description: "Home to the Walia ibex and dramatic, jagged escarpments.",
    details: "The Simien Mountains National Park is often called the 'Roof of Africa'. It offers some of the most spectacular landscapes in the world."
  },
  {
    id: 3,
    name: "Danakil Depression",
    slug: "danakil-depression",
    region: "Afar",
    theme: "adventure",
    image: "/image/denakil.jpg",
    description: "A surreal landscape of salt flats, volcanoes, and neon minerals.",
    details: "The Danakil Depression is one of the hottest and lowest points on earth, featuring the active Erta Ale volcano and the colorful Dallol hydrothermal fields."
  }
];

const navLinks = [
  { name: "Home", path: "/welcome" },
  { name: "Destinations", path: "/destinations" },
  { name: "About", path: "/about" },
  { name: "Packages", path: "/packages" },
  { name: "Contact", path: "/contact" },
];

export default function DestinationsPage() {
  const navigate = useNavigate();
  
  // States
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");
  const [theme, setTheme] = useState("all");
  const [selectedDest, setSelectedDest] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const handleLogout = () => setIsLoggedIn(false);

  // Filter Logic
  const filtered = useMemo(() => {
    return destinationsData.filter(dest => {
      const matchesSearch = dest.name.toLowerCase().includes(search.toLowerCase());
      const matchesRegion = region === "all" || dest.region.toLowerCase() === region.toLowerCase();
      const matchesTheme = theme === "all" || dest.theme === theme;
      return matchesSearch && matchesRegion && matchesTheme;
    });
  }, [search, region, theme]);

  const handleOpenDetail = (slug) => {
    navigate(`/destinations/${slug}`);
  };

  const themeClass = isDarkMode ? "dark bg-zinc-950 text-white" : "bg-zinc-50 text-zinc-900";

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${themeClass}`}>
      
      {/* --- HEADER --- */}
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
                } ${link.path === "/destinations" ? "text-green-600" : ""}`}
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
                  <Button variant="ghost" size="icon"><Menu className="h-6 w-6" /></Button>
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
        {/* --- HERO & FILTERS --- */}
        <section className={`py-16 border-b transition-colors ${isDarkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-100'}`}>
          <div className="container max-w-5xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Explore Destinations</h1>
            <p className={`max-w-2xl mx-auto mb-12 text-lg ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
              Uncover ancient mysteries, vibrant cultures, and natural wonders across the Horn of Africa.
            </p>

            {/* Filter Bar */}
            <div className={`flex flex-col md:flex-row gap-4 items-center justify-center p-4 rounded-3xl shadow-2xl border transition-all ${
              isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-100'
            }`}>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <Input 
                  placeholder="Search..." 
                  className={`pl-10 h-12 rounded-full border-none ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-100'}`}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className={`h-12 w-full md:w-44 rounded-full border-none ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-100'}`}>
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="amhara">Amhara</SelectItem>
                  <SelectItem value="afar">Afar</SelectItem>
                  <SelectItem value="oromia">Oromia</SelectItem>
                  <SelectItem value="tigray">Tigray</SelectItem>
                  <SelectItem value="addis ababa">Addis Ababa</SelectItem>
                </SelectContent>
              </Select>

              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className={`h-12 w-full md:w-44 rounded-full border-none ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-100'}`}>
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Themes</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                  <SelectItem value="trekking">Trekking</SelectItem>
                  <SelectItem value="adventure">Adventure</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="ghost" className="font-bold text-zinc-400" onClick={() => {setSearch(""); setRegion("all"); setTheme("all");}}>
                Reset
              </Button>
            </div>
          </div>
        </section>

        {/* --- GRID SECTION --- */}
        <section className="py-20 container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filtered.slice(0, visibleCount).map((dest) => (
              <Card 
                key={dest.id} 
                className={`group overflow-hidden border-none transition-all duration-500 rounded-4xl cursor-pointer shadow-xl ${
                  isDarkMode ? 'bg-zinc-900 shadow-black/50' : 'bg-white shadow-zinc-200'
                }`}
                onClick={() => setSelectedDest(dest)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <Badge className="absolute top-4 left-4 bg-green-600/90 text-white border-none py-1 px-4">{dest.region}</Badge>
                </div>
                <CardHeader className="p-8 pb-2">
                  <CardTitle className="text-2xl font-black">{dest.name}</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-6">
                  <p className={`text-sm line-clamp-2 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>{dest.description}</p>
                </CardContent>
                <CardFooter className={`px-8 py-6 border-t flex justify-between items-center transition-colors ${isDarkMode ? 'border-zinc-800' : 'border-zinc-50'}`}>
                  <Button variant="link" className="p-0 text-green-600 font-black h-auto uppercase tracking-tighter">
                    View Overview
                  </Button>
                  <ChevronRight className="h-4 w-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
                </CardFooter>
              </Card>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-24">
              <p className="text-zinc-400 text-lg">No matches found for your search.</p>
            </div>
          )}

          {filtered.length > visibleCount && (
            <div className="flex justify-center mt-16">
              <Button 
                variant="outline" 
                className={`rounded-full px-10 h-14 font-bold border-2 ${isDarkMode ? 'border-zinc-800 hover:bg-zinc-800' : 'border-zinc-200 hover:border-green-600 hover:text-green-600'}`}
                onClick={() => setVisibleCount(prev => prev + 3)}
              >
                Load More
              </Button>
            </div>
          )}
        </section>
      </main>

      {/* --- DETAIL DIALOG --- */}
      <Dialog open={!!selectedDest} onOpenChange={() => setSelectedDest(null)}>
        {selectedDest && (
          <DialogContent className={`sm:max-w-125 rounded-[2.5rem] border-none p-0 overflow-hidden ${isDarkMode ? 'bg-zinc-900 text-white' : 'bg-white'}`}>
            <div className="relative h-56">
                <img src={selectedDest.image} alt={selectedDest.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-8">
                    <DialogHeader>
                        <div className="text-white/80 text-xs font-bold uppercase tracking-widest mb-1">{selectedDest.region}</div>
                        <DialogTitle className="text-3xl font-black text-white">{selectedDest.name}</DialogTitle>
                    </DialogHeader>
                </div>
            </div>
            <div className="p-8">
              <p className={`leading-relaxed mb-8 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {selectedDest.details}
              </p>
              <Button 
                className="bg-green-600 hover:bg-green-700 w-full h-14 rounded-2xl font-bold text-white shadow-lg shadow-green-600/20"
                onClick={() => handleOpenDetail(selectedDest.slug)}
              >
                <ExternalLink className="mr-2 h-4 w-4" /> Open Full Detail Page
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>

      <footer className={`py-16 border-t transition-colors ${isDarkMode ? 'bg-zinc-950 border-zinc-900' : 'bg-white border-zinc-100'}`}>
        <div className="container px-6 text-center mx-auto">
          <div className="text-green-600 text-xl font-black mb-4">DISCOVER ETHIOPIA</div>
          <p className="text-xs text-zinc-500">© 2026 Alif Innovators. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
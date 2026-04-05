/* eslint-disable react-hooks/purity */
import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Search, 
  Moon, 
  Sun, 
  User, 
  LogOut, 
  Settings, 
  Menu,
  CheckCircle2,
  CreditCard,
  ChevronRight,
  Calendar,
  ShieldCheck
} from 'lucide-react';

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const packagesData = [
  {
    id: 1,
    name: "Simien Mountains Trek",
    duration: "4-7",
    theme: "adventure",
    price: 450,
    image: "/image/Simien Mountains, Ethiopia.jpg",
    description: "A breathtaking trek through the Simien Mountains, home to unique wildlife and jagged escarpments."
  },
  {
    id: 2,
    name: "Cultural Lalibela",
    duration: "2-3",
    theme: "culture",
    price: 320,
    image: "/image/lalibela.jpg",
    description: "Explore the ancient rock-hewn churches and vibrant spiritual culture of Lalibela."
  },
  {
    id: 3,
    name: "Danakil Depression",
    duration: "8plus",
    theme: "adventure",
    price: 890,
    image: "/image/denakil.jpg",
    description: "Experience the surreal landscapes, salt flats, and active volcanoes of the Danakil Depression."
  }
];

const navLinks = [
  { name: "Home", path: "/welcome" },
  { name: "Destinations", path: "/destinations" },
  { name: "About", path: "/about" },
  { name: "Packages", path: "/packages" },
  { name: "Contact", path: "/contact" },
];

export default function PackagesPage() {
  const navigate = useNavigate();
  
  // Theme & UI States
  const [isDarkMode, setIsDarkMode] = useState(false);
  // eslint-disable-next-line no-empty-pattern
  const [] = useState(true);

  // Filter States
  const [search, setSearch] = useState("");
  const [duration, setDuration] = useState("all");
  const [theme, setTheme] = useState("all");

  // Payment/Booking Workflow States
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [paymentStep, setPaymentStep] = useState(1); // 1: Info, 2: Payment, 3: Success

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const themeClass = isDarkMode ? "dark bg-zinc-950 text-white" : "bg-zinc-50 text-zinc-900";

  const filtered = useMemo(() => {
    return packagesData.filter(pkg => {
      const matchesSearch = pkg.name.toLowerCase().includes(search.toLowerCase());
      const matchesDuration = duration === "all" || pkg.duration === duration;
      const matchesTheme = theme === "all" || pkg.theme === theme;
      return matchesSearch && matchesDuration && matchesTheme;
    });
  }, [search, duration, theme]);

  const handleBookingClose = () => {
    setSelectedPkg(null);
    setPaymentStep(1);
  };

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
                } ${link.path === "/packages" ? "text-green-600" : ""}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
              {isDarkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-zinc-600" />}
            </Button>

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
                <DropdownMenuItem className="text-red-600 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className={isDarkMode ? "text-white" : "text-zinc-900"}>
                    <Menu className="h-6 w-6" />
                  </Button>
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
        {/* --- FILTER SECTION --- */}
        <section className={`py-12 border-b transition-colors ${isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-100"}`}>
          <div className="container max-w-5xl mx-auto px-6 text-center">
            <h1 className="text-3xl md:text-5xl font-black mb-4">Travel Packages</h1>
            <p className={`text-sm md:text-base mb-10 ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}>
              Curated itineraries across Ethiopia — customizable by duration and theme.
            </p>

            <div className={`flex flex-col md:flex-row gap-4 p-4 rounded-4xl shadow-xl border ${
              isDarkMode ? "bg-zinc-800 border-zinc-700 shadow-black/20" : "bg-white border-zinc-100 shadow-zinc-200/50"
            }`}>
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <Input 
                  placeholder="Search packages..." 
                  className={`pl-10 rounded-full h-12 border-none ${isDarkMode ? "bg-zinc-900" : "bg-zinc-100"}`}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger className={`w-full md:w-44 rounded-full h-12 border-none ${isDarkMode ? "bg-zinc-900" : "bg-zinc-100"}`}>
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent className={isDarkMode ? "bg-zinc-900 text-white border-zinc-800" : ""}>
                  <SelectItem value="all">Any Duration</SelectItem>
                  <SelectItem value="2-3">2-3 days</SelectItem>
                  <SelectItem value="4-7">4-7 days</SelectItem>
                  <SelectItem value="8plus">8+ days</SelectItem>
                </SelectContent>
              </Select>

              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className={`w-full md:w-44 rounded-full h-12 border-none ${isDarkMode ? "bg-zinc-900" : "bg-zinc-100"}`}>
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent className={isDarkMode ? "bg-zinc-900 text-white border-zinc-800" : ""}>
                  <SelectItem value="all">All Themes</SelectItem>
                  <SelectItem value="adventure">Adventure</SelectItem>
                  <SelectItem value="culture">Culture</SelectItem>
                  <SelectItem value="wildlife">Wildlife</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="ghost" className="text-zinc-500 font-bold" onClick={() => {setSearch(""); setDuration("all"); setTheme("all");}}>
                Clear
              </Button>
            </div>
          </div>
        </section>

        {/* --- PACKAGES GRID --- */}
        <section className="py-16 container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((pkg) => (
              <Card key={pkg.id} className={`overflow-hidden border-none shadow-lg rounded-[2.5rem] group hover:shadow-2xl transition-all duration-300 ${
                isDarkMode ? "bg-zinc-900 text-white shadow-black/40" : "bg-white shadow-zinc-200"
              }`}>
                <div className="relative h-60 overflow-hidden">
                  <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <Badge className="absolute top-5 right-5 bg-white/90 backdrop-blur text-green-700 font-black border-none px-4 py-1 rounded-full">
                    ${pkg.price}
                  </Badge>
                </div>
                <CardHeader className="p-8 pb-2">
                  <div className="flex items-center gap-2 text-green-600 text-xs font-bold uppercase tracking-widest mb-2">
                    <Calendar className="h-3.5 w-3.5" /> {pkg.duration === '8plus' ? '8+ days' : `${pkg.duration} days`}
                  </div>
                  <CardTitle className="text-2xl font-black">{pkg.name}</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-6">
                  <p className={`text-sm leading-relaxed line-clamp-2 ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                    {pkg.description}
                  </p>
                </CardContent>
                <CardFooter className={`px-8 py-6 border-t flex justify-between items-center ${isDarkMode ? "border-zinc-800" : "border-zinc-50"}`}>
                  <Button 
                    variant="link" 
                    className="p-0 text-green-600 font-bold h-auto uppercase text-xs tracking-widest hover:no-underline hover:text-green-700"
                    onClick={() => setSelectedPkg(pkg)}
                  >
                    Book This Package
                  </Button>
                  <ChevronRight className="h-4 w-4 text-zinc-300" />
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-zinc-500 font-medium">No packages found matching your criteria.</p>
            </div>
          )}
        </section>
      </main>

      {/* --- PAYMENT MODAL (THE PROCESS) --- */}
      <Dialog open={!!selectedPkg} onOpenChange={handleBookingClose}>
        <DialogContent className={`sm:max-w-112.5 rounded-[2.5rem] p-8 border-none ${isDarkMode ? "bg-zinc-900 text-white shadow-2xl shadow-black" : ""}`}>
          
          {paymentStep === 1 && (
            <div className="space-y-6 animate-in fade-in zoom-in duration-300">
              <DialogHeader>
                <DialogTitle className="text-3xl font-black tracking-tighter">Your Trip</DialogTitle>
                <DialogDescription className="text-zinc-500">Review your selection for {selectedPkg?.name}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Full Name" className={`h-12 rounded-xl border-zinc-200 ${isDarkMode ? "bg-zinc-800 border-none" : "bg-zinc-50"}`} />
                <Input placeholder="Email Address" type="email" className={`h-12 rounded-xl border-zinc-200 ${isDarkMode ? "bg-zinc-800 border-none" : "bg-zinc-50"}`} />
                <div className={`p-5 rounded-2xl border ${isDarkMode ? "bg-zinc-800/50 border-zinc-700" : "bg-green-50/50 border-green-100"}`}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-zinc-500">Package Rate</span>
                    <span className="font-bold">${selectedPkg?.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Taxes & Fees</span>
                    <span className="font-bold">$45</span>
                  </div>
                  <div className="border-t border-zinc-200 dark:border-zinc-700 mt-4 pt-4 flex justify-between font-black text-xl text-green-600">
                    <span>Total Cost</span>
                    <span>${selectedPkg?.price + 45}</span>
                  </div>
                </div>
              </div>
              <Button className="w-full h-14 rounded-2xl bg-green-600 hover:bg-green-700 font-bold text-lg" onClick={() => setPaymentStep(2)}>
                Proceed to Payment
              </Button>
            </div>
          )}

          {paymentStep === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right duration-300">
              <DialogHeader>
                <DialogTitle className="text-3xl font-black tracking-tighter">Secure Payment</DialogTitle>
                <DialogDescription className="text-zinc-500">Enter your card details to finalize booking.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <Input placeholder="Card Number" className={`h-12 pl-12 rounded-xl border-zinc-200 ${isDarkMode ? "bg-zinc-800 border-none" : "bg-zinc-50"}`} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="MM/YY" className={`h-12 rounded-xl border-zinc-200 ${isDarkMode ? "bg-zinc-800 border-none" : "bg-zinc-50"}`} />
                  <Input placeholder="CVC" className={`h-12 rounded-xl border-zinc-200 ${isDarkMode ? "bg-zinc-800 border-none" : "bg-zinc-50"}`} />
                </div>
                <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-2 justify-center">
                  <ShieldCheck className="h-3 w-3" /> Encrypted & Secure Payment
                </div>
              </div>
              <Button className="w-full h-14 rounded-2xl bg-green-600 hover:bg-green-700 font-bold text-lg" onClick={() => setPaymentStep(3)}>
                Complete Booking
              </Button>
            </div>
          )}

          {paymentStep === 3 && (
            <div className="py-10 text-center space-y-6 animate-in zoom-in duration-500">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-green-200/50">
                <CheckCircle2 className="h-12 w-12" />
              </div>
              <div>
                <h2 className="text-3xl font-black tracking-tighter mb-2">You're All Set!</h2>
                <p className={`text-sm ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                  // eslint-disable-next-line react-hooks/purity, react-hooks/purity, react-hooks/purity
                  Booking ID: <span className="font-bold text-green-600 uppercase">ETH-{Math.floor(Math.random() * 10000)}</span>
                </p>
              </div>
              <p className={`text-base px-4 leading-relaxed ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                Your adventure to <strong>{selectedPkg?.name}</strong> is confirmed. Check your email for the full itinerary.
              </p>
              <Button variant="outline" className={`w-full h-12 rounded-xl font-bold ${isDarkMode ? "border-zinc-800" : ""}`} onClick={handleBookingClose}>
                Return to Packages
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* --- FOOTER --- */}
      <footer className={`py-16 border-t transition-colors ${isDarkMode ? "bg-zinc-950 border-zinc-900" : "bg-white border-zinc-50"}`}>
        <div className="container px-6 text-center mx-auto">
          <div className="text-green-600 text-xl font-black mb-2 uppercase tracking-tighter">DISCOVER ETHIOPIA</div>
          <p className="text-xs text-zinc-500 font-medium">© 2026 Alif Innovators. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
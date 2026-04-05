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
  MapPin,
  Send,
  CheckCircle2
} from 'lucide-react';

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { name: "Home", path: "/welcome" },
  { name: "Destinations", path: "/destinations" },
  { name: "About", path: "/about" },
  { name: "Packages", path: "/packages" },
  { name: "Contact", path: "/contact" },
];

export default function ContactPage() {
  const navigate = useNavigate();
  
  // Theme & Auth States
  const [isDarkMode, setIsDarkMode] = useState(false);
  // eslint-disable-next-line no-empty-pattern
  const [] = useState(true);

  // Form States
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const themeClass = isDarkMode ? "dark bg-zinc-950 text-white" : "bg-zinc-50 text-zinc-900";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
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
                } ${link.path === "/contact" ? "text-green-600" : ""}`}
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
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <Settings className="mr-2 h-4 w-4" /> Edit Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator className={isDarkMode ? "bg-zinc-800" : ""} />
                <DropdownMenuItem className="text-red-600">
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
        {/* --- HERO SECTION --- */}
        <section className={`py-16 text-center transition-colors ${isDarkMode ? "bg-zinc-900" : "bg-green-50"}`}>
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">Get In Touch</h2>
            <p className={`text-lg ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}>
              We are happy to help plan your Ethiopian adventure. Send us a message and we will respond within 24–48 hours.
            </p>
          </div>
        </section>

        {/* --- CONTACT GRID --- */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left: Contact Form */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-black tracking-tight mb-2">Send us a message</h3>
                <div className="h-1 w-12 bg-green-600 rounded-full"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-bold">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      required 
                      className={`h-12 rounded-xl ${isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white"}`}
                      value={form.name} 
                      onChange={handleChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-bold">Email Address</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      required 
                      className={`h-12 rounded-xl ${isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white"}`}
                      value={form.email} 
                      onChange={handleChange} 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="font-bold">Subject</Label>
                  <Input 
                    id="subject" 
                    name="subject" 
                    className={`h-12 rounded-xl ${isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white"}`}
                    value={form.subject} 
                    onChange={handleChange} 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="font-bold">Your Message</Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    rows={6} 
                    required 
                    className={`rounded-2xl resize-none ${isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white"}`}
                    value={form.message} 
                    onChange={handleChange} 
                  />
                </div>

                <Button type="submit" className="w-full md:w-auto h-14 px-10 rounded-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg shadow-lg shadow-green-600/20">
                  {submitted ? <CheckCircle2 className="mr-2 h-5 w-5" /> : <Send className="mr-2 h-5 w-5" />}
                  {submitted ? "Message Sent!" : "Send Message"}
                </Button>

                {submitted && (
                  <div className="p-4 bg-green-100 text-green-700 rounded-2xl font-bold text-sm animate-in fade-in slide-in-from-top-2">
                    Thank you! We've received your message and will get back to you shortly.
                  </div>
                )}
              </form>
            </div>

            {/* Right: Info & Map */}
            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                <Card className={`border-none rounded-4xl shadow-xl ${isDarkMode ? "bg-zinc-900" : "bg-white"}`}>
                  <CardContent className="p-8 flex items-start gap-4">
                    <div className="p-3 bg-green-100 text-green-600 rounded-2xl">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-black uppercase text-xs tracking-widest text-zinc-400 mb-1">Email Us</h4>
                      <p className="font-bold">hello@ethiopia-discovery.com</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className={`border-none rounded-4xl shadow-xl ${isDarkMode ? "bg-zinc-900" : "bg-white"}`}>
                  <CardContent className="p-8 flex items-start gap-4">
                    <div className="p-3 bg-green-100 text-green-600 rounded-2xl">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-black uppercase text-xs tracking-widest text-zinc-400 mb-1">Call Us</h4>
                      <p className="font-bold">+251 935 615 567</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className={`border-none rounded-4xl shadow-xl ${isDarkMode ? "bg-zinc-900" : "bg-white"}`}>
                  <CardContent className="p-8 flex items-start gap-4">
                    <div className="p-3 bg-green-100 text-green-600 rounded-2xl">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-black uppercase text-xs tracking-widest text-zinc-400 mb-1">Visit Us</h4>
                      <p className="font-bold">Bole Road, Addis Ababa, Ethiopia</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Map Embed */}
              <div className="overflow-hidden rounded-[2.5rem] shadow-2xl h-75 border-4 border-white dark:border-zinc-800">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126115.1155554628!2d38.70624959146112!3d8.963176865239335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sAddis%20Ababa!5e0!3m2!1sen!2set!4v1710000000000!5m2!1sen!2set" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy"
                ></iframe>
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className={`py-16 border-t transition-colors ${isDarkMode ? "bg-zinc-950 border-zinc-900" : "bg-white border-zinc-50"}`}>
        <div className="container px-6 text-center mx-auto">
          <div className="text-green-600 text-xl font-black mb-2 uppercase tracking-tighter">DISCOVER ETHIOPIA</div>
          <p className="text-xs text-zinc-500 font-medium">© 2026 Discover Ethiopia. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
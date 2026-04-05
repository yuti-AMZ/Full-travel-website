import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Moon, 
  Sun, 
  User, 
  LogOut, 
  Settings, 
  Menu,
  Maximize2,
  X
} from 'lucide-react';

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";

const images = [
  { src: '/image/lalibela.jpg', title: 'Lalibela', span: 'md:col-span-2 md:row-span-2' },
  { src: '/image/Simien Mountains, Ethiopia.jpg', title: 'Simien Mountains', span: 'md:col-span-1' },
  { src: '/image/denakil.jpg', title: 'Danakil Depression', span: 'md:col-span-1' },
  { src: '/image/ethio landscape.jpg', title: 'Highlands', span: 'md:col-span-1' },
  { src: '/image/Axum.jpg', title: 'Obelisk of Axum', span: 'md:col-span-1' },
  { src: '/image/harar.jpg', title: 'Harar Jugol', span: 'md:col-span-2' },
];

const navLinks = [
  { name: "Home", path: "/welcome" },
  { name: "Destinations", path: "/destinations" },
  { name: "About", path: "/about" },
  { name: "Packages", path: "/packages" },
 
  { name: "Contact", path: "/contact" },
];

export default function GalleryPage() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
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
                } ${link.path === "/gallery" ? "text-green-600" : ""}`}
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

      <main className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">Visual Journey</h1>
            <p className={`text-lg max-w-2xl ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}>
              Explore the diverse landscapes, ancient architecture, and vibrant colors of Ethiopia through our lens.
            </p>
          </div>

          {/* --- BENTO GRID GALLERY --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px]">
            {images.map((img, i) => (
              <div 
                key={i} 
                className={`relative group cursor-pointer overflow-hidden rounded-4xl shadow-xl ${img.span}`}
                onClick={() => setSelectedImg(img)}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={e => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1523438097201-51217c399e5c?q=80&w=800'; }}
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                  <div className="flex justify-between items-center">
                    <h3 className="text-white font-black text-xl tracking-tight">{img.title}</h3>
                    <div className="p-2 bg-white/20 backdrop-blur rounded-full text-white">
                      <Maximize2 className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* --- SHADCN DIALOG (Lightbox) --- */}
      <Dialog open={!!selectedImg} onOpenChange={() => setSelectedImg(null)}>
        <DialogContent className={`max-w-5xl w-[95vw] p-0 overflow-hidden border-none rounded-[2.5rem] ${isDarkMode ? "bg-zinc-900" : "bg-white"}`}>
          <div className="relative">
            <img 
              src={selectedImg?.src} 
              alt={selectedImg?.title} 
              className="w-full max-h-[85vh] object-contain bg-zinc-950/10"
            />
            <div className="p-6 md:p-10 flex items-center justify-between">
              <div>
                <h2 className={`text-2xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
                  {selectedImg?.title}
                </h2>
                <p className="text-green-600 font-bold text-sm uppercase tracking-widest">Ethiopia, Africa</p>
              </div>
              <Button 
                onClick={() => setSelectedImg(null)} 
                variant="outline" 
                size="icon" 
                className="rounded-full h-12 w-12"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <footer className={`py-16 border-t mt-12 transition-colors ${isDarkMode ? "bg-zinc-950 border-zinc-900" : "bg-white border-zinc-50"}`}>
        <div className="container px-6 text-center mx-auto">
          <div className="text-green-600 text-xl font-black mb-2 uppercase tracking-tighter">DISCOVER ETHIOPIA</div>
          <p className="text-xs text-zinc-500 font-medium">© 2026 Alif Innovators. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from "sonner";
import { useNavigate, Link } from 'react-router-dom';
import { 
  Moon, Sun, User, LogOut, Settings, Menu, 
  Camera, Save, ArrowLeft, MapPin, Globe 
} from "lucide-react";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, 
  DropdownMenuSeparator, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger 
} from "@/components/ui/sheet";

const navLinks = [
  { name: "Home", path: "/welcome" },
  { name: "Destinations", path: "/destinations" },
  { name: "About", path: "/about" },
  { name: "Packages", path: "/packages" },
  
  { name: "Contact", path: "/contact" },
];

const EditProfile = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { register, handleSubmit } = useForm();

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  
  const themeClass = isDarkMode ? "dark bg-[#0a0a0a] text-white" : "bg-zinc-50 text-zinc-900";

  const onSubmit = (data) => {
    console.log("Updated Profile Data:", data);
    toast.success("Profile updated successfully!");
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${themeClass}`}>
      
      {/* --- SHARED BRAND HEADER --- */}
      <header className={`sticky top-0 z-50 w-full border-b backdrop-blur-xl transition-all ${
        isDarkMode ? "bg-[#0a0a0a]/80 border-zinc-800" : "bg-white/80 border-zinc-100"
      }`}>
        <div className="container flex h-20 items-center justify-between px-6 mx-auto">
          <div 
            className="text-2xl font-black tracking-tighter text-green-600 cursor-pointer uppercase" 
            onClick={() => navigate('/welcome')}
          >
            DISCOVER ETHIOPIA
          </div>

          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`text-xs font-bold uppercase tracking-[0.2em] transition-all hover:text-green-600 ${
                  isDarkMode ? "text-zinc-500" : "text-zinc-400"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
              {isDarkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-zinc-600" />}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full border-zinc-200 dark:border-zinc-800">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-3xl p-2 mt-2">
                <DropdownMenuLabel className="px-3 py-2 text-xs font-black uppercase text-zinc-400">Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')} className="rounded-xl py-2 cursor-pointer bg-zinc-100 dark:bg-zinc-800">
                  <Settings className="mr-2 h-4 w-4" /> Edit Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600 rounded-xl py-2 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" /> Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon"><Menu className="h-6 w-6" /></Button>
                </SheetTrigger>
                <SheetContent side="right" className={isDarkMode ? "bg-zinc-950 border-zinc-800 text-white" : ""}>
                  <SheetHeader><SheetTitle className="text-green-600 font-black">EXPLORE</SheetTitle></SheetHeader>
                  <nav className="flex flex-col gap-6 mt-12">
                    {navLinks.map((link) => (
                      <Link key={link.name} to={link.path} className="text-2xl font-black tracking-tight">{link.name}</Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="py-12 md:py-20 px-6">
        <div className="max-w-3xl mx-auto">
          
          <Button 
            variant="ghost" 
            className="mb-8 gap-2 text-zinc-500 hover:text-green-600 font-bold transition-all p-0"
            onClick={() => navigate('/welcome')}
          >
            <ArrowLeft size={18} /> Back to Dashboard
          </Button>

          <Card className={`border-none shadow-2xl overflow-hidden rounded-[2.5rem] ${
            isDarkMode ? "bg-zinc-900 shadow-black/40" : "bg-white shadow-zinc-200/50"
          }`}>
            
            {/* Branded Banner */}
            <div className="h-40 bg-linear-to-r from-green-700 to-green-500 relative">
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
            
            <CardHeader className="relative pb-0 px-8 md:px-12">
              {/* Profile Picture Upload */}
              <div className="absolute -top-16 left-8 md:left-12">
                <div className={`h-32 w-32 rounded-4xl p-1 shadow-2xl ${isDarkMode ? "bg-zinc-900" : "bg-white"}`}>
                  <div className={`h-full w-full rounded-[1.8rem] flex items-center justify-center text-zinc-400 relative group cursor-pointer overflow-hidden ${
                    isDarkMode ? "bg-zinc-800" : "bg-zinc-100"
                  }`}>
                    <User size={40} className="group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-green-600/80 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all duration-300 text-white">
                      <Camera size={24} className="mb-1" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Update</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-20">
                <CardTitle className="text-4xl font-black tracking-tighter uppercase leading-none">
                  Profile <span className="text-green-600">Settings</span>
                </CardTitle>
                <CardDescription className={`mt-2 font-medium ${isDarkMode ? "text-zinc-500" : "text-zinc-400"}`}>
                  Customize your innovator persona and explorer preferences.
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="pt-10 px-8 md:px-12 pb-12">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="fullName" className="text-xs font-black uppercase tracking-widest text-zinc-500">Full Name</Label>
                    <Input 
                      id="fullName" 
                      {...register("fullName")} 
                      placeholder="e.g. Elias Gebre" 
                      className={`h-14 rounded-2xl border-zinc-100 focus:ring-green-500/20 ${
                        isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-zinc-50"
                      }`}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="username" className="text-xs font-black uppercase tracking-widest text-zinc-500">Username</Label>
                    <div className="relative">
                      <Input 
                        id="username" 
                        {...register("username")} 
                        placeholder="explorer_251" 
                        className={`h-14 rounded-2xl border-zinc-100 pl-10 ${
                          isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-zinc-50"
                        }`}
                      />
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">@</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="bio" className="text-xs font-black uppercase tracking-widest text-zinc-500">About You</Label>
                  <Textarea 
                    id="bio"
                    {...register("bio")}
                    className={`min-h-35 rounded-3xl border-zinc-100 focus:ring-green-500/20 p-4 resize-none ${
                      isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-zinc-50"
                    }`}
                    placeholder="Tell us about your journey as an innovator and your love for Ethiopian heritage..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="location" className="text-xs font-black uppercase tracking-widest text-zinc-500">Location</Label>
                    <div className="relative">
                      <Input 
                        id="location" 
                        {...register("location")} 
                        placeholder="Addis Ababa, Ethiopia" 
                        className={`h-14 rounded-2xl border-zinc-100 pl-10 ${
                          isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-zinc-50"
                        }`}
                      />
                      <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="website" className="text-xs font-black uppercase tracking-widest text-zinc-500">Personal Website</Label>
                    <div className="relative">
                      <Input 
                        id="website" 
                        {...register("website")} 
                        placeholder="www.yourdomain.com" 
                        className={`h-14 rounded-2xl border-zinc-100 pl-10 ${
                          isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-zinc-50"
                        }`}
                      />
                      <Globe size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600" />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className={`flex flex-col sm:flex-row items-center justify-end gap-4 pt-10 border-t ${
                  isDarkMode ? "border-zinc-800" : "border-zinc-100"
                }`}>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    className="w-full sm:w-auto h-14 px-8 rounded-full font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-600"
                    onClick={() => navigate('/welcome')}
                  >
                    Discard
                  </Button>
                  <Button 
                    type="submit" 
                    className="w-full sm:w-auto h-14 bg-green-600 text-white hover:bg-green-700 gap-3 px-10 rounded-full font-black uppercase tracking-widest shadow-xl shadow-green-900/20 transition-all active:scale-95"
                  >
                    <Save size={18} /> Update Profile
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className={`py-16 border-t transition-colors ${isDarkMode ? "bg-black border-zinc-900" : "bg-white border-zinc-100"}`}>
        <div className="container px-6 mx-auto flex flex-col items-center">
          <div className="text-xl font-black tracking-tighter text-green-600 mb-2 uppercase">DISCOVER ETHIOPIA</div>
          <p className="text-[10px] text-zinc-500 font-black tracking-tighter">© 2026 ALIF INNOVATORS GROUP. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
};

export default EditProfile;
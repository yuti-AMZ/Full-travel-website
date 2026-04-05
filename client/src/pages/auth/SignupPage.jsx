import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '@/utils/validation';
import API from '@/api/axiosInstance';
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const SignupPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(signupSchema)
  });

  // Updated onSubmit to actually talk to the database
  const onSubmit = async (data) => {
    try {
      const response = await API.post("/auth/signup", {
        fullName: data.fullName,
        fatherName: data.fatherName,
        username: data.username,
        email: data.email,
        phone: data.phone,
        country: data.location,
        birthDate: data.birthday,
        password: data.password
      });

  
      console.log("Success! Server returned:", response.data);

      toast.success("Account created successfully! ");
      navigate('/welcome');
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Signup failed.";
      toast.error(errorMessage);
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-green-50 via-white to-green-50/30 p-4 py-12">
      <Card className="w-full max-w-lg border-green-100 shadow-2xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-1 pb-4">
          <div className="mx-auto w-14 h-14 bg-linear-to-tr from-green-600 to-green-400 rounded-2xl mb-4 flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-green-200 rotate-3 hover:rotate-0 transition-transform cursor-default">
            E
          </div>
          <CardTitle className="text-3xl font-extrabold text-center tracking-tight text-zinc-900">
            Create Account
          </CardTitle>
          <CardDescription className="text-center text-zinc-500 font-medium">
            Join the our community and start exploring Ethiopia like never before.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-2">
          <Button 
            variant="outline" 
            type="button" 
            onClick={handleGoogleSignup}
            className="w-full border-zinc-200 hover:bg-zinc-50 flex items-center justify-center gap-3 h-12 mb-6 font-semibold text-zinc-700 transition-all hover:border-green-200"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </Button>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-zinc-400 font-bold tracking-widest">OR</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-zinc-700 font-semibold ml-1">Full Name</Label>
                <Input {...register("fullName")} placeholder="John" className="h-11 focus-visible:ring-green-500 border-zinc-200" />
                {errors.fullName && <p className="text-xs font-medium text-red-500 ml-1">{errors.fullName.message}</p>}
              </div>
              <div className="space-y-2">
                <Label className="text-zinc-700 font-semibold ml-1">Father's Name</Label>
                <Input {...register("fatherName")} placeholder="Doe" className="h-11 focus-visible:ring-green-500 border-zinc-200" />
                {errors.fatherName && <p className="text-xs font-medium text-red-500 ml-1">{errors.fatherName.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-zinc-700 font-semibold ml-1">Username</Label>
                <Input {...register("username")} placeholder="johndoe123" className="h-11 focus-visible:ring-green-500 border-zinc-200" />
                {errors.username && <p className="text-xs font-medium text-red-500 ml-1">{errors.username.message}</p>}
              </div>
              <div className="space-y-2">
                <Label className="text-zinc-700 font-semibold ml-1">Birthday</Label>
                <Input type="date" {...register("birthday")} className="h-11 focus-visible:ring-green-500 border-zinc-200" />
                {errors.birthday && <p className="text-xs font-medium text-red-500 ml-1">{errors.birthday.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-700 font-semibold ml-1">Email</Label>
              <Input type="email" {...register("email")} placeholder="yourname@gmail.com" className="h-11 focus-visible:ring-green-500 border-zinc-200" />
              {errors.email && <p className="text-xs font-medium text-red-500 ml-1">{errors.email.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-zinc-700 font-semibold ml-1">Phone</Label>
                <Input {...register("phone")} placeholder="+251..." className="h-11 focus-visible:ring-orange-500 border-zinc-200" />
                {errors.phone && <p className="text-xs font-medium text-red-500 ml-1">{errors.phone.message}</p>}
              </div>
              <div className="space-y-2">
                <Label className="text-zinc-700 font-semibold ml-1">Country</Label>
                <select 
                  {...register("location")} 
                  className="w-full h-11 px-3 rounded-md border border-zinc-200 text-sm focus:ring-2 focus:ring-orange-500 outline-none bg-white font-medium"
                >
                  <option value="">Select Country</option>
                  <option value="Ethiopia">Ethiopia</option>
                  <option value="USA">USA</option>
                  <option value="Other">Other</option>
                </select>
                {errors.location && <p className="text-xs font-medium text-red-500 ml-1">{errors.location.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-700 font-semibold ml-1">Strong Password</Label>
              <Input type="password" {...register("password")} className="h-11 focus-visible:ring-orange-500 border-zinc-200" />
              {errors.password && <p className="text-xs font-medium text-red-500 ml-1">{errors.password.message}</p>}
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full bg-green-600 hover:bg-green-700 active:scale-[0.98] text-white font-bold h-12 transition-all mt-4 shadow-lg shadow-green-200 text-lg"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
          
          <div className="mt-8 text-center text-sm bg-zinc-50 p-4 rounded-xl border border-zinc-100">
            <span className="text-zinc-500">Already have an account? </span>
            <Link to="/login" className="font-bold text-green-600 hover:underline">Log in here</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Link } from 'react-router-dom';

const ForgetPassword = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Reset link requested for:", data.email);
    toast.info("If that email exists, a reset link has been sent!");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-green-50 p-4">
      <Card className="w-full max-w-md border-green-100 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Reset Password
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email and we'll send you a link to get back into your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                {...register("email")} 
                placeholder="name@gmail.com" 
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-green-600 text-white hover:bg-green-700"
            >
              Send Reset Link
            </Button>

            <div className="text-center text-sm">
              <Link 
                to="/login" 
                className="text-green-600 hover:text-green-700 hover:underline"
              >
                Back to Login
              </Link>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgetPassword;
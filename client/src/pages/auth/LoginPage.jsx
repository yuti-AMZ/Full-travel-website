import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/utils/validation';
import API from '@/api/axiosInstance';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onTouched"
  });

  const onSubmit = async (data) => {
    // We map 'identifier' from the form to 'email' for the Backend API
    const payload = {
      email: data.identifier, 
      password: data.password
    };

    try {
      console.log('Sending to Backend:', payload);
      const response = await API.post('/auth/login', payload);
      
      // Save token and redirect
      localStorage.setItem('token', response.data.token);
      toast.success("Welcome back!");
      navigate('/welcome');
    } catch (err) {
      console.error("Login error:", err.response?.data || err);
      toast.error(err.response?.data?.message || "Invalid email or password");
    }
  };

  // Log validation errors to console if submission is blocked
  const onInvalid = (formErrors) => {
    console.error("Zod Validation Failed:", formErrors);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-green-50 p-4">
      <Card className="w-full max-w-md border-green-100 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold tracking-tight text-center">Login</CardTitle>
          <CardDescription className="text-center text-zinc-500">
            Enter your email to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-4">
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                {...register("identifier")} // Matches your Zod schema key
                placeholder="name@gmail.com"
                className={errors.identifier ? "border-red-500" : ""} 
              />
              {errors.identifier && (
                <p className="text-xs font-medium text-red-500">
                  {errors.identifier.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a 
                  href="/forget-password" 
                  className="text-sm font-medium text-green-600 hover:text-green-700 underline"
                >
                  Forgot password?
                </a>
              </div>
              <Input 
                id="password" 
                type="password" 
                {...register("password")}
                className={errors.password ? "border-red-500" : ""} 
              />
              {errors.password && (
                <p className="text-xs font-medium text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full bg-green-600 text-white hover:bg-green-700"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            <span className="text-zinc-500">Don't have an account? </span>
            <a 
              href="/signup" 
              className="font-semibold text-green-600 hover:text-green-700 hover:underline"
            >
              Sign up
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
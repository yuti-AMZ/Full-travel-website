import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useNavigate } from 'react-router-dom';
import * as z from 'zod';
import API from '@/api/axiosInstance';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const resetSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const ResetPasswordPage = () => {
  const { token } = useParams(); // Gets the token from the URL
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(resetSchema)
  });

  const onSubmit = async (data) => {
    try {
      await API.post(`/auth/reset-password/${token}`, { password: data.password });
      toast.success("Password updated successfully!");
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || "Link expired or invalid");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-green-50 p-4">
      <Card className="w-full max-w-md border-green-100 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Create New Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label>New Password</Label>
              <Input type="password" {...register("password")} />
              {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Confirm New Password</Label>
              <Input type="password" {...register("confirmPassword")} />
              {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>}
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full bg-green-600 hover:bg-green-700">
              {isSubmitting ? "Updating..." : "Reset Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogIn, UserPlus, Bell } from 'lucide-react'; // Bell for Doraemon touch

const AuthPage = () => {
  console.log('AuthPage loaded');
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Login attempt:', { email: loginEmail, password: loginPassword });
    // In a real app, you'd call an API here
    // For demo, navigate to dashboard
    navigate('/dashboard');
  };

  const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (registerPassword !== registerConfirmPassword) {
      alert("Passwords don't match!"); // Simple validation
      return;
    }
    console.log('Registration attempt:', { email: registerEmail, password: registerPassword });
    // In a real app, you'd call an API here
    // For demo, navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col min-h-screen bg-sky-50 dark:bg-slate-900">
      {/* Header is not typically part of an auth page, but if design implies it, it's fine. Let's assume it's not for a cleaner auth flow */}
      {/* <Header /> */}
      
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="flex items-center mb-8 text-sky-600 dark:text-sky-400">
          <Bell className="h-12 w-12 text-yellow-400 mr-3" />
          <h1 className="text-4xl font-bold">MediTrack</h1>
        </div>

        <Card className="w-full max-w-md shadow-xl bg-white dark:bg-slate-800">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-semibold text-slate-800 dark:text-slate-100">Welcome Back!</CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              Sign in or create an account to manage your health.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-sky-100 dark:bg-slate-700">
                <TabsTrigger value="login" className="data-[state=active]:bg-sky-500 data-[state=active]:text-white dark:data-[state=active]:bg-sky-600">Login</TabsTrigger>
                <TabsTrigger value="register" className="data-[state=active]:bg-sky-500 data-[state=active]:text-white dark:data-[state=active]:bg-sky-600">Register</TabsTrigger>
              </TabsList>
              
              {/* Login Form */}
              <TabsContent value="login">
                <form onSubmit={handleLoginSubmit} className="space-y-6 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-slate-700 dark:text-slate-300">Email Address</Label>
                    <Input 
                      id="login-email" 
                      type="email" 
                      placeholder="you@example.com" 
                      required 
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 focus:border-sky-500 focus:ring-sky-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-slate-700 dark:text-slate-300">Password</Label>
                    <Input 
                      id="login-password" 
                      type="password" 
                      placeholder="••••••••" 
                      required 
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 focus:border-sky-500 focus:ring-sky-500"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white">
                    <LogIn className="mr-2 h-4 w-4" /> Login
                  </Button>
                  <div className="text-center text-sm">
                    <RouterLink to="#" onClick={(e) => {e.preventDefault(); alert("Password recovery link clicked!");}} className="font-medium text-sky-600 hover:text-sky-500 dark:text-sky-400 dark:hover:text-sky-300">
                      Forgot your password?
                    </RouterLink>
                  </div>
                </form>
              </TabsContent>

              {/* Registration Form */}
              <TabsContent value="register">
                <form onSubmit={handleRegisterSubmit} className="space-y-6 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-slate-700 dark:text-slate-300">Email Address</Label>
                    <Input 
                      id="register-email" 
                      type="email" 
                      placeholder="you@example.com" 
                      required 
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 focus:border-sky-500 focus:ring-sky-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-slate-700 dark:text-slate-300">Create Password</Label>
                    <Input 
                      id="register-password" 
                      type="password" 
                      placeholder="••••••••" 
                      required 
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 focus:border-sky-500 focus:ring-sky-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm-password" className="text-slate-700 dark:text-slate-300">Confirm Password</Label>
                    <Input 
                      id="register-confirm-password" 
                      type="password" 
                      placeholder="••••••••" 
                      required 
                      value={registerConfirmPassword}
                      onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                      className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 focus:border-sky-500 focus:ring-sky-500"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <UserPlus className="mr-2 h-4 w-4" /> Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center pt-6">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              By continuing, you agree to our Terms of Service.
            </p>
          </CardFooter>
        </Card>
        
        <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
          Need help? <RouterLink to="#" onClick={(e) => {e.preventDefault(); alert("Support link clicked!");}} className="font-medium text-sky-600 hover:text-sky-500 dark:text-sky-400 dark:hover:text-sky-300">Contact Support</RouterLink>
        </p>
      </main>

      {/* Footer is not typically part of an auth page for a cleaner look. */}
      {/* <Footer /> */}
    </div>
  );
};

export default AuthPage;
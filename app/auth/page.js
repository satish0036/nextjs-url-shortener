'use client';

import React, { useEffect, useState } from 'react';
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from '@/components/ui/use-toast';
import { loginUser, registerUser } from '@/server-action/users';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import { isTokenValid } from '@/utils/auth';

const Auth = () => {
  const router = useRouter();
  const { toast } = useToast();

  // Separate state for sign-in and sign-up forms
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  const [signUpData, setSignUpData] = useState({
    name: "",
    username: "",
    password: "",
  });

  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();

    // Validate sign-in form
    if (!signInData.username || !signInData.password) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please fill in all the required fields.",
      });
      return;
    }

    try {
      // Simulated API call for sign-in
      const response = await loginUser(signInData);
      const data = await response.json();

      // Handle the response
      if (response.ok) {
        Cookies.set('jwt_token', data.token, { expires: 12 / 24 });
        router.push('/');
        toast({
          title: `${data?.message} 🎉`,
          description: "You have logged in successfully.",
        });
      } else {
        toast({
          variant: "destructive",
          title: data?.message,
        });
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "There was an error processing your request.",
      });
    }

    // Reset sign-in form data
    setSignInData({
      username: "",
      password: "",
    });
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    // Validate sign-up form
    if (!signUpData.name || !signUpData.username || !signUpData.password) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please fill in all the required fields.",
      });
      return;
    }

    try {
      // Simulated API call for sign-up
      const response = await registerUser(signUpData);
      const data = await response.json();

      // Handle the response
      if (response.ok) {
        toast({
          title: `${data?.message} 🎉`,
          description: "You have signed up successfully. Welcome!",
        });
      } else {
        toast({
          variant: "destructive",
          title: data?.message,
          description: data?.error?.sqlState === "23000" ? "User Name already exists." : data?.error?.sqlMessage,
        });
      }
    } catch (error) {
      console.error('Error during signup:', error);
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: "There was an error processing your request.",
      });
    }

    // Reset sign-up form data
    setSignUpData({
      name: "",
      username: "",
      password: "",
    });
  };

  const pathname = usePathname();
  const isTokenValid1 = isTokenValid();

  useEffect(() => {
    if (isTokenValid() && pathname === '/auth') {
      router.push('/');
    }
  }, [router, pathname]);

  return (
    <div className='flex justify-center h-[90vh] w-full pt-4'>
      <Tabs defaultValue="signin" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Make your sign-in here. Click save when you are done.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSignInSubmit}>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="setusername">Username</Label>
                  <Input
                    id="setusername"
                    name="username"
                    value={signInData.username}
                    required
                    onChange={handleSignInChange}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="setpassword">Password</Label>
                  <Input
                    id="setpassword"
                    name="password"
                    type="password"
                    value={signInData.password}
                    required
                    onChange={handleSignInChange}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Sign In</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Sign up here. After saving, you will be logged in.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSignUpSubmit}>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={signUpData.name}
                    required
                    onChange={handleSignUpChange}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    value={signUpData.username}
                    required
                    onChange={handleSignUpChange}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={signUpData.password}
                    required
                    onChange={handleSignUpChange}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Sign Up</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;

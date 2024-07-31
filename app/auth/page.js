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
  const { toast } = useToast()
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
      })
      return;
    }

    // Simulated API call for sign-in
    const response = await loginUser(signInData)
    const data = await response.json();
    // console.log('API Response from login:', data);
    Cookies.set('jwt_token', data.token, { expires: 12 / 24 }); 
    router.push('/');
    // Handle the response
    if (response.ok) {
      toast({
        title: `${data?.message }🎉`,
        description: "You have logged in successfully.",
      })
      
    } else {
      toast({
        variant: "destructive",
        title: data?.message,
      })
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
      })
      return;
    }

    // Simulated API call for sign-up
    const response = await registerUser(signUpData)
    const data = await response.json();
    console.log('API Response:', data);
    // Handle the response
    if (response.ok) {
      toast({
        title: `${data?.message} 🎉`,
        description: "You have signed up successfully. Welcome!",
      })
    } else {
      toast({
        variant: "destructive",
        title: data?.message,
        description: data?.error?.sqlState === "23000" ? "User Name already Exist" : data?.error?.sqlMessage,
      })
    }

    // Reset sign-up form data
    setSignUpData({
      name: "",
      username: "",
      password: "",
    });
  };

  const pathname = usePathname();

  console.log("pathname",pathname)
  const isTokenValid1=isTokenValid()
  console.log("isTokenValid",isTokenValid1)

  useEffect(() => {
    if (isTokenValid() && pathname === '/auth') {
      router.push('/');
    }
  }, [router, pathname]);

  return (
    <div className='flex justify-center h-[90vh] w-full pt-4'>
      <Tabs defaultValue="signin" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin" onClick={() => setIsSignIn(true)}>Sign In</TabsTrigger>
          <TabsTrigger value="signup" onClick={() => setIsSignIn(false)}>Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Make your sign-in here. Click save when you're done.
              </CardDescription>
            </CardHeader>
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
              <Button type="submit" onClick={handleSignInSubmit}>Sign In</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Sign up here. After saving, you'll be logged in.
              </CardDescription>
            </CardHeader>
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
              <Button type="submit" onClick={handleSignUpSubmit}>Sign Up</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;

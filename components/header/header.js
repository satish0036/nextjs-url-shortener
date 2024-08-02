'use client';
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SunIcon, UserX } from 'lucide-react'
import { ModeToggle } from '../theme/ModeToggle'
import Link from 'next/link'
import { isTokenValid, signOut } from '@/utils/auth'
import { usePathname, useRouter } from 'next/navigation';
import { useToast } from '../ui/use-toast';


const Header = () => {
    const router = useRouter()
    const pathname = usePathname();
    const { toast } = useToast()
    const [logedin, setLogedIn] = useState()
    useEffect(() => {
        if (isTokenValid()) {
            setLogedIn(true)
        }
        else {
            setLogedIn(false)
        }
    }, [router, pathname]);
    const handleLogOut = () => {
        signOut()
        setLogedIn(false)
        toast({
            title: "Logged Out 👋",
            description: "You have been logged out successfully.",
                    
          });
        router.push("/")
    }

    const handleProfileClick = () => {
        router.push("/profile")
    }



    return (
        <div className='text-primary-foreground  px-4 w-full h-[10vh] flex justify-between content-center items-center'>
            <Link href={"/"}>
                <Avatar >
                    <AvatarImage src="https://www.shutterstock.com/shutterstock/photos/633031571/display_1500/stock-vector-shield-letter-s-logo-safe-secure-protection-logo-modern-design-633031571.jpg" />
                    <AvatarFallback>Logo</AvatarFallback>
                </Avatar>
            </Link>
            <div className=' flex gap-2'>
                {
                    !logedin &&
                    <Link href={"/auth"}>
                        <Button>Login</Button>
                    </Link>
                }
                {
                    logedin &&

                    <div>
                        <DropdownMenu>

                            <DropdownMenuTrigger asChild>
                                {/* <div className='w-10 h-10 rounded-full bg-white  flex justify-center items-center content-center  '>

                                    <UserX className=' flex text-black justify-center items-center content-center h-6 w-6 rounded-ful' />

                                </div> */}
                                <Button size="icon">
                                    <UserX className="h-[1.2rem] w-[1.2rem] " />
                                </Button>


                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={handleProfileClick} >
                                    My Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleLogOut}>
                                    LogOut
                                </DropdownMenuItem>


                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                }

                <ModeToggle />
            </div>


        </div>
    )
}

export default Header
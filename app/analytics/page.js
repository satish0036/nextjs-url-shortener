"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import React, { useState } from 'react'

const Analytic = () => {
    const router = useRouter();
    const { toast } = useToast()
    const [shortUrl, setShortUrl] = useState()

    const handleClick = () => {
        const parts = shortUrl.split('/'); // Split the URL by '/'
        const lastPart = parts[parts.length - 1];
        if (lastPart === "" || !lastPart) {
            toast({
                variant: "destructive",
                title: "Uh oh! Enter valid url.",
                description: "You have not entered correct url",
            })
            return
        }
        router.push(`/analytics/${lastPart}`);
    }
    return (
        <div className=' w-full h-[90vh] flex flex-col gap-6 items-center p-4  mb-5'>

            <div className=' rounded-lg border bg-card text-card-foreground  flex flex-col gap-2 items-center w-[100%] lg:w-[70%] shadow-sm p-4 lg:p-8'>
                <p className=' font-semibold text-xl'>Paste the URL to get Analytics</p>
                <div className=' flex gap-2 w-full '>
                    <Input
                        type="link"
                        name="shortUrl"
                        placeholder="Enter the link here"
                        value={shortUrl}
                        onChange={(e) => setShortUrl(e.target.value)}
                    />
                    <Button onClick={handleClick}  >Get Analytics</Button>
                </div>

                <p>URL shortener allows to create a shortened link making it easy to share</p>
                <p>Shorten URLs powered by IndiaArticle24. Create short & memorable links in seconds.</p>
                <Link href={"/"}> <Button>Shorten URL</Button></Link>
            </div>
        </div>
    )
}

export default Analytic
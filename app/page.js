"use client"
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { ChartNoAxesColumn, LayoutDashboard, LineChart, QrCode, QrCodeIcon, ScanQrCode, SignalHighIcon } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { registerAuthUrl, registerUrl } from '@/server-action/url'
import { isTokenValid } from '@/utils/auth'
import Link from 'next/link'



const Page = () => {
  const router = useRouter();
  const { toast } = useToast()
  const [data, setData] = useState([
    {
      "id": 1,
      "name": "PrePlexity",
      "originalUrl": "https://www.perplexity.ai/",
      "shortUrl": "1QEELi"
    },
    {
      "id": 2,
      "name": "PrePlexity",
      "originalUrl": "https://www.perplexity.ai/search/while-making-build-why-i-am-ge-WL51pxFmS.WBK74BoVV9Kg",
      "shortUrl": "oCbVgc"
    },
  ]
  );

  const [formData, setFormData] = useState({
    name: "",
    originalUrl: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };




  const handleClick = async() => {
    // Simulate an API call
    if (!formData.name || !formData.originalUrl) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "You have not filled all field",
      })
      return;
    }

    const response=isTokenValid() ? await registerAuthUrl(formData):await registerUrl(formData)
    // const response=await registerUrl(formData)

    const responceData = await response.json();
    console.log("res from api",responceData)





    const apiResponse = {
      "id": data.length + 1,
      "name": formData.name,
      "originalUrl": formData.originalUrl,
      "shortUrl": responceData.shortUrl
    };


    // data.push(apiResponse);
    // data.unshift(apiResponse);
    // setData(data)

    setData((prevData) => [apiResponse, ...prevData]);

    setFormData({
      name: "",
      originalUrl: "",
    });
    toast({
      title: "Uh oh! Something went wrong.",
      description: "You have not filled all field",
    })
  };

  const handleanalyticsClick = (e) => {
    router.push(`/analytics/${e}`);
  };


  return (
    <div className=' w-full h-[90vh] flex flex-col gap-6 items-center p-4 '>
      <div className=' font-bold text-4xl'>Free URL Shortener</div>
      <div className=' rounded-lg border bg-card text-card-foreground  flex flex-col gap-2 items-center w-[100%] lg:w-[70%] shadow-sm p-4 lg:p-4'>
        <p className=' font-semibold text-xl'>Paste the URL to be shortened</p>
        <Input
          type="link"
          name="originalUrl"
          placeholder="Enter the link here"
          value={formData.originalUrl}
          onChange={handleChange}
        />
        <div className="flex gap-2 w-full">
          <Input
            type="text"
            name="name"
            placeholder="Enter the Name"
            value={formData.name}
            onChange={handleChange}
          />
          <Button onClick={handleClick}>Shorten URL</Button>
        </div>
        <p>URL shortener allows to create a shortened link making it easy to share</p>
        <p>Shorten URLs powered by IndiaArticle24. Create short & memorable links in seconds.</p>
       <Link href={"/analytics"}> <Button>Get Analytics</Button></Link>
      </div>

      {
        data?.map((data, index) =>
          <div key={index} className='rounded-lg border bg-card text-card-foreground  flex justify-between items-center w-[100%] gap-2 lg:w-[70%] shadow-sm p-2 lg:p-4' >
            <div className=' flex w-[50%] lg:w-[15%] whitespace-nowrap overflow-hidden mx-2'>{data.name}</div>

            <div className=' hidden lg:block w-[30%] whitespace-nowrap overflow-hidden mx-2'>{data.originalUrl}</div>
            <div className=' hidden lg:block w-[30%] whitespace-nowrap overflow-hidden mx-2'>{data.shortUrl}</div>

            <Button variant="secondary">   <QrCodeIcon /></Button>

            <Button onClick={()=>handleanalyticsClick(data.shortUrl)} variant="secondary"><ChartNoAxesColumn /></Button>
            <Button className=" font-semibold text-blue-600 hover:text-blue-500" variant="ghost">Copy</Button>




          </div>
        )
      }



      <div className='rounded-lg border bg-card text-card-foreground  flex flex-col gap-2 items-center w-[100%] lg:w-[70%] shadow-lg p-4 lg:p-8'>
        <p className=' font-semibold text-xl'>Want More? Try Premium Features!</p>

        <p>Custom short links, powerful dashboard, detailed analytics, API, UTM builder, QR codes,</p>
        <p>browser extension, app integrations and support</p>
      <Link href={"/auth"}>  <Button>Create Account</Button></Link>
      </div>




    </div>
  )
}

export default Page
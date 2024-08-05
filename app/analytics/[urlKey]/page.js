"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CalendarCheck, Copy, Database, Link, Link2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import columns from './columns'
import { DataTable } from '@/components/ui/data-table/data-table'
import { useParams } from 'next/navigation'
import { getAboutUrl, getAnalytics } from '@/server-action/url'
import CopyLink from '@/utils/CopyLink'
const Backend_Url = process.env.NEXT_PUBLIC_BACKEND_URL;

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MonthelyChartsComponent } from './monthelyCharts'
import { DayChartComponent } from './dayCharts'
import { CountryChartsComponent } from './deviceCharts'




const Analytics = () => {



  const params = useParams()
  const { urlKey } = params;

  const [data, setData] = useState([

    {
      city: "Kolkata",
      country: "IN",
      created_at: "2024-08-02T17:11:17.000Z",
      device: "Laptop",
      ip_address: "::1",
      latitude: 22.518,
      longitude: 88.3832,
      urlKey: "1QEELi"
    },
    {
      city: "Kolkata",
      country: "IN",
      created_at: "2024-08-02T17:11:17.000Z",
      device: "Mobile",
      ip_address: "::1",
      latitude: 22.518,
      longitude: 88.3832,
      urlKey: "1QEELi"
    },
    {
      city: "Patna",
      country: "IN",
      created_at: "2024-08-03T17:11:17.000Z",
      device: "Mobile",
      ip_address: "::1",
      latitude: 222.518,
      longitude: 828.3832,
      urlKey: "1QEELi"
    },
  ]);
  const [aboutUrl, setAboutUrl] = useState(null);

  // const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (urlKey) {
        try {
          const response = await getAnalytics({ "urlKey": urlKey })
          const data = await response?.json();
          console.log("resp11", data);
          if (response.ok) {
            console.log("data from api", data)
            setData(data);
          } else {
            console.error('Error fetching data:', data);
          }
        }
        catch (error) {
          console.error('Error fetching data:');

          // console.error('Error fetching data:', error);
        }
        finally {
          setLoading(false);
        }
      }
    };
    const featchAboutUrl = async () => {
      if (urlKey) {
        try {
          const response = await getAboutUrl({ "urlKey": urlKey })
          const data = await response.json();
          if (response.ok) {
            setAboutUrl(data);
          } else {
            console.error('Error fetching About URL:', data);
          }
        }
        catch (error) {
          console.error('Error fetching About URL:');

          // console.error('Error fetching About URL:', error);
        }
      }
    }

    fetchData();
    featchAboutUrl();
  }, [urlKey]);






  if (loading) {
    return <p className=' w-full flex justify-center items-center'>Loading...</p>;
  }

  if (!data) {
    return <p className=' w-full flex justify-between items-center'>No data found.</p>;
  }
  const linkToCopy = `${Backend_Url}/urls/${aboutUrl?.urlKey}`;
  return (
    <div className=' w-full h-[90vh] flex flex-col gap-6 items-center p-4  mb-5'>

      <div className='  flex flex-col gap-2 w-[100%] lg:w-[70%]'>
        <div className=' flex justify-between flex-wrap gap-2'>
          <div className=' flex gap-2 w-[100%] lg:w-[50%] whitespace-nowrap overflow-hidden'>
            <CopyLink link={linkToCopy} />
            <div>{Backend_Url}/urls/{aboutUrl?.urlKey}</div>
          </div>
          <div className=' flex gap-4  w-[70%] lg:w-[40%] lg:justify-end whitespace-nowrap overflow-hidden'>
            {/* <Link2 className=' w-8 h-8' /> */}
            <p className=''>{aboutUrl?.name}</p>
           
          </div>

        </div>
        <p className='w-[100%] whitespace-nowrap overflow-hidden'>{aboutUrl?.originalUrl}</p>
        <p>Total Visit :- {data.length} </p>
        <div className=' flex gap-2'>
          <CalendarCheck />
          <div>{new Date(aboutUrl?.created_at).toLocaleString()}</div>
          {/* <div>{new Date(aboutUrl.created_at.getValue()).toLocaleString()}</div> */}
        </div>
      </div>

      <Tabs defaultValue="table" className=' w-[100%] lg:w-[70%]  rounded-lg pb-3'>
        <TabsList >
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="table">Table</TabsTrigger>
        </TabsList>
        <TabsContent value="table" className=' w-[100%] border border-foreground/40  rounded-lg'>

          <DataTable columns={columns} data={data} />

        </TabsContent>
        <TabsContent value="charts">
          <MonthelyChartsComponent data={data} />
          <DayChartComponent data={data} />
          <CountryChartsComponent data={data} />
        </TabsContent>
      </Tabs>


    </div>
  )
}

export default Analytics
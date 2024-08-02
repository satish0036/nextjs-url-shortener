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
const Backend_Url=process.env.NEXT_PUBLIC_BACKEND_URL;

const Analytics = () => {
 


  const params = useParams()
  const { urlKey } = params;

  const [data, setData] = useState([

    // {
    //   city: "Los Angeles",
    //   country: "USA",
    //   latLong: "34.052235, -118.243683",
    //   dateTime: "2024-07-30 09:15",
    //   device: "Mobile",
    // },
    // {
    //   city: "Tokyo",
    //   country: "Japan",
    //   latLong: "35.689487, 139.691711",
    //   dateTime: "2024-07-27 08:30",
    //   device: "Mobile",
    // },
  ]);
  const[aboutUrl,setAboutUrl]=useState(null);

  // const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (urlKey) {
        try {
          const response = await getAnalytics({ "urlKey": urlKey })
          const data = await response.json();
          console.log("resp11", data);
          if (response.ok) {
            setData(data);
          } else {
            console.error('Error fetching data:', data);
          }
        }
        catch (error) {
          console.error('Error fetching data:', error);
        }
        finally {
          setLoading(false);
        }
      }
    };
    const featchAboutUrl=async()=>{
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
          console.error('Error fetching About URL:', error);
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

      {/* <div className=' rounded-lg border bg-card text-card-foreground  flex flex-col gap-2 items-center w-[100%] lg:w-[70%] shadow-sm p-4 lg:p-8'>
        <p className=' font-semibold text-xl'>Paste the URL to get Analytics</p>
        <div className=' flex gap-2 w-full '>
          <Input type="name" placeholder="Enter the Name" />
          <Button onClick={handleClick}  >Get Analytics</Button>
        </div>

        <p>URL shortener allows to create a shortened link making it easy to share</p>
        <p>Shorten URLs powered by IndiaArticle24. Create short & memorable links in seconds.</p>
      </div> */}

      <div className='  flex flex-col gap-2 w-[100%] lg:w-[70%]'>
        <div className=' flex justify-between'>
          <div className=' flex gap-2'>
            <Link />
            <div>{Backend_Url}/urls/{aboutUrl?.urlKey}</div>
          </div>
          <div className=' flex gap-4'>
            {/* <Link2 className=' w-8 h-8' /> */}
            <p>{aboutUrl?.name}</p>
            <CopyLink link={linkToCopy} />
          </div>

        </div>
        <p>{aboutUrl?.originalUrl}</p>
        <p>Total Visit :- {data.length} </p>
        <div className=' flex gap-2'>
          <CalendarCheck />
          <div>{new Date(aboutUrl?.created_at).toLocaleString()}</div>
          {/* <div>{new Date(aboutUrl.created_at.getValue()).toLocaleString()}</div> */}
        </div>
      </div>

      <div className=' w-[100%] lg:w-[70%] border border-foreground/40  rounded-lg'>
        <DataTable columns={columns} data={data} />
      </div>
      <div>fghm</div>

    </div>
  )
}

export default Analytics
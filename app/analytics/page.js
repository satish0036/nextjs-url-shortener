"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CalendarCheck, Copy, Database, Link, Link2 } from 'lucide-react'
import React from 'react'
import { DataTable } from '../../components/ui/data-table/data-table'
import columns from './columns'
import { Table } from '@/components/ui/table'

const Analytics = () => {

  const data = [
    {
      city: "New York",
      country: "USA",
      latLong: "40.730610, -73.935242", // Combined latitude and longitude
      dateTime: "2024-07-31 14:30", // Combined date and time
      device: "Desktop",
    },
    {
      city: "Los Angeles",
      country: "USA",
      latLong: "34.052235, -118.243683",
      dateTime: "2024-07-30 09:15",
      device: "Mobile",
    },
    {
      city: "London",
      country: "UK",
      latLong: "51.507351, -0.127758",
      dateTime: "2024-07-29 18:45",
      device: "Tablet",
    },
    {
      city: "Paris",
      country: "France",
      latLong: "48.856613, 2.352222",
      dateTime: "2024-07-28 12:00",
      device: "Desktop",
    },
    {
      city: "Tokyo",
      country: "Japan",
      latLong: "35.689487, 139.691711",
      dateTime: "2024-07-27 08:30",
      device: "Mobile",
    },
  ];




  const handleClick = () => {

  }







  return (
    <div className=' w-full h-[90vh] flex flex-col gap-6 items-center p-4  mb-5'>

      <div className=' rounded-lg border bg-card text-card-foreground  flex flex-col gap-2 items-center w-[100%] lg:w-[70%] shadow-sm p-4 lg:p-8'>
        <p className=' font-semibold text-xl'>Paste the URL to get Analytics</p>
        <div className=' flex gap-2 w-full '>
          <Input type="name" placeholder="Enter the Name" />
          <Button onClick={handleClick}  >Get Analytics</Button>
        </div>

        <p>URL shortener allows to create a shortened link making it easy to share</p>
        <p>Shorten URLs powered by IndiaArticle24. Create short & memorable links in seconds.</p>
      </div>

      <div className='  flex flex-col gap-2 w-[100%] lg:w-[70%]'>
        <div className=' flex justify-between'>
          <div className=' flex gap-2'>
            <Link />
            <div>www.google.com</div>
          </div>
          <div className=' flex gap-4'>
            <Link2 className=' w-8 h-8' />
            <Copy className=' w-8 h-8' />
          </div>

        </div>
        <p>https://free-url-shortener.rb.gy/</p>
        <p>Total Visit :- 300 </p>
        <div className=' flex gap-2'>
          <CalendarCheck />
          <div>Jul 31, 2024</div>
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
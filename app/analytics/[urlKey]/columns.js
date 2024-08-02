'use client';

import { ColumnDef } from "@tanstack/react-table";

const columns = [
  {
    accessorKey: "urlKey",
    header: "URL Key",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "latitude",
    header: "Latitude",
  },
  {
    accessorKey: "longitude",
    header: "Longitude",
  },
  {
    accessorKey: "created_at",
    header: "Date/Time",
    cell: (info) => new Date(info.getValue()).toLocaleString(), // Formatting the date
  },
  {
    accessorKey: "device",
    header: "Device",
  },
  {
    accessorKey: "ip_address",
    header: "IP Address",
  },
 
];

export default columns;

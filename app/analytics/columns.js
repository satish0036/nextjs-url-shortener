'use client';

import { ColumnDef } from "@tanstack/react-table";

const columns = [
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "latLong",
    header: "Lat/Long",
  },
  {
    accessorKey: "dateTime",
    header: "Date/Time",
  },
  {
    accessorKey: "device",
    header: "Device",
  },
];

export default columns;

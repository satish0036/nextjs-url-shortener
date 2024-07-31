'use client';

import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
} from '@radix-ui/react-icons';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DataTablePagination } from './pagination';
import { useRouter } from 'next/navigation';

export function DataTable({
  columns,
  data,
  apiPath,
  getTrProps,
  additionalParams,
}) {
  const [globalFilter, setGlobalFilter] = useState('');
  const router = useRouter();
  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  return (
    <div className="flex flex-col gap-4">
      <Input
        type="text"
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search..."
        className="px-4 py-2 min-w-[320px] max-w-[480px] border text-card-foreground rounded-md"
      />

      <div className="border border-foreground/40 rounded-md">
        <Table className="w-full divide-y rounded-md bg-card  text-card-foreground overflow-x-auto">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => (
                  <TableHead
                    key={header.id}
                    className={`px-6 py-3 text-xs font-medium uppercase tracking-wider ${
                      index !== headerGroup.headers.length - 1
                        ? 'border-r border-muted'
                        : ''
                    }`}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex flex-row items-center">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                      {header.column.getIsSorted() === 'desc' ? (
                        <ArrowDownIcon className="ml-2 h-4 w-4" />
                      ) : header.column.getIsSorted() === 'asc' ? (
                        <ArrowUpIcon className="ml-2 h-4 w-4" />
                      ) : (
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody className="w-full divide-y">
            {table.getRowModel().rows.map((row, index) => (
              <TableRow
                key={row.id}
                {...getTrProps?.(row.original)}
                className={`${apiPath ? 'hover:bg-muted cursor-pointer' : ''} ${
                  getTrProps?.(row.original).className || ''
                }`}
                onClick={
                  apiPath
                    ? () => {
                        const params = new URLSearchParams(
                          additionalParams
                        ).toString();
                        router.push(
                          `/${apiPath}/${row.getValue('ID')}?${params}`
                        );
                      }
                    : undefined
                }
              >
                {row.getVisibleCells().map((cell, cellIndex) => (
                  <TableCell
                    key={cell.id}
                    className={`border-r border-muted ${
                      cellIndex === row.getVisibleCells().length - 1
                        ? ''
                        : 'border-b '
                    }`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} />
    </div>
  );
}

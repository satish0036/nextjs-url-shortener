"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";



// const chartData1 = [
//     { month: "January", desktop: 186, mobile: 80 },
//     { month: "February", desktop: 305, mobile: 200 },
//     { month: "March", desktop: 237, mobile: 120 },
//     { month: "April", desktop: 73, mobile: 190 },
//     { month: "May", desktop: 209, mobile: 130 },
//     { month: "June", desktop: 214, mobile: 140 },
// ]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
};
const ofMonth=6

const getLastSixMonthsData = (data) => {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - ofMonth);
  return data.filter(
    (entry) => new Date(entry.created_at) >= sixMonthsAgo
  );
};

const groupDataByMonth = (data) => {
  return data.reduce((acc, curr) => {
    const month = new Date(curr.created_at).toLocaleString('default', { month: 'long' });
    const device = curr.device.toLowerCase();

    if (!acc[month]) {
      acc[month] = { month, desktop: 0, mobile: 0 };
    }

    if (device === "laptop") {
      acc[month].desktop += 1;
    } else {
      acc[month].mobile += 1;
    }

    return acc;
  }, {});
};

const formatChartData = (groupedData) => {
  return Object.values(groupedData);
};

export function MonthelyChartsComponent({ data }) {
  const filteredData = React.useMemo(() => getLastSixMonthsData(data), [data]);

  const groupedData = React.useMemo(() => groupDataByMonth(filteredData), [filteredData]);
  const chartData = React.useMemo(() => formatChartData(groupedData), [groupedData]);

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.desktop + curr.mobile, 0);
  }, [chartData]);

   //current date
 const currentDate = new Date();
 const sixMonthsAgo = new Date();
 sixMonthsAgo.setMonth(currentDate.getMonth() - ofMonth);
 const currentMonthYear = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
 const sixMonthsAgoMonthYear = sixMonthsAgo.toLocaleString('default', { month: 'long', year: 'numeric' });


  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex">Bar Chart - Monthly Visiter<TrendingUp className="h-4 w-4" /></CardTitle>
        <CardDescription> {sixMonthsAgoMonthYear} - {currentMonthYear}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[40vh] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={2}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}

"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
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

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  laptop: {
    label: "Laptop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
  tab: {
    label: "Tab",
    color: "hsl(var(--chart-3))",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
};


// const chartData1 = [

//   { device: "Mobile", visitors: 275, fill: "var(--color-Mobile)" },
//   { device: "Laptop", visitors: 200, fill: "var(--color-Laptop)" },
//   { device: "other", visitors: 190, fill: "var(--color-other)" }
// ]


const ofMonth = 6

const getLastSixMonthsData = (data) => {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - ofMonth);
  return data.filter(
    (entry) => new Date(entry.created_at) >= sixMonthsAgo
  );
};

const getDeviceCounts = (data) => {
  return data.reduce((acc, curr) => {
    const device = curr.device.toLowerCase() || "other";
    acc[device] = (acc[device] || 0) + 1;
    return acc;
  }, {});
};

const formatChartData = (deviceCounts) => {
  return Object.keys(deviceCounts).map((device) => ({
    device,
    visitors: deviceCounts[device],
    fill: `var(--color-${device})`,
  }));
};

export function CountryChartsComponent({ data }) {
  const filteredData = React.useMemo(() => getLastSixMonthsData(data), [data]);
  const deviceCounts = React.useMemo(() => getDeviceCounts(filteredData), [filteredData]);
  const chartData = React.useMemo(() => formatChartData(deviceCounts), [deviceCounts]);

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, [chartData]);


  //current date
  const currentDate = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(currentDate.getMonth() - ofMonth);
  const currentMonthYear = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  const sixMonthsAgoMonthYear = sixMonthsAgo.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="flex">Pie Chart - Last 6 months visitor <TrendingUp className="h-4 w-4" /></CardTitle>
        <CardDescription> {sixMonthsAgoMonthYear} - {currentMonthYear}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[40vh]"

        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="device"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">

        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}

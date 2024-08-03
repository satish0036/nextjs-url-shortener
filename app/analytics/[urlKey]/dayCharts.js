"use client";

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
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";

// const chartData1 = [
//     { date: "2024-07-15", mobile: 450, laptop: 300 },
//     { date: "2024-07-16", mobile: 380, laptop: 420 },
//     { date: "2024-07-17", mobile: 520, laptop: 120 },
//     { date: "2024-07-18", mobile: 140, laptop: 550 },
// ];

const ofDays = 30;

const getLast30DayData = (data) => {
    const ago30day = new Date();
    ago30day.setDate(ago30day.getDate() - ofDays);
    return data.filter(
        (entry) => new Date(entry.created_at) >= ago30day
    );
};

const groupDataByDate = (data) => {
    return data.reduce((acc, curr) => {
        const date = curr.created_at.split("T")[0];
        const device = curr.device.toLowerCase();

        if (!acc[date]) {
            acc[date] = { date };
        }

        acc[date][device] = (acc[date][device] || 0) + 1;
        return acc;
    }, {});
};

const formatChartData = (groupedData) => {
    return Object.values(groupedData);
};

const chartConfig = {
    laptop: {
        label: "Laptop",
        color: "hsl(var(--chart-2))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-1))",
    },
};

export function DayChartComponent({ data }) {
    const filteredData = React.useMemo(() => getLast30DayData(data), [data]);
    const groupedData = React.useMemo(() => groupDataByDate(filteredData), [filteredData]);
    const chartData = React.useMemo(() => formatChartData(groupedData), [groupedData]);
    console.log("data", filteredData)
    console.log("chartData", chartData);

    // Current date
    const currentDate = new Date();
    const thirtyDaysAgo = new Date(currentDate);
    thirtyDaysAgo.setDate(currentDate.getDate() - ofDays);
    const currentMonthYear = currentDate.toLocaleString('default', { day: '2-digit', month: 'long', year: 'numeric' });
    const thirtyDaysAgoMonthYear = thirtyDaysAgo.toLocaleString('default', { day: '2-digit', month: 'long', year: 'numeric' });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Daily Visitors</CardTitle>
                <CardDescription> {thirtyDaysAgoMonthYear} - {currentMonthYear}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[40vh] w-full">
                    <BarChart data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            // tickFormatter={(value) => value.slice(0, 3)}
                            tickFormatter={(value) => {
                                return new Date(value).toLocaleDateString("en-US", {
                                    weekday: "long",
                                });
                            }}
                        />
                        <Bar
                            dataKey="laptop"
                            stackId="a"
                            fill="var(--color-laptop)"
                            radius={[0, 0, 4, 4]}
                        />
                        <Bar
                            dataKey="mobile"
                            stackId="a"
                            fill="var(--color-mobile)"
                            radius={[4, 4, 0, 0]}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        });
                                    }}
                                />
                            }
                            cursor={false}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 30 days
                </div>
            </CardFooter>
        </Card>
    );
}

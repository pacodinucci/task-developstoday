"use client";

import React from "react";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

function PopulationChart({ data }) {
  const chartConfig = {
    population: {
      label: "Population",
      color: "#2563eb",
    },
  };

  return (
    <div>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={true} />
          <XAxis
            dataKey="year"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <YAxis />
          <Bar dataKey="value" fill="#2563eb" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

export default PopulationChart;

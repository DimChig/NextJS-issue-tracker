"use client";

import { Card, Flex } from "@radix-ui/themes";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    { label: "Open", value: open },
    { label: "In Progress", value: inProgress },
    { label: "Closed", value: closed },
  ];
  return (
    <Card className="h-full">
      <Flex align="center">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="label" />
            <YAxis />
            <Bar
              dataKey="value"
              barSize="7%"
              style={{ fill: "var(--accent-9)" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </Flex>
    </Card>
  );
};

export default IssueChart;

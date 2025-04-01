import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { Card, CardContent, CardHeader } from "@mui/material";

import salesJsonData from "./salesdata.json";
import './dashboard.css';
import DateRangeFilter from "./dateFilter";
import { parseDate, formatMonthYear, processSalesData } from "../utils/helper";
import { DraggableCard } from "./draggableCard";



export default function Dashboard() {
  const [dateRange, setDateRange] = useState(null);
  const [salesData, setSalesData] = useState({ daily: [], monthly: [] });

  useEffect(() => {
    setSalesData(processSalesData(salesJsonData));
  }, []);


 const filterData = (data) => {
  if (!dateRange || !dateRange[0] || !dateRange[1]) return data; 

  const startDate = new Date(dateRange[0]).setHours(0, 0, 0, 0); 
  const endDate = new Date(dateRange[1]).setHours(23, 59, 59, 999); 

  console.log("Filter Start Date:", new Date(startDate).toString());
  console.log("Filter End Date:", new Date(endDate).toString());

  return data.filter((d) => {
    const dataDate = parseDate(d.date || d.month).setHours(0, 0, 0, 0); 

    console.log("Checking:", d.date, "=>",dataDate, 's', startDate, 'e', endDate);

    return dataDate >= startDate && dataDate <= endDate;
  });
};

  return (
    <div className="main p-4">
    <DateRangeFilter onChange={setDateRange} dateRange={dateRange}/>
      <div className="wrapper">
        <DraggableCard>
          <Card >
            <CardHeader title="Daily Sales Trends" />
            <CardContent>
              <Plot
                data={[
                  {
                    x: filterData(salesData.daily).map((d) => d.date),
                    y: filterData(salesData.daily).map((d) => d.sales),
                    type: "scatter",
                    mode: "lines+markers",
                    marker: { color: "blue" },
                  },
                ]}
                layout={{  width: 450, title: "Daily Sales Trends", autosize: true }}
              />
            </CardContent>
          </Card>
        </DraggableCard>

        <DraggableCard>
          <Card>
            <CardHeader title="Monthly Sales Trends" />
            <CardContent>
              <Plot
                data={[
                  {
                    x: filterData(salesData.monthly).map((d) => formatMonthYear(d.month)),
                    y: filterData(salesData.monthly).map((d) => d.sales),
                    type: "bar",
                    marker: { color: "orange" },
                  },
                ]}
                layout={{  width: 450, title: "Monthly Sales Trends", autosize: true }}
              />
            </CardContent>
          </Card>
        </DraggableCard>
        <DraggableCard>
          <Card>
            <CardHeader title="Daily Transactions" />
            <CardContent>
              <Plot
                data={[
                  {
                    x: filterData(salesData.daily).map((d) => d.date),
                    y: filterData(salesData.daily).map((d) => d.transactions),
                    type: "scatter",
                    mode: "lines+markers",
                    marker: { color: "green" },
                  },
                ]}
                layout={{  width: 450, title: "Daily Transactions", autosize: true }}
              />
            </CardContent>
          </Card>
        </DraggableCard>
        <DraggableCard>
          <Card>
            <CardHeader title="Monthly Transactions" />
            <CardContent>
              <Plot
                data={[
                  {
                    x: filterData(salesData.monthly).map((d) => formatMonthYear(d.month)),
                    y: filterData(salesData.monthly).map((d) => d.transactions),
                    type: "bar",
                    marker: { color: "red" },
                  },
                ]}
                layout={{  width: 450, title: "Monthly Transactions" , autosize: true}}
              />
            </CardContent>
          </Card>
        </DraggableCard>
        <DraggableCard>
          <Card>
            <CardHeader title="Daily Revenue Trends" />
            <CardContent>
              <Plot
                data={[
                  {
                    x: filterData(salesData.daily).map((d) => d.date),
                    y: filterData(salesData.daily).map((d) => d.revenue),
                    type: "scatter",
                    mode: "lines+markers",
                    marker: { color: "purple" },
                  },
                ]}
                layout={{  width: 450, title: "Daily Revenue Trends", autosize: true }}
              />
            </CardContent>
          </Card>
        </DraggableCard>
        <DraggableCard>
          <Card>
            <CardHeader title="Monthly Revenue Trends" />
            <CardContent>
              <Plot
                data={[
                  {
                    x: filterData(salesData.monthly).map((d) => formatMonthYear(d.month)),
                    y: filterData(salesData.monthly).map((d) => d.revenue),
                    type: "bar",
                    marker: { color: "brown" },
                  },
                ]}
                layout={{  width: 450, title: "Monthly Revenue Trends", autosize: true }}
              />
            </CardContent>
          </Card>
        </DraggableCard>
        <DraggableCard>
          <Card>
            <CardHeader title="Daily AOV" />
            <CardContent>
              <Plot
                data={[
                  {
                    x: filterData(salesData.daily).map((d) => d.date),
                    y: filterData(salesData.daily).map((d) => d.aov),
                    type: "scatter",
                    mode: "lines+markers",
                    marker: { color: "cyan" },
                  },
                ]}
                layout={{  width: 450, title: "Daily AOV", autosize: true }}
              />
            </CardContent>
          </Card>
        </DraggableCard>
        <DraggableCard>
          <Card>
            <CardHeader title="Monthly AOV" />
            <CardContent>
              <Plot
                data={[
                  {
                    x: filterData(salesData.monthly).map((d) => formatMonthYear(d.month)),
                    y: filterData(salesData.monthly).map((d) => d.aov),
                    type: "bar",
                    marker: { color: "magenta" },
                  },
                ]}
                layout={{  width: 450, title: "Monthly AOV", autosize: true }}
              />
            </CardContent>
          </Card>
        </DraggableCard>
      </div>
    </div>
  );
}

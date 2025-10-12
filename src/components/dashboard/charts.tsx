"use client"

import { Bar, BarChart, Line, LineChart, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartTooltip, ChartTooltipContent, ChartContainer } from "@/components/ui/chart"

const dailySummaryData = [
  { date: "Mon", ripe: 4000, unripe: 2400 },
  { date: "Tue", ripe: 3000, unripe: 1398 },
  { date: "Wed", ripe: 2000, unripe: 9800 },
  { date: "Thu", ripe: 2780, unripe: 3908 },
  { date: "Fri", ripe: 1890, unripe: 4800 },
  { date: "Sat", ripe: 2390, unripe: 3800 },
  { date: "Sun", ripe: 3490, unripe: 4300 },
]

const hourlyData = [
  { hour: "8am", sorted: 1200 },
  { hour: "9am", sorted: 1500 },
  { hour: "10am", sorted: 1800 },
  { hour: "11am", sorted: 1700 },
  { hour: "12pm", sorted: 1900 },
  { hour: "1pm", sorted: 2100 },
  { hour: "2pm", sorted: 2000 },
  { hour: "3pm", sorted: 1600 },
]

export function RipeUnripeChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ripe vs. Unripe Distribution</CardTitle>
        <CardDescription>Daily summary for the last week.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailySummaryData}>
                    <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
                    <Tooltip
                        cursor={{fill: 'hsl(var(--muted))'}}
                        content={<ChartTooltipContent />}
                    />
                    <Bar dataKey="ripe" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Ripe" />
                    <Bar dataKey="unripe" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} name="Unripe" />
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export function SortedOverTimeChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fruits Sorted Per Hour</CardTitle>
        <CardDescription>Throughput for the current sorting session.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hourlyData}>
                    <XAxis dataKey="hour" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`}/>
                    <Tooltip
                        cursor={{strokeDasharray: '3 3'}}
                        content={({ active, payload, label }) =>
                            active && payload && payload.length ? (
                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                                <div className="grid grid-cols-2 gap-2">
                                <div className="flex flex-col">
                                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                                    Time
                                    </span>
                                    <span className="font-bold text-muted-foreground">
                                    {label}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                                    Sorted
                                    </span>
                                    <span className="font-bold">
                                    {payload[0].value}
                                    </span>
                                </div>
                                </div>
                            </div>
                            ) : null
                        }
                    />
                    <Line type="monotone" dataKey="sorted" stroke="hsl(var(--primary))" strokeWidth={2} dot={{r: 4, fill: 'hsl(var(--primary))'}} activeDot={{ r: 6 }}/>
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

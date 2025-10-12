
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { mockSortSessions, mockMachines } from "@/lib/mock-data"
import { Calendar as CalendarIcon, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import { format, subDays } from "date-fns"
import type { DateRange } from "react-day-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AnalyticsPage() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  })
  const [machineId, setMachineId] = useState<string>("all");
  const [minErrorRate, setMinErrorRate] = useState<string>("0");

  const filteredSessions = mockSortSessions.filter(session => {
    const sessionDate = new Date(session.startTime);
    const dateFilter = date?.from && date?.to ? sessionDate >= date.from && sessionDate <= date.to : true;
    const machineFilter = machineId === 'all' || session.machineId === machineId;
    const errorRateFilter = !minErrorRate || session.errorRate >= parseFloat(minErrorRate) / 100;
    
    return dateFilter && machineFilter && errorRateFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div>
            <h2 className="text-2xl font-bold tracking-tight font-headline">Historical Data</h2>
            <p className="text-muted-foreground">Review and filter past sorting sessions.</p>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                    <Label>Date Range</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                        <Button
                            id="date"
                            variant={"outline"}
                            className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date?.from ? (
                            date.to ? (
                                <>
                                {format(date.from, "LLL dd, y")} -{" "}
                                {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                            ) : (
                            <span>Pick a date</span>
                            )}
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                        />
                        </PopoverContent>
                    </Popover>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="machine-filter">Machine ID</Label>
                    <Select value={machineId} onValueChange={setMachineId}>
                        <SelectTrigger id="machine-filter">
                            <SelectValue placeholder="Select Machine" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Machines</SelectItem>
                            {mockMachines.map(machine => (
                                <SelectItem key={machine.id} value={machine.id}>{machine.id}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="error-rate-filter">Min Error Rate (%)</Label>
                    <Input
                        id="error-rate-filter"
                        type="number"
                        min="0"
                        max="100"
                        placeholder="e.g. 5"
                        value={minErrorRate}
                        onChange={(e) => setMinErrorRate(e.target.value)}
                    />
                </div>
            </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Sort Sessions</CardTitle>
            <CardDescription>
                Displaying {filteredSessions.length} of {mockSortSessions.length} sessions.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Session ID</TableHead>
                    <TableHead>Machine ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Total Sorted</TableHead>
                    <TableHead className="text-right">Ripe</TableHead>
                    <TableHead className="text-right">Unripe</TableHead>
                    <TableHead className="text-right">Error Rate</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {filteredSessions.map((session) => (
                    <TableRow key={session.id}>
                    <TableCell className="font-medium">{session.id}</TableCell>
                    <TableCell>{session.machineId}</TableCell>
                    <TableCell>{format(new Date(session.startTime), "PP")}</TableCell>
                    <TableCell className="text-right">{session.totalSorted.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-green-600">{session.ripeCount.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-red-600">{session.unripeCount.toLocaleString()}</TableCell>
                    <TableCell className={`text-right font-medium ${session.errorRate > 0.05 ? 'text-destructive' : ''}`}>
                        {(session.errorRate * 100).toFixed(2)}%
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  )
}

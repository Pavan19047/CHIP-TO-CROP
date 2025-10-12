
"use client"

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockSortEvents } from "@/lib/mock-data";
import type { SortEvent } from "@/lib/types";
import { formatDistanceToNow } from 'date-fns';

const LiveFeed = () => {
    const [events, setEvents] = useState<SortEvent[]>(mockSortEvents.slice(0, 5));
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);

        const interval = setInterval(() => {
            setEvents(prevEvents => {
                const newEvent: SortEvent = {
                    id: `event-${Date.now()}`,
                    timestamp: new Date(),
                    fruitType: 'Tomato',
                    classification: Math.random() > 0.3 ? 'Ripe' : 'Unripe',
                    isError: Math.random() < 0.05
                };
                const updatedEvents = [newEvent, ...prevEvents];
                if (updatedEvents.length > 10) {
                    updatedEvents.pop();
                }
                return updatedEvents;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Live Feed</CardTitle>
                <CardDescription>Real-time stream of classified produce from the sorter.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Classification</TableHead>
                            <TableHead>Produce</TableHead>
                            <TableHead className="text-right">Time</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {events.map((event) => (
                             <TableRow key={event.id} className="animate-in fade-in-0">
                                <TableCell>
                                    <Badge variant={event.classification === 'Ripe' ? 'default' : 'destructive'} className={event.classification === 'Ripe' ? 'bg-green-600 hover:bg-green-600/90 text-white' : ''}>
                                        {event.classification}
                                    </Badge>
                                    {event.isError && <Badge variant="outline" className="ml-2 border-destructive text-destructive">Review</Badge>}
                                </TableCell>
                                <TableCell>{event.fruitType}</TableCell>
                                <TableCell className="text-right text-muted-foreground">
                                    {isClient ? formatDistanceToNow(event.timestamp, { addSuffix: true }) : ''}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default LiveFeed;

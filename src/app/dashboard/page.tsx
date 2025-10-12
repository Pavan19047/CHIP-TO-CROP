import OverviewStats from "@/components/dashboard/overview-stats";
import LiveFeed from "@/components/dashboard/live-feed";
import { RipeUnripeChart, SortedOverTimeChart } from "@/components/dashboard/charts";
import { mockSortSessions } from "@/lib/mock-data";

export default function DashboardPage() {
    // For demonstration, using data from the most recent mock session
    const currentSession = mockSortSessions[0];

    return (
        <div className="flex flex-col gap-8">
            <OverviewStats 
                totalSorted={currentSession.totalSorted}
                ripe={currentSession.ripeCount}
                unripe={currentSession.unripeCount}
            />
            <div className="grid gap-8 lg:grid-cols-2">
                <RipeUnripeChart />
                <SortedOverTimeChart />
            </div>
             <div className="grid gap-8">
                <LiveFeed />
            </div>
        </div>
    )
}

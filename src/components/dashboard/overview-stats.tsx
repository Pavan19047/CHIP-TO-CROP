import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, CheckCircle, XCircle } from "lucide-react"

type OverviewStatsProps = {
    totalSorted: number;
    ripe: number;
    unripe: number;
}

const OverviewStats = ({ totalSorted, ripe, unripe } : OverviewStatsProps) => {
    const stats = [
        { title: "Total Sorted", value: totalSorted.toLocaleString(), icon: Package, color: "text-primary" },
        { title: "Ripe", value: ripe.toLocaleString(), icon: CheckCircle, color: "text-green-500" },
        { title: "Unripe", value: unripe.toLocaleString(), icon: XCircle, color: "text-red-500" },
    ]

    return (
        <div className="grid gap-4 md:grid-cols-3">
            {stats.map((stat) => (
                <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        <stat.icon className={`h-4 w-4 text-muted-foreground ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground">from current session</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default OverviewStats;

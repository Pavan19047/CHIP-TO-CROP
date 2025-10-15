"use client"
import { usePathname } from "next/navigation"
import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "../ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { mockUser } from "@/lib/mock-data"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const Header = () => {
    const pathname = usePathname();
    const getTitle = () => {
        switch (pathname) {
            case '/dashboard':
                return 'Dashboard Overview';
            case '/dashboard/analytics':
                return 'Historical Analytics';
            case '/dashboard/advisor':
                return 'Image Analysis Advisor';
            case '/dashboard/settings':
                return 'Settings';
            default:
                return 'Dashboard';
        }
    }

    return (
        <header className="flex h-20 items-center justify-between border-b-2 border-border bg-card px-6 md:px-8 professional-shadow">
            <div className="flex items-center gap-4">
                 <SidebarTrigger className="md:hidden" />
                 <div>
                    <h1 className="text-2xl font-bold font-heading text-foreground tracking-tight">{getTitle()}</h1>
                    <p className="text-sm text-muted-foreground font-body">Professional Agricultural Intelligence Platform</p>
                 </div>
            </div>
            <div className="flex items-center gap-4">
                 <div className="relative hidden md:block">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                    type="search"
                    placeholder="Search..."
                    className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-background"
                    />
                </div>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative rounded-full">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">3</span>
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <div className="flex flex-col">
                                <p className="font-medium">Sorting complete</p>
                                <p className="text-xs text-muted-foreground">Session #SESSION-001 finished.</p>
                            </div>
                        </DropdownMenuItem>
                         <DropdownMenuItem>
                            <div className="flex flex-col">
                                <p className="font-medium text-destructive">Machine error</p>
                                <p className="text-xs text-muted-foreground">Machine AG-002 reporting errors.</p>
                            </div>
                        </DropdownMenuItem>
                         <DropdownMenuItem>
                            <div className="flex flex-col">
                                <p className="font-medium">Low produce</p>
                                <p className="text-xs text-muted-foreground">Input for machine AG-001 is low.</p>
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}

export default Header

"use client"

import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator";
import {
    LayoutDashboard,
    BarChart3,
    BrainCircuit,
    Sprout,
    Settings,
    LogOut,
    ChevronDown,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { mockUser } from "@/lib/mock-data";


const AppSidebar = () => {
    const pathname = usePathname();

    const menuItems = [
        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
        { href: "/dashboard/tomatoes", label: "Tomato Ripeness", icon: Sprout },
        { href: "/dashboard/advisor", label: "AI Advisor", icon: BrainCircuit },
        { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ];

    return (
        <Sidebar collapsible="icon" variant="sidebar">
            <SidebarHeader className="p-6 border-b border-sidebar-border">
                <div className="flex items-center gap-3">
                     <div className="h-10 w-10 bg-primary rounded flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6 text-primary-foreground"
                        >
                            <path d="M12 2L2 7l10 5 10-5-10-5z" />
                            <path d="M2 17l10 5 10-5" />
                            <path d="M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-heading font-bold text-sidebar-foreground tracking-tight">AgroGrade</span>
                        <span className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider">Insights</span>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                 <SidebarMenu>
                    {menuItems.map((item) => (
                        <SidebarMenuItem key={item.href}>
                             <Link href={item.href} passHref>
                                <SidebarMenuButton
                                    isActive={pathname === item.href}
                                    tooltip={item.label}
                                >
                                    <item.icon/>
                                    <span>{item.label}</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="p-2">
                <Separator className="my-2 bg-sidebar-border" />
                 <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" className="w-full justify-start p-2 h-auto">
                            <div className="flex justify-between items-center w-full">
                                <div className="flex gap-3 items-center">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={mockUser.avatarUrl} alt={mockUser.name} />
                                        <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col items-start text-sm">
                                        <span className="font-medium">{mockUser.name}</span>
                                        <span className="text-muted-foreground text-xs">{mockUser.email}</span>
                                    </div>
                                </div>
                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            </div>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-56 p-2 mb-2" align="end">
                         <Link href="/login" passHref>
                            <Button variant="ghost" className="w-full justify-start text-sm p-2 h-auto">
                                <LogOut className="mr-2 h-4 w-4" />
                                Logout
                            </Button>
                        </Link>
                    </PopoverContent>
                </Popover>
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar;

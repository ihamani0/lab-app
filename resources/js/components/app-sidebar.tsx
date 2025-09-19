import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
    Hospital,
    LayoutGrid,
    UserCircle,
} from "lucide-react";

import { Link } from "@inertiajs/react";
import AppLogo from "./app-logo";
import { NavItem } from "@/Types";
import NavMain from "./nav-main";
import NavCollapsible from "./nav-collapsible";
import NavUser from "./nav-user";



const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: "/",
        icon: LayoutGrid,
    },
];

const secondaryNavItems: NavItem[] = [
    {
        title: 'Patients',
        href: "/patients",
        icon: Hospital,
    },
    {
        title: 'Doctors',
        href: "/doctors",
        icon: UserCircle,
    },
]


export function AppSidebar() {
    return (
        <Sidebar variant="floating" collapsible="icon">
            <Header />

            <SidebarContent>
                {/* --------------------------------------------------- */}

                <NavMain  items={mainNavItems} />

                {/* --------------------------------------------------- */}

                <NavCollapsible icon={UserCircle} titleCollapsible="Humen Resource" >
                    <NavMain  items={secondaryNavItems}  />
                </NavCollapsible>

                {/* --------------------------------------------------- */}

                {/*
                <SidebarGroup>
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <Collapsible
                                    defaultOpen
                                    className="group/collapsible"
                                >
                                    <SidebarMenuItem>

                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton className="[&>svg:last-child]:-rotate-180 [&[data-state=open]>svg:last-child]:rotate-0">
                                                <User2 /> Humen Resource
                                                <ChevronUp className="ml-auto" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>

                                        <CollapsibleContent>
                                            <SidebarMenuSub>

                                                <NavMain  items={secondaryNavItems} />
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            </SidebarMenu>
                        </SidebarGroupContent>
                </SidebarGroup> */}

                {/* --------------------------------------------------- */}
                <SidebarGroup />
            </SidebarContent>

            <Footer />
        </Sidebar>
    );
}

function Header() {
    return (
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href='/' prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
    );
}

function Footer() {
    return (
        <SidebarFooter>
            <NavUser />
        </SidebarFooter>
    );
}

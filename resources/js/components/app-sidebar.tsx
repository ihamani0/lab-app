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
    ArrowLeftRightIcon,
    Box,
    Boxes,
    BoxIcon,
    Container,
    HeartPulse,
    Hospital,
    LayoutGrid,
    Package,
    ShoppingBag,
    ShoppingCart,
    Stethoscope,
    Tag,
    Truck,
    UserCircle,
    Wrench,
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
        href: "/dashboard",
        icon: LayoutGrid,
    },
];

const secondaryNavItems: NavItem[] = [
    {
        title: 'Patients',
        href: "/patients",
        icon: HeartPulse,
    },
    {
        title: 'Doctors',
        href: "/doctors",
        icon: Stethoscope,
    },
        {
        title: 'Technicien',
        href: "/techniciens",
        icon: Wrench,
    },
]

const InventoryNavItems: NavItem[] = [
    {
        title: 'Categories',
        href: "/categories",
        icon: Tag,
    },
    {
        title: 'Brands',
        href: "/brands",
        icon: ShoppingBag,
    },
    {
        title: 'Materials',
        href: "/materials",
        icon: Box,
    },
    {
        title: 'Suppliers',
        href: "/suppliers",
        icon: Truck,
    },
    {
        title: 'Purchases',
        href: "/purchases",
        icon: ShoppingCart,
    },

]

const StockNavItems: NavItem[] = [
    {
        title : "Stock Interaction",
        href : "/stock",
        icon : Container
    } ,
    {
        title : "Stock Movment",
        href : "/stock-movement",
        icon : ArrowLeftRightIcon
    }
]


export function AppSidebar() {
    return (
        <Sidebar variant="inset" collapsible="icon">
            <Header />

            <SidebarContent>
                {/* --------------------------------------------------- */}

                <NavMain  items={mainNavItems} />

                {/* --------------------------------------------------- */}

                <NavCollapsible icon={Hospital} titleCollapsible="Human Resource" >
                    <NavMain  items={secondaryNavItems}  />
                </NavCollapsible>

                <NavCollapsible icon={Package} titleCollapsible="Inventory" >
                    <NavMain  items={InventoryNavItems}  />
                </NavCollapsible>


                <NavCollapsible icon={Boxes} titleCollapsible="Stock" >
                    <NavMain  items={StockNavItems}  />
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

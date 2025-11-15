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
    ChartAreaIcon,
    ClipboardList,
    Columns3,
    Container,
    Euro,
    FileText,
    HeartPulse,
    Hospital,
    LayoutGrid,
    Package,
    Sheet,
    ShoppingBag,
    ShoppingCart,
    Stethoscope,
    Tag,
    Truck,
    UserStarIcon,
    Wrench,
} from "lucide-react";

import { Link, usePage } from "@inertiajs/react";
import AppLogo from "./app-logo";
import { Auth, NavItem, PageProps } from "@/Types";
import NavMain from "./nav-main";
import NavCollapsible from "./nav-collapsible";
import NavUser from "./nav-user";
import { route } from "ziggy-js";



const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: "/dashboard",
        icon: LayoutGrid,
    },
];

const secondaryNavItems: NavItem[] = [

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
    {
        title: 'Patients',
        href: "/patients",
        icon: HeartPulse,
    },
    {
        title: 'Accounting',
        href: route('accounting.index'),
        icon: UserStarIcon,
    }
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
        href : "/movement-stock",
        icon : ArrowLeftRightIcon
    }
]


const CaseNavItems: NavItem[] = [
    {
        title: "Case Management",
        href: "/prosthesis-case",
        icon: ClipboardList
    },
    {
        title: "Services",
        href: "/prosthesis-service",
        icon: Wrench
    },
    {
        title: "Materials Used",
        href: "/prosthesis-consumption",
        icon: Package
    },
    {
        title: "Invoices",
        href: "/prosthesis-invoice",
        icon: FileText
    }
]


const ReportItems : NavItem[] = [
    {
        title : 'Inventory ',
        href : '/report/inventory',
        icon : Sheet
    },
    {
        title : 'Finacial ',
        href : '/report/financial',
        icon : Euro
    } ,
    {
        title : 'Cases ',
        href : '/report/production',
        icon : Box
    }
]

//<Columns3 />


export function AppSidebar() {

    const { auth } = usePage<PageProps>().props ;
    const roles = auth.user ? auth.user.roles : [] ;


    return (
        <Sidebar variant="inset" collapsible="icon">
            <Header />

            <SidebarContent>
                {/* --------------------------------------------------- */}

                <NavMain  items={mainNavItems} />

                {/* --------------------------------------------------- */}

                { roles.includes('super-admin')  && (
                    <NavCollapsible icon={Hospital} titleCollapsible="Human Resource" >
                        <NavMain  items={secondaryNavItems}  />
                    </NavCollapsible>
                )}


                <NavCollapsible icon={Package} titleCollapsible="Inventory" >
                    <NavMain  items={InventoryNavItems}  />
                </NavCollapsible>


                <NavCollapsible icon={Boxes} titleCollapsible="Stock" >
                    <NavMain  items={StockNavItems}  />
                </NavCollapsible>



                <NavCollapsible icon={Columns3} titleCollapsible="Prosthesis" >
                    <NavMain  items={CaseNavItems}  />
                </NavCollapsible>

                { roles.includes('super-admin')  && (

                <NavCollapsible icon={ChartAreaIcon} titleCollapsible="Reports" >
                    <NavMain  items={ReportItems}  />
                </NavCollapsible>
                )}

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

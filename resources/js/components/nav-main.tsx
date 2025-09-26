import { NavItem } from "@/Types"
import { Link, usePage } from "@inertiajs/react";
import {SidebarGroup,SidebarGroupContent,SidebarGroupLabel,SidebarMenu,SidebarMenuButton,SidebarMenuItem} from '@/components/ui/sidebar';


function NavMain({items = []} : {items : NavItem[]}) {
    const page = usePage();


  return (
        <SidebarGroup className="px-2 py-0">
        {/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}
        <SidebarGroupContent>
            <SidebarMenu>
                {
                    items.map( item => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    // isActive={page.url.startsWith( typeof item.href === 'string' ? item.href : item.href.url )}
                                    isActive={page.url.startsWith(item.href)}
                                    tooltip={{ children: item.title }}
                                >
                                    <Link href={item.href} prefetch>
                                        {item.icon && <item.icon className="mr-2" />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                    ))
                }

            </SidebarMenu>
        </SidebarGroupContent>
    </SidebarGroup>
  )
}
export default NavMain

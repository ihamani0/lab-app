
import {SidebarGroup,SidebarGroupContent,SidebarGroupLabel,SidebarMenu,SidebarMenuButton,SidebarMenuItem, SidebarMenuSub} from '@/components/ui/sidebar';
import {     Collapsible,CollapsibleContent,CollapsibleTrigger, } from './ui/collapsible';
import { ChevronUp, LucideIcon } from 'lucide-react';


type Props  ={
    icon?: LucideIcon | null;
    titleCollapsible : string;
    children : React.ReactNode;
}

function NavCollapsible({children , icon , titleCollapsible} : Props) {
      const Icon = icon;
  return (
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
                                    {Icon && <Icon />} {titleCollapsible}
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </CollapsibleTrigger>

                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    {/* --------------------------------------------------- */}
                                    {children}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
  )
}
export default NavCollapsible;

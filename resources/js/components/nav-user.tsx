import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { ChevronsUpDown } from 'lucide-react';
import UserInfo from './user-info';
import UserMenuContent from './user-menu-content';
import { useIsMobile } from '@/hooks/use-mobile';

function NavUser() {

    const { state} = useSidebar();
    const isMobile = useIsMobile();

  return (
    <SidebarMenu>
        <SidebarMenuItem>
            <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="group text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent"
                        >
                            <UserInfo />
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>


                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        align="end"
                        side={
                            isMobile ? 'bottom' : state ==='collapsed' ? 'left' : 'bottom'
                        }
                    >
                    {/* <UserInfo user={user} showEmail={true} /> */}
                        <UserMenuContent />
                    </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    </SidebarMenu>

  )
}
export default NavUser


import { Link, router } from '@inertiajs/react';
import {DropdownMenuGroup,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import  UserInfo  from '@/components/user-info';
import { LogOut, Settings } from 'lucide-react';
import ThemeToggle from './theme-toggle';


function UserMenuContent() {

    const handleLogout = ()=>{
        router.flushAll();
        router.visit('/login');
    }
  return (
    <>

     <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    {/* <UserInfo user={user} showEmail={true} /> */}
                    <UserInfo  />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link
                        className="block w-full"
                        href="/"
                    >
                        <Settings className="mr-2" />
                        Settings
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link
                    className="block w-full"
                    href="/logout"
                    as="button"
                    onClick={handleLogout}
                    data-test="logout-button"
                >
                    <LogOut className="mr-2" />
                    Log out
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <ThemeToggle />
            </DropdownMenuItem>

    </>
  )
}
export default UserMenuContent

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { LogOut, User } from "lucide-react"
import { User as UserType} from "@/Types"
import AppLogo from "@/components/app-logo"
import AppLogoIcon from "@/components/app-logo-icon"
import ThemeToggle from "@/components/theme-toggle"
import { router } from "@inertiajs/react"
import { route } from "ziggy-js"

interface NavbarProps {
  user: UserType;
}


export default function Navbar() {


    const handleLogout = ()=>{
        router.post(route('logout'));
    }

  return (
    <nav className="flex items-center justify-between w-full px-6 py-3 bg-background text-foreground shadow-md rounded-2xl">
      {/* Left - Logo */}

        <div className="flex aspect-square size-10 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
        </div>

        {/* Right - Avatar with Popover */}
        <div className="flex items-center gap-x-10">
            <ThemeToggle />
        <Popover>
            <PopoverTrigger asChild>
            <button className="focus:outline-none">
                <Avatar className="h-9 w-9">
                <AvatarImage src="/user.jpg" alt="User" />
                <AvatarFallback>IH</AvatarFallback>
                </Avatar>
            </button>
            </PopoverTrigger>
            <PopoverContent
            align="end"
            className="w-48 p-2 mt-2 bg-background text-foreground border rounded-lg shadow-lg"
            >
            <div className="flex flex-col space-y-1">

                    <button className="flex items-center space-x-2 px-2 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 w-full text-sm">
                    <User size={16} />
                    <span>Profile</span>
                    </button>


                    <Separator />

                    <button className="flex items-center space-x-2 px-2 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 w-full text-sm dark:text-red-400 text-red-600"
                        onClick={handleLogout}
                    >
                    <LogOut size={16} />
                        <span>Sign out</span>
                    </button>
            </div>
            </PopoverContent>
        </Popover>
        </div>

    </nav>
  )
}

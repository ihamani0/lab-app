
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';

function UserInfo() {

    const getInitials = useInitials();

  return (
        <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                {/* <AvatarImage src={'/assets/avatar.svg'} alt={"avatar"} /> */}
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {getInitials("issam Hamani")}
                </AvatarFallback>
        </Avatar>
  )
}
export default UserInfo
